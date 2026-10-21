# BANKS, TEMPLATES AND CHEATSHEETS

**DSA 100-Day Plan · Reference file**

> **How to use this.** Do not read this file end to end. Use it three ways: (1) copy the templates by hand until they are automatic, (2) re-read the pattern table before any interview, (3) check the complexity sheet whenever you are unsure what to claim out loud.

---

## 1 — The sixteen pattern cards

| # | Pattern | Trigger sentence in the question | One-line template | Complexity |
|---|---|---|---|---|
| 1 | **Two pointers (opposite)** | "sorted array", "find a pair", "in place" | move the pointer that can still improve | O(n) after sort |
| 2 | **Fast/slow pointers** | "cycle", "middle", "kth from end" | one moves 1, the other 2 | O(n) |
| 3 | **Sliding window** | "longest/shortest subarray such that…" | expand right, shrink left while invalid | O(n) |
| 4 | **Prefix sum / difference** | "range sum", "subarray sum equals k" | precompute cumulative, look up complement | O(n) |
| 5 | **Hashing** | "seen before", "count", "group" | map or set, one pass | O(n) |
| 6 | **Binary search on answer** | "minimum capacity/speed such that feasible" | write the predicate, then bisect | O(n log range) |
| 7 | **Monotonic stack** | "next greater", "largest rectangle" | pop while the invariant breaks | O(n) |
| 8 | **Heap / top-k** | "k largest", "streaming", "merge k" | size-k heap, or heap of heads | O(n log k) |
| 9 | **Intervals** | "merge", "overlap", "meeting rooms" | sort by start or end, sweep | O(n log n) |
| 10 | **Backtracking** | "all combinations/permutations/ways" | choose, recurse, un-choose | output-sensitive |
| 11 | **Tree DFS** | any tree structure question | return the info the parent needs | O(n) |
| 12 | **Graph BFS** | "minimum steps", unweighted | queue + visited on enqueue | O(V+E) |
| 13 | **Topological sort** | "order", "prerequisite", "can finish" | indegree queue or DFS postorder | O(V+E) |
| 14 | **Union-find** | "connected", "same group", incremental | path compression + union by size | α(n) |
| 15 | **Shortest path** | "cheapest", "minimum cost with weights" | Dijkstra with a lazy heap | O((V+E) log V) |
| 16 | **Dynamic programming** | "count ways", "min/max cost", overlapping subproblems | name the state in one sentence | states × transitions |

**The recognition drill.** Read 20 problem titles only, no statements. For each, name the pattern in under 10 seconds. Do this once a week from Day 40.

---

## 2 — Templates to memorise

Write each by hand until you can produce it cold, in under three minutes, with no reference. These are not optional.

### 2.1 Binary search — lower bound

```python
def lower_bound(a, x):
    lo, hi = 0, len(a)          # half-open: answer is in [lo, hi]
    while lo < hi:
        mid = (lo + hi) // 2
        if a[mid] < x:
            lo = mid + 1        # mid cannot be the answer
        else:
            hi = mid            # mid may be the answer
    return lo                   # first index with a[i] >= x, or len(a)
```

**Variant — first true in a monotone predicate:**

```python
def first_true(lo, hi, pred):   # pred(lo-1)=False, pred(hi)=True
    while lo < hi:
        mid = (lo + hi) // 2
        if pred(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo
```

### 2.2 Sliding window — variable, longest

```python
def longest_window(s, limit):
    from collections import defaultdict
    count = defaultdict(int)
    left, best = 0, 0
    for right, ch in enumerate(s):
        count[ch] += 1
        while len(count) > limit:              # invalid -> shrink
            count[s[left]] -= 1
            if count[s[left]] == 0:
                del count[s[left]]
            left += 1
        best = max(best, right - left + 1)     # record after restoring validity
    return best
```

**Shortest variant:** record *inside* the `while` loop after each shrink, not after it.

### 2.3 Two pointers — opposite ends

```python
def two_sum_sorted(a, target):
    l, r = 0, len(a) - 1
    while l < r:
        s = a[l] + a[r]
        if s == target:
            return [l, r]
        if s < target:
            l += 1
        else:
            r -= 1
    return []
```

