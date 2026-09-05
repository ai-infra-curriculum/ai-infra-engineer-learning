# Module 10: LLM Infrastructure - Resources

## Official Documentation

### vLLM
- **Main Documentation:** https://docs.vllm.ai/
- **GitHub Repository:** https://github.com/vllm-project/vllm
- **Performance Benchmarks:** https://blog.vllm.ai/
- **Model Support:** https://docs.vllm.ai/en/latest/models/supported_models.html
- **API Reference:** https://docs.vllm.ai/en/latest/serving/openai_compatible_server.html
- **Performance Tuning:** https://docs.vllm.ai/en/latest/serving/performance.html

### LLM Frameworks & Libraries

**LangChain**
- **Documentation:** https://python.langchain.com/docs/
- **RAG Tutorial:** https://python.langchain.com/docs/use_cases/question_answering/
- **GitHub:** https://github.com/langchain-ai/langchain
- **Community:** https://discord.gg/langchain

**LlamaIndex (GPT Index)**
- **Documentation:** https://docs.llamaindex.ai/
- **RAG Guide:** https://docs.llamaindex.ai/en/stable/understanding/
- **GitHub:** https://github.com/run-llama/llama_index
- **Examples:** https://docs.llamaindex.ai/en/stable/examples/

**Hugging Face**
- **Transformers:** https://huggingface.co/docs/transformers/
- **PEFT (LoRA):** https://huggingface.co/docs/peft/
- **TRL (Fine-tuning):** https://huggingface.co/docs/trl/
- **Text Generation Inference:** https://huggingface.co/docs/text-generation-inference/
- **Model Hub:** https://huggingface.co/models

### Vector Databases

**Qdrant**
- **Documentation:** https://qdrant.tech/documentation/
- **Quick Start:** https://qdrant.tech/documentation/quick-start/
- **API Reference:** https://qdrant.tech/documentation/interfaces/
- **Performance Tuning:** https://qdrant.tech/documentation/guides/optimization/
- **GitHub:** https://github.com/qdrant/qdrant

**Weaviate**
- **Documentation:** https://weaviate.io/developers/weaviate
- **Quickstart:** https://weaviate.io/developers/weaviate/quickstart
- **Python Client:** https://weaviate.io/developers/weaviate/client-libraries/python
- **GitHub:** https://github.com/weaviate/weaviate

**Pinecone**
- **Documentation:** https://docs.pinecone.io/
- **Guides:** https://docs.pinecone.io/guides/
- **Python SDK:** https://docs.pinecone.io/reference/python-sdk

**Chroma**
- **Documentation:** https://docs.trychroma.com/
- **Getting Started:** https://docs.trychroma.com/getting-started
- **GitHub:** https://github.com/chroma-core/chroma

**Milvus**
- **Documentation:** https://milvus.io/docs
- **Python SDK:** https://milvus.io/docs/install-pymilvus.md
- **GitHub:** https://github.com/milvus-io/milvus

### Embedding Models

**Sentence Transformers**
- **Documentation:** https://www.sbert.net/
- **Pre-trained Models:** https://www.sbert.net/docs/pretrained_models.html
- **GitHub:** https://github.com/UKPLab/sentence-transformers

**OpenAI Embeddings**
- **Documentation:** https://platform.openai.com/docs/guides/embeddings
- **Best Practices:** https://platform.openai.com/docs/guides/embeddings/best-practices

**Instructor Embeddings**
- **GitHub:** https://github.com/xlang-ai/instructor-embedding
- **Paper:** https://arxiv.org/abs/2212.09741

### Model Optimization

**bitsandbytes (Quantization)**
- **GitHub:** https://github.com/TimDettmers/bitsandbytes
- **8-bit Optimization:** https://huggingface.co/blog/hf-bitsandbytes-integration

**GPTQ**
- **GitHub:** https://github.com/IST-DASLab/gptq
- **AutoGPTQ:** https://github.com/PanQiWei/AutoGPTQ
- **Paper:** https://arxiv.org/abs/2210.17323

**AWQ (Activation-aware Weight Quantization)**
- **GitHub:** https://github.com/mit-han-lab/llm-awq
- **Paper:** https://arxiv.org/abs/2306.00978

