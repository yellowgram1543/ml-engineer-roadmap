# PHASE C — GRAPHS, GREEDY, BITS

**DSA 100-Day Plan · Days 46–62 · Blocks C1–C5**

> **Phase goal.** The phase that separates candidates. Graphs are the most common "second round" topic and the one most people avoid until it is too late. By Day 62 you can look at any connectivity, ordering, or shortest-path problem and pick BFS, DFS, topological sort, union-find, Dijkstra, or Bellman-Ford in under a minute — and justify it.

---

## Phase dashboard

| Item | Details |
|---|---|
| **Phase** | C — Graphs, greedy, bits |
| **Days** | 46–62 |
| **Blocks** | C1 tries and backtracking II · C2 graph traversal · C3 union-find and MST · C4 shortest paths · C5 greedy, intervals, bit manipulation |
| **New problems** | ~60 |
| **Checkpoint** | Day 62 — 120 minutes, 3 problems |
| **Outcome** | Implement BFS, DFS, topological sort, DSU, and Dijkstra from memory; recognise the six graph signals; defend greedy choices with an exchange argument. |

**Prerequisites.** Phase B gate passed. You must be fluent with recursion, queues, and heaps before starting graphs — trying to learn Dijkstra while shaky on heaps is the most common reason this phase fails.

---

## Block C1 — Tries and backtracking II · Days 46–48

**Objective.** Add the last two data-structure tools: a prefix tree for string search, and the harder backtracking variants where the pruning *is* the problem.

### Pattern card — trie

| Operation | Cost | Notes |
|---|---|---|
| Insert | O(L) | one node per character |
| Search exact | O(L) | must check `is_word` at the end |
| Prefix search | O(L) | stop early; everything below is a match |
| Wildcard search | O(26^dots · L) | DFS over children |
| Bitwise trie | O(bits) | maximum XOR in O(n · 32) |

### Learn — checklist

- [ ] Trie node shape: `{children: dict, is_end: bool}` — and why a dict beats a 26-array in Python for sparse branches.
- [ ] `search` versus `startsWith`: the only difference is the `is_end` check.
- [ ] Wildcard (`.`) search: branching DFS over all children at a dot.
- [ ] Word Search II: trie + grid DFS, and the optimisation of removing matched words from the trie to prune.
- [ ] Bitwise trie for Maximum XOR: insert 32-bit paths, greedily take the opposite bit.
- [ ] Backtracking II discipline: *prune before recursing*, not after. Sudoku's constraint sets and Matchsticks' descending sort are the two canonical examples.
- [ ] Restore IP Addresses: four segments, each 0–255, no leading zeros — the validation is the whole problem.
- [ ] Partition to K Equal Sum Subsets: sort descending, skip equal failures at the same level.
- [ ] Complexity statement for trie + grid: `O(cells · 4^L)` bounded by the trie, and why the trie makes it tractable.

### Concept drill

| Question | Answer |
|---|---|
| Why does a trie beat a hash set for prefix queries? | A hash set cannot answer "which words start with X" without scanning |
| What makes wildcard search exponential? | Each dot branches over all children |
| Word Search II: why remove a word after finding it? | It prevents duplicate results and prunes the subtree |
| Bitwise trie: how do you maximise XOR? | At each bit, prefer the opposite child if it exists |
| Sudoku: what are the three constraint sets? | Rows, columns, and 3×3 boxes |
| Why sort descending in partition problems? | Larger elements fail faster, so pruning triggers earlier |

### Practice ladder

| Tier | Problem | Cue | Target |
|---|---|---|---|
| Medium | Implement Trie (Prefix Tree) (LC 208) | TrieNode with children dict and isEnd flag | 25 min |
| Medium | Design Add and Search Words (LC 211) | Wildcard '.' branches over all children | 30 min |
| Medium | Replace Words (LC 648) | Walk trie until shortest root prefix found | 25 min |
| Medium | Rat in a Maze Problem | Backtracking 4-direction path discovery | 25 min |
| Medium | M-Coloring Problem | Backtracking vertex coloring check | 25 min |
| Medium | Word Break II (LC 140) | Trie / memoized DFS sentence construction | 35 min |
| Hard | Sudoku Solver (LC 37) | Row, col, and 3x3 box constraint sets | 45 min |
| Hard | Word Search II (LC 212) | Prefix trie + grid DFS with tree pruning | 45 min |
| Hard | Partition to K Equal Sum Subsets (LC 698) | Sort descending + bucket filling DFS | 40 min |
| Hard | Maximum XOR of Two Numbers in an Array (LC 421) | Bitwise binary trie maximum search | 35 min |

