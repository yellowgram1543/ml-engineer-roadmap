# PHASE B — LINKED STRUCTURES, TREES, RECURSION

**DSA 100-Day Plan · Days 25–45 · Blocks B1–B7**

> **Phase goal.** Move from linear scans to pointer manipulation and recursion. This phase contains the two places candidates most often freeze — writing a linked-list reversal without losing the tail, and writing a recursive tree traversal with correct return values — plus the stack and heap patterns that carry half of the medium-difficulty question pool.

---

## Phase dashboard

| Item | Details |
|---|---|
| **Phase** | B — Linked structures, trees, recursion |
| **Days** | 25–45 |
| **Blocks** | B1 linked lists · B2 stacks and monotonic stack · B3 queues and deques · B4 heaps · B5 binary trees · B6 binary search trees · B7 backtracking I |
| **New problems** | ~65 |
| **Checkpoints** | Day 25 (checkpoint 1), Day 45 (checkpoint 2) |
| **Outcome** | Manipulate pointers without losing references, write every tree traversal both recursively and iteratively, and generate combinations under a recursion template you can reproduce cold. |

**Prerequisites.** Phase A gate passed. Specifically: you can write a loop invariant, you are fluent with `None` checks, and you can state complexity before coding.

---

## Block B1 — Linked lists · Days 25–27

**Objective.** Pointer surgery with no index safety net. Every bug here is a lost reference or a wrong order of assignment.

### Pattern card — linked list

| Pattern | Setup | Key move |
|---|---|---|
| Traverse and mutate | — | Save `nxt` **before** rewiring |
| Dummy node | `dummy = ListNode(0, head)` | Removes all head-is-special cases |
| Fast/slow | `slow = fast = head` | `slow` lands mid; with `fast = head.next` it lands at the end of the first half |
| Reverse in place | `prev, cur = None, head` | Three-pointer rotation |
| Reverse a segment | walk to `left-1` first | Splice with `prev`, `cur`, `nxt` |
| Merge two | dummy tail | Advance the smaller; append the remainder |
| Cycle detection | Floyd | Meeting point, then reset one pointer to head |

### Learn — checklist

- [ ] **The order rule:** hold `nxt = cur.next` before `cur.next = prev`. Every reversal bug is this rule violated.
- [ ] Dummy node: use it for *every* problem where the head can change (remove Nth, merge, partition, reverse II).
- [ ] Reverse a linked list iteratively (4 lines) and recursively, and know the recursion's O(n) stack cost.
- [ ] Floyd's cycle detection: why the meeting point exists, and why resetting one pointer to `head` and advancing both by one finds the entry.
- [ ] Middle of the list: even-length behaviour differs between `fast = head` and `fast = head.next`; choose deliberately.
- [ ] Remove Nth from end with a single pass using a gap of `n`.
- [ ] Copy List with Random Pointer: hashmap of old→new, or interleaved weaved nodes (O(1) space).
- [ ] LRU Cache = hashmap + doubly linked list with sentinel head and tail.
- [ ] Equality vs identity: use `is None`, never `== None`; and never mutate a node you still need.

### Concept drill

| Question | Answer |
|---|---|
| Why a dummy node? | It makes "insert at head" and "remove head" ordinary cases |
| In Floyd's algorithm, why does resetting to `head` work? | The distance from head to entry equals the distance from the meeting point to entry |
| Iterative reversal: what are the three variables? | `prev`, `cur`, `nxt` — and the order of the two assignments matters |
| Why is finding the middle ambiguous for even length? | Two valid middles; `fast = head.next` biases to the first half's end |
| LRU: why doubly linked? | Deletion requires the previous node, which a singly linked list cannot give in O(1) |
| Copy-with-random: why can't you just clone recursively? | Cycles between random pointers cause infinite recursion without a visited map |

### Practice ladder

| Tier | Problem | Cue | Target |
|---|---|---|---|
| Easy | Reverse Linked List | Three pointers | 10 min |
| Easy | Merge Two Sorted Lists | Dummy + tail | 12 min |
| Easy | Linked List Cycle | Floyd | 12 min |
| Easy | Middle of the Linked List | Fast/slow | 10 min |
| Easy | Remove Duplicates from Sorted List | Skip run | 12 min |
| Medium | Remove Nth Node From End of List | Dummy + gap of n | 20 min |
| Medium | Linked List Cycle II | Floyd entry | 20 min |
| Medium | Reverse Linked List II | Dummy + segment splice | 30 min |
| Medium | Reorder List | Middle + reverse + merge | 30 min |
| Medium | Copy List with Random Pointer | Map or weave | 30 min |
| Medium | Add Two Numbers | Carry propagation | 20 min |
| Hard | Merge k Sorted Lists | Heap (see B4) | 35 min |
| Hard | LRU Cache | Map + DLL | 40 min |

