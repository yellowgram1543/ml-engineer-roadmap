# THE APPLIED SCIENTIST TRACK

**ML coding · SQL · ML theory · Probability · Experimentation · ML system design · CS fundamentals**

> **How to use this file.** It runs in parallel with the DSA plan at ~25 minutes/day from Day 1, and takes over Days 91–95. Everything here is interview-shaped: what gets asked, what a good answer contains, and what a weak answer sounds like.

**Who needs what:**

| Role | §1 ML coding | §2 SQL | §3 ML theory | §4 Probability | §5 Experimentation | §6 ML system design | §7 CS fundamentals |
|---|---|---|---|---|---|---|---|
| **SDE (generalist)** | optional | yes | no | light | no | replaces with HLD | **required** |
| **ML Engineer** | **required** | yes | **required** | yes | yes | **required** | light |
| **Applied Scientist** | **required** | yes | **required** | **required** | **required** | yes | light |

---

## §1 — The ML coding round

**Format.** 45–60 minutes, shared editor or whiteboard, **no scikit-learn**, usually "implement X from scratch" where X is a standard algorithm. Libraries allowed: NumPy at most. The interviewer is checking mathematical fluency and vectorisation, not API recall.

### 1.1 The twelve you must be able to write

| # | Implementation | What they check | Key formula |
|---|---|---|---|
| 1 | Linear regression, closed form | matrix algebra, shape discipline | $\hat\beta=(X^\top X)^{-1}X^\top y$ |
| 2 | Linear regression, gradient descent | loop structure, convergence check | $\beta \leftarrow \beta - \eta X^\top(X\beta - y)/n$ |
| 3 | Logistic regression + GD | sigmoid stability, log-loss | $p=\sigma(X\beta)$; $\nabla = X^\top(\hat p - y)/n$ |
| 4 | k-NN (with weighted vote) | distance, tie-breaking, complexity | $d=\lVert x - x_i\rVert_2$ |
| 5 | k-means (+ k-means++) | assignment/update loop, convergence | $\mu_k = \frac{1}{\lvert C_k\rvert}\sum_{i \in C_k} x_i$ |
| 6 | GMM + EM | E-step/M-step, log-likelihood | $r_{ik}=\frac{\pi_k \mathcal N(x_i\mid\mu_k,\Sigma_k)}{\sum_j \pi_j \mathcal N(x_i\mid\mu_j,\Sigma_j)}$ |
| 7 | PCA | centring, eigendecomposition, sign convention | $\Sigma = \frac{1}{n}X^\top X$; top eigenvectors |
| 8 | Softmax + cross-entropy + gradient | numerical stability | $\nabla_z L = \hat p - y$ |
| 9 | AUC-ROC | sorting, ties, O(n log n) | rank-based formula below |
| 10 | Precision / recall / F1 at a threshold | threshold sweep, zero-division | $F_1 = 2PR/(P+R)$ |
| 11 | Scaled dot-product attention | shapes, masking | $\mathrm{softmax}(QK^\top/\sqrt{d_k})V$ |
| 12 | Adam optimiser | moment updates, bias correction | below |

### 1.2 The AUC formula worth memorising

For binary labels with scores, AUC equals the probability a random positive outranks a random negative:

$$
\text{AUC} = \frac{\sum_{i \in P}\sum_{j \in N} \mathbb 1[s_i > s_j] + \tfrac12 \mathbb 1[s_i = s_j]}{\lvert P\rvert \cdot \lvert N\rvert}
$$

Rank-based equivalent with average ranks for ties:

$$
\text{AUC} = \frac{\sum_{i \in P} r_i - \frac{\lvert P\rvert(\lvert P\rvert+1)}{2}}{\lvert P\rvert \cdot \lvert N\rvert}
$$

**Follow-ups they will ask:** What is AUC when the classes are perfectly separable? (1.0.) What is it for a constant predictor? (0.5.) Why is AUC a poor choice under heavy class imbalance for a decision? (It is threshold-free and global; precision at a fixed recall is what the business needs.)

### 1.3 Adam, written out

$$
m_t = \beta_1 m_{t-1} + (1-\beta_1)g_t,\qquad v_t = \beta_2 v_{t-1} + (1-\beta_2)g_t^2
$$
$$
\hat m_t = \frac{m_t}{1-\beta_1^t},\qquad \hat v_t = \frac{v_t}{1-\beta_2^t},\qquad \theta_t = \theta_{t-1} - \eta\,\frac{\hat m_t}{\sqrt{\hat v_t}+\epsilon}
$$

