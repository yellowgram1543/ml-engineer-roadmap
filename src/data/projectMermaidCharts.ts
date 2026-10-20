export const PROJECT_MERMAID_CHARTS: Record<string, string> = {
  'level-0-capstone': `flowchart TD
    A["CSV File / User CLI Input"] --> B["Data Loader (loader.py)"]
    B --> C["Schema Validator (schema.py)"]
    C --> D["Quality Checks (checks.py)"]
    C --> E["Custom Exception & Error Handler"]
    D --> F["Data Profiler (profiler.py)"]
    B --> G["Report Generator"]
    E --> G
    F --> G
    G --> H["Console / JSON / HTML Quality Report"]`,

  'level-1-capstone': `flowchart LR
    A["Raw Numerical Arrays"] --> B["stats.py (Weighted Descriptive Stats)"]
    A --> C["linalg.py (MatMul, Solve, LU, PCA)"]
    A --> D["numerics.py (Stable Softmax, LogSumExp)"]
    C --> E["regression.py (OLS via Normal & QR, Ridge)"]
    B --> F["benchmark.py (NumPy Parity & Timing Harness)"]
    D --> F
    E --> F
    F --> G["benchmarks/results.md"]`,

  'level-2-capstone': `flowchart LR
    A["Input Tensors"] --> B["tensor.py (Autodiff Graph & Backward Pass)"]
    B --> C["ops.py & nn.py (Linear, Activations, Losses)"]
    C --> D["optim.py (SGD, Momentum, Adam, Schedules)"]
    A --> E["linalg.py (QR, Eigen, SVD, PCA)"]
    C --> F["info.py (Entropy, KL Divergence, Perplexity)"]
    D --> G["Finite-Difference Gradient Check & Visualisation"]`,

  'level-3-capstone': `flowchart TD
    A["Empirical / Simulated Dataset"] --> B["power.py (Sample Size & MDE Calculation)"]
    B --> C["estimate.py (Bootstrap, Jackknife, 95% CIs)"]
    B --> D["tests_stats.py (Hypothesis Tests & FDR Correction)"]
    B --> E["regression.py (OLS, Robust HC3 SEs, Diagnostics)"]
    C --> F["simulate.py (Monte Carlo Coverage & Type-I Error)"]
    D --> F
    E --> G["Experiment Decision Memo & Figures"]
    F --> G`,

  'phase-1-capstone': `flowchart LR
    A["Raw Dataset"] --> B["loader.py & schema.py (L0 Validation)"]
    B --> C["features.py (L1 Vectorised Transforms)"]
    C --> D["model.py (L2 Autodiff Linear / Logistic)"]
    D --> E["inference.py (L3 Bootstrap CIs & Hypothesis Tests)"]
    E --> F["report.py & cli.py (Reproducible Findings & Decision Memo)"]`,

  'level-4-capstone': `flowchart TD
    A["Raw Data Sources"] --> B["Validator (Schema & Contract Checks)"]
    B --> C["Cleaner (Missingness, Outliers)"]
    C --> D["Entity Resolver (Deduplication)"]
    D --> E["Feature Builders (Numeric, Categorical, Point-in-Time)"]
    E --> F["Fitted ColumnTransformer Pipeline"]
    B --> B1["Schema Report"]
    C --> C1["Quality Report"]
    D --> D1["Dedup Log"]
    E --> E1["Point-in-Time Leakage Audit"]
    F --> G["Feature Dictionary · Lift Table · Data Card"]`,

  'level-5-capstone': `flowchart TD
    A["Feature Matrix (L4 Pipeline)"] --> B1["Trivial Baseline"]
    A --> B2["Regularised Linear Model"]
    A --> B3["Tree Ensemble (RF / GBDT)"]
    A --> B4["Alternative Model Family"]
    B1 --> C["Leakage-Safe Validation Protocol"]
    B2 --> C
    B3 --> C
    B4 --> C
    C --> D["Model Comparison Table (with CIs)"]
    C --> E["Probability Calibration (Platt / Isotonic)"]
    E --> F["Cost-Sensitive Threshold & Decision Layer"]
    F --> G["SHAP · PDP/ALE · Error Slices · Decision Memo"]`,

  'level-6-capstone': `flowchart LR
    A["Frozen Protocol (protocol.yaml)"] --> B["splits.py (Group, Temporal, Nested CV)"]
    B --> C["metrics.py (Bootstrap 95% Intervals)"]
    C --> D["compare.py (Paired Tests & Effect Sizes)"]
    C --> E["slices.py (Subgroup & Worst-Slice Guards)"]
    C --> F["conformal.py (Coverage-Guaranteed Prediction Sets)"]
    D --> G["Evaluation Report & Threats to Validity"]
    E --> G
    F --> G`,

  'phase-2-capstone': `flowchart TD
    A["Raw Data"] --> B["Validate & Clean / Dedup"]
    B --> C["Point-in-Time Features"]
    C --> D["Pipeline (Fitted on Train Split Only)"]
    D --> E1["Baselines"]
    D --> E2["Tuned Models (GBDT / Linear)"]
    D --> E3["Probability Calibration"]
    E1 --> F["Evaluation Harness (Splits, Metrics, Paired Tests)"]
    E2 --> F
    E3 --> F
    F --> G1["Error Taxonomy"]
    F --> G2["Slice Report"]
    F --> G3["Cost-Optimal Decision Layer"]
    G1 --> H["Production Decision Memo & Monitoring Plan"]
    G2 --> H
    G3 --> H`,

  'bridge-capstone': `flowchart LR
    A["Dataset & DataLoader"] --> B["nn.Module Architecture"]
    B --> C["Device / AMP Training Step"]
    C --> D["Validation & Checkpointing"]
    D --> E["Deterministic Evaluation & Profiling"]`,

  'level-7-capstone': `flowchart LR
    A["Shared Weight Initialisation"] --> B["numpy_impl (Manual Forward & Backward)"]
    A --> C["torch_impl (Autograd Reference Model)"]
    B --> D["test_parity.py (Forward & Gradient Parity <= 1e-6)"]
    C --> D
    D --> E["Controlled Ablations (Activations, Dropout, Optimisers)"]
    E --> F["Derivation & Ablation Report"]`,

  'level-8-capstone': `flowchart TD
    A["Base Config & Seeded Data"] --> B["Training Loop with Gradient & Activation Hooks"]
    B --> C["Optimiser Study (SGD, Momentum, AdamW)"]
    B --> D["LR Schedule Study (Warmup, Cosine, 1-Cycle)"]
    B --> E["Stability & AMP Diagnostics (Grad Norms, Spikes)"]
    C --> F["Tracked Runs & Efficiency Frontier Report"]
    D --> F
    E --> F`,

  'level-9-capstone': `flowchart TD
    A["Frozen Protocol & Dataset"] --> B1["MLP Baseline"]
    A --> B2["ResNet / ConvNeXt (CNN)"]
    A --> B3["Vision / Sequence Transformer"]
    A --> B4["Recurrent / State-Space Model"]
    B1 --> C["Model Registry (Params, FLOPs, Throughput, Memory)"]
    B2 --> C
    B3 --> C
    B4 --> C
    C --> D["Fair Compute-Matched Evaluation & Model Card"]`,

  'phase-3-capstone': `flowchart LR
    A["Protocol & Config Registry"] --> B["Architecture Zoo (MLP, CNN, Transformer)"]
    B --> C["Dynamics & Stability Monitor (AMP, Grad Clipping)"]
    C --> D["Compute-Matched Benchmark & Ablation Suite"]
    D --> E["Error Analysis, Calibration & Reproducible Release"]`,

  'level-10-capstone': `flowchart LR
    A["Unlabelled Corpus + Augmentations"] --> B["SSL Pretraining (SimCLR / MoCo / BYOL / Barlow)"]
    B --> C["Pretrained Encoder Representations"]
    C --> D["Linear Probe & k-NN Evaluation"]
    C --> E["Low-Data Fine-Tuning vs Supervised Baseline"]
    C --> F["Collapse & Representation Quality Diagnostics"]
    D --> G["Representation Benchmark Report"]
    E --> G
    F --> G`,

  'level-11-capstone': `flowchart TD
    A["Domain Problem & Explicit Assumptions"] --> B["Track 1: Causal Uplift / Off-Policy / Uncertainty"]
    A --> C["Track 2: Recommender Ranking / Bandits / GPs"]
    B --> D["Sensitivity & Assumption-Violation Stress Tests"]
    C --> D
    D --> E["Comparative Evaluation vs Classical Baseline"]`,

  'level-12-capstone': `flowchart LR
    A["Selected Paper & Claims"] --> B["Pass 1-3 Reading & Derivation Check"]
    B --> C["Clean-Room Re-Implementation"]
    C --> D["Headline Metric Reproduction (with CIs)"]
    D --> E["Ablation & Stress-Test Beyond the Paper"]
    E --> F["Critique & Reproducibility Paper"]`,

  'phase-4-capstone': `flowchart LR
    A["Committed Preregistration (Hypothesis & Protocol)"] --> B["Baseline & Method Implementation"]
    B --> C["Seeded Multi-Run Experiments & Registry"]
    C --> D["Ablation & Negative-Result Analysis"]
    D --> E["Publication-Grade Research Report & Self-Review"]`,

  'level-13-capstone': `flowchart TD
    A["User Request (Text / Document / Image)"] --> B["Input Guardrails & PII Redaction"]
    B --> C["Model Router (Cheap Encoder vs Small LLM vs Frontier VLM)"]
    C --> D1["NLP Pipeline (Hybrid RAG + Schema-Validated Tools)"]
    C --> D2["Vision / VLM Pipeline (Detector + Grounded Extraction)"]
    D1 --> E["Semantic Cache & Fallback Handler"]
    D2 --> E
    E --> F["Offline Eval Harness (Golden Set, Calibrated Judge, Red-Team)"]
    E --> G["Telemetry (Latency p95, Token Cost per Task)"]`,

  'level-14-capstone': `flowchart LR
    A["Literature Map & Gap Analysis"] --> B["Preregistered Research Question"]
    B --> C["Method / Dataset / Evaluation Contribution"]
    C --> D["Strong Baselines & Ablation Suite"]
    D --> E["Thesis Paper, Model/Dataset Cards & Recorded Talk"]`,

  'phase-5-capstone': `flowchart TD
    A["Specialization Positioning & Preregistration"] --> B["Domain Data & Golden Eval Suite"]
    B --> C["Baseline Ladder -> Adapted Foundation System"]
    C --> D["Latency, Cost & Safety / Red-Team Audit"]
    D --> E["Failure Taxonomy & Threats to Validity"]
    E --> F["Public Mini-Thesis, Artefact & Model Card"]`,

  'level-15-capstone': `flowchart TD
    subgraph Offline["Orchestrated Pipeline (Daily / Drift Triggered)"]
      A["Data Source"] --> B["Ingest & Validate"]
      B --> C["Featurise"]
      C --> D["Train & Evaluate"]
      D --> E["Quality Gate"]
      E --> F["Model Registry"]
    end
    subgraph Online["Production Serving & Observability"]
      G["Client Request"] --> H["API Gateway"]
      H --> I["Inference Service (Canary / Blue-Green)"]
      F -.-> I
      I --> J1["Metrics (p50/p95)"]
      I --> J2["Distributed Traces"]
      I --> J3["PII-Redacted Logs"]
      J1 --> K["Dashboards + SLO Alerts + Runbooks"]
      J2 --> K
      J3 --> K
      K --> L["Drift Monitor -> Retrain Trigger"]
    end`,

  'level-16-capstone': `flowchart LR
    A["1. Requirements & SLOs (Latency, QPS, Cost)"] --> B["2. Back-of-Envelope Capacity & Cost"]
    B --> C["3. Data & Feature Store Contracts"]
    C --> D["4. Multi-Stage Retrieval & Ranking Architecture"]
    D --> E["5. Offline + Online A/B Evaluation"]
    E --> F["6. Load-Tested Prototype (k6/Locust) & Failure Modes"]`,

  'phase-6-capstone': `flowchart TD
    A["Design Doc & Envelope Calculator (7-Step Frame)"] --> B["Data -> Ingest -> Validate -> Features -> Train"]
    B --> C["Evaluate -> Automated Gate -> Model Registry"]
    C --> D["Client -> Gateway -> Canary / Blue-Green Service"]
    D --> E["Metrics · Traces · Redacted Logs"]
    E --> F["SLO Dashboards + Alerts + Incident Runbooks"]
    F --> G["Drift Monitor -> Retrain Trigger -> Human Approval"]`,

  'level-17-capstone': `flowchart LR
    A["Role & Domain Positioning"] --> B1["Repo 1: Flagship End-to-End System"]
    A --> B2["Repo 2: Production Engineering / MLOps"]
    A --> B3["Repo 3: Modelling / Research Depth"]
    B1 --> C["Case Studies + 3-Min Demo Videos"]
    B2 --> C
    B3 --> C
    C --> D["Peer & Senior Review -> Tailored 1-Page Resume"]`,

  'level-18-capstone': `flowchart LR
    A["100+ Question Mastery Ledger"] --> B1["Timed Coding & SQL Drills"]
    A --> B2["ML Theory & Statistics Oral Drills"]
    A --> B3["7-Step ML System Design Recordings"]
    A --> B4["8 Quantified Behavioral Stories"]
    B1 --> C["Full Mock Loops & Debrief Scorecards"]
    B2 --> C
    B3 --> C
    B4 --> C
    C --> D["Target Company Tracker & Negotiation Framework"]`,

  'phase-7-capstone': `flowchart LR
    A["00_POSITIONING.md"] --> B["3 Proof Repositories + Case Studies"]
    B --> C["1-Page Resume + GitHub / LinkedIn Profiles"]
    C --> D["Question Ledger + Mock Loop Recordings"]
    D --> E["Active Application Pipeline & Offer Evaluation"]`,
};