> **Gate C1.** Trie, wildcard search, and Word Search II written cold. You can state why the trie makes Word Search II tractable where a per-word scan would time out. Sudoku Solver backtracks without revisiting a failed constraint twice at the same level.

---

## Block C2 — Graph traversal · Days 49–53

**Objective.** The core of the phase. Build the graph, choose the traversal, and know the six signals that map a problem statement to an algorithm.

### Pattern card — choosing the traversal

| Signal in the statement | Algorithm | Complexity |
|---|---|---|
| "minimum steps / fewest moves", unweighted | BFS | O(V + E) |
| "connected components / regions" | DFS or BFS or DSU | O(V + E) |
| "can you finish / valid order" | topological sort (Kahn or DFS) | O(V + E) |
| "any path at all" | DFS | O(V + E) |
| "bipartite / two-colouring" | BFS with colours | O(V + E) |
| "detect a cycle" | DFS colours (directed) or DSU (undirected) | O(V + E) |
| "grid with obstacles" | BFS on cells | O(mn) |
| "cheapest / weighted" | Dijkstra (non-negative), Bellman-Ford (negative) | see C4 |

### Learn — checklist

- [ ] Build adjacency lists from edge lists, and decide directed vs undirected explicitly before coding.
- [ ] BFS template with level tracking; multi-source BFS by seeding all sources first.
- [ ] DFS template — recursive and iterative — with a `visited` set added on entry.
- [ ] Grid traversal: four-direction deltas, boundary checks, and in-place marking.
- [ ] Topological sort two ways: **Kahn's** (indegree queue) and **DFS postorder reversed**. Know that Kahn's also detects cycles (`len(order) < n`).
- [ ] Directed cycle detection needs three colours (unvisited / in-stack / done) — two colours produce false positives.
- [ ] Undirected cycle detection: a visited neighbour that is not the parent.
- [ ] Bipartite check: 2-colour BFS; a conflict at any edge means not bipartite.
- [ ] Clone Graph: map old node → new node, then copy neighbours.
- [ ] Flood fill / surrounded regions: boundary-first marking is the trick that avoids a visited matrix.
- [ ] Disconnected graphs: loop over all nodes, do not assume connectivity.
- [ ] Complexity statement: always `O(V + E)`, and say what V and E are for a grid (`V = mn`, `E = 4mn`).

### Concept drill

| Question | Answer |
|---|---|
| Why does BFS give the shortest path only in unweighted graphs? | It explores in order of edge count, not cost |
| Kahn's algorithm: how do you detect a cycle? | The produced order has fewer than V nodes |
| Directed cycle detection: why three colours? | Two colours cannot distinguish "back edge" from "cross edge" |
| Multi-source BFS: what changes? | Enqueue all sources at distance 0 before the loop |
| Why is `O(V+E)` and not `O(V·E)`? | Each vertex enters the frontier once and each edge is scanned once |
| Surrounded Regions: why start from the boundary? | It finds the regions that must *not* be flipped |
| When does DSU beat DFS for components? | Incremental connectivity or repeated union queries |

### Practice ladder

| Tier | Problem | Cue | Target |
|---|---|---|---|
| Medium | Number of Islands (LC 200) | Grid DFS/BFS sink visited land cells | 20 min |
| Medium | Max Area of Island (LC 695) | Recursive component area counting | 20 min |
| Medium | Flood Fill (LC 733) | Connected cell color mutation DFS | 15 min |
| Medium | Clone Graph (LC 133) | Visited hashmap mapping old node to new | 25 min |
| Medium | Is Graph Bipartite? (LC 785) | 2-color BFS/DFS odd-cycle conflict test | 25 min |
| Medium | Course Schedule (LC 207) | Directed cycle detection (3-state coloring) | 25 min |
| Medium | Course Schedule II (LC 210) | Kahn's algorithm with indegree queue | 30 min |
| Medium | Surrounded Regions (LC 130) | Reverse DFS boundary-connected marking | 30 min |
| Medium | Pacific Atlantic Water Flow (LC 417) | Dual ocean inward reachable DFS | 35 min |
| Medium | Word Ladder (LC 127) | BFS on intermediate wildcard word states | 40 min |
| Hard | Strongly Connected Components (Kosaraju) | DFS postorder stack + reverse transpose DFS | 35 min |
| Hard | Alien Dictionary (LC 269) | Lexicographical order topological sort | 45 min |

