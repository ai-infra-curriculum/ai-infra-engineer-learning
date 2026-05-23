# Exercise 01: GPU Introspection and First CUDA Op

**Duration:** 2 hours
**Difficulty:** Beginner+
**Prerequisites:** NVIDIA GPU + CUDA Toolkit, PyTorch installed

## Objective

Build a `gpu-info` CLI that introspects every GPU on a host (compute capability, VRAM, NVLink topology, MIG status, current utilization), runs a baseline tensor benchmark, and exits 0 only if the GPU is healthy. By the end you'll have a tool you'd drop into any node-startup script.

## Why this matters

Half of GPU production issues are "the GPU is misconfigured" or "the wrong GPU was attached" — issues that should be caught at startup, not at first inference. A 50-line introspection script eliminates this class of bug.

## Requirements

The CLI must:
1. List every GPU with name, compute capability, total/free VRAM, driver version.
2. Detect NVLink presence between GPU pairs.
3. Detect MIG configuration (partitions, GPU instance IDs).
4. Run a 2048×2048 matmul on each GPU; report TFLOPS.
5. Run a memory bandwidth test (memcpy device-to-device); report GB/s.
6. Compare measured TFLOPS against the chip's theoretical peak; warn if < 50%.
7. Exit code 0 (healthy), 1 (degraded), 2 (no GPU or unusable).

## Step-by-step

### Step 1 — Inventory via pynvml (30 min)
```python
import pynvml
pynvml.nvmlInit()
n = pynvml.nvmlDeviceGetCount()
for i in range(n):
    h = pynvml.nvmlDeviceGetHandleByIndex(i)
    name = pynvml.nvmlDeviceGetName(h)
    mem = pynvml.nvmlDeviceGetMemoryInfo(h)
    util = pynvml.nvmlDeviceGetUtilizationRates(h)
    print(f"[{i}] {name}: {mem.free/1e9:.1f}/{mem.total/1e9:.1f}GB free, util={util.gpu}%")
```

### Step 2 — NVLink topology (15 min)
```python
links = pynvml.nvmlDeviceGetTopologyCommonAncestor(h1, h2)
# 0=PIX (same socket), 1=NV1..NV12 (NVLink), 6=PHB (peer host bridge), etc.
```

### Step 3 — MIG detection (15 min)
```python
mig_mode = pynvml.nvmlDeviceGetMigMode(h)   # (current, pending)
if mig_mode[0] == pynvml.NVML_DEVICE_MIG_ENABLE:
    for j in range(pynvml.nvmlDeviceGetMaxMigDeviceCount(h)):
        instance = pynvml.nvmlDeviceGetMigDeviceHandleByIndex(h, j)
        ...
```

### Step 4 — Matmul benchmark (30 min)
```python
import torch, time
def matmul_tflops(device, n=2048, repeat=50):
    a = torch.randn(n, n, device=device)
    b = torch.randn(n, n, device=device)
    # warm
    for _ in range(5): torch.matmul(a, b); torch.cuda.synchronize(device)
    t0 = time.perf_counter()
    for _ in range(repeat): torch.matmul(a, b); torch.cuda.synchronize(device)
    elapsed = time.perf_counter() - t0
    flops = 2 * n**3 * repeat
    return flops / elapsed / 1e12
```

### Step 5 — Bandwidth benchmark (15 min)
```python
def bandwidth_gbs(device, size_mb=512):
    n = size_mb * 1024 * 256          # 4-byte floats
    src = torch.randn(n, device=device); dst = torch.empty_like(src)
    for _ in range(3): dst.copy_(src); torch.cuda.synchronize(device)
    t0 = time.perf_counter()
    for _ in range(10): dst.copy_(src); torch.cuda.synchronize(device)
    elapsed = time.perf_counter() - t0
    return (src.element_size() * src.numel() * 10) / elapsed / 1e9
```

### Step 6 — Peak comparison (15 min)
Build a lookup table of theoretical fp32 TFLOPS per chip; flag if measured < 50%.

### Step 7 — JSON output mode + exit codes (15 min)
`--json` outputs machine-readable; default exits non-zero on degradation.

## Deliverables

1. `gpu-info` CLI with all 7 requirements.
2. JSON output schema documented.
3. Sample output for at least one real GPU.
4. Suggested usage: drop into Kubernetes initContainers, slurm prolog scripts.

## Validation

- [ ] Identifies your GPU(s) correctly.
- [ ] TFLOPS within 30% of vendor spec on an idle system.
- [ ] Exit code 0 on a healthy GPU.
- [ ] Exit code 2 when GPU is unavailable (test by setting `CUDA_VISIBLE_DEVICES=`).
- [ ] JSON mode produces parseable structured output.

## Stretch goals

- Add **ECC error count** reporting; warn if non-zero.
- Add **temperature + power** with sustained-load monitoring.
- Build a Kubernetes **device plugin probe** that returns Pod Conditions based on these checks.

## Common pitfalls

- **pynvml not initialized** — Always `nvmlInit()` first; wrap in try/finally with `nvmlShutdown()`.
- **CUDA-PyTorch mismatch** — `torch.cuda.is_available()` returns False if compiled CUDA differs from installed driver. The CLI should explicitly report this case.
- **Benchmark warm-up matters** — First matmul triggers CUDA context init; without warm-up your TFLOPS reads as 1/10 the real value.
