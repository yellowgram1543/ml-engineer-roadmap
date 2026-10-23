import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  Database,
  Network,
  Layers,
  Search,
  ArrowLeft,
  Copy,
  CheckCheck,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Server,
  HardDrive,
  Terminal,
  HelpCircle,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  Radio,
  BookOpen,
} from 'lucide-react';
import { DsaRoadmapData } from '../types/dsaRoadmap';

interface DsaCsFundamentalsPageProps {
  data: DsaRoadmapData;
}

interface CsTopic {
  id: string;
  category: 'Operating Systems' | 'Databases & Storage' | 'Networking & Protocols';
  title: string;
  question: string;
  verbalAnswer: string;
  inDepthAnalysis: string[];
  interviewerTrap: string;
  tradeoffOrMetric: string;
}

const CS_TOPICS: CsTopic[] = [
  // ──────────────────────────── OPERATING SYSTEMS ────────────────────────────
  {
    id: 'os-1',
    category: 'Operating Systems',
    title: 'Process vs. Thread',
    question: 'What is the fundamental difference between a process and a thread, and what are the context switch costs?',
    verbalAnswer:
      'A process is an isolated execution environment with its own dedicated virtual address space, file descriptors, and memory mappings. A thread is the smallest schedulable unit of CPU execution inside a process that shares the address space, heap, and open handles with other threads in the same process, but retains its own private stack and CPU registers.',
    inDepthAnalysis: [
      'Memory Isolation: Processes do not share memory by default; IPC (pipes, sockets, shared memory) requires explicit kernel coordination. Threads share heap, static data, and global variables directly.',
      'Context Switch Cost: A process context switch is expensive because it requires saving/restoring CPU registers, swapping the page table base pointer (CR3 register on x86), which invalidates the Translation Lookaside Buffer (TLB) and triggers cache misses. A thread context switch only swaps registers and stack pointer without flushing the TLB.',
      'Crash Blast Radius: If a thread faults (e.g. segfault / illegal memory access), the entire host process terminates. A crashing process is isolated and does not corrupt sibling processes.',
    ],
    interviewerTrap:
      'Candidates often forget that threads have their own private stacks and register files, assuming "threads share everything".',
    tradeoffOrMetric:
      'Measure: Context switch CPU time via `perf` / `pidstat -w`. Process switch ≈ 1–3 µs; Thread switch ≈ 100–300 ns.',
  },
  {
    id: 'os-2',
    category: 'Operating Systems',
    title: 'Deadlock: The 4 Coffman Conditions & Prevention',
    question: 'What four conditions must simultaneously hold for a deadlock to occur, and how do you prevent them?',
    verbalAnswer:
      'Deadlock occurs if and only if four Coffman conditions are present simultaneously: (1) Mutual Exclusion, (2) Hold and Wait, (3) No Preemption, and (4) Circular Wait. Breaking any one single condition prevents deadlock entirely.',
    inDepthAnalysis: [
      '1. Mutual Exclusion: At least one resource must be held in a non-shareable mode. (Hard to break for hardware or exclusive write locks).',
      '2. Hold & Wait: A process holds at least one resource and waits to acquire another currently held by a peer. Prevent by requiring processes to acquire all needed resources atomically upfront.',
      '3. No Preemption: Resources cannot be forcibly revoked; they must be released voluntarily. Prevent by implementing timeout-based acquisition (e.g. `pthread_mutex_trylock` or Go channels with timeouts) and rolling back on failure.',
      '4. Circular Wait: A closed chain of processes exists where each holds a resource needed by the next. THE GOLD STANDARD FIX: Impose a global total order on all locks (e.g. Lock A must always be acquired before Lock B across the entire codebase).',
    ],
    interviewerTrap:
      'Assuming "deadlock detection" is the same as "deadlock prevention". Prevention makes deadlock mathematically impossible by design (lock ordering); detection allows it to happen and rolls back transactions.',
    tradeoffOrMetric:
      'Rule: In production systems, global lock ordering eliminates 95% of concurrency deadlocks without runtime overhead.',
  },
  {
    id: 'os-3',
    category: 'Operating Systems',
    title: 'Virtual Memory, Page Tables & Thrashing',
    question: 'Why do operating systems use virtual memory, and what happens during a page fault and thrashing?',
    verbalAnswer:
      'Virtual memory provides hardware-enforced memory protection, process isolation, and the illusion of contiguous, unbounded memory by abstracting physical RAM into fixed-size pages (typically 4 KB). When a thread accesses a virtual address whose page is not in physical RAM, the MMU triggers a hardware interrupt called a Page Fault, causing the OS kernel to load the page from disk into RAM.',
    inDepthAnalysis: [
      'Address Translation: The Memory Management Unit (MMU) walks a multi-level page table to translate Virtual Addresses to Physical Addresses. The Translation Lookaside Buffer (TLB) caches recent translations to avoid repeated RAM walks.',
      'Minor vs. Major Page Fault: Minor fault means the page is already in RAM (e.g. shared library or newly allocated zero-page) and only needs page table mapping. Major fault requires synchronous disk I/O to fetch page bytes.',
      'Thrashing: Occurs when the cumulative working sets of active processes exceed total physical RAM. The OS spends 90%+ of CPU cycles swapping pages in and out of disk rather than executing user code.',
    ],
    interviewerTrap:
      'Failing to recognize that high CPU utilization in `top` could actually be high `%system` / `%wa` (I/O wait) caused by page thrashing rather than business computation.',
    tradeoffOrMetric:
      'Measure: `vmstat 1` and inspect `si` (swap in) and `so` (swap out). If `so > 0` persistently, the system is thrashing.',
  },
  {
    id: 'os-4',
    category: 'Operating Systems',
    title: 'Concurrency Primitives: Mutex vs. Spinlock vs. Semaphore',
    question: 'How do Mutexes, Spinlocks, and Semaphores differ under the hood, and when do you choose each?',
    verbalAnswer:
      'A Mutex is an ownership-based mutual exclusion lock that puts waiting threads to sleep via OS scheduling. A Spinlock busy-waits in a tight CPU loop without yielding. A Semaphore is a thread-safe atomic counter used for resource pools (counting) or signaling across threads.',
    inDepthAnalysis: [
      'Mutex (Sleeping Lock): When contention occurs, the thread transitions to `TASK_INTERRUPTIBLE`/blocked and yields the CPU. In Linux, modern `futex` (fast userspace mutex) attempts an atomic CAS in userspace first; it only calls the kernel if locked.',
      'Spinlock (Busy-Wait): Burns CPU clock cycles waiting for the lock. Use strictly when the expected hold time is shorter than the cost of two context switches (usually < 1 µs), typically inside OS kernel interrupt handlers where threads cannot sleep.',
      'Semaphore (Counting & Signaling): `sem_wait()` decrements counter; blocks if 0. `sem_post()` increments counter and wakes waiting thread. Unlike a mutex, a semaphore does not have an owner: Thread A can wait and Thread B can post (ideal for producer-consumer queues).',
    ],
    interviewerTrap:
      'Using a spinlock in single-core VMs or userspace code with preemptive scheduling: the spinning thread starves the lock holder from getting CPU time to release it!',
    tradeoffOrMetric:
      'Rule: Always default to Mutex in userspace. Use Counting Semaphore for connection pools (e.g. max 50 concurrent DB connections).',
  },
  {
    id: 'os-5',
    category: 'Operating Systems',
    title: 'User vs. Kernel Mode & System Call Lifecycle',
    question: 'What happens physically when your code calls read() on a socket or file?',
    verbalAnswer:
      'User mode (Ring 3) restricts hardware access to protect the machine; Kernel mode (Ring 0) has unrestricted hardware access. Calling read() initiates a System Call: it puts arguments into CPU registers, triggers a software trap or syscall instruction, switches the CPU privilege level to Ring 0, switches to the kernel stack, executes the sys_read handler, and returns back to Ring 3.',
    inDepthAnalysis: [
      'Privilege Rings: x86 architecture defines Ring 0 (kernel) and Ring 3 (user). Ring 3 cannot execute privileged instructions (like disabling interrupts, modifying page tables, or writing to raw hardware ports).',
      'Syscall Transition: The CPU hardware saves user `RIP` (program counter) and flags, switches `RSP` to the kernel stack, and jumps to the kernel syscall entry vector.',
      'Copy-on-Write (COW): When `fork()` is called, the OS does not copy RAM. It duplicates page tables with read-only flags. When either process writes to a page, a page fault triggers the OS to duplicate only that 4 KB page.',
    ],
    interviewerTrap:
      'Believing system calls are slow because of the `syscall` instruction itself: the CPU switch takes ~50–100 ns. The real cost is data copying across user-kernel boundary and cache pollution.',
    tradeoffOrMetric:
      'Optimization: Zero-copy system calls like `sendfile()` or `io_uring` bypass user-space memory buffers completely.',
  },

  // ──────────────────────────── DATABASES & STORAGE ────────────────────────────
  {
    id: 'db-1',
    category: 'Databases & Storage',
    title: 'ACID Demystified & Recovery Mechanisms',
    question: 'What does each letter in ACID actually mean, and what concrete engine subsystem implements it?',
    verbalAnswer:
      'ACID guarantees transactional reliability: Atomicity (all-or-nothing, via Undo Logs), Consistency (schema & business invariants), Isolation (concurrency anomalies prevention, via Locks & MVCC), and Durability (committed data survives crashes, via Write-Ahead Logging & fsync).',
    inDepthAnalysis: [
      'Atomicity: Either every statement commits or the database rolls back to the initial state. Implemented via Undo Logs in storage engines (like InnoDB) which store before-images of modified pages.',
      'Consistency: Transactions transition the database from one valid state to another, enforcing constraints (Foreign Keys, Unique, Check constraints, NOT NULL).',
      'Isolation: Determines how concurrent transactions see each other modifications. Implemented via 2-Phase Locking (2PL) and Multi-Version Concurrency Control (MVCC).',
      'Durability: Once a transaction commits, its modifications are permanently recorded even if power cuts immediately. Implemented via the Write-Ahead Log (WAL / Redo Log) which must be flushed to disk via `fsync` before reporting commit success.',
    ],
    interviewerTrap:
      'Confusing consistency in ACID (application invariants & constraints) with consistency in CAP theorem (all nodes seeing identical data at the exact same instant). They are completely different concepts!',
    tradeoffOrMetric:
      'Performance Tradeoff: Setting `innodb_flush_log_at_trx_commit = 1` guarantees strict durability (1 fsync per commit) but caps write throughput at disk IOPS limit.',
  },
  {
    id: 'db-2',
    category: 'Databases & Storage',
    title: 'The 4 Isolation Levels & Concurrency Anomalies',
    question: 'Explain Dirty Reads, Non-Repeatable Reads, and Phantom Reads across the 4 ANSI SQL isolation levels.',
    verbalAnswer:
      'The 4 isolation levels trade concurrency throughput for correctness guarantees: Read Uncommitted (allows dirty reads), Read Committed (prevents dirty reads), Repeatable Read (prevents non-repeatable reads), and Serializable (prevents all anomalies including phantom reads).',
    inDepthAnalysis: [
      'Dirty Read: Transaction T1 modifies a row without committing; Transaction T2 reads the uncommitted value. If T1 rolls back, T2 operated on phantom fiction.',
      'Non-Repeatable Read (Fuzzy Read): T1 reads row X. T2 updates row X and commits. T1 reads row X again and sees different values inside the same transaction.',
      'Phantom Read: T1 executes a range query (e.g. `WHERE age > 30`, returns 5 rows). T2 inserts a 6th row with `age = 35` and commits. T1 re-executes the same query and sees 6 rows.',
      'How MVCC Solves It: Modern engines (PostgreSQL, MySQL InnoDB) implement Repeatable Read using Multi-Version Concurrency Control (MVCC). Every row has hidden creation and deletion transaction IDs (`xmin`/`xmax`). A transaction reads from an immutable snapshot created at its start timestamp—reads never block writes, and writes never block reads!',
    ],
    interviewerTrap:
      'Believing Repeatable Read prevents all concurrency bugs: Repeatable Read does NOT prevent Write Skew in snapshot isolation (e.g. two doctors simultaneously going off-call because neither sees the other transaction commit). True prevention requires Serializable isolation.',
    tradeoffOrMetric:
      'Defaults: PostgreSQL and SQL Server default to Read Committed. MySQL InnoDB defaults to Repeatable Read.',
  },
  {
    id: 'db-3',
    category: 'Databases & Storage',
    title: 'B+ Trees vs. LSM Trees & Index Architecture',
    question: 'Why are B+ Trees preferred for RDBMS, while LSM Trees are used in write-heavy storage (Cassandra, RocksDB)?',
    verbalAnswer:
      'A B+ Tree stores all data in linked leaf pages with high fanout branch nodes, optimizing for fast read latencies (O(log_B N)) and efficient sequential range scans. An LSM Tree (Log-Structured Merge-tree) buffers writes in memory (MemTable) and appends sequentially to immutable disk files (SSTables), providing 10x higher write throughput at the cost of read amplification and background compaction overhead.',
    inDepthAnalysis: [
      'B+ Tree Fanout: A typical node page is 8–16 KB. If a key-pointer entry is 32 bytes, fanout is ~500. A 3-level B+ tree can index 500³ = 125 million rows with only 3 disk seeks!',
      'Why Leaf Linked List: Leaves are connected by bidirectional pointers. Once the first element of a range (`WHERE date BETWEEN A AND B`) is found, subsequent rows are read linearly without traversing tree roots.',
      'LSM Tree Architecture: Writes go to an in-memory MemTable (skip list) and sequential WAL. When full, MemTable flushes as an immutable SSTable on disk. Periodic background Compaction merges sorted SSTables and purges deleted rows (tombstones).',
      'The Tradeoff Matrix: B+ Trees optimize for point and range reads; random writes require in-place page splits (random I/O). LSM Trees turn random writes into sequential writes, but point reads must check Bloom filters across multiple SSTable layers.',
    ],
    interviewerTrap:
      'Claiming a Hash Index is better for general indexing: Hash Indexes offer O(1) point lookups but CANNOT perform range queries (`>`, `<`, `BETWEEN`) or sorting (`ORDER BY`) because hashing destroys lexical order.',
    tradeoffOrMetric:
      'Metric: Write Amplification Factor (WAF). B+ Tree WAF can exceed 30x on random updates; LSM Tree WAF is lower for bursts but incurs compaction I/O.',
  },
  {
    id: 'db-4',
    category: 'Databases & Storage',
    title: 'Composite Indexes & The Leftmost Prefix Rule',
    question: 'How does an index on (A, B, C) behave for queries on (B), (A, C), and (A, B > 5, C)?',
    verbalAnswer:
      'A composite index on (A, B, C) orders data lexicographically: first by A, then by B within identical values of A, then by C within identical pairs of (A, B). Under the Leftmost Prefix Rule, queries can only utilize the index if they filter on a contiguous leading subset of columns starting from column A.',
    inDepthAnalysis: [
      'Query on WHERE B = 10: CANNOT use the index efficiently! Because B is scattered across different values of A, the engine must perform a full index scan or full table scan.',
      'Query on WHERE A = 5 AND C = 20: Uses index to seek A = 5. Column C cannot be used for the B-tree seek, but modern engines use Index Condition Pushdown (ICP) to filter C in the storage engine before reading table heap.',
      'Query on WHERE A = 5 AND B > 10 AND C = 20: Uses index seek for A = 5 and the range on B. Once an inequality/range operator (`>`, `<`, `BETWEEN`) is encountered on column B, subsequent columns (C) CANNOT be used for B-tree index seeking!',
    ],
    interviewerTrap:
      'Creating redundant indexes: An index on `(A, B)` makes a standalone index on `(A)` completely redundant! However, an index on `(B)` is still needed if queries filter solely on B.',
    tradeoffOrMetric:
      'Design Rule: Order composite index columns by: (1) Equality columns first, (2) Range/inequality columns next, (3) Sort/ORDER BY columns last.',
  },
  {
    id: 'db-5',
    category: 'Databases & Storage',
    title: 'The N+1 Query Problem & ORM Hazards',
    question: 'What is the N+1 query problem, and how do you eliminate it in high-throughput APIs?',
    verbalAnswer:
      'The N+1 problem occurs when an application executes 1 query to fetch N parent records, and then executes N separate individual queries to fetch child data for each parent in a loop (total 1 + N database roundtrips). It is solved by eager loading with an SQL JOIN or a single batched IN clause.',
    inDepthAnalysis: [
      'The Anti-Pattern: `SELECT * FROM users LIMIT 100` (1 query). Then for each user in loop: `SELECT * FROM orders WHERE user_id = ?` (100 queries). Total = 101 network roundtrips.',
      'Solution 1: INNER / LEFT JOIN: `SELECT * FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE ...` (1 single query, but increases payload size due to duplicated user columns across order rows).',
      'Solution 2: Batched IN Query: `SELECT * FROM users LIMIT 100` followed by `SELECT * FROM orders WHERE user_id IN (1, 2, 3... 100)`. Application stitches parents and children in memory in O(N) time.',
    ],
    interviewerTrap:
      'Failing to recognize network latency amplification: If database ping is 2 ms, 100 sequential queries add 200 ms of pure network wait time regardless of how fast the database CPU is!',
    tradeoffOrMetric:
      'Measure: Database query count per HTTP request. Enforce an alert threshold if any single API endpoint issues > 5 DB queries.',
  },

  // ──────────────────────────── NETWORKING & PROTOCOLS ────────────────────────────
  {
    id: 'net-1',
    category: 'Networking & Protocols',
    title: 'TCP vs. UDP: Transport Fundamentals & Handshakes',
    question: 'How do TCP and UDP differ at the protocol level, and what is the exact purpose of the TIME_WAIT state?',
    verbalAnswer:
      'TCP is a connection-oriented, reliable byte-stream protocol providing in-order delivery, flow control, and congestion control via sequence numbers and ACKs. UDP is a connectionless, lightweight datagram protocol with zero connection setup overhead, zero delivery guarantees, and minimal 8-byte header overhead.',
    inDepthAnalysis: [
      'TCP 3-Way Handshake: Client sends `SYN (seq=x)`. Server replies `SYN-ACK (seq=y, ack=x+1)`. Client sends `ACK (seq=x+1, ack=y+1)`. Data transmission begins.',
      'TCP 4-Way Teardown: Client sends `FIN`. Server replies `ACK`. Server sends `FIN`. Client replies `ACK` and enters `TIME_WAIT` state.',
      'Why TIME_WAIT Exists (2 × MSL = 60–120 seconds): (1) Ensures the final ACK was received by the peer; if lost, server re-transmits FIN and client can re-ACK. (2) Allows lingering delayed duplicate packets from old connections to expire in the internet fabric before port reuse.',
    ],
    interviewerTrap:
      'Thinking TIME_WAIT is a memory leak: on high-throughput microservices churning short-lived TCP connections, sockets in TIME_WAIT can exhaust ephemeral ports (port exhaustion). The fix is connection pooling / HTTP Keep-Alive, NOT disabling TIME_WAIT via SO_LINGER.',
    tradeoffOrMetric:
      'Header Size: UDP header is 8 bytes; TCP header is 20–60 bytes. UDP is ideal for DNS, VoIP, real-time gaming, and video streaming.',
  },
  {
    id: 'net-2',
    category: 'Networking & Protocols',
    title: 'HTTP Evolution: HTTP/1.1 vs. HTTP/2 vs. HTTP/3 (QUIC)',
    question: 'What bottlenecks in HTTP/1.1 did HTTP/2 solve, and why was HTTP/3 rebuilt on top of UDP?',
    verbalAnswer:
      'HTTP/1.1 suffered from Head-of-Line (HOL) blocking at the application layer because a TCP connection could only process one request-response cycle at a time. HTTP/2 solved this by multiplexing binary frames over a single TCP connection. However, HTTP/2 still suffered from TCP-level HOL blocking: if one packet dropped, all multiplexed streams stalled. HTTP/3 replaced TCP with QUIC over UDP, providing true independent stream multiplexing with zero TCP HOL blocking.',
    inDepthAnalysis: [
      'HTTP/1.1 Workarounds: Browsers opened 6 parallel TCP connections per domain and used CSS sprites and asset bundling to minimize request counts.',
      'HTTP/2 Breakthroughs: Binary framing (Headers frame, Data frame), full bidirectional multiplexing over 1 TCP connection, HPACK header compression, and Server Push.',
      'HTTP/3 / QUIC over UDP: Built by Google on UDP. Packet loss on stream 3 stalls ONLY stream 3; streams 1, 2, and 4 continue streaming uninterrupted! Also supports 0-RTT connection resumption and connection migration across IP changes (e.g. WiFi to 5G) via Connection IDs.',
    ],
    interviewerTrap:
      'Believing HTTP/2 is always faster than HTTP/1.1: on lossy mobile networks (2%+ packet loss), HTTP/2 performs WORSE than HTTP/1.1 because TCP-level packet loss freezes all concurrent streams on the shared connection!',
    tradeoffOrMetric:
      'Latency: TLS 1.3 + QUIC achieves connection establishment + encrypted data request in 1 RTT (or 0-RTT on repeat visits) vs. 3 RTTs in legacy HTTPS.',
  },
  {
    id: 'net-3',
    category: 'Networking & Protocols',
    title: 'Modern TLS 1.3 Handshake & Cryptography',
    question: 'How does TLS 1.3 establish an encrypted session in 1 round trip, and why is Perfect Forward Secrecy mandatory?',
    verbalAnswer:
      'TLS 1.3 secures communication in a single round-trip (1-RTT) by combining cryptographic parameter negotiation with key exchange. The client sends supported ciphers along with its ephemeral Diffie-Hellman key share in the ClientHello. The server responds with its key share and digital certificate, immediately enabling symmetric AES-GCM or ChaCha20 encryption.',
    inDepthAnalysis: [
      '1-RTT Handshake: Client sends `ClientHello + KeyShare_C`. Server sends `ServerHello + KeyShare_S + Certificate + Finished`. Both derive identical symmetric session key in 1 RTT!',
      'Asymmetric vs. Symmetric Role: Asymmetric cryptography (RSA / ECDSA certificates) is used solely to authenticate identity and prevent Man-In-The-Middle (MITM) attacks. Symmetric cryptography (AES-256-GCM) encrypts actual application data at gigabit speeds.',
      'Perfect Forward Secrecy (PFS): TLS 1.3 mandates Ephemeral Diffie-Hellman (ECDHE). Session keys are temporary and discarded after the connection. Even if an attacker steals the server private master key 5 years later, previously recorded traffic cannot be decrypted!',
    ],
    interviewerTrap:
      'Confusing encryption with authentication: Encryption prevents eavesdropping; Authentication (digital certificates verified against Certificate Authorities / CAs) prevents impersonation.',
    tradeoffOrMetric:
      'TLS 1.2 required 2 RTTs; TLS 1.3 cut latency by 50% to 1 RTT, and abolished insecure legacy ciphers (RC4, 3DES, static RSA).',
  },
  {
    id: 'net-4',
    category: 'Networking & Protocols',
    title: 'The Full DNS Resolution Journey',
    question: 'What happens from the millisecond you type "api.company.com" in a browser until an IP is returned?',
    verbalAnswer:
      'The browser performs hierarchical recursive DNS resolution: first checking local caches (Browser cache -> OS DNS cache -> router cache). If missed, it queries the Recursive DNS Resolver (e.g. ISP or 8.8.8.8), which queries Root Nameservers (`.`), then TLD Nameservers (`.com`), and finally the Authoritative Nameserver for `company.com` to retrieve the A/AAAA record.',
    inDepthAnalysis: [
      'Step 1: In-Memory Caches: Browser cache -> OS local cache -> hosts file (`/etc/hosts`).',
      'Step 2: Recursive Resolver: If un-cached, resolver queries 1 of 13 Root Server clusters (`.` root hints).',
      'Step 3: Root Nameserver: Directs resolver to `.com` TLD nameservers.',
      'Step 4: TLD Nameserver: Reads registry and delegates to `company.com` Authoritative nameserver (e.g. Route53 or Cloudflare).',
      'Step 5: Authoritative Nameserver: Returns the final record: A (IPv4), AAAA (IPv6), or CNAME (canonical alias) with a Time-To-Live (TTL). Resolver caches result and returns it to browser.',
    ],
    interviewerTrap:
      'Assuming DNS uses TCP: Standard DNS queries use UDP port 53 for speed and minimal overhead. DNS only falls back to TCP if the response payload exceeds 512 bytes (or EDNS0 4096 bytes), or during zone transfers.',
    tradeoffOrMetric:
      'TTL Tradeoff: Low TTL (60s) allows rapid failover during outages, but increases DNS query traffic. High TTL (86400s) maximizes caching but delays disaster recovery.',
  },
  {
    id: 'net-5',
    category: 'Networking & Protocols',
    title: 'Load Balancing: L4 (Transport) vs. L7 (Application)',
    question: 'How do Layer 4 and Layer 7 load balancers differ in routing capability, performance, and SSL termination?',
    verbalAnswer:
      'A Layer 4 load balancer operates at the transport layer (TCP/UDP), routing traffic based strictly on IP addresses and port numbers without inspecting packet payloads. A Layer 7 load balancer operates at the application layer (HTTP/HTTPS), parsing HTTP headers, cookies, URLs, and JSON bodies to make intelligent content-based routing decisions.',
    inDepthAnalysis: [
      'Layer 4 (e.g. AWS NLB, Linux IPVS, HAProxy TCP): Inspects only SYN packets. Routes raw TCP packets using NAT or Direct Server Return (DSR). Extremely high throughput (millions of packets/sec) with sub-millisecond latency and low CPU overhead. Cannot inspect URLs or terminate SSL.',
      'Layer 7 (e.g. AWS ALB, Nginx, Envoy, Cloudflare): Terminates the TCP connection and decrypts TLS. Reads HTTP path (e.g. `/api/v1/checkout` -> checkout service; `/static/*` -> S3 bucket). Supports sticky sessions via cookies, rate limiting, and gRPC routing.',
      'Modern Hybrid Architecture: Big Tech edge architectures place an ultra-fast L4 balancer at the external gateway (doing ECMP / IPVS), which distributes traffic across a pool of L7 Envoy proxies.',
    ],
    interviewerTrap:
      'Using an L7 load balancer for high-throughput raw TCP streams or WebSocket connection limits: L7 termination requires significant memory for buffers and SSL decryption.',
    tradeoffOrMetric:
      'Performance: L4 handles 5–10x higher connection volume per CPU core than L7 due to zero payload parsing.',
  },
];