**The question behind the question:** why bias correction? (Because $m_0 = 0$ biases early estimates toward zero, and the $1-\beta^t$ factor exactly cancels that.)

### 1.4 Numerical-stability points that earn marks

| Trap | Fix |
|---|---|
| `exp` overflow in softmax | subtract `max(z)` before exponentiating |
| `log(0)` in cross-entropy | clip probabilities, or use log-sum-exp on logits |
| Sigmoid saturation | compute in logit space; use `logaddexp` |
| Division by zero in precision/recall | define `0/0 = 1` for recall-of-empty, or use `np.errstate` and report undefined |
| Covariance singularity in PCA/GMM | add $\epsilon I$ or use SVD |
| Determinant underflow in GMM | work in log space with `logsumexp` |

### 1.5 The interview loop for an ML coding question

1. **Restate** and ask about input shapes (`n × d` or `d × n`? — commit to one and say it).
2. **Write the maths** in 3–5 lines before any code.
3. **Write the naive version**, then vectorise. Say what the loop costs.
4. **Test numerically**: a tiny case with hand-computed values, then a shape assertion.
5. **State complexity** in `n`, `d`, `k`, and iterations.
6. **Name one failure mode**: k-means with unbalanced clusters, logistic regression with separable data, PCA without centring.

### Practice tasks

- Implement all twelve in a single `ml_from_scratch.py`, each ≤ 30 lines, each with a test against a hand-computed case. One file, no notebooks.
- For each, write the one-sentence "when this fails".
- Re-implement three of them on a blank page in 45 minutes each, with no reference.
- Implement logistic regression **without** NumPy, pure Python lists, as a whiteboard drill.

> **Gate §1.** Eight of twelve implemented cold in 45 minutes each. Every one has a numerical-stability note and a stated complexity. You can derive the softmax gradient $\hat p - y$ in two lines on a whiteboard.

---

## §2 — SQL

**Format.** 30–45 minutes, 4–8 queries, escalating. Usually a schema is given and you write queries; occasionally you are asked to design the schema first.

### 2.1 The ten patterns

| Pattern | Technique | Canonical question |
|---|---|---|
| Latest record per group | `ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ts DESC) = 1` | "most recent order per user" |
| Top-N per group | `ROW_NUMBER`/`RANK` in a subquery, filter `<= N` | "top 3 products per category" |
| Running total | `SUM(x) OVER (PARTITION BY ... ORDER BY d)` | "cumulative revenue by day" |
| Lag/lead comparison | `LAG(ts) OVER (...)` | "days between consecutive logins" |
| Retention cohort | first-purchase month join, month offsets | "month-1 retention by cohort" |
| Funnel | conditional aggregation over events | "view → cart → purchase rates" |
| Deduplication | `GROUP BY` with `MIN`/`MAX`, or `DISTINCT ON` | "one row per user" |
| Self-join | alias twice | "employees earning more than their manager" |
| Anti-join | `LEFT JOIN ... WHERE b.id IS NULL` or `NOT EXISTS` | "users with no orders" |
| Pivot | conditional `SUM(CASE WHEN ...)` | "counts per status as columns" |

### 2.2 The one query you will be asked

> "For each user, return their most recent order."

```sql
SELECT user_id, order_id, amount, created_at
FROM (
  SELECT o.*,
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC, order_id DESC) AS rn
  FROM orders o
) t
WHERE rn = 1;
```

**Follow-ups:** Why `ROW_NUMBER` and not `RANK`? (RANK returns ties, which duplicates rows.) What if you need the *second* most recent? (`rn = 2`.) What if two orders share a timestamp? (Add a deterministic tiebreaker — that is why `order_id` is in the `ORDER BY`.)

### 2.3 Execution-order facts that separate candidates

| Fact | Consequence |
|---|---|
| `WHERE` runs before `GROUP BY`, `HAVING` after | You cannot filter on an aggregate in `WHERE` |
| Window functions run after `WHERE`/`GROUP BY` | You cannot filter on `ROW_NUMBER()` in the same `WHERE` — hence the subquery |
| `COUNT(*)` counts rows; `COUNT(col)` skips nulls | Classic wrong-answer source |
| `NULL` never equals anything | `<> 'x'` silently drops nulls; use `IS DISTINCT FROM` |
| `INNER JOIN` drops unmatched; `LEFT JOIN` keeps left | Anti-joins need `LEFT JOIN` + `IS NULL` |
| `UNION` deduplicates; `UNION ALL` does not | Performance and correctness both affected |

