# Exercise 08: Mixed Precision Training Benchmarks

**Duration:** 2 hours
**Difficulty:** Intermediate
**Prerequisites:** Exercise 03 + 07

## Objective

For the same training workload, benchmark fp32, fp16 (AMP), bf16, and TF32 across multiple batch sizes. Produce a recommendation matrix: which precision to use under which conditions (GPU generation, model architecture, numerical stability requirements).

## Why this matters

Mixed precision doubles or triples training throughput on modern GPUs. The wrong choice (fp16 on a Pascal GPU, or bf16 on a Volta) is invisible until you notice your training is 2× slower than your colleague's. Knowing why teaches you to read NVIDIA's marketing material correctly.

## Requirements

Implement a benchmark that varies:
- Precision: fp32, fp16 (AMP), bf16 (AMP), TF32
- Batch size: 32, 128, 512
- Model: ResNet-50 (vision) + a small transformer encoder (language)

For each combination, report:
- Throughput (images/sec or tokens/sec)
- Peak memory (GB)
- Per-step latency (ms)
- Final loss after fixed step count (verify numerical convergence)

Produce a 6×3 results table per model, plus a recommendation paragraph.

## Step-by-step

### Step 1 — Precision toggles (30 min)
```python
def train_step_fp32(model, opt, loss_fn, xb, yb):
    out = model(xb)
    loss = loss_fn(out, yb)
    loss.backward()
    opt.step(); opt.zero_grad()
    return loss.item()

def train_step_amp(model, opt, scaler, loss_fn, xb, yb, dtype=torch.float16):
    with torch.amp.autocast("cuda", dtype=dtype):
        loss = loss_fn(model(xb), yb)
    scaler.scale(loss).backward()
    scaler.step(opt); scaler.update(); opt.zero_grad()
    return loss.item()
```

For TF32 (Ampere+ default): `torch.backends.cuda.matmul.allow_tf32 = True; torch.backends.cudnn.allow_tf32 = True`. No code change; runs as fp32 with TF32 internal matmul.

### Step 2 — ResNet benchmark (45 min)
```python
from torchvision.models import resnet50
import time

def bench(precision, batch_size, steps=50):
    model = resnet50(num_classes=1000).cuda().train()
    opt = torch.optim.SGD(model.parameters(), lr=0.1)
    scaler = torch.amp.GradScaler("cuda") if precision == torch.float16 else None
    loss_fn = torch.nn.CrossEntropyLoss()
    
    x = torch.randn(batch_size, 3, 224, 224, device="cuda")
    y = torch.randint(0, 1000, (batch_size,), device="cuda")
    
    # warm
    for _ in range(5):
        train_step_amp(model, opt, scaler, loss_fn, x, y, dtype=precision) if scaler else train_step_fp32(...)
        torch.cuda.synchronize()
    
    torch.cuda.reset_peak_memory_stats()
    t0 = time.perf_counter()
    for _ in range(steps):
        train_step_...
        torch.cuda.synchronize()
    elapsed = time.perf_counter() - t0
    
    return {
        "throughput_im_per_s": batch_size * steps / elapsed,
        "ms_per_step":         elapsed / steps * 1000,
        "peak_gb":             torch.cuda.max_memory_allocated() / 1e9,
    }
```

### Step 3 — Transformer benchmark (30 min)
Substitute a small transformer (e.g., 6-layer encoder, 512-dim, 8 heads). Use synthetic token IDs.

### Step 4 — Numerical convergence (15 min)
For each precision, train 100 steps on a fixed seed and report final loss. They should be within ~0.01 of each other for ResNet on CIFAR; transformers may diverge slightly for fp16 (use bf16 there).

### Step 5 — Compile results (15 min)
Produce CSV + Markdown table. Tag GPU generation (V100, A100, H100, RTX 30/40-series, etc.) in the report.

## Deliverables

1. `bench_precision.py` runnable benchmark.
2. `RESULTS.md` with the 6×3 table per model + per-GPU.
3. `RECOMMENDATIONS.md` ("when to use which") with at least:
   - 3 do's
   - 3 don'ts
   - One per-GPU-class recommendation

## Validation

- [ ] Both models train without NaN in all 4 precisions (on Ampere+).
- [ ] fp16 / bf16 throughput ≥ 1.5× fp32 on Ampere+ Tensor Core GPUs.
- [ ] Peak memory in fp16/bf16 ≤ 60% of fp32.
- [ ] TF32 (no code change) gives ~1.5× speedup over fp32 on Ampere matmul-heavy workloads with no accuracy degradation.

## Stretch goals

- Add **fp8** for H100 (requires Transformer Engine).
- Add **NCCL all-reduce precision** comparison in multi-GPU.
- Profile **kernel selection**: which CUDA kernels does cuDNN pick at each precision? `CUDNN_LOGINFO_DBG=1`.

## Common pitfalls

- **fp16 NaN on first few steps** — `GradScaler` starts at 65536; if loss spikes, it halves and retries. Tolerate the first 10 steps.
- **bf16 not supported** — Volta (V100), Pascal, etc. fall back; `torch.amp.autocast("cuda", dtype=torch.bfloat16)` errors silently or runs in fp32.
- **AMP doesn't help on small batches** — Kernel launch overhead dominates; need decent batch size to see the speedup.
- **TF32 introduces small accuracy delta** — Usually fine for ML training; not fine for scientific computing.

## Solutions

Reference implementation in the engineer-solutions repo, including pre-generated results for several GPU classes.
