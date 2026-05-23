# Exercise 08: Multi-Architecture Builds (amd64 + arm64)

**Duration:** 2.5 hours
**Difficulty:** Intermediate
**Prerequisites:** Exercise 07 (BuildKit)

## Objective

Build, push, and verify a single Docker image that runs natively on both Intel/AMD (`linux/amd64`) and ARM (`linux/arm64`) hosts. Compare emulation-based vs native arm64 build performance, and validate the manifest list correctly serves each platform from a multi-arch image.

## Why this matters

AWS Graviton, GCP Tau T2A, and Apple Silicon laptops all run arm64. ML inference on Graviton can be 20-40% cheaper for the same throughput on CPU-bound models. A team that ships only amd64 images can't take advantage of any of this; a team that ships multi-arch has a one-line config change in their Helm values to switch.

## Requirements

1. Build the iris-api image for `linux/amd64` AND `linux/arm64`.
2. Push as a **manifest list** (single tag, two platform-specific images).
3. Verify with `docker manifest inspect` that both platforms are advertised.
4. Benchmark inference latency on each platform.
5. CI workflow that produces both per PR with a single command.

## Step-by-step

### Step 1 — Buildx setup (15 min)
```bash
docker buildx create --name multi --driver docker-container --bootstrap --use
docker buildx ls                # confirm both platforms available
```

### Step 2 — Cross-build via emulation (30 min)
```bash
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t ghcr.io/me/iris-api:multi \
  --push .
time ...
```
Note the arm64 build is slow under qemu emulation (often 5-10× slower than native).

### Step 3 — Native arm64 build (30 min)
Provision a Graviton (AWS) or Tau T2A (GCP) instance. SSH in. Install Docker + buildx. Run:
```bash
docker buildx build --platform linux/arm64 -t arm64-only:latest --load .
```
Compare time vs emulated.

### Step 4 — Verify manifest list (15 min)
```bash
docker manifest inspect ghcr.io/me/iris-api:multi
# Expect manifests for both linux/amd64 and linux/arm64

# On an arm64 host:
docker pull ghcr.io/me/iris-api:multi
docker run --rm ghcr.io/me/iris-api:multi uname -m   # → aarch64

# On amd64:
docker pull ghcr.io/me/iris-api:multi
docker run --rm ghcr.io/me/iris-api:multi uname -m   # → x86_64
```

### Step 5 — Benchmark inference (30 min)
On each platform: run the iris-api container and a Locust load test (mod-101 lab 04 pattern). Record throughput and p95 latency. Compare against equivalent x86 instance (e.g., M7g vs M7i in AWS).

### Step 6 — CI workflow (30 min)
GitHub Actions has a `linux/arm64` runner available (paid for private repos). Use `docker/build-push-action@v5` with the matrix:
```yaml
strategy:
  matrix:
    platform: [linux/amd64, linux/arm64]
runs-on: ${{ matrix.platform == 'linux/arm64' && 'ubuntu-22.04-arm' || 'ubuntu-22.04' }}
```
This avoids emulation entirely.

## Deliverables

1. Multi-arch image in your registry.
2. `BENCHMARKS.md` comparing emulated vs native build times.
3. `BENCHMARKS.md` comparing arm64 vs amd64 inference performance.
4. CI workflow that produces multi-arch images on PR.

## Validation

- [ ] `docker manifest inspect` shows both platforms.
- [ ] `docker run --platform linux/arm64` and `linux/amd64` both succeed.
- [ ] On an arm64 host: `docker run <image> uname -m` returns aarch64.
- [ ] Native arm64 build > 3× faster than emulated.
- [ ] arm64 inference benchmark recorded for at least one CPU model.

## Stretch goals

- Add a **windows/amd64** variant to the manifest list (for ML use that's rare; for general infra tooling more common).
- Use **`--provenance=true`** to attach SLSA provenance attestations.
- Add **multi-arch base image** of your own (a hardened slim base used across your team).
- Detect on container startup whether NEON/SVE instructions are available and use the right BLAS implementation.

## Common pitfalls

- **`--load` doesn't work for multi-arch** — `docker buildx build --platform ...` produces a manifest list which can't be loaded into the single-platform docker daemon. Use `--push`.
- **Building from amd64 deps wheel on arm64** — `pip install` may compile from source on the missing platform, dramatically slowing the build. Use `pip` wheels for both archs or compile in builder stage with `--platform`.
- **arm64 images smaller but slower for pure PyTorch ML** — CUDA isn't available on arm64 (yet). Use arm64 only for CPU inference; keep amd64 for GPU.
- **Manifest list mismatch with image tag** — Don't push to the same tag for single-arch and multi-arch builds; the latest one wins and breaks the manifest list.
