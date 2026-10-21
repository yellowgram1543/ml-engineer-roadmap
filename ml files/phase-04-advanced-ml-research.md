# PHASE 4 — ADVANCED ML AND RESEARCH

**ML Engineer / Applied Scientist Roadmap · Levels 10–12 of 18**

> **Phase goal.** Move from training models to producing knowledge. Learn how representations are learned without labels, how advanced methods handle uncertainty, causality, sequences and shift, and how to design, execute, and communicate experiments that other people can trust. This is the phase that turns a strong engineer into an applied scientist.

---

## Phase dashboard

| Item | Details |
|---|---|
| **Phase** | 4 — Advanced ML and Research |
| **Levels** | L10 · L11 · L12 |
| **Difficulty** | Advanced |
| **Suggested duration** | 14–18 weeks at 2–3 hours/day |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Core tools** | PyTorch, `timm`, Hugging Face `transformers`, `scikit-learn`, `statsmodels`, PyMC/`numpyro` (optional), `DoWhy`/`EconML`, `sktime`/`statsforecast`, `wandb` |
| **Capstone projects** | 3 level capstones + 1 phase capstone |
| **Final outcome** | Pretrain and evaluate representations, deploy at least two advanced methods correctly, and run a research-grade experiment that survives reproduction and review. |

**Prerequisites.** Phase 3 complete. You can build, train, stabilise, and evaluate deep models, and you have the protocol discipline from Phase 2. Levels 10 and 11 assume that discipline; Level 12 tests it.

---

## How this phase is structured

| Block | What it contains |
|---|---|
| **Dashboard** | Level, difficulty, duration, tools, project, outcome |
| **Numbered sections** (`10.1`, `10.2`, …) | One theme each |
| **Modules** (`10.1.1`, `10.1.2`, …) | The actual study checklist |
| **Practice tasks** | Small exercises that force retrieval, not re-reading |
| **Module completion gate** | The proof that the section is done |
| **Mini-project** | A small build inside the level |
| **Capstone** | The level's main artefact, with acceptance criteria |
| **Interview bank** | Questions you should be able to answer after the level |
| **Level assessment** | A checklist before you move on |

> **The rule of this phase:** a result is not a result until someone else could reproduce it, and a method is not understood until you can name the assumption it breaks.

---

## Contents

