# Job Requirements — AI Infrastructure Engineer

**Role:** AI Infrastructure Engineer (level 20, mid-level)
**Cycle:** 2026-11
**Postings analyzed:** 33 (last 90 days, window starting 2026-08-04)
**Owning learning track:** [`ai-infra-engineer-learning`](./)

This document maps requirements sampled from current job postings onto the existing curriculum. Machine-readable form is in [`.aicg/job-requirements.json`](./.aicg/job-requirements.json). Proposed additions (if any) live in [`.aicg/curriculum-plan-delta.json`](./.aicg/curriculum-plan-delta.json).

Ownership rule: each requirement is assigned to the lowest-level role where it is genuinely required. Higher-level tracks reference the owner unless they need different depth.

---

## Summary

Of 30 distinct requirements extracted, **25 are fully covered** by existing modules/exercises, **4 are partially covered** (deep ownership at senior/junior tracks per the ownership rule), and **1 uncovered item is far below the 0.30 frequency threshold** (MCP at 0.03). Per the continuity-bias policy, **no additions are proposed this cycle** — the fourth consecutive cycle to reach this conclusion (2026-08, 2026-09, 2026-10, 2026-11).

**The 2026-10 cycle set three concrete triggers for 2026-11. All three failed mechanically:**

- **NVIDIA Dynamo named in ≥10 postings:** observed 1/33 (Hippocratic AI only — "NVIDIA Dynamo/NIXL, SGLang, vLLM, or TensorRT-LLM"). **Not fired.**
- **OTel GenAI semantic conventions named at ≥0.30:** observed 0/33. Vanilla OpenTelemetry is named (Lambda p18, CoreWeave p20, Etched p11), but the `gen_ai.*` conventions overlay is still not named in any posting. The semconv-genai repo was moved to its own repository mid-2026 and is still marked "Development" (not stable) as of August 2026, which matches the posting-side silence. **Not fired.**
- **Bare-metal networking escalation (level-balanced n≥25 with hard-requirement rate ≥0.30):** observed level-balanced n=15 (below the n≥25 size bar) with hard-only rate 4/15 = 0.27 (below 0.30). **Not fired on either criterion.**

Signal stability vs 2026-10:

- **Bare-metal networking** held at **0.42** (was 0.40, 0.43). Level-balanced view (mid + mid-senior, n=15) is 0.33 — above the role-level threshold, but the escalation trigger required hard-requirement-only rate ≥0.30 at n≥25 and this cycle delivered neither. Hard-requirement DEPTH remains concentrated at senior/staff postings (Anthropic cluster infra, xAI Network, Anduril Physical Infra, Jane Street Performance). Mid-level mentions continue to list it as "bonus" or "familiarity." Senior-track ownership stays appropriate.
- **Go/Rust/C++ systems programming** held at **0.64** (was 0.69, 0.66). Ownership per the rule remains with the junior track (`ai-infra-junior-engineer-learning`). mod-101 already notes multi-language exposure. No engineer-track action warranted.
- **LLM serving frameworks** dipped to **0.18** (was 0.40, 0.34). Fully covered by mod-110 exercise-03 (vLLM deep-dive), exercise-01 (production LLM serving), and exercise-06 (inference optimization). Sampling composition (fewer dedicated inference-specialist shops this cycle).
- **Kubernetes** rebounded to **0.70** (was 0.54, 0.77) — sampling composition.
- **Observability** dipped to **0.18** (was 0.34, 0.46) — sampling composition.

Watch-list items from the 2026-10 trend-scan all remain **below** the 3-posting evidence floor at engineer level:

- **NVIDIA Dynamo:** 1/33 (Hippocratic). NVIDIA itself has multiple open Dynamo-tagged positions — expected vendor-side bias; non-NVIDIA posting-side signal has not expanded. First explicit "NIXL" mention appeared this cycle (Hippocratic).
- **Disaggregated inference:** 3/33 (Together Reliability p04, Fireworks p08, Hippocratic p10) — the 3-posting floor is cleared for the concept, but the overall rate is 0.09 and all three postings are at inference-specialist employers already prepared for by mod-110.
- **OTel GenAI conventions:** 0/33 — still not named.
- **Kubernetes DRA:** 1/33 (NVIDIA p19 — first explicit DRA mention; vendor-side).
- **MCP:** 1/33 (DoorDash MDX nice-to-have).

The 2026-10 "infra engineers build LLM agents for ops" signal continued to recede — now 0.06 (was 0.11, 0.23). The Together-AI-concentrated spike has resolved; this looks confirmed as an employer initiative rather than a market shift.

---

## Requirements by Category

### Programming Foundations

