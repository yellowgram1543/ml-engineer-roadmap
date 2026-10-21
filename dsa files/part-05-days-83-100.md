# PHASE E — INTERVIEW SIMULATION

**DSA 100-Day Plan · Days 83–100 · Blocks E1–E4**

> **Phase goal.** You have the patterns. This phase converts them into a score. Interviewing is a performance skill with its own mechanics — narration, time allocation, recovery from a wrong start, and closing cleanly — and it is trained only under realistic pressure. Eighteen days, roughly twenty mocks, and a final loop you score yourself.

---

## Phase dashboard

| Item | Details |
|---|---|
| **Phase** | E — Interview simulation |
| **Days** | 83–100 |
| **Blocks** | E1 timed sets · E2 mocks and low-level design · E3 specialist rounds · E4 final loop |
| **New problems** | ~20 (all in mock conditions) |
| **Deliverable** | A scored 4-round simulated loop, a story bank, and a written weakness report |
| **Outcome** | Perform at or near T3 under observation, in an unfamiliar room, with someone watching you think. |

**Prerequisites.** Phase D gate passed and checkpoint 4 cleared. If your ledger still has more than ten `open` rows, spend three days closing them first — mocks built on an open ledger just produce more open rows.

---

## Block E1 — Timed sets · Days 83–86

**Objective.** Rebuild speed on problems you already know the pattern for, then on problems you do not.

### The structure of a set

| Set type | Format | Purpose |
|---|---|---|
| **A · Pattern set** | 3 problems, 60 min, same pattern | Speed within a known shape |
| **B · Mixed set** | 2 problems, 45 min, no topic hint | Recognition under uncertainty |
| **C · Hard set** | 1 problem, 45 min | Depth and recovery |
| **D · Blind set** | 2 problems, 45 min, unseen titles | Real conditions |

Run one set per session. Four sets across four days, in the order A → B → D → C.

### The coding-round script

Use this sequence every single time, out loud, until it is automatic. It is worth more than any additional problem.

| Step | What you say or do | Time |
|---|---|---|
| 1 · Restate | "So given X, I need to return Y. Is that right?" | 30 s |
| 2 · Clarify | Input size, duplicates, negatives, empty input, sorted or not, mutation allowed | 2 min |
| 3 · Example | Work one small example by hand on the board, including an edge case | 2 min |
| 4 · Brute force | State it and its complexity. "The naive approach is O(n²) because…" | 1 min |
| 5 · Optimise | "The redundancy is X, so I'll use Y. That gives O(n log n)." | 3 min |
| 6 · Plan | Enumerate the steps in order, numbered | 1 min |
| 7 · Code | Narrate as you type. Silent coding is the single most common failure | 15–20 min |
| 8 · Test | Run the given example, then an edge case, then a failure case | 5 min |
| 9 · Complexity | State time and space, then one tradeoff | 1 min |

> **The recovery rule.** If you realise mid-code that the approach is wrong, say it immediately: *"I've hit a problem — the invariant breaks when there are duplicates. Let me back up."* Interviewers score recovery highly. Silence followed by a broken solution scores badly, even if the final code is right.

### Practice tasks

- Record four sets with screen + voice. Watch them at 1.5×. You are looking for: filler silence longer than 10 seconds, unstated assumptions, and any moment you typed without saying why.
- For each set, write the one sentence you *should* have said at minute 6.
- Time-box strictly. If a set overruns, that is data, not failure.

> **Gate E1.** Four sets completed, all recorded. You complete the nine-step script without a checklist. You can state the complexity of your solution before running it and be right.

---

## Block E2 — Mocks, low-level design, and behavioural · Days 87–90

**Objective.** Get observed. Self-practice hides the habits that only appear when someone is watching.

### Mock schedule

| Mock | With | Focus |
|---|---|---|
| 1 | A peer, or a paid platform | One medium under full observation; they score with the rubric below |
| 2 | A different peer | One medium + one follow-up twist |
| 3 | Solo, camera on, 45 min | Hard problem, narrate everything |
| 4 | A senior engineer if you can find one | Coding + project deep-dive, no warm-up |

### Scoring rubric — use it on yourself and on your mockers

| Dimension | 1 | 3 | 5 |
|---|---|---|---|
| **Clarification** | Started coding immediately | Asked size and duplicates | Caught a missing constraint that changed the approach |
| **Approach** | No plan, went straight to code | Stated brute force then optimised | Explained the invariant and why the optimisation is safe |
| **Code quality** | Broken, unreadable | Correct, reasonable names | Correct, clean, obviously structured, no dead code |
| **Narration** | Silent | Explained at key moments | Continuous, would let a listener follow along without the screen |
| **Testing** | Ran one example | Ran the provided example and an edge case | Found a real bug in their own code and fixed it |
| **Complexity** | Wrong or absent | Correct | Correct, plus a tradeoff and an alternative |
| **Recovery** | Froze | Noticed and patched | Reframed the problem and finished |

**Pass:** every dimension ≥ 3, with at least two at 4 or above.

### Low-level design — the framework

For an OOD question, never start with classes. Start with requirements.