| Level | Title | Sections | Duration | Capstone |
|---|---|---|---|---|
| [L10](#level-10--representation-and-self-supervised-learning) | Representation and Self-Supervised Learning | 10.1 – 10.11 | 4–5 weeks | `repr-lab` — SSL pretraining with frozen evaluation |
| [L11](#level-11--advanced-ml-methods) | Advanced ML Methods | 11.1 – 11.11 | 5–7 weeks | `adv-ml-lab` — two advanced methods, benchmarked |
| [L12](#level-12--research-methods-and-experimental-science) | Research Methods and Experimental Science | 12.1 – 12.11 | 4–6 weeks | `research-repro` — reproduction, ablation, 4-page report |
| [Phase capstone](#phase-4-capstone--research-sprint) | Integration project | — | 2–3 weeks | A mini research paper with a full artefact |

---

# LEVEL 10 — REPRESENTATION AND SELF-SUPERVISED LEARNING

> **Goal.** Understand how models learn useful features without labels, how to train such models on a modest budget, and how to prove the representation is actually good — with a frozen probe, not with vibes.

## Level dashboard

| Item | Details |
|---|---|
| **Level** | 10 — Representation and Self-Supervised Learning |
| **Difficulty** | Advanced |
| **Suggested duration** | 4–5 weeks |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Core tools** | PyTorch, `timm`, `torchvision`, `faiss`, `scikit-learn` (probes), `umap-learn` |
| **Main project** | **`repr-lab`** — pretrain a small encoder with SSL, evaluate it frozen, and ablate the design |
| **Final outcome** | Train a self-supervised encoder, evaluate it without fine-tuning, detect collapse, and explain which design choice mattered. |

**Prerequisites.** Level 9 (architectures), Level 8 (training dynamics), Level 6 (evaluation protocol).

---

## 10.1 — What a Representation Is

**Objective.** Define the object you are optimising, and how you will know it is good.

### Module 10.1.1 — Latent spaces and embeddings

- A representation as a map $f_\theta:\mathcal{X}\to\mathbb{R}^d$.
- What good representations share: smoothness, disentanglement, invariance to nuisance, linear separability of factors.
- Dimensionality, capacity, and the information bottleneck intuition.
- Embedding geometry: cosine versus Euclidean, norm concentration, hubness.
- Why the same encoder can be excellent for retrieval and useless for classification.

$$
f_\theta(x)=h\in\mathbb{R}^{d},\qquad
\text{similarity}(x_i,x_j)=\frac{h_i^{\top}h_j}{\lVert h_i\rVert\,\lVert h_j\rVert}
$$

**Practice tasks**

- Train an autoencoder and inspect its latent space with PCA and UMAP.
- Show two downstream tasks where the same representation ranks differently in quality.

---

### Module 10.1.2 — The three ways to obtain a representation

- Supervised learning as representation learning (labels shape the features).
- Self-supervised learning: build the pretext task from the data itself.
- Transfer from a pretrained foundation model.
- Trade-offs: label cost, compute cost, task specificity, and control.
- Why SSL matters: unlabelled data is abundant, labels are not.

**Practice tasks**

- For three problems, decide between supervised, SSL, and pretrained transfer, with a cost estimate.
- Quantify how many labels a supervised model needs to match a frozen pretrained encoder on your task.

---

### Module 10.1.3 — Evaluating representations before you build them

- Linear probe: freeze the encoder, train a linear classifier on labels.
- k-NN evaluation: no training at all, purely geometric.
- Fine-tuning as the upper bound, not the primary metric.
- Transfer across datasets and label fractions.
- Clustering quality and nearest-neighbour visual inspection.

$$
\text{probe accuracy}:\ \max_{W}\ \mathbb{E}\left[\mathbf{1}\left[\arg\max W f_\theta(x)=y\right]\right]
\quad\text{with }f_\theta\text{ frozen}
$$

**Practice tasks**

- Evaluate one encoder with linear probe, k-NN, and fine-tuning; explain the gaps.
- Show a probe ranking that reverses when label fraction is reduced to 1%.

---

> **Module completion gate (10.1).** You can evaluate any encoder with a frozen probe and k-NN, and explain what each measures.

---

## 10.2 — Contrastive Learning

**Objective.** Learn invariance by pulling positives together and pushing negatives apart.

### Module 10.2.1 — The InfoNCE objective

- Positive pairs from augmentations; negatives from other examples in the batch.
- Temperature and its effect on the softness of the distribution.
- Why this is a lower bound on mutual information (intuition, not proof).
- The alignment–uniformity trade-off.
- Batch size and the number of negatives.

$$
\mathcal{L}_{\text{InfoNCE}}=-\log\frac{\exp\left(\mathrm{sim}(z_i,z_i^{+})/\tau\right)}{\sum_{j=1}^{K}\exp\left(\mathrm{sim}(z_i,z_j)/\tau\right)}
$$

**Practice tasks**

- Implement InfoNCE and verify it decreases as positive similarity rises.
- Sweep $\tau\in\{0.05,0.1,0.5\}$ and describe the effect on the embedding geometry.

---

### Module 10.2.2 — SimCLR and its design choices

- The projection head and why representations are taken *before* it.
- Augmentation composition: crop, colour jitter, blur, flip.
- Large batches and the memory cost of many negatives.
- Why strong augmentation is the main driver of quality.
- The linear-probe protocol as the standard evaluation.

$$
z_i=g\!\left(f_\theta(\tilde x_i)\right),\qquad
\mathcal{L}=-\frac{1}{2N}\sum_{i=1}^{N}\left[\ell(i,i^{+})+\ell(i^{+},i)\right]
$$

**Practice tasks**

- Run an augmentation ablation: remove colour jitter, then cropping, and measure probe accuracy.
- Show that removing the projection head hurts the linear probe.

---

### Module 10.2.3 — MoCo and memory banks

- The momentum encoder and the queue of negatives.
- Why a queue decouples batch size from the number of negatives.
- Momentum coefficient and the stability of the key encoder.
- BYOL-style asymmetry and the collapse question.
- Practical trade-offs: memory, complexity, and result quality.

$$
\theta_k\leftarrow m\,\theta_k+(1-m)\,\theta_q,\qquad
\mathcal{L}_q=-\log\frac{\exp\left(q\cdot k^{+}/\tau\right)}{\sum_{j}\exp\left(q\cdot k_j/\tau\right)}
$$

**Practice tasks**

- Train MoCo-style with a small batch and compare against SimCLR at equal compute.
- Show the queue's negative count versus probe accuracy curve.

---

> **Module completion gate (10.2).** You have trained a contrastive encoder and can point to the augmentation and temperature choices that mattered.

---

## 10.3 — Masked and Predictive Modelling

**Objective.** Learn representations by reconstruction or prediction rather than comparison.

### Module 10.3.1 — Masked language and image modelling

- Masking strategies: random token, span, structured patches.
- Mask ratio and the information–difficulty trade-off.
- Encoder-only masked modelling (BERT) versus decoder reconstruction (MAE).
- Why MAE needs a high mask ratio in vision but BERT does not in text.
- The evaluation protocol: probe, fine-tune, or generate.

$$
\mathcal{L}_{\text{MLM}}=-\sum_{i\in\mathcal{M}}\log p_\theta\left(x_i\mid x_{\setminus\mathcal{M}}\right)
$$

**Practice tasks**

- Train a small masked autoencoder and probe it against a contrastive baseline at equal compute.
- Sweep mask ratio 25%, 50%, 75% and report probe accuracy.

---

### Module 10.3.2 — Autoregressive and next-token objectives

- Next-token prediction as self-supervision.
- Why language modelling scales well and what it optimises implicitly.
- The difference between learning to predict and learning to represent.
- Prefix/suffix prediction and other variants.
- When to use generative pretraining versus contrastive pretraining.

**Practice tasks**

- Train a tiny causal model on a text corpus and probe its hidden states for sentiment.
- Compare a causal and a masked objective on the same corpus and task.

---

### Module 10.3.3 — Reconstructive autoencoders as baselines

- Plain autoencoders versus denoising autoencoders.
- Why reconstruction often produces features that are worse for classification.
- Bottleneck design and what it forces.
- When reconstruction is exactly the right objective (compression, anomaly detection).

> **Module completion gate (10.3).** You can choose between contrastive, masked, and generative pretraining with reasons, and run the comparison yourself.

---

## 10.4 — Non-Contrastive and Redundancy-Reduction Methods

**Objective.** Understand the families that avoid negatives, and why they do not collapse.

### Module 10.4.1 — Asymmetric architectures: BYOL, SimSiam, DINO

- Online and target networks; predictor heads and stop-gradients.
- Why collapse does not happen in practice (hypotheses, not proofs).
- EMA teacher and centring in DINO.
- Hyperparameter sensitivity: these methods are famously finicky.
- Practical recommendation: use a well-tested recipe before inventing your own.

$$
\mathcal{L}_{\text{BYOL}}=\left\lVert \frac{q_\theta(z_\theta)}{\lVert q_\theta(z_\theta)\rVert}-\frac{z_\xi}{\lVert z_\xi\rVert}\right\rVert_2^2
\quad\text{(target branch with stop-gradient)}
$$

**Practice tasks**

- Train BYOL on a small dataset and check for collapse by measuring embedding variance.
- Remove the stop-gradient and reproduce collapse; document what happens.

---

### Module 10.4.2 — Redundancy reduction: Barlow Twins, VICReg

- Cross-correlation matrix and the goal of identity.
- Invariance and redundancy terms as explicit objectives.
- Why these methods need no negatives, no predictor, and no EMA.
- Their sensitivity to batch size and augmentation strength.
- When explicit variance terms make debugging easier.

$$
\mathcal{L}_{\text{BT}}=\sum_i\left(1-\mathcal{C}_{ii}\right)^2+\lambda\sum_{i\neq j}\mathcal{C}_{ij}^2
$$

**Practice tasks**

- Implement both terms and verify that the off-diagonal penalty drives cross-correlation to zero.
- Compare Barlow Twins and SimCLR at equal batch size on a small dataset.

---

### Module 10.4.3 — Detecting and preventing collapse

- Complete collapse: all outputs identical, zero variance.
- Dimensional collapse: effective rank far below $d$.
- Diagnostics: singular-value spectrum of the embedding matrix, entropy of the similarity distribution.
- Fixes: variance terms, stop-gradients, centring, whitening.
- Reporting effective rank as a standard metric.

$$
\text{effective rank}=\exp\left(-\sum_i \bar\sigma_i\log\bar\sigma_i\right),
\quad \bar\sigma_i=\frac{\sigma_i}{\sum_j \sigma_j}
$$

**Practice tasks**

- Measure effective rank for a healthy and a collapsed run and plot the spectra.
- Break a working method deliberately and identify collapse from the diagnostics.

> **Module completion gate (10.4).** You can explain why a negative-free method does not collapse, and prove with diagnostics that your run did not.

---

## 10.5 — Multimodal and Cross-Modal Representations

**Objective.** Align representations across modalities and use them for zero-shot transfer.

### Module 10.5.1 — Contrastive vision–language pretraining

- Paired image–text data and the dual-encoder architecture.
- Symmetric InfoNCE over the batch, with a learned temperature.
- Zero-shot classification via prompt templates.
- What alignment buys: retrieval, captioning support, and weak supervision.
- Failure modes: compositional reasoning, counting, and fine-grained spatial relations.

$$
\mathcal{L}=\frac{1}{2}\left(\mathcal{L}_{i\to t}+\mathcal{L}_{t\to i}\right),\qquad
p(y\mid x)=\frac{\exp\left(\langle f_I(x),f_T(\text{prompt}_y)\rangle/\tau\right)}{\sum_{c}\exp\left(\langle f_I(x),f_T(\text{prompt}_c)\rangle/\tau\right)}
$$

**Practice tasks**

- Use a pretrained CLIP model for zero-shot classification and compare with a supervised baseline.
- Show one task where prompt wording changes accuracy by more than five points.

---

### Module 10.5.2 — Alignment, fusion and other modalities

- Early fusion, late fusion, and cross-attention.
- Audio–text and video–text alignment.
- Modality gaps and missing-modality robustness.
- Evaluating cross-modal retrieval with recall@k and mean rank.
- Data quality: noisy pairs and their effect on alignment.

$$
\text{recall@}k=\frac{1}{Q}\sum_{q=1}^{Q}\mathbf{1}\left[\text{correct match in top-}k\right]
$$

**Practice tasks**

- Evaluate a cross-modal retrieval model and inspect the false positives.
- Add synthetic noise to pairs and measure the degradation in recall@10.

---

> **Module completion gate (10.5).** You can use a multimodal encoder for zero-shot transfer and explain where alignment breaks.

---

## 10.6 — Transfer, Probing and Adaptation Protocols

**Objective.** Compare representations fairly, which is harder than it sounds.

### Checklist

- Frozen encoder plus linear probe: the standard.
- k-NN evaluation: parameter-free, sensitive to normalisation.
- Fine-tuning with a conservative learning rate; layer-wise decay.
- Partial unfreezing and adapter-based adaptation.
- Label-efficiency curves: accuracy versus fraction of labels.
- Same probe protocol for every encoder, same augmentation, same epochs.
- Reporting compute spent to obtain the representation, not only the probe score.

### Practice tasks

- Build a probe harness that evaluates three encoders with identical settings and reports intervals.
- Show that a probe can rank encoders differently at 1%, 10%, and 100% of labels.

> **Module completion gate (10.6).** Every representation comparison you report uses one frozen protocol and includes compute cost.

---

## 10.7 — Representation Quality and Failure Modes

**Objective.** Understand what SSL encoders actually learn, including the shortcuts.

### Checklist

- Shortcut learning: background, texture, colour, and dataset artefacts.
- Augmentation leakage: an augmentation that destroys the signal you need downstream.
- Negative sampling bias in contrastive learning.
- Spurious correlations that survive pretraining and poison downstream tasks.
- Domain shift: a representation tuned to ImageNet may not transfer to microscopy.
- Feature attribution and nearest-neighbour inspection as diagnostics.
- Reporting: probe accuracy is necessary but not sufficient — inspect the neighbours.

### Practice tasks

- Find a case where a high-probe encoder has visibly wrong nearest neighbours.
- Show that colour-only augmentation destroys performance on a colour-relevant task.

> **Module completion gate (10.7).** You can name the shortcut your encoder learned and show evidence for it.

---

## 10.8 — Metric Learning and Embedding Systems

**Objective.** Learn embeddings for a specific distance-based task, which is most of industry retrieval.

### Checklist

- Triplet loss, margin selection, and hard-negative mining.
- Contrastive and margin-based losses (ArcFace, CosFace) for classification embeddings.
- Sampling strategies: batch-hard, semi-hard, and curriculum.
- Evaluation with recall@k, precision@k, and mAP.
- Embedding dimensionality versus retrieval cost.
- Indexing for retrieval: FAISS, IVF, HNSW, and quantisation.
- When to learn embeddings versus when to use a pretrained model frozen.

$$
\mathcal{L}_{\text{triplet}}=\max\left(0,\ \lVert f(a)-f(p)\rVert^2-\lVert f(a)-f(n)\rVert^2+\alpha\right)
$$

### Practice tasks

- Train a metric-learning model on a small fine-grained dataset; report recall@1 and recall@10.
- Compare no mining, random mining, and hard mining on the same budget.

> **Module completion gate (10.8).** You can train, evaluate, and index an embedding model for a retrieval task.

---

## 10.9 — Critiques and Limits of SSL

**Objective.** Know the arguments against the field's claims, so you do not repeat them uncritically.

### Checklist

- "SSL removes the need for labels" — until you need a task-specific decision boundary.
- Compute cost: pretraining is expensive, and the savings only appear at scale.
- Benchmark dependence: many gains are ImageNet-shaped.
- Reproducibility problems: sensitive recipes, unreported compute.
- Evaluation leakage: probing on data the encoder may have seen.
- Interpretability: latent spaces are harder to audit than hand-built features.
- When a supervised or classical approach still wins in practice.

> **Module completion gate (10.9).** You can argue both for and against using SSL for a given problem, with costs.

---

## 10.10 — Mini-project: Build InfoNCE and SimCLR

- Implement the InfoNCE loss from scratch, with temperature.
- Build a two-view augmentation pipeline with configurable transforms.
- Train a small CNN on CIFAR-10 with SimCLR for a fixed budget.
- Evaluate with a frozen linear probe and k-NN.
- Run three ablations: augmentation set, temperature, projection-head depth.
- Report probe accuracy with intervals, effective rank, and compute used.

> **Gate.** Your probe beats a randomly initialised encoder by a wide margin, the ablations identify the key design choice, and you can explain the loss line by line.

---

## 10.11 — Level 10 Capstone: Representation Lab

### Project: `repr-lab` — pretrain, freeze, evaluate, ablate

**Difficulty.** Advanced

**Purpose.** Produce a rigorous representation-learning study. This is the artefact that demonstrates you understand modern pretraining rather than simply calling a pretrained model.

### A. Functional requirements

**Part 1 — Pretraining harness**

- At least two SSL objectives implemented or adapted: one contrastive (SimCLR or MoCo) and one non-contrastive (BYOL or Barlow Twins).
- Configurable augmentation pipeline with named presets.
- Checkpointing, resumption, and run metadata logging.
- Collapse diagnostics logged every epoch: embedding variance, effective rank, similarity histogram.

**Part 2 — Frozen evaluation**

- Linear probe and k-NN for every checkpoint.
- Label-efficiency curves at 1%, 10%, and 100% of labels.
- Probe protocol identical across encoders, with three seeds and intervals.
- Comparison against a supervised baseline trained on the same budget.

**Part 3 — Ablations**

- Objective: contrastive versus non-contrastive versus supervised versus random init.
- Augmentation: full set, minus crops, minus colour, crops only.
- Temperature or EMA momentum, whichever applies.
- Batch size at fixed compute.

**Part 4 — Analysis**

- t-SNE or UMAP of the embedding space, before and after pretraining.
- Nearest-neighbour inspections for 20 samples, with commentary on correctness.
- One documented failure: a shortcut learned, an augmentation that hurt, or a collapse that occurred.

**Part 5 — Report**

- A results table with probe accuracy, k-NN accuracy, effective rank, and compute for every configuration.
- A one-page conclusion: which design choice mattered most, and why.
- Reproduction instructions that rebuild every number.

### B. Suggested architecture

```text
repr-lab/
├── conf/
│   ├── objectives/{simclr,moco,byol,barlow}.yaml
│   └── augmentations.yaml
├── src/repr_lab/
│   ├── data.py
│   ├── augment.py
│   ├── objectives.py       # InfoNCE, BYOL, Barlow, supervised CE
│   ├── encoders.py         # backbone registry
│   ├── train.py
│   ├── diagnostics.py      # variance, effective rank, similarity hist
│   ├── probe.py            # linear probe + kNN + label fractions
│   └── analyse.py          # UMAP, NN inspection, tables
├── runs/
├── reports/
│   ├── results_table.md
│   ├── ablations.md
│   └── failure_analysis.md
└── tests/
```

### C. Acceptance targets

| Component | Target |
|---|---|
| Probe protocol | Identical across all encoders; 3 seeds; intervals reported |
| SSL versus random init | Probe accuracy lift of at least 15 points on CIFAR-10-scale data |
| SSL versus supervised | Honest comparison at matched compute, with the gap stated |
| Collapse diagnostics | Effective rank reported for every run; no unexplained collapse |
| Ablations | At least 8 configurations, one variable each |
| Compute honesty | GPU hours reported per configuration |
| Failure analysis | One concrete shortcut or failure documented with evidence |

### D. Stretch goals

- Add MoCo-style momentum encoder and compare queue-based negatives with in-batch negatives.
- Pretrain on unlabelled data from your own domain and transfer to a labelled subset.
- Add a multimodal alignment experiment with image–text pairs you assemble.
- Distil the pretrained encoder into a much smaller one and measure the quality retained.
- Evaluate transfer to two downstream datasets instead of one.

### E. Acceptance criteria

| Area | Required evidence |
|---|---|
| **Implementation** | Two SSL objectives working, with correct loss implementations |
| **Protocol discipline** | Frozen probe for every comparison, three seeds, intervals |
| **Diagnostics** | Collapse metrics logged and interpreted, not just collected |
| **Fairness** | Compute matched or reported, supervised baseline included |
| **Insight** | A clear claim about which design choice mattered and why |
| **Reproducibility** | One command rebuilds the tables and figures |

> Level 10 is complete when you can defend the claim "this representation is better" with a frozen probe, seed variance, and a stated compute budget.

---

## Level 10 interview question bank

### A. Representation fundamentals

- What makes a representation good?
- Why can two encoders rank differently for retrieval and classification?
- What is a linear probe, and what does it measure?
- Why is k-NN evaluation useful, and what is its weakness?
- What is a shortcut feature, and how do you detect one?

### B. Contrastive learning

- Explain InfoNCE and the role of temperature.
- Why do negatives matter, and what happens with too few?
- Why is the projection head discarded after pretraining?
- Why does augmenting strongly help SimCLR?
- How does MoCo decouple batch size from the number of negatives?

### C. Non-contrastive methods

- Why doesn't BYOL collapse?
- What does the stop-gradient do?
- How do Barlow Twins and VICReg enforce non-collapse?
- What is dimensional collapse, and how do you measure it?

### D. Multimodal and metric learning

- How does CLIP's objective work, and what does it enable?
- Where does CLIP fail, and why?
- Explain triplet loss and hard-negative mining.
- How do you evaluate an embedding model for retrieval?

### E. Critique and judgement

- What are the strongest arguments against current SSL claims?
- When would you use SSL instead of supervised learning, and when not?
- Your SSL encoder has high probe accuracy but bad nearest neighbours. What now?
- How would you pretrain on 50k unlabelled images from your domain with one GPU?

### Interview readiness standard

1. Define the objective precisely.
2. Explain what invariance it encourages and what it might destroy.
3. State the evaluation protocol.
4. Report compute and seed variance.
5. Name one failure mode you observed yourself.

---

## Level 10 final assessment

### Knowledge

- I can define and evaluate a representation with frozen probes.
- I can implement InfoNCE and explain temperature.
- I can explain SimCLR, MoCo, BYOL, and Barlow Twins.
- I can describe masked and generative pretraining objectives.
- I can use multimodal encoders for zero-shot transfer.
- I can train metric-learning embeddings and index them.
- I can detect collapse and shortcut learning.
- I can state the honest costs and limits of SSL.

### Practical skills

- I have pretrained an encoder with two different objectives.
- I have evaluated with linear probe and k-NN at multiple label fractions.
- I have run ablation studies with seed variance.
- I have measured effective rank and inspected nearest neighbours.
- I have documented one real failure with evidence.

### Project

- `repr-lab` passes every acceptance target.
- The results table includes compute for every configuration.
- I can defend the claim "this representation is better" under scrutiny.

> **Level 10 completion rule.** If you can pretrain, probe, and critique a representation model with your own numbers, you are ready for Level 11.

---

# LEVEL 11 — ADVANCED ML METHODS

> **Goal.** Add the methods that a senior applied scientist is expected to know but that Phase 2 does not cover: uncertainty, causality, sequences, recommendation, adaptation under shift, and constrained optimisation. You will implement two of them deeply rather than skim ten.

## Level dashboard

| Item | Details |
|---|---|
| **Level** | 11 — Advanced ML Methods |
| **Difficulty** | Advanced |
| **Suggested duration** | 5–7 weeks |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Core tools** | PyTorch, `statsmodels`, `EconML`/`DoWhy`, `sktime`/`statsforecast`, `scikit-learn`, `PyMC` or `numpyro` (optional) |
| **Main project** | **`adv-ml-lab`** — two advanced methods implemented, benchmarked, and reported |
| **Final outcome** | Select and correctly apply advanced methods, state their assumptions, and measure whether they beat simpler alternatives. |

**Prerequisites.** Levels 5–9. These methods assume honest evaluation, solid modelling, and the ability to train and debug networks.

---

## 11.1 — Uncertainty Quantification

**Objective.** Produce predictions that know what they do not know.

### Module 11.1.1 — Aleatoric and epistemic uncertainty

- Aleatoric: irreducible noise in the data.
- Epistemic: uncertainty about the model, reducible with more data.
- Why the distinction changes the decision (collect data versus accept the noise).
- Calibration versus uncertainty: related but not identical.
- Out-of-distribution inputs as a separate failure mode.

$$
\underbrace{\operatorname{Var}(y\mid x)}_{\text{total}}=\underbrace{\mathbb{E}_{\theta}\left[\operatorname{Var}(y\mid x,\theta)\right]}_{\text{aleatoric}}+\underbrace{\operatorname{Var}_{\theta}\left[\mathbb{E}(y\mid x,\theta)\right]}_{\text{epistemic}}
$$

**Practice tasks**

- Estimate total, aleatoric, and epistemic uncertainty on a synthetic dataset with known noise.
- Show that adding training data reduces the epistemic term but not the aleatoric one.

---

### Module 11.1.2 — Practical uncertainty for deep models

- Deep ensembles: train $k$ models and treat the spread as uncertainty.
- MC dropout: dropout at inference, multiple stochastic passes.
- Snapshot ensembles and their cheaper cost.
- Quantile regression and distributional heads.
- Conformal prediction as a distribution-free wrapper (from L6).
- Cost comparison: ensembles multiply training and inference cost.

$$
\hat\mu=\frac{1}{M}\sum_{m=1}^{M}f_{\theta_m}(x),\qquad
\hat\sigma^2=\frac{1}{M}\sum_{m=1}^{M}\left(f_{\theta_m}(x)-\hat\mu\right)^2
$$

**Practice tasks**

- Compare deep ensembles, MC dropout, and conformal intervals on coverage and cost.
- Show MC dropout underestimating uncertainty on OOD inputs relative to ensembles.

---

### Module 11.1.3 — Bayesian methods in practice

- Priors, posteriors, and why full Bayesian inference is expensive.
- Variational inference and the ELBO (from Level 9).
- Laplace approximation as a post-hoc method.
- Bayesian neural networks: when they are worth the complexity.
- Decision-theoretic use: expected loss minimisation under uncertainty.
- Honest recommendation: most problems need calibration and ensembles, not a posterior.

$$
\text{expected loss}(a\mid x)=\int \mathcal{L}(a,y)\,p(y\mid x)\,dy
\quad\Longrightarrow\quad a^\star=\arg\min_a \text{expected loss}
$$

**Practice tasks**

- Implement a Laplace approximation on a small trained network and compare intervals with an ensemble.
- Write a decision rule that uses predictive uncertainty to route low-confidence cases to humans.

---

> **Module completion gate (11.1).** You can produce calibrated, uncertainty-aware predictions and justify the method's cost.

---

## 11.2 — Kernel and Gaussian Process Methods

**Objective.** Know when a principled non-parametric model beats a deep net.

### Checklist

- Kernel functions and the feature-space view.
- Gaussian processes: mean and covariance functions, posterior predictive.
- Hyperparameter learning by marginal likelihood.
- Computational cost $O(n^3)$ and the approximations: inducing points, random features, Nyström.
- Multi-output and structured kernels.
- Where GPs win: small data, smooth functions, well-calibrated uncertainty, active learning.
- Where they lose: scale, high dimensions, non-stationary data.

$$
f\sim\mathcal{GP}\left(m(x),k(x,x')\right),\qquad
f_\star\mid X,y,x_\star\sim\mathcal{N}\left(\mu_\star,\Sigma_\star\right)
$$

### Practice tasks

- Fit a GP regression with a squared-exponential kernel and compare intervals with a neural network.
- Use a GP for Bayesian optimisation of two hyperparameters.
- Show GP failure at $n=10^5$ without approximation and fix it with inducing points.

> **Module completion gate (11.2).** You can choose a GP for a stated problem and explain its cost.

---

## 11.3 — Sequence, Time Series and Forecasting

**Objective.** Forecast and model sequential data without the classic validation mistakes.

### Module 11.3.1 — Forecasting fundamentals

- Trend, seasonality, and residual decomposition.
- Naive, seasonal-naive, and moving-average baselines (always the baseline).
- Exponential smoothing and ARIMA families.
- Cross-validation for time series: rolling origin with a horizon gap.
- Metrics that matter: MASE, sMAPE, pinball loss for quantiles.

$$
\text{MASE}=\frac{\frac{1}{h}\sum_{t}\lvert y_t-\hat y_t\rvert}{\frac{1}{T-m}\sum_{t}\lvert y_t-y_{t-m}\rvert}
$$

**Practice tasks**

- Forecast a public series with three baselines and one ARIMA model; report MASE with intervals.
- Show a random split inflating forecast accuracy and fix it with rolling origin.

---

### Module 11.3.2 — Global and deep forecasting

- Local versus global models; why one model across many series often wins.
- Gradient-boosted forecasting with lag and calendar features.
- Deep forecasters: DeepAR, N-BEATS, TFT, and simple LSTMs.
- Hierarchical forecasting and reconciliation.
- Intermittent and sparse demand.
- Probabilistic forecasting with quantile or distributional heads.

**Practice tasks**

- Build a global LightGBM forecaster and compare it with per-series models.
- Produce 80% and 95% prediction intervals and measure their empirical coverage.

---

### Module 11.3.3 — Sequence modelling beyond forecasting

- Sequence classification and event prediction with irregular sampling.
- Survival analysis: censoring, Kaplan–Meier, Cox models, and deep survival.
- Churn and time-to-event problems framed correctly.
- Dynamic treatment and sequential decisions (preview of 11.5).

**Practice tasks**

- Frame a churn problem as survival analysis and compare with binary classification at a fixed horizon.
- Show how censoring biases a naive classification target.

> **Module completion gate (11.3).** You can forecast, validate temporally, and produce calibrated prediction intervals.

---

## 11.4 — Causal Machine Learning

**Objective.** Estimate effects, not just correlations, and know exactly when you cannot.

### Module 11.4.1 — Identification

- Potential outcomes and the estimands: ATE, ATT, CATE.
- Confounding, backdoor paths, and adjustment sets.
- DAGs as a reasoning tool.
- Instrumental variables, regression discontinuity, and difference-in-differences.
- Sensitivity analysis for unmeasured confounding.

$$
\tau(x)=\mathbb{E}\left[Y(1)-Y(0)\mid X=x\right]\quad\text{(CATE)},\qquad
\tau_{\text{ATE}}=\mathbb{E}_{X}\left[\tau(X)\right]
$$

**Practice tasks**

- Draw a DAG for a product question and derive the minimal adjustment set.
- Simulate a confounded dataset and show naive estimation is biased while adjusted estimation is not.

---

### Module 11.4.2 — Causal ML estimators

- Meta-learners: S-learner, T-learner, X-learner.
- Doubly robust estimation and double machine learning.
- Causal forests for heterogeneous effects.
- Uplift modelling and its evaluation.
- Overlap and positivity: where causal estimates are unsupported.
- Why predictive accuracy is irrelevant to causal validity.

$$
\hat\tau_{\text{AIPW}}=\frac{1}{n}\sum_i\left[\frac{T_iY_i}{\hat e(X_i)}-\frac{(1-T_i)Y_i}{1-\hat e(X_i)}\right]
-\frac{1}{n}\sum_i\frac{T_i-\hat e(X_i)}{\hat e(X_i)\left(1-\hat e(X_i)\right)}\hat m(X_i)
$$

**Practice tasks**

- Estimate a treatment effect with a meta-learner and with double ML on simulated data; compare with the truth.
- Measure overlap and identify the region where the effect is unidentified.

---

### Module 11.4.3 — Causal evaluation

- Evaluating CATE estimators without ground truth: simulation, proxy metrics, and calibration of uplift.
- Qini and uplift curves.
- The failure mode: a great uplift model on a bad identification strategy.
- Reporting causal results: estimand, assumption, estimator, interval, sensitivity.

**Practice tasks**

- Compare two uplift models with Qini curves and pick an operating point.
- Write a one-page causal report with all five reporting elements.

> **Module completion gate (11.4).** You can state an estimand, defend the identification assumption, and report an effect with uncertainty and sensitivity.

---

## 11.5 — Sequential Decision Making and Bandits

**Objective.** Optimise decisions over time without wrecking the product.

### Checklist

- Exploration versus exploitation; regret.
- Multi-armed bandits: epsilon-greedy, UCB, Thompson sampling.
- Contextual bandits and their relationship to recommendation.
- Off-policy evaluation: inverse propensity scoring, doubly robust, and their assumptions.
- Logging policies and the data you must record to evaluate offline.
- Switching from A/B testing to bandits: when it is legitimate and when it is risky.
- Guardrails, delayed feedback, and the cost of exploration.

$$
\text{regret}(T)=\sum_{t=1}^{T}\left(\mu^\star-\mu_{a_t}\right),\qquad
\hat V_{\text{IPS}}=\frac{1}{n}\sum_{i=1}^{n}\frac{\pi(a_i\mid x_i)}{\pi_0(a_i\mid x_i)}\,r_i
$$

### Practice tasks

- Simulate a three-arm bandit with all three policies and plot cumulative regret.
- Run off-policy evaluation on a logged dataset and show IPS blowing up when propensities are tiny.

> **Module completion gate (11.5).** You can design a bandit experiment, log it correctly, and evaluate it offline.

---

## 11.6 — Recommenders and Ranking

**Objective.** Build and evaluate systems whose output is an ordered list.

### Checklist

- Candidate generation, ranking, and re-ranking as separate stages.
- Implicit versus explicit feedback.
- Matrix factorisation, BPR, and two-tower retrieval models.
- Learning to rank: pointwise, pairwise, listwise; LambdaMART.
- Sequential recommenders and session-based models.
- Position bias, exposure bias, and click models.
- Evaluation: recall@k, nDCG, MAP, plus diversity, coverage, and novelty.
- Cold start and the exploration problem.

$$
\hat r_{ui}=\mu+b_u+b_i+p_u^{\top}q_i,\qquad
\mathcal{L}_{\text{BPR}}=-\sum_{(u,i,j)}\log\sigma\left(\hat r_{ui}-\hat r_{uj}\right)
$$

### Practice tasks

- Build a two-tower retriever plus a ranking model; report recall@50 for retrieval and nDCG@10 for ranking.
- Show how position bias inflates the apparent quality of top-ranked items.

> **Module completion gate (11.6).** You can build a two-stage recommender and evaluate each stage with the right metric.

---

## 11.7 — Distribution Shift, Robustness and Adaptation

**Objective.** Handle the fact that production data is not your test set.

### Module 11.7.1 — Shift taxonomy

- Covariate shift: $P(X)$ changes, $P(y\mid X)$ stable.
- Label shift: $P(y)$ changes.
- Concept drift: $P(y\mid X)$ changes.
- Domain shift and subpopulation shift.
- Adversarial and corrupted inputs.
- Detecting shift: statistical tests, drift scores, and proxy signals.

$$
\text{importance weight: } w(x)=\frac{p_{\text{target}}(x)}{p_{\text{source}}(x)}
$$

**Practice tasks**

- Simulate each shift type on one dataset and measure the metric degradation.
- Detect covariate shift with a domain classifier and quantify separability.

---

### Module 11.7.2 — Robustness techniques

- Importance weighting and its variance problem.
- Domain adaptation: feature alignment, adversarial alignment, and pseudo-labelling.
- Domain generalisation: augmentation, invariance penalties, and their limits.
- Test-time adaptation and continual learning basics.
- Group distributionally robust optimisation.
- Adversarial training and its cost.

**Practice tasks**

- Apply importance weighting under covariate shift and compare with naive training.
- Show adversarial training reducing robustness-cost trade-offs on a clean accuracy curve.

---

### Module 11.7.3 — Out-of-distribution detection

- Confidence-based baselines: max softmax, entropy.
- Distance-based methods: Mahalanobis, k-NN, energy scores.
- Models with explicit density estimates.
- Evaluation: AUROC, AUPR, and the effect of the OOD set you chose.
- Why OOD detection results rarely transfer across benchmarks.

**Practice tasks**

- Compare three OOD detectors across two OOD datasets and show rankings changing.
- Calibrate an abstention rule using OOD scores and measure the human-review load.

> **Module completion gate (11.7).** You can name the shift your system faces, measure it, and choose a mitigation with a stated cost.

---

## 11.8 — Anomaly Detection and Rare Events

**Objective.** Work where positives are scarce and expensive.

### Checklist

- Framings: supervised, semi-supervised, and unsupervised.
- Reconstruction-based detection and its assumptions.
- One-class methods and density estimation.
- Extreme value theory for threshold setting.
- Alert budget and precision at a fixed alert rate.
- Evaluation without labels: injection studies and expert review.
- Human-in-the-loop design and feedback capture.

**Practice tasks**

- Inject 200 known anomalies into clean data and measure detection at 100 alerts per day.
- Show a detector with high AUROC and unusable precision at the operating threshold.

> **Module completion gate (11.8).** You can design an anomaly system around an alert budget and evaluate it honestly.

---

## 11.9 — Multi-Objective and Constrained Optimisation

**Objective.** Optimise for accuracy **and** latency, cost, fairness, or safety.

### Checklist

- Multi-objective optimisation and the Pareto frontier.
- Scalarisation, and why it hides trade-offs.
- Constrained optimisation: Lagrangian relaxation, and projected methods.
- Cost-sensitive learning and budgeted decisions.
- Fairness-accuracy trade-offs and their measurement.
- Reporting a frontier instead of a single model.
- Choosing an operating point with stakeholders.

$$
\min_\theta\ \mathcal{L}(\theta)\quad\text{s.t.}\quad g_i(\theta)\le c_i,\qquad
\max_\theta\ \left[\mathcal{L}(\theta)-\sum_i\lambda_i\left(g_i(\theta)-c_i\right)\right]
$$

### Practice tasks

- Sweep a model size and plot accuracy versus latency as a Pareto frontier.
- Implement a simple Lagrangian constraint on inference cost and show the frontier shift.

> **Module completion gate (11.9).** You present trade-offs as frontiers and can defend an operating point.

---

## 11.10 — Choosing an Advanced Method

**Objective.** Resist the temptation to use the most impressive method available.

### Checklist

- Start from the decision and the failure mode, not the technique.
- Ask what a simpler baseline achieves first.
- Estimate the cost: data, compute, monitoring, and maintenance.
- Identify the assumption the method needs and test whether it holds.
- Prefer the method whose failure mode you can detect in production.
- Document the rejected methods and why they were rejected.

### Practice tasks

- For five problems, propose an advanced method, a simple alternative, and the experiment that decides between them.
- Reject one method on the grounds that its assumption fails in your data, and write the paragraph explaining it.

> **Module completion gate (11.10).** Every advanced method you adopt is justified against a simpler baseline and a detectable failure mode.

---

## 11.11 — Level 11 Capstone: Advanced Methods Lab

### Project: `adv-ml-lab` — implement two, benchmark both, report honestly

**Difficulty.** Advanced

**Purpose.** Go deep on two advanced methods rather than skimming ten. Depth is what interviewers test, and depth is what makes a method usable.

### A. Functional requirements

**Choose two tracks** (one implementation-heavy, one analysis-heavy):

| Track | Methods available |
|---|---|
| Uncertainty | deep ensembles, MC dropout, Laplace approximation, conformal wrapper |
| Causality | meta-learners, double ML, causal forest, uplift evaluation |
| Sequences | global forecaster, deep probabilistic forecaster, survival model |
| Decisions | contextual bandit, off-policy evaluation, recommender ranking |
| Robustness | domain adaptation, importance weighting, OOD detection |
| Optimisation | Pareto frontier, constrained training, cost-aware inference |

**For each chosen method**

- A from-scratch implementation of the core estimator or objective.
- Validation against a reference implementation or a known ground truth (simulation).
- A simple baseline that could plausibly be enough.
- A controlled comparison: metric, cost, and failure mode.
- Assumption checklist: what must hold for the method to be valid.
- A short decision memo: adopt, reject, or adopt with conditions.

**Shared deliverables**

- A benchmark harness that runs both studies reproducibly.
- Results tables with intervals and compute cost.
- A written analysis of one case where the advanced method did not beat the baseline.

### B. Suggested architecture

```text
adv-ml-lab/
├── conf/
│   ├── uncertainty.yaml
│   └── causality.yaml            # or whichever two tracks
├── src/adv_ml/
│   ├── uncertainty/{ensembles,mc_dropout,laplace,conformal}.py
│   ├── causality/{meta_learners,dml,uplift}.py
│   ├── sequences/{forecasters,survival}.py
│   ├── decisions/{bandits,ope,rankers}.py
│   ├── robustness/{shift,adaptation,ood}.py
│   ├── baselines.py
│   ├── evaluate.py
│   └── report.py
├── reports/
│   ├── study_a.md
│   ├── study_b.md
│   ├── assumptions.md
│   └── decisions.md
└── tests/
```

### C. Acceptance targets

| Component | Target |
|---|---|
| Implementation | Core estimator written from scratch, not only imported |
| Validation | Matches a reference or known truth within a stated tolerance |
| Baseline | A simple alternative trained and reported |
| Assumptions | Every assumption listed with a test or a stated reason it cannot be tested |
| Cost | Training and inference cost reported for both approaches |
| Negative result | At least one honest case where the advanced method did not win |
| Reproducibility | One command regenerates all tables |

### D. Stretch goals

- Implement a third method in a different track and cross-compare.
- Add a simulation study measuring estimator bias and coverage across 500 replications.
- Deploy one method behind a small API with a latency budget.
- Write the adoption memo as if to a sceptical engineering manager.

### E. Acceptance criteria

| Area | Required evidence |
|---|---|
| **Depth** | Two methods implemented and validated, not skimmed |
| **Rigour** | Baselines, intervals, seed variance, and assumption checks |
| **Cost awareness** | Compute and latency reported |
| **Judgement** | Adopt/reject decisions with explicit reasoning |
| **Honesty** | At least one negative or mixed result reported plainly |
| **Reproducibility** | Full regeneration from config and seeds |

> Level 11 is complete when you can defend an advanced method's assumptions, cost, and failure modes against a simpler alternative — and admit when the simple one wins.

---

## Level 11 interview question bank

### A. Uncertainty

- What is the difference between aleatoric and epistemic uncertainty?
- How do deep ensembles estimate uncertainty, and what do they cost?
- Why can a well-calibrated model still be badly wrong on OOD inputs?
- When would you use conformal prediction instead of a Bayesian method?
- How would you route low-confidence predictions to humans?

### B. Causality

- What is the fundamental problem of causal inference?
- What is a confounder, and how do you adjust for one?
- When is a T-learner inappropriate?
- What are the assumptions of double machine learning?
- How do you evaluate an uplift model without ground truth?
- Why can a highly accurate model produce a badly biased effect estimate?

### C. Sequences and decisions

- Why is random cross-validation invalid for time series?
- What is MASE, and why use it over MAPE?
- When would you use a global forecaster over per-series models?
- What is a contextual bandit, and how does it differ from an A/B test?
- What must you log to do off-policy evaluation?

### D. Ranking and robustness

- Why is a two-stage recommender architecture common?
- What is position bias, and how does it affect training data?
- Name three types of distribution shift with an example each.
- How does importance weighting correct for covariate shift, and what goes wrong?
- Why do OOD detection benchmarks fail to transfer?

### E. Judgement

- Which advanced method would you use for a decision with asymmetric costs?
- When would you deliberately not use an advanced method?
- How do you present a multi-objective trade-off to a product team?
- Your causal estimate conflicts with an A/B test. What do you do?

### Interview readiness standard

1. State the estimand or decision.
2. Name the assumption required for validity.
3. Give the estimator and its cost.
4. Give the baseline it must beat.
5. Name the failure mode you would monitor.

---

## Level 11 final assessment

### Knowledge

- I can separate aleatoric from epistemic uncertainty and choose a method accordingly.
- I can fit and critique Gaussian process models.
- I can forecast with correct temporal validation and calibrated intervals.
- I can state an estimand, identification assumption, and estimator for a causal question.
- I can design and evaluate a bandit or recommender system.
- I can name and mitigate the distribution shift my system faces.
- I can present a multi-objective frontier and defend an operating point.

### Practical skills

- I have implemented two advanced methods from scratch.
- I have validated them against a reference or simulated truth.
- I have compared each against a simple baseline with intervals.
- I have reported one honest negative result.
- I have written assumption and decision memos.

### Project

- `adv-ml-lab` passes every acceptance target.
- The assumptions document is specific and testable.
- I can explain when I would reject my own chosen method.

> **Level 11 completion rule.** If you can implement an advanced method, state its assumptions, measure its cost, and admit when it loses, you are ready for Level 12.

---

# LEVEL 12 — RESEARCH METHODS AND EXPERIMENTAL SCIENCE

> **Goal.** Learn to produce knowledge, not just models: read papers critically, design experiments that can fail, reproduce results honestly, and write claims that your evidence actually supports.

## Level dashboard

| Item | Details |
|---|---|
| **Level** | 12 — Research Methods and Experimental Science |
| **Difficulty** | Advanced |
| **Suggested duration** | 4–6 weeks |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Core tools** | Git, DVC, experiment tracking, LaTeX or Markdown, a reference manager, `pytest`, compute accounting |
| **Main project** | **`research-repro`** — reproduce a published result, ablate it, and write a 4-page report |
| **Final outcome** | Read, reproduce, critique, and communicate an ML result at the standard expected of an applied scientist. |

**Prerequisites.** Levels 6 and 11. Evaluation discipline is the entry ticket; advanced methods give you something worth studying.

---

## 12.1 — Thinking Like a Researcher

**Objective.** Replace "what technique can I use?" with "what claim am I testing?".

### Module 12.1.1 — From curiosity to a testable question

- Observable phenomenon, hypothesised mechanism, and a falsifiable prediction.
- The three question types: does it work, why does it work, and when does it fail.
- Scoping a question to your compute and time budget.
- The difference between a research question and a product question.
- Writing the question before the experiment, in one sentence.

$$
\text{claim}:\ \theta \in \Theta_0\ \text{versus}\ \theta \in \Theta_1
\quad\text{with a pre-specified test and stopping rule}
$$

**Practice tasks**

- Turn three vague curiosities into falsifiable hypotheses with a stated experiment.
- Rewrite one hypothesis so that it could be disproved by a single run.

---

### Module 12.1.2 — Research taste

- Recognising an important question versus an easy one.
- The value of a negative result.
- Incremental versus structural contributions.
- Choosing problems where your constraints are an advantage.
- Avoiding the "new dataset, same model" trap.

**Practice tasks**

- Read three abstracts and rank them by expected value of the result, with reasons.
- Identify one question in your current work that nobody has answered well, and why.

---

### Module 12.1.3 — Pre-registration and experiment plans

- Write the plan before running: hypothesis, metric, data, analysis, stopping rule.
- Commit the plan to version control with a timestamp.
- Distinguish confirmatory from exploratory analysis.
- Report exploratory findings as exploratory.
- The cost of skipping this: HARKing and unreportable results.

> **Module completion gate (12.1).** You can write a one-page experiment plan that someone else could execute and that could fail.

---

## 12.2 — Reading and Mapping Literature

**Objective.** Extract what a paper actually shows, efficiently.

### Module 12.2.1 — The three-pass method

- **Pass 1 (5 min):** title, abstract, figures, conclusion — decide whether to continue.
- **Pass 2 (30 min):** method, experiments, and the claims table; skip proofs.
- **Pass 3 (2 h):** reproduce the argument line by line; question every assumption.
- Extracting: claim, evidence, baseline, dataset, compute, and limitations.
- Separating what was shown from what was implied.

**Practice tasks**

- Three-pass three papers and record the time each pass took and what you learned.
- Write a 150-word summary of one paper's contribution and one thing it does not show.

---

### Module 12.2.2 — Literature mapping

- Building a citation graph forwards and backwards.
- Identifying the canonical baselines and the datasets in a subfield.
- Finding the paper that everyone cites but nobody reproduces.
- Tracking a subfield: venues, labs, and the few people who set the agenda.
- Maintaining a paper log with structured notes.

**Practice tasks**

- Build a 20-paper map for one subfield with arrows for "improves on" and "evaluated on".
- Identify three open problems from the map, each testable in a month.

---

### Module 12.2.3 — Reading critically

- Baseline fairness: were they tuned? at equal compute?
- Statistical reporting: seeds, intervals, and number of runs.
- Ablations: do they isolate the claimed cause?
- Dataset leakage and benchmark contamination.
- The gap between the abstract and the results table.
- Red flags: single-seed gains, missing baselines, "we leave to future work" for the central question.

**Practice tasks**

- Find three specific weaknesses in a recent paper and state the experiment that would expose each.
- Rewrite a paper's abstract so it matches its evidence exactly.

> **Module completion gate (12.2).** You can summarise, critique, and place a paper in its literature in under an hour.

---

## 12.3 — Reproducibility Science

**Objective.** Make your work, and other people's, actually reproducible.

### Module 12.3.1 — Levels of reproducibility

- Repeatability: same code, same data, same result.
- Reproducibility: same method, independent implementation.
- Replicability: same claim, new data.
- Robustness: same conclusion across reasonable variations.
- Which level your claim needs, and which you actually achieved.

| Level | What is fixed | What can change |
|---|---|---|
| Repeatable | code, data, environment, seeds | nothing |
| Reproducible | method description, data | implementation, environment |
| Replicable | claim | data, sample |
| Robust | conclusion | reasonable design choices |

**Practice tasks**

- Classify five published results by the level of evidence they actually provide.
- State the level your own capstone achieves and what would raise it.

---

### Module 12.3.2 — Artefacts and reporting standards

- Code release with a working entry point and a small sample dataset.
- Environment lockfiles and container images.
- Data availability: licensing, access restrictions, and versioning.
- Compute reporting: hardware, hours, and cost.
- Model cards and datasheets.
- Checklists: NeurIPS reproducibility checklist as a template for your own work.

**Practice tasks**

- Take an old project and produce a release that a stranger can run in under 15 minutes.
- Write the compute-and-data section for your capstone before you finish it.

---

### Module 12.3.3 — Debugging someone else's results

- Reproducing from a paper: matching splits, preprocessing, and evaluation code.
- Common gaps: undocumented preprocessing, undisclosed hyperparameters, different metric implementations.
- When the gap is legitimate (missing compute) and when it is not (different test set).
- Contacting authors with a precise, respectful discrepancy report.
- Documenting what reproduced and what did not, with tolerances.

$$
\text{reproduction gap}=\left\lvert \text{reported metric}-\text{reproduced metric}\right\rvert
\quad\text{relative to the reported value}
$$

**Practice tasks**

- Reproduce one small result and document every deviation from the paper.
- Write a discrepancy report that a reader could verify in ten minutes.

> **Module completion gate (12.3).** You have reproduced one published result and documented the gaps precisely.

---

## 12.4 — Designing Experiments and Ablations

**Objective.** Build experiments that isolate causes and can produce a clean negative result.

### Module 12.4.1 — Controls and confounds

- One variable at a time, or a factorial design if interactions matter.
- Matched compute, matched parameters, matched tuning effort.
- Randomisation and blocking where applicable.
- The confound that ruins most ML comparisons: unequal hyperparameter tuning.
- Sanity checks and negative controls.

$$
\text{factorial design: } 2^k\ \text{runs for }k\text{ binary factors},\quad
\text{main effect}_A=\bar y_{A=1}-\bar y_{A=0}
$$

**Practice tasks**

- Design a 2×2 factorial experiment for two design choices and analyse the main effects.
- Identify the confound in a published comparison and propose the corrected design.

---

### Module 12.4.2 — Ablations that mean something

- Ablate the claimed cause, not everything.
- Report the ablation table with the main result, not in an appendix.
- Variance across seeds is part of the result.
- Ablation budgets: how many runs can you afford, and how do you spend them.
- Control ablations: removing a component that should not matter.

**Practice tasks**

- Write an ablation plan for a model with four components, with a budget of 12 runs.
- Show one control ablation that confirms your result is not an artefact.

---

### Module 12.4.3 — Multiple comparisons and researcher degrees of freedom

- The garden of forking paths in ML: preprocessing, seeds, metrics, and stopping.
- Correcting for multiple comparisons, or pre-registering a single primary metric.
- Reporting all configurations you ran, not just the winner.
- Exploratory versus confirmatory analysis, labelled explicitly.
- Effect sizes, not just significance.

**Practice tasks**

- Simulate 40 configurations on pure noise and show the "best" improves over the baseline.
- Present a results table that includes the failed configurations.

> **Module completion gate (12.4).** Your experiments isolate the cause you claim, and your tables show what did not work.

---

## 12.5 — Statistical Rigour in ML Research

**Objective.** Apply Phase 1's statistics to the specific pathologies of ML experiments.

### Checklist

- Seed variance is often the largest term — measure it, do not assume it away.
- Intervals for every headline metric; bootstrap across both seeds and examples.
- Paired comparisons when runs share data or initialisation.
- Correct for the number of comparisons in a sweep.
- Report the number of runs, not just the mean.
- Distinguish statistical from practical significance at the deployment decision.
- Pre-specify the primary metric; treat the rest as secondary.
- Beware of comparing against an untuned baseline — it is the most common inflation.

### Practice tasks

- Re-analyse your Level 9 architecture comparison with paired tests and corrected comparisons.
- Show a published-style "3% improvement" dissolving under seed variance.

> **Module completion gate (12.5).** Every claim you make is backed by an interval, a run count, and an appropriate test.

---

## 12.6 — Scientific Writing and Figures

**Objective.** Communicate so that the reader can verify your claims quickly.

### Module 12.6.1 — Paper structure

- Title, abstract, introduction, related work, method, experiments, limitations, conclusion.
- The abstract as claim + evidence + implication, in 150 words.
- The introduction's job: problem, gap, contribution, result.
- Related work as positioning, not a list.
- The limitations section as a mark of confidence, not weakness.

**Practice tasks**

- Write the abstract for your capstone before running the final experiments, then revise it to match the evidence.
- Rewrite a weak related-work paragraph as positioning against two specific baselines.

---

### Module 12.6.2 — Figures and tables

- One message per figure; the caption carries the claim.
- Error bars and what they represent (std, std error, interval — say which).
- Tables: the main result first, ablations second, honesty throughout.
- Consistent colours, fonts, and units; readable at print size.
- Plot choices: no 3D pies, no dual axes without warning, no truncated y-axes.
- Every figure reproducible from a script.

$$
\text{error bar semantics: }\ \pm 1\,\mathrm{SD}\ \neq\ \pm 1\,\mathrm{SE}\ \neq\ 95\%\ \text{CI}
$$

**Practice tasks**

- Take one of your result tables and rebuild the figure so the claim is visible in five seconds.
- Label every error bar in your capstone with its exact meaning.

---

### Module 12.6.3 — Presenting and defending

- The 3-minute, 10-minute, and 45-minute versions of the same work.
- Anticipating the five questions every audience asks.
- Handling "why not the simpler thing?" with evidence.
- Defending limitations without undermining the contribution.
- Writing a rebuttal: concede, clarify, or refute, with data.

**Practice tasks**

- Present your work at three lengths and record the 3-minute version.
- Answer five hostile questions in writing, with numbers.

> **Module completion gate (12.6).** A reader can grasp your claim, verify it from your tables, and see its limits, in five minutes.

---

## 12.7 — Peer Review and Critique

**Objective.** Review others' work and your own with the same standard.

### Checklist

- Review structure: summary, strengths, weaknesses, questions, recommendation.
- Separating correctness issues from presentation issues.
- Checking the core claim against the evidence table.
- Asking for the experiment that would settle a disagreement.
- Reviewing your own work before submission, as an adversary.
- Response to review: which points to concede, which to contest with data.
- The reviewer's obligation: be specific, be verifiable, be kind.

### Practice tasks

- Write a full review of a recent paper in the standard format.
- Swap a draft with a peer and review each other's capstone reports.

> **Module completion gate (12.7).** You can write a review that the authors could act on, and you can defend your own work against one.

---

## 12.8 — Benchmarks, Leaderboards and Contamination

**Objective.** Understand how benchmarks fail, and design evaluations that do not.

### Checklist

- Benchmark saturation: when improvements are noise.
- Contamination: test data in pretraining corpora, and how to test for it.
- Leaderboard overfitting and the "test set in the wild" problem.
- Benchmark design: coverage, difficulty stratification, and adversarial cases.
- Private and rotating test sets; held-out evaluation services.
- Goodhart's law in ML evaluation.
- Building a domain benchmark that will not saturate in six months.

### Practice tasks

- Test one model for contamination using a canary-string or memorisation probe.
- Design a small domain benchmark with difficulty tiers and a contamination policy.

> **Module completion gate (12.8).** You can evaluate on public benchmarks without confusing leaderboard rank for capability.

---

## 12.9 — Research Engineering

**Objective.** Build the infrastructure that makes good science cheap.

### Checklist

- A single config-driven entry point for every experiment.
- A run registry: config, seed, commit, metrics, artefacts, compute.
- Sweep orchestration with failure recovery and pruning.
- Analysis scripts that read the registry and emit tables and figures.
- Immutable evaluation sets with an access log.
- Cost tracking per experiment and per project.
- The habit: no result exists until it is in the registry and reproducible by a script.

### Practice tasks

- Refactor one project into registry-driven experiments with generated tables.
- Rebuild a past result from the registry alone, without touching a notebook.

> **Module completion gate (12.9).** Any number you can quote can be regenerated by running one script against the registry.

---

## 12.10 — Ethics, Safety and Societal Impact

**Objective.** Reason about consequences, not just metrics.

### Checklist

- Dual use: the same model for detection and evasion.
- Harm taxonomies: misclassification harm, allocation harm, representational harm.
- Data provenance, consent, and licensing for research datasets.
- Reproducibility as an ethical obligation when results inform policy.
- Publication decisions: what not to release, and how to release it responsibly.
- Differential privacy for released statistics.
- Institutional review and human-subjects considerations.
- Writing an impact statement that says something real.

### Practice tasks

- Write an impact statement for your capstone that names two specific harms and one mitigation.
- Assess whether a dataset you use could be used to harm the people in it.

> **Module completion gate (12.10).** Your work includes a specific, non-generic discussion of harms and mitigations.

---

## 12.11 — Level 12 Capstone: Reproduction and Critique

### Project: `research-repro` — reproduce, ablate, critique, write

**Difficulty.** Advanced

**Purpose.** Produce the single strongest portfolio artefact for applied-science roles: evidence that you can read research, rebuild it, test its claims, and communicate the outcome honestly.

### A. Functional requirements

**Choose one paper**

- Code available, modest compute, one clear headline metric.
- Ideally a paper whose claim you find slightly suspicious.

**Part 1 — Reproduction**

- Rebuild the evaluation protocol exactly: splits, preprocessing, metric implementation.
- Match the reported headline number within a stated tolerance, or document precisely why not.
- Record every deviation in a deviations table.
- Report compute used, hardware, and wall-clock time.

**Part 2 — Ablation**

- Identify the paper's central claim and design the ablation that tests it.
- At least three ablations, each varying one component, across at least two seeds.
- Include one control ablation that should show no effect.
- Report mean and spread, not single runs.

**Part 3 — Critique**

- Evidence table: claim, evidence in the paper, evidence in your reproduction, verdict.
- Threats to validity: baseline tuning, contamination, seed variance, dataset limits.
- One proposed experiment that would settle the biggest open question.

**Part 4 — Report (4 pages)**

- Abstract with claim, method, result, and limitation.
- Method summary and deviations.
- Results table beside the paper's numbers.
- Ablation table with spread.
- Limitations and impact statement.
- Reproduction instructions sufficient for a stranger.

**Part 5 — Artefact**

- Repository with one-command reproduction, pinned environment, and sample data.
- The report rendered as a shareable PDF or Markdown.

### B. Suggested architecture

```text
research-repro/
├── paper.pdf                    # or a link and the notes
├── notes/
│   ├── pass1.md
│   ├── pass2.md
│   └── pass3.md
├── configs/
│   ├── paper_exact.yaml
│   └── ablations/*.yaml
├── src/
│   ├── data.py                  # exact splits and preprocessing
│   ├── model.py                 # paper architecture
│   ├── train.py
│   ├── evaluate.py              # paper's metric implementation
│   └── registry.py
├── reports/
│   ├── deviations.md
│   ├── results_table.md
│   ├── analytics.md
│   └── paper.pdf
└── tests/
```

### C. Acceptance targets

| Component | Target |
|---|---|
| Reproduction | Headline metric within 1 absolute point, or a documented, evidenced explanation |
| Deviations | Every difference from the paper recorded with its effect |
| Ablations | 3+ ablations, 2+ seeds each, spread reported |
| Control | One ablation that shows no effect, as expected |
| Critique | Claim–evidence table with an explicit verdict per claim |
| Writing | 4 pages, with an abstract that matches the evidence exactly |
| Artefact | One command reproduces the main table |

### D. Stretch goals

- Contact the authors with a precise discrepancy report and record the response.
- Extend the method to a second dataset and see whether the claim holds.
- Propose and run the experiment the paper left to future work.
- Submit the report to a workshop or a public writeup for real feedback.

### E. Acceptance criteria

| Area | Required evidence |
|---|---|
| **Reproduction rigour** | Tolerances stated, deviations documented, compute reported |
| **Experimental design** | Ablations isolate the claim; control included |
| **Statistical honesty** | Seeds, spread, and intervals throughout |
| **Critical thinking** | Claim–evidence table with verdicts, including disagreements |
| **Communication** | Report that a reviewer could verify in 20 minutes |
| **Engineering** | Artefact that runs from a clean clone |

> Level 12 is complete when a reader can verify your reproduction, disagree with your critique on the evidence, and still respect the work.

---

## Level 12 interview question bank

### A. Method and literature

- How do you read a paper in 30 minutes?
- How do you decide whether to trust a reported improvement?
- What is a red flag in an ablation table?
- How would you situate your own work against a recent paper?

### B. Reproducibility

- What is the difference between repeatability, reproducibility, and replicability?
- Why do so many ML results fail to reproduce?
- What must a release contain for a stranger to reproduce your result?
- You cannot reproduce a paper's headline number. What do you do?

### C. Experimental design

- How do you design an ablation that isolates a cause?
- Why is equal hyperparameter tuning essential to a fair comparison?
- What is a negative control in ML, and give an example.
- How do you avoid p-hacking when sweeping many configurations?
- How many seeds do you need, and how do you decide?

### D. Statistics in research

- How do you report uncertainty for a metric across seeds?
- What is the garden of forking paths, and how does it apply to preprocessing choices?
- Why is the best-of-40 configurations optimistically biased?
- How do you distinguish a real effect from seed noise?

### E. Writing and review

- What belongs in an abstract, and what does not?
- How do you write a limitations section that strengthens rather than weakens a paper?
- How do you respond to a reviewer who asks for an experiment you cannot run?
- What makes a figure trustworthy?

### Interview readiness standard

1. State the claim and the evidence supporting it.
2. State the design that isolates the cause.
3. Give the statistical treatment: runs, intervals, corrections.
4. Name the threat to validity you are most worried about.
5. Say what experiment would settle it.

---

## Level 12 final assessment

### Knowledge

- I can write a falsifiable hypothesis and a pre-registered plan.
- I can read a paper at three depths and map its literature.
- I can name the levels of reproducibility and the one I have achieved.
- I can design controlled experiments and honest ablations.
- I can apply statistical rigour to ML-specific pathologies.
- I can write a report whose claims match its evidence.
- I can review and be reviewed.
- I understand benchmark contamination and Goodhart's law in evaluation.
- I can write a specific impact statement.

### Practical skills

- I have reproduced a published result or documented exactly why not.
- I have run an ablation with seeds and reported spread.
- I have written a 4-page technical report with a claim–evidence table.
- I have produced a release a stranger could run.
- I have reviewed a peer's work in a standard format.

### Project

- `research-repro` passes every acceptance target.
- The deviations table is complete and honest.
- The abstract matches the evidence exactly.

> **Level 12 completion rule.** If someone else can verify your claim from your artefact, and your critique survives their disagreement, you are ready for Phase 5.

---

# PHASE 4 CAPSTONE — RESEARCH SPRINT

> **Purpose.** Run a complete mini research project end-to-end: a question, a protocol, an artefact, a result, a critique, and a paper-style writeup. This is the artefact that most directly predicts success in an applied-science interview.

**Difficulty.** Advanced
**Suggested duration.** 2–3 weeks
**Depends on.** Levels 10, 11, and 12.

## A. The brief

Answer **one question** that you genuinely do not know the answer to, in a domain where you can obtain data and train small models.

Good sprint questions look like:

- Does augmentation strength matter more than batch size for SSL on small datasets?
- Do deep ensembles beat conformal prediction for triage in a cost-weighted setting?
- Does a global forecaster beat per-series models when series are short and noisy?
- Does the gain from a new architecture survive equal-FLOP tuning on my domain?
- Does importance weighting help under a shift I can actually simulate?

Bad sprint questions are broad ("how do transformers work?"), unmeasurable, or already settled by one obvious baseline.

## B. Required deliverables

| # | Deliverable | What "done" looks like |
|---|---|---|
| 1 | Research question | One sentence, falsifiable, with the baseline stated |
| 2 | Pre-registered protocol | Committed before experiments: metric, data, analysis, stopping rule |
| 3 | Related work note | 5–10 papers mapped, with the gap your question addresses |
| 4 | Experimental harness | Config-driven, registry-logged, deterministic |
| 5 | Main experiment | At least 3 configurations × 3 seeds, intervals reported |
| 6 | Ablation | The claimed cause isolated; one control that shows no effect |
| 7 | Negative or null result handling | What you would report if the effect vanished |
| 8 | Artefact | One-command reproduction, pinned environment |
| 9 | 4-page paper | Abstract, method, results, limitations, impact statement |
| 10 | Review | A written review of your own work, as an adversary |

## C. Suggested architecture

```text
research-sprint/
├── PREREGISTRATION.md          # committed before any experiment
├── notes/
│   ├── related_work.md
│   └── daily_log.md
├── configs/
│   ├── main/*.yaml
│   └── ablations/*.yaml
├── src/
│   ├── data.py
│   ├── models.py
│   ├── train.py
│   ├── evaluate.py
│   ├── registry.py             # run metadata, metrics, compute
│   └── analyse.py              # tables and figures from registry
├── reports/
│   ├── paper.md / paper.pdf
│   ├── results_table.md
│   ├── ablations.md
│   └── self_review.md
└── tests/
```

## D. Grading rubric

| Dimension | 1 — Not yet | 3 — Competent | 5 — Strong |
|---|---|---|---|
| **Question** | Vague or unmeasurable | Falsifiable with a baseline | Sharp, decision-relevant, and genuinely open |
| **Protocol** | Written after results | Pre-registered | Pre-registered with a stopping rule and a null-result plan |
| **Execution** | One run per config | 3 seeds, intervals | Matched budgets, paired tests, compute reported |
| **Ablation** | None | Isolates the claimed cause | Includes a control and reports the spread |
| **Honesty** | Only successes reported | Failures mentioned | Null results analysed, deviations documented |
| **Communication** | Numbers only | Clear report | A paper a reviewer could verify in 20 minutes |
| **Artefact** | Notebook | Repo with README | One-command reproduction from a clean clone |

**Pass mark.** At least 3 in every dimension, with **Protocol**, **Execution**, and **Honesty** at 4 or above.

## E. Defence questions

- What is your hypothesis, and what result would have falsified it?
- Which single run in your results are you least confident about, and why?
- What did you change after seeing the first results, and how do you know it did not bias the conclusion?
- Where is your evidence weakest — the data, the metric, or the seeds?
- If your effect disappeared at 10 seeds, what would you do?
- What is the practical implication if you are right?
- What would you tell a team that wants to deploy this tomorrow?

---

# PHASE 4 FINAL ASSESSMENT

Complete this before starting Phase 5 (Specialization).

## Knowledge checklist

**Representations (L10)**

- I can define and evaluate a representation with frozen probes.
- I can implement InfoNCE and explain temperature and negatives.
- I can explain SimCLR, MoCo, BYOL, Barlow Twins, and their collapse mechanisms.
- I can explain masked and generative pretraining objectives.
- I can use multimodal encoders for zero-shot transfer.
- I can detect collapse, shortcuts, and augmentation leakage.
- I can state the costs and limits of SSL honestly.

**Advanced methods (L11)**

- I can separate aleatoric and epistemic uncertainty and choose a method.
- I can fit a GP and explain its cost.
- I can forecast with correct temporal validation and calibrated intervals.
- I can state an estimand, identification assumption, and estimator for causal questions.
- I can design and evaluate a bandit or recommender.
- I can name and mitigate the shifts my systems face.
- I can present multi-objective trade-offs as frontiers.

**Research practice (L12)**

- I can write a falsifiable hypothesis and pre-registered plan.
- I can read a paper at three depths and map a literature.
- I can name reproducibility levels and the one I have achieved.
- I can design controlled ablations with controls.
- I can apply statistical rigour to ML pathologies.
- I can write a report whose claims match its evidence.
- I can review and be reviewed.
- I understand contamination, saturation, and Goodhart's law in evaluation.

## Practical checklist

- [ ] Level 10 capstone (`repr-lab`) passes its acceptance targets.
- [ ] Level 11 capstone (`adv-ml-lab`) has two validated methods and one negative result.
- [ ] Level 12 capstone (`research-repro`) reproduced a published result with deviations documented.
- [ ] Phase capstone scores at least 3 in every rubric dimension.
- [ ] I have written a pre-registration and honoured it.
- [ ] I have published an artefact a stranger can run.
- [ ] I have written a review of someone else's work in a standard format.

## The self-honesty test

Answer these out loud, without notes. If any answer takes over 60 seconds, revisit that level.

1. What makes the representation you trained better than a random encoder — and how did you measure it?
2. What assumption does your causal or uncertainty method require, and how did you test it?
3. Which result in your research sprint would not survive a regime change in seeds or data?
4. What is your protocol's biggest threat to validity?
5. What did you pre-register, and what did you change afterwards?
6. Where is the strongest argument against your conclusion?
7. What would it take for someone else to reproduce your work in a day?
8. What would you do differently with 10× the compute?

> **Phase 4 is complete** when all four capstones pass and you can answer the eight questions above with evidence, tolerances, and honest caveats.

---

# APPENDIX

## A. Formula sheet for Phase 4

| Topic | Formula |
|---|---|
| Cosine similarity | $\mathrm{sim}(u,v)=\dfrac{u^\top v}{\lVert u\rVert\lVert v\rVert}$ |
| InfoNCE | $-\log\dfrac{\exp(\mathrm{sim}(z_i,z_i^{+})/\tau)}{\sum_j\exp(\mathrm{sim}(z_i,z_j)/\tau)}$ |
| NT-Xent (symmetric) | $-\frac{1}{2N}\sum_i\left[\ell(i,i^{+})+\ell(i^{+},i)\right]$ |
| MoCo momentum | $\theta_k\leftarrow m\theta_k+(1-m)\theta_q$ |
| BYOL loss | $\lVert q_\theta(z_\theta)-\mathrm{sg}(z_\xi)\rVert_2^2$ normalised |
| Barlow Twins | $\sum_i(1-\mathcal{C}_{ii})^2+\lambda\sum_{i\neq j}\mathcal{C}_{ij}^2$ |
| VICReg | $\lambda\,\mathrm{inv}+\mu\,\mathrm{var}+\nu\,\mathrm{cov}$ |
| MLM loss | $-\sum_{i\in\mathcal{M}}\log p(x_i\mid x_{\setminus\mathcal{M}})$ |
| CLIP logits | $\langle f_I(x),f_T(t)\rangle/\tau$ |
| Triplet loss | $\max(0,\lVert f(a)-f(p)\rVert^2-\lVert f(a)-f(n)\rVert^2+\alpha)$ |
| Effective rank | $\exp\left(-\sum_i\bar\sigma_i\log\bar\sigma_i\right)$ |
| Total variance of prediction | $\mathbb{E}_\theta[\operatorname{Var}(y\mid x,\theta)]+\operatorname{Var}_\theta[\mathbb{E}(y\mid x,\theta)]$ |
| Ensemble mean/variance | $\hat\mu=\frac1M\sum_m f_m$, $\hat\sigma^2=\frac1M\sum_m(f_m-\hat\mu)^2$ |
| GP posterior mean | $\mu_\star=k_\star^\top\left(K+\sigma^2I\right)^{-1}y$ |
| MASE | $\dfrac{\frac1h\sum_t\lvert y_t-\hat y_t\rvert}{\frac{1}{T-m}\sum_t\lvert y_t-y_{t-m}\rvert}$ |
| CATE | $\tau(x)=\mathbb{E}[Y(1)-Y(0)\mid X=x]$ |
| IPW (ATE) | $\frac1n\sum_i\left[\frac{T_iY_i}{e(X_i)}-\frac{(1-T_i)Y_i}{1-e(X_i)}\right]$ |
| UCB | $a_t=\arg\max_a\left[\hat\mu_a+c\sqrt{\frac{\ln t}{n_a}}\right]$ |
| BPR loss | $-\sum\log\sigma(\hat r_{ui}-\hat r_{uj})$ |
| Importance weight | $w(x)=p_{\text{target}}(x)/p_{\text{source}}(x)$ |
| PSI (drift) | $\sum_i(p^{\text{new}}_i-p^{\text{old}}_i)\ln\frac{p^{\text{new}}_i}{p^{\text{old}}_i}$ |
| Lagrangian constraint | $\min_\theta\mathcal{L}(\theta)$ s.t. $g_i(\theta)\le c_i$ |
| Reproduction gap | $\lvert \text{reported}-\text{reproduced}\rvert$ / reported |

## B. Fourteen-week schedule

| Weeks | Focus | Milestone |
|---|---|---|
| 1 | L10: representations, probe harness, k-NN evaluation | Frozen-probe harness working |
| 2 | L10: contrastive learning (InfoNCE, SimCLR) | SimCLR run with ablations |
| 3 | L10: non-contrastive (BYOL/Barlow), collapse diagnostics | Two objectives compared |
| 4 | L10: multimodal, metric learning, critiques **+ L10 capstone** | `repr-lab` complete |
| 5 | L11: uncertainty (ensembles, MC dropout, conformal) | Coverage study done |
| 6 | L11: GPs and forecasting with temporal validation | Calibrated forecast intervals |
| 7 | L11: causal ML (identification and estimators) | Effect estimate vs simulated truth |
| 8 | L11: bandits, recommenders, off-policy evaluation | Regret and OPE study |
| 9 | L11: shift, robustness, OOD, multi-objective | Shift simulation and mitigation |
| 10 | L11 capstone **+ L12: research questions and reading** | `adv-ml-lab` complete; 3 papers mapped |
| 11 | L12: reproducibility, artefacts, experiment design | Reproduction in progress |
| 12 | L12: statistics, writing, review | Deviations table and draft report |
| 13 | L12 capstone **+ phase capstone framing** | `research-repro` report complete |
| 14 | Research sprint execution and writeup | Paper draft and self-review |

> This is the heaviest phase in the roadmap. If you must compress, compress the breadth in L11 — do not compress L12. Research method is what distinguishes an applied scientist from a strong engineer.

## C. Recommended resources

### Papers to read at this level

| Area | Paper |
|---|---|
| SSL — contrastive | "SimCLR", "MoCo", "InfoNCE / CPC" |
| SSL — non-contrastive | "BYOL", "SimSiam", "Barlow Twins", "VICReg", "DINO" |
| SSL — masked | "BERT", "Masked Autoencoders", "MAE follow-ups" |
| Multimodal | "CLIP", "ALIGN", "SigLIP" |
| Uncertainty | "Simple and Scalable Predictive Uncertainty Estimation using Deep Ensembles", "Dropout as a Bayesian Approximation", "Conformal Prediction" surveys |
| Causality | "Double/Debiased Machine Learning", "Causal Forests", "Metalearners for CATE" |
| Decisions | "Thompson Sampling", "Off-Policy Evaluation" surveys |
| Shift | "When does label shift matter", "Domain Generalisation" surveys |
| Method critique | "A Metric Learning Reality Check", "Deep Learning has a huge carbon footprint", "Leakage and the Reproducibility Crisis in ML" |

### Books and references

| Resource | Use it for |
|---|---|
| *Causality* — Pearl | DAGs and identification |
| *Elements of Causal Inference* — Peters et al. | practical causal ML |
| *Gaussian Processes for Machine Learning* — Rasmussen & Williams | GPs in depth |
| *Forecasting: Principles and Practice* — Hyndman & Athanasopoulos | time series |
| *Designing Machine Learning Systems* — Huyen | production framing for advanced methods |
| *The Craft of Research* — Booth et al. | research questions and arguments |
| *Writing Science* — Schimel | technical writing structure |
| NeurIPS/ICML author guides and checklists | reporting standards |

### Practice

- **Papers with Code** — pick one paper per month and reproduce one table.
- **OpenReview** — read reviews before the papers; learn what reviewers attack.
- **ReScience / ML Reproducibility Challenge** — structured reproduction practice.
- **Kaggle write-ups** — good examples of claim-plus-evidence communication.
- **Your own failures** — keep a log; it is the richest research material you have.

## D. The ten most common ways to fail this phase

| Failure | Symptom | Fix |
|---|---|---|
| Skimming ten methods | Cannot answer a follow-up question | Implement two deeply instead |
| Chasing SSL numbers | Probe improves, nothing transfers | Fix the probe protocol and inspect neighbours |
| Ignoring assumptions | Causal or uncertainty results are invalid | Write the assumption list before coding |
| Single-seed ablations | Effects vanish on re-run | 3 seeds minimum, report spread |
| Unmatched compute | "New method wins" is unfair | Match FLOPs or parameter budget |
| Reproducing nothing | Reports a result you cannot rebuild | Registry-driven experiments from day one |
| Report after results | HARKing and unreportable analyses | Pre-register the plan and honour it |
| Hiding failures | Report reads better than the work was | Include null results and deviations |
| Benchmark worship | Optimising a saturated leaderboard | Build a domain eval that matters |
| No impact statement | Ethics bolted on at the end | Write harms and mitigations early |

## E. Progress tracker

| Level | Capstone | Repo link | Protocol pre-registered | Seeds ≥ 3 | Compute reported | Defence rehearsed |
|---|---|---|---|---|---|---|
| L10 | `repr-lab` | | ☐ | ☐ | ☐ | ☐ |
| L11 | `adv-ml-lab` | | ☐ | ☐ | ☐ | ☐ |
| L12 | `research-repro` | | ☐ | ☐ | ☐ | ☐ |
| Phase | Research sprint | | ☐ | ☐ | ☐ | ☐ |

---

## What comes next

**Phase 5 — Specialization · Levels 13–14**

| Level | Title | What it adds |
|---|---|---|
| **L13** | NLP, Computer Vision, and Foundation Models | The applied frontier: language, vision, multimodality, and the systems around them |
| **L14** | Applied ML Research Specialization | A focused research contribution in your chosen area |

Phase 5 is where you stop being general and start being known for something. Everything in Phase 4 is the toolkit you will use to earn that.

*Phase 4 of 6 · Levels 10–12 of 18 · Advanced ML and Research*