> **Gate C2.** Number of Islands and Course Schedule II written cold. You can draw the three-colour state diagram for directed cycle detection and explain it without notes. Every graph answer states `O(V+E)` with V and E defined.

---

## Block C3 — Union-find and minimum spanning trees · Days 54–56

**Objective.** The structure that makes connectivity questions trivial, plus the two MST algorithms an SDE interview occasionally asks about.

### Pattern card — DSU

| Operation | Implementation | Amortised cost |
|---|---|---|
| `find(x)` | path compression (iterative or recursive) | α(n) ≈ O(1) |
| `union(a, b)` | union by size or rank | α(n) |
| `connected(a, b)` | `find(a) == find(b)` | α(n) |
| component count | decrement on successful union | O(1) |
| weighted DSU | store a ratio/offset to the parent | α(n) |

### Learn — checklist

- [ ] DSU with path compression **and** union by size, written from memory in ten lines.
- [ ] α(n) — inverse Ackermann — and why you can call it "effectively O(1)" out loud.
- [ ] Why you must union on *roots*, not on the nodes passed in.
- [ ] Redundant Connection: the first edge whose endpoints are already connected.
- [ ] Accounts Merge: union by email, then group by root; sort for determinism.
- [ ] Weighted DSU for Evaluate Division (ratios), or a graph BFS doing the same job — know both.
- [ ] Kruskal: sort edges, union while it does not create a cycle.
- [ ] Prim: grow from a seed using a min-heap of edges — this is Dijkstra with a different relaxation.
- [ ] When DSU beats a graph traversal: incremental edges, "are these connected after each operation", MST.
- [ ] When DSU cannot help: directed graphs, shortest paths, anything needing order.

### Concept drill

| Question | Answer |
|---|---|
| Path compression: what does it change? | Links nodes directly to the root, flattening future finds |
| Union by size: why does it matter if you already compress? | It bounds the tree height before compression kicks in |
| Kruskal versus Prim? | Kruskal sorts edges globally (sparse graphs); Prim grows a single tree (dense graphs) |
| Why is DSU wrong for directed connectivity? | Union is symmetric; direction is lost |
| Redundant Connection: what is the invariant? | A forest on n nodes has n−1 edges; the first edge that closes a cycle is the answer |
| Evaluate Division: what does the DSU weight represent? | The ratio from the node to its parent |

### Practice ladder

| Tier | Problem | Cue | Target |
|---|---|---|---|
| Medium | Number of Provinces (LC 547) | DSU component counting on adjacency | 20 min |
| Medium | Redundant Connection (LC 684) | DSU cycle detection on first closed edge | 25 min |
| Medium | Accounts Merge (LC 721) | Union by shared email address | 35 min |
| Medium | Number of Connected Components (LC 323) | DSU decrement on successful union | 20 min |
| Medium | Evaluate Division (LC 399) | Weighted DSU ratios or graph BFS | 40 min |
| Medium | MST using Prim's Algorithm | Priority queue growing tree from seed | 30 min |
| Medium | Min Cost to Connect All Points (LC 1584) | Kruskal's algorithm with sorted edges + DSU | 35 min |
| Medium | Satisfiability of Equality Equations (LC 990) | Union equality pairs, verify inequality | 30 min |
| Hard | Redundant Connection II (LC 685) | Directed two-parents and cycle case logic | 45 min |
| Hard | Optimize Water Distribution in a Village (LC 1168) | Virtual well source node + Kruskal MST | 40 min |

> **Gate C3.** DSU written from memory, correctly, with both optimisations. You can explain α(n) in one sentence. Kruskal and Prim both implemented once, and you can say which you would choose for a dense graph and why.

---

## Block C4 — Shortest paths · Days 57–59

**Objective.** Pick the right shortest-path algorithm from the edge weights — the exact question an interviewer asks to separate people who memorised Dijkstra from people who understand it.

### Pattern card — shortest paths

