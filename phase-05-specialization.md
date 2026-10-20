# PHASE 5 — SPECIALIZATION

**ML Engineer / Applied Scientist Roadmap · Levels 13–14 of 18**

> **Phase goal.** Stop being generally competent and start being specifically valuable. Level 13 gives you working command of the applied frontier — language, vision, multimodality, and foundation models as *systems*. Level 14 turns that command into a focused contribution you can defend, publish, and be hired for.

---

## Phase dashboard

| Item | Details |
|---|---|
| **Phase** | 5 — Specialization |
| **Levels** | L13 · L14 |
| **Difficulty** | Advanced → Expert |
| **Suggested duration** | 16–22 weeks at 2–3 hours/day |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Core tools** | Hugging Face `transformers`, `datasets`, `peft`, `trl`, `accelerate`, `vLLM`, `timm`, `ultralytics`, `segment-anything`, `diffusers`, `faiss`, Weights & Biases, `lm-evaluation-harness` |
| **Capstone projects** | 2 level capstones + 1 phase thesis project |
| **Final outcome** | Ship an applied NLP system and an applied vision/multimodal system with measured quality, latency and cost — then produce one focused research contribution in a specialisation you can defend. |

**Prerequisites.** Phase 4 complete. You can pretrain and probe representations (L10), apply advanced methods with their assumptions stated (L11), and run research-grade experiments with pre-registration and honest reporting (L12).

---

## How this phase is structured

| Block | What it contains |
|---|---|
| **Dashboard** | Level, difficulty, duration, tools, project, outcome |
| **Numbered sections** (`13.1`, `13.2`, …) | One theme each |
| **Modules** (`13.1.1`, `13.1.2`, …) | The actual study checklist |
| **Practice tasks** | Small exercises that force retrieval, not re-reading |
| **Module completion gate** | The proof that the section is done |
| **Mini-project** | A small build inside the level |
| **Capstone** | The level's main artefact, with acceptance criteria |
| **Interview bank** | Questions you should be able to answer after the level |
| **Level assessment** | A checklist before you move on |

> **The rule of this phase:** breadth is what this level gives you; depth is what the next level requires you to choose. Do not confuse having used a foundation model with being able to build, evaluate, and afford one.

---

## Contents

