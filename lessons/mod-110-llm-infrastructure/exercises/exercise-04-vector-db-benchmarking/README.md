# Exercise 04: Vector Database Benchmarking

**Duration:** 3 hours
**Difficulty:** Intermediate
**Prerequisites:** Lab 03 (Qdrant)

## Objective

Benchmark 3 vector databases (Qdrant, Weaviate, pgvector) on the same workload (1M-10M vectors). Measure indexing speed, query latency, recall, RAM footprint. Produce a decision matrix.

## Why this matters

Vector DB choice locks in a year of operational habits + cost. Pick by reading marketing → regret. Pick by measuring on YOUR workload → confident decision.

## Requirements

1. 1M 384-dim vectors (use sentence-transformers embeddings of a corpus).
2. Same dataset loaded into all 3 DBs.
3. Benchmarks: index time, query p50/p95 at concurrency 1 + 32, recall@10, RAM.
4. Filtered query benchmark (with metadata filter).
5. Comparison matrix + recommendation.

## Step-by-step

### Step 1 — Generate dataset (30 min)
```python
from sentence_transformers import SentenceTransformer
from datasets import load_dataset

ds = load_dataset("wikipedia", "20220301.simple", split="train[:1000000]")
emb = SentenceTransformer("all-MiniLM-L6-v2")
vectors = emb.encode([x["text"][:200] for x in ds], batch_size=256, show_progress_bar=True)
# 1M × 384 float32 ≈ 1.5 GB
```

### Step 2 — Qdrant (45 min)
Index + benchmark + record.

### Step 3 — Weaviate (45 min)
```bash
docker run -d -p 8080:8080 semitechnologies/weaviate:1.39.13
```
Same dataset; same queries.

### Step 4 — pgvector (45 min)
```bash
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=app pgvector/pgvector:pg15
psql ... -c "CREATE EXTENSION vector; CREATE TABLE docs (id int, embedding vector(384), metadata jsonb);"
# COPY for bulk insert
psql -c "CREATE INDEX ON docs USING hnsw (embedding vector_cosine_ops);"
```

### Step 5 — Benchmark harness (45 min)
```python
import time, random
def bench(client, n_queries=1000, concurrency=1):
    queries = [random_vector() for _ in range(n_queries)]
    # ... run with thread pool
    return {"p50_ms": ..., "p95_ms": ..., "throughput_qps": ...}

results = {
    "qdrant":   bench(qdrant_client),
    "weaviate": bench(weaviate_client),
    "pgvector": bench(pg_conn),
}
```

### Step 6 — Filtered query benchmark (15 min)
Same query + metadata filter (e.g., `category = "science"`). Each DB has different filtering semantics; measure both speed and correctness.

### Step 7 — Comparison matrix (15 min)

| Metric | Qdrant | Weaviate | pgvector |
|---|---|---|---|
| Index time (1M vectors) | | | |
| Query p50 ms | | | |
| Query p95 ms | | | |
| Throughput @ c32 | | | |
| Recall@10 | | | |
| RAM | | | |
| Filtered query latency | | | |
| Operational complexity | | | |

## Deliverables

1. Benchmark scripts per DB.
2. `RESULTS.md` matrix.
3. `RECOMMENDATION.md` with when-to-pick-each.

## Validation

- [ ] All 3 DBs return similar top-k for same query.
- [ ] Recall@10 ≥ 0.95 in each (accept some difference at extremes).
- [ ] Benchmark numbers reproducible.

## Common pitfalls

- **Different distance metrics** — Cosine vs L2 produce different rankings; standardize.
- **Index parameter mismatch** — HNSW m=8 vs m=16 changes recall + speed. Match settings.
- **Warmup matters** — First query is always slow.