### 2.4 BFS — graph

```python
from collections import deque

def bfs(graph, start):
    q = deque([start])
    dist = {start: 0}
    while q:
        u = q.popleft()
        for v in graph[u]:
            if v not in dist:          # mark on ENQUEUE
                dist[v] = dist[u] + 1
                q.append(v)
    return dist
```

### 2.5 BFS — grid, multi-source, level counting

```python
def bfs_grid(grid, sources):
    m, n = len(grid), len(grid[0])
    q = deque()
    for r, c in sources:
        grid[r][c] = 0                 # mark visited in place
        q.append((r, c))
    steps = 0
    while q:
        for _ in range(len(q)):        # one level
            r, c = q.popleft()
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                    grid[nr][nc] = 0
                    q.append((nr, nc))
        steps += 1
    return steps
```

### 2.6 Topological sort — Kahn's

```python
from collections import deque

def topo(n, edges):
    adj = [[] for _ in range(n)]
    indeg = [0] * n
    for u, v in edges:
        adj[u].append(v)
        indeg[v] += 1
    q = deque(i for i in range(n) if indeg[i] == 0)
    order = []
    while q:
        u = q.popleft()
        order.append(u)
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                q.append(v)
    return order if len(order) == n else []      # empty list = cycle
```

### 2.7 Union-find

```python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n
        self.count = n

    def find(self, x):
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]   # path halving
            x = self.parent[x]
        return x

    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra == rb:
            return False
        if self.size[ra] < self.size[rb]:
            ra, rb = rb, ra
        self.parent[rb] = ra
        self.size[ra] += self.size[rb]
        self.count -= 1
        return True
```

### 2.8 Dijkstra

```python
import heapq

def dijkstra(graph, src):
    dist = {src: 0}
    pq = [(0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist.get(u, float("inf")):
            continue                       # stale entry
        for v, w in graph[u]:
            nd = d + w
            if nd < dist.get(v, float("inf")):
                dist[v] = nd
                heapq.heappush(pq, (nd, v))
    return dist
```

### 2.9 Monotonic stack — next greater

```python
def next_greater(a):
    res = [-1] * len(a)
    st = []                                # indices, decreasing values
    for i, x in enumerate(a):
        while st and a[st[-1]] < x:
            res[st.pop()] = x
        st.append(i)
    return res
```

### 2.10 Heap — top-k

```python
import heapq

def top_k_largest(nums, k):
    h = []
    for x in nums:
        heapq.heappush(h, x)
        if len(h) > k:
            heapq.heappop(h)               # min-heap of size k
    return h                               # h[0] is the k-th largest
```

### 2.11 Backtracking

```python
def backtrack(start, path):
    if is_complete(path):
        results.append(path[:])            # copy, never the reference
        return
    for i in range(start, n):
        if should_skip(i):
            continue
        path.append(a[i])
        backtrack(i if reuse_allowed else i + 1, path)
        path.pop()
```

### 2.12 Trie

```python
class Trie:
    def __init__(self):
        self.root = {}

    def insert(self, word):
        node = self.root
        for ch in word:
            node = node.setdefault(ch, {})
        node["#"] = True                   # end marker

    def search(self, word):
        node = self.root
        for ch in word:
            if ch not in node:
                return False
            node = node[ch]
        return "#" in node

    def starts_with(self, prefix):
        node = self.root
        for ch in prefix:
            if ch not in node:
                return False
            node = node[ch]
        return True
```

### 2.13 Tree traversal — iterative inorder

```python
def inorder(root):
    res, stack, cur = [], [], root
    while cur or stack:
        while cur:
            stack.append(cur)
            cur = cur.left
        cur = stack.pop()
        res.append(cur.val)
        cur = cur.right
    return res
```

### 2.14 Tree traversal — level order

```python
def level_order(root):
    if not root:
        return []
    out, q = [], deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        out.append(level)
    return out
```

### 2.15 Reverse a linked list

```python
def reverse(head):
    prev, cur = None, head
    while cur:
        nxt = cur.next        # save BEFORE rewiring
        cur.next = prev
        prev, cur = cur, nxt
    return prev
```

### 2.16 Dummy-node walk

