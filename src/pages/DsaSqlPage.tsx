import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Database,
  ArrowLeft,
  Copy,
  CheckCheck,
  Search,
  Filter,
  Sparkles,
  Layers,
  AlertTriangle,
  Code2,
  Terminal,
  HelpCircle,
  TrendingUp,
  CheckCircle2,
  Table as TableIcon,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { DsaRoadmapData } from '../types/dsaRoadmap';

interface DsaSqlPageProps {
  data: DsaRoadmapData;
}

interface SqlPattern {
  id: string;
  number: number;
  title: string;
  category: 'Window Functions' | 'Aggregations & Grouping' | 'Joins & Sets' | 'Cohorts & Funnels';
  canonicalQuestion: string;
  technique: string;
  complexity: string;
  schema: string;
  sql: string;
  explanation: string;
  interviewTraps: string[];
}

interface PracticeQuery {
  number: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  problem: string;
  schema: string;
  sql: string;
  explanation: string;
  keyTakeaway: string;
}

interface SqlTrap {
  number: number;
  title: string;
  category: string;
  risk: string;
  wrongSql: string;
  correctSql: string;
  explanation: string;
}

const SQL_PATTERNS: SqlPattern[] = [
  {
    id: 'sql-pat-1',
    number: 1,
    title: 'Latest Record per Group (Deduplication / Snapshot)',
    category: 'Window Functions',
    canonicalQuestion: 'For each user, find their most recent order including order ID and total amount.',
    technique: 'ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC, order_id DESC) = 1',
    complexity: 'O(N log K) time, O(N) space where K is max partition size',
    schema: `CREATE TABLE orders (
  order_id    INT PRIMARY KEY,
  user_id     INT NOT NULL,
  amount      NUMERIC(10, 2) NOT NULL,
  created_at  TIMESTAMP NOT NULL
);`,
    sql: `WITH ranked_orders AS (
  SELECT
    user_id,
    order_id,
    amount,
    created_at,
    ROW_NUMBER() OVER (
      PARTITION BY user_id
      ORDER BY created_at DESC, order_id DESC
    ) AS rn
  FROM orders
)
SELECT
  user_id,
  order_id,
  amount,
  created_at
FROM ranked_orders
WHERE rn = 1;`,
    explanation:
      'Partitions records by user_id and assigns a unique sequential rank sorted by created_at descending. Adding order_id DESC to the ORDER BY guarantees deterministic tie-breaking if two orders share the exact same timestamp.',
    interviewTraps: [
      'Why ROW_NUMBER() and not RANK()? RANK() returns duplicates for ties, yielding multiple "latest" rows.',
      'Why not use MAX(created_at) in a GROUP BY? MAX() only gives the timestamp; retrieving other attributes (like order_id, amount) requires an expensive self-join.',
      'PostgreSQL superpower: DISTINCT ON (user_id) order_id, amount FROM orders ORDER BY user_id, created_at DESC is faster than window functions in Postgres.',
    ],
  },
  {
    id: 'sql-pat-2',
    number: 2,
    title: 'Top-N per Group (Rankings & Leaderboards)',
    category: 'Window Functions',
    canonicalQuestion: 'Find the top 3 highest-paid employees in each department, handling ties gracefully.',
    technique: 'DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) <= 3',
    complexity: 'O(N log K) time, O(N) space',
    schema: `CREATE TABLE employees (
  emp_id      INT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  dept_id     INT NOT NULL,
  salary      NUMERIC(10, 2) NOT NULL
);`,
    sql: `WITH dept_ranked AS (
  SELECT
    emp_id,
    name,
    dept_id,
    salary,
    DENSE_RANK() OVER (
      PARTITION BY dept_id
      ORDER BY salary DESC
    ) AS rnk
  FROM employees
)
SELECT
  dept_id,
  rnk AS salary_rank,
  emp_id,
  name,
  salary
FROM dept_ranked
WHERE rnk <= 3
ORDER BY dept_id, rnk, emp_id;`,
    explanation:
      'DENSE_RANK() assigns consecutive integer ranks without gaps (e.g. 1, 2, 2, 3), ensuring you return employees across the top 3 distinct salary levels even when employees share identical compensation.',
    interviewTraps: [
      'The difference matters: ROW_NUMBER() gives 1, 2, 3, 4 (arbitrary tie-break). RANK() gives 1, 2, 2, 4 (skips rank 3). DENSE_RANK() gives 1, 2, 2, 3 (preserves top 3 pay tiers).',
      'Always clarify with the interviewer: "Do you want the top 3 unique compensation levels, or strictly at most 3 employee rows?"',
    ],
  },
  {
    id: 'sql-pat-3',
    number: 3,
    title: 'Running Totals & Moving Averages (Cumulative Windowing)',
    category: 'Window Functions',
    canonicalQuestion: 'Compute cumulative revenue year-to-date and 7-day rolling average active users.',
    technique: 'SUM(x) OVER (ORDER BY d) and AVG(x) OVER (ORDER BY d ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)',
    complexity: 'O(N log N) for sort, O(N) linear scan for sliding frame',
    schema: `CREATE TABLE daily_metrics (
  metric_date DATE PRIMARY KEY,
  daily_users INT NOT NULL,
  revenue     NUMERIC(12, 2) NOT NULL
);`,
    sql: `SELECT
  metric_date,
  daily_users,
  revenue,
  -- 1. Cumulative Running Total
  SUM(revenue) OVER (
    ORDER BY metric_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS cumulative_revenue_ytd,
  -- 2. 7-Day Rolling Average
  ROUND(
    AVG(daily_users) OVER (
      ORDER BY metric_date
      ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ),
    1
  ) AS rolling_7d_avg_users
FROM daily_metrics
ORDER BY metric_date;`,
    explanation:
      'The default frame for OVER (ORDER BY ...) is RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW, which aggregates peers with identical timestamps together. Explicitly specifying ROWS BETWEEN gives precise physical row-count sliding windows.',
    interviewTraps: [
      'ROWS vs RANGE: ROWS operates on physical row offsets. RANGE operates on value offsets and groups duplicate values together.',
      'Missing date trap: If daily_metrics skips days (e.g. weekend closures), ROWS BETWEEN 6 PRECEDING captures the last 7 recorded days, not calendar days! Use GENERATE_SERIES / calendar table to gap-fill.',
    ],
  },
  {
    id: 'sql-pat-4',
    number: 4,
    title: 'Lag / Lead & Gaps-and-Islands (Consecutive Streaks)',
    category: 'Window Functions',
    canonicalQuestion: 'Identify users who logged in on at least 3 consecutive calendar days.',
    technique: 'login_date - ROW_NUMBER() OVER (...) * INTERVAL 1 DAY as island_id',
    complexity: 'O(N log N) time, O(N) space',
    schema: `CREATE TABLE user_logins (
  user_id    INT NOT NULL,
  login_date DATE NOT NULL,
  PRIMARY KEY (user_id, login_date)
);`,
    sql: `WITH distinct_days AS (
  -- First eliminate multiple logins in the same day
  SELECT DISTINCT user_id, login_date
  FROM user_logins
),
sequenced AS (
  SELECT
    user_id,
    login_date,
    -- Date - row_number gives an invariant date anchor for consecutive streaks!
    login_date - (ROW_NUMBER() OVER (
      PARTITION BY user_id
      ORDER BY login_date
    ) * INTERVAL '1 day') AS island_anchor
  FROM distinct_days
),
streak_groups AS (
  SELECT
    user_id,
    island_anchor,
    MIN(login_date) AS streak_start,
    MAX(login_date) AS streak_end,
    COUNT(*) AS streak_length
  FROM sequenced
  GROUP BY user_id, island_anchor
)
SELECT DISTINCT
  user_id,
  streak_start,
  streak_end,
  streak_length
FROM streak_groups
WHERE streak_length >= 3
ORDER BY user_id, streak_start;`,
    explanation:
      'The classic Date - RowNumber island trick: if dates increase by 1 day and row numbers increase by 1 integer simultaneously, their difference (login_date - rn * 1 day) remains constant! Any disruption in consecutive days creates a new invariant anchor.',
    interviewTraps: [
      'Forgetting DISTINCT login_date: if a user logs in 3 times in one day, row_number increments 3 times while date is static, destroying the formula.',
      'Alternative for fixed N (e.g. exactly 3 days): LAG(login_date, 2) OVER (...) = login_date - 2 days. The island trick is superior because it generalizes to any arbitrary streak length.',
    ],
  },
  {
    id: 'sql-pat-5',
    number: 5,
    title: 'Retention Cohort Analysis (Triangle Matrix)',
    category: 'Cohorts & Funnels',
    canonicalQuestion: 'Calculate Month-1, Month-2, and Month-3 user retention percentages by signup cohort.',
    technique: 'DATE_TRUNC cohort join, EXTRACT(month FROM age) offset, conditional aggregation',
    complexity: 'O(U + A log A) time where U = users, A = activities',
    schema: `CREATE TABLE users (
  user_id     INT PRIMARY KEY,
  signup_date DATE NOT NULL
);
CREATE TABLE user_actions (
  action_id   INT PRIMARY KEY,
  user_id     INT NOT NULL,
  action_date DATE NOT NULL
);`,
    sql: `WITH user_cohorts AS (
  SELECT
    user_id,
    DATE_TRUNC('month', signup_date)::DATE AS cohort_month
  FROM users
),
cohort_sizes AS (
  SELECT
    cohort_month,
    COUNT(DISTINCT user_id) AS total_users
  FROM user_cohorts
  GROUP BY cohort_month
),
user_activities AS (
  SELECT DISTINCT
    c.user_id,
    c.cohort_month,
    -- Month offset between activity and signup cohort
    (EXTRACT(YEAR FROM a.action_date) - EXTRACT(YEAR FROM c.cohort_month)) * 12 +
    (EXTRACT(MONTH FROM a.action_date) - EXTRACT(MONTH FROM c.cohort_month)) AS month_offset
  FROM user_cohorts c
  JOIN user_actions a ON c.user_id = a.user_id
  WHERE a.action_date >= c.cohort_month
)
SELECT
  cs.cohort_month,
  cs.total_users AS cohort_size,
  ROUND(100.0 * COUNT(DISTINCT CASE WHEN ua.month_offset = 1 THEN ua.user_id END) / cs.total_users, 1) AS m1_retention_pct,
  ROUND(100.0 * COUNT(DISTINCT CASE WHEN ua.month_offset = 2 THEN ua.user_id END) / cs.total_users, 1) AS m2_retention_pct,
  ROUND(100.0 * COUNT(DISTINCT CASE WHEN ua.month_offset = 3 THEN ua.user_id END) / cs.total_users, 1) AS m3_retention_pct
FROM cohort_sizes cs
LEFT JOIN user_activities ua ON cs.cohort_month = ua.cohort_month
GROUP BY cs.cohort_month, cs.total_users
ORDER BY cs.cohort_month;`,
    explanation:
      'Assigns every user to their signup cohort month, computes the integer month offset for every subsequent activity, and pivots the results into a cohort triangle table using conditional COUNT(DISTINCT CASE WHEN month_offset = N).',
    interviewTraps: [
      'Incomplete cohorts: Remember that recent cohorts have not lived long enough to reach Month 2 or 3. Their metrics should be marked NULL rather than 0% to prevent skewing retention curves.',
      'Activity definitions: Clarify what "retention" means (any page view vs logged-in core action vs purchase).',
    ],
  },
  {
    id: 'sql-pat-6',
    number: 6,
    title: 'Conversion Funnel & Drop-off Analysis',
    category: 'Cohorts & Funnels',
    canonicalQuestion: 'Compute the conversion rate from Product View -> Add to Cart -> Checkout -> Purchase.',
    technique: 'Conditional aggregation over events with timestamp ordering checks',
    complexity: 'O(E) linear pass over event stream',
    schema: `CREATE TABLE funnel_events (
  event_id   INT PRIMARY KEY,
  user_id    INT NOT NULL,
  channel    VARCHAR(50) NOT NULL,
  event_type VARCHAR(50) NOT NULL, -- view, cart, checkout, purchase
  created_at TIMESTAMP NOT NULL
);`,
    sql: `WITH user_funnel_stages AS (
  SELECT
    user_id,
    channel,
    MAX(CASE WHEN event_type = 'view' THEN 1 ELSE 0 END) AS has_viewed,
    MAX(CASE WHEN event_type = 'cart' THEN 1 ELSE 0 END) AS has_carted,
    MAX(CASE WHEN event_type = 'checkout' THEN 1 ELSE 0 END) AS has_checkout,
    MAX(CASE WHEN event_type = 'purchase' THEN 1 ELSE 0 END) AS has_purchased
  FROM funnel_events
  GROUP BY user_id, channel
)
SELECT
  channel,
  COUNT(*) AS total_visitors,
  SUM(has_viewed) AS step_1_views,
  SUM(has_carted) AS step_2_carts,
  SUM(has_checkout) AS step_3_checkouts,
  SUM(has_purchased) AS step_4_purchases,
  ROUND(100.0 * SUM(has_carted) / NULLIF(SUM(has_viewed), 0), 1) AS view_to_cart_pct,
  ROUND(100.0 * SUM(has_checkout) / NULLIF(SUM(has_carted), 0), 1) AS cart_to_checkout_pct,
  ROUND(100.0 * SUM(has_purchased) / NULLIF(SUM(has_checkout), 0), 1) AS checkout_to_purchase_pct,
  ROUND(100.0 * SUM(has_purchased) / NULLIF(SUM(has_viewed), 0), 1) AS overall_conversion_pct
FROM user_funnel_stages
GROUP BY channel
ORDER BY total_visitors DESC;`,
    explanation:
      'Aggregates events at the user level to collapse multiple interactions into binary flags, then computes stage-to-stage transition rates and overall conversion while protecting against divide-by-zero errors via NULLIF.',
    interviewTraps: [
      'Temporal sequence constraint: If an interviewer specifies that actions MUST happen in strict sequential order (e.g. view must precede cart), use self-joins on timestamps or window FIRST_VALUE / LAG with timestamp comparisons.',
      'Division by zero: Never write x / y without wrapping denominator in NULLIF(y, 0).',
    ],
  },
  {
    id: 'sql-pat-7',
    number: 7,
    title: 'Deduplication & Idempotent Cleanup',
    category: 'Aggregations & Grouping',
    canonicalQuestion: 'Deduplicate a messy staging table, keeping only the earliest ingested record per event.',
    technique: 'DELETE USING / CTE with ROW_NUMBER() = 1',
    complexity: 'O(N log N) index scan',
    schema: `CREATE TABLE raw_events (
  id          SERIAL PRIMARY KEY,
  event_hash  VARCHAR(64) NOT NULL,
  payload     TEXT,
  ingested_at TIMESTAMP NOT NULL
);`,
    sql: `-- Option A: Safe Deletion via Subquery / CTE (PostgreSQL)
DELETE FROM raw_events
WHERE id NOT IN (
  SELECT id
  FROM (
    SELECT
      id,
      ROW_NUMBER() OVER (
        PARTITION BY event_hash
        ORDER BY ingested_at ASC, id ASC
      ) AS rn
    FROM raw_events
  ) t
  WHERE rn = 1
);

-- Option B: Clean Deduplicated View (Read Path - Zero Data Loss)
CREATE OR REPLACE VIEW v_clean_events AS
SELECT DISTINCT ON (event_hash)
  id,
  event_hash,
  payload,
  ingested_at
FROM raw_events
ORDER BY event_hash, ingested_at ASC, id ASC;`,
    explanation:
      'In production pipelines with duplicate delivery (e.g. Kafka at-least-once semantics), deduplication identifies duplicates by business key (event_hash) and deterministically isolates the canonical record using ROW_NUMBER().',
    interviewTraps: [
      'Locks and Table Bloat: Running DELETE FROM on millions of rows locks the table and creates heavy WAL bloat. The preferred big-data pattern is INSERT INTO new_table SELECT ... WHERE rn = 1; DROP old_table; RENAME.',
      'Composite keys: Ensure all identifying business columns are in the PARTITION BY clause.',
    ],
  },
  {
    id: 'sql-pat-8',
    number: 8,
    title: 'Self-Joins & Hierarchical Trees',
    category: 'Joins & Sets',
    canonicalQuestion: 'Find employees earning more than their direct managers, plus traverse the full management tree.',
    technique: 'Aliased self-join e.manager_id = m.emp_id and WITH RECURSIVE',
    complexity: 'O(E) with index on manager_id',
    schema: `CREATE TABLE staff (
  emp_id     INT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  manager_id INT REFERENCES staff(emp_id),
  salary     NUMERIC(10, 2) NOT NULL
);`,
    sql: `-- 1. Employees earning more than their direct manager
SELECT
  e.emp_id,
  e.name AS employee_name,
  e.salary AS employee_salary,
  m.emp_id AS manager_id,
  m.name AS manager_name,
  m.salary AS manager_salary,
  (e.salary - m.salary) AS salary_surplus
FROM staff e
JOIN staff m ON e.manager_id = m.emp_id
WHERE e.salary > m.salary
ORDER BY salary_surplus DESC;

-- 2. Bonus: Recursive CTE to traverse full hierarchy level by level
WITH RECURSIVE org_hierarchy AS (
  -- Anchor member: CEO / top executive (no manager)
  SELECT emp_id, name, manager_id, salary, 1 AS depth, CAST(name AS VARCHAR(500)) AS path
  FROM staff
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive member: reports of current layer
  SELECT c.emp_id, c.name, c.manager_id, c.salary, p.depth + 1, CAST(p.path || ' -> ' || c.name AS VARCHAR(500))
  FROM staff c
  JOIN org_hierarchy p ON c.manager_id = p.emp_id
)
SELECT * FROM org_hierarchy ORDER BY depth, name;`,
    explanation:
      'Self-joins alias the same table twice (as e for employee, m for manager). Recursive CTEs (WITH RECURSIVE) allow traversing tree graphs of arbitrary depth without hardcoded join levels.',
    interviewTraps: [
      'Outer joins vs Inner joins: An INNER JOIN drops the CEO (whose manager_id IS NULL). When computing organizational summaries, use LEFT JOIN so the root node is preserved.',
      'Circular cycles in hierarchies: In dirty real-world data, cyclic manager loops cause infinite recursion in CTEs unless cycle detection (or depth limit depth <= 20) is added.',
    ],
  },
  {
    id: 'sql-pat-9',
    number: 9,
    title: 'Anti-Joins & Set Difference (Unmatched Records)',
    category: 'Joins & Sets',
    canonicalQuestion: 'Find customers who registered but have never placed an order in the system.',
    technique: 'LEFT JOIN ... WHERE b.id IS NULL or WHERE NOT EXISTS (...)',
    complexity: 'O(N + M) hash anti-join in modern optimizers',
    schema: `CREATE TABLE customers (
  customer_id INT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  registered_at DATE NOT NULL
);
CREATE TABLE orders (
  order_id    INT PRIMARY KEY,
  customer_id INT,
  amount      NUMERIC(10, 2) NOT NULL
);`,
    sql: `-- Approach 1: LEFT JOIN + IS NULL (Classic Anti-Join)
SELECT
  c.customer_id,
  c.name,
  c.registered_at
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
WHERE o.customer_id IS NULL;

-- Approach 2: NOT EXISTS (Safest against NULL semantics)
SELECT
  c.customer_id,
  c.name,
  c.registered_at
FROM customers c
WHERE NOT EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.customer_id
);`,
    explanation:
      'An anti-join returns rows from table A that have no matching records in table B. Using LEFT JOIN with IS NULL or WHERE NOT EXISTS are the industry standard approaches.',
    interviewTraps: [
      'THE DEADLY "NOT IN" NULL TRAP: If you write WHERE customer_id NOT IN (SELECT customer_id FROM orders), and orders contains EVEN A SINGLE NULL, the entire query returns ZERO rows! (In SQL, x NOT IN (1, NULL) evaluates to UNKNOWN, which evaluates to FALSE).',
      'Always recommend NOT EXISTS over NOT IN for safety in technical interviews.',
    ],
  },
  {
    id: 'sql-pat-10',
    number: 10,
    title: 'Pivoting & Cross-Tabulation (Long to Wide)',
    category: 'Aggregations & Grouping',
    canonicalQuestion: 'Pivot monthly order totals so order statuses (completed, cancelled, returned) appear as columns.',
    technique: 'SUM(CASE WHEN status = "X" THEN amount ELSE 0 END) or FILTER (WHERE status = "X")',
    complexity: 'O(N) single aggregation pass',
    schema: `CREATE TABLE customer_orders (
  order_id   INT PRIMARY KEY,
  status     VARCHAR(30) NOT NULL, -- completed, cancelled, returned
  created_at DATE NOT NULL,
  amount     NUMERIC(10, 2) NOT NULL
);`,
    sql: `SELECT
  DATE_TRUNC('month', created_at)::DATE AS order_month,
  -- Total orders across all statuses
  COUNT(*) AS total_orders,
  -- Pivoted metrics via conditional aggregation
  SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) AS completed_volume,
  SUM(CASE WHEN status = 'cancelled' THEN amount ELSE 0 END) AS cancelled_volume,
  SUM(CASE WHEN status = 'returned'  THEN amount ELSE 0 END) AS returned_volume,
  -- Modern PostgreSQL syntax: FILTER clause
  COUNT(*) FILTER (WHERE status = 'completed') AS completed_count,
  COUNT(*) FILTER (WHERE status = 'cancelled') AS cancelled_count
FROM customer_orders
GROUP BY DATE_TRUNC('month', created_at)::DATE
ORDER BY order_month DESC;`,
    explanation:
      'Transforms vertical rows into horizontal column metrics. Conditional aggregation using CASE statements is universal across MySQL, PostgreSQL, BigQuery, Snowflake, and Redshift.',
    interviewTraps: [
      'SUM() vs COUNT(): When counting, COUNT(CASE WHEN cond THEN 1 ELSE NULL END) is required because COUNT(0) counts 0 as a valid row! Or simply use SUM(CASE WHEN cond THEN 1 ELSE 0 END).',
      'Dynamic pivot: Standard SQL cannot dynamically generate column names from data without dynamic SQL/prepared statements.',
    ],
  },
];

