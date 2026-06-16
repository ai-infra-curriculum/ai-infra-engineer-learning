# Lesson 05: Cloud Computing for ML Infrastructure

**Duration:** 5 hours
**Objectives:** Understand cloud computing fundamentals and how to leverage cloud platforms for ML infrastructure

## Introduction

As an ML infrastructure engineer, you'll spend most of your time working with cloud platforms. Understanding cloud computing fundamentals is essential for:

- Deploying ML models at scale
- Managing compute resources efficiently
- Storing and processing large datasets
- Building cost-effective infrastructure
- Ensuring high availability and reliability

This lesson covers cloud computing basics and introduces the three major cloud providers: AWS, GCP, and Azure.

## What is Cloud Computing?

Cloud computing is the delivery of computing services—including servers, storage, databases, networking, software, and analytics—over the internet ("the cloud") to offer faster innovation, flexible resources, and economies of scale.

### Key Characteristics

1. **On-Demand Self-Service**: Provision resources automatically without human interaction
2. **Broad Network Access**: Access from anywhere via standard mechanisms
3. **Resource Pooling**: Multi-tenant model with dynamic resource assignment
4. **Rapid Elasticity**: Scale up or down quickly based on demand
5. **Measured Service**: Pay only for what you use

### Cloud Service Models