**GGUF/llama.cpp**
- **llama.cpp:** https://github.com/ggerganov/llama.cpp
- **GGUF Format:** https://github.com/ggerganov/ggml/blob/master/docs/gguf.md

---

## Books

### LLMs and Natural Language Processing

1. **"Build a Large Language Model (From Scratch)" by Sebastian Raschka**
   - Publisher: Manning (2024)
   - Focus: Understanding LLM internals and building from scratch
   - Level: Intermediate to Advanced
   - Link: https://www.manning.com/books/build-a-large-language-model-from-scratch

2. **"Natural Language Processing with Transformers" by Lewis Tunstall, Leandro von Werra, Thomas Wolf**
   - Publisher: O'Reilly (2022)
   - Focus: Hugging Face ecosystem and transformer models
   - Level: Intermediate
   - Link: https://www.oreilly.com/library/view/natural-language-processing/9781098136789/

3. **"Generative AI with LangChain" by Ben Auffarth**
   - Publisher: Packt (2024)
   - Focus: Building LLM applications with LangChain
   - Level: Beginner to Intermediate
   - Link: https://www.packtpub.com/product/generative-ai-with-langchain/

### AI Infrastructure & MLOps

4. **"Designing Machine Learning Systems" by Chip Huyen**
   - Publisher: O'Reilly (2022)
   - Focus: ML system design and production deployment
   - Level: Intermediate to Advanced
   - Link: https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/
   - Key chapters: Model deployment, serving infrastructure

5. **"Machine Learning Engineering" by Andriy Burkov**
   - Publisher: True Positive Inc (2020)
   - Focus: End-to-end ML engineering
   - Level: Intermediate
   - Free: http://www.mlebook.com/

### GPU Computing & Performance

6. **"Programming Massively Parallel Processors" by David Kirk, Wen-mei Hwu**
   - Publisher: Morgan Kaufmann (4th edition, 2022)
   - Focus: CUDA programming and GPU architecture
   - Level: Advanced
   - Link: https://www.elsevier.com/books/programming-massively-parallel-processors/kirk/978-0-323-91231-0

---

## Online Courses

### Free Courses

1. **"Introduction to Large Language Models" (Google Cloud)**
   - Platform: Google Cloud Skills Boost
   - Link: https://www.cloudskillsboost.google/paths/118
   - Duration: 3-4 hours
   - Level: Beginner
   - Topics: LLM basics, prompt engineering, deployment

2. **"LangChain for LLM Application Development" (DeepLearning.AI)**
   - Platform: DeepLearning.AI
   - Link: https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/
   - Duration: 1-2 hours
   - Level: Beginner
   - Topics: LangChain basics, RAG, agents

3. **"Vector Databases from Embeddings to Applications" (DeepLearning.AI)**
   - Platform: DeepLearning.AI
   - Link: https://www.deeplearning.ai/short-courses/vector-databases-embeddings-applications/
   - Duration: 1-2 hours
   - Level: Beginner
   - Topics: Embeddings, vector search, Weaviate

4. **"Building Applications with Vector Databases" (Pinecone)**
   - Platform: Pinecone Learn
   - Link: https://www.pinecone.io/learn/
   - Duration: Self-paced
   - Level: Beginner to Intermediate
   - Topics: Vector search, RAG, semantic search

5. **"Hugging Face Course" (Hugging Face)**
   - Platform: Hugging Face
   - Link: https://huggingface.co/learn/nlp-course/
   - Duration: Self-paced (20+ hours)
   - Level: Beginner to Advanced
   - Topics: Transformers, fine-tuning, deployment

### Paid Courses

6. **"LLM Engineering: Production RAG Applications" (Udemy)**
   - Platform: Udemy
   - Duration: 8-10 hours
   - Level: Intermediate
   - Topics: RAG systems, vector databases, production deployment

7. **"MLOps for Scaling LLMs and Generative AI" (Coursera)**
   - Platform: Coursera (Duke University)
   - Duration: 4 weeks
   - Level: Intermediate
   - Topics: LLM deployment, scaling, monitoring

8. **"Generative AI for Developers" (A Cloud Guru)**
   - Platform: A Cloud Guru
   - Duration: 6-8 hours
   - Level: Intermediate
   - Topics: LLM applications, deployment on AWS/GCP/Azure

---

## Interactive Learning & Playgrounds

### Hands-On Platforms

