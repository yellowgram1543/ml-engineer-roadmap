# PHASE A — FOUNDATIONS AND LINEAR STRUCTURES

**DSA 100-Day Plan · Days 1–24 · Blocks A1–A8**

> **Phase goal.** Build the floor everything else stands on: a Python subset you can write at interview speed, and the four linear patterns that cover roughly 40% of all screening questions — hashing, two pointers, sliding window, and binary search. By Day 24 you can look at a string or array problem and name the pattern before you finish reading it.

---

## Phase dashboard

| Item | Details |
|---|---|
| **Phase** | A — Foundations and linear structures |
| **Days** | 1–24 |
| **Blocks** | A1 Python floor · A2 arrays and strings · A3 hashing · A4 sliding window · A5 prefix sums · A6 binary search · A7 sorting and intervals · A8 string algorithms |
| **New problems** | ~55 |
| **Checkpoint** | Day 25 — 90 minutes, 3 problems |
| **Outcome** | Recognise and execute the four linear patterns; write the binary-search template and the window template from memory, correctly, first time. |

**Prerequisites.** None. If you have written any Python before, A1 collapses to a two-hour skim — but do not skip the gotchas table.

---

## Block A1 — The Python floor · Days 1–2

**Objective.** Restrict yourself to a deliberate subset of Python and know its costs. Interview code fails on syntax and on complexity assumptions, not on ideas.

### Learn — checklist

- [ ] Complexity of the operations you use daily: `list.append` O(1) amortised, `list.insert(0, x)` O(n), `x in list` O(n), `x in set` / `x in dict` O(1) average, `list.sort` O(n log n), `min`/`max` O(n), slicing O(k).
- [ ] `collections`: `Counter`, `defaultdict`, `deque` (`popleft` O(1)), `OrderedDict`, `namedtuple`.
- [ ] `heapq`: it is a **min**-heap; max-heap via negation; `heapq.heapify` is O(n); pushing tuples sorts lexicographically and breaks ties on the second element (which is what you usually want, unless the second element is unorderable).
- [ ] `bisect_left` vs `bisect_right`: `left` returns the first index where `a[i] >= x`; `right` returns the first index where `a[i] > x`. `right - left` is the count of `x`.
- [ ] Sorted containers: `sorted(..., key=...)` is stable; sorting tuples sorts by first then second.
- [ ] Recursion limit is ~1000 by default; iterative DFS or `sys.setrecursionlimit` for deep graphs.
- [ ] Integer division and modulo with negatives: `-7 // 2 == -4`, `-7 % 2 == 1`. This bites in binary search and in index arithmetic.
- [ ] Strings are immutable: `s += c` in a loop is O(n²). Use a list and `''.join`.
- [ ] `float('inf')` and `-float('inf')` as sentinels; `math.inf`.
- [ ] Mutable default arguments — `def f(x, acc=[])` is a classic interview-code bug.
- [ ] Aliasing: `b = a` shares the list; `b = a[:]` or `a.copy()` does not. Nested lists need `copy.deepcopy`.

### Concept drill

| Question | Answer |
|---|---|
| Why is `deque` used for BFS instead of a list? | `list.pop(0)` is O(n); `deque.popleft()` is O(1) |
| Why is `''.join(list)` faster than repeated `+`? | Strings are immutable; `+` copies the whole string each time |
| What does `heapq.heappush(h, (dist, node))` give you? | A min-heap ordered by distance, ties broken by node |
| What breaks if `node` is a dict? | Tuples compare element-wise and dicts are not orderable — store an index instead |
| Is `x in set` guaranteed O(1)? | Average yes; worst case O(n) with adversarial hashing |
| What does `sorted(d.items(), key=lambda kv: -kv[1])` do? | Sorts by value descending; `-` works on numbers only |

### Practice tasks

Write each of these from a blank file, no reference, timed at 10 minutes each:

1. `freq(seq) -> dict` using a plain loop (not `Counter`).
2. `top_k(seq, k)` using `heapq.nlargest` and then by hand with a size-k min-heap.
3. `group_by_key(records, key_fn)` using `defaultdict(list)`.
4. `dedupe_ordered(seq)` preserving first-seen order in O(n).
5. `merge_sorted(a, b)` two-pointer, O(n+m), no `sorted()`.
6. `binary_search_first(a, x)` with the half-open template.
7. `is_permutation(s, t)` using `Counter` and then without it.
8. `chunk(seq, n)` as a generator.
9. `flatten(nested)` iterative, handling arbitrary depth.
10. `rotate_left(a, k)` in place, O(1) extra space.

> **Gate A1.** Ten utilities written from memory in under 90 minutes total. You can state the complexity of the ten operations in the first checklist item without looking. You have personally triggered the negative-modulo bug and the mutable-default bug.

---

## Block A2 — Arrays and strings · Days 3–5

**Objective.** Own in-place manipulation and the opposite-ends two-pointer pattern. This is the highest-frequency block in screening rounds.

### Pattern card — opposite-ends two pointers

| Trigger | Invariant | Typical win |
|---|---|---|
| "sorted array" + "find a pair/triple" | Move the pointer that can still improve the answer | O(n²) → O(n) |
| "in place, O(1) extra space" | Read pointer and write pointer | Avoids a second array |
| "palindrome" | Compare mirrored characters | — |
| "partition into two/three classes" | Low/high boundaries (Dutch flag) | Single pass, stable-ish |

### Learn — checklist

- [ ] Two-pointer pair search on a sorted array: why moving the smaller side is safe.
- [ ] Three-pointer generalisation (3Sum) with duplicate skipping — the exact skip conditions.
- [ ] Read/write two pointers for in-place removal (`move zeroes`, `remove duplicates`).
- [ ] Dutch national flag: three regions, why the loop must not advance after a swap with `high`.
- [ ] In-place reversal and the three-step rotation (reverse whole, reverse first k, reverse rest).
- [ ] Strings vs lists: when you need mutability, convert once.
- [ ] Character arithmetic: `ord(c) - ord('a')` for a 26-slot array instead of a dict — faster and interview-friendly.
- [ ] Boundary discipline: `while l < r` vs `while l <= r` — decide by whether a single element can be the answer.

### Concept drill

| Question | Answer |
|---|---|
| In 3Sum, why sort first? | Sorted order makes the two-pointer move decision valid and duplicates skippable |
| Why does Dutch flag not increment `i` after swapping with `high`? | The incoming element has not been examined yet |
| In `move zeroes`, what does the write pointer represent? | The next position for a non-zero element |
| Why is `rotate by reversal` correct? | Two reversals restore internal order while the outer reversal moves the block |
| When does the two-pointer pair trick fail? | Unsorted input, or when the condition is not monotone in the pointer move |
| `s[l:r]` inside a loop — hidden cost? | O(r-l) copy per iteration; can turn an O(n) algorithm into O(n²) |

### Practice ladder

| Tier | Problem | Cue | Target |
|---|---|---|---|
| Easy | Two Sum II — Input Array Is Sorted | Sorted pair, opposite ends | 12 min |
| Easy | Valid Palindrome | Mirrored compare, skip non-alnum | 10 min |
| Easy | Move Zeroes | Read/write pointers | 10 min |
| Easy | Remove Duplicates from Sorted Array | Read/write with a gap | 10 min |
| Easy | Sort Colors | Dutch flag, three regions | 15 min |
| Medium | 3Sum | Sort + fix one + two-pointer + dedupe | 25 min |
| Medium | Container With Most Water | Move the shorter wall | 20 min |
| Medium | Rotate Array | Three reversals, O(1) space | 20 min |
| Medium | Squares of a Sorted Array | Largest square at either end | 15 min |
| Hard | Trapping Rain Water | Opposite ends with running maxima | 35 min |

> **Gate A2.** 3Sum and Trapping Rain Water solved unaided in the target time, with duplicate handling correct on the first run. You can explain why the pointer move is safe in Container With Most Water without hand-waving. You have written Rotate Array using O(1) extra space.

---

## Block A3 — Hashing · Days 6–8

**Objective.** Convert "find X while scanning" into O(1) lookups. Hashing is the single most reusable idea in screening interviews.

### Pattern card — hash map and hash set