| Step | Content | Time |
|---|---|---|
| 1 · Requirements | Functional (3–5 use cases), non-functional (concurrency, latency, scale) | 5 min |
| 2 · Core entities | Nouns from the requirements: `ParkingLot`, `Spot`, `Ticket`, `Vehicle` | 5 min |
| 3 · Interfaces | Methods the client calls, with signatures | 5 min |
| 4 · Relationships | Composition vs inheritance, and the extension point | 5 min |
| 5 · Design patterns | Name one: strategy, observer, factory, singleton — and *why* | 5 min |
| 6 · Concurrency | What is shared, what lock, what the lock protects | 5 min |
| 7 · Test scenarios | Walk one use case end to end through your classes | 5 min |

**The six designs to have sketched once each:** parking lot, elevator, rate limiter, Splitwise-style ledger, a logging library, and a chess/board game. You need one clean sketch each — not memorisation, just the entity list.

### Behavioural — six stories, eight lines each

Prepare exactly six stories in STAR form. They cover ~90% of behavioural questions.

| Story | Question it answers |
|---|---|
| The hard technical problem | "Tell me about the most challenging thing you built" |
| The failure | "Tell me about a time you were wrong" |
| The disagreement | "Tell me about a conflict with a teammate" |
| The ambiguity | "Tell me about a project with unclear requirements" |
| The ownership | "Tell me about something you did beyond your scope" |
| The impact | "What are you most proud of?" |

**Each story:** Situation (2 lines) · Task (1) · Action (4–5, first person, specific) · Result (1 line with a number). 90 seconds when spoken. If you cannot fit it in 90 seconds, it is not rehearsed.

> **Gate E2.** Four mocks completed and scored, with at least one dimension at 4+ each round. Six STAR stories written and spoken aloud once each. One LLD design sketched end to end in 30 minutes.

---

## Block E3 — Specialist rounds · Days 91–95

**Objective.** Switch from SDE-general to the rounds that decide an ML-flavoured offer. These are covered in depth in `part-06-applied-scientist-track.md`; here is the schedule.

| Day | Round | Source |
|---|---|---|
| 91 | **ML coding** — implement k-means, logistic regression with GD, and AUC from scratch, 45 min each, no library | Part 06, §1 |
| 92 | **SQL** — 10 queries under a timer, including window functions and a self-join | Part 06, §2 |
| 93 | **ML theory** — 30 rapid-fire, answered out loud | Part 06, §3–4 |
| 94 | **ML system design** — one end-to-end design in 45 minutes | Part 06, §6 |
| 95 | **Statistics and experimentation** — power, CUPED, metric choice, an A/B-testing case | Part 06, §5 |

> **Gate E3.** Each of the five rounds practised once, scored against Part 06's own rubric. Any round scoring below 3 gets a repeat on Day 97 in place of a coding mock.

---

## Block E4 — The final loop · Days 96–100

**Objective.** Simulate the real thing once, fully, then close the gaps it exposes.

### Day-by-day

| Day | Morning | Afternoon |
|---|---|---|
| 96 | Ledger replay: all `open` rows | Weakness report written — three specific gaps |
| 97 | Targeted repair on gap 1 and gap 2 | One coding mock |
| 98 | **Full simulated loop** (see below) | Loop debrief and score |
| 99 | Repair from the loop's weakest dimension | Two timed sets |
| 100 | Final ledger pass and stories | Written self-assessment and graduation gate |

### The simulated loop — Day 98

Four rounds, 45 minutes each, with breaks. Ideally with a different person per round.

| Round | Content | Score out of 5 |
|---|---|---|
| **1 · Coding** | One medium, unseen, full narration | |
| **2 · Coding** | One medium or hard with a follow-up twist | |
| **3 · ML/systems** | ML theory + one ML system design, or an LLD design | |
| **4 · Behavioural** | Three stories + "why us" | |

**Graduation bar:** total ≥ 14/20 with no round below 3. Below that, do not start applying — do another two weeks of targeted work. A failed real interview costs more than a delayed application.

### The weakness report — write it on Day 96

| Field | Your answer |
|---|---|
| Patterns where I am below T3 | |
| My most common failure mode (recognition / implementation / narration / testing) | |
| The one sentence an interviewer might use to reject me | |
| The three things I will fix in the next seven days | |
| My best two problems to bring up unprompted in a project deep-dive | |

### Negotiation, in one page

| Step | What to do |
|---|---|
| Never name a number first | "I'd rather understand the role and level first — what band is this positioned at?" |
| Get one number in writing before accepting | Total compensation, not just base: base, bonus, equity, sign-on |
| Negotiate once, politely, with a reason | "Based on the scope and my competing timeline, I was hoping for X" |
| Know your walk-away | Write it down before the first call |
| Level beats cash | A level up compounds; a few percent of base does not |

> **Gate E4.** Full loop completed and scored ≥ 14/20 with no round below 3. Weakness report written. Six stories rehearsed to 90 seconds. Two questions prepared to ask each interviewer.

---

## After Day 100

| Week | Maintenance |
|---|---|
| +1 | One medium per day, one mock per week |
| +2 onward | One medium per day while applying; a mock within 48 hours of any scheduled interview |
| Before any interview | Re-read the ledger and the pattern cards in Part 07 — not new problems |

**The decay curve is real.** Unpractised pattern recognition degrades within about three weeks. Maintenance is 30 minutes a day, not zero.