### 2.4 Practice set — 10 queries, 45 minutes

1. Users with more than 3 orders in the last 30 days.
2. Second-highest salary per department.
3. Daily active users, with a 7-day rolling average.
4. Month-over-month revenue growth rate.
5. Employees earning more than their manager.
6. Users who logged in on 3 consecutive days.
7. Products never ordered.
8. Funnel conversion: view → add-to-cart → purchase, per channel.
9. Month-1 retention by signup cohort.
10. Median order value per region (window function or `PERCENTILE_CONT`).

> **Gate §2.** All ten written without reference. You can explain why window functions need a subquery before filtering. You can state the difference between `COUNT(*)` and `COUNT(col)` under nulls in one sentence.

---

## §3 — ML theory, rapid-fire

**Format.** 20–40 short questions, answered verbally, 30–60 seconds each. Graded on correctness plus the ability to name a tradeoff.

| # | Question | A good answer contains |
|---|---|---|
| 1 | Bias–variance tradeoff | Decomposition $\mathbb E[(y-\hat f)^2] = \text{bias}^2 + \text{var} + \sigma^2$; where each comes from |
| 2 | Why does regularisation help? | Constrains hypothesis complexity; L2 shrinks, L1 sparsifies |
| 3 | L1 vs L2 geometrically | L1's diamond has corners on axes → exact zeros; L2's circle does not |
| 4 | Why is logistic regression "linear"? | Linear in log-odds, not in probability |
| 5 | Why not MSE for classification? | Non-convex in sigmoid, vanishing gradient on confident errors |
| 6 | Precision vs recall: when does each matter? | Cost asymmetry; give a concrete example each way |
| 7 | ROC-AUC vs PR-AUC | ROC is insensitive to prevalence; PR-AUC is the honest metric under imbalance |
| 8 | Calibration: what and why | Predicted probability should match observed frequency; reliability diagram, Brier score, Platt/isotonic |
| 9 | Cross-validation: k-fold vs stratified vs time-series | Independence assumption; leakage in temporal data if you shuffle |
| 10 | Data leakage: three examples | Target-derived features, fit-on-full-data scaling, duplicate rows across splits |
| 11 | Bagging vs boosting | Variance reduction vs bias reduction; parallelism vs sequential |
| 12 | Random forest vs GBM | RF reduces variance by averaging deep trees; GBM reduces bias by fitting residuals |
| 13 | Why do trees need pruning / depth limits? | Unbounded depth memorises noise |
| 14 | Feature importance: impurity vs permutation | Impurity is biased toward high-cardinality; permutation measures predictive contribution |
| 15 | Handle missing data | Deletion, imputation + missingness indicator, model-native handling; MCAR/MAR/MNAR |
| 16 | Imbalanced classes: five strategies | Resampling, class weights, threshold tuning, focal loss, metric change — and their costs |
| 17 | Batch norm: what problem does it solve? | Internal covariate shift is the folk explanation; the practical one is conditioning and higher LR |
| 18 | Batch norm at train vs eval | Running statistics at eval; a source of train/serve skew |
| 19 | Dropout: mechanism and inference | Random masking with `1/(1-p)` scaling; off at inference |
| 20 | Vanishing/exploding gradients | Depth × poor conditioning; fixes: residual connections, normalisation, careful init, clipping |
| 21 | Why residual connections? | Identity path keeps gradients O(1) through depth |
| 22 | Attention: complexity and why | $O(n^2 d)$; every position attends to every other |
| 23 | Why layer norm over batch norm for sequences? | Batch statistics are unstable across variable-length sequences and small batches |
| 24 | Self-attention vs cross-attention | Query source differs; cross-attention queries one sequence with keys from another |
| 25 | Positional encodings: why needed | Attention is permutation-invariant |
| 26 | Key vs value in attention | Keys score relevance; values carry content |
| 27 | Embedding vs one-hot | Dense, shared, learned similarity |
| 28 | Cosine vs Euclidean distance | Magnitude sensitivity; normalised embeddings |
| 29 | t-SNE vs PCA | PCA is linear and global; t-SNE is nonlinear, local, and distances between clusters are meaningless |
| 30 | Why does deep learning need so much data? | Parameter count vs sample complexity; the inductive bias is weaker than a tree's |
| 31 | Regularisation techniques in deep nets | Weight decay, dropout, early stopping, augmentation, label smoothing |
| 32 | Early stopping: what is it really doing? | Implicit regularisation toward small weights |
| 33 | Learning rate schedules | Warmup for stability, cosine/step decay for convergence |
| 34 | Transfer learning: when does it fail? | Domain gap too large; too little data to fine-tune; catastrophic forgetting |
| 35 | Fine-tune all layers vs last layer | Data volume and domain distance decide |
| 36 | LoRA: what and why | Low-rank adapters; trainable parameters drop by orders of magnitude |
| 37 | Quantisation: what breaks | Weight/activation precision loss; calibration needed for post-training quantisation |
| 38 | Distillation | Student matches soft targets; temperature controls the softness |
| 39 | Evaluation metric choice: one rule | The metric must mirror the decision the model informs |
| 40 | Offline vs online evaluation | Offline is proxy; only online measures causal impact |

