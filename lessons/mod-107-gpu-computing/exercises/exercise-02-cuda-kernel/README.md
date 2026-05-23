# Exercise 02: Write Your First CUDA Kernel

**Duration:** 3 hours
**Difficulty:** Intermediate
**Prerequisites:** Exercise 01; nvcc compiler

## Objective

Write a CUDA C kernel for element-wise vector operations, benchmark against PyTorch's built-in implementation, then translate the same kernel to a custom PyTorch CUDA extension callable from Python. By the end you'll understand the kernel → host code → Python binding chain.

## Why this matters

PyTorch handles 99% of ML ops, but the 1% where you need a custom kernel (a novel attention variant, a specialized loss, a domain-specific operation) defines your team's ability to write ML systems papers — or to optimize hot paths beyond what off-the-shelf libraries do.

## Requirements

Implement three components:

1. **A CUDA C kernel** `vector_add.cu` performing `c = a + b` on float arrays.
2. **A benchmarking harness** comparing your kernel vs `torch.add` for vectors of size 10K, 1M, 100M.
3. **A PyTorch CUDA extension** that calls your kernel and exposes it as `my_ops.add(a, b)`.

## Step-by-step

### Step 1 — Standalone CUDA kernel (45 min)
```cuda
// vector_add.cu
__global__ void add_kernel(int n, const float* a, const float* b, float* c) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n) c[i] = a[i] + b[i];
}

extern "C" void launch_add(int n, const float* a, const float* b, float* c) {
    int block = 256;
    int grid = (n + block - 1) / block;
    add_kernel<<<grid, block>>>(n, a, b, c);
    cudaDeviceSynchronize();
}
```
Compile + run a standalone test.

### Step 2 — PyTorch extension via setup.py (45 min)
```python
# setup.py
from setuptools import setup
from torch.utils.cpp_extension import BuildExtension, CUDAExtension

setup(
    name="my_ops",
    ext_modules=[
        CUDAExtension(
            name="my_ops",
            sources=["my_ops.cpp", "vector_add.cu"],
        )
    ],
    cmdclass={"build_ext": BuildExtension},
)
```

```cpp
// my_ops.cpp
#include <torch/extension.h>

void launch_add(int n, const float* a, const float* b, float* c);

torch::Tensor add(torch::Tensor a, torch::Tensor b) {
    TORCH_CHECK(a.device().is_cuda(), "a must be CUDA");
    TORCH_CHECK(a.sizes() == b.sizes());
    auto c = torch::empty_like(a);
    launch_add(a.numel(), a.data_ptr<float>(), b.data_ptr<float>(), c.data_ptr<float>());
    return c;
}

PYBIND11_MODULE(TORCH_EXTENSION_NAME, m) {
    m.def("add", &add, "vector add (CUDA)");
}
```

```bash
pip install -e .
```

### Step 3 — Use from Python (15 min)
```python
import torch, my_ops
a = torch.randn(1_000_000, device="cuda")
b = torch.randn_like(a)
c = my_ops.add(a, b)
torch.testing.assert_close(c, a + b)
```

### Step 4 — Benchmark (45 min)
```python
import torch, time, my_ops

def bench(fn, *args, iters=100):
    # warm
    for _ in range(5): fn(*args); torch.cuda.synchronize()
    t0 = time.perf_counter()
    for _ in range(iters): fn(*args); torch.cuda.synchronize()
    return (time.perf_counter() - t0) / iters * 1000  # ms

for n in (10_000, 1_000_000, 100_000_000):
    a = torch.randn(n, device="cuda"); b = torch.randn_like(a)
    my_ms    = bench(my_ops.add, a, b)
    torch_ms = bench(torch.add,  a, b)
    print(f"n={n:>10}  my={my_ms:.3f}ms torch={torch_ms:.3f}ms ratio={torch_ms/my_ms:.2f}x")
```

You'll typically see PyTorch matches your kernel at small sizes (overhead-dominated) and slightly outperforms at large sizes (better launch config + fusion).

### Step 5 — Optimize (30 min)
- Try block sizes 128, 256, 512, 1024.
- Use `__restrict__` qualifiers on pointers.
- Use vectorized loads (`float4`) for memory-bandwidth-bound kernels.

### Step 6 — Profile with nsys/ncu (30 min)
```bash
nsys profile python bench.py
ncu --set basic python -c 'import my_ops, torch; my_ops.add(torch.randn(1<<20,device="cuda"),torch.randn(1<<20,device="cuda"))'
```
Look at: kernel occupancy, memory bandwidth utilization, registers per thread.

## Deliverables

1. `vector_add.cu` standalone + `my_ops` PyTorch extension.
2. `bench.py` reproducible benchmark.
3. `BENCHMARK.md` results table with explanations.
4. `OPTIMIZATION_NOTES.md` describing each optimization and its measured effect.

## Validation

- [ ] `my_ops.add` produces output equal to `torch.add` within float epsilon.
- [ ] Benchmark runs without crashes for all 3 sizes.
- [ ] You documented at least one optimization that produced a measurable improvement (or a measurable regression — both are valid findings).

## Stretch goals

- Implement a **fused** kernel: `c = relu(a + b)` and beat the naive `torch.relu(a + b)` (which materializes the intermediate).
- Write a kernel for a real ML op: **softmax**, **layernorm**, or **causal mask**. Compare to Apex / Triton equivalents.
- Use **Triton** (Python DSL) instead of CUDA C for a side-by-side ergonomics comparison.

## Common pitfalls

- **Out-of-bounds reads on the last block** — Always `if (i < n) {}` inside the kernel.
- **Forgetting `cudaDeviceSynchronize`** — Without it, timing measurements lie because the launch is async.
- **Compile errors with `pip install -e`** — Verify `CUDA_HOME` is set and matches torch's CUDA version.
- **PyTorch CUDA stream confusion** — Custom kernels run on the default stream by default; PyTorch ops run on per-thread streams. Manage explicitly for high-throughput code.

## Solutions

Reference solution in the engineer-solutions repo includes a Triton variant.