```
┌─────────────────────────────────────────────────────────┐
│                     You Manage Everything               │
│  On-Premises                                            │
│  ┌────────────────────────────────────────────────┐    │
│  │ Applications │ Data │ Runtime │ Middleware │   │    │
│  │ OS │ Virtualization │ Servers │ Storage │     │    │
│  │ Networking                                      │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  IaaS (Infrastructure as a Service)                     │
│  Examples: AWS EC2, GCP Compute Engine, Azure VMs       │
│  ┌────────────────────────────────────────────────┐    │
│  │ Applications │ Data │ Runtime │ Middleware │   │ ←You│
│  │ OS                                              │    │
│  ├────────────────────────────────────────────────┤    │
│  │ Virtualization │ Servers │ Storage │ Networking│←Provider│
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  PaaS (Platform as a Service)                           │
│  Examples: AWS Elastic Beanstalk, GCP App Engine        │
│  ┌────────────────────────────────────────────────┐    │
│  │ Applications │ Data                            │ ←You│
│  ├────────────────────────────────────────────────┤    │
│  │ Runtime │ Middleware │ OS │ Virtualization │   │←Provider│
│  │ Servers │ Storage │ Networking                 │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  SaaS (Software as a Service)                           │
│  Examples: Gmail, Salesforce, Dropbox                   │
│  ┌────────────────────────────────────────────────┐    │
│  │ Everything managed by provider                  │    │
│  │ You just use the application                    │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

### For ML Infrastructure

**Most Common**: IaaS (full control over compute resources)
**Growing**: Managed ML services (SageMaker, Vertex AI, Azure ML)

## The Big Three Cloud Providers

### Market Share (2025)

| Provider | Market Share | Strengths | ML Services |
|----------|-------------|-----------|-------------|
| **AWS** | ~32% | Mature, most services | SageMaker, Bedrock |
| **Azure** | ~23% | Enterprise integration | Azure ML, OpenAI |
| **GCP** | ~11% | ML/AI innovation | Vertex AI, TPUs |
| **Others** | ~34% | Alibaba, Oracle, IBM | Various |

### AWS (Amazon Web Services)

**Founded:** 2006
**Headquarters:** Seattle, WA

**Strengths:**
- Most mature platform with widest service range
- Largest ecosystem and community
- Best documentation and learning resources
- Most third-party integrations
- Global infrastructure (30+ regions)

**ML-Relevant Services:**
- **EC2**: Virtual machines (including GPU instances)
- **S3**: Object storage for datasets and models
- **EKS**: Managed Kubernetes
- **SageMaker**: End-to-end ML platform
- **Lambda**: Serverless compute
- **ECR**: Container registry
- **CloudWatch**: Monitoring and logging

**Pricing Model:**
- Pay-as-you-go (per second/hour billing)
- Reserved instances (up to 75% discount)
- Spot instances (up to 90% discount)
- Savings plans for committed usage

### GCP (Google Cloud Platform)

**Founded:** 2008
**Headquarters:** Mountain View, CA

**Strengths:**
- Best for ML/AI (built on Google's ML infrastructure)
- Custom ML hardware (TPUs)
- Superior networking and data analytics
- BigQuery for large-scale data processing
- Strong Kubernetes support (created Kubernetes)

**ML-Relevant Services:**
- **Compute Engine**: Virtual machines
- **GCS** (Cloud Storage): Object storage
- **GKE**: Managed Kubernetes (best-in-class)
- **Vertex AI**: Unified ML platform
- **Cloud Functions**: Serverless compute
- **Cloud Run**: Containerized applications
- **Artifact Registry**: Container and package registry
- **Cloud Monitoring**: Observability

**Pricing Model:**
- Per-second billing (most granular)
- Committed use discounts (automatic)
- Sustained use discounts (automatic)
- Preemptible VMs (like AWS Spot)

### Azure (Microsoft Azure)

**Founded:** 2010
**Headquarters:** Redmond, WA

**Strengths:**
- Best enterprise integration (Active Directory, Office 365)
- Strong hybrid cloud support
- Partnership with OpenAI
- Good Windows support
- Global presence in regulated industries

**ML-Relevant Services:**
- **Virtual Machines**: Compute instances
- **Blob Storage**: Object storage
- **AKS**: Managed Kubernetes
- **Azure ML**: ML platform
- **Azure Functions**: Serverless
- **Container Registry**: Container storage
- **Azure Monitor**: Monitoring and diagnostics
- **Azure OpenAI**: GPT models as a service

**Pricing Model:**
- Pay-as-you-go
- Reserved VM instances
- Spot VMs
- Azure Hybrid Benefit (use existing licenses)

## Core Cloud Services for ML

### 1. Compute Services

**Purpose**: Run your code, train models, serve predictions

**VM Types for ML:**

```
┌─────────────────┬──────────────┬─────────────┬───────────────┐
│ Instance Type   │ CPU          │ Memory      │ Use Case      │
├─────────────────┼──────────────┼─────────────┼───────────────┤
│ General Purpose │ 2-64 vCPUs   │ 8-256 GB    │ API servers   │
│ Compute Opt.    │ 2-120 vCPUs  │ 4-240 GB    │ Batch jobs    │
│ Memory Opt.     │ 2-128 vCPUs  │ 16-4096 GB  │ Large models  │
│ GPU             │ 8-96 vCPUs   │ 61-1440 GB  │ Training      │
│ TPU (GCP only)  │ Custom       │ Custom      │ Large training│
└─────────────────┴──────────────┴─────────────┴───────────────┘
```

**GPU Instance Examples:**

AWS:
- `p3.2xlarge`: 1x V100 GPU, 8 vCPUs, 61 GB RAM (~$3/hour)
- `p4d.24xlarge`: 8x A100 GPUs, 96 vCPUs, 1152 GB RAM (~$32/hour)
- `g5.xlarge`: 1x A10G GPU, 4 vCPUs, 16 GB RAM (~$1/hour)

GCP:
- `n1-standard-8` + 1x V100: 8 vCPUs, 30 GB RAM (~$2.50/hour)
- `a2-highgpu-1g`: 1x A100, 12 vCPUs, 85 GB RAM (~$3.50/hour)

Azure:
- `NC6s_v3`: 1x V100, 6 vCPUs, 112 GB RAM (~$3/hour)
- `ND40rs_v2`: 8x V100, 40 vCPUs, 672 GB RAM (~$22/hour)

### 2. Storage Services

**Purpose**: Store datasets, models, logs, artifacts

**Storage Types:**

```
Object Storage (S3/GCS/Blob):
- Unlimited capacity
- Pay per GB stored + data transfer
- Best for: Datasets, models, logs
- Example: $0.023/GB/month

Block Storage (EBS/Persistent Disk/Managed Disk):
- Attached to VMs
- Fast, low-latency
- Best for: Databases, application data
- Example: $0.10/GB/month

