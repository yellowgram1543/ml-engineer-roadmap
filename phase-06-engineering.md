# PHASE 6 — ENGINEERING

**ML Engineer / Applied Scientist Roadmap · Levels 15–16 of 18**

> **Phase goal.** Make models survive contact with reality. Level 15 turns a trained model into a versioned, tested, deployed, monitored, retrainable service. Level 16 designs systems that still work at 100× traffic, under failure, and inside a budget — and lets you defend those designs on a whiteboard.

---

## Phase dashboard

| Item | Details |
|---|---|
| **Phase** | 6 — Engineering |
| **Levels** | L15 · L16 |
| **Difficulty** | Advanced → Expert |
| **Suggested duration** | 12–16 weeks at 2–3 hours/day |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Core tools** | Docker, Kubernetes (or a managed runtime), PostgreSQL, Redis, Kafka or a queue, Terraform basics, Airflow/Dagster/Prefect, MLflow, Prometheus + Grafana, OpenTelemetry, vLLM/Triton, GitHub Actions |
| **Capstone projects** | 2 level capstones + 1 phase capstone |
| **Final outcome** | Own a model in production end-to-end and design an ML system that scales, fails gracefully, and stays within a cost and latency budget. |

**Prerequisites.** Phase 5 complete. You have built and evaluated real systems; now you make them operable. Level 16 assumes you can already build the model — it is entirely about the system around it.

---

## How this phase is structured

| Block | What it contains |
|---|---|
| **Dashboard** | Level, difficulty, duration, tools, project, outcome |
| **Numbered sections** (`15.1`, `15.2`, …) | One theme each |
| **Modules** (`15.1.1`, `15.1.2`, …) | The actual study checklist |
| **Practice tasks** | Small exercises that force retrieval, not re-reading |
| **Module completion gate** | The proof that the section is done |
| **Mini-project** | A small build inside the level |
| **Capstone** | The level's main artefact, with acceptance criteria |
| **Interview bank** | Questions you should be able to answer after the level |
| **Level assessment** | A checklist before you move on |

> **The rule of this phase:** a system is not "deployed" because it responds to a request. It is deployed when it can be versioned, rolled back, observed, retrained, and diagnosed by someone who did not build it.

---

## Contents

