import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  ArrowLeft,
  Copy,
  CheckCheck,
  Search,
  Filter,
  Sparkles,
  AlertTriangle,
  Code2,
  Terminal,
  Clock,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Table as TableIcon,
  Zap,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { DsaRoadmapData } from '../types/dsaRoadmap';

interface DsaCheatsheetsPageProps {
  data: DsaRoadmapData;
}

interface DsRow {
  name: string;
  access: string;
  search: string;
  insert: string;
  delete: string;
  notes: string;
}

interface AlgoRow {
  name: string;
  time: string;
  space: string;
  when: string;
}

interface ConstraintRow {
  n: string;
  complexity: string;
  typicalApproach: string;
  interviewCue: string;
}

interface PythonGotcha {
  id: number;
  gotcha: string;
  consequence: string;
  fix: string;
  category: 'Complexity' | 'Semantics' | 'Recursion & Heap' | 'Types & Memory';
}

const DS_COMPLEXITIES: DsRow[] = [
  { name: 'Array / List', access: 'O(1)', search: 'O(n)', insert: 'O(n) mid, O(1) end amortized', delete: 'O(n)', notes: 'Contiguous memory, cache-friendly' },
  { name: 'Hash Map / Set', access: '—', search: 'O(1) avg, O(n) worst', insert: 'O(1) avg', delete: 'O(1) avg', notes: 'Unordered, high constant factor' },
  { name: 'Linked List (Singly)', access: 'O(n)', search: 'O(n)', insert: 'O(1) at known node', delete: 'O(1) at known node', notes: 'No random access, pointer overhead' },
  { name: 'Stack / Queue', access: 'O(1) top/head', search: 'O(n)', insert: 'O(1)', delete: 'O(1)', notes: 'LIFO / FIFO invariants' },
  { name: 'Binary Heap (Priority Queue)', access: 'O(1) min/max', search: 'O(n)', insert: 'O(log n)', delete: 'O(log n)', notes: 'heapify builds in O(n) linear time' },
  { name: 'Balanced BST (AVL / Red-Black)', access: 'O(log n)', search: 'O(log n)', insert: 'O(log n)', delete: 'O(log n)', notes: 'Maintains sorted order dynamically' },
  { name: 'Trie (Prefix Tree)', access: 'O(L)', search: 'O(L)', insert: 'O(L)', delete: 'O(L)', notes: 'L = length of search key/string' },
  { name: 'Union-Find (DSU)', access: '—', search: 'α(n) ≈ O(1)', insert: 'α(n) ≈ O(1)', delete: '—', notes: 'Path compression + union by rank' },
];

const ALGO_COMPLEXITIES: AlgoRow[] = [
  { name: 'Merge Sort', time: 'O(n log n)', space: 'O(n)', when: 'Stable sort needed, linked list sorting' },
  { name: 'Quicksort', time: 'O(n log n) avg, O(n²) worst', space: 'O(log n)', when: 'In-place array sorting, cache-friendly' },
  { name: 'Quickselect', time: 'O(n) avg, O(n²) worst', space: 'O(1)', when: 'kth largest/smallest element in unsorted array' },
  { name: 'Counting / Radix Sort', time: 'O(n + k)', space: 'O(k)', when: 'Small bounded integer or digit ranges' },
  { name: 'Binary Search', time: 'O(log n)', space: 'O(1)', when: 'Sorted sequence or monotonic boolean predicate' },
  { name: 'BFS / DFS (Graph)', time: 'O(V + E)', space: 'O(V)', when: 'Shortest unweighted path, connectivity, cycle detection' },
  { name: 'Dijkstra', time: 'O((V + E) log V)', space: 'O(V)', when: 'Non-negative weighted shortest path with min-heap' },
  { name: 'Bellman-Ford', time: 'O(V · E)', space: 'O(V)', when: 'Graphs with negative edge weights or negative cycles' },
  { name: 'Floyd-Warshall', time: 'O(V³)', space: 'O(V²)', when: 'All-pairs shortest paths on small dense graphs (V ≤ 400)' },
  { name: 'Topological Sort (Kahn)', time: 'O(V + E)', space: 'O(V)', when: 'DAG task dependency ordering with zero in-degree queue' },
  { name: 'Kruskal (MST)', time: 'O(E log E)', space: 'O(V)', when: 'Minimum spanning tree on sparse graphs via Union-Find' },
  { name: 'Prim (MST)', time: 'O(E log V)', space: 'O(V)', when: 'Minimum spanning tree on dense graphs via priority queue' },
  { name: 'Bitmask DP', time: 'O(2ⁿ · n)', space: 'O(2ⁿ)', when: 'Traveling Salesperson / Assignment problems with n ≤ 20' },
  { name: 'Dynamic Programming (General)', time: 'States × Transitions', space: 'States', when: 'Overlapping subproblems + optimal substructure' },
];

