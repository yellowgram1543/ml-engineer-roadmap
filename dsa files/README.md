# DSA + Interview Engineering — 100 Days

**SDE · ML Engineer · Applied Scientist**

> **The premise.** Nobody fails an interview because they solved 300 instead of 400 problems. People fail because they cannot *recognise* a pattern in 90 seconds, cannot state a complexity out loud, or cannot code a heap under a timer. This plan is built for recognition and execution, not volume.

---

## Dashboard

| Item | Details |
|---|---|
| **Duration** | 100 days · 14 weeks + 2 buffer weeks |
| **Commitment** | 2–3 hours/day, 6 days/week (1 rest day for review only) |
| **Language** | Python 3 (primary) — conversion notes for C++/Java in Part 07 |
| **Core volume** | ~250 new problems · ~120 spaced repeat-solves · 20+ mocks |
| **Targets** | SDE (generalist), ML Engineer, Applied Scientist (ML-heavy loop) |
| **Final outcome** | Recognise any of 16 patterns inside 90 seconds, code the template from memory, state complexity and tradeoffs unprompted, and pass a 4-round mock loop cold |

**What this is not.** Not a list of 600 problems. Not a competitive-programming ladder. No segment trees, no suffix automata, no advanced combinatorics beyond what an interview asks.

---

## The 100 days at a glance

| Phase | Days | Blocks | What it buys you |
|---|---|---|---|
| **A · Foundations and linear structures** | 1–24 | A1–A8 | Python floor, arrays/strings, hashing, two pointers, sliding window, prefix sums, binary search, sorting, string algorithms |
| **B · Linked structures, trees, recursion** | 25–45 | B1–B7 | Linked lists, stacks, monotonic stack, queues, heaps, binary trees, BSTs, backtracking I |
| **C · Graphs, greedy, bits** | 46–62 | C1–C5 | Tries and backtracking II, graph traversal, union-find, shortest paths, greedy, intervals, bit manipulation |
| **D · Dynamic programming and design** | 63–82 | D1–D7 | DP foundations, knapsack, 2D DP, advanced/tree/bitmask DP, math, low-level design problems, hard immersion |
| **E · Interview simulation** | 83–100 | E1–E4 | Timed sets, peer mocks, LLD/HLD basics, applied-scientist rounds, full loop simulation |

**Parallel track.** Part 06 (applied scientist: ML coding, SQL, ML theory, probability, ML system design) runs *alongside* Phases A–D at ~25 minutes/day, and consumes most of Phase E if you are targeting applied-scientist roles. Pure SDE candidates replace Part 06 with the CS-fundamentals and LLD material in the same file.

---

## The daily loop

Every study day has the same shape. Do not improvise it.

| Slot | Time | What happens |
|---|---|---|
| **1 · Recall** | 10 min | Blank page. Write yesterday's template and state its complexity, from memory, no notes. |
| **2 · Learn** | 30 min | Read the block's pattern card + answer its concept drill *before* looking at answers. |
| **3 · Solve** | 90 min | 2–3 problems, timer running, one written attempt before any editorial. |
| **4 · Log** | 15 min | Update the weakness ledger. Schedule the re-solve dates. |

> **The hard rule.** Every problem gets a hard stop. 25 minutes for medium, 45 for hard, 15 for easy. When the timer fires you stop and read the solution — that is the *intended* outcome, not a failure. Untimed practice trains a skill the interview does not test.

---

## Ten rules that decide whether this works

1. **One written attempt before any editorial.** Not a thought, not a sketch — code that you ran against the given examples.
2. **State the brute force first, every time.** "Brute force is O(n²) by checking all pairs; the redundancy is X, so I'll use Y." Interviewers score the path, not the destination.
3. **Say the complexity before you code**, then verify it after. Wrong-before is recoverable; silent is not.
4. **Re-solve every failed problem at D+2 and D+7.** Failure without repetition is entertainment.
5. **Never read a solution without re-typing it from a blank file afterwards.** Reading is not learning.
6. **20% of total time is revision.** Days 14, 24, 35, 45, 62, 82, 100 are review, not new material.
7. **No new pattern on a mock day.** Mocks test what you already own.
8. **Timebox to the pattern, not the problem.** If a problem does not match a pattern within 5 minutes, note it and move on.
9. **One language.** Python for all 250 problems. Syntax switching mid-plan costs more than it saves.
10. **Track T-level, not problem count.** A T3 on 120 problems beats a T1 on 400.

---

## The mastery ladder

| Tier | What it means | Evidence |
|---|---|---|
| **T0** | Recognise the pattern *after* seeing the solution | "Oh, that was sliding window" |
| **T1** | Reproduce it with the reference open | You can follow along |
| **T2** | Solve unaided in 35 minutes | First attempt passes all cases |
| **T3** | Solve in 25 minutes, narrate the approach, state complexity and one alternative | Would pass a real screen |
| **T4** | Adapt to a twist you have not seen, or teach it cleanly | Would pass a strong senior screen |

**Interview bar:** T3 on ~120 problems spread across all 16 patterns, plus T2 on the remaining list. Any block where you cannot hit T3 on at least half its problems is a block you repeat.

---