| Level | Title | Sections | Duration | Capstone |
|---|---|---|---|---|
| [L15](#level-15--end-to-end-ml-engineering-and-mlops) | End-to-End ML Engineering and MLOps | 15.1 – 15.11 | 6–8 weeks | `mlops-platform` — a model in production with full lifecycle |
| [L16](#level-16--ml-systems-and-scalability) | ML Systems and Scalability | 16.1 – 16.11 | 6–8 weeks | `system-design-vault` — three full designs + one load-tested build |
| [Phase capstone](#phase-6-capstone--production-ml-system) | Integration project | — | 2–3 weeks | A production-grade system with an incident report |

---

# LEVEL 15 — END-TO-END ML ENGINEERING AND MLOPS

> **Goal.** Take a model you built and make it a service you can operate: reproducible training, versioned artefacts, safe deployment, real monitoring, automated retraining, and runbooks that work at 2 a.m.

## Level dashboard

| Item | Details |
|---|---|
| **Level** | 15 — End-to-End ML Engineering and MLOps |
| **Difficulty** | Advanced → Expert |
| **Suggested duration** | 6–8 weeks |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Core tools** | Docker, GitHub Actions, MLflow, DVC, FastAPI, PostgreSQL, Redis, Prometheus/Grafana, OpenTelemetry, Terraform basics |
| **Main project** | **`mlops-platform`** — one model, full lifecycle, operated for two weeks |
| **Final outcome** | Deploy, monitor, debug, retrain, and roll back a model without heroics — with evidence for each of those verbs. |

**Prerequisites.** Levels 0 (Git, Docker, APIs), 6 (evaluation), 11 (drift), and 13 (serving foundation models).

---

## 15.1 — Requirements and Design Before Code

**Objective.** Decide what "working" means before choosing tools.

### Module 15.1.1 — Non-functional requirements

- Latency: p50, p95, p99 budgets, and which one the product cares about.
- Throughput: requests per second at peak, and burstiness.
- Freshness: how stale a prediction may be.
- Availability target and the cost of downtime in currency.
- Cost per 1,000 predictions, and the unit economics of the product.
- Data residency, retention, and audit requirements.

$$
\text{monthly cost}=\left(\text{compute}+\text{storage}+\text{network}+\text{model calls}\right)\times\text{replication factor}
$$

**Practice tasks**

- Write NFRs for a fraud-scoring service with numbers, and state the cost of missing each.
- Convert a p95 latency requirement into a per-stage budget across feature fetch, model, and post-processing.

---

### Module 15.1.2 — The design doc

- Problem, users, and the decision the model changes.
- Data sources, freshness, and ownership.
- Training and serving architecture, with a diagram.
- Interfaces: request schema, response schema, error contract.
- Failure modes and the fallback for each.
- Rollout plan, monitoring plan, and rollback plan.
- Alternatives considered and rejected, with reasons.

**Practice tasks**

- Write a two-page design doc for a model service and have a peer attack every box.
- List ten failure modes and the specific detection for each.

---

### Module 15.1.3 — Choosing a serving pattern

- Batch scoring: cheapest, highest latency tolerance.
- Real-time request/response: the default for interactive products.
- Streaming: events and continuous scoring.
- Edge/on-device: privacy and latency, at the cost of updates.
- Hybrid: precompute candidates, rank in real time.
- Matching the pattern to the freshness and latency requirement.

| Pattern | Latency | Cost | Freshness | Typical use |
|---|---|---|---|---|
| Batch | hours | lowest | stale | reports, campaigns, risk lists |
| Real-time | ms–s | medium | fresh | fraud, ranking, chat |
| Streaming | seconds | medium-high | near-real | monitoring, alerts |
| Edge | ms | low at scale | device state | vision, keyboard, privacy |

> **Module completion gate (15.1).** Your design doc states NFRs, interfaces, failure modes, and the rejected alternatives.

---

## 15.2 — Reproducible Training Pipelines

**Objective.** Make training a repeatable job, not a person.

### Module 15.2.1 — Pipeline structure

- Stages: ingest → validate → transform → train → evaluate → register → deploy.
- Idempotency: re-running a stage must not duplicate or corrupt.
- Caching and partial reruns.
- Artefacts between stages: data snapshots, feature sets, models, metrics.
- Orchestrators: Airflow, Dagster, Prefect, Kubeflow, or plain cron with discipline.
- Parameterisation and environment separation.

```text
ingest ─► validate ─► featurise ─► train ─► evaluate ─► gate ─► register ─► deploy
   │          │            │          │         │         │         │
   └── data version ───────┴── config ─┴── metrics ┴── pass? ─┴── model vN
```

**Practice tasks**

- Build a four-stage pipeline where each stage can be re-run independently.
- Deliberately fail a stage midway and prove the pipeline is idempotent on retry.

---

### Module 15.2.2 — Data and feature contracts

- Schema contracts with types, ranges, and nullability.
- Point-in-time correctness enforced in the pipeline, not by convention.
- Offline/online feature parity and the skew test.
- Dataset versioning with DVC or lakeFS, and lineage from model to data.
- Handling schema evolution without breaking training.

**Practice tasks**

- Write a contract for a production table and make the pipeline refuse non-conforming data.
- Build a skew test that compares offline features with logged online features for the same request.

---

### Module 15.2.3 — Training reproducibility

- Pin dependencies, CUDA versions, and hardware assumptions.
- Seed management across data order, augmentation, and initialisation.
- Determinism trade-offs on GPU.
- Config hashing so a run can be identified from its inputs.
- Reproducing a production model from its registry entry alone.

**Practice tasks**

- Rebuild a model from a registry entry on a clean machine and compare weights within tolerance.
- Record everything that made the run different the second time.

> **Module completion gate (15.2).** Any deployed model can be retrained from a registry entry and a data version, without tribal knowledge.

---

## 15.3 — Experiment and Model Management

**Objective.** Know exactly what is in production, and how it got there.

### Module 15.3.1 — Experiment tracking in production

- What to log: config, metrics, artefacts, system metrics, and lineage.
- Naming and grouping runs so humans can find them.
- Linking runs to tickets or decisions.
- Retention and cost of tracking servers.
- The rule: no metric counts unless it is in the tracker.

**Practice tasks**

- Audit your last project's results and check which ones cannot be traced to a tracked run.
- Backfill metadata for a past experiment and see what is unrecoverable.

---

### Module 15.3.2 — Model registry and promotion gates

- Versioning models, features, and code together.
- Stages or aliases: staging, shadow, canary, production, archived.
- Promotion criteria: metric thresholds, slice checks, data checks, security review.
- Model cards attached to every registered version.
- Immutability: never overwrite a version.
- Rollback as a pointer change, not a rebuild.

**Practice tasks**

- Implement a registry with automated promotion gates and one deliberate rejection.
- Roll back to the previous version and prove predictions are identical.

---

### Module 15.3.3 — Environment and dependency management

- Container images as the unit of deployment.
- Base-image pinning and reproducible builds.
- Model artefacts versus image-embedded models: trade-offs.
- GPU driver and CUDA compatibility.
- Secrets and configuration injected at runtime.

> **Module completion gate (15.3).** An auditor can trace any prediction to a code commit, a data version, and a model version.

---

## 15.4 — Serving and Inference Engineering

**Objective.** Serve predictions with predictable latency and cost.

### Module 15.4.1 — The inference service

- API contract: request/response schema, validation, error codes.
- Batching: static versus dynamic and the latency/throughput trade-off.
- Concurrency model: sync workers, async, and worker pools.
- Warm-up, model loading, and cold-start behaviour.
- Timeouts, retries, and idempotency keys.
- Graceful degradation: cheap model, cached answer, or rule-based fallback.

$$
\text{throughput}=\frac{\text{concurrency}}{\text{latency}},\qquad
\text{capacity}=\text{peak RPS}\times\text{headroom factor}
$$

**Practice tasks**

- Load test a service at 1×, 5×, and 10× expected traffic and record p50/p95/p99.
- Add dynamic batching for a GPU service and report the throughput gain and latency cost.

---

### Module 15.4.2 — Inference options

- Own servers, managed endpoints, serverless, and batch transforms.
- GPU utilisation and the cost of idle capacity.
- Quantisation and distillation for serving (reuse 9.8).
- Serving LLMs: continuous batching, KV cache, and paged attention.
- Multi-model serving and per-tenant isolation.
- Choosing the cheapest option that meets the latency SLO.

**Practice tasks**

- Cost three serving options for the same model and pick one with a written justification.
- Measure GPU utilisation during a realistic traffic pattern and identify idle capacity.

---

### Module 15.4.3 — Caching and cost control

- Prediction caching and cache-key design (including feature freshness).
- Embedding caching and semantic caching for LLM systems.
- Batch offline work to spot instances.
- Budget alarms and per-tenant quotas.
- Measuring cost per successful prediction after retries.

$$
\text{cost per success}=\frac{\text{total cost}}{\text{successful predictions}}
\quad\text{(retries and failures are part of the cost)}
$$

> **Module completion gate (15.4).** Your service meets a stated latency SLO under load, with a measured cost per 1,000 predictions.

---

## 15.5 — Deployment Strategies

**Objective.** Change production without breaking it.

### Checklist

- Shadow deployment: run the new model on live traffic without acting on it.
- Canary: route a small percentage, compare guardrails, then widen.
- Blue/green: instant switch and instant rollback.
- Feature flags for model selection, including per-segment rollout.
- Rollback triggers: error rate, latency, and guardrail metrics.
- Model and feature compatibility during rollout — the subtle failure.
- Database and schema migrations that cannot break the previous version.
- A tested rollback: a rollback you have not run is a wish.

### Practice tasks

- Ship a model change as a canary with automatic rollback on a guardrail breach.
- Break backwards compatibility deliberately and prove the rollback still works.

> **Module completion gate (15.5).** You have executed a canary rollout and a rollback, and can state the metric that triggered it.

---

## 15.6 — Monitoring and Observability

**Objective.** Find out about problems before users do.

### Module 15.6.1 — The four signals

- **System:** latency percentiles, error rates, saturation, queue depth.
- **Data:** schema violations, null rates, range violations, category drift.
- **Model:** prediction distribution, confidence, calibration, drift scores.
- **Outcome:** business metric proxies and delayed labels.

$$
\text{PSI}=\sum_i\left(p^{\text{new}}_i-p^{\text{old}}_i\right)\ln\frac{p^{\text{new}}_i}{p^{\text{old}}_i}
$$

**Practice tasks**

- Instrument all four signals for one service and build a single dashboard.
- Induce a data-schema fault and confirm the data signal fires before the model metric moves.

---

### Module 15.6.2 — Tracing and debugging

- Correlation IDs through feature fetch, model, and post-processing.
- Structured logs with consistent fields and PII redaction.
- Distributed tracing with OpenTelemetry spans.
- Sampling strategies for high-volume traffic.
- Reproducing a bad prediction from a trace alone.

**Practice tasks**

- Trace one request end to end and identify where the latency goes.
- Debug a wrong prediction using only logs and traces, without access to the model.

---

### Module 15.6.3 — Alerting and on-call

- Alert on symptoms users feel, not on every metric that moves.
- Thresholds, windows, and burn-rate alerts for SLOs.
- Alert fatigue and how to fix it (deletion is a feature).
- Runbooks: symptom, diagnosis steps, mitigation, escalation.
- Severity levels and the decision to fall back to a simpler model.
- Post-incident reviews without blame and with follow-through.

| Signal | Alert | Action |
|---|---|---|
| p95 latency > SLO 2× for 10 min | page | scale out, then investigate |
| Error rate > 2% for 5 min | page | roll back last deploy |
| Feature null rate > 5% | ticket | check upstream pipeline |
| Prediction distribution shift | ticket | evaluate, consider retrain |
| Delayed-label accuracy drop | page | investigate, roll back |

> **Module completion gate (15.6).** A teammate on call can diagnose your service's three most likely failures using your dashboard, traces, and runbook alone.

---

## 15.7 — Retraining, Drift and Continuous Delivery

**Objective.** Keep the model good after launch.

### Checklist

- Retraining triggers: schedule, drift threshold, performance drop, and data arrival.
- Retraining cadence versus model volatility and label delay.
- Automatic versus human-approved promotion.
- Continuous training pipelines with the same gates as manual deploys.
- Drift simulation to prove your monitors would fire.
- Model staleness and the cost of a stale model in currency.
- Backfill and re-scoring when a model changes retroactively.

### Practice tasks

- Build a drift-triggered retraining pipeline with a human approval step.
- Simulate 30 days of drift and show the alert firing before the outcome metric degrades.

> **Module completion gate (15.7).** Retraining happens on evidence, not on a calendar alone.

---

## 15.8 — Data, Security and Compliance Operations

**Objective.** Ship without creating a breach or a legal problem.

### Checklist

- Secrets management: rotation, scoping, and no secrets in images or logs.
- Least-privilege access to data and model endpoints.
- PII handling: detection, redaction, retention, and deletion propagation.
- Audit logging of who did what to which model and dataset.
- Model access control and per-tenant isolation.
- Supplier risk for hosted models: data retention, training use, and availability.
- Incident response plan for a data leak, including notification duties.
- Compliance evidence: data-flow diagrams, DPIA-style assessments, model cards.

### Practice tasks

- Run a secrets scan across a repository and fix every finding.
- Implement a deletion request path that reaches the model, the features, and the caches.

> **Module completion gate (15.8).** You can answer "where does this user's data go, and how do we delete it?" with a diagram.

---

## 15.9 — Testing ML Systems

**Objective.** Test more than the model's accuracy.

### Checklist

- Unit tests for feature functions and data validation.
- Data tests: schema, ranges, uniqueness, and distribution sanity.
- Model behavioural tests: invariance, monotonicity, and golden cases.
- Slice regression tests: no slice may regress beyond a threshold.
- Integration tests against real interfaces, with recorded fixtures.
- Performance tests: load, soak, and failure injection.
- Contract tests between the pipeline and the serving layer.
- CI gates: no merge without the suite, and no deploy without the gates.

### Practice tasks

- Build a behavioural test suite with ten golden predictions and five invariance checks.
- Break a feature transform and confirm CI blocks the merge.

> **Module completion gate (15.9).** CI catches a data bug, a model regression on a slice, and a serving contract break — before merge.

---

## 15.10 — Cost, Reliability and Capacity

**Objective.** Keep the system affordable and available.

### Checklist

- Cost attribution by model, endpoint, and tenant.
- Unit economics: cost per prediction versus revenue per prediction.
- Autoscaling policies and scaling lag.
- Capacity planning with peak factors and growth forecasts.
- Multi-region and disaster recovery for model services.
- SLOs, error budgets, and what to do when the budget is spent.
- Cheapest reliable design: batch where possible, cache aggressively, degrade gracefully.

$$
\text{error budget}=1-\text{SLO};\qquad
\text{remaining budget drives feature velocity}
$$

### Practice tasks

- Compute the monthly cost of your service at 1×, 10×, and 100× traffic.
- Identify the single largest cost driver and propose an intervention with an estimated saving.

> **Module completion gate (15.10).** You can state cost per prediction, the capacity headroom, and the plan for 10× traffic.

---

## 15.11 — Level 15 Capstone: MLOps Platform

### Project: `mlops-platform` — one model, operated for two weeks

**Difficulty.** Expert

**Purpose.** Prove you can own a model in production. This is the artefact that hiring managers trust most, because it is the one most candidates cannot produce.

### A. Functional requirements

**Pipeline**

- Four+ stage pipeline, orchestrated, idempotent, and re-runnable per stage.
- Data validation with contracts, failing loudly.
- Training with tracked experiments and pinned environment.
- Automated evaluation with gates; promotion only on passing.
- Registry entry with model card and lineage.

**Service**

- Containerised inference service with a documented API and error contract.
- Canary deployment with automatic rollback on a guardrail breach.
- Dynamic batching or equivalent throughput improvement, measured.
- Fallback path when the model or a dependency is unavailable.

**Observability**

- Dashboards for system, data, model, and outcome signals.
- Distributed tracing with correlation IDs and PII redaction.
- Alerts on SLO breaches with links to runbooks.

**Operations**

- Retraining triggered by drift or schedule, with approval.
- Three runbooks: latency spike, data-schema break, model-quality regression.
- One incident deliberately induced, diagnosed, and reviewed.

**Economics**

- Cost per 1,000 predictions measured, with the dominant driver identified.
- A capacity plan for 10× traffic.

### B. Suggested architecture

```text
             ┌──────────── orchestrated pipeline (daily / drift) ────────────┐
data source ─► ingest ─► validate ─► featurise ─► train ─► evaluate ─► gate ─► registry
                                                              │
                                                              ▼
client ─► API gateway ─► inference service (canary/blue-green) ─► model vN
              │                   │                  │
              ▼                   ▼                  ▼
           metrics            traces             logs (PII redacted)
              │                   │                  │
              └──────────► dashboards + alerts + runbooks ◄──────────┘
                                     │
                                     ▼
                            drift monitor ─► retrain trigger
```

### C. Suggested repository structure

```text
mlops-platform/
├── pipeline/
│   ├── dags/                 # or flows/jobs
│   └── stages/{ingest,validate,features,train,evaluate,register}.py
├── service/
│   ├── app.py
│   ├── schemas.py
│   ├── batching.py
│   └── Dockerfile
├── infra/
│   ├── terraform/            # or a documented manual setup
│   └── k8s/ or compose/
├── observability/
│   ├── dashboards/
│   ├── alerts/
│   └── runbooks/{latency,data,schema,quality}.md
├── registry/
│   └── models.yaml
├── tests/
│   ├── unit/ · data/ · behavioural/ · integration/ · load/
└── docs/
    ├── design_doc.md
    ├── slo.md
    └── incident_report.md
```

### D. Acceptance targets

| Component | Target |
|---|---|
| Reproducibility | Any registered model rebuilds from metadata within tolerance |
| Deployment | Canary executed with automatic rollback; rollback tested |
| Latency | p95 within the stated SLO at 3× expected load |
| Cost | Cost per 1,000 predictions measured; dominant driver identified |
| Monitoring | All four signal types instrumented; alerts fire in a drill |
| Retraining | Trigger fires on simulated drift and pauses for approval |
| Incident | One incident induced, detected in < 10 min, reviewed |
| Runbooks | A teammate resolves one incident without asking you |
| Security | No secrets in repo or logs; PII redaction verified |

### E. Stretch goals

- Terraform the whole environment and rebuild it from scratch.
- Add a shadow deployment comparing two models on live traffic.
- Implement per-tenant cost attribution and quotas.
- Add a model-quality canary that compares predictions on a fixed probe set.
- Run a chaos experiment: kill the model pod and confirm graceful degradation.

### F. Acceptance criteria

| Area | Required evidence |
|---|---|
| **Lifecycle** | Train → gate → register → deploy → monitor → retrain, all automated |
| **Safety** | Tested rollback and fallback, not just documented |
| **Observability** | Traces, dashboards, and alerts that caught a real induced fault |
| **Economics** | Cost per prediction with a stated driver and a saving plan |
| **Operability** | Runbooks that another person used successfully |
| **Documentation** | Design doc, SLO doc, and incident report |

> Level 15 is complete when someone else can operate your system for a week without escalating to you.

---

## Level 15 interview question bank

### A. Design and requirements

- How do you turn a product requirement into NFRs?
- When would you choose batch over real-time serving?
- What belongs in an ML design doc that does not belong in a software design doc?
- How do you set an SLO, and what do you do when the error budget is spent?

### B. Pipelines and reproducibility

- How do you make a training pipeline idempotent?
- How do you guarantee a deployed model can be retrained?
- What is training-serving skew, and how do you test for it?
- How do you version data, features, code, and models together?

### C. Serving

- Where does latency go in an inference request, and how do you measure it?
- What does dynamic batching trade?
- How would you halve inference cost without losing quality?
- How do you handle model cold starts?
- What is graceful degradation, and what does it look like for your service?

### D. Deployment and operations

- Explain canary versus shadow versus blue/green with a failure each catches.
- What triggers a rollback, and who decides?
- Walk me through your alerting philosophy.
- Your p95 doubled overnight with no deploy. What do you check, in order?
- How do you retrain without breaking backward compatibility?

### E. Security and cost

- How do you keep secrets out of images, logs, and repositories?
- How would you implement a user deletion request end to end?
- What is your cost per 1,000 predictions, and what dominates it?
- What would you do first if the GPU bill doubled?

### Interview readiness standard

1. Draw the pipeline or the request path.
2. Name the failure mode and its detection.
3. State the SLO and the measured number.
4. Give the cost and the dominant driver.
5. Describe the rollback, and say when you actually ran it.

---

## Level 15 final assessment

### Knowledge

- I can write NFRs and a design doc that survives review.
- I can build an idempotent, stage-wise training pipeline.
- I can run a registry with promotion gates and lineage.
- I can serve with measured latency and cost, with fallbacks.
- I can deploy with canary and roll back safely.
- I can monitor system, data, model, and outcome signals.
- I can retrain on drift with human approval.
- I can test ML systems beyond model accuracy.
- I can manage secrets, PII, and audit requirements.

### Practical skills

- I have run a pipeline end to end from data to registry.
- I have executed a canary and a rollback.
- I have induced an incident and diagnosed it from telemetry.
- I have written runbooks another person used.
- I have measured cost per 1,000 predictions and planned for 10× traffic.

### Project

- `mlops-platform` passes every acceptance target.
- The incident report is honest about detection time and root cause.
- A teammate operated the system without me.

> **Level 15 completion rule.** If you can hand someone the keys and go on holiday, you are ready for Level 16.

---

# LEVEL 16 — ML SYSTEMS AND SCALABILITY

> **Goal.** Design ML systems that survive scale, failure, and change — and defend those designs under interview conditions. This is the level that decides senior-versus-junior in system design rounds.

## Level dashboard

| Item | Details |
|---|---|
| **Level** | 16 — ML Systems and Scalability |
| **Difficulty** | Expert |
| **Suggested duration** | 6–8 weeks |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Core tools** | Whiteboard, back-of-envelope maths, queueing intuition, your L15 build as evidence |
| **Main project** | **`system-design-vault`** — three full designs plus one load-tested implementation |
| **Final outcome** | Produce a complete, defensible ML system design in 45 minutes, with numbers for scale, latency, cost, and failure. |

**Prerequisites.** Level 15. You cannot design a system you have never operated; every design claim in this level should be traceable to something you built.

---

## 16.1 — The Design Framework

**Objective.** Have a repeatable structure so you never ramble in a design interview.

### Module 16.1.1 — The seven-step frame

1. **Clarify** — users, decisions, scale, latency, freshness, cost, constraints.
2. **Frame** — prediction target, label source, feedback loop, offline versus online.
3. **Data** — sources, volume, quality, labelling plan, point-in-time needs.
4. **Model** — baseline, candidate approaches, evaluation, why this one.
5. **Serve** — architecture, stages, caching, degradation, latency budget.
6. **Operate** — monitoring, retraining, drift, on-call, rollback.
7. **Trade-offs** — what you gave up, what breaks at 10×/100×, and what you would do first.

**Practice tasks**

- Write the seven headings on a card and rehearse using them against three prompts.
- Time-box each step for a 45-minute interview (5/5/10/10/8/4/3 minutes).

---

### Module 16.1.2 — Requirements that change the design

- User scale and requests per second — the first question that matters.
- Latency tolerance: 20 ms, 200 ms, and 2 s lead to different architectures.
- Freshness: seconds versus hours changes feature and serving design.
- Cost ceiling per prediction and per month.
- Data availability: do labels exist, and how late do they arrive?
- Regulatory and privacy constraints that forbid an option entirely.

| Requirement | Design consequence |
|---|---|
| p99 < 50 ms | precomputed features, no cross-encoder, small model |
| labels arrive 30 days late | proxy metrics, delayed evaluation window |
| 500M items to rank | candidate generation before ranking |
| no PII may leave the region | self-hosted or regional model deployment |
| USD 0.50 per 1,000 predictions | distillation, quantisation, caching, routing |

**Practice tasks**

- For one product, write three requirement sets that would produce three different designs.
- Identify the requirement that eliminates the most expensive option, and say so out loud.

> **Module completion gate (16.1).** You can run the seven steps in 45 minutes, in order, without skipping requirements.

---

## 16.2 — Back-of-Envelope Estimation

**Objective.** Put numbers on a whiteboard before drawing boxes.

### Checklist

- QPS from daily active users and actions per session.
- Peak factor: typically 2–5× average, and what drives the peak.
- Storage: rows × bytes × replication × retention.
- Model size and memory: parameters × bytes per parameter.
- Compute: FLOPs per inference and the hardware's effective throughput.
- Network: payload size × QPS.
- Cost: instance-hour rate × count, plus storage and egress.

$$
\text{QPS}\approx\frac{\text{DAU}\times\text{actions per session}}{86{,}400},\qquad
\text{peak}=\text{QPS}\times\text{peak factor}
$$

$$
\text{memory for weights}=N_{\text{params}}\times\text{bytes per parameter},\qquad
\text{batch size}\times\text{activations}+\text{weights}\le\text{VRAM}
$$

**Practice tasks**

- Estimate QPS, storage, and GPU count for a feed-ranking system at 10M DAU.
- Show the arithmetic for a model that must fit in 16 GB of VRAM, including KV cache.

> **Module completion gate (16.2).** You can produce credible QPS, storage, memory, and cost numbers in under five minutes, out loud.

---

## 16.3 — Training Systems at Scale

**Objective.** Design the pipeline that produces models, not just the one that serves them.

### Checklist

- Data ingestion volume and throughput requirements.
- Distributed training strategy: data, tensor, pipeline, and sharding.
- Checkpointing strategy and cost of the checkpoint interval.
- Experiment throughput: how many runs per week can the system support?
- Feature computation at scale: offline batch versus streaming.
- Label pipelines and their latency.
- Cost model for training: GPU-hours per model version.
- Reproducibility across a fleet of heterogeneous workers.

$$
\text{train cost}=\text{GPU-hours}\times\text{hourly rate},\qquad
\text{GPU-hours}=\frac{\text{total tokens}\times\text{FLOPs per token}}{\text{hardware throughput}\times\text{utilisation}}
$$

### Practice tasks

- Estimate the GPU-hours to retrain a model weekly for a year, and the annual cost.
- Design a training pipeline that supports 50 experiment runs per week without queueing chaos.

> **Module completion gate (16.3).** You can state the training cost of a model version and justify the retraining cadence.

---

## 16.4 — Serving and Inference at Scale

**Objective.** Scale the request path without breaking latency.

### Module 16.4.1 — Latency budgets and fan-out

- Break the budget per stage: gateway, auth, feature fetch, model, post-process, serialisation.
- Fan-out cost: five downstream calls at p99 each combine badly.
- Tail at scale: one slow shard determines the request's p99.
- Hedged requests and their cost.
- Caching layers and where they sit.

$$
\text{combined }p99\approx\max_i p99_i\ \text{for serial stages};\qquad
\text{fan-out of }k\text{ calls worsens the tail with }k
$$

**Practice tasks**

- Build a latency budget table for a request with six stages and a 200 ms p95 SLO.
- Compute how a 5 ms p99 feature call becomes a 40 ms problem under fan-out of 20.

---

### Module 16.4.2 — Candidate generation and ranking

- Two-stage architecture: retrieve cheaply, rank expensively.
- Candidate sources: popularity, collaborative, embedding ANN, rules.
- Recall ceiling: the ranking stage cannot fix what retrieval missed.
- ANN index trade-offs: recall versus latency versus memory.
- Multi-stage ranking and the marginal value of each stage.

$$
\text{final quality}\approx\text{recall}_{\text{retrieval}}\times\text{precision}_{\text{rank}}
$$

**Practice tasks**

- Specify a retrieval plan for 100M items with a 10 ms budget per query.
- Compute how much of the recall ceiling the ranker can actually recover.

---

### Module 16.4.3 — Scaling patterns

- Horizontal scaling, sharding, and partitioning by entity.
- Hot keys and celebrity problems; mitigation by replication and caching.
- Queueing: async inference and the user-experience cost of waiting.
- Autoscaling lag and pre-warming during a traffic spike.
- GPU pooling, multi-model serving, and isolation between tenants.

> **Module completion gate (16.4).** You can defend a serving design under "what breaks at 100×?" without hand-waving.

---

## 16.5 — Data Systems for ML

**Objective.** Design storage and pipelines that feed training and serving correctly.

### Checklist

- Lake, warehouse, and lakehouse choices and their consequences.
- Batch versus streaming pipelines, and their latency/cost curves.
- Feature store concepts: offline/online parity, point-in-time joins, TTL.
- Event schema design and evolution.
- Data quality gates and quarantine paths.
- Retention, archival, and the cost of keeping everything.
- Backfill strategy and its interaction with model versioning.

### Practice tasks

- Design the data flow for features that must be identical in training and serving.
- Plan a backfill that does not corrupt online state.

> **Module completion gate (16.5).** You can explain how a feature reaches both training and serving identically, with a diagram.

---

## 16.6 — Reliability Engineering for ML

**Objective.** Design for failure you have not personally seen.

### Checklist

- Failure taxonomy: dependency, capacity, data, model, and human error.
- Graceful degradation ladder: full model → smaller model → cached → heuristic → refuse.
- Timeouts, retries with jitter, circuit breakers, and bulkheads.
- Idempotency for writes and scoring requests.
- Blast radius reduction: per-tenant quotas and feature flags.
- Failover between regions and providers.
- Chaos experiments you can actually run.

| Failure | Detection | Mitigation |
|---|---|---|
| Feature store down | timeout rate | cached features, then heuristic |
| Model server OOM | error rate, restarts | reduce batch, restart, route to replica |
| Upstream schema change | data validation alert | quarantine, serve last-good |
| Traffic spike | queue depth, p99 | autoscale, shed low-priority traffic |
| Bad model deployed | guardrail metric | automatic rollback |

### Practice tasks

- Design a degradation ladder for a fraud system and state the precision cost of each rung.
- Run a failure-injection test and measure whether degradation or outage occurred.

> **Module completion gate (16.6).** Every dependency in your design has a failure mode, a detection, and a defined degraded behaviour.

---

## 16.7 — Cost and Capacity Modelling

**Objective.** Know what the system costs before it exists.

### Checklist

- Unit economics: cost per prediction, per user, per 1,000 requests.
- Cost drivers ranked, with the largest one addressed first.
- Fixed versus variable cost, and how the mix changes with scale.
- Break-even analysis for a new model or feature.
- Reserved versus on-demand versus spot capacity.
- The hidden costs: monitoring, storage growth, egress, and on-call time.

$$
\text{monthly cost}=\text{fixed}+\text{per-request}\times\text{requests}+\text{storage growth}\times\text{retention}
$$

### Practice tasks

- Build a cost model spreadsheet for a system at 1M, 10M, and 100M requests per month.
- Find the request volume at which a cheaper model with more infrastructure becomes optimal.

> **Module completion gate (16.7).** You can produce a credible monthly cost model with a sensitivity analysis on the top driver.

---

## 16.8 — The Worked Designs

**Objective.** Practise the prompts that actually appear in interviews.

### Module 16.8.1 — Recommendation and ranking

- Candidate generation, ranking, re-ranking, and diversity constraints.
- Cold start for users and items.
- Feedback loops and position bias.
- Evaluation: offline nDCG, online engagement, and long-term value.
- Scale: 100M items, 10M users, p99 under 150 ms.

**Practice tasks**

- Deliver a full design in 45 minutes with QPS, storage, latency budget, and failure modes.
- Prepare the "what breaks at 100×" answer in three sentences.

---

### Module 16.8.2 — Fraud and risk

- Extreme imbalance, adversarial drift, and label delay.
- Rules plus model, and how they compose.
- Real-time features with velocity windows.
- Precision at a fixed alert budget and human review capacity.
- Explainability requirements for adverse actions and appeals.

**Practice tasks**

- Design a fraud system where a false positive blocks a legitimate customer, and state the policy.
- Quantify the cost of both error types and derive the threshold.

---

### Module 16.8.3 — Search and document intelligence

- Retrieval architecture, ranking, and query understanding.
- Permissions-aware retrieval and document isolation.
- Index freshness and incremental updates.
- Extraction pipelines with human review.
- Latency budget for retrieval plus generation.

**Practice tasks**

- Design enterprise search across 50M documents with access control and a 300 ms budget.
- Design an invoice pipeline at 5M documents per month with cost per document.

---

### Module 16.8.4 — LLM systems at scale

- Serving stacks, continuous batching, and KV-cache economics.
- Routing between models by task difficulty.
- Prompt and response caching with correctness caveats.
- Safety filtering in the request path and its latency cost.
- Cost per task and the economics of the free tier.

**Practice tasks**

- Design a customer-support assistant serving 2M conversations per month with a cost ceiling.
- Compute the KV-cache memory at 32k context and the maximum concurrent sessions.

> **Module completion gate (16.8).** You have delivered at least three of these designs aloud, with numbers, under a timer.

---

## 16.9 — Communicating Design

**Objective.** Make the drawing do the explaining.

### Checklist

- Diagram conventions: data flow, training path, serving path, control plane, and observability.
- Labelling with numbers, not adjectives.
- Presenting trade-offs as tables, not prose.
- Saying "I would measure X before choosing" instead of guessing.
- Admitting unknowns without losing the thread.
- Handling interruptions and returning to the structure.

### Practice tasks

- Draw the same system twice: once for an engineer, once for a product stakeholder.
- Present a design in ten minutes and count the questions you could not answer.

> **Module completion gate (16.9).** A reviewer can redraw your system from your explanation.

---

## 16.10 — Judgement Under Interview Conditions

**Objective.** Be assessed well, not just be right.

### Checklist

- Clarify before designing; two minutes saves ten.
- State assumptions explicitly and invite correction.
- Choose a baseline architecture, then improve it out loud.
- Prioritise: say what you would do first with limited time.
- Answer the asked question, then add one valuable insight.
- Stay honest: "I have not operated that at this scale; here is how I would reason about it."
- Close with risks and next steps.

> **Module completion gate (16.10).** You can hold the seven-step frame under interruption without losing structure.

---

## 16.11 — Level 16 Capstone: System Design Vault

### Project: `system-design-vault` — three designs and one build

**Difficulty.** Expert

**Purpose.** Produce a reusable, defensible design portfolio and back one design with a working, load-tested implementation.

### A. Functional requirements

**Part 1 — Three written designs**

Choose three prompts from 16.8 (at least one from recommender/search, one from risk or document intelligence, one LLM system). Each design must include:

- Requirements with numbers (QPS, latency, freshness, cost ceiling).
- Back-of-envelope estimates for storage, compute, and memory.
- Data and labelling plan, including delay.
- Model approach with rejected alternatives.
- Serving architecture diagram with per-stage latency budgets.
- Monitoring and retraining plan.
- Failure-mode table with detection and degradation.
- Cost model at 1×, 10×, 100× scale.
- Three questions you would be asked, with answers.

**Part 2 — One load-tested build**

- Implement a simplified but real version of one design.
- Include candidate generation plus ranking, or equivalent multi-stage logic.
- Load test at 1×, 5×, and 10× expected traffic.
- Report p50/p95/p99, throughput, error rate, and cost per 1,000 requests.
- Document where the implementation diverges from the design and why.

**Part 3 — Rehearsal record**

- Record three 45-minute design sessions (self or with a peer).
- Written debrief per session: what you skipped, where you lost structure, timing per step.
- One page of "questions I could not answer" with the answers you researched afterwards.

### B. Suggested architecture

```text
system-design-vault/
├── designs/
│   ├── 01_recommender.md
│   ├── 02_fraud.md
│   └── 03_llm_assistant.md
├── estimates/
│   └── envelope_calculator.ipynb
├── build/
│   ├── src/ (retrieval + ranking, or the chosen design)
│   ├── load/ (k6/locust scripts)
│   └── reports/load_test.md
├── rehearsals/
│   ├── session_01/ (recording, debrief)
│   ├── session_02/
│   └── session_03/
└── README.md
```

### C. Acceptance targets

| Component | Target |
|---|---|
| Designs | Three complete designs with all nine sections |
| Numbers | Estimates reproducible from a calculator script |
| Latency | Per-stage budgets that sum within the p95 SLO |
| Load test | p99 measured at 10× expected traffic; bottleneck identified |
| Failure modes | Every dependency has a degradation path |
| Cost | Model at three scales with sensitivity on the top driver |
| Rehearsal | Three recorded sessions with timing debriefs |

### D. Stretch goals

- Implement the multi-stage ranking part and show recall versus latency for two ANN indexes.
- Add a chaos test that kills the model server and proves graceful degradation.
- Compare your cost model against a real bill from a cloud pricing calculator.
- Have a senior engineer review one design and record every gap they found.

### E. Acceptance criteria

| Area | Required evidence |
|---|---|
| **Structure** | Seven-step frame visible in all three designs |
| **Quantification** | QPS, storage, memory, latency, and cost numbers present |
| **Trade-offs** | Explicit rejections with reasons |
| **Reality** | One design implemented and load tested |
| **Failure** | Degradation ladder defined and partially tested |
| **Communication** | Diagrams a reviewer can redraw |

> Level 16 is complete when you can deliver any of your three designs cold, in 45 minutes, with numbers, and survive the follow-ups.

---

## Level 16 interview question bank

### A. Framework and requirements

- Walk me through how you approach an ML system design question.
- What clarifying questions do you always ask?
- Which requirement most often changes the architecture?
- How do you decide between batch and real-time?

### B. Estimation

- Estimate QPS for a product with 20M daily users.
- How much memory does serving a 7B model need, including KV cache at 8k context?
- How much does it cost to train a model weekly for a year?
- What is your peak-to-average ratio assumption, and why?

### C. Architecture

- Design a recommendation system for a cold-start marketplace.
- Design fraud detection where labels arrive after 30 days.
- Design enterprise search with per-user permissions.
- Where do you put caching, and what invalidates it?
- Why two-stage retrieval and ranking instead of one model?

### D. Scale and reliability

- What breaks first at 100× traffic in your design?
- How do you handle a hot key or celebrity user?
- What is your graceful degradation ladder, and what does each rung cost in quality?
- How do you prevent one bad model deployment from taking down the product?

### E. Cost and judgement

- How would you halve the cost without changing the user experience?
- When would you choose a smaller model and accept a quality drop?
- What would you cut if you had half the budget?
- What is the most likely cause of this system failing in its first month?

### Interview readiness standard

1. Clarify requirements with numbers.
2. Estimate before designing.
3. Draw the architecture with latency budgets.
4. Name the failure modes and the degradation.
5. State the cost and the scaling limit.

---

## Level 16 final assessment

### Knowledge

- I can run the seven-step frame under time pressure.
- I can produce QPS, storage, memory, and cost estimates aloud.
- I can design training and serving systems at scale.
- I can design a two-stage retrieval and ranking architecture.
- I can define a degradation ladder for every dependency.
- I can build a cost model with sensitivity analysis.
- I can present trade-offs as tables and diagrams.

### Practical skills

- I have written three complete designs with numbers.
- I have implemented and load tested one design at 10× traffic.
- I have recorded three rehearsals with timing debriefs.
- I have a failure-mode table with detection and mitigation for each dependency.
- I have a cost model that matches my measured numbers.

### Project

- `system-design-vault` passes every acceptance target.
- The load test identified a real bottleneck, not a hypothetical one.
- I can redraw any design from memory in five minutes.

> **Level 16 completion rule.** If you can design, quantify, defend, and degrade a system you have never built, you are ready for the final phase.

---

# PHASE 6 CAPSTONE — PRODUCTION ML SYSTEM

> **Purpose.** Combine Levels 15 and 16 into a single production-grade system: operated with real telemetry, designed for scale, and documented well enough that someone else can take call.

**Difficulty.** Expert
**Suggested duration.** 2–3 weeks
**Depends on.** Levels 15 and 16.

## A. The brief

Pick a product-shaped problem you have already modelled in an earlier phase, and take it all the way to production shape:

1. **Design it** using the seven-step frame, with numbers.
2. **Build it** with a reproducible pipeline, a versioned registry, and a deployment strategy.
3. **Operate it** with dashboards, alerts, runbooks, and a retraining trigger.
4. **Prove it** with load tests at 10× traffic, an induced incident, and a cost model.
5. **Hand it over** with a design doc, SLO doc, runbook, and incident report.

## B. Required deliverables

| # | Deliverable | What "done" looks like |
|---|---|---|
| 1 | Design doc | Seven-step frame, numbers, rejected alternatives |
| 2 | Estimates | QPS, storage, memory, cost — reproducible from a script |
| 3 | Pipeline | Idempotent, orchestrated, gated, reproducible |
| 4 | Registry | Versioned models with cards, lineage, promotion gates |
| 5 | Service | Containerised, schema-validated, with fallbacks and batching |
| 6 | Deployment | Canary executed; rollback tested |
| 7 | Observability | Four signal types, tracing, alerts with runbook links |
| 8 | Retraining | Drift-triggered with approval, gate-checked |
| 9 | Load test | p99 at 10× traffic; bottleneck named |
| 10 | Incident | One induced, detected, diagnosed, reviewed |
| 11 | Cost model | At 1×, 10×, 100×; dominant driver and intervention |
| 12 | Handover pack | Design doc, SLO, runbooks, incident report, model card |

## C. Suggested architecture

```text
                       ┌────────────── design & estimates ──────────────┐
                       │  seven-step frame · envelope calculator        │
                       └────────────────────────┬───────────────────────┘
                                                ▼
data ─► ingest ─► validate ─► features ─► train ─► evaluate ─► gate ─► registry
                                                                          │
client ─► gateway ─► service (canary / blue-green) ◄───────────────────────┘
            │            │              │
            ▼            ▼              ▼
         metrics      traces         logs (redacted)
            │            │              │
            └──────► dashboards + SLO alerts + runbooks
                              │
                              ▼
                     drift monitor ─► retrain trigger ─► approval
```

## D. Grading rubric

| Dimension | 1 — Not yet | 3 — Competent | 5 — Strong |
|---|---|---|---|
| **Design** | No numbers | Requirements and estimates | Estimates validated against the built system |
| **Lifecycle** | Manual steps | Automated pipeline and registry | Gates, lineage, and one-command rebuild |
| **Operations** | Logs only | Dashboards and alerts | Traces, SLO burn alerts, tested runbooks |
| **Reliability** | No fallback | Fallback documented | Fallback exercised in a chaos test |
| **Scale** | Untested | Load tested at expected traffic | Load tested at 10× with the bottleneck identified |
| **Economics** | Unknown cost | Cost per prediction | Cost model with sensitivity and a saving plan |
| **Handover** | README | Runbooks | A teammate operated it for a week without escalation |

**Pass mark.** At least 3 in every dimension, with **Operations**, **Reliability**, and **Economics** at 4 or above.

## E. Defence questions

- Walk me through the request path and where the p95 goes.
- What is the first thing that breaks at 100× traffic, and how do you know?
- What happens when the feature store is unavailable for 60 seconds?
- How do you detect a silent quality regression that does not affect latency or errors?
- What does this system cost per 1,000 predictions, and what dominates it?
- Show me the rollback you actually ran.
- If I gave this to a new engineer on Monday, what would they be able to do by Wednesday?

---

# PHASE 6 FINAL ASSESSMENT

Complete this before starting Phase 7 (Career preparation).

## Knowledge checklist

**MLOps (L15)**

- I can write NFRs and a design doc that survive review.
- I can build an idempotent, orchestrated training pipeline.
- I can run a registry with lineage and promotion gates.
- I can serve with measured latency, cost, and fallbacks.
- I can deploy with canary and execute a rollback.
- I can instrument system, data, model, and outcome signals.
- I can retrain on drift evidence with approval.
- I can test data, model behaviour, and contracts in CI.
- I can manage secrets, PII, retention, and audit requirements.

**Systems (L16)**

- I can run the seven-step design frame under time pressure.
- I can estimate QPS, storage, memory, and cost aloud.
- I can design multi-stage retrieval and ranking.
- I can define degradation ladders for every dependency.
- I can build and defend a cost model.
- I can articulate what breaks at 10× and 100×.

## Practical checklist

- [ ] Level 15 capstone (`mlops-platform`) passes its acceptance targets.
- [ ] Level 16 capstone (`system-design-vault`) has three designs and one load-tested build.
- [ ] Phase capstone scores at least 3 in every rubric dimension.
- [ ] I have executed a canary and a rollback, not just documented them.
- [ ] I have induced an incident and written an honest post-incident review.
- [ ] A teammate operated my system without escalating to me.
- [ ] I can deliver three system designs cold in 45 minutes.

## The self-honesty test

Answer these out loud, without notes. If any answer takes over 60 seconds, revisit that level.

1. Where does the p95 latency go in your request path?
2. What is your cost per 1,000 predictions, and what dominates it?
3. What breaks first at 100× traffic, and how would you detect it?
4. What is your degradation ladder when the model server dies?
5. Which alert would wake you up, and what would you do first?
6. How do you detect a silent quality regression?
7. Show me your rollback procedure, and when you last ran it.
8. What would you cut first if the budget halved?

> **Phase 6 is complete** when all three capstones pass and someone else can operate your system while you are offline.

---

# APPENDIX

## A. Estimation cheat sheet

| Quantity | Practical formula | Typical value |
|---|---|---|
| Average QPS | DAU × actions ÷ 86,400 | — |
| Peak QPS | average × peak factor | 2–5× average |
| Storage (year) | rows/day × bytes/row × 365 × replication | replication 3× |
| Model weights | params × bytes/param | FP16 = 2 B, INT8 = 1 B, INT4 = 0.5 B |
| Optimiser memory | params × 8 B (Adam FP32) | + gradients 4 B |
| KV cache | $2 L H_{kv} d_{\text{head}} T B \times$ bytes | grows linearly in context |
| Concurrency limit | VRAM ÷ (weights + cache + activations) | — |
| GPU throughput | tokens/s ≈ (FLOPS × utilisation) ÷ (2 × params) | utilisation 30–50% |
| Request cost | stage cost × QPS × 2.6M s/month | — |
| Latency budget | sum of stage p95s ≤ SLO / headroom | headroom 1.3–2× |
| Fan-out tail | worst-case serial p99 dominates | minimise chain depth |
| Monthly storage cost | GB × price per GB-month | tiered by class |
| Training cost | GPU-hours × price per GPU-hour | × number of runs |

## B. Formula sheet for Phase 6

| Topic | Formula |
|---|---|
| Throughput | concurrency ÷ latency |
| Capacity | peak RPS × headroom |
| Error budget | $1-\text{SLO}$ |
| Cost per success | total cost ÷ successful predictions |
| PSI | $\sum_i(p^{\text{new}}_i-p^{\text{old}}_i)\ln\frac{p^{\text{new}}_i}{p^{\text{old}}_i}$ |
| Monthly cost | fixed + per-request × requests + storage × retention |
| Training GPU-hours | (tokens × FLOPs/token) ÷ (throughput × utilisation) |
| Recall ceiling | final quality ≈ recall × precision |
| Latency sum | $\sum_{\text{stages}} p95_i \le \text{SLO}$ |
| Retry amplification | attempts × QPS = load on the dependency |
| Autoscale headroom | max(peak × 1.5, current + surge) |

## C. Twelve-week schedule

| Weeks | Focus | Milestone |
|---|---|---|
| 1 | L15: NFRs, design doc, serving patterns | Design doc reviewed |
| 2 | L15: reproducible pipelines, contracts | Idempotent pipeline running |
| 3 | L15: tracking, registry, promotion gates | Gated promotion working |
| 4 | L15: serving, batching, latency, cost | p95 measured under load |
| 5 | L15: deployment strategies, canary, rollback | Canary and rollback executed |
| 6 | L15: monitoring, tracing, alerting | Four signal types live |
| 7 | L15: retraining, drift, security, testing | Drift-triggered retrain with approval |
| 8 | L15 capstone **+ cost/capacity** | `mlops-platform` complete |
| 9 | L16: framework, requirements, estimation | Envelope calculator written |
| 10 | L16: training and serving at scale, ranking | Two designs drafted |
| 11 | L16: reliability, cost, worked designs | Third design + rehearsal |
| 12 | L16 capstone **+ phase capstone** | `system-design-vault` and production system complete |

> Do not skip the load test or the induced incident. They are the two exercises that convert theory into something you can talk about convincingly under questioning.

## D. Recommended resources

### Books

| Book | Use it for |
|---|---|
| *Designing Machine Learning Systems* — Huyen | the canonical ML systems text |
| *Machine Learning Engineering* — Burkov | end-to-end engineering practice |
| *Designing Data-Intensive Applications* — Kleppmann | storage, replication, streams |
| *Site Reliability Engineering* — Google | SLOs, error budgets, on-call |
| *The Site Reliability Workbook* | practical SLO and incident practice |
| *Release It!* — Nygard | circuit breakers and stability patterns |
| *Building Machine Learning Pipelines* — Hapke & Nelson | pipeline and CI/CD patterns |
| *Fundamentals of Software Architecture* — Richards & Ford | trade-off reasoning |

### Documentation and references

- MLflow, DVC, and feature-store documentation.
- Kubernetes and Terraform official tutorials (enough to read manifests).
- Prometheus and Grafana getting-started guides.
- OpenTelemetry specification for traces and spans.
- vLLM and Triton serving documentation.
- Cloud pricing calculators for cost modelling.
- Google SRE workbook chapters on SLOs and alerting.

### Practice

- **Load test everything** — k6 or Locust on your own service.
- **Chaos drills** — kill a pod, break a schema, expire a credential; watch what fires.
- **Cost modelling** — reproduce a real cloud bill for your service.
- **Design rehearsals** — record yourself; the recording is the feedback.
- **Post-incident reviews** — write one for every self-induced failure.

## E. The ten most common ways to fail this phase

| Failure | Symptom | Fix |
|---|---|---|
| Notebook-to-production leap | Nothing is versioned or reproducible | Pipeline stages with artefacts and gates |
| No NFRs | Cannot answer "is it fast enough?" | Write latency, cost, freshness upfront |
| Untested rollback | Rollback fails when needed | Run a rollback every release |
| Monitoring only system metrics | Silent quality drops go unnoticed | Instrument data, model, and outcome signals |
| Alert on everything | Fatigue, then ignored pages | Alert on symptoms and SLO burn |
| No fallback | Dependency outage becomes an outage | Degradation ladder, exercised |
| Unmeasured cost | Bill arrives as a surprise | Cost per prediction as a first-class metric |
| Design without numbers | Hand-wavy scaling claims | Estimation before architecture |
| Skipping load tests | Unknown bottleneck and ceiling | 10× load test with a named bottleneck |
| Runbooks nobody ran | Instructions that fail under stress | Have a teammate execute them |

## F. Progress tracker

| Level | Capstone | Deployed URL | p95 measured | Canary + rollback | Cost/1k | Incident reviewed | Handover done |
|---|---|---|---|---|---|---|---|
| L15 | `mlops-platform` | | ☐ | ☐ | ☐ | ☐ | ☐ |
| L16 | `system-design-vault` | | ☐ | ☐ | ☐ | ☐ | ☐ |
| Phase | Production ML system | | ☐ | ☐ | ☐ | ☐ | ☐ |

---

## What comes next

**Phase 7 — Career preparation · Levels 17–18**

| Level | Title | What it adds |
|---|---|---|
| **L17** | Portfolio and Research Capstone | Turning 17 levels of work into three defensible artefacts and a narrative |
| **L18** | Interview Preparation | Loops, drills, mock interviews, negotiation |

Phase 6 is the last phase where you build something new. Phase 7 is about making everything you have built legible to the people who hire and promote.

*Phase 6 of 6 · Levels 15–16 of 18 · Engineering*
