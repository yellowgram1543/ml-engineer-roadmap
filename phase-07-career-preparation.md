# PHASE 7 — CAREER PREPARATION

**ML Engineer / Applied Scientist Roadmap · Levels 17–18 of 18**

> **Phase goal.** Convert seventeen levels of work into offers. Level 17 turns your projects into three legible artefacts with a narrative a hiring manager can follow in ten minutes. Level 18 turns your knowledge into interview performance under time pressure, and your performance into a good decision about where to work.

---

## Phase dashboard

| Item | Details |
|---|---|
| **Phase** | 7 — Career Preparation |
| **Levels** | L17 · L18 |
| **Difficulty** | Professional |
| **Suggested duration** | 8–12 weeks at 2–3 hours/day (overlaps with applications) |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Core tools** | GitHub, Hugging Face Hub, a personal site, a video recorder, a question bank, mock-interview partners |
| **Capstone projects** | 2 level capstones + 1 phase capstone |
| **Final outcome** | A portfolio that gets callbacks, an interview loop you can pass, and an offer decision you can defend to yourself. |

**Prerequisites.** Level 16 complete. You cannot package work you have not done, and you cannot bluff a loop you have not prepared for.

---

## How this phase is structured

| Block | What it contains |
|---|---|
| **Dashboard** | Level, difficulty, duration, tools, project, outcome |
| **Numbered sections** (`17.1`, `17.2`, …) | One theme each |
| **Modules** (`17.1.1`, `17.1.2`, …) | The actual study checklist |
| **Practice tasks** | Small exercises that force retrieval, not re-reading |
| **Module completion gate** | The proof that the section is done |
| **Mini-project** | A small build inside the level |
| **Capstone** | The level's main artefact, with acceptance criteria |
| **Interview bank** | Questions you should be able to answer after the level |
| **Level assessment** | A checklist before you move on |

> **The rule of this phase:** every claim you make about yourself must be backed by an artefact someone can open, run, or read in under five minutes.

---

## Contents

