# PHASE 2 — CORE ML

**ML Engineer / Applied Scientist Roadmap · Levels 4–6 of 18**

> **Phase goal.** Turn data into signal, signal into models, and models into evidence. This is the phase where most ML careers are actually decided: anyone can call `.fit()`, but very few people can prove a model generalises, explain why it fails, and defend a metric choice to a product team.

---

## Phase dashboard

| Item | Details |
|---|---|
| **Phase** | 2 — Core ML |
| **Levels** | L4 · L5 · L6 |
| **Difficulty** | Intermediate |
| **Suggested duration** | 10–14 weeks at 2–3 hours/day |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Main libraries** | scikit-learn, Pandas, Polars, XGBoost, LightGBM, CatBoost, SHAP, Optuna, statsmodels |
| **Capstone projects** | 3 level capstones + 1 phase capstone |
| **Final outcome** | Build a leakage-audited pipeline, train and tune classical models, and prove generalisation with honest validation, calibrated probabilities, and error analysis. |

**Prerequisites.** Phase 1 complete — you can write tested Python, compute with NumPy/Pandas, derive gradients, and attach intervals to estimates. If any of that is shaky, fix it here rather than later: every bug in this phase traces back to Phase 1.

---

## How this phase is structured

| Block | What it contains |
|---|---|
| **Dashboard** | Level, difficulty, duration, tools, project, outcome |
| **Numbered sections** (`4.1`, `4.2`, …) | One theme each |
| **Modules** (`4.1.1`, `4.1.2`, …) | The actual study checklist |
| **Practice tasks** | Small exercises that force retrieval, not re-reading |
| **Module completion gate** | The proof that the section is done |
| **Mini-project** | A small build inside the level |
| **Capstone** | The level's main artefact, with acceptance criteria |
| **Interview bank** | Questions you should be able to answer after the level |
| **Level assessment** | A checklist before you move on |

> **The rule of this phase:** a model is not done when it scores well. It is done when you can explain *why* it scores well, *where* it fails, and *what would happen* if the data changed.

---

## Contents