1. **Hugging Face Spaces**
   - Link: https://huggingface.co/spaces
   - Description: Interactive demos of LLMs and applications
   - Use: Explore models before deploying

2. **Replicate**
   - Link: https://replicate.com/
   - Description: Run open-source models via API
   - Use: Test models without infrastructure

3. **Modal Labs Playground**
   - Link: https://modal.com/
   - Description: Serverless GPU compute
   - Use: Deploy LLMs without managing infrastructure

4. **Google Colab**
   - Link: https://colab.research.google.com/
   - Description: Free Jupyter notebooks with GPU
   - Use: Experiment with models (limited to smaller models on free tier)

5. **Kaggle Notebooks**
   - Link: https://www.kaggle.com/code
   - Description: Free GPU notebooks (30 hours/week)
   - Use: Train and fine-tune models

### LLM Leaderboards & Benchmarks

6. **Open LLM Leaderboard (Hugging Face)**
   - Link: https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard
   - Use: Compare model performance

7. **LMSys Chatbot Arena**
   - Link: https://chat.lmsys.org/
   - Use: Compare LLMs interactively, see Elo ratings

8. **Artificial Analysis**
   - Link: https://artificialanalysis.ai/
   - Use: Compare LLM API pricing, performance, quality

---

## Tools & Libraries

### Python Libraries for LLM Development

```bash
# Core LLM frameworks
pip install transformers         # Hugging Face Transformers
pip install vllm                  # vLLM serving
pip install torch                 # PyTorch

# RAG and LLM applications
pip install langchain            # LangChain framework
pip install llama-index          # LlamaIndex (GPT Index)
pip install haystack-ai          # Haystack NLP

# Vector databases
pip install qdrant-client        # Qdrant
pip install weaviate-client      # Weaviate
pip install chromadb             # Chroma
pip install pinecone-client      # Pinecone
pip install pymilvus             # Milvus

# Embeddings
pip install sentence-transformers  # Sentence embeddings
pip install openai               # OpenAI API (embeddings, ChatGPT)
pip install cohere               # Cohere embeddings

# Fine-tuning
pip install peft                 # Parameter-efficient fine-tuning (LoRA)
pip install bitsandbytes         # 8-bit quantization
pip install trl                  # Transformer Reinforcement Learning
pip install datasets             # Hugging Face datasets

# Optimization
pip install auto-gptq            # GPTQ quantization
pip install autoawq              # AWQ quantization
pip install optimum              # Optimum (ONNX, quantization)

# Monitoring & Observability
pip install opentelemetry-api    # OpenTelemetry
pip install prometheus-client    # Prometheus metrics
pip install langsmith            # LangSmith (LangChain monitoring)

# Evaluation
pip install ragas                # RAG evaluation
pip install deepeval             # LLM evaluation
pip install rouge-score          # ROUGE metrics
pip install bert-score           # BERTScore
```

### Serving Frameworks

- **vLLM:** https://github.com/vllm-project/vllm (Production serving, PagedAttention)
- **Text Generation Inference (TGI):** https://github.com/huggingface/text-generation-inference (Hugging Face)
- **Ray Serve:** https://docs.ray.io/en/latest/serve/ (Distributed serving)
- **TensorRT-LLM:** https://github.com/NVIDIA/TensorRT-LLM (NVIDIA optimization)
- **OpenLLM:** https://github.com/bentoml/OpenLLM (BentoML)
- **Triton Inference Server:** https://github.com/triton-inference-server/server (NVIDIA)

### Fine-Tuning Frameworks

- **Axolotl:** https://github.com/OpenAccess-AI-Collective/axolotl (Unified fine-tuning)
- **FastChat:** https://github.com/lm-sys/FastChat (Training and serving)
- **LLaMA Factory:** https://github.com/hiyouga/LLaMA-Factory (Easy fine-tuning)
- **Alpaca LoRA:** https://github.com/tloen/alpaca-lora (LoRA fine-tuning)

### Evaluation Tools

- **RAGAS:** https://github.com/explodinggradients/ragas (RAG evaluation)
- **DeepEval:** https://github.com/confident-ai/deepeval (LLM evaluation)
- **LangSmith:** https://docs.smith.langchain.com/ (LangChain monitoring)
- **Phoenix:** https://github.com/Arize-ai/phoenix (LLM observability)
- **PromptTools:** https://github.com/hegelai/prompttools (Prompt testing)