| Requirement | Frequency | Owner | Coverage |
|---|---|---|---|
| Python for infrastructure automation | 0.76 | [Junior AI Infra Engineer](../ai-infra-junior-engineer-learning/) | [`mod-101-foundations`](./lessons/mod-101-foundations/) |
| Systems programming in Go / Rust / C++ | 0.64 | [Junior AI Infra Engineer](../ai-infra-junior-engineer-learning/) — see [note](#note-on-gorustcpp) | [`mod-101-foundations`](./lessons/mod-101-foundations/) — partial |

**Evidence highlights:** Anthropic Distributed Systems (×2): *"Strong coding fundamentals with proficiency in Python, Rust, Go, Java, or similar languages"* (p01, p02). xAI Training/Inference equivalent lineage persists in Together AI Inference: *"Knowledge of Rust, Cython and compilers"* (p06). Together AI AI Infra Systems: *"Strong software engineering skills in Python, Go, or Rust"* (p07). Hippocratic AI: *"Python and C++"* implied via *"Deep systems programming in C++/CUDA"* (p10). Etched Test Infra: *"Strong coding skills in Python, C++, or Rust"* (p11). Perplexity MTS: *"Python and C++ programming focused on systems and infrastructure automation"* (p12). NVIDIA Containers: *"Expert level knowledge in a systems programming language (Go, C)"* (p19). CoreWeave: *"Strong coding in Python or Go (C++ a plus)"* (p20). Anduril Staff: *"Proficiency in Python, Go, C++, or similar backend languages"* (p27). Capital One: *"6+ years programming with Python, Go, Scala, or Java"* (p29). GitHub Copilot Inference: *"4+ years software engineering experience with production code in C, C++, C#, JavaScript, Go, Ruby, Rust, or Python"* (p30).

<a id="note-on-gorustcpp"></a>**Note on Go/Rust/C++:** Fourth consecutive cycle in the 0.64-0.69 band. Per the ownership rule, language-breadth sits at the junior track. mod-101 already notes multi-language exposure. The junior-track cycle (`ai-infra-junior-engineer-learning`) should evaluate whether a dedicated Go or Rust exercise is warranted there; not an engineer-level action.

### Containers & Orchestration

| Requirement | Frequency | Owner | Coverage |
|---|---|---|---|
| Docker, multi-stage builds, GPU containers | 0.15 (explicit) | This role | [`mod-103-containerization`](./lessons/mod-103-containerization/) |
| Production Kubernetes (CRDs, operators, GPU scheduling, RBAC) | 0.70 | This role | [`mod-104-kubernetes`](./lessons/mod-104-kubernetes/) |

**Evidence highlights:** Lambda Core Infra: *"5+ years in Platform, Infrastructure, or SRE roles, including running Kubernetes in production at scale ... Deep knowledge of Kubernetes internals and day-2 operations"* (p18). NVIDIA Containers/K8s: *"Strong understanding of Container Orchestration Systems (K8s) ... K8s Operator framework experience ... Enabling GPUs as first-class resources in cloud-native environments"* (p19). vCluster: *"5+ years deploying and operating Kubernetes in production, ideally on bare metal ... NVIDIA GPU Operators ... CNI plugins, overlay networks ... Kubernetes Operators"* (p21). Perplexity: *"Strong expertise in Kubernetes administration, including custom resource definitions, operators, and cluster management"* (p12). Deepgram Platform: *"expert-level knowledge of Kubernetes architecture and operations in a large-scale environment"* (p13). Docker continues to drift down as an explicitly-named requirement — baseline-assumption effect.

### Cloud Platforms

| Requirement | Frequency | Owner | Coverage |
|---|---|---|---|
| Deep AWS/GCP/Azure + working knowledge of a second | 0.21 (explicit) | This role | [`mod-102-cloud-computing`](./lessons/mod-102-cloud-computing/) |
| Multi-cloud + hybrid on-prem/cloud/edge patterns | 0.12 | This role | [`mod-102-cloud-computing`](./lessons/mod-102-cloud-computing/) + [`mod-109-infrastructure-as-code`](./lessons/mod-109-infrastructure-as-code/) |

**Evidence highlights:** Anthropic Infra: *"modern cloud infrastructure, including Kubernetes and infrastructure-as-code, on AWS and/or GCP"* (p01, p02). Deepgram: *"AWS experience ... Design, build, and optimize AI/ML job scheduling"* (p13). Gusto ML Platform: *"At least one of the major cloud platforms (AWS preferred but not required)"* (p26). Capital One: *"7+ years deploying scalable AI solutions on AWS, Google Cloud, Azure, or private cloud"* (p29). Mastercard: *"owning infrastructure roadmaps in on-premise or private cloud environments"* (p33). Explicit hyperscaler mentions continue to drift down as postings assume cloud fluency rather than name providers.

### Infrastructure as Code & CI/CD

| Requirement | Frequency | Owner | Coverage |
|---|---|---|---|
| Terraform (or equivalent IaC — Pulumi, Ansible), Helm | 0.21 | This role | [`mod-109-infrastructure-as-code`](./lessons/mod-109-infrastructure-as-code/) |
| CI/CD (GitHub Actions / GitLab); GitOps (ArgoCD/Flux) | 0.15 | This role | [`mod-109-infrastructure-as-code`](./lessons/mod-109-infrastructure-as-code/) + [`mod-106-mlops`](./lessons/mod-106-mlops/) |
| Secrets management, IAM, SSO/OIDC, API security | 0.00 | This role | [`mod-109-infrastructure-as-code`](./lessons/mod-109-infrastructure-as-code/) |

**Evidence highlights:** Together AI AI Infra Systems: *"Experience with Linux, Kubernetes, Terraform, Ansible, or similar infrastructure technologies"* (p07). Etched: *"Experience with automation and configuration management (e.g. Ansible, Terraform) and CI/CD"* (p11). Perplexity: *"Infrastructure as code tools (Terraform, Ansible) and GitOps practices"* (p12). Lambda: *"Proficient with infrastructure-as-code (Terraform, Pulumi, or equivalent) ... Strong with Helm, Kustomize, or similar, and GitOps-based delivery"* (p18). Deepgram: *"Proven, hands-on experience building and managing production infrastructure with Terraform"* (p13). The explicit secrets/IAM signal dropped to 0 this cycle (sampling composition — this cycle's enterprise/finance slice did not emphasize auth/identity).

### Observability & Reliability

| Requirement | Frequency | Owner | Coverage |
|---|---|---|---|
| Metrics/logs/traces (Prometheus, Grafana, OTel, Datadog) with SLOs | 0.18 | This role | [`mod-108-monitoring-observability`](./lessons/mod-108-monitoring-observability/) |
| On-call rotations, incident response, RCA | 0.12 | This role | [`mod-108-monitoring-observability`](./lessons/mod-108-monitoring-observability/) |
| OpenTelemetry GenAI semantic conventions (`gen_ai.*`) | **0.00** | This role | See [watch-list](#opentelemetry-genai-semantic-conventions--still-no-posting-signal) |

**Evidence highlights:** Etched: *"Experience with monitoring and observability tools (e.g. Prometheus, Grafana)"* (p11). Lambda: *"Hands-on with observability stacks (Prometheus, Grafana, OpenTelemetry)"* (p18). CoreWeave: *"Prometheus, Grafana, OpenTelemetry used to monitor and diagnose infrastructure"* (p20). Datadog: *"Developing new features and foundational capabilities within Datadog's LLM Observability product"* (p22). Together AI Reliability: *"operating them with clear reliability and observability standards"* (p10 — same category). **OTel GenAI semantic conventions still NOT named in any posting (0/33) — see watch-list.**

### GPU Computing & Distributed Training

| Requirement | Frequency | Owner | Coverage |
|---|---|---|---|
| NVIDIA GPU stack (CUDA, GPU Operator, MIG, GPU node ops) | 0.39 | This role | [`mod-107-gpu-computing`](./lessons/mod-107-gpu-computing/) |
| Distributed training (PyTorch DDP, FSDP, DeepSpeed, Ray Train, Megatron/JAX) | 0.09 | This role | [`mod-107-gpu-computing/exercises/exercise-06-distributed-gpu-training`](./lessons/mod-107-gpu-computing/exercises/exercise-06-distributed-gpu-training/) |
| **Bare-metal networking (InfiniBand, NCCL, NVLink, RoCE)** | **0.42 (sustained)** | [Senior AI Infra Engineer](../ai-infra-senior-engineer-learning/) | Partial — [`mod-107`](./lessons/mod-107-gpu-computing/) covers exposure; deep ops belong at senior/performance track |
| High-performance parallel storage (VAST, Weka, Lustre, DDN, GPUDirect Storage) | 0.24 | [Senior AI Infra Engineer](../ai-infra-senior-engineer-learning/) | Not directly covered; concept exposure via [`mod-107`](./lessons/mod-107-gpu-computing/) |
| GPU scheduling (NVIDIA GPU Operator, Run:AI/KAI, Volcano, **DRA**) | 0.15 | This role | [`mod-104-kubernetes`](./lessons/mod-104-kubernetes/) |

**Evidence highlights:** Anthropic: *"machine learning infrastructure such as GPUs, TPUs, or Trainium, and associated networking like NCCL"* (p01, p02). Together AI Inference India: *"GPU cluster software stack experience (NCCL, CUDA, InfiniBand/RoCE) ... Bare-metal provisioning exposure (PXE/iPXE, Redfish/IPMI, BMC)"* (p05). Together AI AI Infra Systems: *"GPU infrastructure, CUDA, NCCL, or NVLink/NVSwitch experience ... InfiniBand or RoCE networking experience"* (p07). Hippocratic: *"GPU communication technologies including NCCL, NVLink/NVSwitch, InfiniBand, RoCE, RDMA, UCX ... NVLS, SHARP, GPUDirect RDMA, UCX, or topology optimization"* (p10). Lightning AI Infra Ops: *"NVIDIA GPUs, DCGM, InfiniBand, RoCE/RDMA, NVLink ... PXE, BMC, IPMI, Redfish, or iDRAC ... VAST, Ceph, GPFS, or WEKA"* (p15). Ai2: *"Workload scheduler experience (Kubernetes or Slurm) ... High-performance networking knowledge (NCCL and InfiniBand) ... on-premises storage systems (WEKA and Ceph)"* (p16). CoreWeave: *"CUDA kernels, NCCL/SHARP, RDMA/NUMA, or GPU interconnect topologies"* (p20). Anduril Physical Infra: *"NVLink, InfiniBand, RoCE, Spectrum-X in 100+ GPU clusters ... VAST, DDN, Weka, Lustre ... NVIDIA NVL72 rack-scale systems ... Run:ai or similar GPU orchestration strongly preferred"* (p28). Jane Street: *"Infiniband, RoCE, GPUDirect, PXN, rail optimization, NVLink ... Collective algorithms in NCCL or MPI ... CUTLASS, CUB, Thrust, cuDNN, cuBLAS"* (p31). NVIDIA Containers: *"Standout: Container Device Interface (CDI) and Dynamic Resource Allocation (DRA)"* (p19) — **first explicit DRA mention this cycle**.

### LLM Serving & Inference Optimization

| Requirement | Frequency | Owner | Coverage |
|---|---|---|---|
| LLM serving frameworks (vLLM, SGLang, TensorRT-LLM, Triton, TGI, **Dynamo**); continuous batching, PagedAttention, KV-cache, token streaming, rate limiting | 0.18 | This role | [`mod-110-llm-infrastructure/exercises/exercise-03-vllm-deep-dive`](./lessons/mod-110-llm-infrastructure/exercises/exercise-03-vllm-deep-dive/) + [`exercise-01-production-llm-serving`](./lessons/mod-110-llm-infrastructure/exercises/exercise-01-production-llm-serving/) + [`exercise-06-inference-optimization-llm`](./lessons/mod-110-llm-infrastructure/exercises/exercise-06-inference-optimization-llm/) |
| NVIDIA-specific serving (Triton, Dynamo, NeMo, TensorRT) | 0.12 | This role | [`exercise-06-inference-optimization-llm`](./lessons/mod-110-llm-infrastructure/exercises/exercise-06-inference-optimization-llm/) + [`exercise-01-production-llm-serving`](./lessons/mod-110-llm-infrastructure/exercises/exercise-01-production-llm-serving/) |
| Model quantization (INT8/INT4/FP8/FP4/FP6, GPTQ, AWQ) | 0.03 | This role | [`exercise-06-inference-optimization-llm`](./lessons/mod-110-llm-infrastructure/exercises/exercise-06-inference-optimization-llm/) + [`mod-107/exercise-08-mixed-precision`](./lessons/mod-107-gpu-computing/exercises/exercise-08-mixed-precision/) |
| Advanced inference (speculative decoding, KV-cache tuning, prefix caching, Eagle, multi-LoRA, disaggregated serving) | 0.12 | This role | [`exercise-03-vllm-deep-dive`](./lessons/mod-110-llm-infrastructure/exercises/exercise-03-vllm-deep-dive/) + [`exercise-13-semantic-caching`](./lessons/mod-110-llm-infrastructure/exercises/exercise-13-semantic-caching/) |
| **NVIDIA Dynamo + NIXL** (disaggregated inference) | **0.03** | This role | [`exercise-03-vllm-deep-dive`](./lessons/mod-110-llm-infrastructure/exercises/exercise-03-vllm-deep-dive/) — conceptual substrate covered; see [watch-list](#nvidia-dynamo--disaggregated-inference-still-emerging) |

**Evidence highlights:** Together AI ML Inference: *"Knowledge of existing AI inference systems such as TGI, vLLM, TensorRT-LLM, or Optimum ... speculative decoding ... CUDA/Triton programming"* (p06). Fireworks: *"vLLM, Sglang, or TRT-LLM ... context length, disaggregated prefill, KV cache memory estimation"* (p08). Hippocratic: *"vLLM, SGLang, or TensorRT-LLM contributions ... speculative decoding and Eagle approaches ... FP4/FP6 quantization ... disaggregated serving with optimized caching ... NVIDIA Dynamo/NIXL"* (p10). Databricks Model Serving: *"model serving, inference systems, or related infrastructure ... Fine-tuned and proprietary large language models ... High-throughput, low-latency inference across CPU and GPU workloads"* (p23). Capital One: *"Expertise in LLM inference, VectorDBs, guardrails, and memory systems ... AWS Ultraclusters, Huggingface, PyTorch, VectorDBs, Nemo Guardrails"* (p29). GitHub Copilot: *"AI or large language model inference systems, model APIs, or model-provider integrations"* (p30).

### LLM Security, Guardrails, & Cost

| Requirement | Frequency | Owner | Coverage |
|---|---|---|---|
| LLM safety controls: guardrails, prompt-injection defense, PII redaction, tool-use security | 0.03 | This role | [`exercise-11-llm-guardrails`](./lessons/mod-110-llm-infrastructure/exercises/exercise-11-llm-guardrails/) |
| LLM cost routing/attribution, semantic caching, GPU utilization | 0.00 | This role | [`exercise-08-llm-cost-routing`](./lessons/mod-110-llm-infrastructure/exercises/exercise-08-llm-cost-routing/) + [`exercise-13-semantic-caching`](./lessons/mod-110-llm-infrastructure/exercises/exercise-13-semantic-caching/) + [`mod-107/exercise-11-gpu-cost-optimization`](./lessons/mod-107-gpu-computing/exercises/exercise-11-gpu-cost-optimization/) |

**Evidence highlights:** Capital One (p29): *"guardrails ... Nemo Guardrails"*. Zero explicit cost-routing mentions this cycle; prior-cycle Deepgram and Figma Internal AI signals have receded. Existing coverage holds — these are sampling-composition dips, not structural pullback.

### MLOps, Data Pipelines & Model Registry

| Requirement | Frequency | Owner | Coverage |
|---|---|---|---|
| Model registry, experiment tracking, feature stores (MLflow, Feast/Tecton, Argo Workflows) | 0.06 | This role | [`mod-106-mlops`](./lessons/mod-106-mlops/) |
| Data pipelines (Airflow/Prefect/Dagster/Argo, Spark, Kafka) | 0.03 | This role | [`mod-105-data-pipelines`](./lessons/mod-105-data-pipelines/) |
| Fine-tuning pipelines (LoRA, SFT, DPO, RLHF, GRPO) | 0.00 | This role | [`exercise-05-finetuning-at-scale`](./lessons/mod-110-llm-infrastructure/exercises/exercise-05-finetuning-at-scale/) |

**Evidence highlights:** Fireworks: *"PyTorch, MLflow, Vertex AI, SageMaker"* (p08). Gusto: *"designing and developing infrastructure and platform services for machine learning lifecycle"* (p26). DoorDash MDX: *"Nice To Haves: Kubernetes, Airflow, Ray"* (p25). Low cycle-level frequencies for data/MLflow/finetuning reflect sampling composition — the inference/HPC-heavy slice this cycle included fewer data-platform-heavy roles. Existing coverage holds.

---

## Requirements below threshold (watch-list, not proposed)

### Bare-metal networking — sustained signal, escalation trigger NOT fired

- **Frequency this cycle:** 0.42 (14/33 postings) — was 0.40 (2026-10), 0.43 (2026-09). Signal is stable across three consecutive cycles.
- **Level-balanced (mid + mid-senior, n=15):** 0.33 — above the role-level threshold.
- **Hard-requirement-only, level-balanced:** 4/15 = **0.27 — below the 0.30 escalation threshold.**
- **Sample size for the escalation trigger:** n=15 — **below the required n≥25.**
- **Status:** The 2026-10 cycle set a specific escalation trigger: "If the 2026-11 cycle shows a focused level-balanced sample (mid + mid-senior, n≥25) with ≥0.30 of mid-level postings listing bare-metal networking as a *hard* requirement (not 'bonus'), warrant an incremental mod-107 exercise." This cycle delivered neither the sample-size bar nor the hard-requirement rate. The role-level signal is reproducible but hard-requirement DEPTH remains concentrated at senior/staff postings (Anthropic Cluster Infra, xAI Network, Anduril Physical Infra, Jane Street Performance, Together AI Storage). At mid-level the asks continue to be "bonus" or "familiarity."
- **Decision this cycle:** Existing coverage in [`mod-107`](./lessons/mod-107-gpu-computing/) + lab-03 is sufficient at engineer level; ownership stays at [`ai-infra-senior-engineer-learning`](../ai-infra-senior-engineer-learning/). Continue monitoring. A 2026-12 cycle with a more inference/HPC-heavy mid-level sample (n≥25) could still fire this trigger.
- **Learner resources:** [NVIDIA NCCL docs](https://docs.nvidia.com/deeplearning/nccl/user-guide/), [NVIDIA DOCA / NIXL docs](https://docs.nvidia.com/doca/), [MLPerf Training methodology](https://mlcommons.org/benchmarks/training/) for topology-aware placement, [Ultra Ethernet Consortium](https://ultraethernet.org/) for RoCE evolution.

### NVIDIA Dynamo / disaggregated inference — still emerging

- **Frequency in sample:** 0.03 — Dynamo named explicitly only at Hippocratic AI (p10 — "NVIDIA Dynamo/NIXL, SGLang, vLLM, or TensorRT-LLM"). First explicit NIXL mention in a non-NVIDIA posting.
- **Trigger status:** The 2026-10 cycle set a trigger: "If 2026-11 shows Dynamo in ≥10 postings, propose an exercise addition to mod-110." Observed: **1/33. Mechanically below both the trigger (≥10) and the 3-posting evidence floor. Not fired.**
- **Context:** NVIDIA itself is hiring heavily for Dynamo across multiple open roles (vendor-side); non-NVIDIA posting-side adoption has not expanded in sync. The underlying concept (continuous batching, KV-cache management, prefill/decode separation) is already covered in [`exercise-03-vllm-deep-dive`](./lessons/mod-110-llm-infrastructure/exercises/exercise-03-vllm-deep-dive/) and [`exercise-06-inference-optimization-llm`](./lessons/mod-110-llm-infrastructure/exercises/exercise-06-inference-optimization-llm/); Dynamo is a peer serving framework that reuses this substrate. Learners who understand vLLM/SGLang internals transfer directly. Separately, the broader "disaggregated serving" concept now clears the 3-posting floor (Together Reliability p04, Fireworks p08, Hippocratic p10 = 3/33) but the overall rate 0.09 keeps it below the 0.30 continuity threshold.
- **Decision:** Watch-list. Re-measure 2026-12. If Dynamo ≥10 postings or "disaggregated serving" ≥0.30, propose an exercise addition to mod-110 next cycle.
- **Learner resources:** [NVIDIA Dynamo docs](https://docs.nvidia.com/dynamo/), [NVIDIA technical blog: Dynamo 1 production-ready](https://developer.nvidia.com/blog/nvidia-dynamo-1-production-ready), [Rafay blog on disaggregated inference](https://rafay.co/ai-and-cloud-native-blog/nvidia-dynamo-turning-disaggregated-inference-into-a-production-system).

### OpenTelemetry GenAI semantic conventions — still no posting signal

- **Frequency in sample:** **0/33** — second consecutive cycle at zero. Vanilla OpenTelemetry is named at Lambda (p18), CoreWeave (p20), and Etched (p11), but no posting references the `gen_ai.*` conventions overlay specifically.
- **Trigger status:** The 2026-10 cycle set a trigger: "If 2026-11 shows OTel GenAI conventions explicitly named at ≥0.30, propose an incremental mod-108 exercise." Observed: **0.00. Not fired.**
- **Context:** The semconv-genai conventions moved to a dedicated repository (`open-telemetry/semantic-conventions-genai`) in mid-2026 and are still marked **Development** (not stable) as of August 2026 — adoption is real at vendors (Datadog, TrueFoundry, Dash0, Lyzr, Greptime, OneUptime instrumentation) but the convention name has not propagated into posting language. Existing mod-108 OTel coverage captures the base skill.
- **Decision:** No change. Monitor whether 2026-12 postings start differentiating "OTel GenAI" / "`gen_ai.*` attributes" as a named requirement — likely contingent on the semconv-genai repo moving out of Development.
- **Learner resources:** [OTel GenAI semantic conventions spec](https://opentelemetry.io/docs/specs/semconv/gen-ai/), [open-telemetry/semantic-conventions-genai repo](https://github.com/open-telemetry/semantic-conventions-genai), [Greptime GenAI conventions post](https://greptime.com/blogs/2026-05-09-opentelemetry-genai-semantic-conventions).

### Agent orchestration for infra ops (build-your-own LLM-powered DevOps tools)

- **Frequency in sample (narrow — building AI agents to run infra):** 0.06 (p25 DoorDash MDX nice-to-have, p33 Mastercard "Agentic AI architectures") — was 0.11 (2026-10), 0.23 (2026-09).
- **Status:** Signal continues to recede. The 2026-10 Together-AI-concentrated spike has resolved; this looks confirmed as a Together-AI product initiative ("AI Infrastructure Agents") rather than a market shift. Enterprise analogues (Mastercard, Capital One GenAI Platform) sit at principal/senior level.
- **Decision:** Below the 0.30 threshold. No action. Watch-list.
- **Learner resources:** [Anthropic agent skills docs](https://docs.anthropic.com/en/docs/agents-and-tools/agent-skills), [OpenAI Agents SDK](https://openai.com/index/new-tools-for-building-agents/), [LangGraph docs](https://langchain-ai.github.io/langgraph/).

### Model Context Protocol (MCP)

- **Frequency in sample:** 0.03 (1 posting — DoorDash MDX nice-to-have, p25)
- **Status:** Fourth consecutive cycle in the 0.03-0.06 band. MCP adoption still emerging in postings. External analysis puts MCP at 17-24% of *agent-framework-tagged* postings — still below the 0.30 bar even inside that favorable sub-sample. Within generalist AI Infra Engineer postings it stays at 0.03-0.06.
- **Decision:** Below threshold. Watch-list.
- **Learner resources:** [modelcontextprotocol.io spec](https://modelcontextprotocol.io/), [Anthropic's MCP intro](https://www.anthropic.com/news/model-context-protocol).

### Ray / KubeRay / Ray Serve / Ray Train

- **Frequency in sample:** 0.12 (3 postings — Anyscale vendor p17, Anduril Staff p27, DoorDash MDX nice-to-have p25). Essentially flat vs 0.14 last cycle.
- **Status:** Steady but concentrated in a specific set of employers; alternative distributed compute layer already covered conceptually in mod-107.
- **Decision:** Below threshold; extension candidate for a future cycle.
- **Learner resources:** [Ray docs](https://docs.ray.io/en/latest/), [KubeRay](https://github.com/ray-project/kuberay).

### SLURM / HPC scheduling / bare-metal cluster provisioning

- **Frequency in sample:** 0.18 (6 postings — Perplexity, Deepgram, Lightning AI Infra Ops, Ai2, Lambda nice-to-have, Anduril Staff). Flat vs 0.20 last cycle.
- **Status:** SLURM continues to be dominant in frontier-lab training environments but not the default for the broader AI Infra Engineer market, which is Kubernetes-first. Perplexity (p12) explicitly names it as a hard requirement; others treat it as alternate scheduler alongside K8s.
- **Decision:** Below 0.30 at engineer level. Ownership remains with [`ai-infra-senior-engineer-learning`](../ai-infra-senior-engineer-learning/). mod-107 lab-03 gives sufficient engineer-level exposure.
- **Learner resources:** [SLURM docs](https://slurm.schedmd.com/).

### High-performance parallel storage (VAST, Weka, Lustre, DDN, Ceph, GPUDirect Storage)

- **Frequency in sample:** 0.24 (8 postings — Lightning AI ×2, Ai2, CoreWeave, vCluster, Anduril Physical, Jane Street, Shield AI). Uptick vs 0.14 last cycle, driven by HPC-heavy slice.
- **Status:** Signal is concentrated at bare-metal / HPC employers (Together AI dedicated Staff role in prior cycles, Anduril Physical Infra, Lightning AI, Jane Street). Mid-level mentions treat it as "exposure" rather than ownership.
- **Decision:** Below threshold. Ownership belongs with [`ai-infra-senior-engineer-learning`](../ai-infra-senior-engineer-learning/) alongside bare-metal networking. mod-107 exposure sufficient at engineer level.
- **Learner resources:** [NVIDIA GPUDirect Storage](https://docs.nvidia.com/gpudirect-storage/), [Weka architecture](https://www.weka.io/learn/glossary/), [VAST platform docs](https://www.vastdata.com/).

### AMD ROCm / AWS Trainium / Inferentia / Google TPU

- **Frequency in sample:** AWS Trainium / Google TPU explicitly named at Anthropic (p01, p02 — "GPUs, TPUs, or Trainium") and Anduril Staff (p27 — "AWS Trainium, Google TPUs, custom ASICs") — 3 postings total (0.09). AMD ROCm: 0 postings.
- **Status:** Trainium/TPU mentions clear the 3-posting evidence floor for the first time, but the overall rate 0.09 is still well below the 0.30 continuity threshold. AMD ROCm remains silent. Independent market data from prior cycles put ROCm at ~180 roles US-wide concentrated at AMD/Meta/HPE.
- **Decision:** No action. Monitor.
- **Learner resources:** [AMD ROCm docs](https://rocm.docs.amd.com/), [AWS Neuron SDK](https://awsdocs-neuron.readthedocs-hosted.com/), [Google Cloud TPU docs](https://cloud.google.com/tpu/docs).

### Container sandboxing (Firecracker, gVisor, Kata Containers)

- **Frequency in sample:** 0 postings this cycle (same as 2026-10).
- **Status:** Highly specialized; only surfaces in postings where the product is code-execution-as-a-service or in security-sensitive enterprises.
- **Decision:** Well below threshold. Better positioned at senior/architect level.
- **Learner resources:** [Firecracker](https://firecracker-microvm.github.io/), [gVisor](https://gvisor.dev/), [Kata Containers](https://katacontainers.io/).

### Kubernetes GPU scheduling via DRA / KAI Scheduler (post Run:ai acquisition)

- **Frequency in sample:** 0.03 (1 posting — NVIDIA Containers role p19 names "Container Device Interface (CDI) and Dynamic Resource Allocation (DRA)" as a "Standout" preferred qualification). Run:AI explicitly named at Anduril Physical (p28). No postings outside NVIDIA/Anduril yet.
- **Status:** First explicit DRA mention this cycle, but it's NVIDIA itself — a vendor-side first-mover signal, not market diffusion. Below the 3-posting evidence floor. mod-104 covers GPU scheduling at the right level of abstraction; DRA will slot into it as a natural update when it propagates further into postings.
- **Decision:** No action. Monitor; mod-104 can incrementally mention DRA on its next content refresh (not a research-cycle addition).
- **Learner resources:** [Kubernetes DRA docs](https://kubernetes.io/docs/concepts/scheduling-eviction/dynamic-resource-allocation/), [NVIDIA KAI Scheduler](https://github.com/NVIDIA/kai-scheduler).

---

## Coverage Map

| Module | Requirements it covers |
|---|---|
| [`mod-101-foundations`](./lessons/mod-101-foundations/) | Python foundations (owned at junior level); Go/Rust exposure |
| [`mod-102-cloud-computing`](./lessons/mod-102-cloud-computing/) | AWS/GCP/Azure; multi-cloud strategy |
| [`mod-103-containerization`](./lessons/mod-103-containerization/) | Docker, multi-stage builds, GPU containers, image security |
| [`mod-104-kubernetes`](./lessons/mod-104-kubernetes/) | K8s CRDs, operators, RBAC, GPU scheduling, Helm |
| [`mod-105-data-pipelines`](./lessons/mod-105-data-pipelines/) | Airflow, Spark, Kafka, DVC, data quality |
| [`mod-106-mlops`](./lessons/mod-106-mlops/) | MLflow, Feast, CI/CD for ML, deployment strategies, retraining |
| [`mod-107-gpu-computing`](./lessons/mod-107-gpu-computing/) | CUDA, GPU cluster ops, DDP/FSDP/DeepSpeed, mixed precision, cost, SLURM exposure, NCCL exposure |
| [`mod-108-monitoring-observability`](./lessons/mod-108-monitoring-observability/) | Prometheus/Grafana/OTel/Jaeger; SLI/SLO; on-call |
| [`mod-109-infrastructure-as-code`](./lessons/mod-109-infrastructure-as-code/) | Terraform, Pulumi, GitOps, policy-as-code, secrets |
| [`mod-110-llm-infrastructure`](./lessons/mod-110-llm-infrastructure/) | vLLM, RAG, vector DBs, guardrails, cost routing, semantic caching, evaluation, fine-tuning |
| [`project-101-basic-model-serving`](./projects/project-101-basic-model-serving/) | End-to-end FastAPI/Docker/K8s/Prometheus serving |
| [`project-102-mlops-pipeline`](./projects/project-102-mlops-pipeline/) | Airflow + MLflow + DVC + K8s CI/CD |
| [`project-103-llm-deployment`](./projects/project-103-llm-deployment/) | vLLM + vector DB + LangChain + K8s GPU + Terraform + Prometheus |

---

## Delta

See [`.aicg/curriculum-plan-delta.json`](./.aicg/curriculum-plan-delta.json). Per the continuity-bias policy, **this cycle proposes zero new modules, exercises, or projects** — the fourth consecutive cycle to reach this conclusion.

The three specific triggers set by the 2026-10 cycle all failed mechanically this cycle:

1. **Dynamo ≥10 postings** → observed 1/33.
2. **OTel GenAI explicit ≥0.30** → observed 0/33.
3. **Bare-metal networking escalation (level-balanced n≥25, hard-only rate ≥0.30)** → observed n=15, hard-only rate 0.27.

The sustained above-threshold signals (bare-metal networking at 0.42, Go/Rust/C++ at 0.64) are already assigned under the ownership rule to the senior and junior tracks respectively; existing engineer-level coverage is sufficient. The three emerging items from the 2026-10 cycle (NVIDIA Dynamo, disaggregated inference, OTel GenAI conventions) all remain at or below the 3-posting evidence floor, and the conceptual substrate for all three is already covered in mod-108 / mod-110. A newly-named requirement this cycle — Kubernetes DRA (NVIDIA p19) — is also at 1/33 (vendor-side first-mover) and sits comfortably within mod-104's GPU-scheduling abstraction.

**Trigger carry-forward to 2026-12:**
- Dynamo ≥10 postings OR "disaggregated serving" ≥0.30 → propose mod-110 Dynamo/disaggregated-inference exercise.
- OTel GenAI conventions explicit ≥0.30 → propose mod-108 LLM-telemetry exercise.
- Bare-metal networking level-balanced hard-only ≥0.30 at n≥25 → propose mod-107 NCCL-topology/all-reduce-benchmark exercise.