| Use | Key | Value | Classic |
|---|---|---|---|
| Seen-before | element | index or count | Two Sum |
| Frequency | element | count | Valid Anagram |
| Grouping | canonical form | list of members | Group Anagrams |
| Prefix state | running sum | earliest index | Subarray Sum Equals K |
| Consecutive runs | element | run length | Longest Consecutive Sequence |
| Bijection | source char | target char (and reverse) | Isomorphic Strings |

### Learn — checklist

- [ ] The one-pass complement trick in Two Sum: store *before* you check, or check *before* you store — know which and why.
- [ ] Canonical keys: `''.join(sorted(s))` for anagrams, `tuple(counts)` when sorting is too slow.
- [ ] Prefix-sum + hashmap: `prefix[j] - prefix[i] = k` becomes "have I seen `prefix[j] - k`".
- [ ] Storing the **earliest** index is required for longest-subarray variants; storing the latest is required for shortest.
- [ ] Longest Consecutive Sequence: only start counting at a run's beginning (`x-1 not in set`) — that is what makes it O(n).
- [ ] Bijective mapping needs two maps or a set, otherwise `ab` → `cc` passes incorrectly.
- [ ] `Counter` arithmetic: `+`, `-`, `&`, `|` and `Counter() == Counter()`.
- [ ] Hash collisions: why worst case is O(n) and what an interviewer wants to hear ("average O(1), worst case O(n) with chaining").

### Concept drill

| Question | Answer |
|---|---|
| In Two Sum, why store the index rather than the value? | You must return positions; the value is already the lookup key |
| Why is Longest Consecutive O(n) and not O(n log n)? | Sorting is avoided; each element is examined at most twice |
| What key makes Group Anagrams O(n·k) rather than O(n·k log k)? | A 26-length count tuple |
| Prefix sums + hash map: what do you store, and what do you initialise? | `{0: -1}` — the empty prefix, so subarrays starting at index 0 work |
| Why must Isomorphic Strings use two maps? | One direction only permits two sources mapping to one target |
| When is a set enough and a map unnecessary? | When you need existence, not position or count |

### Practice ladder

| Tier | Problem | Cue | Target |
|---|---|---|---|
| Easy | Two Sum | Complement lookup, one pass | 10 min |
| Easy | Contains Duplicate | Set membership | 8 min |
| Easy | Valid Anagram | 26-count array or Counter | 10 min |
| Easy | Isomorphic Strings | Two-way bijection | 15 min |
| Easy | Happy Number | Cycle detection via set | 12 min |
| Medium | Group Anagrams | Canonical key | 20 min |
| Medium | Subarray Sum Equals K | Prefix sum + `{0:1}` | 25 min |
| Medium | Longest Consecutive Sequence | Start-of-run check | 25 min |
| Medium | Continuous Subarray Sum | Prefix mod k + earliest index | 25 min |
| Medium | LRU Cache | Hash map + doubly linked list (preview of B1) | 35 min |

> **Gate A3.** Subarray Sum Equals K and Longest Consecutive Sequence written in O(n) without hints. You can state the `{0: -1}` initialisation trick and explain why it exists. You can name three different "canonical key" strategies.

---

## Block A4 — Sliding window · Days 9–11

**Objective.** Master the variable-width window — the pattern with the highest ratio of interview frequency to conceptual difficulty.

### Pattern card — sliding window

| Variant | Condition | Template |
|---|---|---|
| Fixed size k | window length is constant | add right, remove left when `size > k` |
| Variable, longest | "longest subarray such that `<valid>`" | expand right; while invalid, shrink left; record after restore |
| Variable, shortest | "smallest window such that `<condition>`" | expand right; while valid, shrink left and record |
| Count of exact-k | "exactly k" | `atMost(k) - atMost(k-1)` |

> **The one sentence that matters:** the window is valid when a state variable satisfies the condition, and you shrink *while* it violates it. Everything else is bookkeeping.

### Learn — checklist