### GPU Management

- **NVIDIA DCGM:** https://github.com/NVIDIA/dcgm-exporter (GPU monitoring)
- **nvitop:** https://github.com/XuehaiPan/nvitop (GPU process monitoring)
- **gpustat:** https://github.com/wookayin/gpustat (GPU status)

---

## GitHub Repositories & Examples

### Example Projects

1. **vLLM Examples**
   - Link: https://github.com/vllm-project/vllm/tree/main/examples
   - Description: Official vLLM examples

2. **LangChain Templates**
   - Link: https://github.com/langchain-ai/langchain/tree/master/templates
   - Description: Production-ready LangChain templates

3. **RAG Techniques**
   - Link: https://github.com/NirDiamant/RAG_Techniques
   - Description: Comprehensive RAG implementation patterns

4. **Awesome LLM**
   - Link: https://github.com/Hannibal046/Awesome-LLM
   - Description: Curated list of LLM resources

5. **Awesome LLMOps**
   - Link: https://github.com/tensorchord/Awesome-LLMOps
   - Description: LLM operations and infrastructure tools

6. **Private GPT**
   - Link: https://github.com/imartinez/privateGPT
   - Description: RAG system for private documents

7. **LocalGPT**
   - Link: https://github.com/PromtEngineer/localGPT
   - Description: Local document Q&A with LLMs

### Production-Ready Examples

8. **FastChat**
   - Link: https://github.com/lm-sys/FastChat
   - Description: Complete LLM serving platform (powers Chatbot Arena)

9. **BentoML LLM Examples**
   - Link: https://github.com/bentoml/BentoML/tree/main/examples
   - Description: Production LLM deployment

10. **Hugging Face Inference Examples**
    - Link: https://github.com/huggingface/text-generation-inference/tree/main/examples
    - Description: TGI deployment examples

### Fine-Tuning Examples

11. **Stanford Alpaca**
    - Link: https://github.com/tatsu-lab/stanford_alpaca
    - Description: Instruction fine-tuning dataset and method

12. **QLoRA Examples**
    - Link: https://github.com/artidoro/qlora
    - Description: Efficient fine-tuning with QLoRA

13. **LLaMA Recipes**
    - Link: https://github.com/facebookresearch/llama-recipes
    - Description: Fine-tuning and deployment recipes for Llama

---

## Video Content

### YouTube Channels

1. **AI Makerspace**
   - Link: https://www.youtube.com/@AIMakerspace
   - Topics: RAG systems, LLM applications, live builds
   - Level: Intermediate

2. **Sam Witteveen (RAG and LangChain)**
   - Link: https://www.youtube.com/@samwitteveenai
   - Topics: LangChain, RAG, vector databases
   - Level: Beginner to Intermediate

3. **1littlecoder (Llama.cpp and local LLMs)**
   - Link: https://www.youtube.com/@1littlecoder
   - Topics: Running LLMs locally, optimization
   - Level: Beginner to Intermediate

4. **Weights & Biases**
   - Link: https://www.youtube.com/@WeightsBiases
   - Topics: LLM training, fine-tuning, MLOps
   - Level: Intermediate to Advanced

5. **Andrej Karpathy**
   - Link: https://www.youtube.com/@AndrejKarpathy
   - Topics: Neural networks, LLMs from scratch
   - Level: Intermediate to Advanced

### Must-Watch Videos

6. **"Intro to Large Language Models" - Andrej Karpathy**
   - Link: https://www.youtube.com/watch?v=zjkBMFhNj_g
   - Duration: 1 hour
   - Level: Beginner
   - Topics: LLM overview, scaling laws, security

7. **"State of GPT" - Andrej Karpathy**
   - Link: https://www.youtube.com/watch?v=bZQun8Y4L2A
   - Duration: 45 min
   - Level: Intermediate
   - Topics: GPT training, fine-tuning, deployment

8. **"A Hackers' Guide to Language Models" - Jeremy Howard**
   - Link: https://www.youtube.com/watch?v=jkrNMKz9pWU
   - Duration: 1.5 hours
   - Level: Intermediate
   - Topics: LLM internals, fine-tuning, code generation

9. **"Building Production-Ready RAG Applications" - Jerry Liu**
   - Link: Search on YouTube
   - Topics: Advanced RAG techniques, LlamaIndex

