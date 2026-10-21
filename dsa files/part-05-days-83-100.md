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

| Set type | Format | Purpose | Curated problem set |
|---|---|---|---|
| **A · Pattern set** | 3 problems, 60 min | Speed within a known shape | 1. Longest Substring Without Repeating (15m) · 2. 3Sum (20m) · 3. Minimum Window Substring (25m) |
| **B · Mixed set** | 2 problems, 45 min | Recognition under uncertainty | 1. Course Schedule II (20m) · 2. Lowest Common Ancestor of Binary Tree (25m) |
| **C · Hard set** | 1 problem, 45 min | Depth, recovery & narration | Trapping Rain Water or Alien Dictionary (45m) |
| **D · Blind set** | 2 problems, 45 min | Real screen conditions | 1. Word Break (20m) · 2. Clone Graph (25m) |

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

### The six low-level designs to master

#### 1 · Rate Limiter (Token Bucket & Sliding Window)

- **Requirements:** Limit user requests to $C$ requests per second/minute. Return HTTP 429 when exceeded. Must be thread-safe for high concurrency.
- **Entities:** `TokenBucket`, `RateLimiterService`, `RateLimitRule`.
- **Patterns:** Strategy Pattern (interchangeable Token Bucket vs Sliding Window Log), Factory Pattern for rule configuration.
- **Concurrency:** `threading.Lock()` per user bucket to prevent race conditions during token replenishment.

```python
import time
import threading

class TokenBucket:
    def __init__(self, capacity: int, refill_rate: float):
        self.capacity = capacity
        self.refill_rate = refill_rate  # tokens per second
        self.tokens = capacity
        self.last_refill = time.time()
        self.lock = threading.Lock()

    def allow_request(self, tokens_needed: int = 1) -> bool:
        with self.lock:
            now = time.time()
            elapsed = now - self.last_refill
            self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_rate)
            self.last_refill = now
            if self.tokens >= tokens_needed:
                self.tokens -= tokens_needed
                return True
            return False
```

#### 2 · LRU / LFU Cache

- **Requirements:** $O(1)$ `get(key)` and $O(1)$ `put(key, value)`. When capacity is reached, evict the least recently used (LRU) or least frequently used (LFU) item.
- **Entities:** `Node` (key, val, freq, prev, next), `DoublyLinkedList`, `LRUCache`.
- **Patterns:** Sentinel pattern (dummy head & tail to eliminate null pointer checks).

```python
class DNode:
    def __init__(self, k=0, v=0):
        self.k, self.v = k, v
        self.prev = self.next = None

class LRUCache:
    def __init__(self, cap: int):
        self.cap, self.map = cap, {}
        self.head, self.tail = DNode(), DNode()
        self.head.next, self.tail.prev = self.tail, self.head

    def _remove(self, n):
        n.prev.next, n.next.prev = n.next, n.prev

    def _insert_front(self, n):
        n.next, n.prev = self.head.next, self.head
        self.head.next.prev = n
        self.head.next = n

    def get(self, k: int) -> int:
        if k not in self.map: return -1
        n = self.map[k]
        self._remove(n); self._insert_front(n)
        return n.v

    def put(self, k: int, v: int) -> None:
        if k in self.map: self._remove(self.map[k])
        n = DNode(k, v)
        self.map[k] = n; self._insert_front(n)
        if len(self.map) > self.cap:
            lru = self.tail.prev
            self._remove(lru); del self.map[lru.k]
```

#### 3 · Multi-Floor Parking Lot

- **Requirements:** Multiple floors with spots for Motorcycles, Compact Cars, and Large Trucks. Assign nearest spot upon entry. Compute fee based on vehicle type and duration.
- **Entities:** `Vehicle` (`Motorcycle`, `Car`, `Truck`), `ParkingSpot` (`Compact`, `Large`, `Handicapped`), `ParkingFloor`, `ParkingLot`, `Ticket`.
- **Patterns:** Strategy Pattern for parking fee calculation (`FlatRateStrategy`, `HourlyRateStrategy`), Singleton Pattern for `ParkingLot` management instance.

```python
from enum import Enum
import time

class VehicleType(Enum):
    MOTORCYCLE = 1
    CAR = 2
    TRUCK = 3

class ParkingSpot:
    def __init__(self, spot_id: str, spot_type: VehicleType, floor: int):
        self.spot_id = spot_id
        self.spot_type = spot_type
        self.floor = floor
        self.is_occupied = False
        self.vehicle = None

    def assign(self, vehicle):
        self.is_occupied = True
        self.vehicle = vehicle

    def vacate(self):
        self.is_occupied = False
        self.vehicle = None

class Ticket:
    def __init__(self, ticket_id: str, spot: ParkingSpot, vehicle):
        self.ticket_id = ticket_id
        self.spot = spot
        self.vehicle = vehicle
        self.entry_time = time.time()
```