| Level | Title | Sections | Duration | Capstone |
|---|---|---|---|---|
| [L13](#level-13--nlp-computer-vision-and-foundation-models) | NLP, Computer Vision, and Foundation Models | 13.1 – 13.11 | 9–12 weeks | `foundation-suite` — one NLP system + one vision/VLM system, both measured |
| [L14](#level-14--applied-ml-research-specialization) | Applied ML Research Specialization | 14.1 – 14.11 | 7–10 weeks | `specialist-thesis` — a focused contribution, published |
| [Phase capstone](#phase-5-capstone--specialization-thesis) | Integration project | — | 3–4 weeks | Public mini-thesis with artefact and eval suite |

---

# LEVEL 13 — NLP, COMPUTER VISION, AND FOUNDATION MODELS

> **Goal.** Build real systems on top of foundation models: fine-tune for a domain, retrieve, ground, serve within a latency and cost budget, and evaluate against a domain eval set you built yourself.

## Level dashboard

| Item | Details |
|---|---|
| **Level** | 13 — NLP, Computer Vision, and Foundation Models |
| **Difficulty** | Advanced |
| **Suggested duration** | 9–12 weeks |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Core tools** | `transformers`, `peft`, `trl`, `datasets`, `vLLM`, `timm`, `ultralytics`, `diffusers`, `faiss`, `lm-evaluation-harness` |
| **Main project** | **`foundation-suite`** — an applied NLP assistant and an applied vision/VLM pipeline, both with eval suites and cost models |
| **Final outcome** | Build, evaluate, and serve foundation-model systems with measured quality, latency, and cost — and know when not to use a foundation model. |

**Prerequisites.** Levels 7–12. Especially: transformer implementation (9.4), fine-tuning mechanics (L8), evaluation protocol (L6, L12), and research honesty (L12).

---

## 13.1 — The Applied NLP Landscape

**Objective.** Match the task to the cheapest approach that works, before reaching for a large model.

### Module 13.1.1 — Task taxonomy and cheap baselines

- Classification, tagging, extraction, retrieval, ranking, summarisation, generation, and dialogue.
- The baseline ladder: rules → TF-IDF + linear → fine-tuned encoder → prompted LLM → fine-tuned LLM.
- Cost per 1,000 requests at each rung, and quality at each rung.
- When a 10-minute baseline is the correct engineering decision.
- Why most "LLM use cases" are actually classification or extraction.

$$
\text{cost per 1,000} = 1{,}000\times\left(n_{\text{in}}p_{\text{in}}+n_{\text{out}}p_{\text{out}}\right)
$$

**Practice tasks**

- Take three proposed "LLM features" and re-express them as classification or extraction tasks.
- Build the full baseline ladder for one task and report quality and cost per rung.

---

### Module 13.1.2 — Text preprocessing that still matters

- Unicode normalisation, whitespace, casing, and language identification.
- Handling code, numbers, identifiers, and mixed scripts (relevant for Indic languages).
- Deduplication and near-duplicate detection at corpus level.
- PII detection and redaction before sending text to any API.
- Chunking for retrieval versus truncation for classification.

**Practice tasks**

- Build a preprocessing pipeline that handles English, Hindi, and code in the same corpus.
- Show a case where aggressive preprocessing destroys signal.

---

### Module 13.1.3 — Domain data curation

- Labelling protocols and inter-annotator agreement.
- Weak supervision, active learning, and synthetic data generation.
- Distribution coverage: intents, edge cases, and adversarial inputs.
- Train/dev/test splits with group and temporal constraints.
- Contamination checks against any public benchmark you compare to.

**Practice tasks**

- Write a labelling guideline for a 3-class extraction task and measure agreement with a second annotator.
- Build a 200-example domain eval set and document its coverage and gaps.

---

> **Module completion gate (13.1).** You can write the baseline ladder with costs and pick the rung you will actually start from.

---

## 13.2 — Tokenisation and Encoder Models

**Objective.** Handle text at the token level correctly, and fine-tune encoders well.

### Module 13.2.1 — Subword tokenisers in practice

- BPE, WordPiece, SentencePiece and Unigram; training and vocabulary size.
- Token fertility across languages; why Hindi costs more tokens than English.
- Truncation strategy, stride, and long-document handling.
- Special tokens, chat templates, and instruction formatting.
- Token-count estimation before you pay for anything.

$$
\text{fertility}=\frac{\text{tokens}}{\text{words}},\qquad
\text{cost}\propto\text{tokens}\ \Rightarrow\ \text{language matters financially}
$$

**Practice tasks**

- Measure fertility for the same content in three languages and compute the cost ratio.
- Build a long-document classification pipeline with stride and aggregation.

---

### Module 13.2.2 — Fine-tuning encoders

- Task heads: classification, token classification, span extraction, sentence-pair.
- Learning-rate ranges and layer-wise decay for fine-tuning.
- Freezing strategies and when a linear probe is enough.
- Imbalanced labels, thresholds, and calibration (reuse L5–L6).
- Distillation to a smaller encoder for production.

$$
\mathcal{L}_{\text{cls}}=-\log\frac{e^{z_y}}{\sum_j e^{z_j}},\qquad
\mathcal{L}_{\text{span}}=-\log\frac{e^{s_{\text{start}}}}{\sum_i e^{s_i}}-\log\frac{e^{e_{\text{end}}}}{\sum_i e^{e_i}}
$$

**Practice tasks**

- Fine-tune an encoder for classification and compare against TF-IDF + logistic regression with intervals.
- Distil the best encoder to half the size and report the quality/latency trade-off.

---

### Module 13.2.3 — Embeddings and semantic search

- Bi-encoders versus cross-encoders: cost and quality.
- Sentence embedding models and their training objectives.
- Normalisation, similarity choice, and dimension reduction.
- Multi-lingual and cross-lingual retrieval for Indic languages.
- Evaluating retrieval with recall@k and nDCG (reuse L6.5).

**Practice tasks**

- Build a retrieval index over 50k documents and measure recall@10 against BM25.
- Show where dense retrieval loses to BM25 and how hybrid fixes it.

> **Module completion gate (13.2).** You can fine-tune, evaluate, and serve an encoder-based system, and explain its cost per query.

---

## 13.3 — Large Language Models in Practice

**Objective.** Use LLMs as reliable components, not as magic.

### Module 13.3.1 — Prompting that holds up in production

- System prompts, instruction hierarchies, and role definitions.
- Structured output: JSON schema, constrained decoding, and validation.
- Few-shot example selection and ordering effects.
- Chain-of-thought and its cost; when reasoning tokens help and when they hurt.
- Prompt versions as artifacts with their own eval results.

$$
\text{reliability}=\frac{\#\text{outputs passing schema and business validation}}{\#\text{requests}}
$$

**Practice tasks**

- Build three prompt versions for one extraction task and evaluate each on 100 cases.
- Measure how often free-form output fails validation and fix it with schema constraints.

---

### Module 13.3.2 — Structured extraction and tool use

- Function/tool calling: describing tools, validating arguments, handling failures.
- Multi-step tool workflows and idempotency.
- Retry, repair, and rejection strategies.
- Determinism: temperature, seeds, and why exact reproducibility is impossible.
- Cost control: caching, batching, and smaller models for easy cases.

**Practice tasks**

- Build an extraction pipeline with tool calling and a validation gate; report field-level accuracy.
- Add a router that sends simple cases to a small model and measure the cost saving.

---

### Module 13.3.3 — RAG done properly

- Chunking, metadata, and hybrid retrieval (reuse L10.8 and 13.2.3).
- Query rewriting, decomposition, and multi-query retrieval.
- Reranking and its latency budget.
- Citations, grounding, and the refusal path.
- Evaluating retrieval and generation separately.

$$
\text{answer quality}=f\left(\text{retrieval recall},\ \text{context precision},\ \text{generation fidelity}\right)
$$

**Practice tasks**

- Build a 30-question golden set with gold passages and answers.
- Show a case where better retrieval fixes an answer the model got wrong, and one where it does not.

---

> **Module completion gate (13.3).** You have an LLM pipeline with schema validation, a router, and a RAG layer — each measured separately.

---

## 13.4 — Adaptation: SFT, LoRA, and Preference Tuning

**Objective.** Change model behaviour deliberately, with an eval that decides whether it worked.

### Module 13.4.1 — Supervised fine-tuning

- Instruction datasets, chat templates, and loss masking.
- Packing, sequence length, and effective batch size.
- Overfitting on small datasets and catastrophic forgetting.
- Evaluation: task metrics plus regressions on general capability.
- When SFT beats prompting, and when it does not.

$$
\mathcal{L}_{\text{SFT}}=-\sum_{t\in\text{completion}}\log p_\theta(y_t\mid y_{<t},x)
$$

**Practice tasks**

- Fine-tune a small model on 2,000 examples and compare with a strong prompted baseline.
- Show a capability regression after SFT by evaluating on a second, unrelated task.

---

### Module 13.4.2 — Parameter-efficient fine-tuning

- LoRA: rank, alpha, target modules, and merging.
- QLoRA: quantised base plus adapters, and the memory arithmetic.
- Adapters versus prefix tuning versus full fine-tuning.
- Serving many adapters from one base model.
- Memory and throughput measurement.

$$
W'=W+\frac{\alpha}{r}BA,\qquad
\text{adapter params}=r\left(d_{\text{in}}+d_{\text{out}}\right)
$$

**Practice tasks**

- Fine-tune with LoRA at three ranks and report quality, memory, and time.
- Merge an adapter and verify output parity with the unmerged model.

---

### Module 13.4.3 — Preference optimisation

- Preference data collection: pairwise comparisons and annotation guidelines.
- Reward modelling and PPO at a conceptual level.
- DPO and its practical advantages.
- Sycophancy, over-refusal, and reward hacking.
- Evaluating alignment changes with human and model judges.

$$
\mathcal{L}_{\text{DPO}}=-\log\sigma\!\left(\beta\log\frac{\pi_\theta(y_w\mid x)}{\pi_{\text{ref}}(y_w\mid x)}-\beta\log\frac{\pi_\theta(y_l\mid x)}{\pi_{\text{ref}}(y_l\mid x)}\right)
$$

**Practice tasks**

- Build 500 preference pairs and run DPO on a small model.
- Measure win rate against the SFT baseline with a judge calibrated on human labels.

---

> **Module completion gate (13.4).** You can justify each adaptation step with an eval delta, a cost, and a stated failure mode.

---

## 13.5 — LLM Evaluation and Judges

**Objective.** Decide whether an LLM feature is good enough, using evidence rather than impressions.

### Checklist

- Task-specific evals: exact match, field-level F1, pass@k, rubric scores.
- LLM-as-judge: prompts, position bias, verbosity bias, and self-preference.
- Judge calibration against human labels: agreement rate and confusion.
- Human evaluation protocols: sampling, blinding, and inter-annotator agreement.
- Regression suites and canary prompts per prompt version.
- Cost and latency as first-class metrics.
- Public benchmark contamination and why your own eval matters more.
- Reporting: every claim with an interval and an $n$.

$$
\kappa=\frac{p_o-p_e}{1-p_e}
\quad\text{(Cohen's }\kappa\text{ for judge–human agreement)}
$$

### Practice tasks

- Build a 150-case eval set with a rubric and two-judge agreement measurement.
- Show a judge that agrees with humans 85% of the time and identify where it fails.
- Add a regression suite that blocks a prompt change that breaks five known cases.

> **Module completion gate (13.5).** You can defend "this LLM feature is ready" with an eval suite, judge calibration, and cost numbers.

---

## 13.6 — Context, Memory and Agents

**Objective.** Build systems that hold state and use tools without becoming unpredictable.

### Checklist

- Context budgets: instructions, history, retrieved documents, tool results, output.
- Summarisation, truncation, and retrieval of history.
- Memory designs: episodic, semantic, and scratchpad.
- Tool schemas, permissions, and sandboxing.
- Planning loops, step limits, and cost ceilings.
- Failure recovery: retries, fallbacks, and human handoff.
- Observability: trace every step, tool call, token count, and error.
- Evaluating agents on task success, not on verbosity.

$$
\text{context} = \text{system} + \text{history} + \text{retrieved} + \text{tools} + \text{output}
\le \text{window}
$$

### Practice tasks

- Build a tool-using agent with a step and cost ceiling; measure task success on 30 tasks.
- Instrument traces and diagnose three failures from logs alone.

> **Module completion gate (13.6).** Your agent has bounded cost, a defined failure path, and is evaluated on task success.

---

## 13.7 — Computer Vision Systems

**Objective.** Build vision systems for classification, detection, segmentation, and video — and choose the right one.

### Module 13.7.1 — Classification and fine-grained recognition

- Transfer learning recipes that actually work (reuse L5.3, L9.2).
- Long-tail classes, label noise, and open-set recognition.
- Domain shift: lighting, camera, and geography.
- Evaluation beyond top-1: per-class, worst-group, and calibration.
- Deployment constraints: input resolution drives cost quadratically.

**Practice tasks**

- Fine-tune a backbone on a 20-class problem and report per-class intervals.
- Show accuracy dropping under a simulated camera/lighting shift and mitigate it.

---

### Module 13.7.2 — Detection and segmentation

- Detector families: two-stage, one-stage, anchor-free, and DETR-style.
- Anchors, IoU, NMS, and their failure modes at crowded scenes.
- Segmentation: semantic, instance, panoptic; U-Net and Mask R-CNN.
- Metrics: mAP at IoU thresholds, mask mAP, boundary quality.
- Annotation cost and the trade-off between boxes and masks.

$$
\mathrm{mAP}=\frac{1}{C}\sum_{c=1}^{C}\int_0^1 p_c(r)\,dr
\quad\text{(area under the precision–recall curve per class)}
$$

**Practice tasks**

- Train a detector on a small dataset and analyse false positives by size and class.
- Compare box supervision against mask supervision for a downstream task.

---

### Module 13.7.3 — Video and temporal vision

- Frame sampling strategies and temporal aggregation.
- Action recognition, temporal localisation, and tracking.
- Cost: video is expensive; sample deliberately.
- Evaluation with temporal IoU and per-clip metrics.
- When a single keyframe is enough.

**Practice tasks**

- Build a clip classifier with uniform sampling and compare with adaptive sampling at equal cost.
- Measure the accuracy/cost curve as frames per clip increase.

---

> **Module completion gate (13.7).** You can pick a vision task formulation and defend its annotation and inference cost.

---

## 13.8 — Vision Foundation Models and Multimodality

**Objective.** Use pretrained vision and vision–language models as components, with their failure modes understood.

### Module 13.8.1 — Vision backbones and open-vocabulary models

- CLIP/SigLIP embeddings and their zero-shot behaviour.
- Open-vocabulary detection and segmentation (GroundingDINO-style, SAM-family).
- SAM for promptable segmentation and its limits on fine structures.
- Depth and geometry models at a practical level.
- Choosing between a specialist model and a foundation model.

$$
\text{zero-shot}: \hat y=\arg\max_c\ \langle f_I(x), f_T(\text{prompt}_c)\rangle
$$

**Practice tasks**

- Compare zero-shot CLIP against a fine-tuned specialist on your domain; report the gap.
- Use SAM to generate masks and measure quality on a domain-specific structure.

---

### Module 13.8.2 — Vision–language models in applications

- Document understanding: OCR plus layout plus reasoning.
- Table extraction and validation rules.
- Visual question answering and grounding.
- Hallucination in VLMs: counting, spatial relations, and small text.
- Resolution, tiling, and crop strategies for high-resolution inputs.
- Evaluation: field accuracy, citation of regions, and refusal behaviour.

**Practice tasks**

- Build a document extraction pipeline and compare OCR+LLM against a VLM end-to-end.
- Measure VLM accuracy as image resolution and table complexity increase.

---

### Module 13.8.3 — Cross-modal retrieval and search

- Joint embedding indexes over images and text.
- Hybrid search with metadata filters and permissions.
- Evaluation with recall@k and human relevance judgments.
- Failure modes: text-heavy images, fine-grained attributes, and negation.

**Practice tasks**

- Build an image search over 10k images with text queries and measure recall@10.
- Inspect 20 failures and classify them into three recurring causes.

---

### Module 13.8.4 — Speech and audio components

- ASR pipelines: Whisper-style models, word timestamps, and diarisation basics.
- Audio preprocessing: sample rate, channels, chunking, and silence trimming.
- Speech synthesis (TTS) and voice cloning: quality, latency, and consent.
- Audio classification and tagging with pretrained audio encoders.
- Indic and multilingual speech: code-switching, accent variation, and script mismatch.
- Evaluation: WER/CER for ASR, MOS-style preference studies for TTS, and per-accent slices.
- Cost: audio-seconds per dollar, streaming latency, and on-device feasibility.

$$
\mathrm{WER}=\frac{S+D+I}{N},\qquad
\mathrm{CER}=\frac{S+D+I}{\#\text{characters}}
\quad(S,D,I=\text{substitutions, deletions, insertions})
$$

**Practice tasks**

- Transcribe a 30-minute domain audio sample and report WER by accent and by noise level.
- Measure the latency budget of a streaming ASR-plus-LLM pipeline and identify the dominant stage.

> **Module completion gate (13.8).** You can choose between specialist and foundation models across vision, language, and audio with measured evidence, and name where each fails.

---

## 13.9 — Generative Media in Production

**Objective.** Ship image and audio generation with control, evaluation, and cost discipline.

### Checklist

- Diffusion and distilled samplers: steps versus quality (reuse L9.5).
- Conditioning: ControlNet-style structure, reference images, inpainting.
- LoRA for style and subject personalisation.
- Evaluation: human preference studies, CLIP score, FID, and their limits.
- Safety: content filters, provenance, watermarking, and usage policy.
- Cost per image/audio second and latency budgets.
- Failure taxonomy: hands, text rendering, composition, and style drift.

$$
\text{quality–cost frontier}:\ \left(\text{steps},\ \text{resolution},\ \text{batch}\right)\rightarrow\left(\text{score},\ \text{latency},\ \text{USD}\right)
$$

### Practice tasks

- Fine-tune a LoRA on one subject and run a 25-comparison blind preference study.
- Build a quality–latency frontier across three sampler configurations and pick an operating point.

> **Module completion gate (13.9).** Your generative feature has a measured quality number, a cost per output, and a safety policy.

---

## 13.10 — Serving Foundation Models

**Objective.** Make it fast and cheap without silently degrading quality.

### Module 13.10.1 — Latency and throughput

- Time to first token versus tokens per second.
- Prefill versus decode; batching and continuous batching.
- KV-cache memory and its effect on concurrency.
- Streaming and cancellation.
- p50 versus p95: users experience the tail.

$$
\text{throughput}\approx\frac{\text{batch size}}{\text{decode time per token}},\qquad
\text{KV bytes}\propto L\cdot H_{kv}\cdot d_{\text{head}}\cdot T\cdot B
$$

**Practice tasks**

- Benchmark a served model at three concurrency levels and report p50/p95 latency and throughput.
- Show the concurrency at which KV-cache memory forces a batch-size reduction.

---

### Module 13.10.2 — Cost engineering

- Quantisation (INT8, INT4, weight-only) and its quality cost.
- Distillation and routing between small and large models.
- Caching: prompt caching, semantic caching, and result caching.
- Batching offline workloads; async and queue-based designs.
- Budgets, quotas, and per-tenant cost attribution.
- Measuring cost per successful task, not per token.

$$
\text{cost per task}=\frac{\text{cost per token}\times\text{tokens per attempt}}{\text{success rate}}
$$

**Practice tasks**

- Build a router that halves cost at under 2 points of quality loss; prove both numbers.
- Implement semantic caching and measure hit rate and quality impact.

---

### Module 13.10.3 — Reliability and operations

- Rate limits, retries with jitter, and fallback providers.
- Graceful degradation when the model is unavailable.
- Prompt and model versioning with rollback.
- Logging with PII redaction; trace-level debugging.
- Canary rollout of a model or prompt change with guardrail metrics.

**Practice tasks**

- Simulate a provider outage and verify the fallback path completes requests.
- Ship a prompt change behind a canary and catch a regression with guardrails.

> **Module completion gate (13.10).** You can state and hit a latency SLO and a cost-per-task target, with fallbacks tested.

---

## 13.11 — Foundation-Model Safety and Governance

**Objective.** Ship responsibly, with evidence rather than assurances.

### Checklist

- Threat model: prompt injection, data exfiltration, tool abuse, and model inversion.
- Indirect prompt injection via retrieved documents and tool outputs.
- Output safety classification and escalation paths.
- PII handling, retention, and data-residency constraints (DPDP/GDPR).
- Model licences and usage restrictions for commercial deployment.
- Documentation: model card, system card, and known-failure disclosure.
- Red-teaming: an attack set of 50+ cases run on every release.
- Human oversight requirements for high-stakes decisions.

### Practice tasks

- Build a 50-case red-team suite and run it against your system; report pass rate.
- Document one injection attack you blocked and one you could not.

> **Module completion gate (13.11).** Your system has a threat model, a red-team suite, and documented residual risks.

---

## 13.12 — Level 13 Capstone: Foundation Suite

### Project: `foundation-suite` — one language system, one vision system, both measured

**Difficulty.** Advanced

**Purpose.** Demonstrate command of the applied frontier as *systems engineering*: eval-first, cost-aware, safely shipped.

### A. Functional requirements

**System 1 — Language**

- A domain task (extraction, triage, assistant, or search) with a 150+ case eval set you built.
- The full baseline ladder: rules, TF-IDF/linear, fine-tuned encoder, prompted LLM.
- One adaptation step (SFT or LoRA) with a measured delta and capability-regression check.
- RAG or tool use where the task needs external knowledge or actions.
- Judge calibrated against 50 human-labelled cases; agreement reported.
- Cost per successful task and latency at p50/p95.

**System 2 — Vision or multimodal**

- A detection, segmentation, document-understanding, or generative task.
- Comparison of a specialist model against a foundation model, measured.
- Failure taxonomy with 20 inspected examples.
- Inference cost per item and p95 latency.
- Safety/provenance handling where relevant.

**Shared**

- One request path with structured logging, PII redaction, and versioned prompts/models.
- A red-team suite of 50 cases, run and reported.
- A cost model document stating assumptions and measured numbers.
- A deployment runbook: rollback, fallback, alert thresholds.

### B. Suggested architecture

```text
foundation-suite/
├── conf/
│   ├── prompts/{v1,v2,v3}.yaml
│   ├── models.yaml
│   └── routing.yaml
├── src/fsuite/
│   ├── nlp/{baselines,encoder,sft,rag,tools}.py
│   ├── vision/{detector,vlm,docs}.py
│   ├── eval/{harness,judges,redteam,reports}.py
│   ├── serve/{router,cache,fallback,telemetry}.py
│   └── cost.py
├── evals/
│   ├── nlp_golden.jsonl
│   ├── vision_cases.jsonl
│   └── redteam.jsonl
├── reports/
│   ├── nlp_eval.md
│   ├── vision_eval.md
│   ├── cost_model.md
│   └── runbook.md
└── tests/
```

### C. Acceptance targets

| Component | Target |
|---|---|
| Eval sets | 150+ NLP cases, 100+ vision cases, documented coverage |
| Baseline ladder | All four rungs implemented and reported with intervals |
| Adaptation | SFT/LoRA delta measured; capability regression checked on a second task |
| Retrieval/tools | Separately measured; refusal path demonstrated |
| Judge | Agreement with human labels reported ($\kappa$ or accuracy) |
| Cost | Cost per successful task measured, not estimated |
| Latency | p50 and p95 reported for both systems |
| Safety | 50-case red-team suite with pass rate and residual risks |
| Runbook | Rollback and fallback tested, not just documented |

### D. Stretch goals

- Serve with vLLM and report throughput under concurrency.
- Add a distilled student model and hit the same quality at half the cost.
- Add a multilingual (English + Hindi) evaluation slice.
- Build a semantic cache and quantify hit rate and quality impact.
- Publish a public demo with a hard cost ceiling per session.

### E. Acceptance criteria

| Area | Required evidence |
|---|---|
| **Breadth** | Two working systems across language and vision |
| **Measurement** | Every claim has a metric, an interval, and an $n$ |
| **Cost awareness** | Cost per task and latency percentiles are first-class results |
| **Adaptation judgement** | Clear evidence for or against fine-tuning |
| **Safety** | Threat model, red-team results, residual risks |
| **Operations** | Runbook with tested rollback and fallback |

> Level 13 is complete when a reviewer can see, for both systems, what it costs, how good it is, where it fails, and what happens when a dependency goes down.

---

## Level 13 interview question bank

### A. Applied NLP and LLMs

- How do you decide between a classifier, a fine-tuned encoder, and an LLM?
- What does your prompt versioning and regression testing look like?
- How do you get reliable structured output from an LLM?
- Why does the same prompt produce different outputs, and how do you live with it?
- When is RAG the wrong answer to a knowledge problem?

### B. Adaptation

- When is fine-tuning better than prompting with retrieval?
- Explain LoRA and how rank affects capacity.
- What is QLoRA, and where does its memory saving come from?
- What capability regressions do you check after SFT?
- How do you build and evaluate preference data?

### C. Evaluation

- How do you calibrate an LLM judge?
- What are the main biases in LLM-as-judge, and how do you mitigate them?
- How many eval cases do you need, and how do you know your eval is meaningful?
- How do you evaluate retrieval separately from generation?
- Why is a public benchmark score not evidence for your product?

### D. Vision and multimodality

- How do you choose between a detector and a segmentation model?
- What does mAP hide, and what do you report instead?
- Where do VLMs fail, and how do you detect it in production?
- How do you handle high-resolution documents with a VLM?
- When is OCR plus an LLM better than a VLM?

### E. Serving and safety

- Walk me through the latency budget of your LLM request.
- How does continuous batching change throughput and p95?
- How do you halve cost without losing quality?
- What is indirect prompt injection, and how do you defend against it?
- How would you roll back a bad model deployment at 2 a.m.?

### Interview readiness standard

1. Name the task and the success metric.
2. Give the baseline and the cost of each rung.
3. State the quality number with an interval and an $n$.
4. Give p50/p95 latency and cost per task.
5. Name the top failure mode and its mitigation.

---

## Level 13 final assessment

### Knowledge

- I can choose the cheapest approach that meets the quality bar.
- I can fine-tune encoders and LLMs and prove the delta.
- I can build RAG with separately measured retrieval and generation.
- I can build bounded, observable agents.
- I can select and evaluate vision models, including foundation models.
- I can ship a generative feature with a quality–cost frontier and a safety policy.
- I can state and hit latency and cost targets.
- I can red-team my own system and document residual risk.

### Practical skills

- I have built a 150+ case domain eval set with a calibrated judge.
- I have run the full baseline ladder and reported costs.
- I have completed an SFT or LoRA adaptation with a regression check.
- I have served a model and measured p50/p95 latency under concurrency.
- I have run a 50-case red-team suite.

### Project

- `foundation-suite` passes every acceptance target.
- Cost per successful task is measured for both systems.
- The runbook's rollback and fallback were executed, not just written.

> **Level 13 completion rule.** If you can build, evaluate, afford, secure, and operate foundation-model systems, you are ready to specialise in Level 14.

---

# LEVEL 14 — APPLIED ML RESEARCH SPECIALIZATION

> **Goal.** Choose a specialisation, build command of its literature, produce one real contribution, and publish it in a form that survives review. This level is about becoming known for something specific.

## Level dashboard

| Item | Details |
|---|---|
| **Level** | 14 — Applied ML Research Specialization |
| **Difficulty** | Expert |
| **Suggested duration** | 7–10 weeks |
| **Study commitment** | 2–3 hours per day, 6 days per week (plus wherever your experiments run) |
| **Core tools** | Git, DVC, experiment registry, LaTeX/Markdown, arXiv, OpenReview, Hugging Face Hub |
| **Main project** | **`specialist-thesis`** — a focused contribution with a public write-up, code, and eval suite |
| **Final outcome** | Own a specialisation: know its literature, produce a defensible result, and release it so others can build on it. |

**Prerequisites.** Levels 10–13. You need research method (L12), advanced methods (L11), and applied command of the frontier (L13).

---

## 14.1 — Choosing and Defining a Specialisation

**Objective.** Pick a lane you can defend for years, not a topic you can finish in a week.

### Module 14.1.1 — The specialisation map

- Axis 1 — modality: language, vision, audio, tabular, multimodal.
- Axis 2 — problem: representation, generation, retrieval, decision, evaluation.
- Axis 3 — constraint: low resource, low latency, privacy, multilingual, scientific.
- Axis 4 — role: systems builder, method developer, evaluation scientist, domain translator.
- Choosing two axes and going deep is better than touching five.
- Examples of coherent specialisations: low-resource Indic NLP, medical imaging under shift, evaluation of agentic systems, embedded vision, tabular causal ML.

$$
\text{specialisation}=\left(\text{modality},\ \text{problem}\right)\ \text{under a constraint}\ \left(C\right)
$$

**Practice tasks**

- Draw your own axes and place five candidate specialisations on them.
- Eliminate three options with a stated reason each (data access, competition, interest).

---

### Module 14.1.2 — Reality constraints

- Data access: what you can legally and practically obtain.
- Compute budget: what you can run in a week without a cluster.
- Domain access: can you talk to practitioners who have the problem?
- Competition: is this crowded with well-funded labs?
- Career fit: does this specialisation exist as a role where you want to work?
- Time to signal: how long before you have something showable?

**Practice tasks**

- Write a one-page constraint sheet: data, compute, time, access, and career target.
- Reject one specialisation on constraint grounds and document why.

---

### Module 14.1.3 — The contribution ladder

- Level 1: reproduce an existing result in a new domain.
- Level 2: a careful evaluation showing a claim does not hold.
- Level 3: a small methodological improvement with ablations.
- Level 4: a new dataset, benchmark, or evaluation protocol.
- Level 5: a structural insight that changes how others work.
- Most valuable first contributions are Level 1–2; they are also the most credible.

**Practice tasks**

- Choose the contribution level you can realistically reach in eight weeks.
- Explain why a Level 2 evaluation contribution is publishable when done well.

> **Module completion gate (14.1).** You can state your specialisation in one sentence and your planned contribution level in another.

---

## 14.2 — Deep Literature Command

**Objective.** Know your subfield better than a generalist, and find the actual gap.

### Checklist

- Build a 40–60 paper corpus with structured notes.
- Identify the canonical datasets, baselines, and metrics of your subfield.
- Map who is doing what: five labs or researchers, and their direction.
- Find the three results that everyone cites but nobody reproduces.
- Identify claims with weak evidence — those are opportunities.
- Track the last 18 months specifically; older work is context, not frontier.
- Maintain a living gap analysis document.

### Practice tasks

- Produce a 40-paper map with "improves on" and "evaluated on" edges.
- Write a gap analysis: five open questions, each with a proposed first experiment.
- Identify one claim in your field you believe is overstated, with evidence.

> **Module completion gate (14.2).** You can name the five most important open problems in your subfield and how you would attack one.

---

## 14.3 — Scoping a Contribution You Can Finish

**Objective.** Trade ambition for completion without trading away rigour.

### Checklist

- The smallest experiment that would be informative.
- Fixed timebox with a decision point at 50% of the budget.
- Pre-registered success and failure criteria.
- A "null result is still a result" plan.
- Kill criteria: when to abandon and what you will salvage.
- Writing the abstract before running the experiments.

$$
\text{scope} = \frac{\text{question value}}{\text{compute}\times\text{time}}\ \text{subject to}\ \text{data availability}
$$

### Practice tasks

- Write the abstract of your thesis before any experiment runs.
- Set a 50% checkpoint with explicit kill criteria.

> **Module completion gate (14.3).** Your plan fits the timebox, and you have written down what would make you abandon it.

---

## 14.4 — Data: Collection, Annotation, Licensing

**Objective.** Build a dataset you can publish and defend.

### Checklist

- Provenance and consent for every source.
- Licensing: what you may redistribute versus derive from.
- Annotation guidelines, pilot rounds, and agreement measurement.
- Quality control: gold questions, adjudication, and annotator drift.
- Splits that prevent leakage across entities and time.
- Datasheets with collection method, demographics, and known gaps.
- Decontamination against common benchmarks.
- A maintenance plan for the released dataset.

### Practice tasks

- Write a datasheet for a 2,000-example dataset you assemble.
- Run a pilot annotation with two annotators and report agreement before scaling.

> **Module completion gate (14.4).** Your dataset has provenance, a licence, a split policy, and a datasheet.

---

## 14.5 — Running a Research Programme

**Objective.** Spend a fixed budget on experiments that compound.

### Checklist

- Budget: GPU-hours, API cost, annotation cost, and your own time.
- Sequence experiments so early ones are cheap and decisive.
- Prefer many small runs over one heroic run.
- Log everything in a registry; analyse from the registry, never from memory.
- Weekly cadence: hypothesis → run → analysis → decision.
- Reproduce your own result before believing it.
- Keep a decision log with dates and reasons.

### Practice tasks

- Build a compute and cost budget for eight weeks, with a 20% contingency.
- Run one experiment per day for a week and write a decision note each day.

> **Module completion gate (14.5).** Every week ends with a decision backed by a logged experiment.

---

## 14.6 — Collaborators, Mentors and Reviewers

**Objective.** Get the feedback that changes the work.

### Checklist

- Finding a mentor or advisor: specificity beats flattery.
- The one-paragraph ask: problem, evidence, what you need.
- Working with domain experts who have the problem and the data.
- Co-authorship norms and contribution statements.
- Getting pre-submission feedback from three people who will be honest.
- Responding to review: concede, clarify, or refute with data.
- Public critique: take it, filter it, and keep the record.

### Practice tasks

- Send three specific outreach messages to practitioners in your area.
- Run a pre-submission review with two peers using a review template.

> **Module completion gate (14.6).** You have external feedback on your work before release, and a written record of what you changed.

---

## 14.7 — Writing the Thesis Paper

**Objective.** Produce a workshop-quality paper that a reviewer can verify.

### Checklist

- Title that states the claim, not the technique.
- Abstract: context, gap, method, result with a number, implication.
- Introduction: the problem matters, the gap is real, the contribution is specific.
- Related work as positioning against three named baselines.
- Method described so it can be reimplemented.
- Results: main table, ablations, and negative controls.
- Limitations and threats to validity, written honestly.
- Impact statement and safety considerations.
- Appendix: full hyperparameters, compute, and data details.

### Practice tasks

- Write the paper in this order: figures → results → method → introduction → abstract.
- Have a peer mark every sentence that is not supported by a number or a citation.

> **Module completion gate (14.7).** A peer can state your claim after reading only your abstract and first figure.

---

## 14.8 — Releasing Artefacts

**Objective.** Make your work usable, which is what makes it matter.

### Checklist

- Repository: README with install, reproduce, and citation.
- Pinned environment and a one-command reproduction of the main table.
- Model or dataset card with intended use and limits.
- Eval harness released with the results.
- Public demo with a hard cost ceiling.
- Versioning and a changelog; a plan for issues.
- Licence compatible with your dependencies and data.
- Citation block and a permanence plan (DOI via Zenodo or similar).

### Practice tasks

- Publish a repository that reproduces your main table in under 30 minutes on a rented GPU.
- Add a demo with a five-dollar-per-day hard cap and measure the cost per session.

> **Module completion gate (14.8).** A stranger can reproduce your headline result from your release without contacting you.

---

## 14.9 — Applied Research Inside a Company

**Objective.** Do rigorous work under real constraints.

### Checklist

- Aligning a research question with a business decision.
- The 20% exploration budget and how to protect it.
- IP, publication approval, and disclosure risk.
- Working with product teams: timelines, expectations, and scope creep.
- Turning a research result into a product decision (reuse L6.10).
- Internal write-ups as first-class artefacts, even when nothing publishes.
- Measuring success by the decisions your work changed, not by papers.

### Practice tasks

- Write an internal research proposal with a business decision attached to each experiment.
- Draft a disclosure review note for a result you want to publish.

> **Module completion gate (14.9).** Your research plan names the decision each experiment informs.

---

## 14.10 — Building Reputation Without Self-Promotion

**Objective.** Become findable by doing visible work.

### Checklist

- Open-source contributions that solve other people's problems.
- Writing that explains, not announces: technical posts with numbers.
- Talks and meetups; the 10-minute version of your work.
- Reproducibility challenges and public benchmarking.
- Answering questions in communities where your users are.
- A personal index page: projects, papers, demos, and contact.
- Consistency over intensity: one artefact per month beats one burst per year.

### Practice tasks

- Write one technical post that explains a negative result you got.
- Make one open-source contribution to a library you use in your thesis.

> **Module completion gate (14.10).** You have a public artefact trail a hiring manager can follow.

---

## 14.11 — Staying Current Without Drowning

**Objective.** Maintain command of a moving field sustainably.

### Checklist

- A reading cadence: 3 papers a week, one deep read.
- Curated sources over feeds: venue proceedings, a handful of labs, two newsletters.
- Quarterly re-assessment of your gap analysis.
- A 15-minute rule for testing a new claim: find the baseline and the seeds.
- Deliberately ignoring popular topics that do not affect your specialisation.
- Re-evaluating your specialisation annually against the job market.

### Practice tasks

- Build your weekly reading system and run it for the duration of this level.
- Test three new claims with the 15-minute rule and record verdicts.

> **Module completion gate (14.11).** You have a sustainable system and evidence you are using it.

---

## 14.12 — Level 14 Capstone: Specialist Thesis

### Project: `specialist-thesis` — one contribution, properly done

**Difficulty.** Expert

**Purpose.** Produce the artefact that lets you say "I work on X" and be believed: a focused, reproducible contribution in a specialisation you have chosen deliberately.

### A. Functional requirements

**Contribution (choose one)**

- A reproduction plus extension in a new domain.
- A careful evaluation showing a widely-held claim fails under a condition you specify.
- A small methodological improvement with ablations and a control.
- A new dataset, benchmark, or evaluation protocol with a datasheet.

**Rigour**

- Pre-registered protocol with success and failure criteria.
- At least three seeds or three data splits per configuration.
- Intervals on every headline number; paired tests where applicable.
- Compute and cost reported.
- One negative or null result reported plainly.

**Artefact**

- Repository reproducing the main table with one command.
- Dataset or model card, if applicable.
- Eval harness released alongside results.

**Writing**

- 4–8 page workshop-style paper with figures, ablations, limitations, and impact statement.
- A 10-minute talk with slides, recorded.

**Visibility**

- Published to arXiv, a workshop, a blog with code, or an open review venue.
- A short thread or post explaining the result to practitioners.

### B. Suggested architecture

```text
specialist-thesis/
├── PREREGISTRATION.md
├── notes/
│   ├── literature_map.md
│   ├── gap_analysis.md
│   └── decision_log.md
├── configs/
├── src/thesis/
│   ├── data.py
│   ├── method.py
│   ├── baselines.py
│   ├── evaluate.py
│   └── registry.py
├── releases/
│   ├── paper.pdf
│   ├── talk.mp4
│   ├── model_card.md
│   └── dataset_card.md
└── tests/
```

### C. Acceptance targets

| Component | Target |
|---|---|
| Question | One sentence, falsifiable, with a named baseline |
| Pre-registration | Committed before experiments, with kill criteria |
| Evidence | 3+ seeds or splits; intervals on every headline number |
| Baseline | Strong, tuned, and reported honestly |
| Ablation | Isolates the claimed cause, plus a control |
| Negative result | At least one reported plainly |
| Artefact | One-command reproduction from a clean clone |
| Writing | Paper and talk where claims match evidence |
| Visibility | Public release with a practitioner-facing explanation |

### D. Stretch goals

- Submit to a workshop and go through real peer review.
- Get your artefact used by someone outside your circle.
- Extend to a second domain and test whether the claim transfers.
- Write the follow-up question the result opens, with a plan.

### E. Acceptance criteria

| Area | Required evidence |
|---|---|
| **Originality** | The question is genuinely open in your subfield |
| **Rigour** | Pre-registration, seeds, intervals, compute, controls |
| **Honesty** | Negative results, deviations, and limitations documented |
| **Reusability** | Artefact a stranger can run and extend |
| **Communication** | Paper and talk that a specialist respects and a practitioner understands |
| **Trajectory** | A clear next question, not a dead end |

> Level 14 is complete when someone in your subfield reads your work, trusts the numbers, and can build on it.

---

## Level 14 interview question bank

### A. Specialisation

- What is your specialisation, in one sentence?
- What are the three most important open problems in it?
- Who else works on this, and how is your approach different?
- Why this specialisation rather than the adjacent one?

### B. Contribution

- What is your strongest result, and what could falsify it?
- What did you try that did not work, and what did you learn?
- Which claim in your work are you least confident about?
- What would you do with 10× the compute? With none?

### C. Rigour

- How did you pre-register, and what did you change afterwards?
- How many seeds, and why that number?
- What is your control condition?
- What is the biggest threat to validity in your result?

### D. Artefacts

- Walk me through reproducing your main result from scratch.
- What does your dataset card say that a user must not do?
- How would someone extend your work in a week?
- What is the cost of running your experiments again?

### E. Trajectory

- What is the next experiment, and why is it the right one?
- How does this work connect to a product decision?
- If you had to defend this work to a sceptical staff engineer, what is your first slide?

### Interview readiness standard

1. State the specialisation and the open question.
2. State your contribution and its evidence.
3. State the baseline, seeds, and intervals.
4. State the strongest counter-argument.
5. State what you would do next.

---

## Level 14 final assessment

### Knowledge

- I can define my specialisation in one sentence and defend the choice.
- I know the five most important open problems in it.
- I understand the contribution ladder and where my work sits.
- I can scope work to a fixed budget with kill criteria.
- I can build and document a dataset or benchmark responsibly.
- I can write a workshop-quality paper and give a 10-minute talk.
- I can release artefacts that others can use.
- I have a sustainable system for staying current.

### Practical skills

- I have pre-registered and honoured a research protocol.
- I have produced a contribution with baselines, ablations, and a control.
- I have published a reproducible artefact and a practitioner-facing explanation.
- I have received and incorporated external review.
- I have a public artefact trail.

### Project

- `specialist-thesis` passes every acceptance target.
- The release reproduces the main table from a clean clone.
- I can answer the counter-argument to my result with evidence.

> **Level 14 completion rule.** If you can say "I work on X, here is what I found, here is the code, and here is what would prove me wrong" — you are ready for Phase 6.

---

# PHASE 5 CAPSTONE — SPECIALIZATION THESIS

> **Purpose.** Combine both levels into one public, defensible body of work: an applied system that proves engineering command, and a research contribution that proves scientific judgement, in the same specialisation.

**Difficulty.** Expert
**Suggested duration.** 3–4 weeks
**Depends on.** Levels 13 and 14.

## A. The brief

Produce **one** of the following, in your chosen specialisation:

**Option A — Applied system thesis.** Build and evaluate a foundation-model system in your specialisation (for example: Indic-language document intelligence, medical imaging triage, embedded visual inspection), with a domain eval set, a measured cost model, and a released harness — plus a short paper describing what worked, what did not, and where the system fails.

**Option B — Research thesis.** Produce a focused research contribution in your specialisation — a reproduction plus extension, a falsifying evaluation, a small method, or a new benchmark — with a workshop-style paper, artefact, and public release.

Both options must include the same rigour: pre-registration, intervals, seeds, compute reporting, honest failure analysis, and a reproducible artefact.

## B. Required deliverables

| # | Deliverable | What "done" looks like |
|---|---|---|
| 1 | Specialisation statement | One sentence, plus three open problems |
| 2 | Pre-registered protocol | Committed with success, failure, and kill criteria |
| 3 | Domain eval suite | 150+ cases, documented coverage, held out from development |
| 4 | System or method | Implemented, with baselines and ablations |
| 5 | Cost model | Cost per task and p50/p95 latency, measured |
| 6 | Failure analysis | Taxonomy from 50+ inspected failures |
| 7 | Safety and governance | Threat model, red-team results, residual risks |
| 8 | Paper | 4–8 pages, claims matching evidence |
| 9 | Talk | 10 minutes, recorded |
| 10 | Release | One-command reproduction, cards, licence, citation |

## C. Suggested architecture

```text
specialization-thesis/
├── PREREGISTRATION.md
├── SPECIALIZATION.md            # one-paragraph positioning
├── conf/
├── src/thesis/
│   ├── data/
│   ├── system/                  # applied option
│   ├── method/                  # research option
│   ├── baselines/
│   ├── eval/
│   ├── serve/
│   └── registry.py
├── evals/                       # golden sets, red-team suite, held-out
├── reports/
│   ├── paper.md / paper.pdf
│   ├── failure_taxonomy.md
│   ├── cost_model.md
│   └── threats_to_validity.md
├── releases/
│   ├── model_card.md
│   ├── dataset_card.md
│   └── talk.mp4
└── tests/
```

## D. Grading rubric

| Dimension | 1 — Not yet | 3 — Competent | 5 — Strong |
|---|---|---|---|
| **Specialisation clarity** | Vague area | Named problem and constraint | Named problem, gap, and why you are the one to answer it |
| **Engineering** | Notebook | Working system with cost measured | Served, safe, observable, with tested fallbacks |
| **Research rigour** | No protocol | Pre-registered, seeds, intervals | Controls, ablations, paired tests, compute reported |
| **Evaluation** | Public benchmark only | Own eval set | Own eval set with judge calibration and worst-group reporting |
| **Honesty** | Only successes | Failures listed | Negative result analysed and its implications stated |
| **Artefact** | Private repo | Public repo with README | Reproducible release with cards, harness, and demo |
| **Communication** | Numbers only | Clear paper | Paper and talk that a specialist respects and a practitioner can act on |

**Pass mark.** At least 3 in every dimension, with **Research rigour**, **Evaluation**, and **Honesty** at 4 or above.

## E. Defence questions

- What is your specialisation, and what is the open question you answered?
- What did your pre-registration say, and what did you change after seeing data?
- Which result are you least confident in, and what would settle it?
- What does your system cost per successful task, and how does that scale 100×?
- Where does your system fail worst, and who bears that cost?
- What is the strongest argument that your contribution is not novel?
- What would you do next, and why is that the right next step?

---

# PHASE 5 FINAL ASSESSMENT

Complete this before starting Phase 6 (Engineering).

## Knowledge checklist

**Applied frontier (L13)**

- I can choose the cheapest approach that meets the quality bar.
- I can fine-tune encoders and LLMs with measured deltas.
- I can build and evaluate RAG, tools, and bounded agents.
- I can select and evaluate vision and multimodal models.
- I can ship generative features with a quality–cost frontier.
- I can serve foundation models within latency and cost SLOs.
- I can red-team and document residual risk.

**Specialisation (L14)**

- I can state my specialisation and its three open problems.
- I know my subfield's datasets, baselines, metrics, and people.
- I can scope a contribution to a fixed budget with kill criteria.
- I can build and document a dataset or benchmark responsibly.
- I can run a research programme with a decision log.
- I can write a workshop-quality paper and give a 10-minute talk.
- I can release artefacts others can use.
- I have a sustainable system for staying current.

## Practical checklist

- [ ] Level 13 capstone (`foundation-suite`) passes its acceptance targets.
- [ ] Level 14 capstone (`specialist-thesis`) has a public, reproducible artefact.
- [ ] Phase capstone scores at least 3 in every rubric dimension.
- [ ] My eval suite is mine, not a public benchmark.
- [ ] My cost per successful task is measured, not estimated.
- [ ] I have a pre-registration and a decision log I actually followed.
- [ ] I have received external feedback and recorded what I changed.

## The self-honesty test

Answer these out loud, without notes. If any answer takes over 60 seconds, revisit that level.

1. What is your specialisation, in one sentence, and why should anyone care?
2. What is the strongest baseline to your work, and how do you beat it?
3. What does your system cost per successful task, and what dominates that cost?
4. Where does your evaluation not reflect production?
5. What did you pre-register, and what did you change?
6. What is the biggest threat to your conclusion?
7. Who is already using your artefact, and what did they struggle with?
8. What is the next experiment, and what would make you stop?

> **Phase 5 is complete** when both capstones pass, your thesis is public, and a specialist in your area would call the work credible.

---

# APPENDIX

## A. Formula sheet for Phase 5

| Topic | Formula |
|---|---|
| Token cost | $1000\times(n_{\text{in}}p_{\text{in}}+n_{\text{out}}p_{\text{out}})$ |
| Token fertility | tokens ÷ words |
| Cost per task | $\dfrac{\text{cost per token}\times\text{tokens per attempt}}{\text{success rate}}$ |
| Calibration of judge | $\kappa=\dfrac{p_o-p_e}{1-p_e}$ |
| LoRA adapter params | $r(d_{\text{in}}+d_{\text{out}})$ |
| LoRA merge | $W'=W+\frac{\alpha}{r}BA$ |
| QLoRA memory | base (4-bit) $+$ adapters $+$ activations $+$ optimiser |
| SFT loss | $-\sum_{t\in\text{completion}}\log p_\theta(y_t\mid y_{<t},x)$ |
| DPO loss | $-\log\sigma\!\left(\beta\log\frac{\pi_\theta(y_w)}{\pi_{\text{ref}}(y_w)}-\beta\log\frac{\pi_\theta(y_l)}{\pi_{\text{ref}}(y_l)}\right)$ |
| Pass@k | $1-\dfrac{\binom{n-c}{k}}{\binom{n}{k}}$ |
| mAP | $\frac1C\sum_c\int_0^1 p_c(r)\,dr$ |
| IoU | $\dfrac{\lvert B_p\cap B_g\rvert}{\lvert B_p\cup B_g\rvert}$ |
| KV cache bytes | $2\,L\,H_{kv}\,d_{\text{head}}\,T\,B\times\text{bytes}$ |
| Throughput | $\dfrac{\text{batch}}{\text{decode time per token}}$ |
| TTFT vs TPS | prefill latency vs decode rate |
| Retrieval metric | recall@k, nDCG@k |
| Zero-shot VLM | $\arg\max_c\langle f_I(x),f_T(\text{prompt}_c)\rangle$ |
| Red-team pass rate | $\dfrac{\text{blocked attacks}}{\text{total attacks}}$ |
| Scope | question value / (compute × time) |

## B. Twenty-week schedule

| Weeks | Focus | Milestone |
|---|---|---|
| 1 | L13: NLP landscape, baselines, domain data | Baseline ladder with costs |
| 2 | L13: tokenisation, encoders, embeddings | Fine-tuned encoder vs baseline |
| 3 | L13: LLM prompting, structured output, tools | Reliable extraction pipeline |
| 4 | L13: RAG done properly | Retrieval and generation measured separately |
| 5 | L13: SFT, LoRA, QLoRA | Adaptation delta measured |
| 6 | L13: preference tuning, judges, eval suites | Calibrated judge + 150-case suite |
| 7 | L13: agents, context, observability | Bounded agent with traces |
| 8 | L13: vision systems (classification, detection, segmentation) | Vision model with error taxonomy |
| 9 | L13: vision foundation models, VLMs, documents | Specialist vs foundation comparison |
| 10 | L13: generative media, serving, cost, safety **+ L13 capstone** | `foundation-suite` complete |
| 11 | L14: specialisation choice, literature map | 40-paper map and gap analysis |
| 12 | L14: scoping, pre-registration, data plan | Abstract written before experiments |
| 13 | L14: first experiment block | Week-one decision log |
| 14 | L14: main experiment block | Main table with intervals |
| 15 | L14: ablations and controls | Ablation table complete |
| 16 | L14: failure analysis, negative results | Failure taxonomy and null result |
| 17 | L14: paper drafting | Full draft reviewed by two peers |
| 18 | L14: artefacts and release | Reproducible release live |
| 19 | L14: talk, visibility, feedback **+ L14 capstone** | Thesis published |
| 20 | Phase capstone integration and defence | Public mini-thesis complete |

> This phase overlaps with a job search well. Publish early: a half-finished release with a clear README is worth more than a perfect private repository.

## C. Recommended resources

### Courses and references

| Resource | Use it for |
|---|---|
| Hugging Face NLP course and `transformers` docs | L13 engineering |
| `peft`, `trl`, `accelerate` documentation | adaptation and training at scale |
| vLLM documentation and papers | serving and throughput |
| `timm`, `ultralytics`, SAM, GroundingDINO docs | vision systems |
| `diffusers` documentation | generative media |
| OpenAI/Anthropic prompt engineering and eval guides | prompting and evaluation practice |
| `lm-evaluation-harness` | standardised evaluation |
| arXiv, OpenReview, Papers with Code | literature command |

### Papers worth knowing in Phase 5

| Area | Paper |
|---|---|
| Encoders | "BERT", "RoBERTa", "DeBERTa", "E5", "BGE" |
| Adaptation | "LoRA", "QLoRA", "InstructGPT", "DPO" |
| Retrieval | "DPR", "ColBERT", "RAG", "Self-RAG" |
| Agents | "ReAct", "Toolformer", "Reflexion" |
| Evaluation | "Judging LLM-as-a-Judge", "Chatbot Arena" |
| Vision | "DETR", "YOLO family", "SAM", "CLIP", "SigLIP", "LLaVA" |
| Generative | "Latent Diffusion", "ControlNet", "SDXL", "DreamBooth" |
| Efficiency | "FlashAttention", "vLLM / PagedAttention", "GPTQ", "AWQ" |
| Safety | "Universal and Transferable Adversarial Attacks", "Indirect Prompt Injection" |

### Practice

- **Hugging Face Hub** — publish a model or dataset; read the cards critically.
- **Kaggle** — one multimodal competition with a strict protocol.
- **OpenReview** — review two papers in your specialisation.
- **Workshop deadlines** — set a real one; the deadline is the method.
- **Your own eval set** — the most valuable private asset you will build.

## D. The ten most common ways to fail this phase

| Failure | Symptom | Fix |
|---|---|---|
| Breadth without depth | Can talk about everything, defend nothing | Pick one specialisation and go deep |
| Chasing benchmarks | Leaderboard gains that vanish on your domain | Build your own eval set first |
| Fine-tuning by default | Cost without measured benefit | Run the baseline ladder before adapting |
| Ignoring cost | Great demo, unaffordable product | Cost per successful task as a headline metric |
| Unmeasured safety | Confident demos, exploitable system | Red-team suite on every release |
| Scope creep in research | Nothing finished, nothing published | Timebox with kill criteria at 50% |
| Private perfection | Excellent work nobody sees | Publish early with an honest README |
| No external feedback | Blind spots survive to submission | Three honest reviewers before release |
| Single-seed results | Contributions that do not replicate | Three seeds, intervals, controls |
| Specialisation by hype | Crowded area, weak differentiation | Choose from constraints and access, not fashion |

## E. Progress tracker

| Level | Capstone | Public link | Eval suite size | Cost measured | Seeds ≥ 3 | Defence rehearsed |
|---|---|---|---|---|---|---|
| L13 | `foundation-suite` | | ☐ | ☐ | ☐ | ☐ |
| L14 | `specialist-thesis` | | ☐ | ☐ | ☐ | ☐ |
| Phase | Specialization thesis | | ☐ | ☐ | ☐ | ☐ |

## F. Specialisation idea bank

Ten specialisations that are coherent, data-accessible, and defensible for an applied scientist. Pick one, then narrow it further.

| Specialisation | Constraint | First artefact you could build |
|---|---|---|
| Indic / low-resource NLP | multilingual, low data | 150-case Hindi–English extraction eval + fine-tuned multilingual encoder |
| Document intelligence | tables, scans, compliance | invoice pipeline with layout OCR, field validation, and review routing |
| Medical imaging under shift | privacy, domain shift | detection model with hospital-holdout evaluation and calibration report |
| Embedded / on-device vision | latency, memory | quantised defect detector under 50 ms on CPU |
| Agentic evaluation | trust, reproducibility | benchmark of 100 agent tasks with trace-based failure taxonomy |
| Speech for Indian languages | accent, code-switching | ASR slice analysis with WER by language and noise level |
| Recommendation under cold start | sparse data, feedback loops | two-tower retriever with off-policy evaluation harness |
| Causal ML for product decisions | observational data | uplift study with overlap diagnostics and decision memo |
| Forecasting for operations | hierarchy, intermittency | global forecaster with reconciliation and quantile intervals |
| Climate / agriculture ML | satellite data, seasonality | crop-yield forecaster with temporal holdout and spatial slices |

**How to use this table.** Score each row on data access (1–5), compute cost (inverted), career demand, and your genuine interest. Pick the highest total, then write the one-sentence specialisation statement and the three open problems before starting Level 14.

---

## What comes next

**Phase 6 — Engineering · Levels 15–16**

| Level | Title | What it adds |
|---|---|---|
| **L15** | End-to-End ML Engineering and MLOps | Taking models and foundation-model systems into reliable production |
| **L16** | ML Systems and Scalability | Designing systems that survive traffic, failure, and growth |

Phase 6 assumes you can build the thing well. It is about making it survive contact with users, budgets, and 2 a.m. incidents.

*Phase 5 of 6 · Levels 13–14 of 18 · Specialization*