10. **"vLLM: Easy, Fast, and Cheap LLM Serving"**
    - Link: https://www.youtube.com/results?search_query=vllm+serving
    - Topics: vLLM architecture, deployment

---

## Blogs & Articles

### Technical Blogs

1. **Hugging Face Blog**
   - Link: https://huggingface.co/blog
   - Topics: Model releases, optimization techniques, tutorials
   - Frequency: Weekly

2. **vLLM Blog**
   - Link: https://blog.vllm.ai/
   - Topics: Performance benchmarks, new features
   - Frequency: Monthly

3. **LangChain Blog**
   - Link: https://blog.langchain.dev/
   - Topics: RAG techniques, LangChain updates, case studies
   - Frequency: Weekly

4. **Simon Willison's Weblog**
   - Link: https://simonwillison.net/
   - Topics: LLM tools, prompting, applications
   - Frequency: Daily

5. **Jay Alammar's Blog**
   - Link: https://jalammar.github.io/
   - Topics: Visual explanations of transformers, LLMs
   - Highly recommended: "The Illustrated Transformer"

### Company Engineering Blogs

6. **OpenAI Research**
   - Link: https://openai.com/research/
   - Topics: GPT updates, research papers

7. **Anthropic Research**
   - Link: https://www.anthropic.com/research
   - Topics: Claude updates, safety research

8. **Google AI Blog**
   - Link: https://ai.googleblog.com/
   - Topics: PaLM, Gemini, infrastructure

9. **Meta AI Blog**
   - Link: https://ai.meta.com/blog/
   - Topics: Llama releases, research

10. **NVIDIA Developer Blog**
    - Link: https://developer.nvidia.com/blog/
    - Topics: GPU optimization, TensorRT, Triton

### Key Articles

11. **"The Illustrated Transformer" - Jay Alammar**
    - Link: https://jalammar.github.io/illustrated-transformer/
    - Topic: Visual guide to transformer architecture

12. **"What We Learned from a Year of Building with LLMs" - Chip Huyen et al.**
    - Link: https://www.oreilly.com/radar/what-we-learned-from-a-year-of-building-with-llms/
    - Topic: Production LLM best practices

13. **"Patterns for Building LLM-based Systems & Products" - Eugene Yan**
    - Link: https://eugeneyan.com/writing/llm-patterns/
    - Topic: LLM system design patterns

14. **"A Survey of Techniques for Maximizing LLM Performance" - OpenAI**
    - Link: https://platform.openai.com/docs/guides/prompt-engineering
    - Topic: Prompt engineering, RAG, fine-tuning

15. **"Building RAG-based LLM Applications for Production" - Anyscale**
    - Link: https://www.anyscale.com/blog/a-comprehensive-guide-for-building-rag-based-llm-applications-part-1
    - Topic: Production RAG systems

---

## Research Papers

### Essential Papers

1. **"Attention Is All You Need" (Transformer architecture)**
   - Link: https://arxiv.org/abs/1706.03762
   - Year: 2017
   - Impact: Foundation of all modern LLMs

2. **"Efficient Memory Management for Large Language Model Serving with PagedAttention" (vLLM)**
   - Link: https://arxiv.org/abs/2309.06180
   - Year: 2023
   - Impact: Enables efficient LLM serving

3. **"LoRA: Low-Rank Adaptation of Large Language Models"**
   - Link: https://arxiv.org/abs/2106.09685
   - Year: 2021
   - Impact: Parameter-efficient fine-tuning

4. **"QLoRA: Efficient Finetuning of Quantized LLMs"**
   - Link: https://arxiv.org/abs/2305.14314
   - Year: 2023
   - Impact: Fine-tuning large models on consumer GPUs

5. **"Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"**
   - Link: https://arxiv.org/abs/2005.11401
   - Year: 2020
   - Impact: Foundation of RAG systems

6. **"LLM.int8(): 8-bit Matrix Multiplication for Transformers at Scale"**
   - Link: https://arxiv.org/abs/2208.07339
   - Year: 2022
   - Impact: Efficient quantization

7. **"Flash Attention: Fast and Memory-Efficient Exact Attention"**
   - Link: https://arxiv.org/abs/2205.14135
   - Year: 2022
   - Impact: Faster attention computation