const CONSTRAINT_RULES: ConstraintRow[] = [
  { n: 'n ≤ 10', complexity: 'O(n!), O(2ⁿ · n!)', typicalApproach: 'Brute-force recursion, full permutations', interviewCue: 'Traveling Salesperson brute search, N-Queens' },
  { n: 'n ≤ 20', complexity: 'O(2ⁿ · n) or O(3ⁿ)', typicalApproach: 'Bitmask DP, subset enumeration', interviewCue: 'Partition array into k equal subsets, matchings' },
  { n: 'n ≤ 100', complexity: 'O(n³)', typicalApproach: 'Floyd-Warshall, 3D DP, Interval DP (Burst Balloons)', interviewCue: 'Matrix chain multiplication, trie combinations' },
  { n: 'n ≤ 1,000', complexity: 'O(n²)', typicalApproach: '2D DP, pairwise comparisons, nested loops', interviewCue: 'Longest Common Subsequence, Edit Distance' },
  { n: 'n ≤ 10⁵', complexity: 'O(n log n)', typicalApproach: 'Sorting, Binary Search over answer, Heap, Segment Tree', interviewCue: 'Standard sorting, monotonic greedy checks' },
  { n: 'n ≤ 10⁶', complexity: 'O(n)', typicalApproach: 'One-pass hash table, two pointers, sliding window, stack', interviewCue: 'Linear scanning, Kadane, monotonic queue' },
  { n: 'n ≥ 10⁷', complexity: 'O(n) small constant, O(log n)', typicalApproach: 'Streaming, bitwise operations, math/closed-form', interviewCue: 'Bit manipulation, fast exponentiation, reservoirs' },
];