| Level | Title | Sections | Duration | Capstone |
|---|---|---|---|---|
| [L4](#level-4--data-analysis-and-feature-engineering) | Data Analysis and Feature Engineering | 4.1 – 4.11 | 3–4 weeks | Leak-proof feature pipeline |
| [L5](#level-5--classical-machine-learning) | Classical Machine Learning | 5.1 – 5.11 | 4–5 weeks | Beat-the-baseline tabular system |
| [L6](#level-6--model-evaluation-and-generalization) | Model Evaluation and Generalization | 6.1 – 6.11 | 3–5 weeks | Generalization dossier |
| [Phase capstone](#phase-2-capstone--the-tabular-decision-system) | Integration project | — | 1–2 weeks | End-to-end tabular decision system |

---

# LEVEL 4 — DATA ANALYSIS AND FEATURE ENGINEERING

> **Goal.** Turn raw, messy, real-world data into features that are trustworthy, reproducible, and free of leakage — and know how to prove it.

## Level dashboard

| Item | Details |
|---|---|
| **Level** | 4 — Data Analysis and Feature Engineering |
| **Difficulty** | Intermediate |
| **Suggested duration** | 3–4 weeks |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Core tools** | Pandas, Polars, DuckDB, scikit-learn (`Pipeline`, `ColumnTransformer`), Pandera/Great Expectations, DVC |
| **Main project** | A **leak-proof, versioned feature pipeline** with a data-quality report |
| **Final outcome** | Given an unfamiliar dataset, produce validated, documented, leakage-audited features that a model can consume reproducibly. |

**Prerequisites.** Levels 0–3. You must be fluent in Pandas, comfortable with statistics, and able to write tests for data code.

---

## 4.1 — Exploratory Analysis That Answers Questions

**Objective.** Stop producing decorative EDA notebooks. Produce findings that change a decision.

### Module 4.1.1 — A disciplined EDA workflow

- Define the question before opening the data: prediction, explanation, or monitoring?
- Establish the unit of analysis (row = user? session? transaction? device-day?).
- Check the grain: what makes a row unique, and are there duplicates at that grain?
- Understand the target: distribution, base rate, and how it was measured.
- Separate descriptive findings from modelling hypotheses.
- Record every finding with the evidence that supports it and the caveat that limits it.

**Practice tasks**

- Write a one-page EDA plan for a dataset before touching code.
- Identify the grain of three public datasets and prove it with duplicate checks.

---

### Module 4.1.2 — Univariate analysis

- Numeric: histogram, KDE, box plot, quantiles, skewness, kurtosis, zero-inflation.
- Categorical: frequency tables, cardinality, long-tail categories, rare levels.
- Time: trend, seasonality, gaps, and irregular sampling.
- Detect impossible values (negative ages, future dates, exact zeros where zeros are impossible).
- Decide what a "reasonable range" is, and justify it with domain knowledge rather than z-scores alone.

$$
\text{skew}=\frac{\frac{1}{n}\sum_i (x_i-\bar x)^3}{\left(\frac{1}{n}\sum_i (x_i-\bar x)^2\right)^{3/2}}
$$

**Practice tasks**

- Produce a univariate profile for 20 columns and flag the five most suspicious ones.
- Find a column where the mean is a misleading summary, and prove it with a plot.

---

### Module 4.1.3 — Bivariate and multivariate analysis

- Target versus each feature: group means, distributions by class, correlation with the target.
- Numeric–numeric: scatter, hexbin, correlation, rank correlation, mutual information.
- Categorical–numeric: grouped box plots, effect sizes, not just p-values.
- Categorical–categorical: contingency tables, Cramér's V, target-rate by level.
- Interaction effects: when the relationship depends on another variable.
- Simpson's paradox: a segment-level reversal caused by aggregation.

$$
V=\sqrt{\frac{\chi^2/n}{\min(r-1,\,c-1)}},\qquad
\rho_{\text{Spearman}}=1-\frac{6\sum d_i^2}{n(n^2-1)}
$$

**Practice tasks**

- Find one feature whose relationship with the target reverses within a segment.
- Compute Pearson and Spearman for a monotone-but-nonlinear pair and explain the difference.
- Rank ten features by mutual information and compare with correlation ranking.

---

### Module 4.1.4 — Target analysis and segmentation

- Base rate, class balance, and how the base rate changes across segments.
- Target leakage smell test: which features are suspiciously predictive?
- Segment-level target rates with confidence intervals (not bare percentages).
- Cohort analysis for time-based data.
- Decide whether the model should be global or per-segment.

**Practice tasks**

- Compute target rate by segment with Wilson intervals, and flag segments with too little data.
- Identify a feature that predicts the target almost perfectly, and explain why it must be dropped.

---

### Module 4.1.5 — Communicating findings

- One finding per chart; a title that states the finding, not the variable name.
- Annotate the important point instead of expecting the reader to find it.
- Present uncertainty (intervals, sample sizes) alongside every number.
- Write the "so what" line: what decision this finding changes.

> **Module completion gate (4.1).** You can hand a stakeholder a five-finding memo where each finding has a chart, a number, an interval, and a stated implication.

---

## 4.2 — Data Quality and Cleaning at Scale

**Objective.** Handle dirty data deliberately rather than accidentally.

### Module 4.2.1 — Missing data mechanisms

- MCAR, MAR, and MNAR, and how each arises in practice.
- Why deleting rows biases MNAR data.
- Simple imputation: mean, median, mode — and how it distorts variance and correlations.
- Model-based imputation: KNN, iterative imputation (MICE), and regression imputation.
- Missing-indicator features and "missingness as signal".
- Tree models and native missing-value handling (XGBoost/LightGBM defaults).

$$
\hat x_{ij}=\underbrace{\alpha_j}_{\text{intercept}}+\underbrace{\sum_{k\neq j}\beta_{jk}x_{ik}}_{\text{other features}}+\varepsilon_{ij}
\quad\text{(iterative imputation, one column at a time)}
$$

**Practice tasks**

- Create a dataset with each missingness mechanism and compare three imputation strategies.
- Show a case where adding a missing-indicator improves AUC.
- Prove that mean imputation shrinks variance and attenuates correlation.

---

### Module 4.2.2 — Duplicates and entity resolution

- Exact duplicates versus near-duplicates.
- Entity resolution: matching records across sources with fuzzy keys (name, address, ID).
- Blocking, string similarity (Jaro–Winkler, Levenshtein, token set ratio), and thresholds.
- Deduplicate **before** splitting, and explain why otherwise your test set leaks.
- Track a stable entity ID through the pipeline.

**Practice tasks**

- Find near-duplicate customer records with two different similarity metrics and compare precision.
- Demonstrate a train/test leak caused by duplicate entities, and fix it.

---

### Module 4.2.3 — Outliers and anomalies

- Types: data errors, rare genuine events, and measurement artefacts.
- Detection: IQR, z-score, modified z-score, isolation forest, LOF, domain rules.
- Decide per column: remove, cap/winsorise, transform, or model separately.
- Never delete outliers before checking whether they are the signal (fraud, defects, defaults).

$$
M_i=\frac{0.6745\,(x_i-\tilde x)}{\mathrm{MAD}},\qquad \mathrm{MAD}=\operatorname{median}\left(\lvert x_i-\tilde x\rvert\right)
$$

**Practice tasks**

- Compare IQR, modified z-score, and isolation forest on one dataset; report how many points each flags.
- Build a winsorisation function and show its effect on model stability across folds.

---

### Module 4.2.4 — Schema validation and data contracts

- Declare dtypes, ranges, allowed categories, uniqueness, and nullability.
- Validate with Pandera or Great Expectations, or with hand-written assertions.
- Fail loudly at ingestion, not silently at training.
- Version the schema and treat changes as breaking changes.
- Data contracts between producers and consumers.

**Practice tasks**

- Write a schema for a dataset with ten columns and five rules, and test it against good and bad data.
- Break the schema deliberately and confirm the pipeline fails with an actionable message.

---

> **Module completion gate (4.2).** Your cleaning decisions are documented per column, with a reason and a test — not applied silently.

---

## 4.3 — Feature Engineering for Tabular Data

**Objective.** Create features that carry signal, not just features that exist.

### Module 4.3.1 — Numeric transformations

- Log and square-root transforms for right-skewed counts.
- Box–Cox and Yeo–Johnson for approximate normality.
- Binning and discretisation (and when it destroys information).
- Ratios, differences, and rates that normalise by exposure.
- Ranks and percentiles for robustness.
- Standardisation and min–max scaling — and why trees do not need them.

$$
x'=\frac{x-\mu}{\sigma},\qquad
x'=\frac{x-\min}{\max-\min},\qquad
x'=\log(1+x)
$$

**Practice tasks**

- Show a linear model improving with a log transform and a tree model being unaffected.
- Build an exposure-normalised rate feature (events per 1,000 users) and show it beats the raw count.

---

### Module 4.3.2 — Encoding categorical variables

- One-hot encoding and the curse of dimensionality with high cardinality.
- Ordinal encoding: only when order is real.
- Frequency and count encoding.
- Target/mean encoding with out-of-fold computation and smoothing.
- Hashing for very high cardinality and streaming.
- Learned embeddings (preview for Level 9).
- Native categorical handling in LightGBM/CatBoost.

$$
\hat\theta_j=\frac{n_j\bar y_j+m\mu}{n_j+m}
\quad\text{(smoothed target encoding: } n_j \text{ rows, prior } \mu,\ \text{strength } m\text{)}
$$

**Practice tasks**

- Compare one-hot, frequency, and out-of-fold target encoding on a 500-category column.
- Prove that naive target encoding leaks, by scoring on the training rows it was computed from.
- Tune the smoothing parameter $m$ and show the stability trade-off.

---

### Module 4.3.3 — Interactions and domain features

- Explicit interactions when domain knowledge supports them.
- Ratios that encode relative position (price per sq ft, revenue per user).
- Aggregations relative to entity (user's average order value versus this order).
- Deviation features: difference from an entity's historical mean.
- Letting trees find interactions versus encoding them manually — measure both.

**Practice tasks**

- Hypothesise three interactions, test each, and keep only those that improve validation.
- Build "customer's historic average" and "deviation from it" features and measure the lift.

---

### Module 4.3.4 — Text, dates and geospatial basics

- Text: length, word counts, character n-grams, TF-IDF (full NLP comes in Level 13).
- Dates: day of week, month, holiday flags, days since event, cyclical encodings.
- Geospatial: distance to a point, region aggregates, coarse grid cells.
- Check that time-derived features cannot leak the future.

$$
\text{hour\_sin}=\sin\!\left(\frac{2\pi h}{24}\right),\qquad
\text{hour\_cos}=\cos\!\left(\frac{2\pi h}{24}\right)
$$

**Practice tasks**

- Build cyclical time features and show they beat raw hour for a linear model.
- Create a distance-to-city-centre feature and test its value in a price model.

---

> **Module completion gate (4.3).** Every engineered feature has a stated hypothesis, and its value is measured against a model without it.

---

## 4.4 — High Cardinality and Feature Explosion

**Objective.** Handle IDs, free text, and long-tail categories without exploding the model.

### Checklist

- Diagnose cardinality and long-tail shape per categorical column.
- Group rare levels into an "other" bucket and measure the effect.
- Choose between target encoding, hashing, and native categorical support.
- Understand overfitting risk when a category has very few rows.
- Know when an ID is a legitimate feature (repeated entity) and when it is a leak.
- Control dimensionality: count features before and after encoding.
- Use feature hashing when cardinality is unbounded (logs, URLs, session data).

### Practice tasks

- Take a column with 20,000 categories and produce three encodings; compare validation performance and pipeline size.
- Show a case where including a raw user ID improves training score and destroys validation performance.

> **Module completion gate (4.4).** You can defend your encoding choice for a high-cardinality column with measured evidence.

---

## 4.5 — Time-Based Features and Point-in-Time Correctness

**Objective.** Compute features as they would have existed at prediction time. This is the single largest source of silent failure in industry ML.

### Module 4.5.1 — Temporal validation and feature windows

- Define the prediction timestamp and the label window explicitly.
- Lag features: value at $t-1$, $t-7$, $t-30$.
- Rolling windows: mean, sum, count, std over trailing periods with the correct window boundary.
- Expanding windows for cumulative history.
- Ensure no window includes data after the prediction time.

$$
\text{rolling}_t^{(k)}=\frac{1}{k}\sum_{i=1}^{k}x_{t-i}\quad\text{(strictly before }t\text{)}
$$

**Practice tasks**

- Build three lag features and one rolling feature, and prove they use only past data by construction.
- Show a rolling window with the wrong default (`center=True`) leaking future values.

---

### Module 4.5.2 — As-of joins and feature stores

- `merge_asof` for latest-known-value joins.
- Slowly changing dimensions and versioned attributes.
- Offline/online parity: the same feature logic in training and serving.
- Snapshot tables: store the feature vector used at prediction time.
- Why a plain join on entity ID leaks the future.

**Practice tasks**

- Build a point-in-time join for customer attributes and compare against a naive join, showing the leakage.
- Log a feature snapshot at inference and diff it against the offline computation.

---

### Module 4.5.3 — Temporal leakage audit

- Features derived from the label (for example, "days until churn").
- Features computed over the full dataset (global means, global counts).
- Features that encode the future through the outcome of an event.
- Splitting randomly when rows are time-ordered.
- Re-training on data that includes the test period.

**Practice tasks**

- Audit a dataset for five temporal leak types and document each finding.
- Take a model with suspiciously high AUC and find the leaking column.

> **Module completion gate (4.5).** You can construct a point-in-time-correct feature set and prove it with a leakage audit that you can show a reviewer.

---

## 4.6 — Feature Selection

**Objective.** Remove noise, reduce cost, and improve interpretability — without fooling yourself.

### Checklist

- Filter methods: variance threshold, correlation, mutual information, chi-square, ANOVA F-test.
- Wrapper methods: forward selection, backward elimination, RFE — and their cost.
- Embedded methods: L1 regularisation, tree importance, gradient-boosting importance.
- Why feature selection must happen **inside** cross-validation.
- Stability selection: selecting across bootstrap samples.
- Redundancy versus relevance: two correlated features can each look weak alone.
- Permutation importance on validation data, and its correlated-feature caveat.
- Cost-aware selection: fewer features can mean faster inference.

$$
\mathrm{MI}(X;Y)=\sum_{x}\sum_{y}p(x,y)\log\frac{p(x,y)}{p(x)p(y)}
$$

**Practice tasks**

- Run filter, wrapper, and embedded selection on the same dataset; compare selected sets and validation scores.
- Show a case where selecting features on the full dataset inflates the reported score.
- Measure inference latency with all features versus the selected subset.

> **Module completion gate (4.6).** You can select features with a method you can defend, inside a validation scheme that does not leak.

---

## 4.7 — Leakage: Taxonomy, Detection and Prevention

**Objective.** Make leakage a thing you hunt deliberately, because it never announces itself.

### Checklist

- **Target leakage:** a feature that is a consequence of the label.
- **Temporal leakage:** information from the future.
- **Group leakage:** the same entity in train and test (users, patients, devices, documents).
- **Preprocessing leakage:** scalers, imputers, encoders, or feature selection fitted on all data.
- **Duplicate leakage:** near-identical rows across splits.
- **Label leakage via aggregation:** group-level statistics that include the current row.
- Detection heuristics: suspiciously high AUC, one dominant feature, performance collapse in production, a feature with implausible availability.
- Prevention: pipelines fitted inside folds, time-based splits, group splits, deduplication before splitting, feature availability audits.

$$
\text{AUC}_{\text{train}}=0.99,\ \text{AUC}_{\text{test}}=0.71
\;\Rightarrow\;
\text{assume leakage before assuming excellence}
$$

**Practice tasks**

- Construct six deliberately leaky datasets, one per taxonomy type, and detect each with a written method.
- Fix each leak and quantify the drop in the (honest) score.
- Write a one-page leakage checklist for your team.

> **Module completion gate (4.7).** You can find a leak in a dataset you did not build, name its type, and fix it with a test that prevents recurrence.

---

## 4.8 — Imbalanced Data

**Objective.** Handle rare events without destroying calibration or inventing signal.

### Checklist

- Why accuracy is meaningless at 1% positive rate.
- Class weights versus resampling: what each changes.
- Random oversampling, random undersampling, and SMOTE — and SMOTE's failure on categorical and time-series data.
- Resample **inside** cross-validation only.
- Threshold selection as an alternative to resampling.
- Calibration after resampling, and why probabilities drift.
- Cost-sensitive learning and expected-value framing.
- Evaluation with PR-AUC, recall at fixed precision, and lift at the top decile.

$$
\text{lift}@k=\frac{\text{precision in top }k\%}{\text{base rate}}
$$

**Practice tasks**

- Compare class weights, undersampling, and SMOTE on the same split; report PR-AUC and calibration.
- Show SMOTE creating impossible synthetic records in a mixed-type dataset.
- Build a threshold rule from a cost matrix and compare with the default 0.5.

> **Module completion gate (4.8).** You can state what your imbalance treatment changed, what it broke, and how you measured both.

---

## 4.9 — Pipelines, Versioning and Reproducibility

**Objective.** Make the entire feature transformation a single, testable, reproducible object.

### Checklist

- scikit-learn `Pipeline` and `ColumnTransformer`: fit on train, transform on test.
- Custom transformers with `fit`/`transform` and `get_feature_names_out`.
- `FunctionTransformer` and stateless transformations.
- Serialise the pipeline, not just the model.
- Data versioning with DVC or lakeFS; checksums for small data.
- Config-driven feature sets (YAML) and experiment tracking.
- Deterministic feature computation: sort order, float formatting, timezone handling.
- Tests for feature code: shape, dtype, ranges, and invariance.

### Practice tasks

- Wrap your feature engineering in a `ColumnTransformer` and prove the test set is untouched by fitting.
- Save and reload the pipeline; confirm identical predictions on the same rows.
- Change one config value and show the feature set version changes.

> **Module completion gate (4.9).** One object produces the same features from the same raw data, every time, with a recorded version.

---

## 4.10 — Privacy, Ethics and Data Governance

**Objective.** Handle data you are allowed to handle, in a way you could defend publicly.

### Checklist

- PII and quasi-identifiers; re-identification risk.
- Consent, purpose limitation, retention, and deletion requests.
- India's DPDP Act and GDPR basics; what "personal data" covers.
- De-identification: masking, pseudonymisation, aggregation — and their limits.
- $k$-anonymity, $\ell$-diversity, and differential privacy at a conceptual level.
- Sampling bias and who is missing from the data.
- Proxy variables that encode protected attributes.
- Documentation: datasheets for datasets and data cards.

$$
k\text{-anonymity: every record indistinguishable from at least }k-1\text{ others on quasi-identifiers}
$$

**Practice tasks**

- Identify the quasi-identifiers in a dataset and demonstrate a re-identification risk.
- Write a data card: source, collection, consent, known gaps, and intended use.
- Propose a deletion workflow that reaches the model and its cached features.

> **Module completion gate (4.10).** You can state, in writing, what data you may use, for what purpose, and what you must delete on request.

---

## 4.11 — Level 4 Capstone: Leak-Proof Feature Pipeline

### Project: `feature-forge` — an auditable feature engineering system

**Difficulty.** Intermediate → Advanced

**Purpose.** Build the data half of a real ML system, with evidence that it is correct, reproducible, and leak-free. Every later level will reuse this pipeline.

### A. Functional requirements

**Ingestion and validation**

- Load data from CSV and Parquet with explicit dtypes.
- Validate against a declared schema (types, ranges, categories, uniqueness, nullability).
- Fail with actionable errors; log row counts at every stage.
- Detect duplicates at the entity grain and resolve them.

**Feature engineering**

- At least 20 engineered features across numeric, categorical, temporal, and aggregate families.
- Out-of-fold target encoding for at least one high-cardinality column.
- Point-in-time-correct temporal features with an explicit prediction timestamp.
- Feature groups that can be switched on and off by config.

**Leakage control**

- A written leakage audit covering all six taxonomy types.
- Group-aware or time-aware splitting wired into the pipeline.
- A regression test that fails if a known leaky column reappears.

**Reproducibility**

- A single `Pipeline`/`ColumnTransformer` object that fits on train only.
- Versioned feature config; deterministic output given the same input.
- Feature snapshot logging for a sample of rows.

**Reporting**

- A data-quality report: missingness, duplicates, outliers, cardinality, constant columns.
- A feature dictionary: name, definition, source, transformation, known risks.
- A before/after lift table: model score with and without each feature group.

### B. Suggested architecture

```text
raw data ──► validator ──► cleaner ──► entity resolver ──► feature builders ──► pipeline
                │              │               │                   │                │
                ▼              ▼               ▼                   ▼                ▼
          schema report   quality report   dedup log      point-in-time checks   fitted object
                                                                                   │
                                            ┌──────────────────────────────────────┘
                                            ▼
                          feature dictionary · lift table · leakage audit · data card
```

### C. Suggested repository structure

```text
feature-forge/
├── pyproject.toml
├── conf/
│   ├── features.yaml
│   └── schema.yaml
├── src/feature_forge/
│   ├── validate.py        # schema + contract checks
│   ├── clean.py           # missingness, outliers, dedup
│   ├── entity.py          # entity resolution
│   ├── features/
│   │   ├── numeric.py
│   │   ├── categorical.py
│   │   ├── temporal.py     # point-in-time correct
│   │   └── aggregate.py
│   ├── pipeline.py        # ColumnTransformer assembly
│   └── leakage.py         # audit + regression tests
├── reports/
│   ├── quality_report.md
│   ├── feature_dictionary.md
│   ├── leakage_audit.md
│   └── lift_table.md
└── tests/
```

### D. Stretch goals

- Add feature-store-style offline/online parity with a small snapshot store.
- Add automated drift comparison between two data vintages.
- Add a CLI: `feature-forge build --config conf/features.yaml`.
- Benchmark Pandas versus Polars for the heaviest feature group.
- Add property-based tests for transformation invariants.

### E. Acceptance criteria

| Area | Required evidence |
|---|---|
| **Correctness** | Schema tests pass; no silently coerced dtypes |
| **Leakage control** | Six-type audit, plus a test that catches a reintroduced leak |
| **Reproducibility** | Same config + same data ⇒ identical feature matrix hash |
| **Measured value** | Each feature group's lift is reported with intervals |
| **Documentation** | Feature dictionary and data card complete |
| **Maintainability** | Config-driven, typed, tested, and readable by a teammate |

> Level 4 is complete when the feature matrix can be regenerated bit-for-bit from the config and raw data, and the leakage audit is signed off.

---

## Level 4 interview question bank

### A. Data understanding

- How do you start with a dataset you have never seen?
- What is the grain of a table, and why does it matter before any modelling?
- How do you decide whether a value is an outlier or a genuine rare event?
- What is Simpson's paradox, and how would you detect it in your own analysis?
- How do you handle a column with 40% missing values?
- What is the difference between MCAR, MAR, and MNAR, and why does it change your imputation strategy?

### B. Feature engineering

- How do you encode a categorical column with 10,000 levels?
- What is target encoding, and how do you prevent it from leaking?
- When would you bin a continuous variable, and what do you lose?
- How do you build a rolling feature without leaking the future?
- Why do tree models not need standardisation?
- How do you decide whether an engineered feature is worth keeping?
- How would you encode cyclical time features, and why?

### C. Leakage

- What are the main types of leakage?
- Your model has 0.99 AUC offline and 0.6 online. What do you check?
- How does preprocessing leak, and how does a pipeline prevent it?
- Why must you deduplicate before splitting?
- How would you audit a dataset for temporal leakage?
- What is group leakage, and give an example from a real domain?

### D. Imbalance and costs

- Why is accuracy useless for rare events?
- What does SMOTE actually do, and when does it fail?
- How do class weights change the model?
- How do you pick a threshold when false negatives cost 20× false positives?
- How does resampling affect probability calibration?

### E. Practical scenarios

- A feature is missing at inference but present in training. What do you do?
- Your feature pipeline takes 6 hours; the model takes 5 minutes. Where do you optimise?
- A teammate adds a column that boosts AUC by 15 points. What is your first question?
- You must delete a user's data under a privacy request. What does that touch?

### Interview readiness standard

1. Name the decision and its cost.
2. Describe the transformation precisely.
3. State the leakage risk and its mitigation.
4. Give the measurement that proves the feature helped.
5. Name one case where you would not do it.

---

## Level 4 final assessment

### Knowledge

- I can state the grain of a dataset and validate it.
- I can choose an imputation strategy from the missingness mechanism.
- I know the encoding options for high-cardinality features and their trade-offs.
- I can build point-in-time-correct temporal features.
- I can name and detect all six leakage types.
- I understand imbalance treatments and their effect on calibration.
- I understand the privacy constraints on the data I use.

### Practical skills

- I have built a validated, config-driven feature pipeline.
- I have written an out-of-fold target encoder.
- I have produced a lift table for every feature group.
- I have audited a dataset for leakage and written a regression test.
- I have documented features and data in a dictionary and a data card.

### Project

- `feature-forge` regenerates a bit-identical feature matrix from config.
- The leakage audit is complete and signed off.
- I can defend every feature's existence with a measured lift.

> **Level 4 completion rule.** If you can hand a teammate your feature matrix, its dictionary, and its audit — and they can rebuild it without you — you are ready for Level 5.

---

# LEVEL 5 — CLASSICAL MACHINE LEARNING

> **Goal.** Master the models that still win on tabular data, and — more importantly — learn the modelling craft: baselines, bias–variance, regularisation, tuning, calibration, and interpretation.

## Level dashboard

| Item | Details |
|---|---|
| **Level** | 5 — Classical Machine Learning |
| **Difficulty** | Intermediate → Advanced |
| **Suggested duration** | 4–5 weeks |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Core tools** | scikit-learn, XGBoost, LightGBM, CatBoost, statsmodels, Optuna, SHAP |
| **Main project** | A **tuned, calibrated, interpreted tabular model** that beats a strong baseline |
| **Final outcome** | Choose, train, tune, and explain classical models, and justify every choice with measured evidence. |

**Prerequisites.** Level 4. You need a leak-proof feature pipeline before tuning anything — otherwise you will tune your way into a leak.

---

## 5.1 — Framing the Learning Problem

**Objective.** Translate a business question into a prediction task that can actually be measured.

### Module 5.1.1 — From decision to prediction

- What decision will this model change? If nothing, do not build it.
- The prediction unit, the label definition, and the horizon.
- Who acts on the output, how often, and with what latency budget.
- The cost of each error type, and who bears it.
- The feedback loop: how will you learn whether the prediction was right?

**Practice tasks**

- Take three business questions and rewrite each as a labelled prediction task with a horizon.
- Write the cost matrix for one of them, with actual numbers.

---

### Module 5.1.2 — Learning settings

- Supervised: classification, regression, ranking, survival, and structured prediction.
- Unsupervised: clustering, density estimation, dimensionality reduction.
- Self-supervised and transfer settings (preview of Levels 9–10).
- When the task is really causal, and a predictive model will mislead you.
- When ML is the wrong tool: deterministic rules, tiny data, or no feedback.

**Practice tasks**

- For six product problems, name the learning setting and justify it in one line.
- Identify one problem where a rule beats a model, and explain why.

---

### Module 5.1.3 — Baselines before models

- Trivial baselines: majority class, mean/median, last value, popularity, random.
- Simple baselines: logistic regression, a shallow tree, a heuristic rule.
- Why the baseline is the reference against which all lift is measured.
- Recording baseline metrics with intervals, not point estimates.
- The "beat the baseline or explain why not" rule.

$$
\text{lift}=\frac{\text{model metric}-\text{baseline metric}}{\text{baseline metric}}
$$

**Practice tasks**

- Build three baselines for a classification task and report metrics with intervals.
- Show a case where a tuned model fails to beat the baseline, and diagnose why.

---

> **Module completion gate (5.1).** You can state the decision, the label, the horizon, the cost matrix, and the baseline before training anything.

---

## 5.2 — Linear Models

**Objective.** Understand the workhorse models deeply enough to know exactly when they fail.

### Module 5.2.1 — Linear regression

- OLS assumptions and what breaks each one.
- Coefficient interpretation, including units and interaction terms.
- Residual diagnostics: patterns, heteroscedasticity, non-linearity.
- Influence: leverage and Cook's distance.
- Why extrapolation is unsafe with a linear model.

$$
\hat\beta=(X^\top X)^{-1}X^\top y,\qquad
\mathrm{Var}(\hat\beta)=\sigma^2(X^\top X)^{-1}
$$

**Practice tasks**

- Fit a model, plot residuals, and identify two assumption violations.
- Construct a dataset where a unit change in $x$ does not correspond to a unit change in $y$, and explain the coefficient anyway.

---

### Module 5.2.2 — Regularisation

- Ridge: shrinkage, stabilising collinear features, closed form.
- Lasso: sparsity, feature selection, and the geometry behind it.
- Elastic Net: when features are correlated in groups.
- Standardisation before penalisation — and why it is mandatory.
- The regularisation path and choosing $\lambda$ by cross-validation.

$$
\hat\beta_{\text{ridge}}=(X^\top X+\lambda I)^{-1}X^\top y,\qquad
\hat\beta_{\text{lasso}}=\arg\min_\beta \lVert y-X\beta\rVert_2^2+\lambda\lVert\beta\rVert_1
$$

**Practice tasks**

- Plot the coefficient path for lasso across $\lambda$ and interpret it.
- Show ridge outperforming OLS on collinear features in a held-out set.

---

### Module 5.2.3 — Logistic regression

- Log-odds, sigmoid, and maximum likelihood.
- Coefficient interpretation as odds ratios.
- Class weights, offsets, and varying base rates.
- Separation and its fix (regularisation).
- Why logistic regression remains a strong, calibrated, explainable baseline.

$$
\log\frac{p}{1-p}=x^\top\beta,\qquad
\mathcal{L}=-\frac{1}{n}\sum_i\left[y_i\log \hat p_i+(1-y_i)\log(1-\hat p_i)\right]
$$

**Practice tasks**

- Fit logistic regression by hand (gradient descent) and match `sklearn`.
- Show complete separation producing enormous coefficients, then fix it with $L_2$.

---

### Module 5.2.4 — Generalised linear models

- The exponential family and the link function.
- Poisson regression for counts; exposure offsets.
- Negative binomial for overdispersed counts.
- Gamma and Tweedie for cost and insurance-style targets.
- Why using linear regression on counts or costs is usually wrong.

$$
g(\mathbb{E}[y])=\eta=x^\top\beta
$$

**Practice tasks**

- Fit Poisson and negative binomial models to the same count data and compare fit.
- Show a Tweedie model beating squared-error regression on a zero-inflated cost target.

---

> **Module completion gate (5.2).** You can derive, fit, interpret, and diagnose a linear or logistic model without a library hiding anything.

---

## 5.3 — Distance-Based and Probabilistic Models

**Objective.** Understand memorisation-based learning and its geometric limits.

### Module 5.3.1 — k-nearest neighbours

- Distance metrics and the need for scaling.
- Choosing $k$: bias–variance trade-off.
- Weighted voting and distance weighting.
- The curse of dimensionality and distance concentration.
- Search structures: KD-trees, ball trees, approximate indexes.

$$
\hat y(x)=\frac{1}{k}\sum_{i\in\mathcal{N}_k(x)}y_i
$$

**Practice tasks**

- Show k-NN accuracy collapsing as dimensions increase at fixed $n$.
- Compare KD-tree and brute-force search at 10,000 and 1,000,000 points.

---

### Module 5.3.2 — Naive Bayes

- Conditional independence and why it is wrong but useful.
- Multinomial NB for counts; Gaussian NB for continuous features.
- Laplace smoothing and its effect on rare categories.
- Why NB is a strong text baseline despite its assumptions.

$$
P(y\mid x)\propto P(y)\prod_{j}P(x_j\mid y)
$$

**Practice tasks**

- Build a text classifier with NB and compare against logistic regression on TF-IDF.
- Show NB's probabilities are poorly calibrated even when ranking is good.

---

> **Module completion gate (5.3).** You can explain when distance or independence assumptions are reasonable — and when they will silently fail.

---

## 5.4 — Support Vector Machines and Kernels

**Objective.** Understand margins, the kernel trick, and convex optimisation in a model you can actually use.

### Checklist

- Maximum-margin classifiers and support vectors.
- Hard versus soft margins; the role of $C$.
- Hinge loss and its relationship to logistic loss.
- The dual formulation and why it enables kernels.
- Kernels: linear, polynomial, RBF; the $\gamma$ parameter.
- Computational cost: $O(n^2)$–$O(n^3)$ training; when SVMs stop being practical.
- Scaling and why SVMs need standardised inputs.
- Kernel approximation (Nyström, random features) for large data.

$$
\min_{w,b}\ \tfrac{1}{2}\lVert w\rVert^2
\quad\text{s.t.}\quad y_i(w^\top x_i+b)\ge 1,\qquad
\mathcal{L}_{\text{hinge}}=\max\left(0,\ 1-y_i(w^\top x_i+b)\right)
$$

### Practice tasks

- Train linear, polynomial, and RBF SVMs on the same data and compare the decision boundary shape.
- Show the effect of $C$ and $\gamma$ on overfitting with a validation curve.
- Measure training time versus $n$ and identify where it becomes impractical.

> **Module completion gate (5.4).** You can explain the margin, the kernel trick, and the cost curve, and choose an SVM only when it is the right tool.

---

## 5.5 — Trees and Ensembles

**Objective.** Master the models that win on tabular data — and understand precisely why.

### Module 5.5.1 — Decision trees

- Recursive partitioning and greedy split selection.
- Impurity criteria: Gini, entropy, and variance for regression.
- Depth, minimum samples, and pruning.
- Why single trees overfit and are unstable.
- Interpreting a tree and its limitations.

$$
G=1-\sum_{k}p_k^2,\qquad
H=-\sum_k p_k\log p_k,\qquad
\text{gain}=I(\text{parent})-\sum_{\text{children}}\frac{n_c}{n}I(\text{child})
$$

**Practice tasks**

- Grow a tree by hand on a toy dataset and compute the Gini gain for two candidate splits.
- Show that changing five rows changes the tree structure completely.

---

### Module 5.5.2 — Bagging and random forests

- Bootstrap aggregation and variance reduction.
- Feature subsampling and decorrelation of trees.
- Out-of-bag error as a free validation estimate.
- Hyperparameters: number of trees, max depth, max features, min samples leaf.
- Why random forests rarely overfit with more trees, and what still does.

$$
\operatorname{Var}\!\left(\frac{1}{B}\sum_{b=1}^{B}T_b\right)=\rho\sigma^2+\frac{1-\rho}{B}\sigma^2
$$

**Practice tasks**

- Plot OOB error against the number of trees and explain the plateau.
- Show the effect of `max_features` on correlation between trees and on accuracy.

---

### Module 5.5.3 — Gradient boosting

- Stagewise additive modelling: each tree fits the current residual.
- Functional gradient descent and the role of the learning rate.
- Shrinkage, subsampling, and early stopping.
- Tree constraints: depth, leaves, min child weight, $\gamma$.
- Regularisation: $L_1$/$L_2$ on leaf weights.
- Why boosting reduces bias while bagging reduces variance.

$$
F_m(x)=F_{m-1}(x)+\nu\,h_m(x),\qquad
h_m=\arg\min_h\sum_i \left(r_{im}-h(x_i)\right)^2
$$

**Practice tasks**

- Implement a 50-line gradient booster for squared error and compare with a library.
- Show the effect of learning rate × number of trees on validation error.
- Demonstrate early stopping preventing overfitting on a noisy dataset.

---

### Module 5.5.4 — XGBoost, LightGBM and CatBoost

- Histogram-based splits and their speed advantage.
- Leaf-wise versus level-wise growth.
- Native categorical handling (CatBoost ordered target statistics, LightGBM categorical splits).
- Missing-value handling by default direction.
- Practical hyperparameter order: learning rate → trees → depth/leaves → sampling → regularisation.
- GPU training and when it helps.

| Library | Strength | Watch out for |
|---|---|---|
| XGBoost | maturity, regularisation, ecosystem | memory use at high cardinality |
| LightGBM | speed, large data, leaf-wise growth | overfitting on small data |
| CatBoost | categorical features, strong defaults | slower training, larger models |

**Practice tasks**

- Train all three on the same dataset with sensible defaults and compare score, time, and model size.
- Tune one of them with a documented search order and report the gain at each step.

---

### Module 5.5.5 — Stacking and blending

- Stacking with out-of-fold predictions to avoid leakage.
- Level-1 meta-models: linear, ridge, or shallow trees.
- Blending versus stacking; when the gain justifies complexity.
- Diversity as the source of ensemble gain.
- The interpretability and maintenance cost of an ensemble.

**Practice tasks**

- Stack logistic regression, random forest, and LightGBM with out-of-fold predictions.
- Show that stacking two nearly identical models adds nothing.

---

> **Module completion gate (5.5).** You can tune a gradient-boosted model systematically, explain each hyperparameter's effect, and justify why you did not use a neural network.

---

## 5.6 — Unsupervised Learning

**Objective.** Find structure without labels — and know when the structure is real.

### Module 5.6.1 — Clustering

- k-means: objective, Lloyd's algorithm, initialisation, and $k$ selection.
- Gaussian mixtures and EM: soft assignments and covariance shapes.
- DBSCAN and HDBSCAN: density, noise points, and no need for $k$.
- Hierarchical clustering and linkage choices.
- Validation: silhouette, Davies–Bouldin, Calinski–Harabasz, stability across seeds.
- The real test: are the clusters actionable?

$$
J=\sum_{k=1}^{K}\sum_{x\in C_k}\lVert x-\mu_k\rVert^2,\qquad
s(i)=\frac{b(i)-a(i)}{\max\{a(i),b(i)\}}
$$

**Practice tasks**

- Cluster a dataset with three methods and compare assignments with adjusted Rand index.
- Show k-means failing on non-spherical clusters that DBSCAN handles.
- Check cluster stability across ten seeds and report which clusters persist.

---

### Module 5.6.2 — Dimensionality reduction

- PCA: variance maximisation, component interpretation, and scaling.
- Explained variance and choosing the number of components.
- t-SNE: local structure, perplexity, and why distances between clusters are meaningless.
- UMAP: speed, global structure, and parameter sensitivity.
- When to use PCA as preprocessing versus visualisation only.

$$
\text{explained variance ratio}_k=\frac{\lambda_k}{\sum_j\lambda_j}
$$

**Practice tasks**

- Reduce a dataset to 2D with PCA, t-SNE, and UMAP; compare what structure survives.
- Show how changing perplexity changes t-SNE's apparent clusters.

---

### Module 5.6.3 — Anomaly detection

- Isolation forest, local outlier factor, one-class SVM.
- Reconstruction-error approaches with autoencoders (preview).
- Supervised versus unsupervised framing when labels exist for some anomalies.
- Threshold selection and alert budget.
- Evaluation without labels: injection tests and expert review.

**Practice tasks**

- Inject known anomalies into clean data and measure detection at a fixed alert rate.
- Compare three detectors' precision–recall trade-offs.

---

> **Module completion gate (5.6).** You can cluster, reduce, or detect anomalies with a method you can justify, and show the result is stable and useful.

---

## 5.7 — Hyperparameter Optimisation

**Objective.** Search efficiently, and never tune on the data you report.

### Module 5.7.1 — Search strategies

- Grid search and its exponential cost.
- Random search and why it beats grid in high dimensions.
- Bayesian optimisation: surrogate models and acquisition functions.
- Hyperband and successive halving for early stopping of bad trials.
- Population-based training at a conceptual level.
- Optuna study design: pruners, samplers, and search spaces.

$$
x^\star=\arg\max_{x\in\mathcal{X}}\ \mathbb{E}\left[f(x)\mid \mathcal{D}_{1:t}\right]
\quad\text{(expected improvement, conceptually)}
$$

**Practice tasks**

- Run grid, random, and Bayesian search with the same budget; compare best score versus trials used.
- Add a pruner and show it saves at least 40% of compute.

---

### Module 5.7.2 — Nested cross-validation

- Why tuning and reporting on the same folds inflates results.
- Inner loop for hyperparameters, outer loop for honest evaluation.
- Grouped and time-series variants.
- The cost of nested CV and when a holdout is sufficient.
- Reporting the variance of the outer-fold scores.

**Practice tasks**

- Compare a naive tuned score with a nested-CV score on the same data; quantify the optimism.
- Run nested CV with grouped splits and explain the difference.

---

### Module 5.7.3 — Practical tuning discipline

- Fix the validation protocol before searching.
- Change one thing at a time and record the delta.
- Prefer defaults first, then coarse ranges, then fine ranges.
- Watch the interaction between learning rate and tree count.
- Know when tuning has hit diminishing returns.
- Log every trial with config, score, and runtime.

> **Module completion gate (5.7).** You can run a search with a documented protocol and report an unbiased score from nested validation.

---

## 5.8 — Model Selection and Comparison

**Objective.** Choose a model for reasons you can defend, not for a decimal place.

### Checklist

- Compare against a baseline and against the previous production model.
- Report mean and spread across folds — never a single number.
- Statistical comparison: paired tests across folds, corrected resampled $t$-test.
- Practical significance: is a 0.3-point AUC gain worth 3× inference cost?
- Operational constraints: latency, memory, model size, retraining time, explainability.
- Simplicity preference: choose the simpler model unless the gain is real and needed.
- Document rejected alternatives and why.

$$
t=\frac{\bar d}{\mathrm{SE}(\bar d)},\qquad
\text{corrected: } t=\frac{\bar d}{\sqrt{\left(\frac{1}{k}+\frac{n_{\text{test}}}{n_{\text{train}}}\right)s^2}}
$$

### Practice tasks

- Compare four models across ten folds; report means, intervals, and a paired test.
- Write a model-selection memo with the rejected alternatives and their costs.

> **Module completion gate (5.8).** Your chosen model is justified on accuracy, cost, and operational fit — and you can name what you rejected.

---

## 5.9 — Interpretability

**Objective.** Explain a model honestly, including where the explanation lies.

### Module 5.9.1 — Global explanations

- Coefficients and odds ratios for linear models.
- Impurity-based importance and why it is biased toward high-cardinality features.
- Permutation importance on held-out data, and the correlated-feature caveat.
- Partial dependence plots and their assumption of feature independence.
- Accumulated local effects (ALE) as a fix.

$$
\mathrm{PD}_j(v)=\mathbb{E}_{X_{-j}}\left[\hat f(x_j=v,\ X_{-j})\right]
$$

**Practice tasks**

- Compare impurity importance and permutation importance on the same model and explain the disagreement.
- Plot PDP and ALE for a correlated feature pair and show where they differ.

---

### Module 5.9.2 — Local explanations

- SHAP values: Shapley fairness, additivity, and computational variants (TreeSHAP, KernelSHAP).
- LIME: local surrogates and instability.
- Counterfactual explanations: "what would need to change?"
- Anchors and rule-based local explanations.
- Interpreting SHAP dependence plots and interaction effects.

$$
\phi_i=\sum_{S\subseteq F\setminus\{i\}}\frac{\lvert S\rvert!\,(\lvert F\rvert-\lvert S\rvert-1)!}{\lvert F\rvert!}\left[f_{S\cup\{i\}}(x)-f_S(x)\right]
$$

**Practice tasks**

- Explain ten individual predictions with SHAP and check each against domain intuition.
- Show LIME giving different explanations for the same point across runs.

---

### Module 5.9.3 — The limits of explanation

- An explanation of the model is not an explanation of the world.
- Correlated features split credit arbitrarily.
- Explanations can leak sensitive attributes.
- Human factors: explanations that increase confidence without increasing understanding.
- When to prefer an inherently interpretable model instead.

> **Module completion gate (5.9).** You can produce a global and a local explanation, state their assumptions, and identify one case where the explanation is misleading.

---

## 5.10 — Probability Calibration

**Objective.** Make predicted probabilities mean what they say.

### Checklist

- Why ranking metrics can be good while probabilities are wrong.
- Reliability diagrams and expected calibration error.
- Brier score decomposition: reliability, resolution, uncertainty.
- Platt scaling (sigmoid) and isotonic regression.
- Calibrating on a held-out set, never on training data.
- Calibration under class weighting and resampling.
- Calibration drift over time and across segments.
- When calibration does not matter (pure ranking) and when it is everything (pricing, thresholds, expected value).

$$
\mathrm{ECE}=\sum_{b=1}^{B}\frac{n_b}{n}\left\lvert \mathrm{acc}(b)-\mathrm{conf}(b)\right\rvert,\qquad
\text{Brier}=\frac{1}{n}\sum_i(\hat p_i-y_i)^2
$$

### Practice tasks

- Plot reliability diagrams before and after Platt scaling and isotonic regression.
- Show a weighted model with good PR-AUC but terrible calibration, then fix it.
- Measure ECE by segment and find a subgroup where calibration fails.

> **Module completion gate (5.10).** Your reported probabilities match observed frequencies within a stated tolerance, across the segments you care about.

---

## 5.11 — Level 5 Capstone: Beat the Baseline

### Project: `tabular-arena` — a tuned, calibrated, interpreted classifier or regressor

**Difficulty.** Intermediate → Advanced

**Purpose.** Produce the model you will use in interviews: a defensible tabular system with a strong baseline, honest tuning, calibrated outputs, and explanations you can stand behind.

### A. Functional requirements

**Modelling**

- A trivial baseline, a linear baseline, and a tuned gradient-boosted model.
- At least two model families beyond boosting (for example random forest and an SVM or k-NN).
- Documented tuning protocol with search spaces and trial counts.

**Validation**

- A fixed validation protocol decided before tuning: stratified, grouped, or time-based as appropriate.
- Nested cross-validation or a held-out set that was never used for tuning.
- Reported mean ± spread across folds, plus a paired comparison against the baseline.

**Calibration**

- Reliability diagram and ECE for every candidate model.
- Calibration applied where probabilities are used for decisions.
- Segment-level calibration check.

**Interpretation**

- Global importance by two methods, with agreement analysis.
- SHAP summary and at least five individual explanations.
- One case where the explanation would mislead a stakeholder.

**Decision layer**

- A cost-based threshold derived from a stated cost matrix.
- Expected value per 1,000 cases with an interval.
- A lift-at-top-decile table.

### B. Suggested architecture

```text
feature matrix (L4 pipeline)
        │
        ├──► baseline ──────────────┐
        ├──► linear model ──────────┤
        ├──► tree ensemble ─────────┼──► validation protocol ──► comparison table
        └──► alternative family ────┘             │
                                                  ▼
                                  calibration ──► threshold ──► decision layer
                                                  │
                                                  ▼
                            importance · SHAP · PDP/ALE · error slices · memo
```

### C. Suggested repository structure

```text
tabular-arena/
├── conf/
│   ├── model.yaml
│   └── costs.yaml
├── src/tabular_arena/
│   ├── baselines.py
│   ├── train.py
│   ├── tune.py
│   ├── calibrate.py
│   ├── evaluate.py
│   ├── interpret.py
│   └── decide.py
├── reports/
│   ├── comparison_table.md
│   ├── calibration.md
│   ├── interpretation.md
│   └── decision_memo.md
└── tests/
```

### D. Stretch goals

- Add a monotonic constraint to the boosted model and measure the accuracy cost.
- Compare against a small MLP using the same features.
- Add conformal prediction intervals or prediction sets.
- Quantify the cost of dropping the five most important features.
- Serve the final model behind a minimal API with latency measurement.

### E. Acceptance criteria

| Area | Required evidence |
|---|---|
| **Baseline honesty** | Trivial and linear baselines reported with intervals |
| **Validation rigour** | Protocol fixed before tuning; nested CV or untouched holdout |
| **Tuning discipline** | Search spaces and trial counts documented; gains per step reported |
| **Calibration** | ECE and reliability diagram reported before and after calibration |
| **Interpretation** | Two global methods, five local explanations, one caveat |
| **Decision layer** | Threshold from costs; expected value per 1,000 cases with interval |
| **Communication** | One-page memo with rejection reasons for the other models |

> Level 5 is complete when your chosen model beats the baseline on an untouched split, its probabilities are calibrated, and you can defend the choice against two alternatives.

---

## Level 5 interview question bank

### A. Linear models

- Derive the OLS estimator and state its assumptions.
- What does the ridge penalty do to collinear features, and why?
- Why does lasso produce exact zeros while ridge does not?
- How do you interpret a logistic regression coefficient?
- What happens when classes are perfectly separable, and how do you fix it?
- When would you use Poisson regression instead of linear regression?

### B. Trees and ensembles

- How does a decision tree choose a split?
- Why do random forests reduce variance but not bias?
- Explain gradient boosting to someone who knows only linear regression.
- What does the learning rate do in boosting, and how does it interact with tree count?
- Why does LightGBM sometimes overfit small datasets?
- When would you prefer CatBoost over XGBoost?
- Why is a boosted tree usually better than a neural network on tabular data?

### C. Practical modelling

- What is your baseline, and why does it matter?
- How do you choose between two models that differ by 0.2 AUC?
- What is nested cross-validation, and when is it necessary?
- Grid, random, or Bayesian search — how do you choose and why?
- How do you decide when to stop tuning?
- What would make you choose a simpler model despite a lower score?

### D. Calibration and interpretation

- What does it mean for a model to be calibrated?
- How do you measure calibration, and what are ECE's weaknesses?
- When does calibration matter, and when does it not?
- What is the difference between impurity importance and permutation importance?
- How does SHAP work, and what does it not tell you?
- When would you not trust a partial dependence plot?

### E. Scenario questions

- Your model improves offline by 3% but adds 40ms latency. How do you decide?
- A stakeholder asks why a specific customer was rejected. What do you give them?
- Your best model is a stacked ensemble your team cannot maintain. What do you do?
- Your model's calibration degrades over six months. How do you detect and fix it?
- You need to retrain weekly with 1/10th the compute. How does your model choice change?

### Interview readiness standard

1. State the modelling choice and the alternative you rejected.
2. Explain the mechanism, not just the name.
3. Give the measurement that decided it.
4. State the failure mode you are accepting.
5. Give the cost in latency, memory, or maintenance.

---

## Level 5 final assessment

### Knowledge

- I can derive and interpret linear and logistic regression.
- I understand regularisation geometrically and practically.
- I can explain bagging and boosting from first principles.
- I know when a distance-based or kernel model is appropriate.
- I can cluster, reduce dimensions, and detect anomalies with justified choices.
- I understand hyperparameter search and nested validation.
- I can calibrate probabilities and explain the limits of interpretation.

### Practical skills

- I have implemented a gradient booster from scratch.
- I have tuned a model with a documented protocol and reported an unbiased score.
- I have produced reliability diagrams before and after calibration.
- I have explained individual predictions with SHAP and checked them against intuition.
- I have compared four models statistically and written a selection memo.

### Project

- `tabular-arena` beats its baseline on an untouched split.
- Calibration is measured and corrected.
- I can defend the model against two alternatives with numbers.

> **Level 5 completion rule.** If you can take an unfamiliar tabular problem, build the baselines, tune a model, calibrate it, explain it, and state its cost — you are ready for Level 6.

---

# LEVEL 6 — MODEL EVALUATION AND GENERALIZATION

> **Goal.** Prove that a model will keep working on data it has never seen — and know exactly where it will not. This level converts "my model scored 0.91" into a defensible scientific claim.

## Level dashboard

| Item | Details |
|---|---|
| **Level** | 6 — Model Evaluation and Generalization |
| **Difficulty** | Advanced |
| **Suggested duration** | 3–5 weeks |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Core tools** | scikit-learn model selection, statsmodels, SciPy, `mapie` (conformal), SHAP, your L3 toolkit |
| **Main project** | A **generalization dossier**: protocol, metrics with intervals, error taxonomy, and slice analysis |
| **Final outcome** | Design an evaluation that would survive scrutiny, then report results that are correct, calibrated, and honest about uncertainty. |

**Prerequisites.** Levels 3–5. You need statistics (intervals, tests), modelling (baselines, tuning), and a feature pipeline that does not leak.

---

## 6.1 — The Generalization Problem

**Objective.** Understand precisely what a test score estimates, and why it is noisier than it looks.

### Module 6.1.1 — Empirical risk and the true objective

- The data-generating distribution $P(X,Y)$ and the risk we actually care about.
- Empirical risk on a finite sample as an estimate of true risk.
- The generalization gap and why it grows as the model gets more flexible.
- Why the i.i.d. assumption is doing almost all the work.
- Distribution shift as the practical failure of i.i.d.

$$
R(f)=\mathbb{E}_{(X,Y)\sim P}\left[\mathcal{L}(f(X),Y)\right],\qquad
\hat R_n(f)=\frac{1}{n}\sum_{i=1}^{n}\mathcal{L}(f(x_i),y_i)
$$

**Practice tasks**

- Estimate true risk by simulation from a known distribution and compare with empirical risk at three sample sizes.
- Create a shift between train and evaluation and show the gap exploding.

---

### Module 6.1.2 — Bias, variance and the decomposition

- Bias: systematic error from an overly simple hypothesis class.
- Variance: sensitivity to the particular training sample.
- Irreducible noise: the floor no model can beat.
- The decomposition for squared loss, and its analogues for classification.
- Why "more data" fixes variance but not bias.

$$
\mathbb{E}\left[(y-\hat f(x))^2\right]=\underbrace{\left(\mathbb{E}[\hat f]-f\right)^2}_{\text{bias}^2}+\underbrace{\mathbb{E}\left[(\hat f-\mathbb{E}\hat f)^2\right]}_{\text{variance}}+\underbrace{\sigma^2}_{\text{noise}}
$$

**Practice tasks**

- Simulate the decomposition with polynomial models of increasing degree and plot bias², variance, and total error.
- Identify the degree that minimises expected error and explain the shift as $n$ grows.

---

### Module 6.1.3 — Sample complexity and effective sample size

- How much data is needed to distinguish models that differ by a small amount.
- Effective sample size under correlation, clustering, or class imbalance.
- The cost of many folds versus a single holdout.
- Why rare-event problems need far more data than the row count suggests.

$$
n_{\text{eff}}\approx\frac{n}{1+(m-1)\rho}
\quad\text{(clustered data, cluster size } m,\ \text{intra-cluster correlation }\rho\text{)}
$$

**Practice tasks**

- Compute the effective sample size for a dataset with 100 users and 50 rows per user.
- Show how the variance of an AUC estimate grows as positive-class count shrinks.

---

> **Module completion gate (6.1).** You can explain what your evaluation estimates, what assumptions it needs, and how noisy the estimate is.

---

## 6.2 — Validation Schemes

**Objective.** Choose a split strategy that matches how the model will be used.

### Module 6.2.1 — Holdout, k-fold and repeats

- Train/validation/test discipline: three roles, three splits.
- k-fold cross-validation and the bias–variance trade-off in $k$.
- Leave-one-out: expensive and high variance.
- Repeated k-fold for stable estimates.
- When a single holdout is legitimate and when it is not.
- The cost of touching the test set.

$$
\widehat{\mathrm{CV}}_k=\frac{1}{k}\sum_{j=1}^{k}\hat R^{(j)}_{\text{val}}
$$

**Practice tasks**

- Compare 5-fold, 10-fold, and repeated 5-fold estimates of the same model; report mean and spread.
- Show a case where the holdout estimate differs from CV by more than the model's apparent gain.

---

### Module 6.2.2 — Stratified, grouped and temporal splits

- Stratification for imbalanced classes and regression bins.
- Group splits: patients, users, devices, documents, stores.
- Time-series splits: expanding, rolling, and blocked with a gap.
- Nested splits: a test set inside a group, and the rest for CV.
- Combining constraints: grouped AND temporal.
- Why random splitting is the default bug in applied ML.

$$
\text{rolling-origin: train}[1..t]\rightarrow\text{test}[t+1],\quad
\text{train}[1..t+1]\rightarrow\text{test}[t+2],\ \dots
$$

**Practice tasks**

- Build a grouped split for a dataset with repeated entities and show the score drop versus random.
- Use `TimeSeriesSplit` with a gap and explain what the gap represents.
- Construct a split that satisfies both group and time constraints.

---

### Module 6.2.3 — Nested and repeated protocols

- Inner loop for tuning, outer loop for evaluation.
- Repeated nested CV for small datasets.
- The computational budget and how to spend it.
- When to prefer a large holdout over nested CV.
- Reporting the protocol so it can be reproduced.

**Practice tasks**

- Run nested CV with a 20-trial search and compare with a naively tuned score.
- Quantify the optimism from tuning on the evaluation folds across five datasets.

---

> **Module completion gate (6.2).** You can defend your split strategy against the question "how is this different from how the model will be used?"

---

## 6.3 — Classification Metrics and Thresholds

**Objective.** Pick a metric that matches the decision, and a threshold that matches the cost.

### Module 6.3.1 — The confusion matrix and derived metrics

- True/false positives and negatives, and the four rates that matter.
- Precision, recall, specificity, F1, and their relationships.
- Balanced accuracy and macro/micro/weighted averaging.
- Matthews correlation coefficient for imbalanced binary problems.
- Why F1 hides the cost of errors.

$$
\text{precision}=\frac{TP}{TP+FP},\quad
\text{recall}=\frac{TP}{TP+FN},\quad
F_1=\frac{2PR}{P+R}
$$

**Practice tasks**

- Compute all metrics for a fixed threshold and show two models with identical accuracy and different behaviour.
- Show macro and micro F1 diverging on a long-tailed multiclass problem.

---

### Module 6.3.2 — Threshold-free metrics

- ROC curves and AUC: what it measures and why it can mislead.
- Precision–recall curves and PR-AUC under class imbalance.
- The base-rate effect on precision.
- Lift and cumulative gains for targeting.
- Kendall's insight: AUC is a ranking probability.

$$
\mathrm{AUC}=\Pr\left(\hat p(x^{+})>\hat p(x^{-})\right)=\frac{1}{n_+n_-}\sum_{i\in+}\sum_{j\in-}\mathbf{1}[\hat p_i>\hat p_j]
$$

**Practice tasks**

- Show two models with equal AUC but very different PR curves.
- Demonstrate how precision at a fixed recall changes when the base rate drops 10×.

---

### Module 6.3.3 — Threshold selection

- Expected-cost minimisation with a cost matrix.
- Capacity constraints: human review bandwidth, contact limits, budgets.
- Operating points and why the default 0.5 is arbitrary.
- Threshold stability across folds and over time.
- Segment-specific versus global thresholds.

$$
C(t)=\pi_+\left(1-\text{recall}(t)\right)c_{FN}+\pi_-\left(1-\text{specificity}(t)\right)c_{FP}
$$

**Practice tasks**

- Derive the cost-optimal threshold on validation data and compare with 0.5.
- Show the threshold drifting when the base rate shifts, and propose a fix.

---

> **Module completion gate (6.3).** You can state the metric and the threshold, the cost behind both, and the operating point you would ship.

---

## 6.4 — Regression Metrics

**Objective.** Measure continuous error in a way that reflects the real cost.

### Checklist

- MAE and RMSE: interpretation, units, and sensitivity to outliers.
- MAPE and its pathologies near zero; sMAPE as a partial fix.
- $R^2$: what it means and what it does not.
- Quantile (pinball) loss for asymmetric costs.
- Poisson deviance for counts.
- Mean bias as a separate, essential diagnostic.
- Heteroscedastic error: metrics that hide where the model is unreliable.

$$
\mathrm{RMSE}=\sqrt{\frac{1}{n}\sum_i(y_i-\hat y_i)^2},\qquad
\rho_\tau(y,\hat y)=\max\left(\tau(y-\hat y),\ (\tau-1)(y-\hat y)\right)
$$

### Practice tasks

- Compare MAE and RMSE on a dataset with heavy-tailed errors and explain the ranking difference.
- Report per-segment RMSE and show the aggregate metric hiding a badly failing segment.
- Fit a $\tau=0.9$ quantile model and check that roughly 90% of outcomes fall below the prediction.

> **Module completion gate (6.4).** You can choose a regression metric from the cost structure and show its segment-level behaviour.

---

## 6.5 — Ranking and Probabilistic Metrics

**Objective.** Evaluate systems where order and probability matter more than a hard label.

### Checklist

- Recall@$k$, precision@$k$, hit rate, MRR.
- nDCG with graded relevance and the log discount.
- MAP for ranked retrieval.
- Log loss as the scoring rule that rewards honest probabilities.
- Brier score and its decomposition.
- Proper scoring rules: why they cannot be gamed by rescaling.
- Ranking metrics for recommendation and search, with position bias caveats.

$$
\mathrm{nDCG}@k=\sum_{i=1}^{k}\frac{2^{rel_i}-1}{\log_2(i+1)},\qquad
\mathrm{MRR}=\frac{1}{Q}\sum_{q=1}^{Q}\frac{1}{\text{rank}_q}
$$

### Practice tasks

- Evaluate a small recommender with recall@10, nDCG@10, and MRR, and explain why they disagree.
- Show a model improving accuracy while log loss worsens, and explain what that means.

> **Module completion gate (6.5).** You can select a ranking or probabilistic metric that matches the product goal, and justify it over accuracy.

---

## 6.6 — Learning Curves and Capacity Diagnosis

**Objective.** Diagnose whether you need more data, a better model, or better features.

### Checklist

- Learning curves: training and validation error versus training-set size.
- Validation curves: error versus a hyperparameter.
- Recognising underfitting, overfitting, and the well-fit regime.
- Whether more data will help (gaps closing) or not (curves converged).
- Whether more capacity will help (both errors high).
- Data efficiency: performance per labelled example.
- The double-descent phenomenon and why it complicates the classic story.

$$
\text{gap}(n)=\hat R_{\text{train}}(n)-\hat R_{\text{val}}(n)
$$

### Practice tasks

- Plot learning curves for three model classes and state the recommended next action for each.
- Show a case where doubling the data is worth less than one good feature.

> **Module completion gate (6.6).** Given learning curves, you can prescribe the next experiment rather than guessing.

---

## 6.7 — Statistical Comparison of Models

**Objective.** Decide whether one model is actually better, or merely luckier on this split.

### Module 6.7.1 — Uncertainty of a metric

- Bootstrap confidence intervals for any metric.
- Wilson intervals for proportions; normal approximation's failure at extremes.
- Standard error of AUC and of PR-AUC.
- Reporting format: estimate, interval, $n$.
- Why a single number in a table is an incomplete result.

$$
\text{Wilson: }\frac{\hat p+\frac{z^2}{2n}\pm z\sqrt{\frac{\hat p(1-\hat p)}{n}+\frac{z^2}{4n^2}}}{1+\frac{z^2}{n}}
$$

**Practice tasks**

- Bootstrap a 95% interval for AUC and compare with the analytic approximation.
- Show two models whose intervals overlap heavily but whose point estimates differ by 2 points.

---

### Module 6.7.2 — Paired tests across folds

- Why paired comparisons are more powerful than unpaired.
- McNemar's test on a single holdout.
- Corrected resampled $t$-test for cross-validation.
- The dependence problem in CV folds and its effect on significance.
- Effect size: report the difference in practical units.

$$
\chi^2_{\text{McNemar}}=\frac{(\lvert b-c\rvert-1)^2}{b+c}
\quad\text{with } b,c \text{ the discordant pairs}
$$

**Practice tasks**

- Run a corrected resampled $t$-test between two models across ten folds.
- Show a "significant" result disappearing under a corrected test.

---

### Module 6.7.3 — Comparing many models fairly

- Multiple comparisons when sweeping a leaderboard.
- Why the best of 50 models on one split is optimistically biased.
- Nested evaluation or a fresh holdout for the winner.
- Reporting the family of models tested, not only the winner.
- Selection bias and the winner's curse in model search.

> **Module completion gate (6.7).** Every model comparison you report includes an interval and a test appropriate to paired, dependent data.

---

## 6.8 — Error Analysis and Slices

**Objective.** Find where the model fails, and quantify how badly.

### Module 6.8.1 — Building an error taxonomy

- Sample errors deliberately: false positives, false negatives, and near misses.
- Read 50–100 errors and write down recurring patterns.
- Categorise by cause: missing feature, ambiguity, label noise, domain shift, model limit.
- Prioritise by frequency × cost, not by anecdote.
- Convert each category into a testable hypothesis.

**Practice tasks**

- Read 100 errors and produce a taxonomy with counts and three example cases per category.
- Turn the top category into a feature experiment and measure whether it helps.

---

### Module 6.8.2 — Slice-based evaluation

- Slices by protected attribute, geography, time, device, and value segment.
- Worst-group performance as a headline metric, not an appendix.
- Minimum slice size for a trustworthy estimate.
- Slice discovery: automated search for failing subgroups.
- Reporting: table of slices with size, metric, and interval.

$$
\text{worst-group}=\min_{g\in\mathcal{G}}\ \hat R_g,\qquad
\text{gap}=\max_g \hat R_g-\min_g \hat R_g
$$

**Practice tasks**

- Evaluate twenty slices with intervals and rank by worst performance.
- Find a slice where the model is worse than the trivial baseline.

---

### Module 6.8.3 — Fairness metrics and trade-offs

- Demographic parity, equal opportunity, equalised odds, predictive parity.
- The impossibility result: you cannot satisfy all fairness criteria at once.
- Base-rate differences and why they create tension.
- Choosing a criterion from the decision context and the legal setting.
- Documenting the choice and its consequences.

$$
\text{demographic parity: } \Pr(\hat Y=1\mid A=0)=\Pr(\hat Y=1\mid A=1)
$$

**Practice tasks**

- Compute three fairness metrics for a model and show they conflict.
- Write a one-paragraph justification for the criterion you would adopt and why.

> **Module completion gate (6.8).** Your evaluation reports worst-group performance, an error taxonomy, and an explicit fairness criterion.

---

## 6.9 — Uncertainty in Predictions

**Objective.** Give a range, not a false sense of precision.

### Checklist

- Confidence intervals for metrics versus prediction intervals for outcomes.
- Quantile regression for asymmetric uncertainty.
- Bootstrap prediction intervals.
- Conformal prediction: distribution-free intervals with a coverage guarantee.
- Prediction sets for classification.
- Coverage versus sharpness: the real trade-off.
- Where uncertainty estimates break: distribution shift and small calibration sets.

$$
\text{split conformal: } \hat q=\text{the }\left\lceil\frac{(n+1)(1-\alpha)}{n}\right\rceil\text{-th smallest score},\quad
C(x)=\left\{y:\ s(x,y)\le\hat q\right\}
$$

### Practice tasks

- Build split-conformal intervals and verify empirical coverage on held-out data.
- Report interval width by segment and show where the model is least certain.
- Show conformal coverage failing under a shifted test distribution.

> **Module completion gate (6.9).** You can attach an interval or prediction set to individual predictions and demonstrate its coverage empirically.

---

## 6.10 — Evaluation for Deployment

**Objective.** Close the gap between an offline score and an online outcome.

### Checklist

- Why offline gains fail to ship: proxy mismatch, feedback loops, latency, user behaviour.
- Offline metrics that correlate with the online goal (and how to validate the correlation).
- Backtesting with historical decisions and counterfactual caveats.
- Off-policy evaluation for ranking and recommendation.
- Test-set governance: freeze it, version it, and count how often it is used.
- Benchmark contamination and why public leaderboards saturate.
- Monitoring-aware evaluation: metrics you can compute in production.
- Pre-registering the success criterion before the experiment.

### Practice tasks

- Map every offline metric in your project to a plausible online metric, and state the gap.
- Build a frozen, versioned eval set with a documented update policy.
- Design the production monitoring that would catch a 5% quality regression.

> **Module completion gate (6.10).** You can state what your offline evaluation does and does not predict about production, and how you would detect the difference.

---

## 6.11 — Level 6 Capstone: Generalization Dossier

### Project: `eval-forge` — an evaluation harness and a full evaluation report

**Difficulty.** Advanced

**Purpose.** Produce the document and the code that let a reviewer trust your numbers. This is the artefact that most distinguishes a strong applied-science candidate from a competent modeller.

### A. Functional requirements

**Part 1 — Evaluation harness (code)**

- Pluggable split strategies: holdout, stratified k-fold, grouped, temporal, nested.
- Metric library: classification, regression, ranking, calibration, with bootstrap intervals for every metric.
- Paired statistical comparison: corrected resampled $t$-test, McNemar, bootstrap difference.
- Slice evaluation with automatic interval computation and minimum-size guards.
- Conformal prediction wrapper for at least one model type.
- A single command that regenerates the whole report.

**Part 2 — Generalization study (experiment)**

- Three model classes compared on the same protocol.
- Learning curves for each, with a stated recommendation.
- Tuning optimism quantified: naive score versus nested-CV score.
- Error taxonomy from at least 100 inspected errors.
- Slice table with at least 15 slices, worst-group highlighted.
- Calibration and conformal coverage reported.

**Part 3 — Dossier (writing)**

- Protocol section written **before** results, with the success criterion.
- Results table: estimate, interval, and $n$ for every metric.
- Threats-to-validity section: leakage, shift, dependence, multiple comparisons.
- A "what would change my mind" section.
- A one-page executive summary with a recommendation.

### B. Suggested architecture

```text
eval-forge/
├── conf/
│   ├── protocol.yaml        # frozen before results
│   └── slices.yaml
├── src/eval_forge/
│   ├── splits.py            # holdout, k-fold, group, temporal, nested
│   ├── metrics.py           # metrics + bootstrap intervals
│   ├── compare.py           # paired tests, effect sizes
│   ├── slices.py            # slice evaluation + guards
│   ├── conformal.py         # prediction intervals / sets
│   └── report.py            # markdown + figures generation
├── reports/
│   ├── 00_protocol.md
│   ├── 01_results.md
│   ├── 02_error_taxonomy.md
│   ├── 03_slices.md
│   └── 04_threats_to_validity.md
└── tests/
```

### C. Acceptance targets

| Component | Target |
|---|---|
| Bootstrap intervals | Empirical coverage within 2% of nominal at $n=500$ |
| Paired test | Correct false-positive rate under the null in simulation |
| Nested CV | Naive-vs-nested optimism quantified and explained |
| Slice evaluation | No slice reported below the minimum-size threshold |
| Conformal | Empirical coverage within 1.5% of nominal on exchangeable data |
| Report | Every headline number has an interval and an $n$ |

### D. Stretch goals

- Add a drift simulation that shows how each metric degrades under shift.
- Add off-policy evaluation for a ranking model.
- Add a "model card" generator that consumes the harness outputs.
- Compare bootstrap, analytic, and conformal intervals in one figure.
- Automate the report in CI on every model change.

### E. Acceptance criteria

| Area | Required evidence |
|---|---|
| **Protocol discipline** | Protocol committed to Git before results were produced |
| **Statistical rigour** | Intervals and paired tests on every comparison |
| **Error understanding** | Taxonomy from 100+ errors with counts and priorities |
| **Slice honesty** | Worst-group reported as a headline, not buried |
| **Uncertainty** | Conformal coverage demonstrated, not assumed |
| **Communication** | Executive summary a non-specialist can act on |
| **Reproducibility** | One command regenerates every number in the dossier |

> Level 6 is complete when a skeptical reviewer can read your protocol, rerun your harness, and arrive at the same conclusion with the same uncertainty.

---

## Level 6 interview question bank

### A. Validation

- What is the difference between a validation set and a test set, and why do you need both?
- What is nested cross-validation, and what problem does it solve?
- When would you use a grouped split? Give a concrete example.
- How do you validate a time-series model, and why is random splitting wrong?
- What is the cost of evaluating on the test set many times?
- How much data do you need to detect a 0.5-point AUC difference?

### B. Metrics

- Why is accuracy a bad metric for imbalanced problems?
- When is PR-AUC more informative than ROC-AUC?
- What does AUC actually measure, in one sentence?
- How do you choose a threshold, and what inputs do you need?
- What is log loss, and why does it punish overconfidence?
- Which regression metric would you use for a cost-prediction problem, and why?
- What is nDCG, and when would you use it over recall@k?

### C. Generalization

- Explain the bias–variance trade-off with a formula.
- What do learning curves tell you that a single score does not?
- When does more data stop helping?
- What is double descent, and does it change how you should work?
- Why can a model with lower training error generalise worse?

### D. Comparison and error analysis

- How do you decide whether model A is significantly better than model B?
- What is a corrected resampled $t$-test, and why does the naive one fail?
- How do you build an error taxonomy, and what do you do with it?
- What is worst-group accuracy, and why should it be a headline metric?
- How do you evaluate a slice with only 30 examples?
- Which fairness criterion would you choose, and what do you give up?

### E. Uncertainty and deployment

- What is the difference between a confidence interval and a prediction interval?
- How does conformal prediction provide coverage guarantees?
- What are the limits of conformal methods?
- Why do offline improvements often fail to appear online?
- How would you design a frozen evaluation set and govern it?
- What would make you distrust a 0.99 AUC result on a new dataset?

### Interview readiness standard

1. Name the metric and the decision it serves.
2. State the validation protocol and why it matches deployment.
3. Give the estimate with an interval and an $n$.
4. Name the biggest threat to validity.
5. Say what result would change your conclusion.

---

## Level 6 final assessment

### Knowledge

- I can define the risk my evaluation estimates and its assumptions.
- I can decompose error into bias, variance, and noise.
- I can choose a split strategy that matches deployment.
- I can pick a metric and a threshold from a cost structure.
- I can compare models with paired tests and intervals.
- I can build an error taxonomy and evaluate slices.
- I can attach calibrated uncertainty to predictions.
- I understand why offline evaluation does not guarantee online success.

### Practical skills

- I have built an evaluation harness with pluggable splits and bootstrap intervals.
- I have quantified tuning optimism with nested CV.
- I have produced a slice table with worst-group reporting.
- I have implemented conformal prediction and verified coverage.
- I have written a protocol before seeing results.

### Project

- `eval-forge` regenerates the full dossier from one command.
- Every headline number has an interval and an $n$.
- The threats-to-validity section is honest and specific.

> **Level 6 completion rule.** If a skeptical reviewer can reproduce your numbers, challenge your assumptions, and still reach your conclusion — you are ready for Deep Learning.

---

# PHASE 2 CAPSTONE — THE TABULAR DECISION SYSTEM

> **Purpose.** Compose Levels 4, 5, and 6 into one system: a leak-proof pipeline, a tuned and calibrated model, and an evaluation rigorous enough to put in front of a decision-maker.

**Difficulty.** Advanced
**Suggested duration.** 1–2 weeks
**Depends on.** Levels 4, 5, and 6.

## A. The brief

Pick a real tabular problem with a genuine decision attached — credit risk, churn with a retention budget, hospital readmission with a care team, insurance claim triage, delivery-delay prediction, exam-outcome support. The domain matters less than the rigour.

Deliver a system that answers four questions:

1. **Is the data trustworthy?** (validation, leakage audit, point-in-time correctness)
2. **Is the model good?** (baselines, tuning, calibrated probabilities, untouched evaluation)
3. **Where does it fail?** (error taxonomy, worst-group, cost of those failures)
4. **What should the organisation do?** (threshold, expected value, monitoring plan)

## B. Required deliverables

| # | Deliverable | What "done" looks like |
|---|---|---|
| 1 | Feature pipeline | Config-driven, reproducible, bit-identical output |
| 2 | Leakage audit | Six leak types checked; regression test in CI |
| 3 | Baseline set | Trivial + linear, with intervals |
| 4 | Tuned model | Documented search, unbiased score from nested CV |
| 5 | Calibration | Reliability diagram, ECE, correction applied |
| 6 | Generalization study | Learning curves plus a stated next action |
| 7 | Error taxonomy | 100+ errors read, categorised, prioritised |
| 8 | Slice report | 15+ slices with intervals and worst-group flagged |
| 9 | Decision layer | Cost matrix, threshold, expected value per 1,000 cases |
| 10 | Deployment readiness | Latency, model size, monitoring metrics, retraining trigger |
| 11 | Decision memo | One page, non-technical, with a recommendation |
| 12 | Reproducibility | One command rebuilds every number |

## C. Suggested architecture

```text
raw data ─► validate ─► clean/dedup ─► features ─► pipeline (fitted on train only)
                                                        │
                          ┌─────────────────────────────┼─────────────────────────────┐
                          ▼                             ▼                             ▼
                     baselines                    tuned models                  calibration
                          │                             │                             │
                          └──────────────► evaluation harness (splits, metrics, tests)
                                                        │
                             ┌──────────────────────────┼──────────────────────────┐
                             ▼                          ▼                          ▼
                      error taxonomy              slice report               decision layer
                             │                          │                          │
                             └──────────────────────────┴──────────────► decision memo
                                                                              │
                                                                    monitoring plan
```

## D. Grading rubric

| Dimension | 1 — Not yet | 3 — Competent | 5 — Strong |
|---|---|---|---|
| **Data integrity** | No validation | Schema + dedup | Point-in-time correct, audited, tested in CI |
| **Modelling** | One model, default params | Baselines + tuning | Documented protocol, unbiased nested score |
| **Evaluation** | Single accuracy number | Intervals on metrics | Paired tests, slice analysis, conformal coverage |
| **Error analysis** | Anecdotes | Taxonomy with counts | Taxonomy → hypothesis → measured fix |
| **Decision layer** | None | Threshold chosen | Cost matrix, expected value, sensitivity analysis |
| **Communication** | Notebook dump | Clear README | Memo that changes a decision, with caveats stated |

**Pass mark.** At least 3 in every dimension, with **Evaluation** and **Decision layer** at 4 or above.

## E. Defence questions

- What is your strongest evidence that this model will work on next month's data?
- Which single assumption would, if false, invalidate your headline number?
- What is your worst-performing slice, and what would you do about it?
- Why this threshold and not the one that maximises F1?
- How much does the model earn per 1,000 cases, and what is the interval on that estimate?
- What would you monitor in the first week after launch?
- If you had to halve the feature count tomorrow, what goes and what breaks?

---

# PHASE 2 FINAL ASSESSMENT

Complete this before starting Phase 3 (Deep Learning).

## Knowledge checklist

**Data (L4)**

- I can state the grain of a dataset and validate it with a schema.
- I choose imputation from the missingness mechanism, not from habit.
- I can encode high-cardinality features without leaking.
- I can build point-in-time-correct temporal features.
- I can name, detect, and prevent all six leakage types.

**Modelling (L5)**

- I can derive and interpret linear, logistic, and regularised models.
- I can explain bagging and boosting from first principles.
- I can tune with a documented protocol and report an unbiased score.
- I can calibrate probabilities and measure calibration.
- I can produce global and local explanations and state their limits.

**Evaluation (L6)**

- I can define what my evaluation estimates and its assumptions.
- I choose split strategies that match deployment.
- I choose metrics and thresholds from a cost structure.
- I compare models with paired tests and intervals.
- I build error taxonomies and evaluate slices.
- I attach calibrated uncertainty to predictions.
- I can explain why offline gains may not ship.

## Practical checklist

- [ ] Level 4 capstone (`feature-forge`) regenerates a bit-identical feature matrix.
- [ ] Level 5 capstone (`tabular-arena`) beats its baseline on an untouched split and is calibrated.
- [ ] Level 6 capstone (`eval-forge`) regenerates a full evaluation dossier.
- [ ] Phase capstone scores at least 3 in every rubric dimension.
- [ ] Every headline number in my reports has an interval and an $n$.
- [ ] I have read at least 100 model errors and written a taxonomy.
- [ ] I have written a decision memo a non-specialist could act on.

## The self-honesty test

Answer these out loud, without notes. If any answer takes more than 60 seconds, revisit that level.

1. What is the grain of your data, and how did you verify it?
2. Name three ways your pipeline could leak, and the test that prevents each.
3. Why did you choose this model over the two you rejected?
4. What exactly does your AUC estimate, and what is its interval?
5. Where does your model fail worst, and how much does that cost?
6. Why is your threshold where it is?
7. What would you monitor after launch, and what triggers a retrain?
8. If the base rate doubled tomorrow, what would break first?

> **Phase 2 is complete** when all four capstones pass and you can answer the eight questions above with numbers, not adjectives.

---

# APPENDIX

## A. Formula sheet for Phase 2

| Topic | Formula |
|---|---|
| Ridge | $\hat\beta=(X^\top X+\lambda I)^{-1}X^\top y$ |
| Lasso objective | $\lVert y-X\beta\rVert_2^2+\lambda\lVert\beta\rVert_1$ |
| Logistic log-odds | $\log\frac{p}{1-p}=x^\top\beta$ |
| Cross-entropy | $-\frac{1}{n}\sum_i\left[y_i\log\hat p_i+(1-y_i)\log(1-\hat p_i)\right]$ |
| Gini impurity | $G=1-\sum_k p_k^2$ |
| Entropy | $H=-\sum_k p_k\log p_k$ |
| Information gain | $I(\text{parent})-\sum_c\frac{n_c}{n}I(\text{child})$ |
| Boosting update | $F_m=F_{m-1}+\nu h_m$ |
| Random-forest variance | $\rho\sigma^2+\frac{1-\rho}{B}\sigma^2$ |
| Bagging/OOB error | average error over out-of-bag samples |
| k-means objective | $\sum_k\sum_{x\in C_k}\lVert x-\mu_k\rVert^2$ |
| Silhouette | $s(i)=\frac{b(i)-a(i)}{\max\{a(i),b(i)\}}$ |
| PCA variance ratio | $\lambda_k/\sum_j\lambda_j$ |
| Target encoding (smoothed) | $\hat\theta_j=\frac{n_j\bar y_j+m\mu}{n_j+m}$ |
| Lift@k | precision in top $k$% ÷ base rate |
| Precision / recall | $\frac{TP}{TP+FP}$, $\frac{TP}{TP+FN}$ |
| $F_1$ | $\frac{2PR}{P+R}$ |
| AUC | $\Pr(\hat p(x^{+})>\hat p(x^{-}))$ |
| Brier score | $\frac{1}{n}\sum_i(\hat p_i-y_i)^2$ |
| ECE | $\sum_b\frac{n_b}{n}\lvert \mathrm{acc}(b)-\mathrm{conf}(b)\rvert$ |
| RMSE / MAE | $\sqrt{\frac{1}{n}\sum(y-\hat y)^2}$, $\frac{1}{n}\sum\lvert y-\hat y\rvert$ |
| Quantile loss | $\max(\tau(y-\hat y),(\tau-1)(y-\hat y))$ |
| nDCG@k | $\sum_{i\le k}\frac{2^{rel_i}-1}{\log_2(i+1)}$ (normalised by ideal DCG) |
| Wilson interval | $\frac{\hat p+\frac{z^2}{2n}\pm z\sqrt{\frac{\hat p(1-\hat p)}{n}+\frac{z^2}{4n^2}}}{1+\frac{z^2}{n}}$ |
| McNemar | $\chi^2=\frac{(\lvert b-c\rvert-1)^2}{b+c}$ |
| Bias–variance | $\mathbb{E}[(y-\hat f)^2]=\text{bias}^2+\text{variance}+\sigma^2$ |
| Effective $n$ (clustered) | $n_{\text{eff}}\approx\frac{n}{1+(m-1)\rho}$ |
| Conformal quantile | $\hat q$ at level $\lceil (n+1)(1-\alpha)\rceil/n$ |

## B. Twelve-week schedule

| Weeks | Focus | Milestone |
|---|---|---|
| 1 | L4: EDA workflow, univariate and bivariate analysis | Five-finding memo |
| 2 | L4: cleaning, missingness, duplicates, outliers | Data-quality report |
| 3 | L4: feature engineering, encoding, temporal features | Working feature pipeline |
| 4 | L4: leakage audit, imbalance, versioning **+ L4 capstone** | `feature-forge` signed off |
| 5 | L5: framing, baselines, linear models, regularisation | Baseline table with intervals |
| 6 | L5: trees, forests, boosting, libraries | Boosted model beats baseline |
| 7 | L5: unsupervised methods, tuning, nested CV | Unbiased tuned score |
| 8 | L5: model selection, interpretation, calibration **+ L5 capstone** | `tabular-arena` complete |
| 9 | L6: generalization, splits, metrics | Protocol frozen in Git |
| 10 | L6: comparison tests, slice analysis, error taxonomy | Slice table + taxonomy |
| 11 | L6: uncertainty, conformal, deployment evaluation | Coverage verified |
| 12 | L6 capstone **+ phase capstone** | `eval-forge` dossier + decision memo |

> Working full-time? Stretch to 16–18 weeks. Do not compress the evaluation weeks — they are the ones that change how you are perceived in interviews.

## C. Recommended resources

### Books

| Book | Use it for |
|---|---|
| *An Introduction to Statistical Learning* — James et al. | L5 models with labs |
| *The Elements of Statistical Learning* — Hastie et al. | L5–L6 reference depth |
| *Hands-On Machine Learning* — Géron | L4–L5 practical pipelines |
| *Feature Engineering for Machine Learning* — Zheng & Casari | L4 feature craft |
| *Interpretable Machine Learning* — Molnar | L5.9 explanations |
| *Trustworthy Online Controlled Experiments* — Kohavi et al. | L6.10 deployment evaluation |
| *Designing Machine Learning Systems* — Huyen | bridge to Levels 15–16 |
| *Fairness and Machine Learning* — Barocas et al. | L6.8 fairness |

### Documentation and references

- scikit-learn user guide — pipelines, model selection, calibration (read it properly; it is excellent).
- XGBoost, LightGBM, CatBoost parameter documentation.
- SHAP documentation and the original TreeSHAP paper.
- `mapie` documentation for conformal prediction.
- Pandera and Great Expectations documentation for data validation.

### Practice

- **Kaggle tabular competitions** — one per level; write up your validation strategy, not just your score.
- **OpenML** — many small datasets, good for protocol practice.
- **UCI repository** — messy data, real pitfalls.
- **Your own past analyses** — re-audit an old notebook for leakage. It is uncomfortable and extremely educational.

## D. The ten most common ways to fail this phase

| Failure | Symptom | Fix |
|---|---|---|
| Tuning before a protocol | Excellent CV (cross-validation), terrible production | Freeze the split and protocol first |
| Fitting preprocessing on all data | Suspiciously high scores | Fit inside the fold via a pipeline |
| Random splits on temporal or grouped data | Leakage you cannot see | Time-based or group-based splits |
| One metric, one number | No idea whether a gain is real | Intervals and paired tests |
| Optimising accuracy on 1% positives | Useless model | PR-AUC, recall at fixed precision, cost-based threshold |
| Ignoring calibration | Probabilities do not mean anything | Reliability diagram + Platt/isotonic |
| Trusting impurity importance | Wrong feature story | Permutation importance and SHAP, with caveats |
| Tuning on 50 models and reporting the winner | Winner's curse | Nested evaluation or a fresh holdout |
| No error analysis | You cannot say how it fails | Read 100 errors, build a taxonomy |
| Skipping the decision layer | Nobody can act on the model | Cost matrix, threshold, expected value per 1,000 |

## E. Progress tracker

| Level | Capstone | Repo link | Tests green | Key metric + interval | Defence rehearsed |
|---|---|---|---|---|---|
| L4 | `feature-forge` | | ☐ | | ☐ |
| L5 | `tabular-arena` | | ☐ | | ☐ |
| L6 | `eval-forge` | | ☐ | | ☐ |
| Phase | Tabular decision system | | ☐ | | ☐ |

---

## What comes next

**Phase 3 — Deep Learning · Levels 7–9**

| Level | Title | What it adds |
|---|---|---|
| **L7** | Neural Networks from First Principles | Backprop, autograd, MLPs, and the training loop implemented by you |
| **L8** | Optimization and Training Dynamics | Why networks train, why they fail, and how to make them converge |
| **L9** | Deep Learning Architectures | CNNs, RNNs, transformers, and how to choose an architecture |

Phase 3 assumes everything here: you will train on datasets you have validated (L4), compare against tabular baselines you can defend (L5), and evaluate every experiment with intervals, slices, and honest splits (L6). A deep-learning result without that discipline is a number looking for a story.

*Phase 2 of 6 · Levels 4–6 of 18 · Core ML*
