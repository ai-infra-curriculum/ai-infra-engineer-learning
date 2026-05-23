# Exercise 10: GPU Sharing Strategies (MIG, MPS, Time-Slicing)

**Duration:** 2.5 hours
**Difficulty:** Intermediate+
**Prerequisites:** Kubernetes cluster with GPU + NVIDIA Device Plugin

## Objective

Configure each of NVIDIA's three GPU sharing strategies in Kubernetes — Multi-Instance GPU (MIG), Multi-Process Service (MPS), and time-slicing — and characterize their trade-offs with a real workload (concurrent iris-api inference + a small training job).

## Why this matters

A team's GPU bill scales roughly linearly with GPUs. Sharing strategies turn one $20K H100 into 7 smaller logical GPUs for development workloads. Mistakes here ("we ran MPS in prod, every job interferes with every other") cost real incidents.

## Background

| Strategy | Isolation | Scheduling | Best for |
|---|---|---|---|
| **MIG** | Hardware-level (compute + memory) | Static, partition at boot | Multi-tenant, production, regulated |
| **MPS** | Process-level (shared SM + memory) | Cooperative | Single-team multi-process inference |
| **Time-slicing** | None (round-robin) | Preemptive | Dev/test, throwaway workloads |

## Requirements

For each strategy, demonstrate:
1. The cluster-side configuration (device plugin config).
2. A Pod spec requesting the partitioned resource.
3. A workload running on the shared GPU.
4. Measurement of interference (a second workload's effect on the first).

## Step-by-step

### Strategy 1 — MIG (45 min)

**Prerequisite:** Ampere+ data-center GPU (A100/A30/H100/H200).

#### Enable MIG mode + create instances (host-side):
```bash
sudo nvidia-smi -mig 1                       # enable MIG mode
sudo nvidia-smi mig -cgi 1g.5gb,1g.5gb,2g.10gb -C   # create instances
nvidia-smi mig -lgi                          # list
```

#### Device plugin config:
```yaml
# nvidia-device-plugin config
sharing:
  mig:
    strategy: mixed       # exposes 1g.5gb, 2g.10gb, etc. as separate resources
```

#### Pod requesting a MIG instance:
```yaml
resources:
  limits: { "nvidia.com/mig-1g.5gb": 1 }
```

#### Verify isolation:
Run two pods on the same physical GPU but different MIG instances. Run an OOM-inducing job in one; verify the other is unaffected.

### Strategy 2 — MPS (45 min)

#### Enable MPS in device plugin:
```yaml
sharing:
  mps:
    replicas: 4           # one GPU appears as 4 to the scheduler
```

#### Pod requesting a fractional GPU:
```yaml
resources:
  limits: { "nvidia.com/gpu": 1 }    # gets 1/4 of the actual GPU
```

#### Run 4 concurrent inference pods on one GPU.
Measure per-pod throughput and compare to single-pod baseline; expect ~70-80% combined throughput (vs sum if truly independent).

#### Demonstrate interference:
Run a memory-heavy training job in one pod; observe inference latency spikes in the others. **MPS does NOT isolate memory.**

### Strategy 3 — Time-Slicing (30 min)

#### Enable in device plugin:
```yaml
sharing:
  timeSlicing:
    resources:
      - name: nvidia.com/gpu
        replicas: 4
```

#### Pod requesting GPU as before; node now appears to have 4× as many GPUs.

#### Run 4 concurrent jobs. Observe:
- Each job sees 100% of GPU memory (no partition).
- Jobs interfere strongly under contention; throughput per job ~25% of dedicated.
- A pod with a memory leak takes down the whole GPU.

## Comparison

Run identical inference workload (iris-api at 100 req/s) under each strategy + a baseline (dedicated GPU). Record:
- p50/p95 latency per pod
- GPU memory used per pod
- Failure mode when one pod misbehaves

## Deliverables

1. Three working configurations.
2. `COMPARISON.md` table with measurements + interference observations.
3. `RECOMMENDATIONS.md`: when to pick each strategy.

## Validation

- [ ] MIG: one pod's OOM does NOT affect another pod on a different MIG slice.
- [ ] MPS: combined throughput of 4 pods ≥ 2× single-pod baseline.
- [ ] Time-slicing: 4 pods schedule on 1 GPU; latency degrades but no crash.

## Stretch goals

- Add **GPU operator** managed by Helm for production-grade installation.
- Use **DCGM** to monitor per-process GPU usage on shared GPUs.
- Combine MIG + MPS: small MIG slice running MPS for multiple small inference replicas.

## Common pitfalls

- **MIG requires reboot to enable/disable mode** — Not a hot-swap operation. Plan downtime.
- **MPS leaves a daemon running** — If pods crash, MPS daemon must be cleaned up or subsequent pods see stale state.
- **Time-slicing in prod** — Strongly discouraged. One badly-behaved tenant takes the whole GPU down.
- **Memory math** — MIG strictly partitions memory; MPS and time-slicing share it. Don't ask for more than you can isolate.

## Solutions

Reference manifests in the engineer-solutions repo.