const PYTHON_GOTCHAS: PythonGotcha[] = [
  {
    id: 1,
    gotcha: 'list.pop(0) in BFS queue loops',
    consequence: 'Turns an O(V+E) graph BFS into an accidental O(V² + E) timeout!',
    fix: 'from collections import deque; q = deque([root]); q.popleft() # O(1)',
    category: 'Complexity',
  },
  {
    id: 2,
    gotcha: 'x in list membership check inside loop',
    consequence: 'O(N) linear search per check -> turns algorithm quadratic O(N²).',
    fix: 'Convert list to set: seen = set(items); if x in seen: # O(1)',
    category: 'Complexity',
  },
  {
    id: 3,
    gotcha: 'String concatenation s += char in a loop',
    consequence: 'Strings are immutable in Python; creates a new string copy each iteration -> O(N²).',
    fix: 'chars = []; chars.append(c); return "".join(chars) # O(N)',
    category: 'Complexity',
  },
  {
    id: 4,
    gotcha: 'Negative integer division: -7 // 2 == -4',
    consequence: 'Python floors toward negative infinity; mid = (lo + hi) // 2 can behave differently with negatives.',
    fix: 'Use int(a / b) when truncating toward zero, or mid = lo + (hi - lo) // 2',
    category: 'Semantics',
  },
  {
    id: 5,
    gotcha: 'Mutable default argument: def f(path=[])',
    consequence: 'The list is instantiated ONCE at function definition time; calls share mutated state!',
    fix: 'def f(path=None): if path is None: path = []',
    category: 'Semantics',
  },
  {
    id: 6,
    gotcha: 'Matrix initialization: [[0] * n] * m',
    consequence: 'Every row points to the SAME list in memory! Mutating grid[0][0] alters grid[1][0] too!',
    fix: 'grid = [[0] * n for _ in range(m)] # Independent rows',
    category: 'Types & Memory',
  },
  {
    id: 7,
    gotcha: 'heapq is strictly a MIN-heap',
    consequence: 'Writing heapq.heappop expecting maximum will silently fail your logic.',
    fix: 'Negate numbers: heapq.heappush(max_h, -val); max_val = -heapq.heappop(max_h)',
    category: 'Recursion & Heap',
  },
  {
    id: 8,
    gotcha: 'Recursion depth limit on deep trees/graphs',
    consequence: 'Python default recursion limit is 1000; skewed trees trigger RecursionError.',
    fix: 'import sys; sys.setrecursionlimit(200_000) or convert to iterative DFS with stack',
    category: 'Recursion & Heap',
  },
  {
    id: 9,
    gotcha: 'Tuple priority queue collisions with dicts',
    consequence: 'heappush(pq, (dist, node)) crashes with TypeError if dists tie and node is unhashable or non-comparable.',
    fix: 'Insert an auto-incrementing tiebreaker counter: (dist, count, node)',
    category: 'Recursion & Heap',
  },
  {
    id: 10,
    gotcha: 'b = a creates aliasing, NOT a copy',
    consequence: 'Mutating b mutates a in parent callers or backtracking states.',
    fix: 'b = a[:] (shallow) or import copy; b = copy.deepcopy(a)',
    category: 'Types & Memory',
  },
  {
    id: 11,
    gotcha: 'Comparing None with == instead of is',
    consequence: 'Triggers __eq__ operator if custom class implements it; slower and unidiomatic.',
    fix: 'Always use: if node is None: or if node is not None:',
    category: 'Semantics',
  },
  {
    id: 12,
    gotcha: 'Sort mutation: nums.sort() returns None',
    consequence: 'Writing return nums.sort() returns None to the grader and triggers wrong answer.',
    fix: 'nums.sort(); return nums (in-place) OR return sorted(nums) (new list)',
    category: 'Semantics',
  },
];

const LANGUAGE_EQUIVALENTS = [
  { concept: 'Dynamic Array', python: 'list', cpp: 'std::vector<T>', java: 'ArrayList<T>' },
  { concept: 'Hash Map', python: 'dict', cpp: 'std::unordered_map<K, V>', java: 'HashMap<K, V>' },
  { concept: 'Hash Set', python: 'set', cpp: 'std::unordered_set<T>', java: 'HashSet<T>' },
  { concept: 'Min Priority Queue', python: 'heapq', cpp: 'std::priority_queue (greater)', java: 'PriorityQueue<T>()' },
  { concept: 'Double-Ended Queue', python: 'collections.deque', cpp: 'std::deque<T>', java: 'ArrayDeque<T>' },
  { concept: 'Binary Search (Lower Bound)', python: 'bisect.bisect_left', cpp: 'std::lower_bound', java: 'Arrays.binarySearch' },
  { concept: 'Ordered Map (Tree)', python: 'from sortedcontainers import SortedDict', cpp: 'std::map<K, V>', java: 'TreeMap<K, V>' },
  { concept: 'Frequency Counter', python: 'collections.Counter', cpp: 'unordered_map loop', java: 'map.merge(k, 1, Integer::sum)' },
];