> **Gate B1.** Reverse, reverse-II, and reorder written without losing a node on the first run. Floyd entry-point derived on paper, not memorised. LRU Cache passes `get`/`put` with capacity 1 and capacity 2.

---

## Block B2 — Stacks and the monotonic stack · Days 28–30

**Objective.** Use a stack whenever the answer depends on "the most recent unresolved thing" — and recognise the monotonic-stack family on sight.

### Pattern card — monotonic stack

| Question shape | Stack holds | Pop condition |
|---|---|---|
| Next greater element | indices of unresolved elements | `a[stack[-1]] < a[i]` |
| Previous smaller | indices, increasing values | `a[stack[-1]] >= a[i]` |
| Largest rectangle | indices, increasing heights | `height[stack[-1]] > height[i]` |
| Daily temperatures | indices | same as next greater |
| Remove k digits / smallest subsequence | indices, increasing digits | `digit[stack[-1]] > digit[i]` |
| Trapping rain water | indices, decreasing heights | `height[stack[-1]] <= height[i]` |

> **The one sentence:** a monotonic stack maintains a set of *candidates* that could still be the answer for some future element, and discards a candidate the moment a better one arrives.

### Learn — checklist

- [ ] Valid parentheses: a closing bracket must match the top; a mismatched stack is the failure mode, not just an empty one.
- [ ] Min stack: store `(value, running_min)` pairs, or a second stack. Know both.
- [ ] Evaluate RPN: pop order is `b` then `a`, and the operation is `a op b` — get this backwards once and you never will again.
- [ ] Monotonic stack template: `while stack and cond: pop and record; push i`.
- [ ] Next greater element: circular array handled by iterating `2n` with `i % n`.
- [ ] Largest Rectangle in Histogram: sentinel `0` appended, width = `i - stack[-1] - 1` after popping.
- [ ] Remove K Digits: pop while the top is larger and `k > 0`; then strip leading zeros and handle the empty result.
- [ ] Decode String: two stacks (counts, strings) — or recursion.
- [ ] When a stack is the wrong tool: you need min/max *and* arbitrary removal (use a heap or a balanced structure).

### Concept drill

| Question | Answer |
|---|---|
| Why is the monotonic stack O(n)? | Each index is pushed and popped at most once |
| In largest rectangle, why append a sentinel 0? | It forces all remaining bars to be popped at the end |
| Width after popping index `j` at position `i`? | `i - stack[-1] - 1` — the previous smaller element bounds the left side |
| Min stack: why pairs rather than a single min variable? | The minimum must be restored after a pop |
| RPN: why `b` then `a`? | Subtraction and division are not commutative |
| Remove K Digits: what happens if k remains after the scan? | Truncate the tail |

### Practice ladder

| Tier | Problem | Cue | Target |
|---|---|---|---|
| Easy | Valid Parentheses | Match top | 10 min |
| Easy | Min Stack | Pairs | 15 min |
| Easy | Next Greater Element I | Monotonic, hash the answer | 15 min |
| Medium | Evaluate RPN | Two pops | 20 min |
| Medium | Daily Temperatures | Indices + monotonic | 20 min |
| Medium | Next Greater Element II | Circular, iterate 2n | 20 min |
| Medium | Asteroid Collision | Stack with signed comparison | 25 min |
| Medium | Decode String | Two stacks | 30 min |
| Medium | Simplify Path | Stack of segments | 25 min |
| Medium | Remove K Digits | Monotonic + greedy | 30 min |
| Medium | Basic Calculator II | Stack or running total | 35 min |
| Hard | Largest Rectangle in Histogram | Monotonic + sentinel | 35 min |
| Hard | Trapping Rain Water | Stack or two pointers | 35 min |

> **Gate B2.** Largest Rectangle in Histogram written with the sentinel and the width formula correct on the first run. You can state the pop condition for four different monotonic variants without notes. Remove K Digits produces "0" rather than "" for the all-zeros case.

---

