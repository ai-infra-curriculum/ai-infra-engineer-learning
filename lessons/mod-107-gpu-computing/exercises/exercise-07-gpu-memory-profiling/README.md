# Exercise 07: GPU Memory Profiling and OOM Diagnosis

**Duration:** 2.5 hours
**Difficulty:** Intermediate
**Prerequisites:** Exercise 03 (training pipeline)

## Objective

Profile a deliberately-OOM-prone training script, identify the actual memory-hogging components (activations, parameters, optimizer state, gradients), and apply three mitigations: gradient checkpointing, optimizer-state sharding, and activation rematerialization. Measure the impact of each.

## Why this matters

Memory is the constraint at the frontier. The difference between a 13B-param model that fits and one that doesn't is rarely the parameter count alone — it's the activations + optimizer state. Engineers who can profile and mitigate ship larger models on smaller GPUs, period.

## Requirements

1. Use `torch.cuda.memory_summary` and `torch.cuda.memory._record_memory_history` to profile.
2. Apply gradient checkpointing to halve activation memory.
3. Use `bitsandbytes.optim.Adam8bit` to reduce optimizer state 4×.
4. Use `torch.utils.checkpoint.checkpoint_sequential` on a specific transformer block.
5. Produce a visual memory trace (uploaded to https://pytorch.org/memory_viz).
6. Document the four memory contributors and the mitigations' measured effects.

## Step-by-step

### Step 1 — Baseline OOM (30 min)
Start with a script that trains a moderately large model (e.g., GPT-2 medium, ~350M params) at a batch size that just OOMs on your GPU.
```python
import torch
from transformers import GPT2LMHeadModel
model = GPT2LMHeadModel.from_pretrained("gpt2-medium").cuda()
opt = torch.optim.AdamW(model.parameters(), lr=1e-5)
for _ in range(10):
    x = torch.randint(0, 50000, (16, 512), device="cuda")
    out = model(x, labels=x).loss
    out.backward()
    opt.step(); opt.zero_grad()
```
Expect OOM. Note peak memory before crash with `torch.cuda.max_memory_allocated() / 1e9`.

### Step 2 — Snapshot the trace (15 min)
```python
torch.cuda.memory._record_memory_history(max_entries=100_000)
# training loop
torch.cuda.memory._dump_snapshot("baseline.bin")
torch.cuda.memory._record_memory_history(enabled=None)
```
Upload to memory_viz. Identify the largest allocations.

### Step 3 — Decompose memory (15 min)
For a 350M-param model in fp32 with AdamW:
- Params: ~1.4 GB
- Gradients: ~1.4 GB
- AdamW state (2× params): ~2.8 GB
- Activations: depends on batch + seq; typically 3-10 GB

So optimizer state + grads + params ≈ 5.6 GB, activations the rest.

### Step 4 — Gradient checkpointing (30 min)
```python
model.gradient_checkpointing_enable()
```
For HuggingFace models; this re-computes activations during backward, trading compute for memory. Expect ~30-50% activation memory reduction at ~30% slower training.

### Step 5 — Adam8bit (20 min)
```python
import bitsandbytes as bnb
opt = bnb.optim.AdamW8bit(model.parameters(), lr=1e-5)
```
Quantizes optimizer state to 8-bit. Saves ~75% of state memory.

### Step 6 — Custom rematerialization (30 min)
For non-HF models, you can use `torch.utils.checkpoint.checkpoint` per block:
```python
from torch.utils.checkpoint import checkpoint
class CheckpointedBlock(nn.Module):
    def __init__(self, block): super().__init__(); self.block = block
    def forward(self, x): return checkpoint(self.block, x, use_reentrant=False)
```

### Step 7 — Measure each mitigation (20 min)
Record peak memory and step time for: baseline (with smaller batch that fits), +grad checkpoint, +Adam8bit, +both. Produce a table.

## Deliverables

1. `train_baseline.py` showing the OOM behavior.
2. `train_optimized.py` with the three mitigations.
3. Memory snapshots (`baseline.bin`, `optimized.bin`) viewable in memory_viz.
4. `MEMORY_REPORT.md`: decomposition + mitigation table + recommendations.

## Validation

- [ ] Baseline OOMs at chosen batch size, optimized runs at same batch size with > 20% headroom.
- [ ] Peak memory dropped by ≥ 50% with all three mitigations.
- [ ] Training step time penalty < 50% (gradient checkpointing's cost).
- [ ] Loss trajectory unchanged within float noise (mitigations don't change the math).

## Stretch goals

- Add **CPU offload** via `accelerate` or `deepspeed` for the optimizer state.
- Add **FSDP** (Fully Sharded Data Parallel) on multi-GPU; compare to single-GPU + checkpointing.
- Profile activation memory **per layer** to identify the worst offender.

## Common pitfalls

- **`gradient_checkpointing_enable()` no-op on custom models** — Only works on HF models. Use `checkpoint()` directly for custom architectures.
- **Adam8bit's first step is slow** — Quantization parameters initialize on first call; ignore the first iteration's timing.
- **Memory snapshot is huge** — Default `max_entries=100_000` produces multi-MB snapshots. For long runs, sample periodically.
- **Peak memory metric resets at snapshot** — `torch.cuda.reset_peak_memory_stats()` between scenarios for accurate comparison.