- [ ] Write the variable-window template from memory: `l = 0; for r in range(n): add(r); while invalid: remove(l); l += 1; best = max(best, r - l + 1)`.
- [ ] Know the difference between shrinking *while invalid* (longest) and shrinking *while valid* (shortest).
- [ ] Maintain a `need`/`have` counter rather than recomputing validity — this is what keeps it O(n).
- [ ] Minimum Window Substring: `formed == required` bookkeeping and why the answer is only updated after shrinking.
- [ ] Longest Repeating Character Replacement: window is valid when `len - max_freq <= k`.
- [ ] "At most K distinct" reduction to "exactly K": `atMost(K) - atMost(K-1)`.
- [ ] Prove O(n): each index enters and leaves the window at most once.
- [ ] Recognise when a window does NOT apply: negative numbers (use prefix sums instead), or non-monotone validity.

### Concept drill

| Question | Answer |
|---|---|
| Why do negative numbers break the variable window? | Shrinking no longer monotonically improves validity |
| In Minimum Window Substring, what does `formed` count? | Characters whose required frequency is exactly met |
| Why is "exactly K" computed as a difference? | Exactness is not monotone; "at most" is |
| What is the amortised cost per element? | O(1) — inserted once, removed at most once |
| Longest Repeating Character Replacement: what replaces `max_freq`? | Nothing — a stale `max_freq` is still valid for maximisation |
| Fixed window: what must you remove and when? | The element leaving, exactly when `r - l + 1 > k` |

### Practice ladder

| Tier | Problem | Cue | Target |
|---|---|---|---|
| Easy | Maximum Average Subarray I | Fixed window | 10 min |
| Medium | Longest Substring Without Repeating Characters | Variable longest + set | 20 min |
| Medium | Longest Repeating Character Replacement | Validity on `len - maxfreq` | 25 min |
| Medium | Permutation in String | Fixed window + count match | 25 min |
| Medium | Find All Anagrams in a String | Fixed window + count match | 25 min |
| Medium | Max Consecutive Ones III | At most k flips | 20 min |
| Medium | Fruit Into Baskets | At most 2 distinct | 20 min |
| Medium | Minimum Size Subarray Sum | Shortest, positive numbers | 20 min |
| Hard | Minimum Window Substring | Need/have, shortest | 40 min |
| Hard | Subarrays with K Different Integers | `atMost(k) - atMost(k-1)` | 40 min |

> **Gate A4.** The template reproduced from memory in under 3 minutes. Minimum Window Substring solved in 40 with correctness on duplicates. You can explain in one sentence why negative numbers break the pattern and what to use instead.

---

## Block A5 — Prefix sums and Kadane · Days 12–14

**Objective.** Turn range queries into O(1) and contiguous-subarray problems into a single pass.

### Pattern card

| Technique | Precompute | Query | Use |
|---|---|---|---|
| 1D prefix sum | `P[i] = sum(a[:i])` | `sum(l..r) = P[r+1] - P[l]` | range sums |
| 2D prefix sum | `P[i][j] = sum of rows `<i`, cols `<j`` | inclusion–exclusion on four corners | submatrix sums |
| Difference array | `d[l] += v; d[r+1] -= v` | prefix scan gives the array | range updates |
| Kadane | running max ending here | — | maximum subarray |
| Prefix + hash | map of running sums | look up complement | subarray sum equals k |

### Learn — checklist

- [ ] Prefix with a leading zero so `l = 0` needs no special case.
- [ ] 2D inclusion–exclusion: `P[r2][c2] - P[r1][c2] - P[r2][c1] + P[r1][c1]` — derive it once on paper, never memorise blindly.
- [ ] Kadane's recurrence: `cur = max(x, cur + x)`; `best = max(best, cur)`.
- [ ] Maximum Product Subarray needs *both* running max and running min because a negative flips them.
- [ ] Difference arrays for "add v to every element in [l, r]" queries; the prefix scan reconstructs.
- [ ] Subarray sums divisible by k: store `prefix % k`, and remember Python's `%` is non-negative.
- [ ] Prefix XOR for subarray XOR queries; the same hashmap trick works.
- [ ] When prefix sums beat sliding window: negatives present, or queries are offline and repeated.

### Concept drill