const PRACTICE_QUERIES: PracticeQuery[] = [
  {
    number: 1,
    title: 'Users with > 3 orders in the last 30 days',
    difficulty: 'Easy',
    category: 'Aggregations & Having',
    problem: 'Find all user IDs and their total spend for users who placed more than 3 orders within the past 30 days.',
    schema: `orders (order_id INT, user_id INT, amount NUMERIC, order_date DATE)`,
    sql: `SELECT
  user_id,
  COUNT(order_id) AS order_count,
  SUM(amount) AS total_spend
FROM orders
WHERE order_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY user_id
HAVING COUNT(order_id) > 3
ORDER BY total_spend DESC;`,
    explanation:
      'Filters rows before grouping using WHERE, groups by user_id, and filters the resulting aggregated groups with HAVING COUNT(order_id) > 3.',
    keyTakeaway: 'WHERE filters individual input rows; HAVING filters computed group aggregates.',
  },
  {
    number: 2,
    title: 'Second-highest salary per department',
    difficulty: 'Medium',
    category: 'Window Functions',
    problem: 'Return the second-highest distinct salary in each department. If a department has fewer than 2 distinct salary tiers, handle gracefully.',
    schema: `employees (emp_id INT, dept_id INT, salary NUMERIC)`,
    sql: `WITH ranked_salaries AS (
  SELECT
    dept_id,
    salary,
    DENSE_RANK() OVER (
      PARTITION BY dept_id
      ORDER BY salary DESC
    ) AS rnk
  FROM employees
)
SELECT DISTINCT
  dept_id,
  salary AS second_highest_salary
FROM ranked_salaries
WHERE rnk = 2
ORDER BY dept_id;`,
    explanation:
      'Using DENSE_RANK() ensures that if two people tie for highest salary ($200k, $200k), the next lower pay level ($180k) correctly receives rank 2 rather than being skipped to rank 3.',
    keyTakeaway: 'Always use DENSE_RANK() for N-th distinct value searches.',
  },
  {
    number: 3,
    title: 'Daily active users with 7-day rolling average',
    difficulty: 'Medium',
    category: 'Window Functions',
    problem: 'Calculate daily active users (DAU) and smooth the trend line using a 7-day rolling average of daily user counts.',
    schema: `user_activity (user_id INT, activity_date DATE)`,
    sql: `WITH daily_dau AS (
  SELECT
    activity_date,
    COUNT(DISTINCT user_id) AS dau
  FROM user_activity
  GROUP BY activity_date
)
SELECT
  activity_date,
  dau,
  ROUND(
    AVG(dau) OVER (
      ORDER BY activity_date
      ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ),
    2
  ) AS dau_7d_rolling_avg
FROM daily_dau
ORDER BY activity_date;`,
    explanation:
      'First aggregates user activity into distinct daily DAU counts, then applies a sliding window frame of 6 preceding rows plus current row (total 7 rows).',
    keyTakeaway: 'Aggregate first in a CTE before applying moving average window functions.',
  },
  {
    number: 4,
    title: 'Month-over-month revenue growth rate',
    difficulty: 'Medium',
    category: 'Window Functions',
    problem: 'Compute total monthly revenue and the month-over-month (MoM) percentage revenue growth rate.',
    schema: `transactions (txn_id INT, amount NUMERIC, txn_date DATE)`,
    sql: `WITH monthly_rev AS (
  SELECT
    DATE_TRUNC('month', txn_date)::DATE AS rev_month,
    SUM(amount) AS total_revenue
  FROM transactions
  GROUP BY DATE_TRUNC('month', txn_date)::DATE
),
growth_calc AS (
  SELECT
    rev_month,
    total_revenue,
    LAG(total_revenue, 1) OVER (ORDER BY rev_month) AS prev_month_revenue
  FROM monthly_rev
)
SELECT
  rev_month,
  total_revenue,
  prev_month_revenue,
  ROUND(
    100.0 * (total_revenue - prev_month_revenue) / NULLIF(prev_month_revenue, 0),
    2
  ) AS mom_growth_pct
FROM growth_calc
ORDER BY rev_month;`,
    explanation:
      'LAG(total_revenue, 1) fetches the previous month value along the timeline. NULLIF protects against division by zero on the very first month.',
    keyTakeaway: 'MoM formula: (current - previous) / previous * 100 with NULLIF safeguard.',
  },
  {
    number: 5,
    title: 'Employees earning more than their manager',
    difficulty: 'Easy',
    category: 'Self Joins',
    problem: 'Find the names and salaries of all employees whose salary exceeds their direct manager salary.',
    schema: `employees (emp_id INT, name VARCHAR, manager_id INT, salary NUMERIC)`,
    sql: `SELECT
  e.name AS employee_name,
  e.salary AS employee_salary,
  m.name AS manager_name,
  m.salary AS manager_salary,
  (e.salary - m.salary) AS excess_amount
FROM employees e
INNER JOIN employees m ON e.manager_id = m.emp_id
WHERE e.salary > m.salary
ORDER BY excess_amount DESC;`,
    explanation:
      'Self-joins the employees table to itself, matching the employee manager_id against the manager emp_id, and filters for e.salary > m.salary.',
    keyTakeaway: 'Use INNER JOIN when manager presence is required; aliases clarify roles.',
  },
  {
    number: 6,
    title: 'Users who logged in on 3 consecutive days',
    difficulty: 'Hard',
    category: 'Gaps & Islands',
    problem: 'Identify users who logged into the application on 3 or more consecutive calendar days.',
    schema: `logins (user_id INT, login_date DATE)`,
    sql: `WITH unique_daily_logins AS (
  SELECT DISTINCT user_id, login_date
  FROM logins
),
grouped_streaks AS (
  SELECT
    user_id,
    login_date,
    login_date - (ROW_NUMBER() OVER (
      PARTITION BY user_id
      ORDER BY login_date
    ) * INTERVAL '1 day') AS streak_id
  FROM unique_daily_logins
)
SELECT
  user_id,
  MIN(login_date) AS streak_start,
  MAX(login_date) AS streak_end,
  COUNT(*) AS consecutive_days
FROM grouped_streaks
GROUP BY user_id, streak_id
HAVING COUNT(*) >= 3
ORDER BY user_id, streak_start;`,
    explanation:
      'Date minus row number creates an invariant grouping key for consecutive sequences. Aggregating by this key with HAVING COUNT(*) >= 3 isolates eligible streaks.',
    keyTakeaway: 'The date-minus-row_number technique is the canonical Gaps & Islands solution.',
  },
  {
    number: 7,
    title: 'Products never ordered (Anti-Join)',
    difficulty: 'Easy',
    category: 'Joins & Sets',
    problem: 'Find all products in the catalog that have never been purchased by any customer.',
    schema: `products (product_id INT, name VARCHAR, price NUMERIC); order_items (item_id INT, product_id INT)`,
    sql: `SELECT
  p.product_id,
  p.name,
  p.price
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
WHERE oi.product_id IS NULL
ORDER BY p.product_id;`,
    explanation:
      'Performs a LEFT JOIN to keep all products, and filters with WHERE oi.product_id IS NULL to isolate unmatched catalog entries.',
    keyTakeaway: 'LEFT JOIN ... WHERE right.key IS NULL is the benchmark anti-join.',
  },
  {
    number: 8,
    title: 'Funnel conversion: view -> cart -> purchase per channel',
    difficulty: 'Medium',
    category: 'Cohorts & Funnels',
    problem: 'Compute stage-by-stage drop-off rates across marketing channels for user event funnels.',
    schema: `events (event_id INT, user_id INT, channel VARCHAR, event_type VARCHAR)`,
    sql: `WITH user_channel_summary AS (
  SELECT
    user_id,
    channel,
    MAX(CASE WHEN event_type = 'view' THEN 1 ELSE 0 END) AS viewed,
    MAX(CASE WHEN event_type = 'cart' THEN 1 ELSE 0 END) AS carted,
    MAX(CASE WHEN event_type = 'purchase' THEN 1 ELSE 0 END) AS purchased
  FROM events
  GROUP BY user_id, channel
)
SELECT
  channel,
  COUNT(*) AS total_users,
  SUM(viewed) AS views,
  SUM(carted) AS carts,
  SUM(purchased) AS purchases,
  ROUND(100.0 * SUM(carted) / NULLIF(SUM(viewed), 0), 1) AS view_to_cart_pct,
  ROUND(100.0 * SUM(purchased) / NULLIF(SUM(carted), 0), 1) AS cart_to_purchase_pct
FROM user_channel_summary
GROUP BY channel
ORDER BY total_users DESC;`,
    explanation:
      'Rolls up events per user to eliminate duplicate event noise, then aggregates per acquisition channel.',
    keyTakeaway: 'Conditional MAX() collapses multiple events into clean binary user flags.',
  },
  {
    number: 9,
    title: 'Month-1 retention by signup cohort',
    difficulty: 'Hard',
    category: 'Cohorts & Funnels',
    problem: 'Compute the percentage of users who return to make an action in the calendar month following their signup month.',
    schema: `users (user_id INT, signup_date DATE); activity (user_id INT, activity_date DATE)`,
    sql: `WITH cohorts AS (
  SELECT
    user_id,
    DATE_TRUNC('month', signup_date)::DATE AS cohort_month
  FROM users
),
first_month_returns AS (
  SELECT DISTINCT
    c.user_id,
    c.cohort_month
  FROM cohorts c
  JOIN activity a ON c.user_id = a.user_id
  WHERE DATE_TRUNC('month', a.activity_date)::DATE = c.cohort_month + INTERVAL '1 month'
)
SELECT
  c.cohort_month,
  COUNT(DISTINCT c.user_id) AS cohort_size,
  COUNT(DISTINCT r.user_id) AS retained_month_1_users,
  ROUND(
    100.0 * COUNT(DISTINCT r.user_id) / NULLIF(COUNT(DISTINCT c.user_id), 0),
    2
  ) AS m1_retention_rate_pct
FROM cohorts c
LEFT JOIN first_month_returns r ON c.user_id = r.user_id AND c.cohort_month = r.cohort_month
GROUP BY c.cohort_month
ORDER BY c.cohort_month;`,
    explanation:
      'Joins signup cohort against activity timestamp exactly one month later, matching on user_id.',
    keyTakeaway: 'Cohort retention requires careful calendar interval arithmetic and distinct counting.',
  },
  {
    number: 10,
    title: 'Median order value per region',
    difficulty: 'Medium',
    category: 'Window Functions & Aggregations',
    problem: 'Calculate the true median order amount in each geographical region without relying on non-standard approximations.',
    schema: `orders (order_id INT, region VARCHAR, amount NUMERIC)`,
    sql: `-- Approach 1: Modern ANSI SQL Standard (Postgres, Redshift, Snowflake, Oracle)
SELECT
  region,
  COUNT(*) AS total_orders,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY amount) AS median_order_value
FROM orders
GROUP BY region
ORDER BY region;

-- Approach 2: Pure Window Functions Fallback (MySQL / Universal)
WITH ranked AS (
  SELECT
    region,
    amount,
    ROW_NUMBER() OVER (PARTITION BY region ORDER BY amount ASC) AS r_asc,
    ROW_NUMBER() OVER (PARTITION BY region ORDER BY amount DESC) AS r_desc
  FROM orders
)
SELECT
  region,
  ROUND(AVG(amount), 2) AS median_order_value
FROM ranked
WHERE r_asc BETWEEN r_desc - 1 AND r_desc + 1
GROUP BY region;`,
    explanation:
      'PERCENTILE_CONT(0.5) computes the continuous 50th percentile (median). Approach 2 demonstrates pure algorithmic prowess in engines lacking PERCENTILE_CONT by finding the intersection of ascending and descending row numbers.',
    keyTakeaway: 'PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY col) is the standard median syntax.',
  },
];

