# PHASE 1 — FOUNDATIONS

**ML Engineer / Applied Scientist Roadmap · Levels 0–3 of 18**

> **Phase goal.** Build the engineering, computational, mathematical, and statistical foundations that every later level silently assumes. Nothing here is "preparation" to be rushed: a model that fails in production is usually failing because one of these four levels was skipped.

---

## Phase dashboard

| Item | Details |
|---|---|
| **Phase** | 1 — Foundations |
| **Levels** | L0 · L1 · L2 · L3 |
| **Difficulty** | Beginner → Intermediate |
| **Suggested duration** | 14–20 weeks (3.5–5 months) at 2–3 hours/day |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Main language** | Python 3.11+ |
| **Core tools** | VS Code, Git + GitHub, terminal, `uv`, `pytest`, NumPy, Pandas, Matplotlib, Jupyter |
| **Capstone projects** | 4 level capstones + 1 phase capstone |
| **Final outcome** | Write reliable Python software, compute with NumPy/Pandas at speed, derive the maths behind ML models, and reason statistically about data and uncertainty. |

**Prerequisites.** Basic computer literacy and a willingness to type code daily. No prior ML, no advanced maths beyond school algebra — Level 2 rebuilds everything from the ground up.

---

## How this phase is structured

Every level in this phase follows the same shape, so you always know where you are:

| Block | What it contains |
|---|---|
| **Dashboard** | Level, difficulty, duration, tools, project, outcome |
| **Numbered sections** (`0.1`, `0.2`, …) | One theme each |
| **Modules** (`0.1.1`, `0.1.2`, …) | The actual study checklist |
| **Practice tasks** | Small exercises that force retrieval, not re-reading |
| **Module completion gate** | The proof that the section is done |
| **Mini-project** | A small build inside the level |
| **Capstone** | The level's main artefact, with acceptance criteria |
| **Interview bank** | Questions you should be able to answer after the level |
| **Level assessment** | A checklist before you move on |

> **The rule of this phase:** you are allowed to move on when you can *build it* and *explain it*, not when you have *watched it*. Every module ends with a gate for exactly this reason.

---

## Contents