export const DsaCsFundamentalsPage: React.FC<DsaCsFundamentalsPageProps> = ({ data }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>('os-1');
  const [isDrillMode, setIsDrillMode] = useState(false);
  const [drillIdx, setDrillIdx] = useState(0);
  const [isDrillFlipped, setIsDrillFlipped] = useState(false);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleTopic = (id: string) => {
    setExpandedTopicId((prev) => (prev === id ? null : id));
  };

  const filteredTopics = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return CS_TOPICS.filter((t) => {
      const matchCat = selectedCategory === 'All' || t.category === selectedCategory;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        t.title.toLowerCase().includes(q) ||
        t.question.toLowerCase().includes(q) ||
        t.verbalAnswer.toLowerCase().includes(q) ||
        t.inDepthAnalysis.some((p) => p.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main id="main" className="min-h-screen pb-20 bg-[#fcfcfd]">
      {/* ───────────────── TOP BANNER ───────────────── */}
      <section className="border-b border-slate-200/80 bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-4">
          <Link
            to="/dsa/applied-track"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Applied Scientist Track (Section §7 CS Fundamentals)</span>
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-0.5 text-xs font-semibold text-purple-800">
                <Cpu className="h-3.5 w-3.5 text-purple-600" />
                <span>SDE &amp; Systems Engineering Core</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-2">
                CS Fundamentals &amp; Systems Playbook
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-3xl">
                Operating Systems · Storage &amp; Database Internals · Computer Networks · 60-Second Verbal Interview Scripts.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-mono-code text-slate-700">
              <span className="font-bold text-purple-700">OS Internals</span>
              <span className="text-slate-300">•</span>
              <span className="font-bold text-sky-700">Databases</span>
              <span className="text-slate-300">•</span>
              <span className="font-bold text-emerald-700">Networking</span>
            </div>
          </div>

          {/* Search, Filter Pills & Drill Switcher */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search OS, databases, TCP/UDP, virtual memory, indexes..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition"
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {['All', 'Operating Systems', 'Databases & Storage', 'Networking & Protocols'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      selectedCategory === cat
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Flashcard Drill Mode Toggle */}
              <button
                type="button"
                onClick={() => {
                  setIsDrillMode(!isDrillMode);
                  setIsDrillFlipped(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                  isDrillMode
                    ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Radio className="h-3.5 w-3.5" />
                <span>{isDrillMode ? 'Exit Drill' : '45s Drill'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-10">
        {/* ───────────────── FLASHCARD ACTIVE-RECALL DRILL MODE ───────────────── */}
        {isDrillMode ? (
          <section className="rounded-2xl border-2 border-purple-300 bg-purple-50/40 p-6 sm:p-8 shadow-sm space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-purple-200/80 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <h2 className="font-display text-lg font-bold text-slate-900">
                  Rapid-Fire 45-Second Oral Drill
                </h2>
              </div>
              <span className="font-mono-code text-xs font-bold text-purple-800 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
                Card {drillIdx + 1} of {filteredTopics.length}
              </span>
            </div>

            <div className="py-6 max-w-2xl mx-auto space-y-4 text-center">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-mono-code uppercase font-semibold text-purple-700 bg-purple-100 border border-purple-200">
                {filteredTopics[drillIdx]?.category}
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {filteredTopics[drillIdx]?.question}
              </h3>

              {isDrillFlipped ? (
                <div className="p-5 rounded-xl border border-purple-300 bg-white text-left text-sm text-slate-800 leading-relaxed shadow-xs space-y-3 animate-in fade-in duration-150">
                  <div>
                    <div className="text-xs font-mono-code uppercase font-bold text-purple-800 mb-1">
                      Verbal Model Answer (Target: 45s):
                    </div>
                    <p className="font-medium text-slate-900">{filteredTopics[drillIdx]?.verbalAnswer}</p>
                  </div>
                  <div className="text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <strong className="text-slate-800">Tradeoff / Metric to state: </strong>
                    {filteredTopics[drillIdx]?.tradeoffOrMetric}
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsDrillFlipped(true)}
                  className="rounded-xl border border-purple-400 bg-white px-6 py-3 text-xs font-bold text-purple-900 shadow-sm hover:bg-purple-50 transition"
                >
                  Flip to Reveal Verbal Answer
                </button>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-purple-200/80 max-w-2xl mx-auto">
              <button
                type="button"
                disabled={drillIdx === 0}
                onClick={() => {
                  setDrillIdx((prev) => Math.max(0, prev - 1));
                  setIsDrillFlipped(false);
                }}
                className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition"
              >
                Previous Card
              </button>
              <button
                type="button"
                disabled={drillIdx >= filteredTopics.length - 1}
                onClick={() => {
                  setDrillIdx((prev) => Math.min(filteredTopics.length - 1, prev + 1));
                  setIsDrillFlipped(false);
                }}
                className="px-5 py-2 rounded-lg bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 disabled:opacity-40 transition shadow-xs"
              >
                Next Card →
              </button>
            </div>
          </section>
        ) : null}

        {/* ───────────────── THE 3 CORE PILLARS TOPIC CARDS ───────────────── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Core Systems &amp; Architecture Topics
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Every topic formatted with the exact 60-second verbal answer, deep architectural analysis, and common interviewer traps.
              </p>
            </div>
            <span className="text-xs font-mono-code font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              Showing {filteredTopics.length} of {CS_TOPICS.length}
            </span>
          </div>

          <div className="space-y-5">
            {filteredTopics.map((topic) => {
              const isExpanded = expandedTopicId === topic.id;

              return (
                <div
                  key={topic.id}
                  id={topic.id}
                  className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden"
                >
                  {/* Topic Header */}
                  <div
                    onClick={() => toggleTopic(topic.id)}
                    className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/70 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`flex h-9 w-9 items-center justify-center rounded-xl font-bold font-mono-code text-xs ${
                        topic.category === 'Operating Systems'
                          ? 'bg-purple-100 text-purple-800'
                          : topic.category === 'Databases & Storage'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {topic.category === 'Operating Systems' ? <Cpu className="h-4 w-4" /> : topic.category === 'Databases & Storage' ? <Database className="h-4 w-4" /> : <Network className="h-4 w-4" />}
                      </span>
                      <div>
                        <div className="text-[11px] font-mono-code font-semibold text-slate-500 uppercase tracking-wider">
                          {topic.category}
                        </div>
                        <h3 className="font-display text-lg font-bold text-slate-900">
                          {topic.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono-code text-slate-500 hidden sm:inline">
                        Click to {isExpanded ? 'collapse' : 'expand'}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-5 sm:p-6 space-y-6 animate-in fade-in duration-150">
                      {/* Question */}
                      <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 text-xs sm:text-sm text-purple-950 font-medium">
                        <strong className="text-purple-900 font-bold">Interview Question: </strong>
                        {topic.question}
                      </div>

                      {/* Verbal Answer (45-second script) */}
                      <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-purple-800 flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            <span>The 45-Second Verbal Script</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(topic.verbalAnswer, `verbal-${topic.id}`)}
                            className="flex items-center gap-1 text-[11px] font-mono-code font-semibold text-slate-600 hover:text-slate-900"
                          >
                            {copiedId === `verbal-${topic.id}` ? (
                              <CheckCheck className="h-3.5 w-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                            <span>Copy</span>
                          </button>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                          &ldquo;{topic.verbalAnswer}&rdquo;
                        </p>
                      </div>

                      {/* Deep In-Depth Architectural Points */}
                      <div className="space-y-2">
                        <div className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-slate-500">
                          Architectural Internals &amp; Deep Mechanics
                        </div>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                          {topic.inDepthAnalysis.map((pt, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-2.5">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0" />
                              <span className="leading-relaxed">{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Traps and Metrics Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
                          <div className="font-bold text-amber-900 font-mono-code uppercase flex items-center gap-1">
                            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                            <span>Common Interviewer Trap</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed">{topic.interviewerTrap}</p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                          <div className="font-bold text-emerald-900 font-mono-code uppercase flex items-center gap-1">
                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                            <span>Tradeoff or Metric to State</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed">{topic.tradeoffOrMetric}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
};
