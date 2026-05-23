# Exercise 07: BuildKit Cache Optimization

**Duration:** 3 hours
**Difficulty:** Intermediate
**Prerequisites:** Exercises 01-06 (Dockerfiles + multi-stage)

## Objective

Apply advanced BuildKit features (cache mounts, secrets, registry-backed remote cache, multi-platform builds) to a real ML Docker image. Measure cold vs warm vs CI-cache build times and reduce CI build time by ≥70%.

## Why this matters

A 12-minute Docker build × 50 PRs/day × N engineers waiting on CI = a real bottleneck. Most teams default to `docker build` and never enable BuildKit's caching primitives. Engineers who can shave CI build time by 70% are noticeably impactful.

## Requirements

Build a Dockerfile + CI workflow that:

1. Uses **`# syntax=docker/dockerfile:1.6`** to enable modern BuildKit features.
2. Uses **`--mount=type=cache`** for `/root/.cache/pip` and `~/.cache/torch`.
3. Uses **`--mount=type=secret`** to inject a HuggingFace token at build time without baking it into a layer.
4. Pushes build cache to a **registry-backed cache** (GHCR or ECR cache).
5. Builds **multi-platform images** for both `linux/amd64` and `linux/arm64`.
6. CI workflow pulls the registry cache, achieves ≥70% reduction vs no-cache build.

## Step-by-step

### Step 1 — Baseline (15 min)
Time a no-cache build of a real ML image (e.g., PyTorch + transformers + ~500MB of weights):
```bash
docker buildx build --no-cache -t base:latest .
time ... ≈ 8-12 minutes on typical CI
```

### Step 2 — Add cache mounts (30 min)
```dockerfile
# syntax=docker/dockerfile:1.6
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install --no-cache-dir -r requirements.txt
COPY . .
```
Rebuild with `--cache-from`/`--cache-to local` and time the second build — should be near-instant for unchanged deps.

### Step 3 — Secret mount for HF token (30 min)
```dockerfile
RUN --mount=type=secret,id=hf_token,target=/run/secrets/hf_token \
    HF_TOKEN=$(cat /run/secrets/hf_token) \
    huggingface-cli download mistralai/Mistral-7B-Instruct-v0.3
```
```bash
docker buildx build --secret id=hf_token,src=$HOME/.cache/hf-token -t img:latest .
```
Verify the token doesn't appear in any image layer (`docker history img:latest`).

### Step 4 — Registry-backed cache (45 min)
```bash
docker buildx build \
  --cache-from type=registry,ref=ghcr.io/me/iris-api:cache \
  --cache-to type=registry,ref=ghcr.io/me/iris-api:cache,mode=max \
  -t ghcr.io/me/iris-api:latest \
  --push .
```
Mode `max` caches intermediate layers too (more storage, faster subsequent builds).

### Step 5 — Multi-platform build (30 min)
```bash
docker buildx create --use --name multiarch
docker buildx build --platform linux/amd64,linux/arm64 \
  --cache-from type=registry,ref=ghcr.io/me/iris-api:cache \
  -t ghcr.io/me/iris-api:multi --push .
```
ARM emulation is slow on x86 builders; use `--platform linux/arm64` on a real Graviton/Ampere runner for production.

### Step 6 — CI workflow (30 min)
GitHub Actions:
```yaml
- uses: docker/setup-buildx-action@v3
- uses: docker/login-action@v3
  with:
    registry: ghcr.io
    username: ${{ github.actor }}
    password: ${{ secrets.GITHUB_TOKEN }}
- uses: docker/build-push-action@v5
  with:
    context: .
    push: true
    platforms: linux/amd64,linux/arm64
    tags: ghcr.io/${{ github.repository }}/iris-api:${{ github.sha }}
    cache-from: type=registry,ref=ghcr.io/${{ github.repository }}/iris-api:cache
    cache-to: type=registry,ref=ghcr.io/${{ github.repository }}/iris-api:cache,mode=max
    secrets: |
      hf_token=${{ secrets.HF_TOKEN }}
```

### Step 7 — Measure (30 min)
Run the CI workflow three times:
1. After deleting the cache image (cold)
2. With cache, no source changes (full hit)
3. With cache, only application source changes (partial hit — should reuse deps but rebuild app layers)

Record numbers in `BENCHMARKS.md`.

## Deliverables

1. Optimized Dockerfile.
2. GitHub Actions workflow.
3. `BENCHMARKS.md` with the three timings + analysis.
4. Verification: `docker history` showing no leaked secrets.

## Validation

- [ ] Cold build (no cache image) succeeds.
- [ ] Warm build (cache + no source changes) takes < 30% of cold time.
- [ ] Partial change build (only app source modified) takes < 30% of cold time.
- [ ] Multi-arch image exists at the registry — `docker manifest inspect` shows both `linux/amd64` and `linux/arm64`.
- [ ] `docker history` does NOT contain the HF token.

## Stretch goals

- Add a **CodeBuild / GitHub Actions arm64 runner** to skip emulation entirely on the arm64 build.
- Use **`COPY --link`** for source files to enable cross-stage cache reuse.
- Add a **`docker scout cves`** step that gates the build on critical CVEs.

## Common pitfalls

- **Cache mount path inside container** — Must match the actual cache directory the tool uses (`/root/.cache/pip` for pip, NOT `/app/.cache/pip`).
- **Cache mode `max` consumes lots of registry storage** — Set a retention policy or use `mode=min` for less aggressive caching.
- **`--push` overwrites tags concurrently** — Two PRs racing can overwrite each other's cache. Use a per-branch cache tag.
- **Secrets leak via `RUN echo $HF_TOKEN`** — Secrets are only safe when read inside `RUN`; printing them puts them in build logs.