const SQL_TRAPS: SqlTrap[] = [
  {
    number: 1,
    title: 'COUNT(*) vs COUNT(column) with NULLs',
    category: 'Aggregations',
    risk: 'Silent undercounting or false zero counts',
    wrongSql: `-- Intended: Count all order attempts
SELECT customer_id, COUNT(discount_code) AS attempts
FROM orders
GROUP BY customer_id;`,
    correctSql: `-- Fixed: Explicitly count rows vs non-null values
SELECT
  customer_id,
  COUNT(*) AS total_attempts,
  COUNT(discount_code) AS discounted_attempts
FROM orders
GROUP BY customer_id;`,
    explanation:
      'COUNT(*) counts every row in the partition, regardless of NULL content. COUNT(col) silently skips rows where col IS NULL.',
  },
  {
    number: 2,
    title: 'The Catastrophic "NOT IN (NULL)" Trap',
    category: 'Joins & Sets',
    risk: 'Query returns ZERO rows even when thousands of mismatches exist',
    wrongSql: `-- FATAL BUG: If orders contains even ONE NULL customer_id, returns EMPTY!
SELECT *
FROM customers
WHERE customer_id NOT IN (
  SELECT customer_id FROM orders
);`,
    correctSql: `-- FIX: Use NOT EXISTS or LEFT JOIN ... WHERE IS NULL
SELECT *
FROM customers c
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id
);`,
    explanation:
      'In SQL three-valued logic, x NOT IN (1, 2, NULL) translates to (x != 1 AND x != 2 AND x != NULL). Since x != NULL evaluates to UNKNOWN, the entire condition evaluates to UNKNOWN (treated as FALSE).',
  },
  {
    number: 3,
    title: 'Three-Valued Logic: NULL = NULL is NOT True',
    category: 'Filters',
    risk: 'Missing rows during comparisons and joins',
    wrongSql: `-- Fails to find records where status is NULL or differs
SELECT * FROM users WHERE status != 'active';`,
    correctSql: `-- Fix: Use IS DISTINCT FROM or COALESCE
SELECT * FROM users
WHERE status IS DISTINCT FROM 'active';
-- Or: WHERE status != 'active' OR status IS NULL;`,
    explanation:
      'In SQL, NULL represents an unknown value. NULL = NULL yields UNKNOWN, not TRUE. status != "active" silently filters out rows where status IS NULL.',
  },
  {
    number: 4,
    title: 'Filtering Window Functions directly in WHERE',
    category: 'Execution Order',
    risk: 'Syntax error: Window functions are not allowed in WHERE',
    wrongSql: `-- SYNTAX ERROR:
SELECT user_id, amount
FROM orders
WHERE ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY amount DESC) = 1;`,
    correctSql: `-- FIX: Must wrap in a Subquery or Common Table Expression (CTE)
WITH ranked AS (
  SELECT user_id, amount,
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY amount DESC) AS rn
  FROM orders
)
SELECT user_id, amount FROM ranked WHERE rn = 1;`,
    explanation:
      'Logical execution order dictates that WHERE executes before WINDOW functions are calculated. A window function result literally does not exist yet when WHERE is evaluated!',
  },
  {
    number: 5,
    title: 'INNER JOIN dropping Zero-Count Categories',
    category: 'Joins',
    risk: 'Missing inactive departments, products with 0 sales',
    wrongSql: `-- Drops departments with 0 employees!
SELECT d.dept_name, COUNT(e.emp_id)
FROM departments d
INNER JOIN employees e ON d.dept_id = e.dept_id
GROUP BY d.dept_name;`,
    correctSql: `-- FIX: LEFT JOIN + COUNT(e.emp_id) (NOT COUNT(*))
SELECT d.dept_name, COUNT(e.emp_id) AS emp_count
FROM departments d
LEFT JOIN employees e ON d.dept_id = e.dept_id
GROUP BY d.dept_name;`,
    explanation:
      'INNER JOIN drops unrepresented departments. Note that you MUST use COUNT(e.emp_id) rather than COUNT(*), because COUNT(*) on a LEFT JOIN row with NULL employee would count 1!',
  },
  {
    number: 6,
    title: 'UNION vs UNION ALL Performance Penalty',
    category: 'Set Operations',
    risk: 'Accidental slow queries due to hidden DISTINCT sort overhead',
    wrongSql: `-- Triggers an expensive deduplicating sort across millions of rows
SELECT user_id FROM web_events
UNION
SELECT user_id FROM mobile_events;`,
    correctSql: `-- Use UNION ALL when sets are disjoint or deduplication is handled
SELECT user_id FROM web_events
UNION ALL
SELECT user_id FROM mobile_events;`,
    explanation:
      'UNION performs an implicit DISTINCT deduplication sort across all combined rows. Unless deduplication is explicitly desired, UNION ALL is significantly faster.',
  },
  {
    number: 7,
    title: 'Date & Timestamp Range Boundary Trap',
    category: 'Date Arithmetic',
    risk: 'Silently dropping the entire last day of the month',
    wrongSql: `-- MISSED DATA: BETWEEN '2024-01-01' AND '2024-01-31'
-- Only matches up to '2024-01-31 00:00:00'! Misses all afternoon/evening orders!
SELECT * FROM orders
WHERE created_at BETWEEN '2024-01-01' AND '2024-01-31';`,
    correctSql: `-- FIX: Half-open interval [start, end)
SELECT * FROM orders
WHERE created_at >= '2024-01-01'
  AND created_at <  '2024-02-01';`,
    explanation:
      'BETWEEN on timestamps implies 00:00:00 on the upper bound. Half-open intervals (>= start AND < next_month) accurately capture all microsecond events without boundary leakage.',
  },
];