8. **"GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers"**
   - Link: https://arxiv.org/abs/2210.17323
   - Year: 2022
   - Impact: 4-bit quantization for LLMs

### Paper Repositories

9. **Papers with Code (LLMs)**
   - Link: https://paperswithcode.com/methods/area/natural-language-processing
   - Description: Papers with implementation code

10. **Hugging Face Papers**
    - Link: https://huggingface.co/papers
    - Description: Daily curated ML papers

---

## Podcasts

1. **Practical AI**
   - Link: https://changelog.com/practicalai
   - Topics: Applied AI, LLMs, infrastructure
   - Frequency: Weekly

2. **The TWIML AI Podcast**
   - Link: https://twimlai.com/
   - Topics: ML research, production systems
   - Frequency: Weekly

3. **Latent Space**
   - Link: https://www.latent.space/podcast
   - Topics: LLMs, AI engineering, infrastructure
   - Frequency: Weekly

4. **The Gradient Podcast**
   - Link: https://thegradientpub.substack.com/
   - Topics: AI research and interviews
   - Frequency: Bi-weekly

---

## Communities & Forums

### Discord Communities

1. **Hugging Face Discord**
   - Link: https://hf.co/join/discord
   - Topics: Models, transformers, deployment
   - Activity: Very active

2. **LangChain Discord**
   - Link: https://discord.gg/langchain
   - Topics: RAG, LangChain development
   - Activity: Very active

3. **vLLM Discord**
   - Link: https://discord.gg/vllm
   - Topics: vLLM deployment, optimization
   - Activity: Active

4. **Qdrant Discord**
   - Link: https://qdrant.to/discord
   - Topics: Vector search, RAG
   - Activity: Active

5. **LocalLLaMA Discord/Reddit**
   - Reddit: https://www.reddit.com/r/LocalLLaMA/
   - Topics: Running LLMs locally, optimization
   - Activity: Very active

### Forums & Discussion

6. **Hugging Face Forums**
   - Link: https://discuss.huggingface.co/
   - Topics: Model questions, deployment help

7. **r/MachineLearning (Reddit)**
   - Link: https://www.reddit.com/r/MachineLearning/
   - Topics: ML research, papers, discussions

8. **r/LLMDevs (Reddit)**
   - Link: https://www.reddit.com/r/LLMDevs/
   - Topics: LLM development and applications

9. **AI Stack Exchange**
   - Link: https://ai.stackexchange.com/
   - Topics: Q&A for AI questions

### Professional Networks

10. **MLOPS Community**
    - Link: https://mlops.community/
    - Slack: https://mlops-community.slack.com/
    - Topics: MLOps, production ML

11. **LLM Ops Community**
    - Link: https://llmops.space/
    - Topics: LLM operations, infrastructure

---

## Newsletters

1. **The Batch (DeepLearning.AI)**
   - Link: https://www.deeplearning.ai/the-batch/
   - Frequency: Weekly
   - Topics: AI news, research, tutorials

2. **AI Weekly**
   - Link: https://aiweekly.co/
   - Frequency: Three times weekly
   - Topics: What AI experts are reading and sharing across models, agents, research, funding, and policy

3. **Import AI**
   - Link: https://importai.substack.com/
   - Frequency: Weekly
   - Topics: AI research, papers, policy

4. **TLDR AI**
   - Link: https://tldr.tech/ai
   - Frequency: Daily
   - Topics: AI news, quick updates

5. **The Gradient**
   - Link: https://thegradient.pub/
   - Frequency: Bi-weekly
   - Topics: Long-form AI articles

6. **LangChain Newsletter**
   - Link: https://blog.langchain.dev/
   - Frequency: Weekly
   - Topics: LangChain updates, RAG techniques

7. **Superhuman AI**
   - Link: https://www.superhuman.ai/
   - Frequency: Weekly
   - Topics: AI tools, productivity, LLMs

---

## Cloud Platforms & GPU Providers

### Major Cloud Providers

1. **AWS**
   - EC2 with GPUs (G5, P4, P5 instances)
   - SageMaker for managed deployment
   - Bedrock for hosted LLMs
   - Link: https://aws.amazon.com/machine-learning/

2. **Google Cloud Platform**
   - Compute Engine with GPUs (A100, H100)
   - Vertex AI for managed ML
   - Link: https://cloud.google.com/vertex-ai