File Storage (EFS/Filestore/Azure Files):
- Shared file systems
- NFS protocol
- Best for: Shared training data
- Example: $0.30/GB/month
```

**Storage Classes for ML:**

| Storage Class | Use Case | Cost | Retrieval Time |
|--------------|----------|------|----------------|
| Hot/Standard | Active datasets | $$ | Instant |
| Cool/Nearline | Infrequent access | $ | Instant |
| Archive | Long-term backup | ¢ | Hours |

### 3. Networking Services

**Purpose**: Connect resources, expose services, secure traffic

**Key Concepts:**

- **VPC (Virtual Private Cloud)**: Isolated network
- **Subnets**: Network segments within VPC
- **Security Groups**: Firewall rules
- **Load Balancers**: Distribute traffic
- **CDN**: Content delivery network

**Network Costs:**
- Within same region: Free or very cheap
- Between regions: $0.01-0.02/GB
- To internet: $0.05-0.09/GB
- **Important**: Data transfer is often the hidden cost!

## Setting Up Your First Cloud Environment

### AWS Setup

**Step 1: Create Account**
```bash
# Sign up at: https://aws.amazon.com/
# Free tier: 12 months of free services
# - 750 hours/month t2.micro (1 vCPU, 1GB RAM)
# - 5GB S3 storage
# - Various other services
```

**Step 2: Install AWS CLI**
```bash
# Install
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Verify
aws --version

# Configure (requires Access Key ID and Secret Access Key)
aws configure
# AWS Access Key ID: [your key]
# AWS Secret Access Key: [your secret]
# Default region name: us-east-1
# Default output format: json
```

**Step 3: Create First EC2 Instance**
```bash
# List available images
aws ec2 describe-images --owners amazon --filters "Name=name,Values=amzn2-ami-hvm-*" --query 'Images[0].[ImageId,Name]'

# Create security group
aws ec2 create-security-group \
  --group-name ml-serving \
  --description "ML model serving security group"

# Allow SSH and HTTP
aws ec2 authorize-security-group-ingress \
  --group-name ml-serving \
  --protocol tcp \
  --port 22 \
  --cidr 0.0.0.0/0

aws ec2 authorize-security-group-ingress \
  --group-name ml-serving \
  --protocol tcp \
  --port 8000 \
  --cidr 0.0.0.0/0

# Launch instance
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t2.micro \
  --key-name my-key-pair \
  --security-groups ml-serving \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=ml-server}]'

# Get instance IP
aws ec2 describe-instances \
  --filters "Name=tag:Name,Values=ml-server" \
  --query 'Reservations[0].Instances[0].PublicIpAddress'

# SSH into instance
ssh -i my-key-pair.pem ec2-user@<instance-ip>
```

### GCP Setup

**Step 1: Create Account**
```bash
# Sign up at: https://cloud.google.com/
# Free tier: $300 credit for 90 days + always-free tier
# - 1x e2-micro VM (0.25-1 vCPU, 1GB RAM)
# - 30GB HDD storage
# - 5GB Cloud Storage
```

**Step 2: Install gcloud CLI**
```bash
# Install
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Initialize
gcloud init
# Follow prompts to authenticate and select project

# Verify
gcloud --version
```

**Step 3: Create First VM**
```bash
# List available images
gcloud compute images list

# Create instance
gcloud compute instances create ml-server \
  --zone=us-central1-a \
  --machine-type=e2-medium \
  --image-family=ubuntu-2204-lts \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=30GB \
  --tags=http-server,https-server

# Allow firewall
gcloud compute firewall-rules create allow-ml-serving \
  --allow=tcp:8000 \
  --target-tags=http-server

# SSH into instance
gcloud compute ssh ml-server --zone=us-central1-a

# Stop instance (to save costs)
gcloud compute instances stop ml-server --zone=us-central1-a

# Delete instance
gcloud compute instances delete ml-server --zone=us-central1-a
```

### Azure Setup

**Step 1: Create Account**
```bash
# Sign up at: https://azure.microsoft.com/
# Free tier: $200 credit for 30 days + always-free services
# - 750 hours/month B1S VM (1 vCPU, 1GB RAM)
# - 5GB Blob storage
```

**Step 2: Install Azure CLI**
```bash
# Install
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Login
az login

# Verify
az --version
```

**Step 3: Create First VM**
```bash
# Create resource group
az group create --name ml-infra-rg --location eastus

# Create VM
az vm create \
  --resource-group ml-infra-rg \
  --name ml-server \
  --image UbuntuLTS \
  --size Standard_B2s \
  --admin-username azureuser \
  --generate-ssh-keys

# Open port
az vm open-port \
  --resource-group ml-infra-rg \
  --name ml-server \
  --port 8000

# Get IP address
az vm list-ip-addresses \
  --resource-group ml-infra-rg \
  --name ml-server \
  --output table

# SSH into VM
ssh azureuser@<vm-ip>

# Stop VM
az vm deallocate --resource-group ml-infra-rg --name ml-server

