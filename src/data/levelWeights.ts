export interface LevelWeightInfo {
  interviewScore: number; // out of 10
  jobScore: number; // out of 10
  interviewRationale: string;
  jobRationale: string;
  roleFocus: string;
  studyDepth: 'Core Mastery' | 'Working Fluency' | 'Selective / Skim';
  roleNote?: string;
  isCoreForRole?: boolean;
}

export const SCORE_INTERPRETATION_NOTE =
  "How to interpret these scores: Ratings are calibrated study-priority estimates for the currently selected Target Role Track (Interview Weight vs Day-to-Day On-The-Job Weight), not rigid guarantees. Toggle any role above to recalculate scores, bars, and role-specific focus for this level.";

export interface RoleOverrideEntry {
  interviewScore: number;
  jobScore: number;
  studyDepth: 'Core Mastery' | 'Working Fluency' | 'Selective / Skim';
  roleFocus: string;
}

export interface RolePriorityPath {
  role: string;
  focus: string;
  keyLevels: string;
  coreBadges: string[];
  partTimeTimeline: string;
  intensiveTimeline: string;
  scoreOverrides: Record<string, RoleOverrideEntry>;
}

/**
 * Base descriptions aligned 1-to-1 with the actual 20 Levels of the Roadmap:
 * L0: Software Engineering Fundamentals
 * L1: Python & Scientific Computing
 * L2: Mathematics for Machine Learning
 * L3: Probability & Statistics
 * L4: Data Analysis & Feature Engineering
 * L5: Classical Machine Learning
 * L6: Model Evaluation & Generalization
 * B:  PyTorch Readiness Bridge
 * L7: Neural Networks from First Principles
 * L8: Optimization & Training Dynamics
 * L9: Deep Learning Architectures
 * L10: Representation & Self-Supervised Learning
 * L11: Advanced ML Methods
 * L12: Research Methods & Experimental Science
 * L13: NLP, Computer Vision, and Foundation Models
 * L14: Applied ML Research Specialization
 * L15: End-to-End ML Engineering & MLOps
 * L16: ML Systems & Scalability
 * L17: Portfolio & Research Capstone
 * L18: Interview Preparation
 */
export const LEVEL_WEIGHTS_BY_BADGE: Record<
  string,
  Omit<LevelWeightInfo, 'roleFocus' | 'studyDepth' | 'isCoreForRole'>