3. **Microsoft Azure**
   - Azure ML with GPU instances
   - Azure OpenAI Service
   - Link: https://azure.microsoft.com/en-us/products/machine-learning/

### GPU Cloud Providers (More Cost-Effective)

4. **Lambda Labs**
   - Link: https://lambdalabs.com/service/gpu-cloud
   - Pricing: ~50% cheaper than AWS
   - GPUs: A100, H100

5. **RunPod**
   - Link: https://www.runpod.io/
   - Features: Spot instances, serverless GPUs
   - GPUs: Various (RTX 4090, A100, H100)

6. **Vast.ai**
   - Link: https://vast.ai/
   - Features: Peer-to-peer GPU marketplace
   - Pricing: Very competitive

7. **Paperspace**
   - Link: https://www.paperspace.com/
   - Features: Gradient notebooks, managed deployment
   - GPUs: V100, A100

8. **CoreWeave**
   - Link: https://www.coreweave.com/
   - Features: Kubernetes-native, scale
   - GPUs: A40, A100, H100

9. **Together.ai**
   - Link: https://www.together.ai/
   - Features: Serverless inference, fine-tuning
   - Focus: Open-source models

### Serverless LLM Platforms

10. **Modal**
    - Link: https://modal.com/
    - Features: Serverless GPU compute, auto-scaling

11. **Banana.dev**
    - Link: https://www.banana.dev/
    - Features: Serverless ML inference

12. **Replicate**
    - Link: https://replicate.com/
    - Features: Run models via API, pay per use

---

## Certifications

### Relevant Certifications

1. **AWS Certified Machine Learning - Specialty**
   - Provider: Amazon Web Services
   - Link: https://aws.amazon.com/certification/certified-machine-learning-specialty/
   - Topics: Includes deployment and operations

2. **Google Professional Machine Learning Engineer**
   - Provider: Google Cloud
   - Link: https://cloud.google.com/learn/certification/machine-learning-engineer
   - Topics: ML infrastructure on GCP

3. **Microsoft Certified: Azure AI Engineer Associate**
   - Provider: Microsoft
   - Link: https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/
   - Topics: AI services on Azure

4. **Certified Kubernetes Administrator (CKA)**
   - Provider: CNCF/Linux Foundation
   - Link: https://training.linuxfoundation.org/certification/certified-kubernetes-administrator-cka/
   - Relevance: Essential for LLM deployment on Kubernetes

5. **NVIDIA Deep Learning Institute Certificates**
   - Provider: NVIDIA
   - Link: https://www.nvidia.com/en-us/training/
   - Topics: GPU programming, LLM deployment

---

## Staying Updated

### How to Keep Learning

1. **Follow Key Researchers on Twitter/X:**
   - Andrej Karpathy (@karpathy)
   - Harrison Chase (@hwchase17) - LangChain
   - Simon Willison (@simonw)
   - Jeremy Howard (@jeremyphoward)
   - Chip Huyen (@chipro)

2. **Subscribe to Release Notes:**
   - vLLM releases: https://github.com/vllm-project/vllm/releases
   - Hugging Face Transformers: https://github.com/huggingface/transformers/releases
   - LangChain releases: https://github.com/langchain-ai/langchain/releases

3. **Attend Conferences (Virtual or In-Person):**
   - NeurIPS (Neural Information Processing Systems)
   - ICML (International Conference on Machine Learning)
   - ACL (Association for Computational Linguistics)
   - MLOps World
   - AI Engineer Summit

4. **Join Webinars:**
   - Hugging Face events: https://huggingface.co/events
   - NVIDIA GTC: https://www.nvidia.com/gtc/
   - AWS re:Invent ML sessions

5. **Contribute to Open Source:**
   - vLLM, LangChain, vector databases
   - Document your learnings
   - Help others in communities

---

## Practice Projects

### Beginner Projects

1. **Deploy Your First LLM with vLLM**
   - Use Llama 2 7B
   - Deploy on a single GPU
   - Create OpenAI-compatible API

2. **Build a Simple RAG System**
   - Index a small document set (e.g., your notes)
   - Use Chroma or Qdrant
   - Query with LangChain

3. **Run LLM Locally with llama.cpp**
   - Download a GGUF model
   - Run on CPU or consumer GPU
   - Create a simple chat interface