# Delete resources
az group delete --name ml-infra-rg --yes
```

## Cloud Cost Management

### Understanding Cloud Costs

**Typical ML Infrastructure Costs:**

```
Monthly Cost Breakdown (Example):

Compute (VMs/GPUs):        $5,000  (60%)
Storage (S3/GCS):          $1,000  (12%)
Data Transfer:             $800    (10%)
Load Balancers:            $500    (6%)
Kubernetes (managed):      $500    (6%)
Monitoring/Logging:        $300    (4%)
Other services:            $200    (2%)
─────────────────────────────────────
Total:                     $8,300/month
```

### Cost Optimization Strategies

**1. Right-Sizing**
```bash
# Don't over-provision!
# Start small, monitor, scale up if needed

# Example: Model serving
# ❌ Bad: 8 vCPUs, 32GB RAM ($200/month)
# ✅ Good: 2 vCPUs, 4GB RAM ($50/month)
# Monitor CPU/memory usage, adjust if needed
```

**2. Use Spot/Preemptible Instances**
```bash
# Up to 90% cheaper than on-demand
# Suitable for:
# - Batch inference
# - Training (with checkpointing)
# - Development environments

# AWS Spot
aws ec2 run-instances \
  --instance-market-options 'MarketType=spot' \
  --instance-type p3.2xlarge

# GCP Preemptible
gcloud compute instances create ml-trainer \
  --preemptible \
  --machine-type=n1-standard-8

# Risk: Can be terminated with 30-second notice
```

**3. Auto-Shutdown Idle Resources**
```bash
# Schedule shutdown of dev environments
# AWS Lambda example
# Stop instances with tag Environment=dev at 6 PM
# Start at 8 AM on weekdays

# Simple cron approach
# Add to instance's crontab:
0 18 * * * sudo shutdown -h now  # Shutdown at 6 PM
```

**4. Use Reserved Instances for Steady Workloads**
```bash
# 1-year commitment: ~30-40% discount
# 3-year commitment: ~50-60% discount

# Suitable for:
# - Production serving (always running)
# - Persistent services

# Not suitable for:
# - Training (sporadic)
# - Development (part-time)
```

**5. Monitor and Alert on Costs**
```bash
# AWS Cost Explorer
# GCP Cost Management
# Azure Cost Management

# Set budget alerts:
# - Daily budget: $100
# - Monthly budget: $3,000
# - Alert at 50%, 80%, 100%
```

### Cost Monitoring Tools

**Cloud-Native:**
- AWS Cost Explorer
- GCP Cost Management
- Azure Cost Management

**Third-Party:**
- CloudHealth
- Cloudability
- Kubecost (for Kubernetes)

## Basic Cloud Deployment Example

**Deploy a Simple Web Server:**

```bash
# 1. Launch instance (using GCP as example)
gcloud compute instances create web-server \
  --zone=us-central1-a \
  --machine-type=e2-medium \
  --image-family=ubuntu-2204-lts \
  --image-project=ubuntu-os-cloud \
  --tags=http-server

# 2. SSH into instance
gcloud compute ssh web-server --zone=us-central1-a

# 3. Install dependencies
sudo apt update
sudo apt install -y python3-pip
pip3 install fastapi uvicorn

# 4. Create simple app
cat > app.py << 'EOF'
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello from the cloud!"}

@app.get("/health")
def health():
    return {"status": "healthy"}
EOF

# 5. Run server
uvicorn app:app --host 0.0.0.0 --port 8000 &

# 6. Test locally
curl http://localhost:8000

# 7. Exit SSH and test externally
# Get external IP
EXTERNAL_IP=$(gcloud compute instances describe web-server \
  --zone=us-central1-a \
  --format='get(networkInterfaces[0].accessConfigs[0].natIP)')

# Create firewall rule
gcloud compute firewall-rules create allow-http-8000 \
  --allow=tcp:8000 \
  --target-tags=http-server