| Question | Answer |
|---|---|
| Why does Kadane work with all-negative arrays? | Because `cur = max(x, cur + x)` restarts at each element |
| Why does max-product need a min? | A negative times a negative becomes the new maximum |
| 2D prefix: why subtract two and add one? | The overlap region was subtracted twice |
| Difference array complexity for q updates? | O(1) per update, O(n) to materialise |
| Why store earliest index for "longest" and latest for "shortest"? | The gap between indices is the length |
| Prefix XOR: what is `a[l..r]`? | `P[r+1] ^ P[l]` |

### Practice ladder

| Tier | Problem | Cue | Target |
|---|---|---|---|
| Easy | Range Sum Query — Immutable | 1D prefix | 10 min |
| Easy | Find Pivot Index | Left sum vs total minus left | 12 min |
| Easy | Maximum Subarray | Kadane | 12 min |
| Medium | Product of Array Except Self | Prefix × suffix, no division | 20 min |
| Medium | Maximum Product Subarray | Track min and max | 20 min |
| Medium | Subarray Sums Divisible by K | Prefix mod + hash | 25 min |
| Medium | Range Sum Query 2D — Immutable | 2D inclusion–exclusion | 25 min |
| Medium | Matrix Block Sum | 2D prefix with clamping | 25 min |
| Medium | Contiguous Array | Map 0 to -1, prefix sum | 25 min |
| Medium | Subarray Sum Equals K (repeat) | Spaced repeat from A3 | 15 min |

> **Gate A5.** 2D prefix written correctly on the first attempt, including boundary clamping. Kadane reproduced from memory. You can explain why the prefix-hashmap approach subsumes the sliding window when negatives appear.

---

## Block A6 — Binary search · Days 15–18

**Objective.** Never hand-roll a bisection again. One template, four variants, and the discipline to prove the invariant before coding.

### Pattern card — binary search

| Variant | Trigger | Invariant | Returns |
|---|---|---|---|
| Exact / lower bound | "first index where `a[i] >= x`" | `lo` is the smallest candidate | first true |
| Upper bound | "last index where `a[i] <= x`" | `hi` is the largest candidate | last true |
| Rotated array | "sorted then rotated" | one half is always sorted | pivot or target |
| On the answer | "minimum capacity / maximum speed such that feasible" | `feasible(x)` is monotone | smallest feasible `x` |

### Learn — checklist

- [ ] Write the half-open template from memory: `lo, hi = 0, len(a)`; `while lo < hi: mid = (lo + hi) // 2; ...`.
- [ ] Explain the three classic off-by-ones: `<=` vs `<`, `hi = mid` vs `hi = mid - 1`, returning `lo` vs `hi` vs `-1`.
- [ ] Lower-bound vs upper-bound semantics, and the identity `count(x) = upper(x) - lower(x)`.
- [ ] Rotated array: determine which half is sorted, then decide which half can contain the target; handle duplicates by narrowing one step.
- [ ] Binary search on the answer: **write the feasibility predicate first**, prove it monotone, then search over the answer range. This is the highest-value sub-skill in the block.
- [ ] Range for "search on answer": often `lo = 1`, `hi = max(arr)` or `sum(arr)`; the loop returns `lo`.
- [ ] `bisect_left`/`bisect_right` usage when the library is allowed.
- [ ] Real-number binary search: fixed iteration count (100) instead of convergence on equality.
- [ ] Median of Two Sorted Arrays: partition-based O(log min(m, n)) — the only genuinely hard variant, and worth memorising structurally.

### Concept drill

| Question | Answer |
|---|---|
| Why is binary search O(log n)? | The interval halves each iteration |
| What must be true for "search on the answer" to work? | The predicate is monotone: once true, true for all larger values |
| Difference between `lower` and `upper` bound? | `lower` returns the first `>= x`; `upper` the first `> x` |
| Why `lo + (hi - lo) // 2` in C++/Java? | Avoids integer overflow; Python cannot overflow |
| Sorted-rotated search: complexity with duplicates? | O(n) worst case when many equal elements force one-step narrowing |
| Real-valued search: stopping condition? | A fixed iteration count — `abs(hi-lo) < eps` can loop forever |
| When does the half-open template return `len(a)`? | When every element is `< x` — handle it explicitly |

### Practice ladder