### Practice method

Shuffle the table. Answer each in 45 seconds out loud. Record. Any answer that takes longer than 60 seconds, or that lacks a tradeoff, goes on the ledger.

> **Gate §3.** 30 of 40 answered in under 60 seconds with a named tradeoff. You can draw the bias–variance decomposition and the L1/L2 geometry on a whiteboard.

---

## §4 — Probability and statistics

| # | Question | Answer sketch |
|---|---|---|
| 1 | Expected value of a die roll | 3.5 |
| 2 | Expected number of tosses to see a head | 2 — geometric, mean $1/p$ |
| 3 | Expected number of tosses to see HH | 6; for HT it is 4 — the asymmetry is the lesson |
| 4 | Coupon collector: $n$ distinct coupons | $n H_n \approx n \ln n$ |
| 5 | Birthday problem: 23 people | > 50% chance of a shared birthday |
| 6 | Two children, one is a boy | 1/3 if "at least one", 1/2 if "the older one" — the wording is the question |
| 7 | Bayes with a 1% prevalence, 99% sensitivity and specificity | PPV ≈ 50% — base rate dominates |
| 8 | Linearity of expectation: does independence matter? | No — that is why it is powerful |
| 9 | Variance of a sum of independent variables | Sum of variances |
| 10 | Law of large numbers | Sample mean converges to the expectation |
| 11 | Central limit theorem | Standardised sum → normal; needs finite variance |
| 12 | When does the CLT fail? | Heavy tails (infinite variance), strong dependence |
| 13 | Confidence interval interpretation | 95% of such intervals cover the true parameter; not "95% probability the parameter is in this one" |
| 14 | p-value definition | Probability of data at least this extreme *given* $H_0$ |
| 15 | What a p-value is not | The probability that $H_0$ is true, or the effect size |
| 16 | Type I vs Type II error | False positive vs false negative; $\alpha$ vs $\beta$ |
| 17 | Power | $1-\beta$; increases with effect size, $n$, and lower variance |
| 18 | Multiple comparisons | Bonferroni (conservative), Holm, Benjamini–Hochberg (FDR) |
| 19 | Bootstrap: when does it fail? | Non-exchangeable data, extreme quantiles, tiny $n$ |
| 20 | Permutation test | Shuffle labels, recompute statistic, compare — exact under exchangeability |
| 21 | MLE of a Bernoulli | Sample mean |
| 22 | MLE of a Gaussian | Sample mean and sample variance (biased by $1/n$) |
| 23 | MAP vs MLE | Prior adds a penalty; L2 is a Gaussian prior, L1 a Laplace prior |
| 24 | Selection bias example | Survivorship bias, or filtering on the outcome |
| 25 | Simpson's paradox | Aggregation reverses the within-group effect; name the confounder |
| 26 | Correlation vs causation | Randomisation or a credible identification strategy |
| 27 | Confounder vs mediator vs collider | Adjust for the first, not the second, never the third |
| 28 | Fermi estimate: how many piano tuners in a city? | Structure the estimate, state assumptions, bound it |
| 29 | Expected value of a game with a twist | Define the random variable and the stopping rule |
| 30 | Sampling without replacement vs with | Hypergeometric vs binomial |