### Intermediate Projects

4. **Production RAG System**
   - Multi-document support
   - Advanced chunking and retrieval
   - Reranking and evaluation
   - Deploy on Kubernetes

5. **Fine-Tune an LLM**
   - Use LoRA or QLoRA
   - Fine-tune Llama 2 7B on domain-specific data
   - Evaluate quality improvements
   - Deploy fine-tuned model

6. **LLM Monitoring Dashboard**
   - Collect metrics with Prometheus
   - Create Grafana dashboards
   - Add distributed tracing
   - Implement alerting

### Advanced Projects

7. **Multi-Model LLM Platform**
   - Deploy multiple models (7B, 13B, 70B)
   - Implement intelligent routing
   - Add semantic caching
   - Cost and performance optimization

8. **Domain-Specific AI Assistant**
   - Combine RAG with fine-tuning
   - Multi-step reasoning with agents
   - Production deployment with monitoring
   - Cost-optimized infrastructure

9. **LLM Infrastructure on Kubernetes**
   - Multi-GPU deployment
   - Auto-scaling based on queue depth
   - Blue-green deployments
   - Complete observability stack

---

## Cost Optimization Resources

### Pricing Comparisons

1. **Artificial Analysis - LLM API Pricing**
   - Link: https://artificialanalysis.ai/models
   - Compare: OpenAI, Anthropic, open-source hosting costs

2. **GPU Pricing Comparison**
   - Create spreadsheet comparing AWS, GCP, Azure, Lambda, RunPod, Vast.ai
   - Factor: Per-hour cost, commitment discounts, spot pricing

### Cost Calculators

3. **AWS Pricing Calculator**
   - Link: https://calculator.aws/
   - Use for: EC2 GPU instances, SageMaker

4. **GCP Pricing Calculator**
   - Link: https://cloud.google.com/products/calculator
   - Use for: Compute Engine with GPUs

---

## Weekly Learning Path

### Week 1: Foundations
- **Read:** Lessons 01-02
- **Videos:** Andrej Karpathy's "Intro to LLMs"
- **Hands-on:** Exercise 01 - Deploy Llama 2 with vLLM
- **Reading:** vLLM documentation

### Week 2: RAG & Vector Databases
- **Read:** Lessons 03-04
- **Courses:** DeepLearning.AI "Vector Databases" course
- **Hands-on:** Exercises 02-03
- **Reading:** LangChain RAG tutorial

### Week 3: Fine-Tuning
- **Read:** Lesson 05
- **Videos:** QLoRA paper walkthrough
- **Hands-on:** Exercise 04 - Fine-tune with LoRA
- **Reading:** Hugging Face PEFT documentation

### Week 4: Optimization
- **Read:** Lesson 06
- **Articles:** Flash Attention, quantization techniques
- **Hands-on:** Exercise 05 - Optimize inference
- **Benchmarking:** Compare quantized vs full precision

### Week 5: Platform & Production
- **Read:** Lessons 07-08
- **Case studies:** Production LLM architectures
- **Hands-on:** Exercises 06-08
- **Review:** Quiz and scenarios

---

## Additional Resources

### Datasets for Fine-Tuning

1. **Hugging Face Datasets**
   - Link: https://huggingface.co/datasets
   - Popular: Alpaca, Dolly, OpenOrca

2. **Instruction Tuning Datasets**
   - Alpaca: https://github.com/tatsu-lab/stanford_alpaca
   - Dolly: https://huggingface.co/datasets/databricks/databricks-dolly-15k
   - FLAN: https://github.com/google-research/FLAN

### Model Registries

3. **Hugging Face Model Hub**
   - Link: https://huggingface.co/models
   - Filter: Tasks, sizes, licenses

4. **Ollama Model Library**
   - Link: https://ollama.ai/library
   - Focus: Models for local deployment

---

## Keep Learning and Building!

The LLM infrastructure space evolves rapidly. The best way to stay current:

1. **Build projects** - Apply what you learn
2. **Share your work** - Blog posts, GitHub repos
3. **Engage with communities** - Discord, forums, conferences
4. **Read papers** - Stay on top of research
5. **Contribute** - Open-source projects, documentation

**You're now equipped with a comprehensive resource list for LLM infrastructure. Happy learning!**