## Block B3 — Queues, deques, and BFS on implicit graphs · Days 31–33

**Objective.** Recognise when "shortest" implies BFS, and use a monotonic deque for the window-maximum family.

### Pattern card

| Structure | Operation win | Use |
|---|---|---|
| `deque` | O(1) both ends | BFS frontier, sliding window maximum |
| Circular queue | fixed capacity | design questions |
| Two stacks as a queue | amortised O(1) | design + amortisation argument |
| Monotonic deque | window max/min in O(n) | Sliding Window Maximum |
| BFS | shortest path in unweighted graphs | grids, word transformations, state search |

### Learn — checklist

- [ ] BFS template: queue holds states, `visited` set added **on enqueue** (not on dequeue) to avoid duplicates in the queue.
- [ ] Level-order processing: track `len(queue)` at the start of each level for depth.
- [ ] Monotonic deque for window maximum: store indices, remove from the back while smaller, remove from the front when out of range.
- [ ] Why a deque beats a heap for a fixed window: O(1) amortised per element instead of O(log k).
- [ ] Circular queue: `(head + count) % capacity`, and why you need a count or a sentinel slot.
- [ ] Queue from two stacks: amortised O(1) — the push stack pours into the pop stack only when the latter is empty.
- [ ] State-space BFS: define the state precisely (position, keys held, remaining budget) before coding.

### Concept drill

| Question | Answer |
|---|---|
| Why mark visited at enqueue time? | Otherwise the same node can enter the queue many times |
| Sliding Window Maximum: what does the deque hold? | Index of the maximum candidate, in decreasing value order |
| When to use BFS instead of DFS? | When you need the shortest number of steps in an unweighted graph |
| Two-stack queue: amortised cost per operation? | O(1) — each element moves at most once |
| Circular queue: what does `count` prevent? | Confusing full with empty when `head == tail` |

### Practice ladder

| Tier | Problem | Cue | Target |
|---|---|---|---|
| Easy | Implement Queue using Stacks | Two stacks | 15 min |
| Easy | Number of Recent Calls | Deque of timestamps | 12 min |
| Medium | Design Circular Queue | Modular arithmetic | 20 min |
| Medium | Sliding Window Maximum | Monotonic deque | 30 min |
| Medium | Rotting Oranges | Multi-source BFS, levels | 25 min |
| Medium | 01 Matrix | Multi-source BFS from zeros | 25 min |
| Medium | Open the Lock | BFS over states with deadends | 30 min |
| Medium | Design Hit Counter | Deque or bucket array | 25 min |
| Hard | Sliding Window Median | Two heaps or sorted list | 40 min |

> **Gate B3.** Sliding Window Maximum in O(n) from memory. You can explain, in one sentence, why deque beats heap for a fixed window. Every BFS you write marks visited on enqueue.

---

## Block B4 — Heaps and top-k · Days 34–36

**Objective.** Stop sorting when you only need the top k. Recognise the "streaming + order" signal that says heap.

### Pattern card — heap

| Signal | Structure | Complexity |
|---|---|---|
| "k largest / k closest" | size-k **min**-heap | O(n log k) |
| "k smallest" | size-k **max**-heap (negate) | O(n log k) |
| "merge k sorted" | min-heap of heads | O(N log k) |
| "running median" | max-heap of low half + min-heap of high half | O(log n) per insert |
| "schedule with a limit" | heap keyed by deadline/profit | depends |
| "repeatedly take the largest" | max-heap | O(log n) per op |

### Learn — checklist

- [ ] Size-k min-heap for k largest: push everything, pop when `len > k`; the root is the k-th largest.
- [ ] Why min-heap for largest-k (and not the reverse) — the heap must be able to evict the weakest survivor.
- [ ] Negation trick for max-heaps; tuples for tie-breaking; a counter to break ties between unorderable objects.
- [ ] `heapify` is O(n); `n` successive pushes is O(n log n).
- [ ] Two-heap median: invariant `len(low) == len(high)` or `len(low) == len(high) + 1`, and rebalancing after each insert.
- [ ] Merge k sorted lists: heap of `(value, list_index, node)`.
- [ ] Heap vs sorting: when `k << n`, heap wins; when you need all elements ordered, sort.
- [ ] Heap vs quickselect: quickselect is O(n) average but destroys the array and degrades adversarially; heaps are streaming-friendly.
- [ ] Greedy-with-heap: Course Schedule III (drop the longest course when over capacity).