> = {
  '0': {
    interviewScore: 9,
    jobScore: 10,
    interviewRationale:
      '**Python fluency, data structures, complexity analysis, debugging and clean modular code** are tested in almost every first-round technical screen and coding loop.',
    jobRationale:
      '**Readable, type-safe Python, Git workflows, unit testing (`pytest`), and CLI packaging** make every downstream ML pipeline maintainable in production.',
  },
  '1': {
    interviewScore: 7,
    jobScore: 9,
    interviewRationale:
      'Practical coding screens frequently test **NumPy broadcasting, vectorisation without loops, memory views vs copies, and leakage-free Pandas joins/aggregations**.',
    jobRationale:
      '**Vectorised array operations, numerical stability (`logsumexp`), and memory-efficient Parquet/DataFrame processing** are used daily across data and feature pipelines.',
  },
  '2': {
    interviewScore: 8,
    jobScore: 7,
    interviewRationale:
      'Expect to explain **SVD/PCA, positive-semi-definite matrices, chain-rule Jacobians, reverse-mode autodiff, MLE vs MAP, and KL divergence / cross-entropy**.',
    jobRationale:
      'Mathematical fluency lets you **reason about tensor shapes, low-rank adapters (LoRA), ill-conditioned features, and loss function geometry** without guessing.',
  },
  '3': {
    interviewScore: 9,
    jobScore: 9,
    interviewRationale:
      '**Hypothesis testing, confidence intervals, bootstrap, power/MDE calculation, A/B testing pitfalls (SRM, peeking, CUPED), and causal confounding** are core interview topics.',
    jobRationale:
      'Statistical rigour prevents **shipping noise**, powers **online experimentation**, and turns raw model metrics into **defensible product decisions**.',
  },
  '4': {
    interviewScore: 8,
    jobScore: 10,
    interviewRationale:
      'Case studies and practical rounds heavily probe **missingness mechanisms (MCAR/MAR/MNAR), high-cardinality encoding, point-in-time joins, and temporal/group leakage**.',
    jobRationale:
      'In real industry work, **auditing data grain, fixing silent leakage, and building clean feature pipelines** yield larger gains than swapping model architectures.',
  },
  '5': {
    interviewScore: 9,
    jobScore: 9,
    interviewRationale:
      'Hiring loops regularly test **L1 vs L2 regularisation, logistic calibration, decision trees, random forests vs GBDTs (XGBoost/LightGBM/CatBoost), and SHAP/permutation importance**.',
    jobRationale:
      '**Gradient-boosted trees and calibrated linear baselines** remain the fastest, cheapest, and strongest production models for structured/tabular problems.',
  },
  '6': {
    interviewScore: 9,
    jobScore: 10,
    interviewRationale:
      'Interviewers probe **validation vs test governance, nested/grouped/temporal splits, PR-AUC vs ROC-AUC, cost-sensitive thresholds, paired significance tests, and conformal prediction**.',
    jobRationale:
      '**Leakage-safe evaluation harnesses, worst-slice analysis, and calibrated decision thresholds** determine whether an offline model actually survives in production.',
  },
  B: {
    interviewScore: 8,
    jobScore: 9,
    interviewRationale:
      'Deep learning coding rounds often ask you to **write a clean `nn.Module`, implement a training step from scratch, or debug device/shape/gradient-accumulation bugs**.',
    jobRationale:
      'Fluency with **tensors, `autograd`, `DataLoader`, mixed precision (`torch.amp`), and checkpointing** is the entry gate to all modern deep learning work.',
  },
  '7': {
    interviewScore: 8,
    jobScore: 8,
    interviewRationale:
      'Expect to derive and implement **forward and backward passes by hand, Xavier/He initialisation, ReLU/GELU activations, dropout scaling, and the one-batch overfit diagnostic**.',
    jobRationale:
      'First-principles mastery of **backpropagation and activation/gradient flow** lets you debug dead neurons, constant-loss bugs, and broken custom losses rapidly.',
  },
  '8': {
    interviewScore: 8,
    jobScore: 9,
    interviewRationale:
      'Deep learning loops test **SGD with momentum vs AdamW (decoupled weight decay), warmup + cosine schedules, BatchNorm vs LayerNorm/RMSNorm, gradient clipping, and GPU memory breakdown**.',
    jobRationale:
      '**Training stability, mixed-precision throughput, activation checkpointing, and DDP scaling** directly control whether large runs converge or blow up to `NaN`.',
  },
  '9': {
    interviewScore: 9,
    jobScore: 9,
    interviewRationale:
      'Core architecture rounds cover **CNNs & receptive fields, RNN/LSTM gating, scaled dot-product attention ($QK^\\top/\\sqrt{d_k}$), KV cache memory, FlashAttention, VAEs, Diffusion, and GNNs**.',
    jobRationale:
      'Choosing the right **inductive bias, attention mechanism, and compression strategy (quantisation, distillation, pruning)** is central to meeting accuracy and latency budgets.',
  },
  '10': {
    interviewScore: 7,
    jobScore: 8,
    interviewRationale:
      'Representation & embedding interviews test **InfoNCE & temperature $\\tau$, SimCLR vs MoCo, non-contrastive collapse prevention (BYOL/VICReg), CLIP, and linear-probe vs k-NN eval**.',
    jobRationale:
      '**Pretrained embeddings, contrastive fine-tuning, and hard-negative mining** power modern semantic search, multimodal retrieval, and low-label domain adaptation.',
    roleNote: 'Role-Dependent Depth · High priority for LLM/RAG, Multimodal, and Research roles',
  },
  '11': {
    interviewScore: 7,
    jobScore: 8,
    interviewRationale:
      'Specialized rounds test **epistemic vs aleatoric uncertainty, CATE/uplift modelling, Double ML, temporal forecasting, contextual bandits, and two-stage retrieval + ranking**.',
    jobRationale:
      'Essential when your product requires **causal uplift decisions, sequential exploration (bandits), calibrated abstention, or large-scale recommendation ranking**.',
    roleNote: 'Role-Dependent Depth · Focus on the sub-track (Causal, RecSys/Bandits, or Uncertainty) matching your team',
  },
  '12': {
    interviewScore: 7,
    jobScore: 8,
    interviewRationale:
      'Research and senior loops assess **how you critique a paper, spot weak baselines or p-hacked ablations, design single-factor ablations, and report multi-seed uncertainty**.',
    jobRationale:
      '**Preregistered hypotheses, controlled ablations, and reproducibility discipline** prevent teams from wasting months chasing seed noise or mirage SOTA claims.',
    roleNote: 'Role-Dependent Depth · Core for Applied Scientist & Research Engineer loops',
  },
  '13': {
    interviewScore: 9,
    jobScore: 10,
    interviewRationale:
      'Modern AI/ML loops heavily test **encoder vs LLM routing, RAG & chunking/reranking, LoRA/QLoRA, DPO, LLM-as-judge calibration, detection/segmentation (mAP), VLMs, and prompt-injection defense**.',
    jobRationale:
      '**Building, adapting, evaluating, and safely serving foundation models (LLMs, Vision, and VLMs)** while controlling token cost and p95 latency is a primary industry skill.',
  },
  '14': {
    interviewScore: 6,
    jobScore: 7,
    interviewRationale:
      'Applied Scientist and research loops include a **deep-dive presentation or oral defence of your specialization thesis, negative results, ablations, and threats to validity**.',
    jobRationale:
      'Demonstrates the ability to **own an open-ended technical problem end-to-end**, from literature gap analysis to a reproducible artefact and model/dataset card.',
    roleNote: 'Role-Dependent Depth · Essential for Applied Scientist & Research Engineer tracks',
  },
  '15': {
    interviewScore: 9,
    jobScore: 10,
    interviewRationale:
      'MLOps and production rounds test **idempotent pipelines, training-serving skew, p50/p95/p99 latency budgets, dynamic batching, canary vs shadow vs blue-green deploys, and drift alerts**.',
    jobRationale:
      'A model creates zero business value until it is **containerised, observable, reproducible, cost-monitored, and protected by automated rollback gates**.',
  },
  '16': {
    interviewScore: 10,
    jobScore: 9,
    interviewRationale:
      'The **45-minute ML System Design interview** (requirements, QPS/storage/GPU envelope math, feature stores, two-stage retrieval/ranking, online A/B testing, and $100\\times$ bottlenecks) decides seniority and level.',
    jobRationale:
      '**End-to-end architectural trade-offs across quality, p95 latency, compute cost, and graceful degradation** define staff-level engineering impact.',
  },
  '17': {
    interviewScore: 8,
    jobScore: 7,
    interviewRationale:
      'Recruiters and hiring managers screen your **3 flagship repositories, first-screen README results with confidence intervals, architecture diagrams, and failure analyses** before granting interviews.',
    jobRationale:
      '**Clear technical writing, reproducible one-command repos, and concise design docs** accelerate code reviews and cross-team adoption.',
  },
  '18': {
    interviewScore: 10,
    jobScore: 6,
    interviewRationale:
      'Directly governs your **performance across timed coding, rapid-fire ML theory, 7-step system design whiteboard rounds, quantified behavioural stories, and offer negotiation**.',
    jobRationale:
      'Communicating **trade-offs, post-mortems, and technical disagreements clearly under pressure** carries over directly into design reviews on the job.',
  },
};