```python
dummy = ListNode(0)
tail = dummy
while head:
    tail.next = head
    tail = tail.next
    head = head.next
tail.next = None              # always terminate explicitly
return dummy.next
```

---

## 3 — Complexity reference

### 3.1 Data structure operations

| Structure | Access | Search | Insert | Delete | Notes |
|---|---|---|---|---|---|
| Array (list) | O(1) | O(n) | O(n) mid, O(1) end amortised | O(n) | contiguous, cache-friendly |
| Hash map / set | — | O(1) avg, O(n) worst | O(1) avg | O(1) avg | unordered |
| Linked list | O(n) | O(n) | O(1) at a known node | O(1) at a known node | no random access |
| Stack / queue | O(1) top | O(n) | O(1) | O(1) | LIFO / FIFO |
| Heap | O(1) min | O(n) | O(log n) | O(log n) | `heapify` O(n) |
| Balanced BST | O(log n) | O(log n) | O(log n) | O(log n) | ordered ops |
| Trie | O(L) | O(L) | O(L) | O(L) | L = key length |
| Union-find | — | α(n) | α(n) | — | near-constant |

### 3.2 Algorithms

| Algorithm | Time | Space | When |
|---|---|---|---|
| Merge sort | O(n log n) | O(n) | stable sort needed, linked lists |
| Quicksort | O(n log n) avg, O(n²) worst | O(log n) | in-place, cache-friendly |
| Quickselect | O(n) avg, O(n²) worst | O(1) | kth element, array disposable |
| Counting sort | O(n + k) | O(k) | bounded integer keys |
| Binary search | O(log n) | O(1) | sorted input, or monotone predicate |
| BFS / DFS | O(V + E) | O(V) | traversal, connectivity, shortest-unweighted |
| Dijkstra | O((V+E) log V) | O(V) | non-negative weights |
| Bellman-Ford | O(V·E) | O(V) | negative weights |
| Floyd-Warshall | O(V³) | O(V²) | all pairs, small V |
| Topological sort | O(V + E) | O(V) | DAG ordering |
| Kruskal | O(E log E) | O(V) | sparse MST |
| Prim | O(E log V) | O(V) | dense MST |
| Subset enumeration | O(2ⁿ · n) | O(n) | n ≤ 20 |
| DP (general) | states × transitions | states | overlapping subproblems |

### 3.3 Input sizes that dictate the target complexity

| n | Acceptable complexity | Typical approach |
|---|---|---|
| ≤ 10 | O(n!), O(2ⁿ) | brute force, permutations |
| ≤ 20 | O(2ⁿ · n) | bitmask DP |
| ≤ 100 | O(n³) | Floyd-Warshall, interval DP |
| ≤ 1,000 | O(n²) | 2D DP, pairwise |
| ≤ 10⁵ | O(n log n) | sort, heap, binary search |
| ≤ 10⁶ | O(n) or O(n log n) tight | one pass, hashing |
| ≥ 10⁷ | O(n) with a small constant | streaming, array-only |

**Use this in interviews.** When you hear the constraints, say the target complexity out loud before you design. It is one of the highest-signal sentences a candidate can produce.

---

## 4 — Python gotchas at interview speed

| Gotcha | Consequence | Fix |
|---|---|---|
| `list.pop(0)` | O(n) | `deque.popleft()` |
| `x in list` | O(n) | use a set |
| `s += c` in a loop | O(n²) | list + `''.join` |
| `-7 // 2 == -4` | wrong index arithmetic | be explicit with `int()` or `//` on absolutes |
| `-7 % 2 == 1` | surprises in hashing | Python's mod is non-negative |
| mutable default `def f(a=[])` | state leaks between calls | `None` sentinel |
| `b = a` | aliasing, not a copy | `a[:]`, `a.copy()`, `copy.deepcopy` |
| `[[0]*n]*m` | all rows are the same object | `[[0]*n for _ in range(m)]` |
| recursion depth 1000 | `RecursionError` on deep graphs | iterative, or `sys.setrecursionlimit` |
| `heapq` is a min-heap | no max-heap | negate the values |
| tuple comparison with dict inside | `TypeError` | add an index tiebreaker |
| `int` is unbounded | no overflow, but also no overflow warning | say it aloud |
| `sort` is stable, `sorted` returns new | mutating assumption | pick one |
| `//` on floats | returns a float | use `int()` when you need an int |
| `set` of lists | unhashable | tuples |
| comparing `None` with `==` | works but is wrong style | `is None` |
| `dict` insertion order | guaranteed since 3.7 | safe to rely on |