### Concept drill

| Question | Answer |
|---|---|
| Why is top-k with a heap O(n log k) and not O(n log n)? | The heap never exceeds size k |
| Why a min-heap for the k largest? | The smallest survivor is the next eviction candidate, and it must be at the root |
| Running median: what is the rebalancing rule? | Move the root of the larger heap into the smaller until the size gap is ≤ 1 |
| When does `heapq` fail on tuples? | When the second element is unorderable — add a monotonic counter |
| Merge k lists: what goes in the heap? | One node per list, compared by value |
| When is sorting simpler than a heap? | When you need the full order or n is small |

### Practice ladder

| Tier | Problem | Cue | Target |
|---|---|---|---|
| Easy | Kth Largest Element in a Stream | Size-k min-heap | 15 min |
| Easy | Last Stone Weight | Max-heap by negation | 12 min |
| Medium | Kth Largest Element in an Array | Heap or quickselect | 20 min |
| Medium | Top K Frequent Elements | Counter + heap or bucket sort | 25 min |
| Medium | K Closest Points to Origin | Size-k max-heap on distance² | 20 min |
| Medium | Task Scheduler | Greedy + counting | 30 min |
| Medium | Reorganize String | Max-heap + cooldown | 30 min |
| Medium | Meeting Rooms II | Min-heap of end times | 25 min |
| Medium | Furthest Building You Can Reach | Min-heap of ladder usage | 35 min |
| Hard | Merge k Sorted Lists | Heap of heads | 35 min |
| Hard | Find Median from Data Stream | Two heaps | 40 min |
| Hard | IPO | Two heaps, greedy | 40 min |

> **Gate B4.** Running median with correct rebalancing on the first run, tested on even and odd insert counts. You can justify O(n log k) out loud. You can say when quickselect or bucket sort beats a heap.

---

## Block B5 — Binary trees · Days 37–40

**Objective.** The most-tested topic after arrays. Own four traversals, recursive and iterative, and the return-value discipline that makes tree recursion mechanical.

### Pattern card — tree recursion

| Question shape | Return value | Recurrence |
|---|---|---|
| Depth / count | a number from each subtree | `1 + max(left, right)` |
| Path through a node | contribution upward + global best | global update at the node, return the better single branch |
| Validate structure | boolean + auxiliary info | return `(valid, min, max)` or use bounds |
| Collect paths | void + mutable path list | push, recurse, pop |
| Level-based | BFS queue | process `len(queue)` per level |
| Build from traversals | index bounds | preorder gives root; inorder splits left/right |

### Learn — checklist

- [ ] All four traversals recursively (pre/in/post/level), in one file, from memory.
- [ ] Iterative inorder with an explicit stack; iterative preorder; iterative postorder via two stacks or a reversed preorder.
- [ ] The "return value vs global variable" split: a node can contribute to a path *or* pass a value upward, not always both.
- [ ] Maximum Path Sum: return `max(0, ...)` to discard negative branches, update the global with the split path.
- [ ] Diameter: same shape as max path sum, with an edge counter instead of weights.
- [ ] BFS level processing with `len(queue)`; zigzag with a direction flag.
- [ ] Serialize/deserialize with preorder and null markers — the framing matters.
- [ ] Lowest common ancestor: if both subtrees return non-null, the current node is the LCA.
- [ ] Reconstruct from preorder + inorder: index map for O(1) root lookup.
- [ ] Recursion depth: a degenerate tree of 10⁴ nodes will blow Python's default limit — convert to iterative BFS/DFS or raise the limit.

### Concept drill

| Question | Answer |
|---|---|
| Preorder + inorder vs preorder alone: why is one enough to reconstruct and the other not? | Inorder fixes the left/right split; preorder alone is ambiguous |
| Maximum Path Sum: why `max(0, branch)`? | A negative branch should be dropped, not carried |
| LCA: what does a null return mean? | Neither target found in that subtree |
| Diameter: what are you counting, nodes or edges? | Edges — `left_depth + right_depth` at the node |
| Why does iterative postorder need two stacks? | Root must be visited after both children; the second stack reverses the root-right-left order |
| When is BFS better than DFS? | Level questions, minimum depth, and any question about "closest" node |

### Practice ladder