# Test from your machine
curl http://$EXTERNAL_IP:8000
```

## Cloud Best Practices for ML

### 1. Security

```bash
# ✅ Use IAM roles (not access keys)
# ✅ Enable MFA on root/admin accounts
# ✅ Use security groups to limit access
# ✅ Encrypt data at rest and in transit
# ✅ Regularly rotate credentials
# ✅ Use private subnets for databases
# ✅ Enable logging and monitoring
# ❌ Never commit credentials to Git
# ❌ Don't use root account for daily tasks
# ❌ Avoid public S3 buckets with sensitive data
```

### 2. Reliability

```bash
# ✅ Use multiple availability zones
# ✅ Implement health checks
# ✅ Set up auto-scaling
# ✅ Use managed services when possible
# ✅ Regular backups
# ✅ Disaster recovery plan
```

### 3. Performance

```bash
# ✅ Choose region close to users
# ✅ Use CDN for static assets
# ✅ Implement caching
# ✅ Monitor latency and throughput
# ✅ Use appropriate instance types
```

### 4. Cost Optimization

```bash
# ✅ Right-size instances
# ✅ Use spot/preemptible for non-critical
# ✅ Delete unused resources
# ✅ Use lifecycle policies for storage
# ✅ Monitor and set budget alerts
# ✅ Review costs monthly
```

## Comparing Cloud Providers for ML

| Feature | AWS | GCP | Azure |
|---------|-----|-----|-------|
| **ML Platform** | SageMaker | Vertex AI | Azure ML |
| **Best For** | Versatility | ML/AI Innovation | Enterprise |
| **GPU Options** | Excellent | Excellent + TPU | Good |
| **Kubernetes** | EKS | GKE (best) | AKS |
| **Pricing** | Complex | Simple | Medium |
| **Free Tier** | 12 months | $300 credit | $200 credit |
| **Documentation** | Excellent | Good | Good |
| **Market Share** | #1 | #3 | #2 |
| **Learning Curve** | Medium | Easy | Medium |

### Recommendation for Learning

**Start with GCP** because:
1. Simpler pricing and interface
2. Best Kubernetes support (critical for ML)
3. $300 free credit
4. Strong ML/AI focus
5. Easier to understand

**Then learn AWS** because:
1. Most job postings require it
2. Largest ecosystem
3. Most comprehensive services

**Learn Azure if:**
1. Working in enterprise environment
2. Need Microsoft integration
3. Specific Azure ML features needed

## Practical Exercise

**Task**: Deploy a simple FastAPI application to a cloud VM

**Steps:**
1. Choose a cloud provider (GCP recommended for beginners)
2. Create a free account
3. Launch a small VM instance (e2-micro for GCP, t2.micro for AWS)
4. SSH into the instance
5. Install Python and FastAPI
6. Create a simple health check endpoint
7. Run the server
8. Configure firewall to allow external access
9. Test from your local machine
10. **Important**: Shut down or delete the instance when done!

**Success Criteria:**
- Can access health endpoint from local browser
- Understand basic VM lifecycle (create, start, stop, delete)
- Can estimate monthly cost for keeping it running

## Key Takeaways

1. **Cloud computing** provides on-demand, scalable infrastructure
2. **Three models**: IaaS (most control), PaaS (less management), SaaS (just use it)
3. **Big three**: AWS (most mature), GCP (best for ML), Azure (best for enterprise)
4. **Core services**: Compute (VMs), Storage (S3/GCS), Networking (VPC, load balancers)
5. **Cost management** is critical: right-size, use spot instances, monitor usage
6. **Free tiers** exist for learning: AWS (12 months), GCP ($300), Azure ($200)
7. **Start with GCP** for learning, then learn AWS for career

## Self-Check Questions

1. What are the three cloud service models and their differences?
2. What are the key differences between AWS, GCP, and Azure?
3. What is a GPU instance and when would you use it?
4. What's the difference between object storage (S3) and block storage (EBS)?
5. How can you reduce cloud costs by 90% for batch workloads?
6. What is a spot/preemptible instance and when should you use it?
7. What are the main cost components in cloud ML infrastructure?

## Additional Resources

- [AWS Free Tier](https://aws.amazon.com/free/)
- [GCP Free Tier](https://cloud.google.com/free)
- [Azure Free Account](https://azure.microsoft.com/free/)
- [AWS ML Learning Path](https://aws.amazon.com/training/learn-about/machine-learning/)
- [GCP ML Guides](https://cloud.google.com/learn/training/machinelearning-ai)
- [Cloud Cost Optimization Guide](https://cloud.google.com/cost-management)
- [Kubernetes on Cloud Comparison](https://kubernetes.io/docs/setup/production-environment/turnkey-solutions/)

---

**Next Lesson:** [06-model-serving-basics.md](./06-model-serving-basics.md) - Understanding model serving fundamentals