| Edge weights | Algorithm | Complexity | Detectable |
|---|---|---|---|
| All 1 (unweighted) | BFS | O(V + E) | — |
| 0 or 1 | 0-1 BFS with a deque | O(V + E) | — |
| Non-negative, arbitrary | Dijkstra with a heap | O((V + E) log V) | — |
| Negative edges, no negative cycles | Bellman-Ford | O(V · E) | negative cycles |
| All pairs, small V | Floyd-Warshall | O(V³) | negative cycles |
| DAG | Topological order + relaxation | O(V + E) | — |

### Learn — checklist

- [ ] Dijkstra with a lazy heap: push `(dist, node)`, skip stale entries with `if d > dist[node]: continue`.
- [ ] Why Dijkstra fails with negative edges — construct the counterexample out loud.
- [ ] 0-1 BFS: `appendleft` for weight 0, `append` for weight 1.
- [ ] Bellman-Ford: `V-1` relaxation rounds; a further improvement means a negative cycle.
- [ ] Cheapest Flights Within K Stops: Bellman-Ford bounded by `K+1` rounds, or a BFS over `(node, stops)`.
- [ ] Dijkstra on a grid: the "distance" is the maximum edge on the path in Path With Minimum Effort, not the sum.
- [ ] Floyd-Warshall: three loops with `k` outermost — getting that order wrong is the classic bug.
- [ ] A* and when it helps (heuristic must be admissible) — a bonus answer, not required.
- [ ] Path reconstruction: parent array, then walk backwards.
- [ ] Complexity on grids: `O(mn log(mn))` for Dijkstra, and say it explicitly.

### Concept drill

| Question | Answer |
|---|---|
| Why does Dijkstra need non-negative weights? | A later shorter path could invalidate an already-settled node |
| What does the lazy-heap `continue` do? | Discards outdated entries instead of using decrease-key |
| Bellman-Ford: why `V-1` rounds? | A shortest simple path has at most `V-1` edges |
| 0-1 BFS: why `appendleft`? | Weight-0 edges cost nothing, so they belong at the front |
| Floyd-Warshall: why is `k` outermost? | It allows intermediate vertices in increasing index order |
| When is BFS enough? | All edges have the same weight |

### Practice ladder

| Tier | Problem | Cue | Target |
|---|---|---|---|
| Medium | Network Delay Time / Dijkstra (LC 743) | Min-heap relaxation with dist array | 30 min |
| Medium | Path with Maximum Probability (LC 1514) | Max-heap Dijkstra with probabilities | 30 min |
| Medium | Cheapest Flights Within K Stops / Bellman-Ford (LC 787) | K+1 rounds edge relaxation | 35 min |
| Medium | Path with Minimum Effort (LC 1631) | Min-heap Dijkstra on max-edge weight | 35 min |
| Medium | Swim in Rising Water (LC 778) | Priority queue Dijkstra or binary search | 35 min |
| Hard | Find the City / Floyd-Warshall (LC 1334) | Triple loop all-pairs shortest paths | 35 min |
| Hard | Minimum Cost to Reach Destination in Time (LC 1928) | Dijkstra tracking (time, cost) states | 45 min |
| Hard | Shortest Path with Obstacles Elimination (LC 1293) | 3D state BFS over (r, c, k_remaining) | 45 min |

> **Gate C4.** Dijkstra written from memory with the stale-entry skip, and you can explain in one sentence why it fails on negative edges. You can map any stated problem to one of the six rows in the table within 60 seconds.

---

## Block C5 — Greedy, intervals, and bit manipulation · Days 60–62

**Objective.** Justify greedy choices with an exchange argument, and add the bit tricks that turn O(n) space into O(1).

### Pattern card — greedy and bits

| Problem | Greedy rule | Why it is safe |
|---|---|---|
| Jump Game II | always extend the farthest reachable | intervals are nested and ordered |
| Gas Station | restart after a deficit | the unique start is the one after the largest cumulative deficit |
| Partition Labels | extend the end to the farthest last-occurrence | characters cannot be split |
| Non-overlapping intervals | earliest end first | exchange argument |
| Task Scheduler | schedule the most frequent first | idle slots are driven by the max frequency |
| Candy | two passes, left then right | local constraints are one-directional |
| Remove Duplicate Letters | monotonic stack + "can I still place it later" | lexicographic minimality |

| Bit trick | Expression |
|---|---|
| Isolate lowest set bit | `x & -x` |
| Clear lowest set bit | `x & (x - 1)` |
| Is power of two | `x > 0 and x & (x - 1) == 0` |
| Count set bits | loop on `x &= x - 1`, or `bin(x).count('1')` |
| Swap two values | `a ^= b; b ^= a; a ^= b` |
| Single number | XOR everything |
| Missing number | XOR of indices and values |