| Tier | Problem | Cue | Target |
|---|---|---|---|
| Easy | Maximum Depth of Binary Tree | Simple recursion | 8 min |
| Easy | Same Tree | Pairwise recursion | 10 min |
| Easy | Invert Binary Tree | Swap children | 10 min |
| Easy | Symmetric Tree | Mirror recursion | 12 min |
| Easy | Diameter of Binary Tree | Global + depth | 20 min |
| Medium | Binary Tree Level Order Traversal | BFS levels | 15 min |
| Medium | Binary Tree Zigzag Level Order Traversal | Direction flag | 20 min |
| Medium | Binary Tree Right Side View | Last of each level | 18 min |
| Medium | Path Sum II | Backtracking + path | 25 min |
| Medium | Lowest Common Ancestor of a Binary Tree | Both-subtree test | 25 min |
| Medium | Construct Binary Tree from Preorder and Inorder | Index map + bounds | 30 min |
| Hard | Binary Tree Maximum Path Sum | Global + `max(0, x)` | 35 min |
| Hard | Serialize and Deserialize Binary Tree | Preorder + null markers | 40 min |
| Hard | Binary Tree Postorder Traversal (iterative) | Two stacks | 25 min |

> **Gate B5.** All four traversals written recursively and iteratively from memory. Maximum Path Sum correct with negative-node tests. Serialize/deserialize round-trips a random tree of 100 nodes including duplicates.

---

## Block B6 — Binary search trees · Days 41–43

**Objective.** Exploit the ordering invariant, and know exactly when a BST degrades to a linked list.

### Pattern card — BST

| Operation | Rule | Complexity (balanced) |
|---|---|---|
| Search | go left if `target < node.val` | O(h) = O(log n) |
| Insert | descend to a null slot | O(h) |
| Delete | 0/1/2 children; 2 children → successor | O(h) |
| Validate | bounds, not just parent comparison | O(n) |
| kth smallest | inorder yields sorted order | O(h + k) |
| Range sum | prune branches outside `[lo, hi]` | O(h + k) |

### Learn — checklist

- [ ] Validate BST with `(low, high)` bounds — the parent-only check fails on the classic counterexample; be able to draw it.
- [ ] Inorder traversal of a BST is sorted; that single fact solves a third of BST questions.
- [ ] Delete a node with two children: replace with the inorder successor (leftmost of the right subtree), then delete that.
- [ ] kth smallest: iterative inorder with a counter; know the O(1) amortised iterator version.
- [ ] BST Iterator: explicit stack, `hasNext`/`next` in amortised O(1).
- [ ] Sorted array → balanced BST: mid as root, recurse on halves.
- [ ] Range sum with pruning: skip a subtree entirely when its bounds fall outside the range.
- [ ] Why a BST is O(n) worst case: insertion of a sorted sequence degenerates to a linked list.
- [ ] When a BST beats a hash map: ordered operations, range queries, successor/predecessor.

### Concept drill

| Question | Answer |
|---|---|
| Why does parent-only validation fail? | A node deep in the left subtree can still exceed an ancestor's bound |
| Inorder gives you what for a BST? | A sorted sequence |
| Delete with two children: which replacement? | Inorder successor (or predecessor) — both preserve the invariant |
| Why is a BST better than a hash map for range queries? | Ordering supports O(log n) bounds and traversal in key order |
| What is the amortised cost of BST Iterator's `next`? | O(1) — each node is pushed and popped once |
| How do you build a balanced BST from a sorted array? | Recursively pick the middle element |

### Practice ladder

| Tier | Problem | Cue | Target |
|---|---|---|---|
| Easy | Search in a Binary Search Tree | Descend | 8 min |
| Easy | Lowest Common Ancestor of a BST | Range test | 15 min |
| Easy | Convert Sorted Array to BST | Mid recursion | 20 min |
| Easy | Range Sum of BST | Prune | 15 min |
| Medium | Validate Binary Search Tree | Bounds | 20 min |
| Medium | Kth Smallest Element in a BST | Inorder counter | 22 min |
| Medium | Insert into a BST | Descend to null | 15 min |
| Medium | Delete Node in a BST | Three cases | 30 min |
| Medium | Binary Search Tree Iterator | Explicit stack | 25 min |
| Medium | Trim a Binary Search Tree | Prune subtrees | 20 min |
| Hard | Recover a Binary Search Tree | Find two swapped nodes | 35 min |

> **Gate B6.** Validate BST passes the deep-violation counterexample. Delete-node handles all three cases. You can explain why degenerate insertion is O(n) and what a balanced tree buys.