## 14-week schedule

| Week | Days | Phase | Blocks | Checkpoint |
|---|---|---|---|---|
| 1 | 1–7 | A | A1 Python floor · A2 arrays and strings | — |
| 2 | 8–14 | A | A3 hashing · A4 sliding window | **D14 review** |
| 3 | 15–21 | A | A5 prefix sums · A6 binary search | — |
| 4 | 22–28 | A→B | A7 sorting · A8 strings · B1 linked lists | **D25 checkpoint 1** |
| 5 | 29–35 | B | B2 stacks · B3 queues | **D35 review** |
| 6 | 36–42 | B | B4 heaps · B5 trees | — |
| 7 | 43–49 | B→C | B6 BST · B7 backtracking I | **D45 checkpoint 2** |
| 8 | 50–56 | C | C1 tries · C2 graphs | — |
| 9 | 57–63 | C | C3 union-find · C4 shortest paths | **D62 checkpoint 3** |
| 10 | 64–70 | C→D | C5 greedy and bits · D1 DP foundations | — |
| 11 | 71–77 | D | D2 knapsack · D3 2D DP | — |
| 12 | 78–84 | D | D4 advanced DP · D5 math · D6 design | **D82 checkpoint 4** |
| 13 | 85–91 | D→E | D7 hard immersion · E1 timed sets | — |
| 14 | 92–98 | E | E2 mocks · E3 specialist rounds · E4 final loop | — |
| 15–16 | 99–100 (+ buffer) | E | Ledger replay, full mock loops, stories | **D100 graduation** |

**Compressed or extended.** 1 hour/day → stretch to ~150 days by halving the daily problem count and doubling checkpoints. 4 hours/day → compress to ~60 days, but keep all four checkpoints and all 20 mocks. **Never cut checkpoints or mocks** — they are where the skill consolidates.

---

## Checkpoints

Each checkpoint is a closed-book, timed assessment. Pass mark: **70%**, with a T3 on at least half of the attempted problems.

| Checkpoint | Day | Format | Content |
|---|---|---|---|
| **1** | 25 | 90 min, 3 problems | 1 easy + 2 medium across arrays, hashing, windows, binary search. Plus a 10-minute written complexity quiz. |
| **2** | 45 | 120 min, 3 problems | 1 medium + 2 medium/hard across linked lists, stacks, heaps, trees. Plus "implement iterative inorder from memory". |
| **3** | 62 | 120 min, 3 problems | Graph BFS/DFS/DSU/topological + 1 greedy. Plus "write Dijkstra and DSU from memory". |
| **4** | 82 | 150 min, 3 problems | 1 medium + 2 DP (one 1D, one 2D) + 1 design problem. |
| **5 · Graduation** | 100 | 4 × 45 min simulated loop | 2 coding, 1 ML/systems, 1 behavioural. Scored against a rubric you write in advance. |

**If you fail a checkpoint:** do not advance. Spend 3 days re-doing the failed phase's gate list, then retake a fresh variant. Advancing on a 50% checkpoint guarantees a failed interview later.

---

## The weakness ledger

Keep one file. One row per problem you could not finish cleanly.

| Date | Problem | Pattern | What broke | First re-solve | Second re-solve | Status |
|---|---|---|---|---|---|---|
| | | | | D+2 | D+7 | open / closed |

**What goes in "what broke":** not "couldn't solve". Be specific — *"did not see that the window was on the count of distinct chars"*, *"off-by-one on `hi = mid`"*, *"forgot the dummy node"*. Specific failure writes a specific fix.

Review the ledger at the start of every review day. Any row still `open` after two re-solves goes into the next mock.

---

## How this fits with the ML roadmap

If you are running both, do not stack them. Use this split:

- **DSA plan:** 2 hours/day, six days a week.
- **ML roadmap:** the remaining slot (~1–2 hours/day) on the current level.
- At ML Level 17–18 (Phase 7: portfolio and interviews), **swap the ratio** — DSA drops to maintenance (45 min/day, one problem) and interview prep takes the bulk.

The two documents are complementary by design: this one gets you through the coding screen, the ML roadmap gets you through the depth and systems rounds. Neither is sufficient alone for an applied-scientist loop.

---

## The files

| File | Contents |
|---|---|
| `part-01-days-01-24.md` | Phase A — foundations and linear structures (A1–A8) |
| `part-02-days-25-45.md` | Phase B — linked structures, trees, recursion (B1–B7) |
| `part-03-days-46-62.md` | Phase C — graphs, greedy, bits (C1–C5) |
| `part-04-days-63-82.md` | Phase D — dynamic programming and design (D1–D7) |
| `part-05-days-83-100.md` | Phase E — interview simulation and the final loop (E1–E4) |
| `part-06-applied-scientist-track.md` | ML coding round, SQL, ML theory, probability, ML system design, CS fundamentals |
| `part-07-banks-cheatsheets.md` | 16 pattern cards, templates to memorise, complexity sheet, Python gotchas, failure modes, tracker |

> **How each block is written.** Objective → pattern card → learning checklist → concept drill (questions with answers) → practice ladder (named problems with target times) → gate → what interviewers probe. If you can tick the gate, you own the block.