### Learn — checklist

- [ ] The exchange argument, stated in one sentence: "if an optimal solution differs from the greedy choice at the first step, swapping in the greedy choice does not make it worse".
- [ ] When greedy fails and DP is required — coin change is the canonical counterexample.
- [ ] Jump Game II: BFS-on-intervals framing; the `current_end` / `farthest` two-pointer loop.
- [ ] Gas Station: total-sum check plus the restart rule.
- [ ] Interval scheduling by end time versus by start time — know why one fails.
- [ ] Two-pass greedy (Candy) and why a single pass is insufficient.
- [ ] Bit properties: XOR is associative and self-inverse; two's complement and `x & -x`.
- [ ] Single Number II (every element appears three times) — bitwise counting mod 3.
- [ ] Single Number III — partition by a set bit of the XOR.
- [ ] Bitmask enumeration: `for mask in range(1 << n)` and why it is `O(2^n · n)` when you iterate the bits.

### Concept drill

| Question | Answer |
|---|---|
| When does greedy fail? | When a locally optimal choice blocks a better global one (coin change with 3, 4, 5 and target 8) |
| Gas Station: what identifies the start? | The position after the lowest cumulative sum |
| Why sort intervals by end for maximum non-overlap? | Earliest finish leaves maximal room — exchange argument |
| `x & -x` extracts what? | The lowest set bit |
| Why does XOR find the single number? | Pairs cancel and XOR is commutative |
| Single Number III: what splits the array? | Any set bit in the total XOR partitions the two unique numbers |

### Practice ladder

| Tier | Problem | Cue | Target |
|---|---|---|---|
| Easy | Single Number (LC 136) | XOR cancellation: a ^ a = 0 | 10 min |
| Easy | Number of 1 Bits (LC 191) | Brian Kernighan bit trick: x & (x - 1) | 8 min |
| Easy | Counting Bits (LC 338) | Bit manipulation DP: dp[i] = dp[i >> 1] + (i & 1) | 15 min |
| Easy | Assign Cookies (LC 455) | Two pointers greedy match smallest child | 10 min |
| Medium | N Meetings in One Room | Sort by finish time, greedy selection | 15 min |
| Medium | Minimum Platforms Required | Sort arrivals and departures, sweep line | 25 min |
| Medium | Job Sequencing Problem | Sort by profit desc, place at latest slot | 25 min |
| Medium | Fractional Knapsack Problem | Sort by value/weight ratio desc, greedy fill | 20 min |
| Medium | Greedy Minimum Coins | Greedy largest denomination decrement | 15 min |
| Medium | Jump Game (LC 55) | Running farthest reachable boundary | 15 min |
| Medium | Jump Game II (LC 45) | Interval window boundary BFS jumps | 25 min |
| Medium | Gas Station (LC 134) | Total fuel deficit and greedy reset start | 25 min |
| Medium | Single Number II (LC 137) | Bit-level counting mod 3 | 25 min |
| Medium | Single Number III (LC 260) | Total XOR + lowest set bit partition | 25 min |
| Hard | Candy (LC 135) | Two-pass left-to-right and right-to-left | 30 min |

> **Gate C5.** You can state an exchange argument for one greedy problem out loud in under 30 seconds. All five bit tricks reproduced from memory. You can name a greedy problem that requires DP instead, and say why.

---

## Phase C review day · Day 62

| Block | Activity |
|---|---|
| 1 · Blank page | BFS template, DFS three-colour, Kahn's, DSU, Dijkstra, bit tricks. All from memory. |
| 2 · Ledger replay | Every `open` row from C1–C5. |
| 3 · Algorithm-choice drill | 10 problem statements in 10 minutes — name the algorithm, no coding. |
| 4 · Explain out loud | "Why does Dijkstra fail with negative edges?" and "when do you use DSU instead of DFS?" |

**Phase C gate:**

- [ ] ≥ 42 of the ~60 Phase C problems attempted, ≥ 25 at T2 or better.
- [ ] BFS, DFS, Kahn's, DSU, and Dijkstra all written from memory.
- [ ] Checkpoint 3 passed (Day 62).
- [ ] You can name the algorithm for a stated graph problem in under 60 seconds, nine times out of ten.
