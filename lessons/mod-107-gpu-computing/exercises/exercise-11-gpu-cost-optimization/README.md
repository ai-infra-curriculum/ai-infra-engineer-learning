# Exercise 11: GPU Cost Optimization Playbook

**Duration:** 3 hours
**Difficulty:** Intermediate
**Prerequisites:** Exercise 04 (cluster mgmt), 10 (sharing)

## Objective

For a representative ML serving + training workload, build a structured cost-optimization analysis: which GPU type to use, when to use spot, when to use reserved, when MIG vs separate instances, when on-demand vs serverless. Produce a recommendation that saves at least 40% off the naïve "always-on H100" baseline.

## Why this matters

GPU is typically the #1 line item on an ML team's cloud bill. Saving 40% on that line is often more impactful than 80% savings on everything else combined. Engineers who can do this analysis with confidence become unusually valuable.

## Requirements

1. Inventory: list of workloads with characteristics (training vs inference, latency budget, throughput, daily usage hours).
2. GPU price table (current AWS / GCP / Azure on-demand, spot, reserved/CUD).
3. For each workload, compute cost under at least 3 deployment strategies; identify the winner.
4. Final recommendation matrix with annotations.

## Step-by-step

### Step 1 — Workload inventory (30 min)
Define 5 workloads typical of an ML platform:
- **W1**: Real-time inference, 100 req/s avg, 500 req/s peak, p95 < 100ms.
- **W2**: Batch inference, 1B records overnight (4 hours).
- **W3**: LLM serving (Mistral-7B), 24/7, 50 req/s avg.
- **W4**: Training, 8 hours/day on weekdays, multi-GPU.
- **W5**: Notebook / experimentation, ad-hoc, 4-12 hours/week.

### Step 2 — GPU price table (15 min)
Compile current prices (as of your audit date). Sample:

| GPU | On-demand $/hr | Spot $/hr | 3yr-RI $/hr | TFLOPS fp16 | VRAM |
|---|---|---|---|---|---|
| H100 80GB | $4.10 | ~$1.60 | $2.20 | 1979 | 80 GB |
| A100 80GB | $2.90 | ~$1.10 | $1.45 | 624 | 80 GB |
| A100 40GB | $2.10 | ~$0.80 | $1.05 | 312 | 40 GB |
| L40S | $1.50 | ~$0.60 | $0.85 | 363 | 48 GB |
| L4 | $0.90 | ~$0.35 | $0.50 | 121 | 24 GB |
| T4 | $0.35 | ~$0.15 | $0.22 | 65 | 16 GB |

(Actual prices change; pull from your provider.)

### Step 3 — Per-workload analysis (90 min)

**W1 (real-time inference)** — fit by latency budget + steady demand:
- T4 latency too slow; A100 overspec; L40S right-sized.
- 24/7 = reserved instance wins (~50% off on-demand).
- HPA min-replicas during off-peak hours, max during peak.

**W2 (batch overnight)** — fit by throughput + cost:
- Spot instances, restart-tolerant pipeline → 60-70% off on-demand.
- A100 spot (1.10/hr) × 4 instances × 4 hours = $17.60 vs $46.40 on-demand.

**W3 (24/7 LLM serving)** — fit by VRAM + throughput:
- Mistral-7B fp16 fits in 14 GB → L40S or A100 40GB.
- 24/7 → reserved instance.
- L40S RI: $0.85 × 24 × 30 = $612/mo per GPU vs $0.90 on-demand = $648.
- A100 40GB RI: $1.05 × 24 × 30 = $756/mo (more performant per GPU; may need fewer).

**W4 (training weekdays)** — fit by interconnect + spot tolerance:
- Multi-GPU = NVLink matters → A100 or H100 with NVLink.
- Spot risky for long training; use checkpointed-resume + spot, or on-demand with reserved hourly.

**W5 (experimentation)** — fit by cheap + easy:
- MIG slice of a shared A100/L40S, time-slicing or per-user notebook.
- Or serverless GPU (Modal, Banana, RunPod) for true ad-hoc usage.

### Step 4 — Build the cost model (30 min)
Spreadsheet (or `cost_model.py`) computing monthly cost for each scenario. Sample:
```python
WORKLOADS = {
    "w1_inference": {
        "gpu": "L40S",
        "instances": {"min": 3, "max": 10, "avg": 4.5},
        "hours_per_day": 24,
        "purchase": "reserved-3yr",
    },
    ...
}
```

### Step 5 — Recommendation (30 min)
Write `RECOMMENDATIONS.md` with:
- Per-workload chosen GPU + purchase model
- Estimated monthly cost (annotated)
- Saved vs naïve baseline (e.g., "always-on H100 on-demand")
- Risk notes (spot interruption rate, reserved commitment regret)

### Step 6 — Stretch: implement it (depends on access)
If you have a real cloud account, provision the recommended setup for a week, capture actual cost via Cost Explorer, compare to model.

## Deliverables

1. Workload inventory.
2. Price table (with sources + dates).
3. Cost model spreadsheet or script.
4. `RECOMMENDATIONS.md` (1-2 pages).
5. Optional: actual cost data validating the model.

## Validation

- [ ] Total recommended cost ≤ 60% of naïve "H100 on-demand always" baseline.
- [ ] At least one workload uses spot; at least one uses reserved; at least one uses serverless or MIG.
- [ ] Each recommendation cites a specific characteristic (latency, throughput, VRAM, schedule).

## Stretch goals

- Add **NCG (NVIDIA Capacity Guarantee)** vs Capacity Reservations vs SP/CUD comparison.
- Build a **What-if Slider** dashboard: change utilization patterns, see cost impact.
- Implement **rightsizing automation**: a job that queries past 30d GPU utilization per pod and suggests downsizing.

## Common pitfalls

- **Reserved instances assume steady demand** — Buying 3yr RIs for variable workloads loses money. Compute break-even utilization (~60% of hours for 1yr RIs, ~75% for 3yr).
- **Spot interruption inflates real cost** — Add 20-30% overhead for re-runs.
- **TFLOPS isn't latency** — A 2× TFLOPS GPU isn't 2× faster for single-request inference; throughput scales, latency doesn't.
- **Hidden charges** — Storage (snapshots, EBS), network egress, NAT, ALB. Always include them.

## Solutions

Reference cost model in the engineer-solutions repo with prefilled price tables.