> **Gate §4.** 22 of 30 answered correctly in under 45 seconds. You can derive the PPV from sensitivity, specificity, and prevalence without hesitating.

---

## §5 — Experimentation and A/B testing

This section decides more applied-scientist offers than any algorithm question. Interviewers test whether you can design a trustworthy experiment.

### 5.1 The design checklist

| Step | Question | Failure if skipped |
|---|---|---|
| Hypothesis | What changes, for whom, and what is the expected direction? | Post-hoc storytelling |
| Unit of randomisation | User, session, or device? | Clustered treatment effects, underpowered analysis |
| Metric | One primary, two or three guardrails | Metric shopping and p-hacking |
| Sample size | Computed **before** launch | Underpowered test, false negatives |
| Duration | At least one full weekly cycle | Day-of-week confounds |
| Guardrails | Latency, error rate, unsubscribes, revenue | Winner on the primary, loser on the business |
| Analysis plan | Fixed-horizon or sequential | Peeking inflates false positives |

### 5.2 Sample size

$$
n \approx \frac{2\sigma^2\,(z_{1-\alpha/2}+z_{1-\beta})^2}{\Delta^2}
$$

For a proportion with baseline $p$ and absolute lift $\Delta$:

$$
n \approx \frac{2\,p(1-p)\,(z_{1-\alpha/2}+z_{1-\beta})^2}{\Delta^2}
$$

**Say this out loud:** "For 80% power at $\alpha = 0.05$, $z_{1-\alpha/2} + z_{1-\beta} \approx 1.96 + 0.84 = 2.80$." Then plug in.

### 5.3 The five questions you will be asked

| Question | A strong answer |
|---|---|
| "You peeked at day 3 and it looked significant. Now what?" | You cannot stop on a fixed-horizon test without inflating $\alpha$; use a sequential test (alpha spending, always-valid CI) or reset the horizon |
| "Novelty effect?" | Compare week 1 vs week 4 treatment effects; if it decays, you measured curiosity, not value |
| "Treatment wins on clicks, loses on revenue." | Guardrail triggered; investigate quality of clicks, then decide by long-run value |
| "Sample ratio mismatch — 50/50 became 51/49." | A bug: filtering, logging, or assignment. Stop and audit before analysing |
| "How would you find the effect faster?" | Variance reduction: CUPED on pre-period covariates, stratification, paired designs |

### 5.4 CUPED in one paragraph

Regress the post-period metric on a pre-period covariate, and analyse the residual:

$$
Y^{\text{cuped}} = Y - \theta\,(X - \mathbb E[X]),\qquad \theta = \frac{\mathrm{Cov}(Y, X)}{\mathrm{Var}(X)}
$$

This removes the part of the variance explained by the pre-period, shrinking the required sample size by roughly $1 - \rho^2$. It changes nothing about the estimand — only the variance.

### 5.5 Metric design

| Layer | Example | Property |
|---|---|---|
| **Primary** | 7-day retention | Pre-registered, single, decision-relevant |
| **Guardrail** | p95 latency, crash rate, unsubscribe rate | Must not regress |
| **Diagnostic** | click-through, session length | Explains *why*, never decides |
| **Counter-metric** | revenue per user, content diversity | Catches gaming |

> **Gate §5.** You can compute a sample size from scratch, explain peeking, name the four metric layers, and describe CUPED without notes.

---

## §6 — ML system design

**Format.** 45–60 minutes. "Design a system that does X." The interviewer scores structure, not completeness.

### 6.1 The seven-step frame

| Step | Content | Time |
|---|---|---|
| 1 · Clarify | Users, surface, scale (QPS, items, latency SLO), what "good" means | 5 min |
| 2 · Frame as ML | What is predicted, at what granularity, from what signal | 5 min |
| 3 · Data | Sources, labels (and how they are obtained), freshness, volume | 5 min |
| 4 · Features | Offline vs online, freshness, leakage risks | 5 min |
| 5 · Model | Baseline first, then candidate; loss and metric alignment | 5 min |
| 6 · Serving | Precompute vs on-the-fly, latency budget, fallback | 8 min |
| 7 · Operate | Monitoring, drift, retraining, feedback loops, failure modes | 7 min |
| — · Trade-offs | Name two decisions and what you gave up for each | 5 min |