| Tier | Problem | Cue | Target |
|---|---|---|---|
| Easy | Binary Search | Exact template | 8 min |
| Easy | Search Insert Position | Lower bound | 10 min |
| Easy | First Bad Version | First true | 10 min |
| Easy | Sqrt(x) | Search on answer, integers | 12 min |
| Medium | Find First and Last Position of Element in Sorted Array | Lower + upper | 20 min |
| Medium | Search in Rotated Sorted Array | Sorted-half test | 25 min |
| Medium | Find Minimum in Rotated Sorted Array | Pivot search | 20 min |
| Medium | Find Peak Element | Local monotonicity | 20 min |
| Medium | Koko Eating Bananas | Feasibility on speed | 30 min |
| Medium | Capacity to Ship Packages Within D Days | Feasibility on capacity | 30 min |
| Hard | Split Array Largest Sum | Feasibility on max-sum | 35 min |
| Hard | Median of Two Sorted Arrays | Partition invariant | 45 min |

> **Gate A6.** Lower-bound template written from memory in 2 minutes. Two "search on the answer" problems solved where you wrote the predicate before the search. One rotated-array problem with duplicates handled. You can state why Median of Two Sorted Arrays is O(log min(m,n)) rather than O(log(m+n)).

---

## Block A7 — Sorting, selection, and intervals · Days 19–21

**Objective.** Know what `sort` costs, implement merge and quickselect, and own the interval pattern that appears in every scheduling-flavoured question.

### Pattern card — intervals

| Operation | Sort key | Rule |
|---|---|---|
| Merge overlapping | start ascending | if `next.start <= cur.end`, extend `cur.end = max(cur.end, next.end)` |
| Insert into sorted | — | three cases: before, overlapping, after |
| Max non-overlapping | end ascending (greedy) | pick the earliest-ending interval that does not overlap |
| Min rooms needed | start/end events | sweep line: +1 at start, −1 at end, track running max |
| Min removals | end ascending | count conflicts against the last kept end |

### Learn — checklist

- [ ] Merge sort: divide, merge, O(n log n) time, O(n) space, stable. Write it from memory once.
- [ ] Quickselect: average O(n), worst O(n²), random pivot. Use it for kth-largest.
- [ ] Counting/bucket sort when keys are bounded — O(n + k), and the reason `Sort Colors` can be O(n).
- [ ] Stability matters: sorting tuples or using a two-key comparator.
- [ ] Custom comparator in Python: `functools.cmp_to_key`, and why `key=` is preferred when possible.
- [ ] Interval merge: sort by start, then a single pass.
- [ ] Sweep line for rooms/meetings: sort starts and ends separately, or build events.
- [ ] "Largest number" comparator: compare `a+b` vs `b+a`, not `a` vs `b`.
- [ ] `n log n` is the floor for comparison sorting — say so when asked.

### Concept drill

| Question | Answer |
|---|---|
| Merge sort vs quicksort: when is each preferable? | Merge for stability and linked lists; quick for in-place and cache locality |
| Why randomise the pivot? | Avoids the O(n²) adversarial case |
| Why sort intervals by start for merging? | Guarantees no later interval can begin before the current one is closed |
| Why sort by end for "max non-overlapping"? | Earliest finish leaves the most room — exchange argument |
| Sweep line for min rooms: what is the running max? | The maximum number of simultaneously active intervals |
| `Largest Number`: why `a+b` vs `b+a`? | Compare concatenations so the comparator is transitive |

### Practice ladder

| Tier | Problem | Cue | Target |
|---|---|---|---|
| Easy | Merge Sorted Array | Two pointers backwards | 12 min |
| Medium | Sort an Array | Merge sort from memory | 25 min |
| Medium | Kth Largest Element in an Array | Quickselect | 25 min |
| Medium | Merge Intervals | Sort by start + merge | 20 min |
| Medium | Insert Interval | Three cases | 25 min |
| Medium | Meeting Rooms II | Sweep line or heap | 25 min |
| Medium | Non-overlapping Intervals | Greedy by end | 20 min |
| Medium | Largest Number | Custom comparator | 25 min |
| Hard | Meeting Rooms III | Heaps + assignment simulation | 40 min |

> **Gate A7.** Merge sort written from memory and passing on a 10-element array. Kth largest via quickselect with an average-O(n) justification. All four interval variants classified correctly by their sort key without hesitation.