export const ROLE_PRIORITY_PATHS: RolePriorityPath[] = [
  {
    role: 'General ML Engineer',
    focus: 'Prioritize Python, classical ML, leakage-safe evaluation, PyTorch fundamentals, MLOps deployment, and ML system design.',
    keyLevels: 'L0, L3–L6, Bridge, L8, L15–L16',
    coreBadges: ['0', '1', '3', '4', '5', '6', 'B', '8', '15', '16', '17', '18'],
    partTimeTimeline: '26–34 weeks (~6.5–8 months @ 15–18 hrs/wk)',
    intensiveTimeline: '13–17 weeks (~3.5–4 months full-time)',
    scoreOverrides: {
      '0': { interviewScore: 9, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Master clean Python, data structures, pytest, and CLI packaging for production ML services.' },
      '1': { interviewScore: 8, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Focus on vectorised NumPy, memory-efficient Pandas/Parquet pipelines, and point-in-time joins.' },
      '2': { interviewScore: 7, jobScore: 7, studyDepth: 'Working Fluency', roleFocus: 'Focus on matrix shapes, SVD/PCA, gradients, and cross-entropy loss intuition.' },
      '3': { interviewScore: 9, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Master A/B test power calculation, bootstrap CIs, SRM checks, and guardrail metrics.' },
      '4': { interviewScore: 9, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Highest job leverage: master schema validation, temporal/group leakage audits, and feature stores.' },
      '5': { interviewScore: 10, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Bread-and-butter for generalist ML: master LightGBM/XGBoost/CatBoost, regularized linear models, and SHAP.' },
      '6': { interviewScore: 9, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Master nested/grouped splits, PR-AUC vs ROC-AUC, probability calibration, and cost-optimal thresholds.' },
      B: { interviewScore: 8, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Be fluent writing custom nn.Modules, DataLoaders, and AMP training loops without boilerplate wrappers.' },
      '7': { interviewScore: 7, jobScore: 7, studyDepth: 'Working Fluency', roleFocus: 'Understand backprop, initialization, and activation bugs well enough to debug broken training runs.' },
      '8': { interviewScore: 8, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Focus on AdamW, LR schedules, gradient clipping, mixed precision, and GPU memory profiling.' },
      '9': { interviewScore: 8, jobScore: 8, studyDepth: 'Working Fluency', roleFocus: 'Know MLP/CNN/Transformer trade-offs, latency budgets, quantisation, and distillation.' },
      '10': { interviewScore: 6, jobScore: 7, studyDepth: 'Selective / Skim', roleFocus: 'Understand contrastive embeddings (CLIP/InfoNCE) and vector retrieval evaluation.' },
      '11': { interviewScore: 7, jobScore: 8, studyDepth: 'Working Fluency', roleFocus: 'Focus on two-stage recommender ranking, contextual bandits, and time-series validation.' },
      '12': { interviewScore: 5, jobScore: 6, studyDepth: 'Selective / Skim', roleFocus: 'Skim paper-reading and ablation hygiene to evaluate whether new methods beat your tabular/DL baseline.' },
      '13': { interviewScore: 8, jobScore: 9, studyDepth: 'Working Fluency', roleFocus: 'Focus on pragmatic encoder vs LLM routing, hybrid RAG, and structured output validation.' },
      '14': { interviewScore: 4, jobScore: 5, studyDepth: 'Selective / Skim', roleFocus: 'Optional for generalist MLEs unless targeting hybrid research-engineering teams.' },
      '15': { interviewScore: 10, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Critical MLE core: master Docker, FastAPI serving, latency p95, canary rollouts, and drift monitoring.' },
      '16': { interviewScore: 10, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Decides your hiring level: master the 7-step ML system design framework, QPS math, and feature stores.' },
      '17': { interviewScore: 8, jobScore: 7, studyDepth: 'Core Mastery', roleFocus: 'Ship 3 end-to-end repos with live endpoints, latency/cost numbers, and CI badges.' },
      '18': { interviewScore: 10, jobScore: 6, studyDepth: 'Core Mastery', roleFocus: 'Drill coding + SQL, classical/DL theory, and 7-step system design mock loops.' },
    },
  },
  {
    role: 'LLM Engineer',
    focus: 'Prioritize transformers, tokenization, RAG, LoRA/QLoRA, preference alignment, LLM evaluation, KV-cache serving, and safety guardrails.',
    keyLevels: 'L0, L6, Bridge, L8–L10, L13, L15–L16',
    coreBadges: ['0', '6', 'B', '8', '9', '10', '13', '15', '16', '17', '18'],
    partTimeTimeline: '22–29 weeks (~5.5–7 months @ 15–18 hrs/wk)',
    intensiveTimeline: '11–15 weeks (~3–3.5 months full-time)',
    scoreOverrides: {
      '0': { interviewScore: 9, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Master async Python, Pydantic schema validation, streaming generators, and API retry/backoff.' },
      '1': { interviewScore: 6, jobScore: 8, studyDepth: 'Working Fluency', roleFocus: 'Focus on batch cosine similarity, top-k retrieval math, and JSONL/Parquet dataset processing.' },
      '2': { interviewScore: 7, jobScore: 8, studyDepth: 'Working Fluency', roleFocus: 'Focus on low-rank matrix decomposition (LoRA), cross-entropy, KL divergence, and perplexity.' },
      '3': { interviewScore: 7, jobScore: 8, studyDepth: 'Working Fluency', roleFocus: 'Focus on bootstrap CIs for eval sets, inter-annotator agreement, and online A/B testing.' },
      '4': { interviewScore: 6, jobScore: 8, studyDepth: 'Working Fluency', roleFocus: 'Focus on near-duplicate document deduplication (MinHash), PII scrubbing, and prompt/contamination leakage.' },
      '5': { interviewScore: 5, jobScore: 6, studyDepth: 'Selective / Skim', roleFocus: 'Keep fast TF-IDF + linear/GBDT classifiers in your toolkit as cheap routers and guardrails.' },
      '6': { interviewScore: 8, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Focus on golden eval governance, retrieval nDCG/Recall@k, slice regressions, and judge calibration.' },
      B: { interviewScore: 8, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Master tensor devices, bf16/fp16 precision, and inspecting model weights/gradients in PyTorch.' },
      '7': { interviewScore: 6, jobScore: 6, studyDepth: 'Working Fluency', roleFocus: 'Understand GELU/SwiGLU activations, LayerNorm/RMSNorm, and residual gradient flow.' },
      '8': { interviewScore: 9, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Master AdamW, warmup + cosine decay, activation checkpointing, FSDP/DDP, and VRAM budgeting.' },
      '9': { interviewScore: 10, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Essential LLM core: master scaled dot-product attention, RoPE, GQA/MQA, KV cache math, and FlashAttention.' },
      '10': { interviewScore: 9, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Master dense bi-encoder embeddings, InfoNCE, hard-negative mining, and cross-encoder reranking.' },
      '11': { interviewScore: 6, jobScore: 7, studyDepth: 'Selective / Skim', roleFocus: 'Focus on uncertainty abstention (routing hard queries to frontier models) and bandit routing.' },
      '12': { interviewScore: 7, jobScore: 8, studyDepth: 'Working Fluency', roleFocus: 'Learn to separate real LLM benchmark gains from prompt hacking and benchmark contamination.' },
      '13': { interviewScore: 10, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Your #1 flagship level: master RAG, LoRA/QLoRA, SFT/DPO, LLM-as-judge, tool calling, and injection defense.' },
      '14': { interviewScore: 5, jobScore: 6, studyDepth: 'Selective / Skim', roleFocus: 'Optional unless pursuing post-training/alignment research roles.' },
      '15': { interviewScore: 9, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Master TTFT vs ITL latency, continuous batching (vLLM), semantic caching, and token cost per task.' },
      '16': { interviewScore: 10, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Master 7B/70B GPU VRAM + KV cache sizing, multi-tier model routing, and enterprise RAG architecture.' },
      '17': { interviewScore: 9, jobScore: 8, studyDepth: 'Core Mastery', roleFocus: 'Ship an end-to-end evaluated RAG/agent/fine-tuning system with calibrated judge + cost/latency telemetry.' },
      '18': { interviewScore: 10, jobScore: 6, studyDepth: 'Core Mastery', roleFocus: 'Drill attention/KV-cache math, LLM system design, and RAG/alignment debugging scenarios.' },
    },
  },
  {
    role: 'Applied Scientist',
    focus: 'Prioritize mathematical derivations, statistical inference, causal/experimental design, classical & deep ML theory, and publication-grade research.',
    keyLevels: 'L1–L3, L5–L8, L10–L14, L17',
    coreBadges: ['1', '2', '3', '5', '6', '7', '8', '10', '11', '12', '13', '14', '17', '18'],
    partTimeTimeline: '38–50 weeks (~9–11.5 months @ 15–18 hrs/wk)',
    intensiveTimeline: '19–25 weeks (~4.5–6 months full-time)',
    scoreOverrides: {
      '0': { interviewScore: 8, jobScore: 8, studyDepth: 'Working Fluency', roleFocus: 'Write clean, reproducible experiment packages and pass standard coding/DSA bar rounds.' },
      '1': { interviewScore: 8, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Master numerical stability, conditioning, QR vs normal equations, and vectorised simulation.' },
      '2': { interviewScore: 10, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Heavily tested in Applied Scientist loops: derive SVD/PCA, MLE/MAP, Jacobians, and KL divergence on the board.' },
      '3': { interviewScore: 10, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Signature Applied Scientist bar: master causal inference, CUPED, sequential testing, FDR, and bootstrap theory.' },
      '4': { interviewScore: 8, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Focus on MNAR selection bias, Simpson’s paradox, and leakage-free experimental feature construction.' },
      '5': { interviewScore: 10, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Derive OLS/Ridge/Lasso/Logistic/GBDT objectives from first principles and defend bias-variance trade-offs.' },
      '6': { interviewScore: 10, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Highest priority: master paired significance tests, corrected resampled t-tests, conformal coverage, and calibration.' },
      B: { interviewScore: 7, jobScore: 8, studyDepth: 'Working Fluency', roleFocus: 'Ensure fluent PyTorch implementation of custom losses, hooks, and deterministic seeded runs.' },
      '7': { interviewScore: 9, jobScore: 8, studyDepth: 'Core Mastery', roleFocus: 'Be ready to derive multi-layer backprop, variance-preserving initialisation (Xavier/He), and finite-difference checks.' },
      '8': { interviewScore: 9, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Master Hessian conditioning, saddle points, AdamW bias correction, and controlled optimiser ablations.' },
      '9': { interviewScore: 9, jobScore: 8, studyDepth: 'Core Mastery', roleFocus: 'Understand ELBO derivations, diffusion score matching, attention scaling, and inductive bias trade-offs.' },
      '10': { interviewScore: 9, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Master InfoNCE math, dimensional collapse spectra, and representation transfer evaluation.' },
      '11': { interviewScore: 10, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Major Applied Scientist differentiator: master CATE/Double ML, off-policy evaluation (IPS/DR), and epistemic uncertainty.' },
      '12': { interviewScore: 10, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Core job skill: preregistration, single-factor ablations, negative controls, and paper critique.' },
      '13': { interviewScore: 9, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Master foundation model adaptation (LoRA/DPO), bias-corrected LLM judges, and domain error taxonomies.' },
      '14': { interviewScore: 9, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Prepares you directly for the 45-minute Applied Scientist research presentation & oral defence round.' },
      '15': { interviewScore: 7, jobScore: 8, studyDepth: 'Working Fluency', roleFocus: 'Understand training-serving skew, shadow deployments, and latency/cost constraints for shipping research.' },
      '16': { interviewScore: 9, jobScore: 8, studyDepth: 'Core Mastery', roleFocus: 'Focus on online/offline metric alignment, two-stage ranking math, and experimentation in system design.' },
      '17': { interviewScore: 9, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Highlight reproducible research reports, ablation tables with CIs, and honest negative-result analyses.' },
      '18': { interviewScore: 10, jobScore: 7, studyDepth: 'Core Mastery', roleFocus: 'Drill whiteboard math derivations, experimental design scenarios, and research talk defence.' },
    },
  },
  {
    role: 'Computer Vision Engineer',
    focus: 'Prioritize vectorised array/image pipelines, PyTorch internals, CNNs, Vision Transformers, SSL, detection/segmentation/VLMs, and edge/GPU inference.',
    keyLevels: 'L0–L2, Bridge, L7–L10, L13, L15',
    coreBadges: ['0', '1', '2', 'B', '7', '8', '9', '10', '13', '15', '17', '18'],
    partTimeTimeline: '29–38 weeks (~7–9 months @ 15–18 hrs/wk)',
    intensiveTimeline: '15–19 weeks (~3.5–4.5 months full-time)',
    scoreOverrides: {
      '0': { interviewScore: 9, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Master clean Python, C++/CUDA-friendly modularity, and unit testing for image/video pipelines.' },
      '1': { interviewScore: 9, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Critical for CV: master 3D/4D tensor broadcasting, strides, memory layout (NCHW vs NHWC), and vectorised IoU.' },
      '2': { interviewScore: 8, jobScore: 8, studyDepth: 'Core Mastery', roleFocus: 'Focus on linear transformations, projections, SVD, and spatial/geometric Jacobians.' },
      '3': { interviewScore: 7, jobScore: 7, studyDepth: 'Working Fluency', roleFocus: 'Focus on bootstrap confidence intervals for mAP/IoU and dataset sample-size estimation.' },
      '4': { interviewScore: 7, jobScore: 8, studyDepth: 'Working Fluency', roleFocus: 'Focus on near-duplicate image/frame leakage, camera/patient group splits, and annotation quality audits.' },
      '5': { interviewScore: 6, jobScore: 6, studyDepth: 'Selective / Skim', roleFocus: 'Understand linear probes, k-NN, and calibrate post-processing confidence scores.' },
      '6': { interviewScore: 7, jobScore: 8, studyDepth: 'Working Fluency', roleFocus: 'Focus on camera/video-group splits, PR curves across IoU thresholds, and worst-slice lighting/occlusion recall.' },
      B: { interviewScore: 10, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Essential CV foundation: master custom Dataset/DataLoader workers, pinned memory, `einops`, and `torch.amp`.' },
      '7': { interviewScore: 8, jobScore: 8, studyDepth: 'Core Mastery', roleFocus: 'Master spatial backprop, BatchNorm train vs eval behavior, and activation hooks.' },
      '8': { interviewScore: 9, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Master SGD+momentum vs AdamW on vision backbones, one-cycle/cosine schedules, and small-batch GroupNorm.' },
      '9': { interviewScore: 10, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Your #1 core level: master ConvNeXt/ResNet, receptive fields, depthwise separable convs, ViT, and latent diffusion.' },
      '10': { interviewScore: 9, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Master visual SSL (SimCLR, MoCo, DINO/MAE, CLIP) for pretraining on unlabelled domain imagery.' },
      '11': { interviewScore: 6, jobScore: 7, studyDepth: 'Selective / Skim', roleFocus: 'Focus on out-of-distribution (OOD) visual detection and epistemic uncertainty for safety-critical CV.' },
      '12': { interviewScore: 7, jobScore: 8, studyDepth: 'Working Fluency', roleFocus: 'Run compute-matched architecture ablations (params, FLOPs, FPS, latency) across seeds.' },
      '13': { interviewScore: 10, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Master object detection vs segmentation, mAP failure modes, high-res VLM tiling, and OCR vs VLM trade-offs.' },
      '14': { interviewScore: 6, jobScore: 7, studyDepth: 'Selective / Skim', roleFocus: 'Recommended if targeting CV research or autonomous-driving/medical-imaging R&D teams.' },
      '15': { interviewScore: 9, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Master ONNX/TensorRT export, INT8/FP16 quantisation, dynamic batching, and edge/GPU p95 latency.' },
      '16': { interviewScore: 8, jobScore: 8, studyDepth: 'Working Fluency', roleFocus: 'Practice visual search, video moderation, and real-time edge-to-cloud CV system design.' },
      '17': { interviewScore: 8, jobScore: 8, studyDepth: 'Core Mastery', roleFocus: 'Include throughput/FPS vs mAP Pareto curves and visual failure-mode galleries in your portfolio.' },
      '18': { interviewScore: 9, jobScore: 6, studyDepth: 'Core Mastery', roleFocus: 'Drill conv output-shape math, IoU/NMS coding from scratch, and CV system design.' },
    },
  },
  {
    role: 'Research Engineer',
    focus: 'Prioritize numerical computing, autodiff, PyTorch internals, optimization dynamics, distributed GPU scaling, and clean-room paper reproduction.',
    keyLevels: 'L0–L2, Bridge, L7–L10, L12, L14–L15',
    coreBadges: ['0', '1', '2', 'B', '7', '8', '9', '10', '12', '14', '15', '17', '18'],
    partTimeTimeline: '32–43 weeks (~7.5–10 months @ 15–18 hrs/wk)',
    intensiveTimeline: '16–22 weeks (~4–5 months full-time)',
    scoreOverrides: {
      '0': { interviewScore: 9, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Research engineers win on software quality: master modular configs, typing, testing, and profiling.' },
      '1': { interviewScore: 9, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Master IEEE-754 floating-point edge cases, underflow/overflow, conditioning, and C-buffer strides.' },
      '2': { interviewScore: 9, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Master reverse-mode autodiff graph construction, VJPs, Hessians, and finite-difference gradient checks.' },
      '3': { interviewScore: 8, jobScore: 8, studyDepth: 'Working Fluency', roleFocus: 'Focus on Monte Carlo variance reduction, multi-seed confidence intervals, and hypothesis testing.' },
      '4': { interviewScore: 6, jobScore: 8, studyDepth: 'Working Fluency', roleFocus: 'Focus on deterministic dataset sharding, deduplication, and contamination audits.' },
      '5': { interviewScore: 6, jobScore: 7, studyDepth: 'Working Fluency', roleFocus: 'Use linear and GBDT probes as fast sanity checks before scaling expensive neural runs.' },
      '6': { interviewScore: 8, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Master frozen evaluation harnesses, contamination guards, and statistical significance across seeds.' },
      B: { interviewScore: 10, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Must be second nature: custom autograd functions, `torch.profiler`, `einops`, AMP, and deterministic seeding.' },
      '7': { interviewScore: 10, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Frequently tested live: implement forward/backward layers from scratch and verify parity with PyTorch autograd.' },
      '8': { interviewScore: 10, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Core Research Engineer craft: diagnose loss spikes, `NaN`s, gradient norms, DDP all-reduce, and activation checkpointing.' },
      '9': { interviewScore: 10, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Implement attention, RoPE, KV caching, FlashAttention tiling concepts, and diffusion/VAE losses cleanly.' },
      '10': { interviewScore: 9, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Implement SimCLR/MoCo/BYOL/VICReg objectives and diagnose representation/dimensional collapse.' },
      '11': { interviewScore: 7, jobScore: 7, studyDepth: 'Working Fluency', roleFocus: 'Focus on deep ensembles, off-policy evaluation, and distribution-shift stress tests.' },
      '12': { interviewScore: 10, jobScore: 10, studyDepth: 'Core Mastery', roleFocus: 'Signature skill: clean-room paper reproduction, isolating undocumented tricks, and compute-matched ablations.' },
      '13': { interviewScore: 9, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Focus on LoRA/QLoRA internals, SFT/DPO training loops, and rigorous eval harnesses.' },
      '14': { interviewScore: 9, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Demonstrate a complete, reproducible research codebase with one-command replication and ablations.' },
      '15': { interviewScore: 8, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Focus on reproducible training pipelines, containerised cluster jobs, and high-throughput inference.' },
      '16': { interviewScore: 8, jobScore: 8, studyDepth: 'Working Fluency', roleFocus: 'Focus on distributed training/inference compute math, FLOPs utilization (MFU), and memory bandwidth.' },
      '17': { interviewScore: 9, jobScore: 9, studyDepth: 'Core Mastery', roleFocus: 'Showcase a clean-room paper reproduction or novel ablation repo with <1e-6 parity tests.' },
      '18': { interviewScore: 10, jobScore: 7, studyDepth: 'Core Mastery', roleFocus: 'Drill live PyTorch debugging, implementing attention/autodiff from scratch, and training-stability diagnosis.' },
    },
  },
];

export function getLevelWeights(
  badge: string,
  selectedRole: string = 'General ML Engineer'
): LevelWeightInfo {
  const base = LEVEL_WEIGHTS_BY_BADGE[badge] || {
    interviewScore: 7,
    jobScore: 8,
    interviewRationale:
      'Important for demonstrating **core ML concepts and practical problem-solving** during technical interviews.',
    jobRationale:
      'Supports **day-to-day model development, evaluation, and production engineering** on the job.',
  };

  const roleConfig =
    ROLE_PRIORITY_PATHS.find((r) => r.role === selectedRole) ||
    ROLE_PRIORITY_PATHS[0];
  const override = roleConfig.scoreOverrides[badge];
  const isCoreForRole = roleConfig.coreBadges.includes(badge);

  return {
    ...base,
    interviewScore: override ? override.interviewScore : base.interviewScore,
    jobScore: override ? override.jobScore : base.jobScore,
    roleFocus:
      override?.roleFocus ||
      `Prioritize the core concepts and completion gates in this level for ${roleConfig.role}.`,
    studyDepth:
      override?.studyDepth || (isCoreForRole ? 'Core Mastery' : 'Working Fluency'),
    isCoreForRole,
  };
}