### 6.2 Two designs to have rehearsed

**A · Recommendation**

- **Clarify:** 10M users, 1M items, p99 latency 200 ms, 20 recommendations per request.
- **Frame:** rank candidate items by $P(\text{click} \mid u, i)$; implicit feedback dominates.
- **Pipeline:** candidate generation (ANN over embeddings, 2000 → 200) → ranking model (200 → 20) → policy layer (diversity, filters).
- **Labels:** impressions with clicks; beware position bias — use inverse propensity weights or a position feature.
- **Serving:** user embedding lookup, ANN in memory, ranking model on GPU/CPU with a 50 ms budget, 20 ms policy, 30 ms network.
- **Operate:** monitor CTR by cohort, feature drift (PSI), embedding staleness, cold-start rate; retrain daily, evaluate offline with counterfactual metrics, then A/B.
- **Failure modes:** feedback loop collapse (popularity amplification), label delay, popularity bias.

**B · Fraud detection**

- **Clarify:** 5k TPS, p99 100 ms, cost of a false positive vs a missed fraud.
- **Frame:** $P(\text{fraud} \mid \text{transaction})$, extreme imbalance (~0.1%).
- **Data:** transactional, device, merchant, historical aggregates. Labels arrive weeks late — use chargeback windows and a delayed-label pipeline.
- **Features:** velocity counts, time since last transaction, device novelty, merchant risk — all leak-prone; compute as of the decision time.
- **Model:** gradient boosting baseline; PR-AUC as the metric; threshold chosen by the cost matrix.
- **Serving:** synchronous scoring inside the payment path with a strict timeout; fallback to rules.
- **Operate:** monitor precision at the operating threshold, alert on distribution shift, retrain weekly with a holdout on recent data.
- **Failure modes:** concept drift after a fraud ring changes tactics; label staleness masking degradation.

> **Gate §6.** Both designs delivered in 45 minutes each, with the seven steps visible and two explicit tradeoffs. You can state a latency budget that sums to the SLO.

---

## §7 — CS fundamentals (for SDE loops)

Two rounds' worth of material. Rapid-fire, one line each.

### 7.1 Operating systems

| Question | Answer |
|---|---|
| Process vs thread | Separate address spaces vs shared within a process; context switch cost differs |
| Deadlock: four conditions | Mutual exclusion, hold and wait, no preemption, circular wait |
| Deadlock prevention | Order lock acquisition; timeout and retry |
| Virtual memory: why? | Isolation, overcommit, and simpler allocation |
| Page fault | Access to a page not resident → OS loads it |
| Thrashing | Working set exceeds RAM; paging dominates execution |
| Mutex vs semaphore | Ownership vs counting |
| Context switch cost | Register save/restore plus cache pollution |
| User vs kernel mode | Privilege boundary for hardware access |
| Copy-on-write | Fork shares pages until a write |

### 7.2 Databases

| Question | Answer |
|---|---|
| ACID | Atomicity, consistency, isolation, durability |
| Isolation levels | Read uncommitted, read committed, repeatable read, serialisable |
| Phantom read | New rows appear in a repeated range query |
| Index structure | B+ tree: high fan-out, range scans via linked leaves |
| Why not hash index for range queries? | Hashing destroys order |
| Composite index order matters because | Leftmost-prefix rule |
| Normalisation vs denormalisation | Integrity vs read speed |
| Write-ahead log | Durability and crash recovery |
| CAP | Under a partition, choose consistency or availability |
| N+1 query problem | One query per row instead of a join/batch |

### 7.3 Networking

| Question | Answer |
|---|---|
| TCP vs UDP | Reliability and ordering vs latency and simplicity |
| Three-way handshake | SYN, SYN-ACK, ACK |
| Why does TLS need a handshake? | Key agreement plus authentication |
| HTTP/2 vs HTTP/1.1 | Multiplexing over one connection, header compression |
| DNS resolution order | Browser cache → OS → resolver → root → TLD → authoritative |
| Idempotency in HTTP | GET/PUT/DELETE idempotent; POST is not |
| Timeout vs retry with backoff | Prevent retry storms; add jitter |
| Load balancer L4 vs L7 | Connection-level vs request-level routing |

> **Gate §7.** All three tables answered at 45 seconds per item. You can name one thing you would measure to detect a problem in each layer.