export const DsaCheatsheetsPage: React.FC<DsaCheatsheetsPageProps> = ({ data }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [gotchaCategory, setGotchaCategory] = useState<string>('All');
  const [expandedGotchas, setExpandedGotchas] = useState<Record<number, boolean>>({ 1: true, 6: true, 7: true });

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleGotcha = (id: number) => {
    setExpandedGotchas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredGotchas = gotchaCategory === 'All'
    ? PYTHON_GOTCHAS
    : PYTHON_GOTCHAS.filter((g) => g.category === gotchaCategory);

  return (
    <main id="main" className="min-h-screen pb-20 bg-[#fcfcfd]">
      {/* ───────────────── TOP BANNER ───────────────── */}
      <section className="border-b border-slate-200/80 bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-4">
          <Link
            to="/dsa"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to DSA 100-Day Roadmap</span>
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-0.5 text-xs font-semibold text-emerald-800">
                <FileText className="h-3.5 w-3.5 text-emerald-600" />
                <span>Reference Hub · Part 07</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-2">
                Complexity &amp; Interview Cheatsheets
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-3xl">
                The authoritative Big-O reference tables · Constraint-to-Complexity rules · 12 Python interview speed gotchas · Multi-language equivalents.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-mono-code text-slate-700">
              <span className="font-bold text-emerald-700">8</span> Data Structures
              <span className="text-slate-300">•</span>
              <span className="font-bold text-sky-700">14</span> Algorithms
              <span className="text-slate-300">•</span>
              <span className="font-bold text-amber-700">12</span> Python Gotchas
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-12">
        {/* ───────────────── SECTION 1: CONSTRAINT TO COMPLEXITY RULE ───────────────── */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 font-bold font-mono-code text-xs">
                #1
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-slate-900">
                  Input Constraints dictate Target Complexity
                </h2>
                <p className="text-xs text-slate-500">
                  State the target complexity out loud the moment the interviewer reads constraints ($N$).
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono-code font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
              High-Signal Interview Strategy
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 font-mono-code uppercase tracking-wider text-slate-600 text-[11px]">
                <tr>
                  <th className="px-4 py-2.5 w-28">Constraint (N)</th>
                  <th className="px-4 py-2.5 w-44">Target Complexity</th>
                  <th className="px-4 py-2.5">Typical Algorithmic Approach</th>
                  <th className="px-4 py-2.5">Canonical LeetCode Problems</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                {CONSTRAINT_RULES.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50/70 font-mono-code text-xs">
                    <td className="px-4 py-3 font-bold text-emerald-800">{c.n}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">{c.complexity}</td>
                    <td className="px-4 py-3 font-sans text-slate-700">{c.typicalApproach}</td>
                    <td className="px-4 py-3 font-sans text-slate-500 text-[12px]">{c.interviewCue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ───────────────── SECTION 2: DATA STRUCTURE COMPLEXITIES ───────────────── */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-800 font-bold font-mono-code text-xs">
              #2
            </span>
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                Data Structure Operations Complexity Reference
              </h2>
              <p className="text-xs text-slate-500">
                Access, search, insert, and delete boundaries across standard containers.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 font-mono-code uppercase tracking-wider text-slate-600 text-[11px]">
                <tr>
                  <th className="px-4 py-2.5">Data Structure</th>
                  <th className="px-3 py-2.5 w-24">Access</th>
                  <th className="px-3 py-2.5 w-24">Search</th>
                  <th className="px-4 py-2.5 w-36">Insert</th>
                  <th className="px-3 py-2.5 w-28">Delete</th>
                  <th className="px-4 py-2.5">Architectural Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                {DS_COMPLEXITIES.map((ds, i) => (
                  <tr key={i} className="hover:bg-slate-50/70 text-xs">
                    <td className="px-4 py-3 font-bold text-slate-900 font-mono-code">{ds.name}</td>
                    <td className="px-3 py-3 font-mono-code text-slate-700">{ds.access}</td>
                    <td className="px-3 py-3 font-mono-code text-slate-700">{ds.search}</td>
                    <td className="px-4 py-3 font-mono-code text-slate-700">{ds.insert}</td>
                    <td className="px-3 py-3 font-mono-code text-slate-700">{ds.delete}</td>
                    <td className="px-4 py-3 text-slate-500">{ds.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ───────────────── SECTION 3: CORE ALGORITHMS COMPLEXITY ───────────────── */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-800 font-bold font-mono-code text-xs">
              #3
            </span>
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                Standard Algorithms Complexity &amp; Use Cases
              </h2>
              <p className="text-xs text-slate-500">
                Time, auxiliary space, and exact conditions to recommend each algorithm.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 font-mono-code uppercase tracking-wider text-slate-600 text-[11px]">
                <tr>
                  <th className="px-4 py-2.5">Algorithm</th>
                  <th className="px-4 py-2.5 w-36">Time Complexity</th>
                  <th className="px-3 py-2.5 w-28">Space</th>
                  <th className="px-4 py-2.5">When to Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                {ALGO_COMPLEXITIES.map((algo, i) => (
                  <tr key={i} className="hover:bg-slate-50/70 text-xs">
                    <td className="px-4 py-3 font-bold text-slate-900 font-mono-code">{algo.name}</td>
                    <td className="px-4 py-3 font-mono-code text-slate-800 font-semibold">{algo.time}</td>
                    <td className="px-3 py-3 font-mono-code text-slate-600">{algo.space}</td>
                    <td className="px-4 py-3 text-slate-600">{algo.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ───────────────── SECTION 4: PYTHON GOTCHAS AT INTERVIEW SPEED ───────────────── */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                12 Python Gotchas at Interview Speed
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Subtle performance traps, memory leaks, and runtime semantics that cost candidates offers.
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              {['All', 'Complexity', 'Semantics', 'Recursion & Heap', 'Types & Memory'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setGotchaCategory(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    gotchaCategory === c
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGotchas.map((g) => {
              const isExpanded = !!expandedGotchas[g.id];

              return (
                <div
                  key={g.id}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-slate-300 transition"
                >
                  <div className="p-4 sm:p-5 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 text-rose-800 font-mono-code text-xs font-bold shrink-0 mt-0.5">
                        !{g.id}
                      </span>
                      <div>
                        <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-rose-600">
                          {g.category}
                        </span>
                        <h4 className="font-display text-sm sm:text-base font-bold text-slate-900 leading-snug">
                          {g.gotcha}
                        </h4>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleGotcha(g.id)}
                      className="p-1 text-slate-400 hover:text-slate-600 transition"
                    >
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 space-y-3 text-xs">
                      <div className="p-2.5 rounded-lg bg-rose-50/70 border border-rose-200 text-rose-900 leading-relaxed">
                        <strong className="font-semibold text-rose-950">Consequence: </strong>
                        {g.consequence}
                      </div>

                      <div className="p-3 rounded-xl bg-slate-900 text-emerald-300 font-mono-code text-[11.5px] overflow-x-auto leading-relaxed flex items-center justify-between gap-2">
                        <span>{g.fix}</span>
                        <button
                          type="button"
                          onClick={() => copyCode(g.fix, `gotcha-${g.id}`)}
                          className="shrink-0 text-slate-400 hover:text-white transition"
                        >
                          {copiedId === `gotcha-${g.id}` ? (
                            <CheckCheck className="h-3.5 w-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ───────────────── SECTION 5: MULTI-LANGUAGE EQUIVALENTS ───────────────── */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-800 font-bold font-mono-code text-xs">
              #5
            </span>
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                Multi-Language STL &amp; Collections Matrix
              </h2>
              <p className="text-xs text-slate-500">
                Moving between Python, C++, and Java containers under interview speed.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm font-mono-code">
              <thead className="bg-slate-50 uppercase tracking-wider text-slate-600 text-[11px]">
                <tr>
                  <th className="px-4 py-2.5">Concept</th>
                  <th className="px-4 py-2.5 text-emerald-800">Python 3</th>
                  <th className="px-4 py-2.5 text-sky-800">C++ (STL)</th>
                  <th className="px-4 py-2.5 text-amber-800">Java (util)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700 text-xs">
                {LANGUAGE_EQUIVALENTS.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/70">
                    <td className="px-4 py-2.5 font-bold font-sans text-slate-900">{row.concept}</td>
                    <td className="px-4 py-2.5 text-emerald-700 font-semibold">{row.python}</td>
                    <td className="px-4 py-2.5 text-sky-700 font-semibold">{row.cpp}</td>
                    <td className="px-4 py-2.5 text-amber-700 font-semibold">{row.java}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};
