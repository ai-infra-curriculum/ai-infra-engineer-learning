# Exercise 11: ML-Specific Container Patterns

**Duration:** 3 hours
**Difficulty:** Intermediate
**Prerequisites:** Exercises 01-09

## Objective

Implement four ML-specific container patterns that aren't covered by generic Docker tutorials: model warmup at startup, init-container model preloading, sidecar-based dynamic batching, and read-only models with a configurable hot swap. Each pattern has a measurable impact on a real metric (cold-start latency, model swap downtime, peak throughput).

## Why this matters

Generic container patterns (multi-stage, non-root, healthchecks) get you 80% of the way. The remaining 20% is ML-specific and where the wins are. Engineers who know these patterns ship models that are noticeably faster and more available.

## Pattern 1 — Model Warmup at Startup

**Problem:** First request after deploy takes 10× longer because Python/PyTorch JIT, allocator setup, and CUDA graphs all compile lazily.

**Solution:** During lifespan startup, send a synthetic prediction through the inference path to warm everything.

```python
@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.model = joblib.load(MODEL_PATH)
    # Warmup
    dummy = np.zeros((1, FEATURE_COUNT), dtype=np.float32)
    for _ in range(5):
        app.state.model.predict(dummy)
    log.info("model warmed up")
    yield
```

**Validation:** Measure first-request latency on a freshly-started pod. Should be within 2× of steady-state, not 10×.

## Pattern 2 — Init Container for Model Download

**Problem:** Pulling a 7GB model into a container at startup blocks the readiness probe for minutes.

**Solution:** Use a Kubernetes initContainer to download the model to a shared volume; main container loads from local disk (fast).

```yaml
spec:
  initContainers:
    - name: model-download
      image: curlimages/curl:latest
      command: ["sh", "-c", "curl -fL $MODEL_URL -o /models/current.bin"]
      env: [{ name: MODEL_URL, value: "s3://models/iris/current.bin" }]
      volumeMounts: [{ name: models, mountPath: /models }]
  containers:
    - name: api
      image: iris-api:0.2
      volumeMounts: [{ name: models, mountPath: /models, readOnly: true }]
  volumes:
    - name: models
      emptyDir: { sizeLimit: 10Gi }
```

**Validation:** Pod becomes Ready within seconds of the initContainer finishing, vs the previous behavior of downloading inside the main container.

## Pattern 3 — Dynamic Batching Sidecar

**Problem:** Per-request inference wastes GPU; small batches are inefficient.

**Solution:** Sidecar container that aggregates requests for ~50ms then forwards as a batch to the model.

```yaml
spec:
  containers:
    - name: api            # accepts client requests, forwards to batcher
      image: iris-api-frontend:0.2
      ports: [{ containerPort: 8000 }]
    - name: batcher        # aggregates and calls model
      image: iris-api-batcher:0.2
      ports: [{ containerPort: 9000 }]
    - name: model          # actual inference, GPU-bound
      image: iris-api-model:0.2
      resources: { limits: { nvidia.com/gpu: 1 } }
```

The batcher uses an async queue with both size (32) and time (50ms) triggers, whichever comes first.

**Validation:** GPU utilization rises from ~10% per-request to ~70% batched. Throughput 5-10× higher with p99 latency at most 100ms worse.

## Pattern 4 — Hot Model Swap

**Problem:** Updating the model requires a rolling restart. Wasteful and risky.

**Solution:** Model loader watches a versioned symlink; on change, loads the new model side-by-side and atomically switches. No pod restart.

```python
import threading, time

_lock = threading.RLock()
_model = None
_loaded_version = None

def loader_thread():
    global _model, _loaded_version
    while True:
        try:
            actual = os.readlink("/models/active.symlink")
            if actual != _loaded_version:
                new = joblib.load(actual)
                with _lock:
                    _model = new
                    _loaded_version = actual
                log.info(f"swapped to model {actual}")
        except Exception as e:
            log.error(f"loader: {e}")
        time.sleep(10)

threading.Thread(target=loader_thread, daemon=True).start()

@app.post("/predict")
def predict(req):
    with _lock:
        m = _model
    return {"prediction": m.predict(req.features), "version": _loaded_version}
```

**Validation:** Update the symlink to point to a new model file. Within ~10s, predictions show the new version in the response. Zero pod restarts.

## Step-by-step

### Step 1 — Implement each pattern (15-30 min each)
Pick the iris-api or a slightly heavier model. Implement and test each pattern independently.

### Step 2 — Measure the impact (30 min)
For each pattern, capture the relevant metric before/after:
- Pattern 1: first-request latency
- Pattern 2: pod time-to-Ready
- Pattern 3: GPU utilization + throughput at fixed concurrency
- Pattern 4: model-swap downtime (should be ~zero)

### Step 3 — Production refinement (30 min)
Pick one pattern and add: structured logging, metrics for the pattern itself (warmup duration, batch fill time, swap events), error handling for failure cases.

### Step 4 — Write up (30 min)
`PATTERNS.md` documenting each pattern with: problem, when to use, when NOT to use, implementation summary, measured benefit.

## Deliverables

1. Working implementation of each of the 4 patterns.
2. Measurement table for each pattern's impact.
3. `PATTERNS.md` reference doc.
4. A k8s manifest set for each pattern (showing the YAML, not just code).

## Validation

- [ ] Pattern 1: first-request latency within 2× steady-state.
- [ ] Pattern 2: initContainer-based pod Ready in < 30s vs original time.
- [ ] Pattern 3: GPU util ≥ 50% under sustained load (vs single-digit per-request).
- [ ] Pattern 4: swap demonstrated without pod restart.

## Stretch goals

- Add **graceful drain** to pattern 3's batcher: on SIGTERM, complete all in-flight batches before exit.
- Combine patterns 2 and 4: initContainer downloads N models, hot swap chooses between them via config.
- Add **GPU memory pinning** with `torch.cuda.set_per_process_memory_fraction(0.9)` so the model gets predictable VRAM.

## Common pitfalls

- **Warmup happens in the wrong thread** — Async lifespan + sync model = warmup runs once on the wrong event loop. Use `asyncio.to_thread`.
- **initContainer doesn't share memory** — Use `emptyDir` volume, not container layers, for the shared model.
- **Sidecar batcher single point of failure** — When batcher crashes, all requests fail. Use a replica + a circuit-breaker fallback to per-request mode.
- **Hot swap doesn't atomically replace** — A reader could see partial state if the lock isn't held during reads. Always lock both write and read.