#### 4 · Elevator Controller System

- **Requirements:** Manage $N$ elevator cars in an $M$-floor building. Dispatch cars to service hall calls (up/down) and internal car destination calls with minimum wait time.
- **Entities:** `Elevator`, `Direction` (`UP`, `DOWN`, `IDLE`), `Request`, `ElevatorController`.
- **Patterns:** State Pattern for elevator movement transitions, LOOK/SCAN disk-scheduling heuristic (service all requests in current direction before reversing).

```python
from enum import Enum
import heapq

class Direction(Enum):
    UP = 1
    DOWN = -1
    IDLE = 0

class Elevator:
    def __init__(self, elevator_id: int):
        self.id = elevator_id
        self.current_floor = 0
        self.direction = Direction.IDLE
        self.up_stops = []      # min-heap
        self.down_stops = []    # max-heap (negated)

    def add_destination(self, floor: int):
        if floor > self.current_floor:
            heapq.heappush(self.up_stops, floor)
        elif floor < self.current_floor:
            heapq.heappush(self.down_stops, -floor)
```

#### 5 · Splitwise Expense Sharing Ledger

- **Requirements:** Users add expenses shared across a group. Support splits: Equal, Exact amounts, or Percentages. Simplify debts so minimal transactions settle balances.
- **Entities:** `User`, `Expense`, `Split` (`EqualSplit`, `ExactSplit`, `PercentSplit`), `ExpenseManager`.
- **Algorithm:** Minimum Cash Flow problem (Greedy / Max-Heap + Min-Heap matching largest debtor with largest creditor).

```python
class User:
    def __init__(self, user_id: str, name: str):
        self.id = user_id
        self.name = name

class ExpenseManager:
    def __init__(self):
        # balance_sheet[u1][u2] = amount u1 owes u2
        self.balances = {}

    def add_expense(self, paid_by: str, amount: float, splits: dict[str, float]):
        for user_id, share in splits.items():
            if user_id == paid_by: continue
            self.balances.setdefault(user_id, {})
            self.balances[user_id][paid_by] = self.balances[user_id].get(paid_by, 0.0) + share
```

#### 6 · Chess / Board Game System

- **Requirements:** 2-player turn-based board. 8x8 grid. Move validation per piece (King, Queen, Rook, Bishop, Knight, Pawn). Check / Checkmate detection.
- **Entities:** `Piece` (abstract `can_move`), `Board`, `Move`, `Player`, `GameStatus` (`ACTIVE`, `CHECK`, `CHECKMATE`, `STALEMATE`), `Game`.
- **Patterns:** Command Pattern for moves (enables undo/replay), Observer Pattern for notifying check/checkmate events.

```python
class Piece:
    def __init__(self, color: str):
        self.color = color  # 'white' or 'black'

    def is_valid_move(self, board, start, end) -> bool:
        raise NotImplementedError

class Board:
    def __init__(self):
        self.grid = [[None for _ in range(8)] for _ in range(8)]
        self._initialize_pieces()

    def _initialize_pieces(self):
        # Place standard 32 pieces
        pass

    def move_piece(self, start: tuple, end: tuple) -> bool:
        sr, sc = start
        piece = self.grid[sr][sc]
        if piece and piece.is_valid_move(self, start, end):
            self.grid[end[0]][end[1]] = piece
            self.grid[sr][sc] = None
            return True
        return False
```

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

| Round | Focus & Curated Challenge | Target Behavior & Pass Standard | Score (1-5) |
|---|---|---|---|
| **1 · Coding** | *LRU Cache* or *Number of Islands* (Medium) | State complexity in first 3 min; continuous narration; zero syntax errors | 4 / 5 |
| **2 · Coding + Twist** | *Course Schedule II* with twist: "print all cycle nodes if impossible" | Smooth recovery when twist introduced; explain invariant changes out loud | 4 / 5 |
| **3 · Specialist** | **SDE:** LLD *Rate Limiter* / *Parking Lot* · **ML:** *k-means from scratch* or *RecSys Design* | State trade-offs before choosing architecture; handle concurrency and latency SLOs | 4 / 5 |
| **4 · Behavioural** | 3 STAR stories (*Technical challenge*, *Failure*, *Disagreement*) | Strict 90s limit per story; specific first-person action; quantifiable business result | 4 / 5 |

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