| Level | Title | Sections | Duration | Capstone |
|---|---|---|---|---|
| [L17](#level-17--portfolio-and-research-capstone) | Portfolio and Research Capstone | 17.1 – 17.11 | 4–6 weeks | `portfolio-pack` — three projects, three case studies, one narrative |
| [L18](#level-18--interview-preparation) | Interview Preparation | 18.1 – 18.12 | 4–6 weeks | `interview-war-room` — drills, story bank, two recorded mock loops |
| [Phase capstone](#phase-7-capstone--career-launch-pack) | Integration project | — | 1–2 weeks | Complete application-ready package |
| [Roadmap close](#roadmap-complete) | Where this ends | — | — | The 18-level map and what comes after |

---

# LEVEL 17 — PORTFOLIO AND RESEARCH CAPSTONE

> **Goal.** Build a portfolio that survives the ten-minute hiring-manager scan: three projects that are each finished, measured, reproducible, and explained — plus one flagship that combines research rigour with production engineering.

## Level dashboard

| Item | Details |
|---|---|
| **Level** | 17 — Portfolio and Research Capstone |
| **Difficulty** | Professional |
| **Suggested duration** | 4–6 weeks |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Core tools** | GitHub, Hugging Face Hub, a static site, Loom/OBS, `pandoc`/Markdown, LinkedIn, a resume builder |
| **Main project** | **`portfolio-pack`** — three curated projects, three case studies, one flagship capstone, one site, one video |
| **Final outcome** | A portfolio a stranger can evaluate in ten minutes and a hiring manager can champion in a review meeting. |

**Prerequisites.** Levels 1–16. You need finished work; this level is about selection, packaging, and narrative, not new modelling.

---

## 17.1 — Portfolio Strategy

**Objective.** Decide what to show before you polish anything.

### Module 17.1.1 — What a hiring manager actually does

- Opens your GitHub, reads one README, looks at commit history, closes the tab: that is the entire first pass.
- Looks for: a real problem, a baseline, a measured result, a reproducible run, and a limitation stated honestly.
- Discounts: tutorial clones, notebook dumps, leaderboard screenshots with no protocol, projects with no README.
- Asks three questions: *can this person build, can this person measure, and can this person explain?*
- Portfolio review is a filtering exercise, not a reading exercise.

**Practice tasks**

- Time yourself scanning three other people's portfolios and write down what you concluded in 60 seconds each.
- Rewrite one of your own READMEs so the first screen answers "what, result, how to run".

---

### Module 17.1.2 — The three-artefact rule

Choose three projects that collectively prove:

1. **You can build a system** — pipeline, service, deployment, monitoring.
2. **You can measure and model** — baselines, validation, calibration, error analysis.
3. **You can go deep** — research-grade rigour, or a foundation-model system with cost and safety.

- One project should be in the domain you are targeting for work.
- At most one should be a "clean classic" (churn, MNIST-adjacent) — and only if it is exceptionally well executed.
- Depth beats breadth: three finished beats nine abandoned.
- A fourth "flagship" project is allowed, but only after the three are done.

**Practice tasks**

- Inventory every project you have and score each on: finished, measured, reproducible, explained, relevant.
- Select three and write one sentence on what each proves about you.

---

### Module 17.1.3 — The narrative

- A one-line positioning statement: role + domain + evidence.
- The order in which you present projects and why.
- The through-line: what you keep choosing to work on.
- What you deliberately exclude, and the story you tell if asked.
- Consistency across resume, site, GitHub, and LinkedIn.

$$
\text{positioning}=\text{role}+\text{domain}+\text{proof}\quad\text{e.g. "applied scientist, document intelligence, shipped a measured extraction system at USD 0.004 per doc"}
$$

**Practice tasks**

- Write three versions of your positioning statement and test them on a peer.
- Make your resume headline, site subtitle, and GitHub bio say the same thing.

> **Module completion gate (17.1).** You have three selected projects and a one-sentence positioning that a stranger repeats back correctly.

---

## 17.2 — Auditing and Curating Existing Work

**Objective.** Decide what to fix, what to hide, and what to retire.

### Checklist

- Audit each repository against the portfolio rubric (17.11).
- Identify the single biggest gap per project: measurement, reproducibility, or explanation.
- Delete or archive projects that weaken the narrative.
- Fix the top project first; a strong one outranks four mediocre ones.
- Remove secrets, PII, and leaked data from every repository (an old `config.py` with an API key is a real risk).
- Check licences on datasets and pretrained models before showcasing.
- Verify every claim in every README against a number you can reproduce today.

### Practice tasks

- Run a secrets scan across all repositories and fix every hit.
- Pick one old project, spend a day making it reproducible, and measure the improvement in how it reads.

> **Module completion gate (17.2).** Every repository you keep passes a secret scan and a five-minute reproduction check.

---

## 17.3 — Packaging a Project Properly

**Objective.** Make each project cheap to evaluate and cheap to trust.

### Module 17.3.1 — The README as a product page

- **First screen:** what it is, the result with a number and an interval, and the one command to reproduce.
- A figure that shows the result, not the architecture.
- "Why this matters" in two sentences.
- Quickstart that genuinely works from a clean clone.
- Results table with baselines and intervals.
- Limitations and failure modes, stated plainly.
- Links: demo, video, case study, paper.

```markdown
# Project name — one line on what it does
**Result:** 0.87 macro-F1 (95% CI 0.84–0.90), vs 0.71 baseline. Cost: USD 0.004 per document.
![results](figures/results.png)
## Quickstart
    make setup && make reproduce
## What it does / Why / How it works / Results / Limitations
```

**Practice tasks**

- Rewrite one README so a peer can state your result after ten seconds.
- Get a stranger to run your quickstart and record where they got stuck.

---

### Module 17.3.2 — Reproducibility as a feature

- Pinned environment, lockfile, and documented hardware.
- Sample data included so the pipeline runs without private access.
- One command for the headline result; a second for the full study.
- Deterministic seeds and a tolerance for expected variation.
- A CI badge that is actually green.

**Practice tasks**

- Rebuild your flagship on a fresh machine or a rented GPU using only the README.
- Time the reproduction and put that number in the README.

---

### Module 17.3.3 — Licence, citation, and hygiene

- A licence that matches your dependencies and data.
- A citation block; a DOI via Zenodo if you want permanence.
- Clean commit history that shows incremental work.
- No large binaries in Git; use releases or object storage.
- Issue templates and a contribution note if you want collaborators.

> **Module completion gate (17.3).** A stranger reproduces your headline result in under 30 minutes from the README alone.

---

## 17.4 — Case Studies

**Objective.** Write the six-part story that makes a project reviewable in three minutes.

### Module 17.4.1 — The six-part structure

1. **Problem and user** — who has this problem, and what decision changes?
2. **Constraint** — data, latency, cost, or privacy limit that shaped the design.
3. **Approach** — the baseline, the model, and the one non-obvious decision.
4. **Evidence** — the headline number with an interval, against a stated baseline.
5. **Failure** — the worst slice, the honest limitation, and what you would do next.
6. **Impact** — what it would change in production, in the user's units.

**Practice tasks**

- Write case studies for two projects at 600 words each.
- Have a peer mark any sentence that is not backed by a number or a decision.

---

### Module 17.4.2 — Writing the failure section

- Choose a failure that is informative, not one that makes the project look broken.
- Quantify it: which slice, how much worse, and at what cost.
- Distinguish "I know why and it is fixable" from "I know why and it is inherent".
- Show the diagnostic that found it.
- Propose the next experiment.

**Practice tasks**

- Rewrite a failure section three times: too defensive, too self-critical, and calibrated.
- Ask a peer which version they would trust in a hiring decision.

---

### Module 17.4.3 — Format and length

- One page is a summary; three pages is a case study; the repository is the appendix.
- Scannable headings; numbers in bold; no wall of prose.
- One diagram, maximum, and it should be the system or the result.
- Every case study ends with a link to the artefact.

> **Module completion gate (17.4).** A reviewer can explain your project's result and its main limitation after reading one page.

---

## 17.5 — The Research Capstone

**Objective.** Build the flagship artefact that distinguishes you from a bootcamp portfolio.

### Checklist

- Combine Level 14 (research rigour) with Level 15 (production engineering).
- One question, one method, one measured result, one working system around it.
- Pre-registered protocol, seeds, intervals, and a control.
- A released eval suite — your own, not a public benchmark.
- Cost per task and p95 latency, measured.
- A paper-style writeup plus a practitioner-facing summary.
- A demo with a hard cost ceiling.
- Explicit limitations and one negative result.

$$
\text{flagship}=\text{research question}+\text{measured evidence}+\text{running system}+\text{honest limits}
$$

### Practice tasks

- Draft the flagship's abstract before you finish the system, then reconcile it with the evidence.
- Ship the demo with a daily spend cap and log every session's cost.

> **Module completion gate (17.5).** Your flagship has a paper, a running system, an eval suite, and a stated cost per task.

---

## 17.6 — Demos, Videos and Live Links

**Objective.** Let people experience the work without installing anything.

### Checklist

- A 2–3 minute video: problem, demo, result, limitation. Script it, do not improvise.
- Screen recording with captions; no background music; readable text at 720p.
- A live demo with rate limits, a cost cap, and a clear "this is a demo" banner.
- A deterministic demo mode with cached outputs, so a demo never fails during a review.
- Accessibility: contrast, font size, and alt text.
- A one-click path from README to video to demo.

### Practice tasks

- Record three takes of a 2-minute demo and pick the one where the value is clear by 0:20.
- Run the demo from a cold start and time how long it takes to show a result.

> **Module completion gate (17.6).** Someone can understand your project's value from a 2-minute video without reading anything else.

---

## 17.7 — Profile, Resume and Screening Surface

**Objective.** Make the first ten seconds work.

### Module 17.7.1 — Resume structure

- One page for under ten years of experience; two at most.
- Header: name, role, location, links (GitHub, site, LinkedIn).
- Summary line that matches your positioning statement.
- Experience: action, method, metric, scale — every bullet has a number.
- Projects: only the three, each one line plus links.
- Skills: honest, grouped, and consistent with what you can be interviewed on.
- Education and publications last, unless research is your differentiator.

$$
\text{bullet}=\text{verb}+\text{what}+\text{method}+\text{metric}+\text{scale}
\quad\text{e.g. "Cut inference cost 62\% by distilling a 7B model to 1.3B at equal F1"}
$$

**Practice tasks**

- Rewrite five bullets so each contains a number and a mechanism.
- Remove every technology you would not want to be interviewed on.

---

### Module 17.7.2 — GitHub, site, and LinkedIn

- Pinned repositories: exactly the three, in narrative order.
- Profile README with the positioning line and links.
- A simple static site: home (positioning), projects, writing, contact.
- Hugging Face profile if you publish models or datasets.
- LinkedIn headline consistent with the resume; about section short and specific.
- A one-page PDF "portfolio index" for recruiters who will not click.

**Practice tasks**

- Pin exactly three repositories and archive the rest.
- Audit your online presence for anything inconsistent with your positioning.

---

### Module 17.7.3 — Screening and referrals

- The recruiter screen: role fit, timeline, compensation band, work authorisation.
- Referrals: the one-paragraph ask with a link to one artefact.
- Warm intros via open-source work, talks, and mutual contacts.
- Application tracking: a simple sheet with role, stage, contact, and next action.
- Volume versus targeting: 20 well-targeted applications beat 200 sprays.

> **Module completion gate (17.7).** A recruiter can determine your fit from your resume and one link in under a minute.

---

## 17.8 — Writing and Visibility

**Objective.** Publish work that makes people want to talk to you.

### Checklist

- Technical posts with a claim, evidence, and a reproducible artefact.
- The negative-result post: what you tried, what failed, what you learned.
- A reproducibility write-up: "I reproduced X and here is what broke".
- Distribution: your site, a community, and one aggregator; not ten.
- Consistency: one artefact per month beats a burst per year.
- Responding to comments with data rather than defensiveness.
- A monthly habit: ship, write, link, repeat.

### Practice tasks

- Write one post about a failure, with numbers, and publish it.
- Link every post back to a repository the reader can run.

> **Module completion gate (17.8).** You have at least two public write-ups, each tied to a runnable artefact.

---

## 17.9 — Open Source and Community

**Objective.** Earn credibility through contribution, not claims.

### Checklist

- Choose libraries you actually use in your projects.
- Start with documentation fixes, tests, and small bugs; then features.
- Read the contribution guide; match the project's style.
- Small, reviewable pull requests with a clear description.
- Maintain one small thing of your own: an eval set, a utility, a dataset.
- Community participation: answer questions where your users are.
- Track contributions as portfolio evidence with links.

### Practice tasks

- Land one merged pull request in a library you depend on.
- Publish one small reusable artefact (dataset, eval set, utility) with a clear licence.

> **Module completion gate (17.9).** You have a merged contribution and a maintained artefact you can point to.

---

## 17.10 — Portfolio Review and Defence

**Objective.** Test the portfolio against hostile attention before interviewers do.

### Checklist

- Recruit three reviewers: a peer, a senior engineer, and someone non-technical.
- Give them a 15-minute task: "decide if you would interview this person".
- Collect written feedback against the rubric; do not argue during review.
- Fix the top three issues; ignore cosmetic preferences.
- Rehearse the 30-second, 3-minute, and 15-minute versions of each project.
- Prepare answers for the five questions every reviewer asks: why this, what baseline, what failed, what is the cost, what would you change.
- Keep a changelog of portfolio improvements.

### Practice tasks

- Run the review with three people and record every gap they found.
- Re-run the review after fixes and compare.

> **Module completion gate (17.10).** Three reviewers independently reach "yes, interview" from the portfolio alone.

---

## 17.11 — Level 17 Capstone: Portfolio Pack

### Project: `portfolio-pack` — three projects, three case studies, one flagship, one narrative

**Difficulty.** Professional

**Purpose.** Produce the complete external-facing package that converts seventeen levels into callbacks.

### A. Functional requirements

**Artefact 1 — The flagship**

- Research question, measured result with intervals, running system, cost per task.
- Paper-style writeup (4 pages), README, demo video, live link with a cost cap.
- Eval suite released and documented.

**Artefact 2 — The engineering project**

- End-to-end system with a pipeline, a served API, monitoring, and a rollback.
- Case study emphasising reliability, latency, and cost.

**Artefact 3 — The modelling project**

- A tabular or classical problem executed with exemplary evaluation discipline.
- Calibration, slice analysis, a cost-based decision layer, and a decision memo.

**Shared**

- Three repositories, each with a first-screen README and a working quickstart.
- Three case studies at one page each, in the six-part structure.
- A positioning statement used consistently across resume, site, GitHub, and LinkedIn.
- A personal site with a projects index and two public write-ups.
- One 2-minute demo video per project.
- A portfolio index PDF for recruiters.

### B. Suggested architecture

```text
portfolio-pack/
├── POSITIONING.md                # role + domain + proof
├── resume/
│   └── resume.pdf
├── flagship/                     # repo (separate GitHub repo linked here)
├── engineering/                  # repo
├── modelling/                    # repo
├── case_studies/
│   ├── flagship.md
│   ├── engineering.md
│   └── modelling.md
├── videos/
│   ├── flagship.mp4
│   ├── engineering.mp4
│   └── modelling.mp4
├── site/                         # static site source
├── reviews/
│   ├── peer.md
│   ├── senior.md
│   └── nontechnical.md
└── index/
    └── portfolio_index.pdf
```

### C. Acceptance targets

| Component | Target |
|---|---|
| Reproducibility | Each project reproduces its headline result in under 30 minutes |
| Measurement | Every claim has a number, an interval, and an $n$ |
| Honesty | Each case study contains a quantified failure and a limitation |
| Consistency | Positioning statement identical across all surfaces |
| Evaluability | A stranger states each result after ten seconds on the README |
| Reviews | Three external reviewers independently say "interview" |
| Hygiene | Zero secrets, zero PII, zero broken links, zero dead demos |

### D. Stretch goals

- Get one project used by someone outside your circle.
- Publish a dataset or eval suite others adopt.
- Give a 20-minute talk based on the flagship.
- Turn one case study into a conference or meetup submission.

### E. Acceptance criteria

| Area | Required evidence |
|---|---|
| **Selection** | Three projects that prove build, measure, and depth |
| **Packaging** | First-screen READMEs, quickstarts, licences, CI |
| **Story** | Six-part case studies with quantified failure |
| **Flagship** | Research rigour plus a running, cost-capped system |
| **Visibility** | Site, videos, write-ups, consistent profiles |
| **Outside validation** | Three reviewers reach "interview" independently |

> Level 17 is complete when a hiring manager who has never spoken to you can defend your candidacy to their team.

---

## Level 17 interview question bank

### A. Portfolio and story

- Walk me through your portfolio in two minutes.
- Which project are you most proud of, and why that one?
- What is the weakest part of your portfolio, and what are you doing about it?
- Why did you choose these three projects?
- What did you leave out, and why?

### B. Evidence

- What is the headline result of each project, with an interval?
- What baseline did you beat, and by how much?
- Which result would not survive a change of seed or dataset?
- How would I reproduce your flagship in an hour?

### C. Failure and judgement

- Tell me about a project that did not work.
- What did you ship that you would now do differently?
- Where did you cut scope, and what did that cost?
- What decision in your work are you least sure about?

### D. Professionalism

- How do you document a model for someone else to operate?
- What does your commit history say about how you work?
- How do you handle a dependency you cannot trust?
- How do you keep a demo from failing in front of a customer?

### Interview readiness standard

1. State the problem and the user in one sentence each.
2. Give the result with an interval, against a named baseline.
3. Name the constraint that shaped the design.
4. Name the failure and the next experiment.
5. Offer the link without being asked.

---

## Level 17 final assessment

### Knowledge

- I understand what a hiring manager does in the first pass.
- I can select three projects that prove different things.
- I can write a README that answers what, result, and how to run.
- I can write a six-part case study with a quantified failure.
- I can define a positioning statement and keep it consistent.
- I can package a project for reproducibility in under 30 minutes.
- I know how to get and use external review.

### Practical skills

- I have three finished, reproducible, documented projects.
- I have three case studies with numbers and limitations.
- I have a flagship with a paper, a demo, and an eval suite.
- I have a site, videos, and consistent profiles.
- I have three external reviewers who said "interview".

### Project

- `portfolio-pack` passes every acceptance target.
- Zero secrets, zero broken links, zero dead demos.
- I can defend any project at 30 seconds, 3 minutes, and 15 minutes.

> **Level 17 completion rule.** If your portfolio can get you the interview without you in the room, you are ready for Level 18.

---

# LEVEL 18 — INTERVIEW PREPARATION

> **Goal.** Convert knowledge into performance. Learn the loop, drill the rounds, rehearse under pressure, and turn offers into a decision you can defend.

## Level dashboard

| Item | Details |
|---|---|
| **Level** | 18 — Interview Preparation |
| **Difficulty** | Professional |
| **Suggested duration** | 4–6 weeks |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Core tools** | Your portfolio, a question bank, a timer, a recorder, mock partners |
| **Main project** | **`interview-war-room`** — drills, story bank, question ledger, two recorded mock loops |
| **Final outcome** | Pass applied-science and ML-engineer loops with prepared derivations, rehearsed designs, and measured project stories. |

**Prerequisites.** Level 17. Interviews are mostly a retrieval problem over work you have already done; you cannot retrieve what you never built.

---

## 18.1 — Understanding the Loop

**Objective.** Know exactly what each round is testing so you prepare the right thing.

### Module 18.1.1 — Role archetypes and their loops

| Role | Emphasis | Typical rounds |
|---|---|---|
| **ML Engineer** | systems, serving, production | coding, ML fundamentals, ML system design, production/debugging, behavioural |
| **Applied Scientist** | modelling, statistics, experimentation | ML depth, ML coding, statistics & A/B, ML system design, research/project defence |
| **Research Engineer** | implementation depth | coding, DL internals, distributed training, research discussion |
| **Data Scientist (ML)** | product analytics + modelling | SQL, statistics, case study, light ML, behavioural |
| **LLM / GenAI Engineer** | applied foundation models | coding, LLM fundamentals, RAG/agents design, evaluation, safety |

- Read the job description for the round structure before applying.
- Map your three portfolio artefacts to the rounds they support.
- Identify your weakest round early; it determines your prep allocation.

**Practice tasks**

- Take five real job postings and infer the likely loop for each.
- Build a project-to-round map for your own portfolio.

---

### Module 18.1.2 — What interviewers actually score

- Structure: can you organise an answer before speaking?
- Depth: can you go one level below the buzzword?
- Trade-offs: do you know what you gave up?
- Measurement: do you quantify claims?
- Communication: can a non-specialist follow you?
- Ownership: can you say what you did versus what the team did?
- Honesty: do you say "I do not know" cleanly?

$$
\text{score}\approx\text{structure}+\text{depth}+\text{trade-offs}+\text{evidence}+\text{clarity}
$$

**Practice tasks**

- Score yourself 1–5 on each dimension from your last three mock answers.
- Pick the two weakest dimensions and design drills for them.

---

### Module 18.1.3 — The preparation plan

- Six weeks: two weeks breadth (fundamentals), two weeks depth (your specialisation), two weeks simulation (mocks).
- Daily: 10 fundamentals questions, 1 coding problem, 1 design or story.
- Weekly: one full mock loop, one portfolio refinement, one written debrief.
- Spaced repetition for derivations and definitions.
- Track everything in a question ledger with confidence scores.

**Practice tasks**

- Write your six-week plan with hours per round and a weekly mock.
- Set up a question ledger with 100 entries and initial confidence ratings.

> **Module completion gate (18.1).** You know your target role's loop, your weakest round, and the plan that addresses it.

---

## 18.2 — ML Fundamentals Drill

**Objective.** Answer any fundamentals question with a definition, a mechanism, and a trade-off.

### Checklist

- The 100-question bank (Appendix A) as the backbone; add your own gaps.
- Derive on paper: OLS, logistic gradient, softmax cross-entropy, attention, backprop for two layers, DDPM loss, DPO loss.
- Explain each in 30 seconds, then in 3 minutes.
- For every method: what it assumes, what it costs, when it fails.
- Keep a ledger: question, confidence (1–5), last date, and where you learned it.
- Revisit anything below 4 weekly; below 3, rebuild it from a reference.
- Practise aloud; silent recall is not interview recall.

$$
\text{mastery}:\ \text{definition}\rightarrow\text{mechanism}\rightarrow\text{cost}\rightarrow\text{failure}\rightarrow\text{alternative}
$$

**Practice tasks**

- Answer 10 questions per day aloud and record the confidence after each.
- Re-derive the five core formulas from memory every Monday.

---

### Module 18.2.1 — The five-minute whiteboard set

1. Derive $\hat\beta=(X^\top X)^{-1}X^\top y$ and state the assumptions.
2. Derive the logistic regression gradient and explain $\hat p-y$.
3. Write scaled dot-product attention with shapes and the reason for $\sqrt{d_k}$.
4. Backpropagate through a two-layer ReLU network with cross-entropy.
5. State the DDPM objective and explain each term in one sentence.

**Practice tasks**

- Do all five in 25 minutes total, on a whiteboard, without notes.
- Repeat weekly until each takes under four minutes.

> **Module completion gate (18.2).** You can deliver the five-minute whiteboard set cold, with correct shapes and one trade-off each.

---

## 18.3 — ML Coding Round

**Objective.** Implement models and utilities in NumPy under time pressure, with tests.

### Checklist

- Implement: k-means, logistic regression with gradient descent, softmax, cross-entropy, top-k, AUC, precision/recall/F1, a confusion matrix, sampling with temperature, a moving average, one-hot encoding.
- Implement attention and a minimal training step for an MLP.
- Vectorise everything; avoid loops over samples.
- Shape discipline: state shapes before coding.
- Edge cases: empty input, single class, ties, NaNs, zero variance.
- Test-first habit: check against a tiny known example before declaring done.
- Narrate your approach before typing; silence reads as confusion.

$$
\text{time budget}:\ 2\text{ min clarify}\ +\ 15\text{ min implement}\ +\ 3\text{ min test}
$$

**Practice tasks**

- Implement three algorithms from scratch in 20 minutes each, with a test.
- Do one session where you talk continuously through your reasoning.

---

### Module 18.3.1 — The classic implementation set

| Algorithm | What they check |
|---|---|
| Linear/logistic regression | gradient derivation, vectorisation |
| k-means | convergence logic, initialisation |
| Softmax + cross-entropy | numerical stability |
| Attention | shape handling, masking |
| AUC / PR curve | metric understanding |
| Top-k / sampling | heap or argpartition, edge cases |

**Practice tasks**

- Time yourself on each of the six; record where you lose minutes.
- Redo the slowest two until both finish under 15 minutes.

> **Module completion gate (18.3).** Three algorithms implemented from scratch, tested, and explained, each within 20 minutes.

---

## 18.4 — SQL and Data Round

**Objective.** Handle the data questions that filter out strong modellers.

### Checklist

- Joins, aggregations, window functions, CTEs, subqueries.
- Ranking, running totals, month-over-month growth, cohort retention.
- Deduplication and "latest record per entity" patterns.
- Handling NULLs correctly in filters and joins.
- Explaining a query plan and why an index matters.
- Turning a vague product question into a query and stating assumptions.
- Data-quality checks before trusting a result.

```sql
-- latest record per entity, a recurring interview pattern
SELECT * FROM (
  SELECT t.*, ROW_NUMBER() OVER (PARTITION BY entity_id ORDER BY updated_at DESC) AS rn
  FROM events t
) x WHERE rn = 1;
```

### Practice tasks

- Solve 20 medium SQL problems, timed at 8 minutes each.
- Write three retention-cohort queries from scratch and explain the grain.

> **Module completion gate (18.4).** You can answer a data question with a correct query and explain its grain and assumptions.

---

## 18.5 — Statistics and Experimentation Round

**Objective.** Defend an experiment design and an interpretation.

### Checklist

- Power, MDE, and sample-size calculations by hand.
- Interpreting confidence intervals and $p$-values correctly, in plain language.
- Common traps: peeking, multiple comparisons, Simpson's paradox, regression to the mean.
- CUPED and variance reduction.
- A/B test design end to end: unit, metrics, guardrails, duration, analysis plan.
- Causal questions: identification assumption, estimator, sensitivity.
- Offline metric versus online outcome, and why gains fail to ship.

$$
n\approx\frac{2\sigma^2\left(z_{1-\alpha/2}+z_{1-\beta}\right)^2}{\Delta^2}
$$

### Practice tasks

- Design an A/B test for a ranking change in 10 minutes, aloud, with numbers.
- Answer "the test shows +2% with $p=0.04$; do you ship?" in three different ways for three contexts.

> **Module completion gate (18.5).** You can design, size, and interpret an experiment without a calculator and without overclaiming.

---

## 18.6 — ML System Design Round

**Objective.** Run the seven-step frame under time pressure.

### Checklist

- The seven-step frame from L16, rehearsed aloud against a timer.
- Clarifying questions that change the design.
- Back-of-envelope estimates within two minutes.
- A drawn architecture with latency budgets per stage.
- Failure modes and a degradation ladder.
- Cost at three scales.
- Handling follow-ups: 100× traffic, cold start, feedback loops, privacy.
- Closing with risks and what you would measure first.

**Practice tasks**

- Two full 45-minute designs per week, recorded and debriefed.
- One design where the interviewer interrupts every three minutes (train interruption tolerance).

> **Module completion gate (18.6).** Three designs delivered aloud in 45 minutes each, with numbers and follow-ups handled.

---

## 18.7 — LLM and Applied AI Round

**Objective.** Show judgement about foundation-model systems, not enthusiasm.

### Checklist

- When to prompt, when to retrieve, when to fine-tune — with cost and latency reasoning.
- Evaluation methodology: your own eval set, judge calibration, regression suites.
- RAG architecture and its failure modes, separated into retrieval versus generation.
- Agents: tool schemas, step limits, cost ceilings, failure recovery.
- Safety: injection, data exfiltration, output filtering, red-teaming.
- Serving economics: tokens, caching, routing, quantisation.
- A clear answer to "how would you halve the cost?" and "how do you know it is good?"

### Practice tasks

- Prepare three "fine-tune or not" cases with numbers and a recommendation.
- Present a RAG design in 15 minutes including the eval plan.

> **Module completion gate (18.7).** You can justify an LLM system decision with a measurement plan and a cost model.

---

## 18.8 — Project Deep-Dive and Behavioural

**Objective.** Tell project stories that survive follow-up questions.

### Module 18.8.1 — The project deep-dive

- 30-second, 3-minute, and 15-minute versions, rehearsed.
- The five questions: why this, what baseline, what failed, what did it cost, what would you change.
- Ownership clarity: your decisions versus the team's.
- The one number you lead with, and why that number.
- The diagram you can sketch in 60 seconds.
- The failure you are willing to discuss, chosen deliberately.

**Practice tasks**

- Record the 3-minute version of each of your three projects.
- Have a peer ask five hostile follow-ups per project; note where you wobble.

---

### Module 18.8.2 — Behavioural stories with numbers

- STAR, but with a metric: situation, decision, action, measured outcome.
- Eight stories minimum: conflict, failure, ambiguity, influence, prioritisation, deadline pressure, disagreement with data, mentoring.
- Each story under two minutes, with one number.
- Avoid stories where you were simply right; show judgement under constraint.
- Prepare the "why this company" answer with something specific and true.
- Prepare the "tell me about yourself" in 90 seconds: past, present, why this role.

$$
\text{story}=\text{context}+\text{decision}+\text{action}+\text{result (number)}+\text{what I learned}
$$

**Practice tasks**

- Write eight stories, each with a number, and rehearse two per day.
- Ask a peer which story sounds rehearsed and which sounds real.

> **Module completion gate (18.8).** Eight story-bank entries with measured outcomes, plus three project deep-dives at three lengths.

---

## 18.9 — Take-Homes and Case Studies

**Objective.** Produce work that reads as senior in the time available.

### Checklist

- Read the brief twice; list explicit and implicit requirements.
- Timebox: 60–70% on the core, 20% on the write-up, 10% on polish, 10% reserve.
- Baseline first; always show the trivial comparison.
- A results table with an interval; a limitations section with a real limitation.
- README with "how to run" and "what I would do with more time".
- Do not over-engineer: scope discipline is part of the assessment.
- Present the work in ten minutes with a clear recommendation.

### Practice tasks

- Complete one take-home in a hard 8-hour box and note what you cut.
- Present it to a peer in ten minutes and collect two criticisms.

> **Module completion gate (18.9).** A take-home with a baseline, an interval, and an honest limitations section, delivered inside the timebox.

---

## 18.10 — Mock Loops and Debriefs

**Objective.** Practise the whole loop, not just the parts you like.

### Checklist

- Full loop: fundamentals → coding → statistics → design → project → behavioural.
- Record every mock; the recording is the feedback, not your memory.
- Debrief template: what was wrong, what was slow, what was unclear, what was missing.
- Score each round 1–5 with evidence.
- Fix the top three weaknesses with targeted reps before the next mock.
- Mock with someone who will interrupt and push back.
- Two full mocks minimum; three if your first was below 4/5.

### Practice tasks

- Run a full recorded mock loop and score each round.
- Repeat after two weeks and compare scores round by round.

> **Module completion gate (18.10).** Two recorded mock loops, each debriefed, with every round at 4/5 or above on the second attempt.

---

## 18.11 — Offers, Levelling and Negotiation

**Objective.** Make a decision you will not regret in a year.

### Checklist

- Understand levels and bands: the same title means different scope at different companies.
- Negotiate scope and level, not only base salary.
- Components: base, bonus, equity (and its vesting and liquidity), sign-on, relocation.
- Competing offers and the honest way to use them.
- Evaluate the team: data access, whether models actually ship, mentorship, on-call load.
- Ask about failure culture: how post-incidents are handled.
- Read the offer carefully: IP, non-compete, and publication rights.
- Decide on a framework you write down before the pressure arrives.

| Factor | Question to ask |
|---|---|
| Scope | What will I own in six months? |
| Data | Do teams have access to the data they need? |
| Shipping | What percentage of models reach production here? |
| Growth | Who reviews my work, and how often? |
| Sustainability | What is the on-call rotation and incident load? |

### Practice tasks

- Write your decision framework with weights before any offer arrives.
- Role-play a negotiation with a peer and practise one specific ask.

> **Module completion gate (18.11).** A written decision framework and a rehearsed negotiation ask.

---

## 18.12 — Level 18 Capstone: Interview War Room

### Project: `interview-war-room` — drills, ledger, stories, mocks

**Difficulty.** Professional

**Purpose.** Build the preparation system that lets you walk into any applied-science loop with rehearsed derivations, designs, and stories — and a visible record of improvement.

### A. Functional requirements

**Question ledger**

- 100+ entries from Appendix A plus role-specific additions.
- Fields: question, area, confidence 1–5, last attempted, source, notes.
- Weekly review of everything below 4.
- A five-minute whiteboard set drilled weekly.

**Drill logs**

- Coding: 30+ timed implementations with times and pass/fail.
- SQL: 20+ timed problems.
- Designs: 8+ recorded 45-minute sessions with debriefs.
- Statistics: 10+ experiment designs delivered aloud.

**Story bank**

- Eight behavioural stories with numbers.
- Three project deep-dives at 30 s / 3 min / 15 min.
- "Tell me about yourself" in 90 seconds, recorded.

**Mocks**

- Two full recorded mock loops with per-round scores.
- Written debriefs and a fix plan per round.
- A comparison showing improvement between the two mocks.

**Targeting**

- Five target companies with the round structure inferred for each.
- A prepared question for each interviewer type (engineer, manager, recruiter).
- Your written offer-decision framework.

### B. Suggested architecture

```text
interview-war-room/
├── ledger/
│   └── questions.csv            # 100+ rows, confidence, last_attempted
├── drills/
│   ├── coding/                  # timed implementations + notes
│   ├── sql/
│   ├── designs/                 # recordings + debriefs
│   └── stats/
├── stories/
│   ├── behavioural.md           # 8 stories with numbers
│   ├── projects.md              # 3 projects x 3 lengths
│   └── tell_me_about_yourself.mp4
├── mocks/
│   ├── mock_01/{recording, debrief.md, scores.md}
│   └── mock_02/{...}
├── targets/
│   ├── companies.md
│   └── questions_to_ask.md
└── offer_framework.md
```

### C. Acceptance targets

| Component | Target |
|---|---|
| Question ledger | 100+ entries; nothing left below confidence 3 at the end |
| Whiteboard set | Five derivations delivered cold in under 25 minutes |
| Coding drills | Three algorithms from scratch under 20 minutes each, tested |
| Design drills | Three recorded designs with debriefs |
| Stories | Eight stories, each with a number, under two minutes |
| Mocks | Two loops recorded, every round ≥ 4/5 on the second |
| Targeting | Five companies with inferred loops and prepared questions |

### D. Stretch goals

- Run a mock with someone who has actually interviewed for the role.
- Do one mock in a language or framework you are weaker in.
- Record a 15-minute project deep-dive and have a senior engineer critique it.
- Run a second full loop a month later and compare all rounds.

### E. Acceptance criteria

| Area | Required evidence |
|---|---|
| **Coverage** | All six round types drilled, not just the comfortable ones |
| **Measurement** | Confidence scores and mock scores tracked over time |
| **Evidence** | Stories and deep-dives tied to real artefacts |
| **Recovery** | You can answer "I do not know" cleanly and pivot to reasoning |
| **Decision** | A written offer framework and a rehearsed ask |

> Level 18 is complete when a mock loop scores 4/5 or better in every round, twice.

---

## Level 18 interview question bank

### A. Meta questions

- How do you prepare for an interview loop?
- How do you answer a question you do not know?
- How do you handle an interviewer who disagrees with your approach?
- What do you do when you realise mid-answer that you are wrong?

### B. Rapid-fire fundamentals

- Bias–variance, in one sentence plus a formula.
- When does a model fail silently in production?
- What is calibration, and when does it matter?
- Why does the learning rate matter more than the optimiser?
- What is the difference between a metric and a loss?

### C. Behavioural

- Tell me about a model you shipped that failed.
- Tell me about a time you disagreed with a product decision.
- Tell me about a deadline you missed.
- Tell me about work you are proud of that nobody used.
- Why are you leaving your current role?

### D. Closing

- What questions do you have for us?
- What would you do in your first 90 days?
- What are you worst at?
- What would make you turn down this offer?

### Interview readiness standard

1. Answer in structured form, not a stream of consciousness.
2. Lead with the conclusion, then the mechanism.
3. Quantify wherever a number exists.
4. Name the trade-off and the alternative.
5. Stop talking when the answer is finished.

---

## Level 18 final assessment

### Knowledge

- I know the loop for my target role and my weakest round.
- I can deliver the five-minute whiteboard set cold.
- I can implement three core algorithms from scratch under time pressure.
- I can design and size an experiment aloud.
- I can run the seven-step design frame under interruption.
- I can justify an LLM system decision with cost and evaluation.
- I have eight behavioural stories with numbers.
- I have a written offer-decision framework.

### Practical skills

- I have a 100+ entry question ledger with confidence tracking.
- I have completed 30+ timed coding drills and 20+ SQL problems.
- I have recorded three design sessions and two full mock loops.
- I have debriefed every mock and fixed the top three weaknesses.
- I have rehearsed negotiation once, out loud.

### Project

- `interview-war-room` passes every acceptance target.
- Every round scores 4/5 or better on the second mock.
- I can answer "I do not know" and still finish strong.

> **Level 18 completion rule.** If you can walk into a loop with rehearsed derivations, measured stories, and a calm structure — and leave with an offer — you have finished the roadmap.

---

# PHASE 7 CAPSTONE — CAREER LAUNCH PACK

> **Purpose.** Combine Levels 17 and 18 into a single application-ready package: portfolio, narrative, drills, and decision framework — then run the search like a system you are operating.

**Difficulty.** Professional
**Suggested duration.** 1–2 weeks
**Depends on.** Levels 17 and 18.

## A. The brief

Produce the complete package you would send to a hiring manager and take into a loop:

1. **Three projects** that are finished, measured, reproducible, and explained.
2. **One narrative** that is consistent across every surface.
3. **A preparation system** that shows drills, scores, and improvement over time.
4. **A search plan** with target companies, round structures, and a tracking sheet.
5. **A decision framework** written before the pressure of an offer.

## B. Required deliverables

| # | Deliverable | What "done" looks like |
|---|---|---|
| 1 | Portfolio pack | Three repos, three case studies, flagship, videos, site |
| 2 | Resume | One page, numbers in every bullet, consistent with positioning |
| 3 | Profiles | GitHub pinned to three, consistent LinkedIn and site |
| 4 | Question ledger | 100+ entries, confidence-tracked, all gaps closed to ≥ 3 |
| 5 | Story bank | 8 behavioural stories + 3 project deep-dives at 3 lengths |
| 6 | Drill logs | 30+ coding, 20+ SQL, 8+ designs, 10+ experiment designs |
| 7 | Mock loops | Two recorded, debriefed, every round ≥ 4/5 on the second |
| 8 | Target list | 5+ companies with inferred loops and prepared questions |
| 9 | Decision framework | Weighted criteria and a rehearsed negotiation ask |
| 10 | Review record | Three external portfolio reviewers and their verdicts |

## C. Suggested architecture

```text
career-launch-pack/
├── 00_POSITIONING.md
├── 01_portfolio/        # links to the three repos + case study copies
├── 02_resume/resume.pdf
├── 03_profiles/         # screenshots, pinned list, headline text
├── 04_ledger/questions.csv
├── 05_stories/
├── 06_drills/
├── 07_mocks/
├── 08_targets/companies.md
├── 09_offer_framework.md
└── 10_reviews/
```

## D. Grading rubric

| Dimension | 1 — Not yet | 3 — Competent | 5 — Strong |
|---|---|---|---|
| **Portfolio** | Unfinished repos | Three finished projects | Three projects that each prove something different, all reproducible |
| **Narrative** | Generic | Consistent positioning | A specific role + domain + proof a stranger repeats back |
| **Evidence** | Screenshots | Numbers in READMEs | Every claim has a number, an interval, and a link |
| **Preparation** | Read some articles | Drills and a ledger | Tracked improvement across two recorded mock loops |
| **Round coverage** | Prepared only favourites | All six round types | Weakest round practised most, with evidence |
| **Decision quality** | Accepts first offer | Compares offers | Framework written in advance and applied with discipline |

**Pass mark.** At least 3 in every dimension, with **Portfolio**, **Evidence**, and **Preparation** at 4 or above.

## E. Defence questions

- Pitch yourself in 90 seconds.
- Which project are you leading with, and why that one?
- What is the weakest claim in your portfolio, and how would you defend it?
- Show me your worst round and what changed after the mock.
- What would make you say no to an offer?
- What will you learn in your first 90 days that you cannot learn from this roadmap?

---

# PHASE 7 FINAL ASSESSMENT

## Knowledge checklist

**Portfolio (L17)**

- I know what a hiring manager evaluates in the first ten seconds.
- I can select three projects that prove different capabilities.
- I can write a first-screen README and a working quickstart.
- I can write a six-part case study with a quantified failure.
- I can keep a consistent positioning across all surfaces.
- I can get and use external portfolio review.

**Interviewing (L18)**

- I know my target loop and my weakest round.
- I can deliver the whiteboard set cold.
- I can code three core algorithms from scratch under time pressure.
- I can design and size an experiment aloud.
- I can run the seven-step design frame under interruption.
- I can justify an LLM system decision with cost and evaluation.
- I have eight numbered behavioural stories.
- I have a written offer-decision framework.

## Practical checklist

- [ ] Level 17 capstone (`portfolio-pack`) passes every acceptance target.
- [ ] Level 18 capstone (`interview-war-room`) passes every acceptance target.
- [ ] Phase capstone scores at least 3 in every rubric dimension.
- [ ] Three external reviewers independently said "interview".
- [ ] Two mock loops scored ≥ 4/5 in every round on the second attempt.
- [ ] Every repository passes a secrets scan and reproduces in under 30 minutes.
- [ ] My resume, site, GitHub, and LinkedIn say the same thing.

## The final self-honesty test

Answer these out loud, without notes. If any answer takes over 60 seconds, revisit the level it came from.

1. What do you work on, in one sentence, and what is your evidence?
2. Which of your results would not survive a change of seed or dataset?
3. What is the weakest part of your portfolio, and what are you doing about it?
4. How would you design a system for 100× the traffic you have handled?
5. What is your cost per 1,000 predictions for your flagship?
6. What did you get wrong most recently, and what changed afterwards?
7. Why should someone hire you over an equally prepared candidate?
8. What will you learn next, and how will you know you learned it?

> **Phase 7 is complete** when the portfolio gets callbacks, the loop produces offers, and you choose one with a framework rather than a feeling.

---

# APPENDIX A — The 100-question master bank

The bank is distributed across levels so that every question is answered where it is learned. This is the index, with where each block lives and what it tests.

| # | Area | Block | Where |
|---|---|---|---|
| 1–10 | Mathematics & statistics | linear algebra, calculus, probability, estimation | Phase 1 · L1–L3 |
| 11–20 | Data & features | grain, missingness, leakage, encoding | Phase 2 · L4 |
| 21–30 | Classical ML | linear models, trees, calibration, thresholds | Phase 2 · L5 |
| 31–40 | Evaluation | splits, metrics, comparison, slices, conformal | Phase 2 · L6 |
| 41–50 | Deep learning | backprop, autograd, initialisation, diagnosing training | Phase 3 · L7–L8 |
| 51–60 | Architectures | CNN, RNN, attention, scaling, compression | Phase 3 · L9 |
| 61–68 | Representation learning | contrastive, masked, collapse, multimodality | Phase 4 · L10 |
| 69–78 | Advanced methods | uncertainty, causality, forecasting, bandits, shift | Phase 4 · L11 |
| 79–88 | Research practice | reproducibility, ablations, statistics, writing | Phase 4 · L12 |
| 89–94 | Applied frontier | LLM systems, adaptation, vision, cost, safety | Phase 5 · L13 |
| 95–100 | Systems & operations | design, scale, monitoring, incidents, cost | Phase 6 · L15–L16 |

**How to use it**

- Load all 100 into your ledger on day one of Level 18.
- Rate confidence 1–5 on the first pass; do not stop to study.
- Study only items at 1–2, in area order, ten per day.
- Re-rate weekly; anything below 4 returns to the queue.
- Before a real loop, drill only 1–3s and your weakest three areas.

## A. Adding your own questions

Every interview you take adds to the bank:

| Column | Purpose |
|---|---|
| Question | Verbatim where possible |
| Area | One of the blocks above |
| Confidence | 1–5 after answering |
| Last attempted | Date |
| Source | Interview, paper, project, mock |
| Notes | The answer you gave, and what was missing |

---

# APPENDIX B — Eight-week preparation schedule

| Week | Focus | Deliverable |
|---|---|---|
| 1 | Portfolio audit; fix the flagship README and quickstart | Flagship reproduces in < 30 min |
| 2 | Case studies; positioning; resume rewrite | Three case studies, one-page resume |
| 3 | Fundamentals: ledger setup, 10 questions/day, whiteboard set | Ledger at 100 entries; first rating pass |
| 4 | Coding drills: six algorithms, timed | Three under 20 min each |
| 5 | Statistics + SQL drills; one experiment design per day | 10 designs, 10 SQL problems |
| 6 | System design: two 45-minute designs per week | Three recorded designs with debriefs |
| 7 | Mock loop 1; debrief; fix top three weaknesses | Scores per round, fix plan |
| 8 | Mock loop 2; review with a senior; offer framework | All rounds ≥ 4/5; framework written |

> If you are already interviewing, compress to four weeks: keep the daily drills, do the mocks weekly, and do portfolio fixes in the evenings.

---

# APPENDIX C — Resources

### Books

| Book | Use it for |
|---|---|
| *Cracking the Coding Interview* / *Elements of Programming Interviews* | coding rounds |
| *Machine Learning Interviews* (Khang) | ML-specific rounds |
| *Designing Machine Learning Systems* (Huyen) | system design depth |
| *Trustworthy Online Controlled Experiments* | statistics rounds |
| *Never Split the Difference* | negotiation practice |
| *So Good They Can't Ignore You* | positioning and career narrative |

### Practice

- **NeetCode 150** — coding pattern coverage.
- **StrataScratch / DataLemur** — SQL for product data questions.
- **Pramp / interviewing.io** — peer and expert mocks.
- **Your own recordings** — the highest-value, lowest-cost feedback.
- **OpenReview reviews** — learn what critics attack, then pre-empt it.

---

# APPENDIX D — The ten most common ways to fail this phase

| Failure | Symptom | Fix |
|---|---|---|
| Portfolio of tutorials | No callbacks | One deep project with a measured result |
| No baseline | Claims that cannot be evaluated | Add a trivial baseline and an interval |
| README without a result | Recruiter cannot decide | Put the number in the first screen |
| Preparing only favourites | Weak round sinks the loop | Drill the weakest round most |
| Silent coding | Interviewer cannot score you | Narrate approach and trade-offs |
| Unmeasured stories | Sounds junior | Add numbers to all eight stories |
| No mocks | First real loop is the practice | Two recorded mocks minimum |
| Overclaiming | Follow-ups expose gaps | Say "I do not know" cleanly |
| Deciding on comp alone | Regret in six months | Framework written before offers |
| Applying everywhere | Burnout and no signal | 20 targeted applications with referrals |

---

# APPENDIX E — Progress tracker

| Level | Capstone | Public link | Reviewers said "interview" | Mock score (rounds ≥ 4/5) | Offer framework |
|---|---|---|---|---|---|
| L17 | `portfolio-pack` | | ☐ | — | — |
| L18 | `interview-war-room` | | — | ☐ | ☐ |
| Phase | Career launch pack | | ☐ | ☐ | ☐ |

---

# ROADMAP COMPLETE

## The eighteen levels, and what each one actually bought you

| Phase | Level | Title | The capability you now have |
|---|---|---|---|
| 1 · Foundations | L0 | Software Engineering Fundamentals | Build, test, package, and deploy code |
| | L1 | Python and Scientific Computing | Compute correctly and fast |
| | L2 | Mathematics for Machine Learning | Derive and implement the maths |
| | L3 | Probability and Statistics | Make claims with honest uncertainty |
| 2 · Core ML | L4 | Data Analysis and Feature Engineering | Turn raw data into trustworthy signal |
| | L5 | Classical Machine Learning | Model tabular problems and explain them |
| | L6 | Model Evaluation and Generalization | Prove a model generalises, and where it fails |
| 3 · Deep Learning | L7 | Neural Networks from First Principles | Implement backprop and train from scratch |
| | L8 | Optimization and Training Dynamics | Make training fast, stable, reproducible |
| | L9 | Deep Learning Architectures | Choose, build, and compress architectures |
| 4 · Advanced ML & Research | L10 | Representation and Self-Supervised Learning | Pretrain and evaluate representations |
| | L11 | Advanced ML Methods | Apply uncertainty, causality, sequences, decisions |
| | L12 | Research Methods and Experimental Science | Produce knowledge others can verify |
| 5 · Specialization | L13 | NLP, Computer Vision, and Foundation Models | Ship foundation-model systems with cost and safety |
| | L14 | Applied ML Research Specialization | Own a specialisation and publish a contribution |
| 6 · Engineering | L15 | End-to-End ML Engineering and MLOps | Operate a model in production |
| | L16 | ML Systems and Scalability | Design systems that survive scale |
| 7 · Career | L17 | Portfolio and Research Capstone | Make your work legible and credible |
| | L18 | Interview Preparation | Convert capability into offers |

## The three questions this roadmap was built to answer

1. **Can you build it?** Levels 0, 1, 7, 9, 13, 15 — demonstrated by capstones that run.
2. **Can you prove it works?** Levels 3, 6, 10, 12 — demonstrated by intervals, seeds, controls, and pre-registration.
3. **Can you explain it?** Levels 14, 17, 18 — demonstrated by papers, case studies, and loops passed.

If you can answer all three with artefacts, you are not a candidate who took a course. You are an applied scientist.

## What comes after the roadmap

- **Pick a cadence and keep it.** One artefact a month: a reproduction, an eval suite, a system improvement, a write-up.
- **Re-run your portfolio review every six months.** The bar rises; so should your work.
- **Teach.** Explaining something well is the final proof of understanding, and it compounds.
- **Re-read your own failure logs.** They are the most accurate map of what you actually learned.
- **Update the roadmap.** The tools in Levels 9, 13, and 15 will age fastest; the discipline in Levels 3, 6, and 12 will not.

> **The roadmap is complete when you stop following it.** Everything here was scaffolding for one habit: build something real, measure it honestly, and be able to defend it. Keep that habit and the levels stop mattering.

*Phase 7 of 7 · Levels 17–18 of 18 · Career Preparation · Roadmap complete*