---

## Block A8 — String algorithms · Days 22–24

**Objective.** Handle the string problems that are not hashing or windows: palindromes, pattern matching, and parsing.

### Pattern card

| Problem shape | Technique | Complexity |
|---|---|---|
| Longest palindromic substring | Expand around centre | O(n²) time, O(1) space |
| Pattern in text | KMP / Z-function | O(n + m) |
| Multiple pattern equality | Rolling hash (Rabin–Karp) | O(n + m) average |
| Parse with grammar | Single pass with state | O(n) |
| Encode/decode | Length prefix or delimiter escaping | O(n) |

### Learn — checklist

- [ ] Expand-around-centre for palindromes: `2n-1` centres, and why it beats DP here.
- [ ] KMP failure function (`lps`): build it once, explain what it encodes, and use it for `strStr`.
- [ ] Z-function as an alternative to KMP — same complexity, often easier to write.
- [ ] Rabin–Karp rolling hash and the collision caveat.
- [ ] Parsing discipline: read digits, handle sign, clamp to 32-bit range (`atoi`).
- [ ] Roman numerals: subtractive pairs (`IV`, `IX`, `XL`, `XC`, `CD`, `CM`).
- [ ] Encode/Decode Strings: `len#payload` framing survives arbitrary delimiters.
- [ ] `str.isalnum()`, `.lower()`, `.strip()` and the fact that `s[::-1]` is O(n) each call.
- [ ] When a regex-like question is really DP (save it for D3: regex matching, wildcard matching).

### Concept drill

| Question | Answer |
|---|---|
| Why does expand-around-centre need `2n-1` centres? | Odd and even length palindromes have different centres |
| What does the KMP `lps` array store? | Longest proper prefix that is also a suffix, for each prefix |
| Why is rolling hash not exact? | Hash collisions; verify candidates character by character |
| `atoi`: what must you clamp? | Values below −2³¹ and above 2³¹−1 |
| Encode/decode: why length-prefix instead of a delimiter? | Delimiters can occur inside the payload |
| When is `s[::-1] == s` insufficient? | It ignores case and non-alphanumerics in `Valid Palindrome` variants |

### Practice ladder

| Tier | Problem | Cue | Target |
|---|---|---|---|
| Easy | Valid Palindrome II | Two pointers with one deletion | 15 min |
| Easy | Roman to Integer | Subtractive pairs | 15 min |
| Easy | Add Strings | Manual addition, carry | 15 min |
| Medium | Longest Palindromic Substring | Expand around centre | 25 min |
| Medium | Palindromic Substrings | Same, counting | 20 min |
| Medium | Implement strStr / Find the Index of First Occurrence | KMP | 35 min |
| Medium | Encode and Decode Strings | Length prefix | 25 min |
| Medium | String to Integer (atoi) | Parser with clamping | 25 min |
| Medium | Multiply Strings | Grade-school multiplication | 30 min |
| Medium | Repeated Substring Pattern | KMP or `s in s+s` trick | 20 min |

> **Gate A8.** Expand-around-centre and KMP both written from memory on the same day, and you can say which you would choose under time pressure and why. `atoi` passes the overflow cases. You can encode and decode a list containing delimiters.

---

## Phase A review day · Day 24

No new material. Four hours, structured:

| Block | Activity |
|---|---|
| 1 · Blank page | Write from memory: binary search (both bounds), sliding window, Kadane, merge intervals, KMP `lps`. |
| 2 · Ledger replay | Every `open` row in the weakness ledger. Re-solve without looking. |
| 3 · Speed set | 4 easy problems in 60 minutes, exactly 15 each. |
| 4 · Explain out loud | Record yourself answering: "when do you use a sliding window versus prefix sums?" and "why is binary search on the answer valid?" |

**Phase A gate — all must be true before Day 25's checkpoint:**

- [ ] Templates from memory: binary search (lower bound), variable sliding window, Kadane, interval merge.
- [ ] ≥ 40 of the ~55 Phase A problems attempted, ≥ 25 at T2 or better.
- [ ] Ledger is current, every row has scheduled re-solve dates.
- [ ] Checkpoint 1 passed (Day 25).