| Level | Title | Sections | Duration | Capstone |
|---|---|---|---|---|
| [L0](#level-0--software-engineering-fundamentals) | Software Engineering Fundamentals | 0.1 – 0.10 | 4–6 weeks | ML Data Quality Toolkit |
| [L1](#level-1--python-and-scientific-computing) | Python and Scientific Computing | 1.1 – 1.10 | 3–4 weeks | Vectorised Scientific Computing Library |
| [L2](#level-2--mathematics-for-machine-learning) | Mathematics for Machine Learning | 2.1 – 2.9 | 4–6 weeks | Maths Engine from Scratch |
| [L3](#level-3--probability-and-statistics) | Probability and Statistics | 3.1 – 3.9 | 3–5 weeks | Statistical Inference Toolkit |
| [Phase capstone](#phase-1-capstone--foundations-lab) | Integration project | — | 1–2 weeks | `foundations-lab` |

---

# LEVEL 0 — SOFTWARE ENGINEERING FUNDAMENTALS

> **Goal.** Build the programming and software engineering skills needed to write, test, debug, and maintain real machine-learning code.

## Level dashboard

| Item | Details |
|---|---|
| **Level** | 0 — Software Engineering Fundamentals |
| **Difficulty** | Beginner → Intermediate |
| **Suggested duration** | 4–6 weeks |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Main language** | Python |
| **Core tools** | VS Code, Git, GitHub, terminal, `pytest` |
| **Main project** | A tested, reusable **ML Data Quality Toolkit** |
| **Final outcome** | Write reliable Python software that is ready to support future ML projects. |

**Prerequisites.** Basic computer use and willingness to learn programming. You do not need previous ML knowledge.

---

## 0.1 — Python Core

**Objective.** Become comfortable writing Python programs without depending on tutorials for every step.

### Module 0.1.1 — Python syntax and fundamentals

- Understand variables and assignment, and what a name actually points to.
- Learn integers, floats, strings, booleans, and the difference between `int` and `float` division.
- Understand type conversion (`int()`, `float()`, `str()`, `bool()`) and when it silently loses information.
- Use arithmetic, comparison, and logical operators, including operator precedence.
- Understand `None` and truthy/falsy values (`0`, `""`, `[]`, `{}` are falsy — know why that matters in `if`).
- Use `if`, `elif`, and `else`, including nested and chained comparisons.
- Use `for` and `while` loops; iterate over ranges, strings, lists, and dictionaries.
- Understand `break`, `continue`, `pass`, and `range()` with start/stop/step.
- Use `input()` and formatted strings — f-strings, format specifiers such as `{value:.2f}`.
- Read error messages and understand basic exceptions (`NameError`, `TypeError`, `ValueError`, `IndexError`).

**Practice tasks**

- Write a program to check whether a number is prime.
- Build a number-guessing game with attempt counting and input validation.
- Calculate the mean, minimum, and maximum of a list without using `statistics`.
- Count vowels, words, and characters in a string.
- Build a simple menu-driven calculator that loops until the user quits.

---

### Module 0.1.2 — Python data structures

- **Lists:** indexing, slicing, insertion, deletion, sorting, reversing, and `sort` versus `sorted`.
- **Tuples:** immutability, unpacking, and using tuples as dictionary keys.
- **Dictionaries:** keys, values, lookup, update, iteration, `get`, and `setdefault`.
- **Sets:** uniqueness, membership tests, unions, intersections, and differences.
- **Strings:** common methods, slicing, joining, splitting, and formatting.
- List, dictionary, and set comprehensions — including when a loop is more readable.
- Nested data structures: lists of dicts, dicts of lists, and how to navigate them.
- Mutable versus immutable objects, and why tuples can be hashable while lists cannot.
- Object references: the difference between copying, shallow copying, and aliasing.
- Basic iterator and generator concepts; the difference between a list and a generator.

**Practice tasks**

- Count the frequency of words in a text and report the top 10.
- Find duplicates in a list — once with a set, once preserving order.
- Group student records by department using a dictionary.
- Sort records by multiple fields (for example, department ascending, score descending).
- Remove duplicates from a list while preserving order, and explain the complexity.
- Process a list of dictionaries representing dataset records: filter, transform, aggregate.

---

### Module 0.1.3 — Functions

- Define and call functions; understand parameters and return values.
- Use positional and keyword arguments, and know when keyword arguments improve clarity.
- Understand default arguments and the danger of mutable defaults such as `def f(x, acc=[])`.
- Use `*args` and `**kwargs` to write flexible wrappers.
- Understand local, enclosing, global, and built-in scope (the LEGB rule).
- Write docstrings that state inputs, outputs, and raised exceptions.
- Learn type hints, including `list[str]`, `dict[str, float]`, and `Optional`.
- Understand pure functions and side effects; prefer pure functions inside data pipelines.
- Break large problems into small functions with one reason to change.

**Practice tasks**

- Write reusable functions for mean, median, variance, and standard deviation.
- Write a function that validates a dataset's column names against a required list.
- Build a reusable input-validation function used by three different scripts.
- Refactor a long (100+ line) program into smaller functions with a clear call graph.

---

### Module 0.1.4 — Files and exceptions

- Read and write text files, and understand encoding problems with non-ASCII text.
- Use context managers with `with` so files close even when an error occurs.
- Work with CSV and JSON files using `csv` and `json`, and know their limitations.
- Work with file paths using `pathlib` instead of string concatenation.
- Handle exceptions with `try`, `except`, `else`, and `finally`.
- Raise appropriate exceptions using `raise`, with informative messages.
- Distinguish invalid user input (expected, recoverable) from programming errors (bugs).
- Avoid silently swallowing exceptions with bare `except:`.

**Practice tasks**

- Read a CSV file and summarize its contents (rows, columns, missing values per column).
- Save program output to JSON with a stable key order.
- Handle missing files gracefully and return a helpful message instead of a traceback.
- Validate JSON input and report which record is malformed and why.
- Create a program that logs invalid records and continues processing the rest.

---

### Module 0.1.5 — Python problem-solving

- Convert a problem statement into smaller steps before writing code.
- Write pseudocode before implementing complex logic.
- Test normal cases, edge cases, and invalid inputs.
- Trace code manually — variables, values, and state — instead of guessing.
- Explain *why* a solution works, not only *what* it does.
- Compare two solutions for clarity and performance.

> **Module completion gate (0.1).** Solve at least **15 small Python problems independently**. Be able to explain your code without re-reading a tutorial.

---

## 0.2 — Data Structures and Algorithms

**Objective.** Understand how to organise data and solve programming problems efficiently.

You do not need to become a competitive-programming expert in this phase. You do need enough foundation for coding interviews and for processing data efficiently.

### Module 0.2.1 — Complexity analysis

- Understand what an algorithm is and what makes one better than another.
- Learn time complexity and count operations rather than wall-clock seconds.
- Learn space complexity, including the cost of building intermediate lists.
- Understand Big-O notation and why constants are dropped.

$$
O(1) \;<\; O(\log n) \;<\; O(n) \;<\; O(n\log n) \;<\; O(n^2) \;<\; O(2^n)
$$

- Analyse single loops, nested loops, and loops whose range shrinks each iteration.
- Understand the **average** cost of dictionary and set operations ($O(1)$ average, $O(n)$ worst case).
- Learn why algorithm choice dominates micro-optimisations at large $n$.

**Practice.** For five functions you have already written, state the complexity and one input size where it would become a problem.

---

### Module 0.2.2 — Essential data structures

- Arrays and Python lists: contiguous storage, indexing, amortised append cost.
- Strings and string-processing patterns: building output with `join`, not `+=` in a loop.
- Hash maps and hash sets: what a hash function does and why collisions matter.
- Stacks (LIFO) and queues (FIFO), and the cost of `pop(0)` on a list.
- Linked-list concepts: nodes, pointers, traversal, and why Python rarely uses them.
- Heaps and priority queues via `heapq`; when a heap beats sorting.
- Trees and binary search trees: ordering property, depth, and balancing intuition.
- Graph fundamentals: nodes, edges, directed versus undirected, adjacency list representation.

---

### Module 0.2.3 — Essential algorithms

- Linear search versus binary search, and the sorted-input requirement of the latter.
- Sorting algorithms and their trade-offs: insertion, merge, quick, and Python's Timsort.
- Two-pointer technique on sorted arrays and strings.
- Sliding-window technique for contiguous-subarray problems.
- Frequency counting with dictionaries and `collections.Counter`.
- Recursion, base cases, and recursion depth limits.
- Tree traversal: pre-order, in-order, post-order, BFS by level.
- Graph traversal: DFS and BFS, visited sets, and cycle detection.
- Basic greedy algorithms and when greedy is *wrong*.
- Introductory dynamic programming: overlapping subproblems and memoisation.

---

### Module 0.2.4 — Coding practice

Complete approximately **25–35 carefully selected problems**:

- 5 problems on arrays and strings.
- 5 problems on dictionaries and sets.
- 5 problems on sorting and searching.
- 5 problems on stacks, queues, or heaps.
- 5 problems on recursion, trees, or graphs.
- 5 additional problems targeting your weakest areas.

For every problem, record:

1. The simplest correct approach.
2. The improved approach, if one exists.
3. Time and space complexity.
4. Edge cases considered.
5. Why the solution works, in two sentences.

> **Module completion gate (0.2).** Solve common easy-level problems independently and make a reasonable attempt at intermediate problems. You should be able to **discuss complexity**, not merely produce code.

---

## 0.3 — Modules, Object-Oriented Programming, and Project Structure

**Objective.** Move from writing isolated scripts to building reusable software.

### Module 0.3.1 — Modules and packages

- Understand Python modules and how `import` resolves names.
- Import functions and classes correctly, including `from x import y as z`.
- Understand the purpose of `__init__.py` in modern (namespace-aware) Python.
- Separate application code from utility functions.
- Understand Python's module search path at a basic level (`sys.path`).
- Use the `if __name__ == "__main__":` pattern to separate library code from scripts.
- Avoid circular imports by moving shared types into a common module.
- Design a clear folder structure that a stranger can navigate.

---

### Module 0.3.2 — Object-oriented programming

- Understand classes and objects as blueprints and instances.
- Define attributes and methods; understand `self` and `__init__`.
- Learn instance attributes versus class attributes, and the shared-mutable bug.
- Understand encapsulation: what should be private and what should be public.
- Learn inheritance and composition — and why composition is usually the safer default.
- Understand polymorphism through a shared interface (duck typing).
- Recognise when a simple function is better than a class.
- Learn useful special methods such as `__repr__`, `__eq__`, and `__len__`.
- Understand dataclasses and when they replace boilerplate classes.

---

### Module 0.3.3 — Software design

- Separate responsibilities between modules: loading, validating, computing, reporting.
- Avoid repeated code without creating premature abstractions.
- Design functions with clear inputs, documented outputs, and no hidden global state.
- Keep configuration separate from application logic.
- Understand basic separation of concerns.
- Recognise tightly coupled code and the symptoms (one change breaks five files).
- Learn basic dependency injection: pass collaborators in rather than constructing them inside.
- Design errors and return values consistently across the project.

---

### Module 0.3.4 — Type safety and documentation

- Add type hints to public functions and important internal ones.
- Use `Optional`/`| None` and union types where a value may be absent.
- Understand basic generic types such as `list[str]` and `dict[str, float]`.
- Write useful docstrings that state purpose, parameters, returns, and raises.
- Document expected inputs and outputs, including shapes and units.
- Document exceptions a function may raise.
- Learn the basics of static type checking with `mypy` and understand that hints do not enforce anything at runtime.

---

### Mini-project — Dataset validation package

Create a small Python package with this structure:

```text
ml_data_tools/
├── pyproject.toml
├── README.md
├── src/
│   └── ml_data_tools/
│       ├── __init__.py
│       ├── loader.py
│       ├── validation.py
│       ├── statistics.py
│       └── exceptions.py
└── tests/
    ├── test_loader.py
    ├── test_validation.py
    └── test_statistics.py
```

- Load a CSV file from a path.
- Check that required columns exist and report the missing ones.
- Validate basic data types per column.
- Calculate summary statistics for numeric columns.
- Raise clear, custom errors for invalid data.
- Separate each responsibility into a suitable module.
- Add type hints and docstrings.
- Write a README with usage examples.

> **Module completion gate (0.3).** A user can `import` your package and call its functions without copying code out of your notebook.

---

## 0.4 — Git and GitHub

**Objective.** Track changes, collaborate safely, and maintain a professional project repository.

### Module 0.4.1 — Git fundamentals

- Understand repositories and the three areas: working directory, staging area, commit history.
- Use `git init` and `git clone`.
- Use `git status`, `git add`, and `git commit` with meaningful messages.
- Inspect changes using `git diff` and `git diff --staged`.
- Read commit history using `git log --oneline --graph`.
- Understand `.gitignore` and why data, environments, and secrets stay out of history.
- Learn branches, switching, and merging.
- Resolve basic merge conflicts by reading the markers.
- Undo changes safely: `restore`, `checkout`, and `stash`.
- Understand the difference between `revert` (history-preserving) and `reset` (history-rewriting).

---

### Module 0.4.2 — GitHub workflow

- Create a GitHub repository and connect a local remote.
- Push and pull changes, and understand what a rejected push means.
- Open and review pull requests; give and receive review comments.
- Understand issues, labels, and project boards.
- Write a clear README with installation, usage, and limitations.
- Use tags and releases at a basic level.
- Understand GitHub Actions conceptually — workflows, jobs, and steps.
- Never commit passwords, API keys, tokens, or private credentials.

### Module completion task

- Create a repository for your data validation package.
- Make changes through a feature branch.
- Write clear commits that each do one thing.
- Open and merge a pull request.
- Resolve a deliberately created merge conflict in a practice repository.
- Document installation and usage.

> **Module completion gate (0.4).** You can manage your project history without losing work and explain the purpose of each main Git operation.

---

## 0.5 — Debugging, Logging, and Testing

**Objective.** Learn how to prove that your code works and diagnose why it fails.

> This matters disproportionately in ML: a silent error in data processing can corrupt every model trained afterwards, and nobody sees a crash — only a metric that is quietly wrong.

### Module 0.5.1 — Debugging

- Read Python tracebacks from the **bottom upward**, starting at the last frame in your code.
- Distinguish syntax errors, runtime errors, and logical errors.
- Use breakpoints and the debugger instead of adding `print` everywhere.
- Inspect variables, call stack, and expressions during execution.
- Reproduce a bug with a minimal example before attempting a fix.
- Check assumptions about input shapes, types, and units.
- Use `assert` for internal invariants that must never be false.
- Investigate errors instead of applying random fixes and hoping.

---

### Module 0.5.2 — Logging

- Learn the Python `logging` module: loggers, handlers, formatters, levels.
- Understand DEBUG, INFO, WARNING, ERROR, and CRITICAL, and choose levels deliberately.
- Log important program events: start, inputs summary, decisions, completion, counts.
- Include useful context — file name, row number, record ID — in messages.
- Avoid logging secrets, credentials, or personal data.
- Understand why `print()` is not a complete logging strategy (no levels, no rotation, no timestamps).

---

### Module 0.5.3 — Unit testing with pytest

- Write your first pytest test and run it from the terminal.
- Test functions independently, in isolation from external systems.
- Use plain `assert` statements and understand pytest's failure output.
- Test exceptions with `pytest.raises`.
- Parameterise tests with `@pytest.mark.parametrize` to cover many cases cheaply.
- Use fixtures for shared setup and teardown.
- Test edge cases and invalid inputs, not only the happy path.
- Understand test isolation and why global state breaks it.
- Learn mocking at a basic level with `monkeypatch` or `unittest.mock`.
- Measure coverage with `pytest --cov` without treating coverage as proof of correctness.

---

### Module 0.5.4 — Testing data-processing code

- Test empty datasets and empty files.
- Test missing columns and unexpected extra columns.
- Test duplicate rows and duplicate index values.
- Test invalid numeric values, mixed types, and strings in numeric columns.
- Test unexpected data types and schema drift.
- Test missing-value handling, including all-missing columns.
- Test that output schemas are consistent across runs.
- Test that invalid inputs produce clear, actionable errors.

---

### Mini-project — Break and repair a data-processing pipeline

- Write a simple CSV processing script (load → clean → aggregate → write).
- Introduce **five different bugs**: an off-by-one filter, a wrong column, a silent type coercion, a mishandled missing value, and a unit error.
- Reproduce each bug with a minimal example.
- Write tests that detect each failure.
- Fix the bugs.
- Add regression tests that prevent the same errors from returning.
- Document what caused each problem and how you found it.

> **Module completion gate (0.5).** You can demonstrate a bug, explain its cause, fix it, and show a test that would catch it in the future.

---

## 0.6 — Command Line and Linux Basics

**Objective.** Become comfortable working outside an IDE, running scripts, and managing files and processes.

### Checklist

- Navigate directories using `pwd`, `cd`, and `ls` (including `ls -la`).
- Create and remove files and directories (`mkdir`, `touch`, `rm`, `rmdir`).
- Copy and move files (`cp`, `mv`).
- Read files using `cat`, `less`, `head`, and `tail -f` for logs.
- Search file contents using `grep`, including `grep -r` and `grep -n`.
- Find files using `find` and `fd`.
- Redirect output with `>`, `>>`, and `2>`, and suppress with `/dev/null`.
- Understand pipes and chain commands (`grep | sort | uniq -c | sort -rn`).
- Use environment variables and `export`.
- Run Python scripts from a terminal and pass arguments with `argparse`.
- Understand process IDs and basic process management (`ps`, `top`, `kill`).
- Understand file permissions, `chmod`, and why `chmod +x` is needed for scripts.
- Learn basic shell scripting with variables, conditionals, and exit codes.
- Understand absolute versus relative paths, and `.` and `..`.
- Recognise exit codes and command failures when a program returns a non-zero status.

### Practice tasks

- Run your package's tests from the terminal.
- Write a script that processes a CSV file passed as a command-line argument.
- Save program logs to a file and tail them while the program runs.
- Search a project for a specific function name or error message with `grep -rn`.
- Write a shell script that runs tests and reports failure with a non-zero exit code.
- Understand the basics of using a remote Linux machine over SSH.

> **Module completion gate (0.6).** You can run, test, and troubleshoot a Python project without relying on IDE buttons.

---

## 0.7 — Environments and Dependency Management

**Objective.** Make your code reproducible on another computer — including future-you.

### Checklist

- Understand Python versions and package versions, and why both matter.
- Create virtual environments with `venv` (and know why system Python is off-limits).
- Activate and deactivate an environment, and verify which interpreter is active.
- Install packages with `pip`, or manage projects with `uv` for speed and lockfiles.
- Understand `requirements.txt` and its limitations.
- Learn the basics of `pyproject.toml`: project metadata, dependencies, build system.
- Understand dependency constraints (`==`, `>=`, `~=`) and the risk of unbounded ranges.
- Separate runtime dependencies from development dependencies.
- Install your own package in editable mode (`pip install -e .`).
- Understand environment variables and configuration files for settings.
- Keep secrets outside source code, using `.env` files that are git-ignored.
- Recreate an environment from documented dependencies on a clean machine.
- Diagnose package version conflicts by reading resolver output.
- Understand why reproducibility matters for experiments and audits.

### Practice task

- Create a fresh environment from scratch.
- Install your package and its dependencies using only your written instructions.
- Run all tests.
- Follow your own README as if you were a stranger.
- Record and fix any missing installation steps.

> **Module completion gate (0.7).** Another developer can reproduce your development environment using your instructions alone.

---

## 0.8 — HTTP, REST APIs, and JSON

**Objective.** Learn the basics of connecting software components. You will use these skills later to serve ML predictions through APIs.

### Checklist

- Understand clients and servers, and the request/response model.
- Learn HTTP requests and responses: method, URL, headers, body, status.
- Understand GET, POST, PUT, PATCH, and DELETE, and the idea of idempotency.
- Learn common HTTP status codes: 200, 201, 400, 401, 403, 404, 422, 429, 500.
- Understand JSON objects, arrays, strings, numbers, booleans, and `null`.
- Send requests using Python's `requests` library and inspect the response object.
- Parse JSON responses and handle malformed or missing fields.
- Handle network errors, timeouts, and retries at a basic level.
- Validate incoming data before using it.
- Understand basic REST API design: resources, endpoints, and consistent naming.
- Learn what authentication is: API keys, bearer tokens, and headers.
- Understand why API keys should never be committed to Git.
- Recognise basic API input-validation and error-handling patterns.

### Mini-project — Dataset summary API

Create a small API using **FastAPI**:

- An endpoint that accepts dataset information (rows, columns, types).
- Request validation with Pydantic models.
- A JSON summary response: counts, missing percentages, per-column types.
- Appropriate error responses with clear messages.
- Tests for valid and invalid requests.
- Generated documentation at `/docs`.
- Run the service locally and send requests to it with `curl` and `requests`.

> **Module completion gate (0.8).** You can explain how a client sends data to a service and how the service validates and returns a response.

---

## 0.9 — Code Quality and Professional Development Practices

**Objective.** Bring the previous skills together into code that is easy to maintain.

### Checklist

- Follow consistent Python naming conventions (PEP 8): `snake_case`, `PascalCase`, `UPPER_CASE`.
- Write short, focused functions with one reason to change.
- Avoid unnecessary duplication — but do not abstract two similar lines prematurely.
- Use type hints consistently across the public surface.
- Write meaningful docstrings, not restatements of the function name.
- Format code using **Ruff** (or Black) and let the tool settle style arguments.
- Run lint checks and fix warnings rather than disabling them.
- Separate configuration from implementation.
- Use structured logging rather than scattered `print`.
- Write meaningful tests that assert behaviour, not implementation details.
- Understand basic code review: read the diff, ask questions, verify behaviour.
- Review code for readability and maintainability, not only correctness.
- Add a continuous integration workflow that runs format, lint, type-check, and tests.
- Document installation, usage, and known limitations.
- Make project execution reproducible from a single documented command.
- Understand the basics of software licensing and third-party dependency risk.

### Final quality check

- The project installs from documented instructions.
- Tests run successfully from the command line.
- Formatting and lint checks pass.
- Invalid inputs are handled clearly.
- No secrets are stored in the repository.
- The README includes a working example.
- The repository contains no unnecessary generated files.
- A fresh user can understand the project structure.

---

## 0.10 — Level 0 Capstone: ML Data Quality Toolkit

### Project: ML Data Quality Toolkit

**Difficulty.** Intermediate

**Purpose.** Build a reusable Python package that checks whether a dataset is ready for machine learning.

This is far more useful than another calculator, because it introduces problems that return throughout the roadmap: data validation, missing values, incorrect types, reproducibility, error handling, and testing.

### A. Functional requirements

**Data loading**

- Load CSV files from a given path.
- Report useful errors when a file does not exist.
- Detect empty files and empty datasets.
- Support a configurable delimiter and encoding.
- Validate basic file-reading options.

**Data validation**

- Check whether required columns exist.
- Report missing and unexpected columns.
- Check column data types against an expected schema.
- Count missing values per column.
- Detect duplicate rows.
- Report invalid numeric values (for example, `"N/A"` in an `age` column).
- Support simple user-defined validation rules.

**Data profiling**

- Report row and column counts.
- Summarize numeric columns: count, mean, std, min, quartiles, max.
- Summarize categorical columns: unique count, top values, frequency.
- Calculate missing-value percentages.
- Report duplicate counts.
- Identify constant and near-constant columns.
- Generate a readable summary report.

**Software engineering**

- Organise the package into modules.
- Add type hints and docstrings.
- Create custom exceptions where useful.
- Add unit tests.
- Add logging.
- Configure dependencies in `pyproject.toml`.
- Add formatting and lint checks.
- Create a GitHub repository.
- Write complete installation instructions.
- Provide a command-line interface.
- Add continuous integration to run tests automatically.

### B. Suggested architecture

```text
CSV file / user input
        │
        ▼
   Data Loader  ──►  Schema Validator  ──►  Quality Checks
        │                    │                    │
        │                    ▼                    ▼
        │             Error handling        Data Profiler
        │                    │                    │
        └────────────────────┴────────►  Report Generator
                                             │
                                             ▼
                              Console / JSON / HTML report

Every stage wrapped by:  logging  ·  custom exceptions  ·  pytest suite  ·  CI workflow
```

### C. Suggested repository structure

```text
ml-data-quality-toolkit/
├── pyproject.toml
├── README.md
├── LICENSE
├── .gitignore
├── src/
│   └── ml_data_quality/
│       ├── __init__.py
│       ├── cli.py
│       ├── loader.py
│       ├── schema.py
│       ├── checks.py
│       ├── profiler.py
│       └── exceptions.py
├── tests/
│   ├── test_loader.py
│   ├── test_schema.py
│   ├── test_checks.py
│   └── test_profiler.py
├── examples/
│   └── example_usage.py
└── .github/
    └── workflows/
        └── tests.yml
```

### D. Stretch goals

Attempt these only after the main requirements work.

- Export reports as JSON.
- Generate an HTML report.
- Support configurable validation schemas loaded from YAML.
- Add a FastAPI endpoint for dataset summaries.
- Add property-based tests using Hypothesis.
- Benchmark the tool on larger CSV files (100k+ rows).
- Compare memory use across different processing approaches.

### E. Capstone acceptance criteria

| Area | Required evidence |
|---|---|
| **Correctness** | Tests cover normal, invalid, and edge-case inputs. |
| **Design** | Modules have clear responsibilities and no circular imports. |
| **Reliability** | Errors are informative and handled consistently. |
| **Reproducibility** | A fresh environment can install and run the package. |
| **Maintainability** | Type hints, documentation, and formatting are present. |
| **Professional practice** | Git history, README, and automated tests are available. |
| **Demonstration** | A sample dataset produces a useful report. |

> Level 0 is complete when the **core requirements** pass. Stretch goals are optional.

---

## Level 0 interview question bank

Prepare for questions in four groups: Python and coding, software engineering, debugging scenarios, and coding exercises.

### A. Python fundamentals

- What is the difference between a list and a tuple?
- What is the difference between a set and a dictionary?
- What does mutable versus immutable mean, and why does it matter for function defaults?
- What is the difference between `==` and `is`?
- What is the difference between `append()` and `extend()`?
- What are list comprehensions, and when is a plain loop clearer?
- What are `*args` and `**kwargs`?
- What is a generator, and how does it differ from a list?
- What is a decorator, and what problem does it solve?
- What is the purpose of `self`?
- What is the difference between a class attribute and an instance attribute?
- What are exceptions, and when should you raise them?
- What is a context manager, and what does `with` guarantee?
- What does `if __name__ == "__main__":` do?
- What are type hints, and do they enforce types automatically?

### B. Data structures and algorithms

- What is Big-O notation, and what does it deliberately ignore?
- What is the average lookup complexity of a Python dictionary? Why?
- Why can a set be useful for removing duplicates?
- When would you use a heap instead of sorting a full list?
- What is the difference between a stack and a queue?
- When can binary search be used, and what does it require?
- What is the difference between BFS and DFS, and when is each better?
- What is recursion, and what is a base case?
- How would you find the most frequent elements in a list?
- How would you detect duplicates efficiently?
- How would you find the top $k$ largest elements, and at what cost?
- How would you process a large file without loading everything into memory?

### C. Software engineering

- What is the difference between a module and a package?
- Why should code be split into functions?
- What is the difference between composition and inheritance?
- What is unit testing?
- What is the difference between unit and integration tests?
- What is a mock, and when would you use one?
- What is a regression test?
- Why is logging useful compared with `print`?
- What is the difference between an exception and a logged error?
- Why do we use virtual environments?
- What problem does Git solve?
- What is a merge conflict, and how do you resolve one?
- What is continuous integration?
- Why should credentials never be committed to Git?
- What makes a good README?

### D. Debugging scenarios

- A function returns the wrong result for an empty list. How would you investigate it?
- Your tests pass locally but fail in continuous integration. What would you check?
- A package works in your notebook but fails when imported from a script. Why might that happen?
- A program uses too much memory when reading a large CSV file. How would you investigate it?
- A dependency upgrade breaks the project. How would you identify and resolve the issue?
- Your program catches every exception and continues. Why could this be dangerous?
- Two developers modify the same file on different Git branches. How would you resolve the conflict?
- A test passes on your machine but fails on another computer. What sources of nondeterminism or environment differences would you investigate?

### E. Coding interview exercises

- Reverse a string without using a built-in reverse method.
- Count the frequency of each word in a paragraph.
- Find the first non-repeating character in a string.
- Merge two sorted lists.
- Find duplicate elements in a list.
- Implement binary search.
- Check whether brackets are balanced.
- Find the top $k$ most frequent values.
- Write a function that validates a list of records against a schema.
- Read a large CSV file in chunks and compute summary statistics.
- Write unit tests for a function that removes missing values.
- Debug a function with an incorrect boundary condition.

### Interview readiness standard

For every question, aim to:

1. Explain the concept in simple language.
2. Give a practical example.
3. Write code when appropriate.
4. Explain edge cases.
5. Discuss time and space complexity when relevant.

> You do not need perfect answers immediately. Keep a list of questions you cannot answer, study them, and attempt them again without notes.

---

## Level 0 final assessment

### Knowledge

- I understand Python fundamentals and core data structures.
- I can write functions and organise code into modules.
- I understand basic object-oriented programming.
- I can explain time and space complexity.
- I understand Git, testing, logging, and debugging.
- I can work with virtual environments and dependencies.
- I understand basic HTTP and JSON.

### Practical skills

- I have solved at least 15 small Python problems.
- I have practised approximately 25–35 algorithm problems.
- I have built a reusable Python package.
- I have written unit tests for important functions.
- I have used Git branches and resolved a merge conflict.
- I can run tests from the terminal.
- I can recreate the project's environment from its documentation.

### Project

- My **ML Data Quality Toolkit** meets the core acceptance criteria.
- The README explains installation and usage.
- The repository has a clean structure.
- Automated tests pass.
- I can explain the design and important implementation decisions.
- I can demonstrate the project without following a tutorial step by step.

> **Level 0 completion rule.** Aim to satisfy all core requirements. If you can write reliable Python code, test it, debug it, organise it into a package, and explain your decisions, you are ready for Level 1.

---

# LEVEL 1 — PYTHON AND SCIENTIFIC COMPUTING

> **Goal.** Move from "Python that runs" to "Python that computes correctly and fast": array thinking, tabular wrangling, numerical stability, visualisation, profiling, and reproducibility.

## Level dashboard

| Item | Details |
|---|---|
| **Level** | 1 — Python and Scientific Computing |
| **Difficulty** | Beginner → Intermediate |
| **Suggested duration** | 3–4 weeks |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Main libraries** | NumPy, Pandas, Polars, DuckDB, Matplotlib, SciPy, PyTorch (tensors only) |
| **Main project** | A **vectorised scientific computing library** with benchmarks |
| **Final outcome** | Write vectorised, numerically stable, reproducible scientific code that is fast enough to iterate on real datasets. |

**Prerequisites.** Level 0 — you can write functions, packages, and tests, and use Git and the terminal.

---

## 1.1 — NumPy and Array Thinking

**Objective.** Stop writing loops over data. Learn to think in arrays, shapes, and axes.

### Module 1.1.1 — Arrays, shapes and dtypes

- Create arrays with `np.array`, `zeros`, `ones`, `arange`, `linspace`, `full`.
- Understand `shape`, `ndim`, `size`, `dtype`, and `itemsize`.
- Understand dtype behaviour: `int64` overflow, `float32` versus `float64`, casting rules.
- Understand how a NumPy array differs from a Python list in memory layout.
- Use `reshape`, `ravel`, `flatten`, `transpose`, and `squeeze`.
- Distinguish **views** from **copies**, and why modifying a slice can mutate the original.
- Understand C order versus Fortran order at a practical level.

$$
\text{memory} = \prod_i d_i \times \text{itemsize bytes}
$$

**Practice tasks**

- Compute the memory footprint of a $10^6 \times 100$ `float64` array and convert it to `float32`.
- Create a $4\times3\times2$ array and print its shape after three different reshapes.
- Demonstrate the view-versus-copy difference with one reproducible example.

---

### Module 1.1.2 — Indexing, slicing and masks

- Use basic slicing, integer indexing, and negative indices.
- Use boolean masks and combine them with `&`, `|`, `~` (and parentheses).
- Use fancy indexing with index arrays.
- Use `np.where` for conditional selection.
- Use `np.take`, `np.take_along_axis`, and `np.argpartition` for top-$k$ work.
- Understand why chained indexing (`a[mask][0] = 1`) silently fails to write.

**Practice tasks**

- Select all rows where a numeric column exceeds its mean and a category column matches one of three values.
- Extract the top 10 values and their original indices from an array.
- Replace all negative values with zero without a Python loop.

---

### Module 1.1.3 — Broadcasting and vectorisation

- Understand broadcasting rules: align shapes from the right; dimensions must match or be 1.
- Apply broadcasting to standardise columns, compute pairwise distances, and add bias vectors.
- Understand why a Python loop over $10^7$ elements is 50–200× slower than a vectorised expression.
- Recognise the patterns that force a loop (running state, early exit) and how to restructure them.

$$
\text{out}_{ij} = x_{ij} - \mu_j \quad\text{with}\quad x\in\mathbb{R}^{n\times d},\ \mu\in\mathbb{R}^{d}
$$

**Practice tasks**

- Standardise every column of a matrix in one expression and verify against `sklearn`'s scaler.
- Compute the full pairwise Euclidean distance matrix between 1,000 points without loops.

$$
D_{ij}=\sqrt{\sum_k (A_{ik}-B_{jk})^2}
$$

- Implement a moving average with `np.cumsum` instead of a loop, and explain the complexity change.

---

### Module 1.1.4 — Aggregation, axes and grouping

- Use `sum`, `mean`, `std`, `min`, `max`, `argmin`, `argmax`, and `cumsum` with an `axis` argument.
- Understand that `axis=0` reduces rows (per-column statistics) and `axis=1` reduces columns.
- Use `np.median`, `np.percentile`, and `np.quantile` and know what interpolation does.
- Handle `NaN` correctly with `np.nanmean`, `np.nansum`, and masked arrays.
- Understand numerical accumulation error in naive summation, and why pairwise summation helps.

$$
\bar{x}=\frac{1}{n}\sum_{i=1}^{n}x_i,\qquad
s^2=\frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})^2
$$

**Practice tasks**

- Compute per-column mean and standard deviation and confirm against Pandas.
- Explain why `np.std` defaults to population standard deviation ($n$) while Pandas defaults to sample ($n-1$).

---

### Module 1.1.5 — Randomness and reproducibility

- Use the modern `np.random.default_rng(seed)` API rather than legacy `np.random.seed`.
- Generate uniform, normal, integer, and permutation samples.
- Sample without replacement and understand `shuffle` versus `permutation`.
- Understand that a seed fixes a stream, not a *result*, when call order changes.
- Understand the difference between statistical reproducibility and bitwise determinism.

**Practice tasks**

- Reproduce the same train/test split twice from stored seeds, and show what happens when you insert an extra random call before splitting.
- Write a helper that returns independent generators for data splitting, augmentation, and model initialisation.

---

> **Module completion gate (1.1).** You can take any small loop-based numerical function and rewrite it as a vectorised expression, then prove the outputs match.

---

## 1.2 — Pandas and Tabular Thinking

**Objective.** Load, inspect, reshape, join, and clean real tabular data reliably.

### Module 1.2.1 — Series, DataFrames and inspection

- Understand `Series` and `DataFrame` as indexed, typed arrays.
- Read data with `read_csv` using `dtype`, `usecols`, `na_values`, and `parse_dates`.
- Inspect with `head`, `info`, `describe`, `shape`, `dtypes`, and `value_counts`.
- Understand the index: default, named, and duplicated indexes.
- Understand `SettingWithCopyWarning` and how to avoid chained assignment.

**Practice tasks**

- Load a CSV with an explicit dtype mapping and reduce memory by 50% versus the default.
- Produce a 10-line profile: rows, columns, dtypes, missing counts, cardinality, duplicates.

---

### Module 1.2.2 — Selection, filtering and assignment

- Select with `loc` (label-based) and `iloc` (position-based), and know when each fails.
- Filter with boolean masks, `query`, and `isin`.
- Assign with `.loc` and `np.where`; avoid `.at` in loops.
- Sort with `sort_values` and `sort_index`.
- Create derived columns with `assign` for chainable pipelines.

**Practice tasks**

- Rewrite a five-line chained-assignment block as a single `assign` pipeline.
- Filter a dataset by three conditions and confirm row counts step by step.

---

### Module 1.2.3 — GroupBy and reshaping

- Understand the split–apply–combine model.
- Use `groupby` with `agg`, named aggregation, `transform`, and `filter`.
- Distinguish `agg` (reduces) from `transform` (broadcasts back to row count).
- Pivot with `pivot_table`, reshape with `melt`, stack, and unstack.
- Compute grouped shares and normalise within groups.

$$
\text{share}_{ij}=\frac{x_{ij}}{\sum_{j'} x_{ij'}}
$$

**Practice tasks**

- Compute revenue per region per month and the month-over-month growth rate.
- Add a `regional_share` column using `transform`, not a merge.
- Pivot long data into wide form and back, verifying the round trip is lossless.

---

### Module 1.2.4 — Joins, time series and missing data

- Merge with `inner`, `left`, `right`, `outer`, and check row-count changes deliberately.
- Detect and diagnose a **row explosion** from a many-to-many join.
- Use `merge_asof` for point-in-time joins.
- Parse dates, resample, and compute rolling and expanding statistics.
- Handle missing data: `isna`, `fillna`, `dropna`, forward/backward fill, and interpolation.
- Understand the difference between `NaN`, `None`, and `pd.NA`.

**Practice tasks**

- Join two tables and prove every row is accounted for.
- Build a daily series, resample to weekly, and compute a 4-week rolling mean.
- Create a point-in-time feature using `merge_asof` and explain why a plain merge would leak.

---

### Module 1.2.5 — Performance and pitfalls

- Convert object columns to `category` when cardinality is low.
- Use `eval`/`query` for large frames only when profiled.
- Understand why `apply` is slow and when `map`, `replace`, or vectorisation is better.
- Avoid `iterrows` for computation; use vectorised operations.
- Chunk large files with `chunksize` when memory is tight.

**Practice tasks**

- Take a DataFrame operation using `apply` and make it 10× faster without changing results.
- Measure memory before and after converting three object columns to `category`.

---

> **Module completion gate (1.2).** Given an unfamiliar CSV, you can produce a clean, typed, joined, and aggregated analysis in under an hour, with every row-count change explained.

---

## 1.3 — Working Beyond Memory: Polars and DuckDB

**Objective.** Handle datasets larger than RAM without reaching for a cluster.

### Checklist

- Understand why Pandas loads everything eagerly and how lazy execution changes that.
- Read Parquet and explain why it is smaller and faster than CSV.
- Use **Polars** `scan_parquet` with lazy frames and `.collect()`.
- Perform filter-pushdown and column selection before collection.
- Use **DuckDB** to query CSV and Parquet files directly with SQL.
- Understand partitioning (by date or category) and file-size trade-offs.
- Stream data in chunks and aggregate incrementally.
- Decide honestly when Spark is required and when it is overkill.

### Practice tasks

- Load a 2 GB Parquet dataset on a laptop with Polars, compute grouped aggregates, and measure peak memory.
- Answer the same question in DuckDB SQL and compare runtime.
- Repartition a dataset by date and show the improvement in query time for a single-date filter.

> **Module completion gate (1.3).** You can complete a real aggregation on a multi-GB dataset on a laptop, and explain the memory profile of your approach.

---

## 1.4 — Numerical Computing and Stability

**Objective.** Produce results that are correct, not merely computable.

### Module 1.4.1 — Floating point reality

- Understand IEEE-754 basics: sign, exponent, mantissa, and machine epsilon.
- Reproduce `0.1 + 0.2 != 0.3` and explain it in terms of binary representation.
- Understand catastrophic cancellation and why subtracting nearby large numbers destroys precision.
- Understand why adding many small numbers to a large accumulator loses them.
- Use `np.finfo`, `np.isclose`, and relative rather than absolute tolerance.

$$
\epsilon_{\text{mach}} \approx 2.22\times10^{-16} \ \text{(float64)},\qquad 1.19\times10^{-7}\ \text{(float32)}
$$

**Practice tasks**

- Show a sum where ordering changes the result by more than $10^{-9}$.
- Compare `abs(a-b) < 1e-8` with `np.isclose(a, b)` and explain when each is wrong.

---

### Module 1.4.2 — Stable computation patterns

- Computationally stable softmax via log-sum-exp.
- Safe logarithms: `np.log(np.maximum(p, eps))` and `np.log1p`.
- Use `expm1`, `log1p`, and `hypot` for small/large-value accuracy.
- Avoid dividing by zero with explicit handling, not by hoping.
- Normalise before accumulation when computing variances.
- Understand overflow/underflow in exponentiation and how to work in log space.

$$
\mathrm{softmax}(z_i)=\frac{e^{z_i-\max_j z_j}}{\sum_k e^{z_k-\max_j z_j}},\qquad
\log\sum_i e^{z_i}=m+\log\sum_i e^{z_i-m}
$$

**Practice tasks**

- Implement softmax naively and stably; show the naive version failing on logits of size 1000.
- Implement log-sum-exp from scratch and verify against `scipy.special.logsumexp`.
- Compute $\log(1+x)$ for $x=10^{-12}$ with and without `log1p`.

---

### Module 1.4.3 — Linear algebra with NumPy and SciPy

- Use `@`, `np.matmul`, and `np.einsum`, and understand when each is appropriate.
- Solve linear systems with `np.linalg.solve`, not by inverting matrices.
- Understand conditioning via `np.linalg.cond` and why solving is more stable than inverting.
- Use `lstsq` for overdetermined systems and understand rank deficiency.
- Compute QR, Cholesky, eigenvalue, and SVD decompositions.
- Understand the cost of each operation in terms of $n$.

$$
\text{solve } Ax=b:\ O(n^3),\qquad \text{QR}:\ O(n^3),\qquad \text{SVD}:\ O(n^3),\qquad \text{matrix-vector}:\ O(n^2)
$$

**Practice tasks**

- Solve a linear regression with `solve`, with `lstsq`, and by explicit inversion; compare residuals and conditioning.
- Compare your SVD-based PCA with `sklearn.decomposition.PCA`.

---

> **Module completion gate (1.4).** You can identify where a numeric pipeline loses precision, fix it, and prove the fix with a before/after comparison.

---

## 1.5 — Visualisation for Analysis

**Objective.** Make plots that answer a question instead of decorating a slide.

### Checklist

- Matplotlib object-oriented API: `fig`, `ax`, and why `plt.` state is a trap in multi-plot code.
- Line, scatter, bar, histogram, box, violin, heatmap, and pair plots.
- Choose an encoding: position beats length, length beats area, area beats colour.
- Label axes with units; remove chart junk; annotate the important point.
- Use colour-blind-safe palettes and consistent semantics across figures.
- Understand overplotting and fixes: alpha, jitter, hexbin, 2D histograms.
- Seaborn for statistical plots: `histplot`, `boxplot`, `heatmap`, `pairplot`.
- Save figures with `dpi` and `bbox_inches="tight"` for reproducibility.

### Practice tasks

- Build a 2×2 figure grid that shows distribution, relationship, comparison, and trend for one dataset.
- Take a deliberately bad plot (3D pie chart, unlabelled axes) and rebuild it so the message is clear in five seconds.
- Export the same figure at screen and print resolution.

> **Module completion gate (1.5).** You can produce a figure a stakeholder understands without you presenting it.

---

## 1.6 — SciPy and the Scientific Stack

**Objective.** Know which tool in the ecosystem solves which problem, so you stop re-implementing solved problems.

### Checklist

- `scipy.stats`: distributions, `describe`, `ttest_ind`, `chi2_contingency`, correlation measures.
- `scipy.optimize`: `minimize`, `curve_fit`, and constrained optimisation basics.
- `scipy.sparse`: sparse matrices, storage formats, and when sparsity matters.
- `scipy.signal`: smoothing and filtering basics (moving average, convolution).
- `scipy.spatial`: distance matrices, KD-trees, and nearest neighbours.
- `statsmodels`: OLS with summary output, diagnostics, and p-values.
- `scikit-learn` as a utility library even before Level 5 (`train_test_split`, `StandardScaler`).
- Understand when a library function is trustworthy and when you must read its documentation for defaults.

### Practice tasks

- Fit a curve to noisy data with `curve_fit` and report parameter uncertainty.
- Run a two-sample t-test and interpret the statistic, p-value, and confidence interval.
- Fit the same regression with `statsmodels` and with `numpy.linalg.lstsq`; compare coefficients and standard errors.

> **Module completion gate (1.6).** Given a numerical task, you name the right library, the right function, and its important default parameters.

---

## 1.7 — Performance: Profiling Before Optimising

**Objective.** Find the real bottleneck instead of guessing at it.

### Checklist

- Measure wall-clock time with `time.perf_counter`, and repeat measurements to see variance.
- Profile with `cProfile` and read cumulative versus self time.
- Profile line by line with `line_profiler`.
- Profile memory with `memory_profiler` or `tracemalloc`.
- Recognise the three usual bottlenecks: Python loops, data loading, and repeated recomputation.
- Apply the optimisation ladder: better algorithm → vectorisation → caching → compiled code.
- Cache expensive pure functions with `functools.lru_cache`.
- Use `numba` for numerical kernels only after profiling proves the need.
- Understand the cost of moving data between NumPy and Python objects.

### Practice tasks

- Profile a slow script and write down the top three functions by cumulative time.
- Make it at least 5× faster without changing the output, and report the before/after numbers.
- Show a case where the "optimised" version is slower because of overhead.

> **Module completion gate (1.7).** You produce a measurement-driven optimisation with before/after timings and an explanation of why it worked.

---

## 1.8 — Reproducible Notebooks and Scripts

**Objective.** Make analysis reproducible by someone else, including future-you.

### Checklist

- Understand when to use a notebook (exploration, communication) and when a script or package (pipelines, reuse).
- Keep notebooks runnable top-to-bottom; restart-and-run-all must succeed.
- Avoid hidden state: no out-of-order execution, no stale variables.
- Move reusable logic into `src/` modules and import it from the notebook.
- Parameterise notebooks with `papermill` or environment variables.
- Pin dependencies and record the environment with a lockfile.
- Version data with DVC or documented checksums.
- Record seeds, library versions, and run timestamps in outputs.
- Convert notebooks to HTML or Markdown reports for sharing.

### Practice tasks

- Take a messy notebook with out-of-order execution and make it run clean from a fresh kernel.
- Extract its two largest functions into a tested module and call them from the notebook.
- Generate an HTML report from the notebook with one command.

> **Module completion gate (1.8).** A stranger can clone your repository, run one command, and reproduce every number in your report.

---

## 1.9 — Bridge to Tensors: PyTorch Basics

**Objective.** See how NumPy-style thinking transfers to GPU tensors, without yet studying deep learning.

### Checklist

- Create tensors with `torch.tensor`, `zeros`, `randn`, and `from_numpy`.
- Understand `shape`, `dtype`, `device`, and moving between CPU and GPU.
- Perform the same operations as NumPy: broadcasting, indexing, matmul, reductions.
- Understand that tensors carry gradients (`requires_grad`), arrays do not.
- Use `torch.manual_seed` and understand that GPU determinism is not guaranteed.
- Understand why `float32` is the default on GPUs and `float64` on CPUs.
- Measure a matmul on CPU versus GPU and interpret the speed-up.
- Convert between NumPy arrays and tensors without copying when possible.

$$
\text{GPU throughput} \approx \text{thousands of parallel cores} \times \text{memory bandwidth}
$$

### Practice tasks

- Implement one NumPy computation (mean and standard deviation per column) in PyTorch, on CPU and GPU, and verify identical results within tolerance.
- Benchmark a $4096\times4096$ matmul on both devices and report the ratio.

> **Module completion gate (1.9).** You can read NumPy code and translate it to tensor code (and back) without losing track of shapes or devices.

---

## 1.10 — Level 1 Capstone: Vectorised Scientific Computing Library

### Project: `sci-core` — a small NumPy-only scientific library

**Difficulty.** Intermediate

**Purpose.** Re-implement the core numerical routines you will use for the rest of the roadmap, prove they are correct against trusted libraries, and prove they are fast.

### A. Functional requirements

**Descriptive statistics**

- Mean, median, variance, standard deviation, skewness, and quantiles.
- Correct handling of `NaN` and of the $n$ versus $n-1$ convention.
- Weighted versions of mean and variance.

**Linear algebra**

- Matrix multiplication without using `@` (loops first, then a vectorised version).
- Solve $Ax=b$ via Gaussian elimination with partial pivoting.
- LU decomposition; condition-number estimation.
- Power iteration for the leading eigenvector; PCA via SVD.

**Regression**

- OLS via normal equations, and via QR (numerically stable version).
- Ridge regression with a closed-form solution.
- Prediction with confidence intervals.

**Numerical utilities**

- Stable softmax and log-sum-exp.
- One-hot encoding and standardisation.
- A seeded train/validation split.

**Benchmarking**

- A benchmark harness comparing each routine with NumPy/SciPy/sklearn.
- Timing, memory, and maximum absolute difference for each comparison.
- A single command that regenerates the results table.

### B. Suggested architecture

```text
sci-core/
├── src/sci_core/
│   ├── __init__.py
│   ├── stats.py          # descriptive statistics, weighted versions
│   ├── linalg.py         # matmul, solve, LU, power iteration, PCA
│   ├── regression.py     # OLS (normal + QR), ridge
│   ├── numerics.py       # softmax, logsumexp, scaling, one-hot
│   └── benchmark.py      # correctness + timing harness
├── tests/
│   ├── test_stats.py
│   ├── test_linalg.py
│   ├── test_regression.py
│   └── test_numerics.py
├── benchmarks/
│   └── results.md        # generated table
└── README.md
```

### C. Correctness and performance targets

| Routine | Correctness target | Performance target |
|---|---|---|
| `solve` | max abs error $<10^{-10}$ vs `np.linalg.solve` | within 3× of NumPy |
| `ols_qr` | coefficients match `sklearn` to $10^{-8}$ | within 5× |
| `pca_svd` | explained variance matches to $10^{-6}$ | within 5× |
| `softmax` | stable at logits of magnitude $10^3$ | no NaNs, within 2× |
| `quantiles` | matches `np.quantile` at 5 probe points | within 3× |

### D. Stretch goals

- Add `numba`-accelerated versions and report the speed-up.
- Add `float32` support and quantify the accuracy loss.
- Implement stochastic power iteration with convergence tolerance.
- Profile the library and optimise the slowest routine.
- Add a CLI: `sci-core describe data.csv --columns a,b,c`.

### E. Acceptance criteria

| Area | Required evidence |
|---|---|
| **Correctness** | Every routine tested against a trusted implementation with a stated tolerance. |
| **Numerical care** | Stability tests for softmax, log-sum-exp, and ill-conditioned systems. |
| **Performance** | Benchmark table with timings and ratios to NumPy/SciPy. |
| **Design** | Clear module boundaries; no hidden global state. |
| **Reproducibility** | Seeded results; one command regenerates benchmarks. |
| **Communication** | README explains each algorithm and its complexity. |

> Level 1 is complete when all correctness targets pass **and** the benchmark table is reproducible from a clean clone.

---

## Level 1 interview question bank

### A. NumPy and vectorisation

- What is broadcasting, and what are its exact rules?
- Why is vectorised NumPy faster than a Python loop?
- What is the difference between a view and a copy, and why is it dangerous?
- What does `axis=0` mean in a reduction over a 2D array?
- Why does `np.std` differ from Pandas `std` by default?
- How do you compute a pairwise distance matrix without loops?
- How do you find the top $k$ elements efficiently?
- How does `np.random.default_rng` differ from the legacy global seed?
- What happens when an `int64` array overflows, and how would you detect it?

### B. Pandas

- What is the difference between `loc` and `iloc`?
- Why do you get `SettingWithCopyWarning`, and how do you fix it properly?
- What is the difference between `apply`, `map`, and a vectorised operation?
- How does `groupby().transform()` differ from `groupby().agg()`?
- How do you detect that a merge duplicated rows?
- How would you compute a point-in-time join, and why does a normal join leak?
- How do you reduce memory usage of a large DataFrame by half?
- What does `category` dtype buy you, and when does it hurt?

### C. Numerics and performance

- Why is `0.1 + 0.2 != 0.3`?
- What is catastrophic cancellation, and where does it appear in ML code?
- Why is solving $Ax=b$ better than computing $A^{-1}b$?
- What does a large condition number imply for your solution?
- What is the stable way to compute softmax, and why is the naive version broken?
- How would you find the bottleneck in a slow script?
- When would you reach for `numba` or Cython, and when is that the wrong move?
- What does Parquet give you over CSV?
- When is Pandas the wrong tool?

### D. Reproducibility scenarios

- A notebook gives different results each run. What do you check, in order?
- A colleague cannot reproduce your metrics. What could be missing from your repository?
- Your analysis is 5% different after a library upgrade. How do you investigate?
- Your code runs on your laptop but fails on a server with less memory. How do you diagnose and fix it?
- You must hand over an analysis to a team that will re-run it quarterly. What do you leave behind?

### E. Practical exercises

- Implement stable softmax in NumPy and validate at extreme logits.
- Solve a small linear system by hand (Gaussian elimination) and verify with NumPy.
- Compute eigenvalues of a symmetric matrix with power iteration.
- Implement OLS with QR and compare to the normal-equation solution on a poorly conditioned matrix.
- Write a function that loads a 3 GB CSV in chunks and returns grouped aggregates.

### Interview readiness standard

1. Explain the concept in plain language.
2. Give a concrete example with numbers or shapes.
3. Write the code when asked.
4. State the edge cases and the numerical risks.
5. State the complexity and the practical runtime.

---

## Level 1 final assessment

### Knowledge

- I can explain broadcasting, views, and copies.
- I can explain floating-point precision limits and catastrophic cancellation.
- I know when to use NumPy, Pandas, Polars, and DuckDB.
- I understand how to profile and optimise Python numerical code.
- I understand what makes a notebook reproducible.

### Practical skills

- I have rewritten loop-based code as vectorised code and verified equality.
- I have cleaned and joined a real dataset with Pandas, accounting for every row.
- I have processed a multi-GB dataset on a laptop.
- I have implemented stable softmax and log-sum-exp.
- I have solved a linear system three different ways and compared stability.
- I have a benchmark harness comparing my code with NumPy/SciPy.

### Project

- My `sci-core` library passes all correctness targets.
- The benchmark table regenerates from a clean clone.
- I can explain the complexity of each routine I implemented.
- I can explain where each routine would break numerically.

> **Level 1 completion rule.** If you can compute correctly, quickly, and reproducibly — and prove all three with numbers — you are ready for Level 2.

---

# LEVEL 2 — MATHEMATICS FOR MACHINE LEARNING

> **Goal.** Build the mathematical fluency to derive losses, read papers, debug optimisation, and answer "why does this work?" in an interview. You do not need to become a mathematician; you need to stop hand-waving.

## Level dashboard

| Item | Details |
|---|---|
| **Level** | 2 — Mathematics for Machine Learning |
| **Difficulty** | Intermediate |
| **Suggested duration** | 4–6 weeks |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Core topics** | Linear algebra, calculus, matrix calculus, optimisation, information theory |
| **Main project** | **Maths Engine from Scratch** — a NumPy autodiff + PCA + optimisation library |
| **Final outcome** | Derive the maths behind standard ML models and implement it correctly. |

**Prerequisites.** Level 1. You must be comfortable with NumPy arrays, functions, and basic plotting.

**How to study maths without lying to yourself.** Read a derivation, close the book, and reproduce it on paper. Then implement it in NumPy and check it numerically. If you cannot do all three, you do not know it yet.

---

## 2.1 — Linear Algebra I: Vectors and Geometry

**Objective.** Understand vectors as data and as geometry — the language of embeddings, similarity, and projection.

### Module 2.1.1 — Vectors, norms and similarity

- Vector notation, addition, scalar multiplication, and linear combinations.
- Norms and what each one measures:

$$
\lVert x\rVert_1=\sum_i |x_i|,\qquad
\lVert x\rVert_2=\sqrt{\sum_i x_i^2},\qquad
\lVert x\rVert_\infty=\max_i |x_i|
$$

- Inner products, angles, and the Cauchy–Schwarz inequality.
- Cosine similarity and when it differs from Euclidean distance.
- Normalisation and its effect on similarity rankings.
- Why $L_1$ encourages sparsity and $L_2$ encourages small values.

**Practice tasks**

- Implement three norms and verify against `np.linalg.norm` with an `ord` argument.
- Show two vectors with identical Euclidean distance from the origin but different cosine similarity.
- Prove with an example that cosine similarity ignores magnitude.

---

### Module 2.1.2 — Independence, span, basis and rank

- Linear independence and dependence; how to test with rank.
- Span, basis, and dimension.
- Column space, row space, null space, and their relationships.
- Rank and what it means for a dataset (collinearity, redundant features).
- Orthogonality and orthonormal bases.
- Why rank deficiency breaks the normal equations.

$$
\operatorname{rank}(A)\le \min(m,n),\qquad
\mathcal{N}(A)=\{x: Ax=0\},\qquad
\dim\mathcal{C}(A)+\dim\mathcal{N}(A)=n
$$

**Practice tasks**

- Construct a design matrix with exactly one collinear column and show `np.linalg.matrix_rank` detects it.
- Find a basis for the null space of a small matrix by hand and verify with SciPy.

---

### Module 2.1.3 — Projections and least squares

- Orthogonal projection onto a subspace.
- Derive the least-squares solution as a projection: the residual is orthogonal to the column space.
- The projection matrix $P=X(X^\top X)^{-1}X^\top$ and its properties.
- Why least squares is geometry, not algebra.

$$
\hat\beta=(X^\top X)^{-1}X^\top y,\qquad
\hat y = X\hat\beta = Py,\qquad
X^\top(y-\hat y)=0
$$

**Practice tasks**

- Derive the normal equations from the projection argument.
- Verify numerically that $X^\top(y-X\hat\beta)\approx 0$.
- Visualise a projection onto a plane in 3D and the residual vector.

---

> **Module completion gate (2.1).** You can explain similarity, projection, and rank geometrically, with a numerical demonstration for each.

---

## 2.2 — Linear Algebra II: Matrices, Eigenvalues and the SVD

**Objective.** Understand what matrices do, and how decomposition exposes structure.

### Module 2.2.1 — Matrices as linear maps

- Matrix multiplication as composition of linear maps.
- Identity, inverse, transpose, and why $(AB)^\top=B^\top A^\top$.
- Determinant as a volume scale factor.
- Trace and its relation to eigenvalues.
- Special matrices: symmetric, orthogonal, positive definite, diagonal.
- Conditioning and why it matters for solving systems.

$$
\kappa(A)=\lVert A\rVert\,\lVert A^{-1}\rVert,\qquad
A\ \text{orthogonal}\iff A^\top A=I
$$

**Practice tasks**

- Compute the determinant of a $2\times2$ and interpret it geometrically with a unit square.
- Build an ill-conditioned matrix and show that a tiny perturbation in $b$ produces a large change in $x$.

---

### Module 2.2.2 — Eigenvalues and eigenvectors

- Definition: $Av=\lambda v$ — directions unchanged, only scaled.
- Characteristic polynomial and the eigenvalue equation.
- Diagonalisation and why symmetric matrices are special.
- Spectral theorem: real symmetric matrices have an orthonormal eigenbasis.
- Positive definiteness via eigenvalue signs.
- Power iteration and its convergence rate.

$$
A=Q\Lambda Q^{\top},\qquad
\lambda_1\ge\lambda_2\ge\dots\ge\lambda_n,\qquad
v^{(k)}=\frac{Av^{(k-1)}}{\lVert Av^{(k-1)}\rVert}
$$

**Practice tasks**

- Compute eigenvalues by hand for a $2\times2$ symmetric matrix and verify with NumPy.
- Implement power iteration and measure how the error shrinks with iterations.
- Show that a covariance matrix is positive semi-definite.

---

### Module 2.2.3 — The singular value decomposition

- The SVD: any matrix as rotation → scaling → rotation.
- Singular values, left and right singular vectors.
- Rank, condition number, and pseudo-inverse from the SVD.
- Low-rank approximation and the Eckart–Young theorem: truncating singular values minimises reconstruction error.
- PCA as an eigenproblem on the covariance matrix, and as an SVD on the centred data.

$$
A=U\Sigma V^{\top},\qquad
A_k=\sum_{i=1}^{k}\sigma_i u_i v_i^{\top},\qquad
\lVert A-A_k\rVert_2=\sigma_{k+1}
$$

**Practice tasks**

- Implement truncated SVD and compress an image, reporting error versus $k$.
- Derive PCA both ways (covariance eigen-decomposition and SVD) and confirm identical components.
- Explain why computing PCA via SVD is numerically preferable.

---

### Module 2.2.4 — Matrix decompositions in practice

- LU and Cholesky for solving systems; when Cholesky applies.
- QR decomposition and why it is preferred for least squares.
- Complexity comparison and practical guidance.

$$
\text{LU}:\ O(n^3),\qquad \text{Cholesky}:\ O(n^3/3),\qquad \text{QR}:\ O(mn^2)
$$

**Practice tasks**

- Solve the same least-squares problem via normal equations, QR, and SVD; report the residual and condition-driven differences.
- Use Cholesky to sample from a multivariate Gaussian.

---

> **Module completion gate (2.2).** You can derive PCA from the SVD, explain why normal equations fail for collinear features, and choose an appropriate decomposition for a stated problem.

---

## 2.3 — Calculus and Multivariable Differentiation

**Objective.** Understand how functions change, so that learning becomes a search for steepest descent.

### Module 2.3.1 — Single-variable calculus

- Derivatives, differentiability, and continuity.
- Standard derivatives and the product, quotient, and chain rules.
- Common ML functions and their derivatives:

$$
\frac{d}{dx}\log x=\frac{1}{x},\qquad
\frac{d}{dx}e^x=e^x,\qquad
\frac{d}{dx}\sigma(x)=\sigma(x)\bigl(1-\sigma(x)\bigr)
$$

- Local minima, maxima, and the second-derivative test.
- Taylor series and linear approximation — the basis of gradient descent.

**Practice tasks**

- Derive the derivative of $\sigma(x)=1/(1+e^{-x})$ from the quotient rule.
- Write the first-order Taylor approximation of $\log(1+x)$ at $x=0$ and show the error for $x=0.1$.

---

### Module 2.3.2 — Gradients, Jacobians and Hessians

- Partial derivatives and the gradient as the direction of steepest ascent.
- Directional derivatives and the gradient's geometric meaning.
- Jacobian: the matrix of first derivatives for vector-valued functions.
- Hessian: second derivatives, curvature, and definiteness.
- Why the Hessian's eigenvalues describe how stretched the loss surface is.

$$
\nabla f=\left[\frac{\partial f}{\partial x_1},\dots,\frac{\partial f}{\partial x_n}\right]^{\top},\qquad
J_{ij}=\frac{\partial f_i}{\partial x_j},\qquad
H_{ij}=\frac{\partial^2 f}{\partial x_i\partial x_j}
$$

**Practice tasks**

- Compute the Jacobian of a two-layer network's output with respect to its input.
- Compute the Hessian of a quadratic form and classify its definiteness.
- Show numerically that the gradient is orthogonal to level sets.

---

### Module 2.3.3 — The chain rule for compositions

- The chain rule in scalar, vector, and matrix forms.
- Backpropagation as repeated application of the chain rule.
- Local gradients and why they can be computed once per operation.
- Why depth multiplies gradients (and why initialisation matters).

$$
\frac{\partial \mathcal{L}}{\partial x}=\frac{\partial \mathcal{L}}{\partial z}\cdot\frac{\partial z}{\partial x},\qquad
\frac{\partial \mathcal{L}}{\partial W}=\frac{\partial \mathcal{L}}{\partial z}\,x^{\top}
$$

**Practice tasks**

- Derive gradients for a two-layer network with sigmoid activations, by hand, on paper.
- Verify each gradient with finite differences.

---

> **Module completion gate (2.3).** You can differentiate a composite loss by hand, explain the gradient's geometry, and interpret a Hessian.

---

## 2.4 — Matrix Calculus and Automatic Differentiation

**Objective.** Compute gradients efficiently and understand the machinery behind `torch.autograd`.

### Module 2.4.1 — Matrix calculus

- Layout conventions and why they trip people up.
- Gradient of scalar functions of vectors and matrices.
- Useful identities you should recognise rather than re-derive:

$$
\nabla_x\,(a^\top x)=a,\qquad
\nabla_x\,(x^\top A x)=(A+A^\top)x,\qquad
\nabla_x\,\lVert x\rVert_2^2=2x
$$

- Gradient of the linear model loss $\mathcal{L}=\lVert y-X\beta\rVert^2$ with respect to $\beta$.
- Gradient of cross-entropy through softmax.

$$
\nabla_\beta \lVert y-X\beta\rVert_2^2=-2X^\top(y-X\beta),\qquad
\nabla_z \,\mathrm{CE}(\mathrm{softmax}(z),y)=\hat p-y
$$

**Practice tasks**

- Derive the ridge-regression gradient and its closed-form solution.
- Derive the softmax cross-entropy gradient and verify numerically.
- Explain in one paragraph why the $\hat p-y$ form makes intuitive sense.

---

### Module 2.4.2 — Forward and reverse mode autodiff

- The computational graph: nodes are operations, edges are data dependencies.
- Forward mode: propagate derivatives alongside values; cost scales with inputs.
- Reverse mode: one backward pass yields all gradients; cost scales with outputs.
- Why reverse mode is the right choice for training (many parameters, scalar loss).
- Vector-Jacobian products and how a scalar loss makes everything tractable.
- Memory cost of storing the forward pass.

$$
\mathcal{L}\in\mathbb{R},\ \theta\in\mathbb{R}^p \;\Rightarrow\; \text{reverse mode cost}\approx 2\times\text{forward},\ \text{independent of } p
$$

**Practice tasks**

- Implement forward mode for a scalar function of two variables.
- Implement reverse mode for a tiny graph with add, multiply, and sigmoid nodes.
- Compare your derivatives with `torch.autograd` for the same expressions.

---

### Module 2.4.3 — Numerical gradient checking

- Finite differences: central versus forward, and their error orders.
- Choosing epsilon in the presence of floating point.
- Relative error and when a gradient "matches".
- Why gradient checks are the first test of any custom autograd code.

$$
\frac{\partial f}{\partial x_i}\approx\frac{f(x+\epsilon e_i)-f(x-\epsilon e_i)}{2\epsilon}+O(\epsilon^2)
$$

**Practice tasks**

- Write a reusable `grad_check(f, x, analytic_grad)` with relative-error reporting.
- Show it failing deliberately with a wrong sign, then passing after the fix.

---

> **Module completion gate (2.4).** You have a working reverse-mode autograd engine that passes gradient checks on a multi-layer network.

---

## 2.5 — Probability Foundations

**Objective.** Represent uncertainty rigorously — the prerequisite for every statistical claim you will make later.

### Module 2.5.1 — Random variables and distributions

- Discrete versus continuous random variables.
- Probability mass functions and probability density functions; why density can exceed 1.
- Cumulative distribution functions.
- Key distributions and where they appear in ML:

| Distribution | Use |
|---|---|
| Bernoulli | binary labels |
| Categorical | multiclass labels |
| Binomial | counts of successes |
| Poisson | counts, events per interval |
| Uniform | priors, sampling |
| Gaussian | noise, weights, embeddings |
| Exponential | waiting times |

- Sampling from a distribution and verifying empirically.

**Practice tasks**

- Implement a sampler for Bernoulli and Gaussian from a uniform generator.
- Plot empirical histograms and compare to the theoretical density.

---

### Module 2.5.2 — Joint, marginal and conditional

- Joint distributions and independence.
- Marginalisation by summing or integrating out variables.
- Conditional distributions and conditional independence.
- Covariance and correlation, and why correlation is not causation.
- The law of total expectation and total variance.

$$
p(x)=\int p(x,y)\,dy,\qquad
\operatorname{Var}(X)=\mathbb{E}\bigl[\operatorname{Var}(X\mid Y)\bigr]+\operatorname{Var}\bigl(\mathbb{E}[X\mid Y]\bigr)
$$

**Practice tasks**

- Build a small joint distribution table and compute marginals and conditionals.
- Show a case with zero correlation but strong dependence.

---

### Module 2.5.3 — Expectation, variance and moments

- Definition and linearity of expectation.
- Variance, standard deviation, and covariance properties.
- Conditional expectation as the best predictor under squared loss.
- Higher moments and what they tell you about shape.

$$
\mathbb{E}[aX+b]=a\mathbb{E}[X]+b,\qquad
\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X),\qquad
\mathbb{E}[X]=\arg\min_c \mathbb{E}[(X-c)^2]
$$

**Practice tasks**

- Prove that the sample mean minimises squared error.
- Compute the variance of a sum of correlated variables and show the cross terms.

---

### Module 2.5.4 — Bayes' rule and MAP estimation

- Prior, likelihood, posterior, and evidence.
- Bayesian updating step by step.
- Maximum likelihood versus maximum a posteriori.
- Conjugate priors and why they are convenient.
- Regularisation as a prior: ridge is a Gaussian prior, lasso is a Laplace prior.

$$
p(\theta\mid \mathcal{D})=\frac{p(\mathcal{D}\mid\theta)p(\theta)}{p(\mathcal{D})},\qquad
\hat\theta_{\mathrm{MAP}}=\arg\max_\theta\bigl[\log p(\mathcal{D}\mid\theta)+\log p(\theta)\bigr]
$$

**Practice tasks**

- Update a Beta prior with binary observations and interpret the posterior.
- Derive ridge regression as MAP with a Gaussian prior.
- Explain to a product manager, in three sentences, why a model needs a prior.

---

> **Module completion gate (2.5).** You can compute marginals, conditionals, and posteriors for a small problem and connect Bayes to regularisation.

---

## 2.6 — Statistics and Estimation

**Objective.** Turn data into estimates with honest uncertainty attached.

### Module 2.6.1 — Sampling and the central limit theorem

- Population versus sample; why we estimate at all.
- Sampling distributions and the standard error.
- Law of large numbers and its convergence rate.
- The CLT and the conditions under which it applies.
- Why heavy tails and dependent observations break normal approximations.

$$
\bar X_n \xrightarrow{p}\mu,\qquad
\sqrt{n}(\bar X_n-\mu)\xrightarrow{d}\mathcal{N}(0,\sigma^2),\qquad
\mathrm{SE}(\bar X)=\frac{\sigma}{\sqrt{n}}
$$

**Practice tasks**

- Simulate the sampling distribution of the mean from a skewed distribution, for three sample sizes.
- Show the CLT failing for a heavy-tailed (Pareto) distribution at the same sizes.

---

### Module 2.6.2 — Point estimation

- Estimators, bias, variance, and mean squared error.
- Consistency and efficiency.
- Maximum likelihood estimation, with derivations for Gaussian and Bernoulli.
- Method of moments as an alternative.
- Why the unbiased variance divides by $n-1$.

$$
\mathrm{MSE}(\hat\theta)=\operatorname{Bias}(\hat\theta)^2+\operatorname{Var}(\hat\theta)
$$

**Practice tasks**

- Derive the MLE for a Gaussian's mean and variance.
- Compare biased and unbiased variance estimators by simulation.
- Show a biased estimator with lower MSE than an unbiased one (e.g. shrinkage).

---

### Module 2.6.3 — Interval estimation and hypothesis tests

- Confidence intervals and correct interpretation.
- The $t$-distribution and why small samples need it.
- Hypothesis testing: null, alternative, test statistic, $p$-value, significance level.
- Type I and Type II error; power.
- The difference between statistical and practical significance.

$$
\hat\theta \pm t_{1-\alpha/2,\,n-1}\cdot \mathrm{SE}(\hat\theta),\qquad
\text{power}=1-\beta=\Pr(\text{reject }H_0 \mid H_1\text{ true})
$$

**Practice tasks**

- Build a 95% confidence interval for a mean three ways: analytic, bootstrap, and normal approximation.
- Simulate the type I error rate under the null, and confirm it matches $\alpha$.
- Explain what a $p$-value is *not*.

---

### Module 2.6.4 — Correlation, causation and experimental design

- Pearson versus Spearman correlation.
- Confounders, selection bias, and reverse causality.
- Randomisation as the strongest identification strategy.
- Observational data: what you can and cannot claim.
- The language of causal claims and when to avoid it.

> **Module completion gate (2.6).** You can compute an estimate with an interval, interpret a hypothesis test correctly, and state the assumptions behind any claim.

---

## 2.7 — Optimisation

**Objective.** Understand how parameters are learned, why training fails, and how to choose an optimiser.

### Module 2.7.1 — Convexity and landscape

- Convex sets and convex functions; the definition and why it matters.
- Local versus global minima.
- First- and second-order optimality conditions.
- Lipschitz continuity, smoothness, and strong convexity at an intuitive level.
- Why deep learning is non-convex but still trains.

$$
f(\lambda x+(1-\lambda)y)\le\lambda f(x)+(1-\lambda)f(y),\qquad
\nabla f(x^\star)=0,\quad \nabla^2 f(x^\star)\succeq 0
$$

**Practice tasks**

- Prove that a quadratic with a positive-definite Hessian is convex.
- Plot a non-convex function with a saddle point and show gradient descent stalling.

---

### Module 2.7.2 — Gradient descent variants

- Batch, stochastic, and mini-batch gradient descent.
- The update rule and the role of the learning rate.
- Convergence intuition: too small, too large, and just right.
- Momentum and Nesterov acceleration.
- Adaptive methods: AdaGrad, RMSProp, Adam, and AdamW.
- Second-order methods and why they are rarely used at scale.

$$
\theta_{t+1}=\theta_t-\eta\nabla_\theta\mathcal{L}(\theta_t),\qquad
v_{t+1}=\beta v_t+(1-\beta)\nabla_\theta\mathcal{L}(\theta_t)
$$

**Practice tasks**

- Implement gradient descent, momentum, and Adam on a 2D quadratic; plot the trajectories.
- Find a learning rate that diverges and one that crawls, and explain both.
- Compare convergence speed across the three optimisers at the same budget.

---

### Module 2.7.3 — Learning rates, schedules and conditioning

- Why the learning rate is the most important hyperparameter.
- Condition number and its effect on convergence speed.
- Step decay, cosine annealing, warmup, and one-cycle schedules.
- Gradient clipping for stability.
- Learning-rate range tests to find a workable band.

$$
t_{\text{conv}}\ \propto\ \kappa\log\frac{1}{\epsilon}\quad\text{(strongly convex case)}
$$

**Practice tasks**

- Run a learning-rate sweep on a small problem and plot loss versus rate on a log axis.
- Show that standardising inputs reduces the condition number and speeds convergence.

---

### Module 2.7.4 — Constrained optimisation

- Lagrange multipliers and the Lagrangian.
- KKT conditions and inequality constraints.
- The dual problem and why duality appears in SVMs.
- Projected gradient descent for simple constraints.

$$
\mathcal{L}(x,\lambda)=f(x)+\lambda^\top g(x),\qquad
\nabla_x\mathcal{L}=0,\quad g(x)\le 0,\quad \lambda\ge 0,\quad \lambda_i g_i(x)=0
$$

**Practice tasks**

- Solve a two-variable problem with one equality constraint by hand.
- Derive the dual of a simple linear program.
- Explain the complementary slackness condition in plain language.

---

> **Module completion gate (2.7).** You can explain why a training run diverges, choose an optimiser and schedule with reasons, and solve a small constrained problem.

---

## 2.8 — Information Theory

**Objective.** Understand the quantities behind cross-entropy, perplexity, and distribution matching.

### Module 2.8.1 — Entropy and surprise

- Information content $-\log p(x)$ and its intuition.
- Entropy as expected surprise.
- Maximum entropy distributions: uniform for a given support; Gaussian for a given variance.
- Entropy in bits versus nats.

$$
H(X)=-\sum_x p(x)\log p(x),\qquad H(X)\le \log|\mathcal{X}|
$$

**Practice tasks**

- Compute the entropy of a fair and a biased coin as a function of bias.
- Show empirically that the uniform distribution maximises entropy for a fixed support.

---

### Module 2.8.2 — Cross-entropy and KL divergence

- Cross-entropy, KL divergence, and the identity linking them.
- Why minimising cross-entropy is equivalent to minimising KL against the empirical distribution.
- KL asymmetry: forward (mass-covering) versus reverse (mode-seeking).
- Mutual information as a measure of dependence.
- Where KL appears: VAEs, distillation, RLHF regularisation, drift detection.

$$
H(p,q)=-\sum_x p(x)\log q(x),\qquad
D_{\mathrm{KL}}(p\Vert q)=H(p,q)-H(p)\ge 0
$$

**Practice tasks**

- Compute $D_{\mathrm{KL}}(p\Vert q)$ and $D_{\mathrm{KL}}(q\Vert p)$ for two small distributions and show the asymmetry.
- Prove numerically that minimising cross-entropy over $q$ minimises KL.
- Construct a case where forward and reverse KL give visibly different fits.

---

### Module 2.8.3 — Cross-entropy as the classification loss

- Deriving cross-entropy from maximum likelihood for categorical labels.
- Why cross-entropy penalises confident mistakes heavily.
- Perplexity and what it measures for language models.
- Label smoothing and its information-theoretic interpretation.

$$
\mathcal{L}=-\frac{1}{n}\sum_{i=1}^{n}\log \hat p_{i,y_i},\qquad
\text{perplexity}=\exp\!\left(-\frac{1}{N}\sum_{t=1}^{N}\log p(w_t)\right)
$$

**Practice tasks**

- Derive cross-entropy for binary classification and show it equals the negative log-likelihood.
- Compute perplexity for a toy next-token model and interpret the number.

---

> **Module completion gate (2.8).** You can explain cross-entropy, KL, and perplexity to a colleague, derive the classification loss from likelihood, and use all three correctly.

---

## 2.9 — Level 2 Capstone: Maths Engine from Scratch

### Project: `maths-engine` — autodiff, PCA, and optimisation in NumPy

**Difficulty.** Intermediate → Advanced

**Purpose.** Implement the mathematics you will use for the next sixteen levels, and prove each piece correct numerically. This project becomes your reference implementation for the rest of the roadmap.

### A. Functional requirements

**Part 1 — Reverse-mode autodiff**

- `Tensor` class wrapping a NumPy array with `grad` and `requires_grad`.
- Operations: add, subtract, multiply, divide, matmul, power, sum, mean, reshape.
- Activations: sigmoid, tanh, ReLU, softmax.
- Losses: MSE and cross-entropy.
- A `backward()` that propagates gradients in reverse topological order.
- Gradient checking for every op with relative error < $10^{-6}$ in float64.

**Part 2 — Decompositions**

- Gram–Schmidt QR and Householder QR.
- Power iteration and full eigen-decomposition for symmetric matrices.
- SVD via eigen-decomposition of $A^\top A$ (with a note on its numerical limits).
- PCA: fit, transform, inverse transform, and explained-variance ratio.

**Part 3 — Optimisation**

- Gradient descent, momentum, Nesterov, AdaGrad, RMSProp, Adam.
- Learning-rate schedules: constant, step, cosine, warmup + cosine.
- A trainer that logs loss, gradient norm, and parameter norm per step.
- Visualisation of training trajectories on a 2D loss surface.

**Part 4 — Information theory utilities**

- Entropy, cross-entropy, KL divergence, and mutual information.
- Perplexity and label smoothing.

### B. Suggested architecture

```text
maths-engine/
├── src/maths_engine/
│   ├── tensor.py        # Tensor, op graph, backward pass
│   ├── ops.py           # elementwise + matmul operations
│   ├── nn.py            # Linear, activations, losses
│   ├── linalg.py        # QR, eigen, SVD, PCA
│   ├── optim.py         # SGD, momentum, Adam, schedules
│   └── info.py          # entropy, KL, perplexity
├── notebooks/
│   └── visualise_optimisers.ipynb
├── tests/
│   ├── test_gradients.py
│   ├── test_linalg.py
│   └── test_optim.py
└── README.md
```

### C. Acceptance targets

| Component | Target |
|---|---|
| Autograd | All ops pass gradient check, relative error $<10^{-6}$ |
| Linear regression | Train to within $10^{-4}$ of the closed-form solution |
| Logistic regression | Match `sklearn` accuracy within 0.5% on a small dataset |
| PCA | Explained variance matches `sklearn` to $10^{-6}$ |
| Optimisers | Trajectories match the mathematical update rules after 100 steps |
| KL / cross-entropy | Match SciPy to $10^{-10}$ |

### D. Stretch goals

- Add forward-mode autodiff alongside reverse mode and compare costs.
- Add a second-order optimiser (Newton or L-BFGS) for small problems.
- Vectorise the autodiff engine's backward pass instead of looping over nodes.
- Add a small `numba` kernel for the hottest operation and report the gain.
- Plot loss-surface contours for a 2-parameter model with the optimiser trajectories overlaid.

### E. Acceptance criteria

| Area | Required evidence |
|---|---|
| **Mathematical correctness** | Every derivation in the README, every implementation tested numerically |
| **Coverage** | All four parts implemented and demonstrated |
| **Testing** | Gradient checks, parity tests against NumPy/SciPy/sklearn |
| **Communication** | README explains each derivation in your own words |
| **Visualisation** | Optimiser trajectories clearly show the behavioural differences |
| **Reproducibility** | Seeded runs; one command regenerates all figures and tables |

> Level 2 is complete when all four parts work, all targets pass, and you can derive each result on a whiteboard without notes.

---

## Level 2 interview question bank

### A. Linear algebra

- What is the geometric meaning of a determinant?
- What does rank tell you about a dataset?
- Why does collinearity break the normal equations, and what are the two standard fixes?
- What is an eigenvalue, and what does a large condition number imply?
- Derive PCA from the SVD.
- Why is the pseudo-inverse useful?
- When is a projection matrix idempotent, and why?
- What is the difference between orthogonal and orthonormal?

### B. Calculus and gradients

- What is the gradient, geometrically?
- Why is the gradient orthogonal to level sets?
- Derive the gradient of logistic regression's loss.
- What is the Jacobian, and where do you meet it in ML?
- What does the Hessian tell you about a loss surface?
- Why does the chain rule imply that deep networks have unstable gradients?

### C. Autodiff

- What is the difference between forward-mode and reverse-mode autodiff?
- Why is reverse mode the standard for training neural networks?
- What is a vector-Jacobian product?
- Why does autodiff not need symbolic differentiation?
- What is the memory cost of reverse-mode autodiff, and how do you reduce it?
- How do you check a gradient implementation?

### D. Probability and statistics

- What is the difference between likelihood and probability?
- Derive the MLE for a Gaussian mean.
- What is a conjugate prior, and why do we care?
- How is ridge regression a Bayesian estimate?
- What is the central limit theorem, and when does it fail?
- How do you interpret a 95% confidence interval?
- What is the difference between Type I and Type II error?
- Why is the unbiased variance divided by $n-1$?
- What does a $p$-value not tell you?

### E. Optimisation and information theory

- Why is the learning rate the most important hyperparameter?
- What does momentum do, mechanically?
- How does Adam differ from plain SGD?
- What is the difference between batch and stochastic gradient descent?
- Why can a higher learning rate sometimes escape a bad region — and sometimes just diverge?
- What is entropy, and why is it maximised by the uniform distribution?
- Why is cross-entropy the standard classification loss?
- What is the difference between forward and reverse KL, and where does it show up?
- What is perplexity, and how do you interpret "perplexity 20"?

### Interview readiness standard

1. State the definition precisely.
2. Give the geometric or probabilistic intuition.
3. Derive or sketch the derivation.
4. Give one place it appears in a real model.
5. State one failure mode or limitation.

---

## Level 2 final assessment

### Knowledge

- I can explain vectors, norms, projections, rank, and conditioning.
- I can derive PCA from both the covariance matrix and the SVD.
- I can differentiate composite functions and interpret Jacobians and Hessians.
- I understand forward and reverse-mode autodiff and can implement the latter.
- I can derive MLEs and connect Bayes to regularisation.
- I understand convexity, gradient descent, and adaptive optimisers.
- I can explain entropy, cross-entropy, KL, and perplexity.

### Practical skills

- I have implemented and gradient-checked an autodiff engine.
- I have implemented QR, eigen-decomposition, SVD, and PCA from scratch.
- I have implemented five optimisers and compared their trajectories.
- I have reproduced a derivation in a README in my own words.

### Project

- `maths-engine` passes all four parts and all numerical targets.
- I can whiteboard every derivation in the README.
- I can explain where each routine is numerically fragile.

> **Level 2 completion rule.** If you can derive it, implement it, verify it numerically, and explain it — you are ready for Level 3.

---

# LEVEL 3 — PROBABILITY AND STATISTICS

> **Goal.** Go beyond formulas into statistical reasoning: model data with distributions, quantify uncertainty honestly, design experiments, and avoid the errors that make ML results irreproducible.

## Level dashboard

| Item | Details |
|---|---|
| **Level** | 3 — Probability and Statistics |
| **Difficulty** | Intermediate |
| **Suggested duration** | 3–5 weeks |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Core topics** | distributions, estimation, inference, resampling, regression inference, experiment design, Bayesian thinking, causality |
| **Main project** | **Statistical Inference Toolkit** with a simulated experiment study |
| **Final outcome** | Make statistical claims that are correct, calibrated, and defensible. |

**Prerequisites.** Level 2 — you can differentiate, compute expectations, and explain Bayes' rule.

---

## 3.1 — Probability Models for Data

**Objective.** Choose a distribution because of how the data was generated, not because it is familiar.

### Module 3.1.1 — Modelling counts and categories

- Bernoulli and binomial: one trial versus many trials.
- Poisson: events per unit time or space, and the mean–variance equality.
- Multinomial: multiway counts, and its role in language modelling.
- Negative binomial and overdispersion — why real count data rarely fits Poisson.

$$
X\sim\mathrm{Poisson}(\lambda):\quad \Pr(X=k)=\frac{\lambda^k e^{-\lambda}}{k!},\qquad \mathbb{E}[X]=\operatorname{Var}(X)=\lambda
$$

**Practice tasks**

- Simulate Poisson counts with $\lambda=3$ and verify mean and variance empirically.
- Generate overdispersed counts and show that Poisson confidence intervals are too narrow.

---

### Module 3.1.2 — Modelling continuous quantities

- Uniform and its use in simulation and priors.
- Gaussian: parameters, standardisation, and why it appears so often (CLT, maximum entropy).
- Exponential and Weibull for durations.
- Log-normal for positive, right-skewed quantities.
- Beta for proportions.
- Heavy-tailed distributions and why they break averages.

$$
f(x;\mu,\sigma^2)=\frac{1}{\sqrt{2\pi\sigma^2}}\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

**Practice tasks**

- Transform a log-normal sample, take logs, and show it becomes approximately Gaussian.
- Show a Cauchy sample whose sample mean does not converge.

---

### Module 3.1.3 — Multivariate distributions and dependence

- Multivariate Gaussian: mean vector, covariance matrix, and correlation structure.
- The covariance matrix as an ellipse; eigen-decomposition of covariance.
- Copulas conceptually: separating marginals from dependence.
- Mixtures of Gaussians as a flexible density.

$$
\mathcal{N}(x;\mu,\Sigma)=\frac{1}{(2\pi)^{d/2}|\Sigma|^{1/2}}\exp\!\left(-\tfrac{1}{2}(x-\mu)^\top\Sigma^{-1}(x-\mu)\right)
$$

**Practice tasks**

- Sample a correlated 2D Gaussian using a Cholesky factor and verify the covariance.
- Plot the 1σ, 2σ, and 3σ ellipses from the eigen-decomposition.

---

### Module 3.1.4 — Empirical distributions and quantiles

- Empirical CDF and how to read it.
- Quantiles, percentiles, and interpolation choices.
- QQ plots for assessing distributional fit.
- Kernel density estimation and bandwidth trade-offs.

$$
\hat F_n(t)=\frac{1}{n}\sum_{i=1}^{n}\mathbf{1}[x_i\le t]
$$

**Practice tasks**

- Compare a sample against a Gaussian with a QQ plot and interpret the tails.
- Plot empirical CDFs of two groups and identify where they diverge.

---

> **Module completion gate (3.1).** Given a dataset and a generation story, you can pick a distributional model, justify it, and check it empirically.

---

## 3.2 — Sampling, Standard Error and the CLT

**Objective.** Understand how estimates vary — the foundation of every interval and test you will run.

### Module 3.2.1 — Sampling distributions

- Population, sample, and statistic.
- The sampling distribution of a statistic and what it depends on.
- Standard error versus standard deviation — the most commonly confused pair in ML.
- Bootstrap standard error as a non-parametric alternative.

$$
\mathrm{SD}(x)=\sigma,\qquad \mathrm{SE}(\bar x)=\frac{\sigma}{\sqrt n}
$$

**Practice tasks**

- Estimate the standard error of the mean three ways: formula, simulation, and bootstrap.
- Show that quadrupling $n$ halves the standard error.

---

### Module 3.2.2 — Law of large numbers and CLT

- Convergence in probability versus convergence in distribution.
- CLT conditions and failure modes.
- Rate of convergence and how it depends on skewness.
- Delta method for functions of estimates.

$$
\sqrt{n}\left(g(\hat\theta)-g(\theta)\right)\xrightarrow{d}\mathcal{N}\!\left(0,\ g'(\theta)^2\sigma^2\right)
$$

**Practice tasks**

- Demonstrate the delta method for $\log(\hat\lambda)$ with a Poisson estimate.
- Show CLT failure for a Pareto(1.5) sample at $n=10^4$.

---

### Module 3.2.3 — Resampling methods

- Bootstrap: resample with replacement, compute the statistic, repeat.
- Percentile versus basic bootstrap intervals.
- Block bootstrap for dependent data.
- Permutation tests for group differences.
- When bootstrap fails (extremes, dependence, very small $n$).

**Practice tasks**

- Bootstrap a 95% interval for a median and compare with the normal approximation.
- Run a permutation test for a difference in means and interpret the $p$-value.
- Show bootstrap failing for a maximum statistic.

---

> **Module completion gate (3.2).** You can compute a standard error, an interval, and a $p$-value without relying on a black-box function, and explain each step.

---

## 3.3 — Estimation Theory

**Objective.** Judge estimators by their properties, not by habit.

### Module 3.3.1 — Bias, variance and MSE

- Unbiasedness and why it is not everything.
- Efficiency and the Cramér–Rao lower bound (conceptually).
- Mean squared error decomposition.
- Shrinkage: trading bias for variance.

$$
\mathbb{E}[(\hat\theta-\theta)^2]=\bigl(\mathbb{E}[\hat\theta]-\theta\bigr)^2+\operatorname{Var}(\hat\theta)
$$

**Practice tasks**

- Show a biased estimator (James–Stein-style shrinkage) beating the unbiased one in MSE on simulated data.
- Plot MSE against sample size for two estimators.

---

### Module 3.3.2 — Maximum likelihood in depth

- The likelihood function and why we work with log-likelihood.
- Score function and Fisher information.
- Asymptotic normality of the MLE.
- Numerical optimisation when no closed form exists.
- MLE failure modes: separation in logistic regression, boundary estimates, misspecification.

$$
\ell(\theta)=\sum_i \log p(x_i\mid\theta),\qquad
\mathcal{I}(\theta)=-\mathbb{E}\left[\nabla^2\ell(\theta)\right],\qquad
\hat\theta \approx \mathcal{N}\!\left(\theta,\ \mathcal{I}(\theta)^{-1}\right)
$$

**Practice tasks**

- Derive the MLE for the exponential rate parameter and its standard error.
- Show complete separation breaking logistic regression and explain the fix (regularisation).

---

### Module 3.3.3 — Bayesian estimation

- Priors: informative, weakly informative, and improper.
- Posterior summaries: mean, median, and credible intervals.
- Conjugate updates: Beta–Bernoulli, Normal–Normal, Gamma–Poisson.
- Shrinkage in hierarchical models (conceptually).
- Posterior predictive checks.
- Sampling-based inference: MCMC and variational inference at a conceptual level only.

$$
\theta\mid x \sim \mathrm{Beta}(\alpha+k,\ \beta+n-k)\quad\text{for } x_i\sim\mathrm{Bernoulli}(\theta),\ \theta\sim\mathrm{Beta}(\alpha,\beta)
$$

**Practice tasks**

- Update a Beta prior through a sequence of observations and plot the posterior evolution.
- Compare a 95% credible interval with a 95% confidence interval on the same data and explain the difference.

---

> **Module completion gate (3.3).** You can state the properties of an estimator, derive a simple MLE, and compute a posterior for a conjugate problem.

---

## 3.4 — Hypothesis Testing and Experimental Design

**Objective.** Design experiments that can actually answer their question, and interpret results without overclaiming.

### Module 3.4.1 — Tests and error rates

- Null and alternative hypotheses; one-sided versus two-sided.
- Test statistics and their reference distributions.
- $p$-values: definition, common misinterpretations, and why they are not the probability the null is true.
- Type I error, Type II error, and power.
- Multiple comparisons: Bonferroni, Holm, and false discovery rate.

$$
\alpha=\Pr(\text{reject }H_0\mid H_0),\qquad
\beta=\Pr(\text{fail to reject}\mid H_1),\qquad
\text{power}=1-\beta
$$

**Practice tasks**

- Simulate 1,000 null experiments and confirm roughly 5% false positives at $\alpha=0.05$.
- Run 20 tests on pure noise and show the multiple-comparison problem.
- Apply Holm correction and compare the number of rejections.

---

### Module 3.4.2 — Power and sample size

- Effect size: absolute, relative, and standardised.
- The power function and how it depends on $n$, variance, and effect size.
- Minimum detectable effect (MDE) and why it must be fixed before data collection.
- Underpowered studies and the "winner's curse".

$$
n \approx \frac{2\sigma^2\left(z_{1-\alpha/2}+z_{1-\beta}\right)^2}{\Delta^2}
$$

**Practice tasks**

- Compute the sample size needed to detect a 2% lift with baseline 10% and $\alpha=0.05$, power 0.8.
- Simulate a study at 50% of the required $n$ and show it usually fails to detect a real effect.

---

### Module 3.4.3 — A/B testing in practice

- Randomisation units and why they must match the analysis unit.
- Guardrail metrics and primary metrics.
- Sample ratio mismatch and its causes.
- Peeking, sequential testing, and always-valid inference.
- Novelty and primacy effects.
- Variance reduction with pre-period covariates (CUPED).

$$
\hat\tau_{\text{CUPED}}=\left(\bar Y_T-\bar Y_C\right)-\theta\left(\bar X_T-\bar X_C\right)
$$

**Practice tasks**

- Design an A/B test end-to-end: hypothesis, randomisation unit, sample size, duration, guardrails, and analysis plan.
- Simulate a 1% lift and show detection requires the planned sample.

---

### Module 3.4.4 — Common statistical traps

- Simpson's paradox and aggregation effects.
- Survivorship and selection bias.
- Regression to the mean.
- Garden of forking paths and $p$-hacking.
- Correlation versus causation, with a concrete example.

> **Module completion gate (3.4).** You can design a powered experiment, interpret it correctly, and name the trap behind a misleading result.

---

## 3.5 — Statistical Inference for Regression

**Objective.** Understand what a fitted regression model actually claims and how much to trust it.

### Module 3.5.1 — Regression assumptions and diagnostics

- Linearity, independence, homoscedasticity, normality of residuals.
- Residual plots and what patterns reveal.
- Leverage and influence; Cook's distance.
- Multicollinearity and variance inflation factor.
- Autocorrelation in time series.

$$
\mathrm{VIF}_j=\frac{1}{1-R_j^2},\qquad
h_{ii}=x_i^\top(X^\top X)^{-1}x_i
$$

**Practice tasks**

- Produce four diagnostic plots for a fitted model and interpret each.
- Construct data with heteroscedastic errors and show that standard errors are wrong.

---

### Module 3.5.2 — Uncertainty in predictions

- Standard errors of coefficients and their interpretation.
- Prediction intervals versus confidence intervals for the mean.
- Robust and clustered standard errors.
- Bootstrap for regression coefficients.
- Weighted least squares when variance is known to differ.

$$
\hat y \pm t_{n-p,\,1-\alpha/2}\,\hat\sigma\sqrt{1+x^\top(X^\top X)^{-1}x}
$$

**Practice tasks**

- Fit the same model with `statsmodels` and with a bootstrap; compare coefficient intervals.
- Explain, with a plot, why a prediction interval is always wider than a mean-response interval.

---

### Module 3.5.3 — Model comparison and selection

- $R^2$ versus adjusted $R^2$.
- AIC, BIC, and their assumptions.
- Likelihood ratio tests for nested models.
- Cross-validated comparison (a preview of Level 6).
- The danger of selecting on the same data used to evaluate.

> **Module completion gate (3.5).** You can fit a regression, check its assumptions, report coefficients with uncertainty, and explain what the model does and does not claim.

---

## 3.6 — Causal Inference Essentials

**Objective.** Know when you can claim "caused" and when you must say "associated".

### Checklist

- Potential outcomes and the fundamental problem of causal inference.
- Randomised experiments as the gold standard.
- Confounders and backdoor paths (intuition, not full graph theory).
- Propensity scores and matching.
- Difference-in-differences and the parallel-trends assumption.
- Instrumental variables at a conceptual level.
- Directed acyclic graphs for reasoning about bias.
- When ML prediction is not causal estimation — and why this matters in product decisions.

$$
\tau_{\mathrm{ATE}}=\mathbb{E}\left[Y(1)-Y(0)\right],\qquad
\tau_{\mathrm{ATT}}=\mathbb{E}\left[Y(1)-Y(0)\mid T=1\right]
$$

**Practice tasks**

- Construct a simulated dataset with a confounder and show that the naive difference is biased.
- Estimate the effect with matching and with difference-in-differences; compare with the true effect.
- Draw a DAG for a product question and identify the minimal adjustment set.

> **Module completion gate (3.6).** You can state the causal question, the identification assumption, and the estimator — and say what would invalidate it.

---

## 3.7 — Bayesian Thinking for ML

**Objective.** Use probabilistic reasoning where it genuinely improves decisions, and recognise where it is unnecessary overhead.

### Checklist

- Priors as regularisation and the map to ridge/lasso.
- Posterior predictive distributions and uncertainty in forecasts.
- Credible versus confidence intervals.
- Bayesian A/B testing and expected loss decisions.
- Bayesian optimisation for hyperparameters.
- Calibration as a practical alternative to full Bayesian inference.
- Cost of Bayesian methods: computation, specification, and communication.

### Practice tasks

- Compute a posterior over a conversion rate and the probability that variant B beats A.
- Compare a Bayesian decision rule with a frequentist test on the same simulated data.
- Explain when you would and would not pay the cost of a full posterior.

> **Module completion gate (3.7).** You can justify the choice between frequentist and Bayesian approaches for a concrete decision.

---

## 3.8 — Simulation and Statistical Computing

**Objective.** Use simulation to understand any method faster than you can derive it.

### Checklist

- Monte Carlo estimation and its convergence rate $O(1/\sqrt n)$.
- Variance reduction: antithetic variates, control variates, importance sampling.
- Simulating from arbitrary distributions: inverse CDF, rejection sampling.
- Designing a simulation study to compare estimators.
- Reporting simulation results with Monte Carlo error.
- Reproducibility in simulation (seeds, streams, repeated runs).

$$
\hat\mu_{\mathrm{MC}}=\frac{1}{n}\sum_{i=1}^n f(x_i),\qquad
\mathrm{SE}(\hat\mu_{\mathrm{MC}})=\frac{s}{\sqrt n}
$$

### Practice tasks

- Estimate $\pi$ by Monte Carlo and report the error versus $n$.
- Run a simulation study comparing three estimators across 500 replications, reporting bias, variance, and coverage.
- Show how importance sampling reduces variance for a rare-event probability.

> **Module completion gate (3.8).** You can answer "how does this method behave?" with a simulation, and report the answer with an error bar.

---

## 3.9 — Level 3 Capstone: Statistical Inference Toolkit

### Project: `stats-infer` — inference, resampling, and an experiment study

**Difficulty.** Intermediate → Advanced

**Purpose.** Build the statistical toolbox you will reuse in every evaluation you run, and use it to answer a real question with defensible uncertainty.

### A. Functional requirements

**Part 1 — Estimation library**

- Descriptive statistics with correct missing-data behaviour.
- Standard errors: analytic, bootstrap, and jackknife.
- Confidence intervals: normal, $t$, percentile bootstrap, basic bootstrap.
- Hypothesis tests: one-sample and two-sample $t$, Welch, chi-square, Mann–Whitney, permutation.
- Multiple-comparison corrections: Bonferroni, Holm, Benjamini–Hochberg.
- Power and sample-size calculators for proportions and means.

**Part 2 — Regression inference**

- OLS with coefficient standard errors and $p$-values.
- Robust (HC1) standard errors.
- Bootstrap coefficient intervals.
- Diagnostic plots generated automatically.

**Part 3 — Simulation study**

- A configurable simulation harness: true effect, sample size, noise, test choice.
- Run at least 1,000 replications per configuration.
- Report bias, empirical standard error, coverage of the 95% interval, and power.
- A results table and figure showing how each property changes with $n$ and effect size.

**Part 4 — Applied experiment report**

- Pick one real question answerable with public data.
- State the estimand, the identification assumption, and the analysis plan *before* analysing.
- Report the effect with an interval, plus a sensitivity analysis.
- Write a one-page memo with a recommendation.

### B. Suggested architecture

```text
stats-infer/
├── src/stats_infer/
│   ├── estimate.py      # SEs, CIs, bootstrap, jackknife
│   ├── tests_stats.py   # hypothesis tests + corrections
│   ├── power.py         # power and sample size
│   ├── regression.py    # OLS, robust SEs, diagnostics
│   └── simulate.py      # simulation harness
├── reports/
│   ├── simulation_study.md
│   └── experiment_memo.md
├── figures/
└── tests/
```

### C. Acceptance targets

| Component | Target |
|---|---|
| Confidence intervals | Empirical coverage within 1.5% of nominal at $n=100$ |
| $t$-test | Matches SciPy to $10^{-10}$ |
| Bootstrap | Interval matches SciPy's bootstrap to within Monte Carlo error |
| Power calculator | Simulated power within 2% of the analytic calculation |
| Regression SEs | Match `statsmodels` to $10^{-8}$ (classical) and to $10^{-6}$ (HC1) |
| Simulation study | 1,000+ replications per cell, Monte Carlo error reported |

### D. Stretch goals

- Add a Bayesian estimation module (conjugate models and a simple Metropolis sampler).
- Add sequential testing (always-valid $p$-values).
- Add CUPED variance reduction to the experiment analysis.
- Build a CLI: `stats-infer power --baseline 0.10 --mde 0.02`.
- Publish the experiment memo as a blog-style report.

### E. Acceptance criteria

| Area | Required evidence |
|---|---|
| **Correctness** | All routines validated against SciPy/statsmodels |
| **Inference quality** | Simulation study shows calibrated coverage, not just point accuracy |
| **Documentation** | Each method documented with its assumptions |
| **Applied work** | One real analysis with a pre-stated plan and a sensitivity analysis |
| **Reproducibility** | Seeded simulation; one command regenerates the report |

> Level 3 is complete when the toolkit passes its targets **and** the simulation study demonstrates that your intervals actually cover at the nominal rate.

---

## Level 3 interview question bank

### A. Probability

- What is the difference between a probability mass function and a density?
- Why can a density exceed 1?
- When would you model counts with Poisson, and when would that be wrong?
- What does the covariance matrix tell you, and what does it not?
- What is conditional independence, and where does it appear in ML?
- Explain the difference between correlation and dependence with an example.

### B. Estimation and inference

- What is the difference between standard deviation and standard error?
- What does the central limit theorem actually guarantee?
- When does the CLT fail, and what do you do instead?
- Derive the MLE for a Bernoulli parameter.
- What is the difference between a confidence interval and a credible interval?
- How do you interpret a $p$-value to a product manager?
- What is power, and why should it be computed before the experiment?
- What is multiple testing, and how do you correct for it?
- Why is bootstrapping useful, and when does it fail?

### C. Experiments

- Design an A/B test for a new ranking model.
- What is a sample ratio mismatch, and why is it a red flag?
- Why is peeking at results dangerous?
- What is CUPED, and why does it help?
- How would you detect a 0.5% effect when your MDE is 2%?
- What are guardrail metrics, and give three examples.
- Your test shows a 1% lift with $p=0.03$; do you ship?

### D. Causality

- What is the fundamental problem of causal inference?
- When can you claim causation from observational data?
- What is a confounder, and how do you handle one?
- What assumption does difference-in-differences require?
- Why is a highly accurate predictive model not necessarily a causal model?

### E. Applied scenarios

- Your model's offline AUC improved but online revenue did not. What statistical explanations would you check first?
- A metric moved 3% after a deploy, but no experiment was run. What would you check before believing it?
- Your colleague reports an effect from a sample of 40 users. What questions do you ask?
- Two segments show opposite effects. How do you report the overall result?

### Interview readiness standard

1. State the estimand or quantity precisely.
2. Name the assumption required.
3. Describe the estimator or test.
4. Give the interval, not just the point estimate.
5. Name what would invalidate the conclusion.

---

## Level 3 final assessment

### Knowledge

- I can choose a distributional model from a data-generating story.
- I understand sampling distributions, standard error, and the CLT.
- I can derive MLEs and compute posteriors for conjugate models.
- I can design a powered experiment and interpret it correctly.
- I understand regression assumptions and uncertainty in predictions.
- I can distinguish association from causation and state the identifying assumption.
- I can use simulation to study a method's behaviour.

### Practical skills

- I have built confidence intervals four ways and checked their coverage.
- I have run a permutation test and a bootstrap analysis.
- I have run a multiple-comparison correction on many tests.
- I have designed an experiment with a pre-stated MDE.
- I have completed a simulation study with 1,000+ replications.
- I have written a decision memo with an interval and a sensitivity analysis.

### Project

- `stats-infer` passes all acceptance targets.
- The simulation study demonstrates correct coverage.
- The applied report states its assumptions before its results.

> **Level 3 completion rule.** If you can make a claim, attach an interval to it, name its assumptions, and describe what would falsify it — you are ready for Core ML.

---

# PHASE 1 CAPSTONE — FOUNDATIONS LAB

> **Purpose.** Prove the four levels work *together*. A single repository that ingests messy data, computes with vectorised code, models it with maths you implemented yourself, and reports results with correct uncertainty.

**Difficulty.** Intermediate → Advanced
**Suggested duration.** 1–2 weeks
**Depends on.** Levels 0, 1, 2, and 3.

## A. The brief

Pick **one real question** answerable with a public dataset — ideally one you care about (credit default, hospital readmission, crop yield, exam performance, electricity demand, IPL outcomes, anything with a defensible outcome variable).

Then produce:

1. **A package** — not a notebook — that loads, validates, cleans, and models the data.
2. **A from-scratch estimator** — logistic or linear regression implemented with your own autodiff from Level 2, with gradients derived in the README.
3. **A statistical claim** — an effect, a difference, or a prediction with an interval attached, and the assumptions stated.
4. **A decision memo** — one page, written for someone who will act on the result.
5. **A reproducible report** — one command regenerates every number and figure.

## B. Required deliverables

| # | Deliverable | What "done" looks like |
|---|---|---|
| 1 | **Ingestion + validation** | Schema checks, missingness report, duplicate detection, typed columns |
| 2 | **Vectorised pipeline** | No Python loops over rows; a benchmark table before/after |
| 3 | **From-scratch model** | Coefficients match `sklearn`/`statsmodels` within $10^{-6}$; gradient-checked |
| 4 | **Baseline comparison** | Trivial baseline, a library model, and your implementation, side by side |
| 5 | **Uncertainty** | Bootstrap or analytic interval on every headline number |
| 6 | **Simulation check** | A small simulation showing your interval covers at the nominal rate |
| 7 | **Decision memo** | Recommendation, effect size, interval, cost, risks, and what would change the decision |
| 8 | **Test suite** | Unit tests for data handling, model maths, and report generation |
| 9 | **CI** | Format, lint, type-check, and tests run on every push |
| 10 | **README** | Install, run, results table, limitations, and one honest failure |

## C. Suggested architecture

```text
foundations-lab/
├── pyproject.toml
├── README.md
├── src/foundations_lab/
│   ├── loader.py          # L0: robust loading, custom exceptions
│   ├── schema.py          # L0/L1: validation rules
│   ├── features.py        # L1: vectorised feature construction
│   ├── model.py           # L2: autodiff-based linear/logistic regression
│   ├── inference.py       # L3: bootstrap, intervals, tests
│   ├── report.py          # figures + markdown report generation
│   └── cli.py             # one command to reproduce everything
├── tests/
├── figures/
└── reports/
    ├── findings.md
    └── decision_memo.md
```

## D. Grading rubric

| Dimension | 1 — Not yet | 3 — Competent | 5 — Strong |
|---|---|---|---|
| **Correctness** | Results differ between runs | Reproducible with a seed | Reproducible, plus parity checks against a trusted library |
| **Numerical care** | Naive softmax/log | Stable implementations | Stability tested at extreme inputs |
| **Statistics** | Point estimates only | Intervals reported | Coverage verified by simulation |
| **Software** | One long script | Modular package with tests | CI, typing, CLI, and a clean history |
| **Communication** | Results only | Results with caveats | A memo that supports an actual decision |
| **Honesty** | Limitations omitted | Limitations listed | A failure analysed in depth, with a fix or a reason it cannot be fixed |

**Pass mark.** At least 3 in every dimension, with **Correctness** and **Statistics** at 4 or above.

## E. Defence questions

You should be able to answer these without notes:

- Which assumptions does your statistical claim rest on, and which are you least sure about?
- What did your from-scratch implementation do differently from the library version, and why?
- Where does your pipeline lose numerical precision?
- What would happen to your conclusion if the sample were 10× smaller? 10× larger?
- Which single number in your report are you least confident in?
- If your effect is real but small, what would you recommend?

---

# PHASE 1 FINAL ASSESSMENT

Complete this before starting Phase 2 (Core ML).

## Knowledge checklist

**Software (L0)**

- I can write tested, typed Python that a stranger can install and run.
- I understand Git workflows, including branches, pull requests, and conflict resolution.
- I can debug from a traceback and add logging that is actually useful.

**Computing (L1)**

- I think in arrays, shapes, and axes rather than loops.
- I can process a dataset larger than memory on a laptop.
- I know where floating point will hurt me and how to avoid it.
- I can profile a slow script and make it faster with evidence.

**Mathematics (L2)**

- I can derive and implement gradients for linear and logistic regression.
- I can derive PCA from the SVD and explain conditioning.
- I can write down and explain the update rules for SGD, momentum, and Adam.
- I can explain entropy, cross-entropy, KL divergence, and perplexity.

**Statistics (L3)**

- I can pick a data-generating model and check it.
- I can attach an interval to any estimate I report.
- I can design a powered experiment and interpret it honestly.
- I can say when a claim is causal and when it is not.

## Practical checklist

- [ ] Level 0 capstone (ML Data Quality Toolkit) passes its acceptance criteria.
- [ ] Level 1 capstone (`sci-core`) passes its correctness and performance targets.
- [ ] Level 2 capstone (`maths-engine`) passes all four parts.
- [ ] Level 3 capstone (`stats-infer`) demonstrates calibrated interval coverage.
- [ ] Phase capstone (`foundations-lab`) scores at least 3 in every rubric dimension.
- [ ] I have solved 25–35 algorithm problems and kept notes on each.
- [ ] I have a Git history that shows incremental, meaningful commits.
- [ ] I can run every project from a clean clone with one documented command.

## The self-honesty test

Answer these out loud, without notes. If any answer takes more than 60 seconds, revisit that level.

1. Why does vectorised NumPy beat a Python loop, mechanically?
2. Why is solving $Ax=b$ better than inverting $A$?
3. Derive the gradient of the logistic loss.
4. Why is the softmax implementation you learned in tutorials numerically wrong at large logits?
5. What is the difference between standard error and standard deviation?
6. What does a 95% confidence interval mean, precisely?
7. Why is ridge regression equivalent to a Gaussian prior?
8. What would make your A/B test result invalid?

> **Phase 1 is complete** when all five capstones pass and you can answer the eight questions above without hesitating.

---

# APPENDIX

## A. Formula sheet for Phases 1–3

| Topic | Formula |
|---|---|
| Norms | $\lVert x\rVert_1=\sum_i \lvert x_i\rvert$; $\lVert x\rVert_2=\sqrt{\sum_i x_i^2}$ |
| Cosine similarity | $\cos(u,v)=\dfrac{u^\top v}{\lVert u\rVert_2\lVert v\rVert_2}$ |
| OLS | $\hat\beta=(X^\top X)^{-1}X^\top y$ |
| Ridge | $\hat\beta=(X^\top X+\lambda I)^{-1}X^\top y$ |
| Projection | $P=X(X^\top X)^{-1}X^\top$ |
| SVD | $A=U\Sigma V^\top$; $A_k=\sum_{i\le k}\sigma_i u_i v_i^\top$ |
| Covariance | $\Sigma=\frac{1}{n-1}\sum_i (x_i-\bar x)(x_i-\bar x)^\top$ |
| Gradient descent | $\theta_{t+1}=\theta_t-\eta\nabla_\theta\mathcal{L}$ |
| Adam | $m_t=\beta_1m_{t-1}+(1-\beta_1)g_t$; $v_t=\beta_2v_{t-1}+(1-\beta_2)g_t^2$ |
| Stable softmax | $\mathrm{softmax}(z)_i=\dfrac{e^{z_i-m}}{\sum_j e^{z_j-m}}$, $m=\max_j z_j$ |
| Log-sum-exp | $\log\sum_i e^{z_i}=m+\log\sum_i e^{z_i-m}$ |
| Entropy | $H(p)=-\sum_x p(x)\log p(x)$ |
| Cross-entropy | $H(p,q)=-\sum_x p(x)\log q(x)$ |
| KL divergence | $D_{\mathrm{KL}}(p\Vert q)=\sum_x p(x)\log\frac{p(x)}{q(x)}$ |
| Bayes | $p(\theta\mid\mathcal{D})=\dfrac{p(\mathcal{D}\mid\theta)p(\theta)}{p(\mathcal{D})}$ |
| MLE | $\hat\theta=\arg\max_\theta\sum_i\log p(x_i\mid\theta)$ |
| Standard error | $\mathrm{SE}(\bar x)=\sigma/\sqrt n$ |
| Confidence interval | $\hat\theta\pm t_{1-\alpha/2,\,n-1}\,\mathrm{SE}$ |
| Sample size | $n\approx\dfrac{2\sigma^2(z_{1-\alpha/2}+z_{1-\beta})^2}{\Delta^2}$ |
| MSE decomposition | $\mathrm{MSE}=\mathrm{Bias}^2+\mathrm{Variance}$ |
| Central limit theorem | $\sqrt n(\bar X-\mu)\xrightarrow{d}\mathcal{N}(0,\sigma^2)$ |

## B. Sixteen-week schedule

| Weeks | Focus | Milestone |
|---|---|---|
| 1–2 | L0: Python core, data structures, functions | 15 small programs complete |
| 3 | L0: modules, OOP, Git | Data validation package merged |
| 4 | L0: testing, debugging, terminal, environments | Break-and-repair project done |
| 5 | L0: APIs, code quality **+ L0 capstone** | ML Data Quality Toolkit shipped |
| 6 | L1: NumPy, array thinking, broadcasting | Vectorisation exercises done |
| 7 | L1: Pandas, joins, reshaping **+ L1 capstone** | `sci-core` benchmarks green |
| 8 | L2: linear algebra I–II | PCA derived and implemented |
| 9 | L2: calculus, matrix calculus, autodiff | Autodiff engine passes gradient checks |
| 10 | L2: probability, statistics, optimisation | Optimisers compared on a loss surface |
| 11 | L2: information theory **+ L2 capstone** | `maths-engine` complete |
| 12 | L3: distributions, sampling, CLT | Distribution and CLT study done |
| 13 | L3: estimation, hypothesis testing, power | Power calculator validated |
| 14 | L3: regression inference, causality | Regression diagnostics report |
| 15 | L3: simulation **+ L3 capstone** | `stats-infer` coverage verified |
| 16 | Phase capstone and defence | `foundations-lab` passes rubric |

> If you are working and studying, stretch this to 20–24 weeks. The ordering matters; the calendar does not.

## C. Recommended resources

### Books

| Book | Use it for |
|---|---|
| *Python Crash Course* — Matthes | L0 if you are new to programming |
| *Fluent Python* — Ramalho | L0–L1 depth on Python semantics |
| *Python for Data Analysis* — McKinney | L1 Pandas, written by Pandas' author |
| *Mathematics for Machine Learning* — Deisenroth et al. | L2, the primary text |
| *Linear Algebra Done Right* — Axler | L2, if you want rigour |
| *All of Statistics* — Wasserman | L3, concise and complete |
| *Statistical Inference* — Casella & Berger | L3, deeper theory |
| *Trustworthy Online Controlled Experiments* — Kohavi et al. | L3, experiments in industry |
| *Think Stats* / *Think Bayes* — Downey | L3, intuition-first alternatives |

### Courses

| Course | Focus |
|---|---|
| MIT 18.06 — Linear Algebra (Strang) | L2 linear algebra |
| MIT 18.01 / 18.02 — Calculus | L2 calculus |
| MIT 6.431 — Probabilistic Systems | L3 probability |
| Stanford CS229 lectures 1–4 | L2–L3 applied maths for ML |
| fast.ai — Practical Deep Learning (first lessons) | motivation and momentum |
| Kaggle Learn — Python, Pandas | quick drills for L0–L1 |

### Practice

- **LeetCode / NeetCode 150** — 25–35 problems is enough for this phase.
- **HackerRank SQL** — if joins still feel shaky.
- **Exercism Python track** — good for L0 fluency and review.
- **Papers with Code** — skim, do not study, until Level 12.

## D. The ten most common ways to fail this phase

| Failure | Symptom | Fix |
|---|---|---|
| Tutorial hopping | You can follow but not build | Close the tutorial, rebuild from memory |
| Maths by watching | Derivations look familiar but you cannot reproduce them | Derive on paper, then implement and gradient-check |
| Notebook-only code | Nothing is reusable or testable | Move logic into `src/` with tests |
| Ignoring numerical stability | Softmax produces NaNs at scale | Implement stable versions and test extremes |
| Point estimates only | No intervals anywhere | Attach an interval to every headline number |
| No baseline | You cannot tell if a model is good | Always compute the trivial baseline first |
| Perfectionism on L0 | Four weeks polishing a CSV loader | Ship, then move; depth comes in later levels |
| Skipping statistics | You can build but cannot defend | Do L3 properly — it decides interviews |
| Silent data errors | Metrics are wrong, nobody notices | Tests on data + validation rules |
| No Git history | One giant commit at the end | Commit daily, in small meaningful steps |

## E. Progress tracker

| Level | Capstone | Repo link | Tests green | Benchmarks recorded | Defence rehearsed |
|---|---|---|---|---|---|
| L0 | ML Data Quality Toolkit | | ☐ | ☐ | ☐ |
| L1 | `sci-core` | | ☐ | ☐ | ☐ |
| L2 | `maths-engine` | | ☐ | ☐ | ☐ |
| L3 | `stats-infer` | | ☐ | ☐ | ☐ |
| Phase | `foundations-lab` | | ☐ | ☐ | ☐ |

---

## What comes next

**Phase 2 — Core ML · Levels 4–6**

| Level | Title | What it adds |
|---|---|---|
| **L4** | Data Analysis and Feature Engineering | Turning raw data into signal, without leakage |
| **L5** | Classical Machine Learning | The models that still win on tabular data |
| **L6** | Model Evaluation and Generalization | Proving a model actually generalises, and where it fails |

Phase 2 assumes everything in this document: you will build pipelines (L0), compute with arrays (L1), derive the losses (L2), and report metrics with intervals (L3). If any of those feels shaky, the leak will show up there.

*Phase 1 of 6 · Levels 0–3 of 18 · Foundations*