### Switching language

| Python | C++ | Java |
|---|---|---|
| `list` | `vector<int>` | `ArrayList<Integer>` |
| `dict` | `unordered_map` | `HashMap` |
| `set` | `unordered_set` | `HashSet` |
| `heapq` (min) | `priority_queue` (max, use `greater<>`) | `PriorityQueue` (min by default) |
| `deque` | `deque` | `ArrayDeque` |
| `bisect` | `lower_bound` / `upper_bound` | `Arrays.binarySearch`, or hand-roll |
| sorted container | `set` / `map` (ordered) | `TreeMap` / `TreeSet` |
| `Counter` | `map<int,int>` | `HashMap` + `merge` |

---

## 5 — The ten ways people fail this plan

| # | Failure | Signal | Fix |
|---|---|---|---|
| 1 | **Watching solutions instead of writing them** | High problem count, low T-level | Enforce the one-written-attempt rule |
| 2 | **Skipping the ledger** | Repeating the same pattern failure | Log every unsolved problem, schedule D+2 and D+7 |
| 3 | **No timing** | Comfortable at 60 min/problem | Hard stop at 25 for mediums |
| 4 | **Learning patterns on mock days** | Mocks feel like study sessions | Mocks test only owned material |
| 5 | **Skipping graphs or DP** | Plan stalls at Day 60 | Both are mandatory; they are the differentiators |
| 6 | **Reading easy problems as "done"** | 200 easy, 0 hard | Ratio should be roughly 30% easy, 60% medium, 10% hard |
| 7 | **Silent coding** | Good solutions, poor scores | Narrate or record every set from Day 83 |
| 8 | **Skipping behavioural prep** | Strong loop, rejected on "culture fit" | Six STAR stories by Day 90 |
| 9 | **Applying before checkpoint 5** | Rejections from reachable companies | Graduate first, then apply |
| 10 | **Stopping after Day 100** | Skills decay in three weeks | 30 minutes/day maintenance |

---

## 6 — Progress tracker

Copy this into a sheet. Update daily.

### 6.1 Phase tracker

| Phase | Days | Blocks done | Problems attempted | At T2+ | Checkpoint | Date |
|---|---|---|---|---|---|---|
| A | 1–24 | ☐ 8/8 | /55 | /30 | ☐ D25 | |
| B | 25–45 | ☐ 7/7 | /65 | /35 | ☐ D45 | |
| C | 46–62 | ☐ 5/5 | /60 | /32 | ☐ D62 | |
| D | 63–82 | ☐ 7/7 | /65 | /35 | ☐ D82 | |
| E | 83–100 | ☐ 4/4 | /20 | — | ☐ D100 | |

### 6.2 Weakness ledger

| Date | Problem | Pattern | What broke | D+2 | D+7 | Status |
|---|---|---|---|---|---|---|
| | | | | ☐ | ☐ | open |

### 6.3 Mock scores

| Date | Mock | Clarify | Approach | Code | Narrate | Test | Complexity | Recover | Total /35 |
|---|---|---|---|---|---|---|---|---|---|
| | | | | | | | | | |

### 6.4 Readiness checklist — do not apply until all are true

- [ ] All five checkpoints passed.
- [ ] ≥ 120 problems at T3 (solved in 25 minutes, narrated, complexity stated).
- [ ] Six patterns you can teach on a whiteboard with no notes.
- [ ] Ledger has fewer than five `open` rows.
- [ ] Six STAR stories rehearsed to 90 seconds each.
- [ ] Four mocks scored with every dimension ≥ 3.
- [ ] Final simulated loop scored ≥ 14/20 with no round below 3.
- [ ] For applied scientist: all five specialist rounds practised (Part 06).
- [ ] Two questions prepared to ask each interviewer.
- [ ] One-page weakness report written.