export const DsaSqlPage: React.FC<DsaSqlPageProps> = ({ data }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedTraps, setExpandedTraps] = useState<Record<number, boolean>>({ 1: true, 2: true });

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleTrap = (num: number) => {
    setExpandedTraps((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  // Filter patterns
  const filteredPatterns = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return SQL_PATTERNS.filter((pat) => {
      const matchesCat = selectedCategory === 'All' || pat.category === selectedCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        pat.title.toLowerCase().includes(q) ||
        pat.canonicalQuestion.toLowerCase().includes(q) ||
        pat.technique.toLowerCase().includes(q) ||
        pat.sql.toLowerCase().includes(q) ||
        pat.explanation.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedCategory]);

  // Filter practice queries
  const filteredPractice = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return PRACTICE_QUERIES.filter((pq) => {
      if (selectedCategory !== 'All' && selectedCategory !== 'Practice Set') return false;
      if (!q) return true;
      return (
        pq.title.toLowerCase().includes(q) ||
        pq.problem.toLowerCase().includes(q) ||
        pq.sql.toLowerCase().includes(q) ||
        pq.category.toLowerCase().includes(q) ||
        pq.explanation.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedCategory]);

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
            <span>Back to Applied Scientist Track (Section §2 SQL)</span>
          </Link>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-0.5 text-xs font-semibold text-sky-800">
                <Database className="h-3.5 w-3.5 text-sky-600" />
                <span>Interview Engineering Reference</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-2">
                The SQL Patterns &amp; Interview Playbook
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-3xl">
                The 10 canonical patterns that govern 90% of Big Tech SQL rounds · Execution order · 7 deadly traps · Full 10-query practice set with production templates.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-mono-code text-slate-700">
              <span className="font-bold text-sky-700">10</span> Patterns
              <span className="text-slate-300">•</span>
              <span className="font-bold text-emerald-700">10</span> Solved Queries
              <span className="text-slate-300">•</span>
              <span className="font-bold text-amber-700">7</span> Traps
            </div>
          </div>

          {/* Search and Filters */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search SQL patterns, queries, syntax (LAG, DENSE_RANK, CTE)..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                'All',
                'Window Functions',
                'Aggregations & Grouping',
                'Joins & Sets',
                'Cohorts & Funnels',
                'Practice Set',
              ].map((cat) => (
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
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-12">
        {/* ───────────────── SECTION 1: EXECUTION ORDER VISUALIZER ───────────────── */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-800 font-bold font-mono-code text-xs">
                #0
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-slate-900">
                  SQL Query Logical Execution Order
                </h2>
                <p className="text-xs text-slate-500">
                  SQL is declarative: written top-to-bottom, but executed in this strict logical sequence.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono-code font-semibold px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
              Explains 90% of syntax errors
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs font-mono-code">
            {[
              { step: '1. FROM', desc: 'Cross join & base tables', color: 'bg-slate-100 text-slate-800 border-slate-200' },
              { step: '2. ON', desc: 'Join filter condition', color: 'bg-slate-100 text-slate-800 border-slate-200' },
              { step: '3. WHERE', desc: 'Row filter before grouping', color: 'bg-amber-50 text-amber-900 border-amber-200' },
              { step: '4. GROUP BY', desc: 'Aggregate buckets', color: 'bg-sky-50 text-sky-900 border-sky-200' },
              { step: '5. HAVING', desc: 'Filter computed groups', color: 'bg-amber-50 text-amber-900 border-amber-200' },
              { step: '6. SELECT', desc: 'Evaluate expressions & aliases', color: 'bg-emerald-50 text-emerald-900 border-emerald-200' },
              { step: '7. WINDOW', desc: 'OVER (PARTITION/ORDER)', color: 'bg-purple-50 text-purple-900 border-purple-200' },
              { step: '8. ORDER/LIMIT', desc: 'Sort presentation & slice', color: 'bg-slate-100 text-slate-800 border-slate-200' },
            ].map((s, idx) => (
              <div key={idx} className={`p-2.5 rounded-xl border ${s.color} flex flex-col justify-between`}>
                <div className="font-bold">{s.step}</div>
                <div className="text-[10px] text-slate-500 mt-1 leading-snug">{s.desc}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <strong className="text-slate-800">Why can&apos;t you filter window functions in WHERE?</strong>
              <p className="mt-0.5">
                Because Step 3 (WHERE) executes long before Step 7 (WINDOW). Window function outputs do not exist yet when WHERE evaluates! Hence the subquery or CTE wrapper requirement.
              </p>
            </div>
            <div>
              <strong className="text-slate-800">Why can&apos;t you use SELECT aliases in WHERE or GROUP BY?</strong>
              <p className="mt-0.5">
                Because Step 6 (SELECT) evaluates after Step 3 (WHERE) and Step 4 (GROUP BY). Standard SQL engines cannot reference alias names defined in the future.
              </p>
            </div>
          </div>
        </section>

        {/* ───────────────── SECTION 2: THE 10 MASTER PATTERNS ───────────────── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                The 10 Canonical SQL Patterns
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Production-ready templates with schemas, complexity, and common interviewer traps.
              </p>
            </div>
            <span className="text-xs font-mono-code font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
              Showing {filteredPatterns.length} of {SQL_PATTERNS.length}
            </span>
          </div>

          <div className="space-y-6">
            {filteredPatterns.map((pat) => (
              <div
                key={pat.id}
                id={pat.id}
                className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden"
              >
                {/* Pattern Header */}
                <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 text-sky-800 font-mono-code font-bold text-sm">
                      #{pat.number}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono-code text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          {pat.category}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="font-mono-code text-[11px] text-slate-500">
                          {pat.complexity}
                        </span>
                      </div>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                        {pat.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(pat.sql, pat.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition shadow-2xs"
                    >
                      {copiedId === pat.id ? (
                        <>
                          <CheckCheck className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-slate-500" />
                          <span>Copy SQL</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-5">
                  {/* Canonical Question */}
                  <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-100 text-xs sm:text-sm text-sky-950">
                    <strong className="font-semibold text-sky-900">Canonical Question: </strong>
                    <span>{pat.canonicalQuestion}</span>
                  </div>

                  {/* Schema & SQL Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Schema Column */}
                    <div className="lg:col-span-4 space-y-2">
                      <div className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                        <TableIcon className="h-3.5 w-3.5 text-slate-400" />
                        <span>Input Schema</span>
                      </div>
                      <pre className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono-code text-[11.5px] overflow-x-auto leading-relaxed border border-slate-800">
                        {pat.schema}
                      </pre>

                      <div className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-slate-500 pt-2">
                        Core Mechanism
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {pat.explanation}
                      </p>
                    </div>

                    {/* SQL Column */}
                    <div className="lg:col-span-8 space-y-2">
                      <div className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Code2 className="h-3.5 w-3.5 text-sky-600" />
                          <span>Production SQL Template</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-normal">
                          {pat.technique}
                        </span>
                      </div>
                      <pre className="p-4 rounded-xl bg-slate-900 text-emerald-300 font-mono-code text-[12.5px] overflow-x-auto leading-relaxed border border-slate-800">
                        {pat.sql}
                      </pre>
                    </div>
                  </div>

                  {/* Follow-ups & Traps */}
                  <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 font-mono-code uppercase tracking-wider">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                      <span>Interviewer Follow-ups &amp; Edge Traps</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700 pl-1">
                      {pat.interviewTraps.map((trap, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                          <span>{trap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────── SECTION 3: PRACTICE SET (10 QUERIES) ───────────────── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Practice Set · 10 Queries (Section §2.4)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                The 10 mandatory practice queries from Section §2.4 solved with full explanations. Target: 45 min cold.
              </p>
            </div>
            <span className="text-xs font-mono-code font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              10 Practice Problems
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {filteredPractice.map((pq) => (
              <div
                key={pq.number}
                className="rounded-2xl border border-slate-200 bg-white shadow-xs p-5 sm:p-6 space-y-4 hover:border-slate-300 transition"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 font-mono-code font-bold text-xs">
                      Q{pq.number}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono-code text-slate-500 uppercase">
                          {pq.category}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className={`text-[11px] font-mono-code font-bold ${
                          pq.difficulty === 'Easy' ? 'text-emerald-700' : pq.difficulty === 'Medium' ? 'text-amber-700' : 'text-rose-700'
                        }`}>
                          {pq.difficulty}
                        </span>
                      </div>
                      <h4 className="font-display text-base font-bold text-slate-900">
                        {pq.title}
                      </h4>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyToClipboard(pq.sql, `pq-${pq.number}`)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition shadow-2xs"
                  >
                    {copiedId === `pq-${pq.number}` ? (
                      <>
                        <CheckCheck className="h-3 w-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 text-slate-500" />
                        <span>Copy Solution</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong className="text-slate-900">Problem: </strong>
                  <span>{pq.problem}</span>
                </div>

                <pre className="p-3.5 rounded-xl bg-slate-900 text-emerald-300 font-mono-code text-[12px] overflow-x-auto leading-relaxed border border-slate-800">
                  {pq.sql}
                </pre>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 text-xs">
                  <span className="text-slate-600">
                    <strong className="text-slate-800">Technique: </strong>
                    {pq.explanation}
                  </span>
                  <span className="font-mono-code text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Key: {pq.keyTakeaway}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────── SECTION 4: THE 7 CLASSIC SQL TRAPS ───────────────── */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                The 7 Deadly SQL Interview Traps
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Common edge cases where otherwise functional queries silently drop rows or fail.
              </p>
            </div>
            <span className="text-xs font-mono-code font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Crucial Traps
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {SQL_TRAPS.map((trap) => {
              const isExpanded = !!expandedTraps[trap.number];

              return (
                <div
                  key={trap.number}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleTrap(trap.number)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100 text-rose-800 font-mono-code font-bold text-xs">
                        !{trap.number}
                      </span>
                      <div>
                        <div className="text-[11px] font-mono-code text-rose-600 font-semibold uppercase">
                          Trap #{trap.number} · {trap.category}
                        </div>
                        <h4 className="font-display text-base font-bold text-slate-900">
                          {trap.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline-block text-xs font-mono-code text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {trap.risk}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-5 pt-0 border-t border-slate-100 space-y-4">
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4">
                        {trap.explanation}
                      </p>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-mono-code">
                        {/* Wrong SQL */}
                        <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200 space-y-2">
                          <div className="font-bold text-rose-800 flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-rose-500" />
                            <span>Dangerous / Buggy SQL</span>
                          </div>
                          <pre className="text-slate-800 overflow-x-auto leading-relaxed">
                            {trap.wrongSql}
                          </pre>
                        </div>

                        {/* Correct SQL */}
                        <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                          <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            <span>Correct / Production SQL</span>
                          </div>
                          <pre className="text-slate-800 overflow-x-auto leading-relaxed">
                            {trap.correctSql}
                          </pre>
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