---

## Block B7 — Backtracking I · Days 44–45

**Objective.** One recursion template that generates every combination, permutation, and subset — with correct duplicate handling.

### Pattern card — backtracking

| Problem | Loop structure | Dedupe rule |
|---|---|---|
| Subsets | include/exclude or loop from `start` | sort + skip `i > start and a[i] == a[i-1]` |
| Combinations | loop from `start` to `n - k + remaining` | none needed |
| Permutations | swap or `used[]` array | sort + skip equal unused neighbours |
| Combination sum (reuse) | recurse with the same `i` | sort + skip duplicates at the same level |
| Parentheses | two counters, not a list | prune when `close > open` |

> **Template.** `def backtrack(start, path): if done: record; for i in range(start, n): if skip(i): continue; path.append(a[i]); backtrack(next(i), path); path.pop()`
> The three decisions that define every variant: **what is `start`**, **what is the skip condition**, **when do you record**.

### Learn — checklist

- [ ] The universal template above, written from memory with `append` / recurse / `pop`.
- [ ] Subsets: `2^n` results, so the complexity is Ω(2^n) — say it explicitly.
- [ ] Permutations with `used[]` and the dedupe condition `a[i] == a[i-1] and not used[i-1]` — derive why.
- [ ] Combination Sum with reuse: recurse on `i`, not `i+1`; prune when the remaining target goes negative.
- [ ] Pruning rules that turn a timeout into a pass: sort first, break early when `a[i] > remaining`.
- [ ] Generate Parentheses: prune on `close > open` and on exceeding `n`.
- [ ] Word Search: mark visited in place (`board[r][c] = '#'`) and restore on the way out.
- [ ] N-Queens: three sets (columns, diagonals `r - c`, anti-diagonals `r + c`).
- [ ] Complexity discipline: state the size of the output tree, not a vague "exponential".

### Concept drill

| Question | Answer |
|---|---|
| Why sort before deduping? | Equal elements must be adjacent for the skip rule to work |
| `i > start` in the skip condition — what does it prevent? | Skipping the first occurrence, which would remove the whole branch |
| Permutations: why `used[i-1]` in the dedupe? | It distinguishes "previous equal is still on the path" from "already finished" |
| Combination Sum: why recurse on `i`? | To allow reuse of the same element |
| Word Search: why mutate the board? | O(1) visited marking without a set |
| N-Queens: why `r - c` and `r + c`? | Both are constant along a diagonal |

### Practice ladder

| Tier | Problem | Cue | Target |
|---|---|---|---|
| Medium | Subsets | Include/exclude | 15 min |
| Medium | Subsets II | Sort + skip | 20 min |
| Medium | Permutations | `used[]` | 20 min |
| Medium | Permutations II | Dedupe on `used` | 25 min |
| Medium | Combination Sum | Reuse + prune | 20 min |
| Medium | Combination Sum II | No reuse + dedupe | 25 min |
| Medium | Combinations | Fixed size k | 18 min |
| Medium | Letter Combinations of a Phone Number | Map + DFS | 20 min |
| Medium | Generate Parentheses | Two counters | 25 min |
| Medium | Word Search | Grid + restore | 30 min |
| Hard | N-Queens | Three sets | 40 min |
| Hard | Palindrome Partitioning | Substring check at each cut | 30 min |

> **Gate B7.** The template reproduced from memory. Subsets II and Permutations II both correct with duplicates on the first run. Every solution states an output-sensitive complexity (e.g. `O(n · 2^n)`) rather than "exponential".

---

## Phase B review day · Day 45

| Block | Activity |
|---|---|
| 1 · Blank page | Write from memory: iterative inorder, reverse linked list, monotonic stack template, heap top-k, backtracking template, DSU-free Floyd cycle detection. |
| 2 · Ledger replay | Every `open` row from B1–B7. |
| 3 · Mixed set | 45 minutes: 1 linked list + 1 tree + 1 heap, no topic hints. |
| 4 · Explain out loud | "When do you use a heap versus sorting?" and "why is a monotonic stack O(n)?" |

**Phase B gate:**

- [ ] ≥ 45 of the ~65 Phase B problems attempted, ≥ 28 at T2 or better.
- [ ] All four tree traversals iterative and recursive, from memory.
- [ ] Checkpoint 2 passed (Day 45).
- [ ] Ledger rows for this phase all have both re-solve dates scheduled.
