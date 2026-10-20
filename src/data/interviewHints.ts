export interface InterviewQuestionHint {
  clues: string[];
  howToStructure: string;
}

const SPECIFIC_HINTS: Record<string, { clues: [string, string, string]; howToStructure: string }> = {
  // ───────────────── LEVEL 0: SOFTWARE ENGINEERING FUNDAMENTALS ─────────────────
  'level-0-q-1': {
    clues: [
      'Compare mutability (in-place modification vs fixed after creation) and hashability (which one can be a dict key or set element?).',
      'Think about memory allocation: dynamic over-allocation for resizing vs a single fixed-size block.',
      'In ML pipelines, where do you want fixed shapes/configs (tuple) vs accumulating batch outputs (list)?',
    ],
    howToStructure:
      '1) State mutability & syntax difference (`[]` vs `()`) → 2) Explain memory & hashability (`__hash__`) → 3) Give an ML example (tensor shapes/immutable configs vs batch accumulation) → 4) Mention the gotcha of a mutable object nested inside a tuple.',
  },
  'level-0-q-2': {
    clues: [
      'Compare what each stores: unique keys only (`{k}`) vs key-to-value mappings (`{k: v}`), and mention insertion-order preservation in Python 3.7+.',
      'Ask yourself what data structure backs both under the hood (hash tables) and what average lookup complexity that gives ($O(1)$).',
      'Think about ML use cases: checking train/test ID overlap (`set`) vs token-to-index vocabularies (`dict`).',
    ],
    howToStructure:
      '1) Contrast unique elements (`set`) vs key-value mapping (`dict`) → 2) Explain shared hash-table mechanics ($O(1)$ average lookup) → 3) Connect to ML (leakage ID check vs vocabulary lookup) → 4) Note the unhashable-key `TypeError` and `{}` empty-dict trap.',
  },
  'level-0-q-3': {
    clues: [
      'Define whether an object’s value can change in-place (`id(x)` stays the same) vs creating a new object on modification.',
      'Ask when Python evaluates default parameter expressions (`def fn(x=[]):`) — at `def` import time or at each call?',
      'What happens on the 2nd and 3rd call if you append to a default list, and how does `x: list | None = None` solve it?',
    ],
    howToStructure:
      '1) Contrast in-place mutation (`list`, `dict`, `set`) vs immutable (`int`, `str`, `tuple`) → 2) Explain that default args are bound once at function definition time → 3) Show how state leaks across calls → 4) State the `None` sentinel pattern.',
  },
  'level-0-q-4': {
    clues: [
      'Contrast value equality (`__eq__`) with object identity in memory (`id(a) == id(b)`).',
      'Why should you always check `x is None` instead of `x == None` (especially with NumPy arrays or Pandas Series)?',
      'Think about Python integer/string interning: why might `a is b` work for `256` by accident but fail for larger objects?',
    ],
    howToStructure:
      '1) Define `==` (value equality via `__eq__`) vs `is` (pointer/memory identity) → 2) Give the `is None` singleton rule → 3) Explain how NumPy `arr == None` returns an elementwise array or fails → 4) Warn against relying on CPython small-int caching.',
  },
  'level-0-q-5': {
    clues: [
      'Trace what happens to `len(lst)` when you pass `[4, 5]` to `.append()` vs `.extend()`.',
      'Which one adds its argument as a single nested element, and which iterates over its argument?',
      'What is the time complexity of each: $O(1)$ amortized vs $O(k)$ where $k$ is the iterable length?',
    ],
    howToStructure:
      '1) Contrast adding one item (`append`) vs unpacking an iterable (`extend`) → 2) Walk through `[1, 2].append([3, 4])` vs `[1, 2].extend([3, 4])` → 3) State $O(1)$ vs $O(k)$ complexity → 4) Mention the trap of passing a `str` to `extend()` (splits into characters).',
  },
  'level-0-q-6': {
    clues: [
      'Think about declarative single-line transformation/filtering `[f(x) for x in xs if cond(x)]` vs multi-step imperative logic.',
      'When does a comprehension hurt readability (nested 3-level loops, side effects, exception handling, logging)?',
      'What if the output has 10M items — should you allocate a full list comprehension or use a generator expression `(...)`?',
    ],
    howToStructure:
      '1) Define list comprehension as a concise map/filter construct → 2) Explain why it is slightly faster than `.append()` loops → 3) List when to prefer a `for` loop (side effects, `try/except`, complex nesting) → 4) Note memory cost on large datasets.',
  },
  'level-0-q-7': {
    clues: [
      'What data type does `*args` collect positional arguments into, and what data type does `**kwargs` collect keyword arguments into?',
      'Think about both sides: packing arguments in `def f(*args, **kwargs)` vs unpacking at the call site `f(*seq, **cfg)`.',
      'Where do you see this constantly in ML (wrapping PyTorch `nn.Module.forward` or passing config dicts into model constructors)?',
    ],
    howToStructure:
      '1) Identify `*args` (tuple of extra positional args) and `**kwargs` (dict of extra keyword args) → 2) Show definition packing vs call-site unpacking → 3) Give an ML wrapper/decorator example → 4) Warn that overusing `**kwargs` hides typos from static type checkers.',
  },
  'level-0-q-8': {
    clues: [
      'Contrast eager allocation (storing all $N$ elements in RAM at once) vs lazy evaluation (yielding one item at a time via `yield`).',
      'Compare the memory footprint of `[x**2 for x in range(10**8)]` ($O(N)$) vs `(x**2 for x in range(10**8))` ($O(1)$).',
      'What happens if you try to iterate over a generator a second time or index it with `gen[5]`?',
    ],
    howToStructure:
      '1) Contrast lazy state suspension (`yield`) vs eager in-memory storage (`list`) → 2) Compare $O(1)$ vs $O(N)$ memory complexity → 3) Connect to streaming large ML JSONL/CSV datasets → 4) Highlight the single-pass exhaustion gotcha (`StopIteration`).',
  },
  'level-0-q-9': {
    clues: [
      'Think of a higher-order function `wrapper(fn)` that takes a callable and returns an enhanced callable without modifying the original function body.',
      'What cross-cutting concerns do decorators solve cleanly (timing, retry with exponential backoff, caching, `@torch.no_grad()`)?',
      'Why should you always put `@functools.wraps(fn)` on the inner wrapper function?',
    ],
    howToStructure:
      '1) Define a decorator as syntactic sugar `@dec` for `fn = dec(fn)` → 2) Explain separation of cross-cutting concerns (logging, timing, retries) → 3) Cite `@torch.no_grad()` or `@lru_cache` → 4) Mention `@functools.wraps` to preserve `__name__` and docstrings.',
  },
  'level-0-q-10': {
    clues: [
      'When you call `model.predict(X)`, how does Python know *which* instance’s weights and attributes to access?',
      'Translate `instance.method(arg)` into the underlying class call `Class.method(instance, arg)`.',
      'Is `self` a reserved keyword in Python or a strong naming convention for the first instance parameter?',
    ],
    howToStructure:
      '1) Explain `self` as the explicit reference to the current object instance → 2) Show how `obj.m(x)` desugars to `Cls.m(obj, x)` → 3) Explain how it binds per-instance state (like fitted scalers or weights) → 4) Contrast with `@staticmethod` and `@classmethod` (`cls`).',
  },
  'level-0-q-11': {
    clues: [
      'Where is each defined (directly inside `class Foo:` body vs on `self.x` inside `__init__`)?',
      'Which one is shared across every instance of the class, and which is isolated per object?',
      'What bug happens if you put a mutable list `history = []` as a class attribute and append to it across different model instances?',
    ],
    howToStructure:
      '1) Contrast class-level shared state vs per-instance `self.__dict__` state → 2) Explain attribute lookup order (instance first, then class) → 3) Give a good use case for each (class constants vs fitted model parameters) → 4) Warn about shared mutable class attributes.',
  },
  'level-0-q-12': {
    clues: [
      'Think about signalling contract violations or unrecoverable runtime states immediately instead of returning `None` or `-1` that silently corrupts downstream math.',
      'When should you `raise ValueError` or `TypeError` (e.g., mismatched feature columns, NaN targets, empty training split)?',
      'Why is catching bare `except:` dangerous compared to catching specific exceptions (`except KeyError:`)?',
    ],
    howToStructure:
      '1) Define exceptions as structured runtime error signals that halt invalid execution → 2) Explain "fail fast, fail loud" at data/API boundaries → 3) Give an ML schema validation example → 4) Contrast specific exception handling vs silent bare `except:`.',
  },
  'level-0-q-13': {
    clues: [
      'What two dunder methods power the `with` statement (`__enter__` and `__exit__`)?',
      'What does `with` guarantee even if an uncaught exception or early `return` happens inside the block?',
      'Think of 3 places you use `with` in ML: file handles (`with open(...)`), database locks/connections, and `with torch.no_grad():`.',
    ],
    howToStructure:
      '1) Define context managers via `__enter__` setup and `__exit__` teardown → 2) State the deterministic cleanup guarantee (equivalent to `try...finally`) → 3) Give file I/O and `torch.no_grad()` examples → 4) Mention `@contextlib.contextmanager` for writing custom ones.',
  },
  'level-0-q-14': {
    clues: [
      'What value does Python assign to `__name__` when a file is executed directly (`python train.py`) vs when it is imported (`import train`)?',
      'What breaks in unit tests or Sphinx docs if top-level training/CLI code runs unconditionally on `import`?',
      'Why is this essential for `multiprocessing` / PyTorch `DataLoader(num_workers > 0)` on Windows and macOS?',
    ],
    howToStructure:
      '1) Contrast `__name__ == "__main__"` (direct execution) vs module name on `import` → 2) Explain how it lets a file be both an importable library and a runnable CLI script → 3) Highlight preventing accidental training runs during `pytest` collection → 4) Mention `multiprocessing` spawn safety.',
  },
  'level-0-q-15': {
    clues: [
      'Does Python’s runtime interpreter raise an error if you pass a `str` to `def scale(x: float) -> float:`?',
      'If runtime ignores them by default, what tools actually enforce them (`mypy`, `pyright`) vs runtime validators (`pydantic`, `beartype`)?',
      'How do type hints prevent bugs in multi-step ML data pipelines and improve IDE autocomplete?',
    ],
    howToStructure:
      '1) State clearly that standard Python does NOT enforce type hints at runtime → 2) Explain static checking (`mypy`/`pyright` in CI) vs runtime validation (`Pydantic`) → 3) Show how they document tensor/DataFrame contracts → 4) Note `__annotations__` introspection.',
  },
};

/**
 * Generates tailored, non-spoiler clues and an answer-formation blueprint
 * for any of the 532 interview questions across Levels 0–18.
 */
export function getQuestionHint(
  id: string,
  question: string,
  category: string,
  type: string,
  levelBadge: string
): InterviewQuestionHint {
  if (SPECIFIC_HINTS[id]) {
    return SPECIFIC_HINTS[id];
  }

  const q = question.toLowerCase();

  // Extract key domain concepts mentioned in the question to make clues laser-specific
  const clues: string[] = [];

  if (q.includes('difference between') || q.includes('versus') || q.includes(' vs ')) {
    clues.push(
      `Start by contrasting the two concepts along 3 axes: **what each represents/computes**, **its computational or statistical assumptions**, and **when one is strictly preferred over the other**.`
    );
  } else if (q.includes('derive') || q.includes('formula')) {
    clues.push(
      `Write down the starting objective or definition first, apply the key algebraic or calculus step (chain rule, log-likelihood, or SVD decomposition), and interpret each term in the final expression.`
    );
  } else if (q.includes('why ') || q.includes('how does ')) {
    clues.push(
      `Pinpoint the underlying mechanism in **${category}** — explain *what happens numerically or algorithmically* step by step rather than just stating the outcome.`
    );
  } else if (q.includes('design ') || q.includes('walk me through')) {
    clues.push(
      `Clarify the target metric, latency/QPS/cost constraints, and data grain first before proposing any model architecture.`
    );
  } else {
    clues.push(
      `Anchor your opening sentence in the core principle of **${category}** (${levelBadge}) and state the exact problem or failure mode this concept addresses.`
    );
  }

  // Second clue: domain-specific technical angle
  if (/time complexity|big-o|heap|binary search|bfs|dfs|sort|duplicate|top \$?k|reverse|merge|bracket/.test(q)) {
    clues.push(
      `Compare the naive brute-force complexity ($O(N^2)$ or $O(N \\log N)$) against the optimal data-structure choice (hash map/set for $O(1)$ lookup, min-heap of size $k$ for $O(N \\log k)$, two pointers, or stack).`
    );
  } else if (/numpy|broadcast|vectori|view|copy|axis|loc|iloc|pandas|groupby|parquet|csv|chunk|memory/.test(q)) {
    clues.push(
      `Think about memory layout (contiguous C-buffers, strides, views vs copies) and vectorised C/SIMD execution vs Python-level per-row object overhead.`
    );
  } else if (/float|0\.1 \+ 0\.2|cancellation|condition number|softmax|logsumexp|qr|normal equation|svd|eigen|determinant|rank|orthogonal|projection/.test(q)) {
    clues.push(
      `Focus on numerical stability and geometry: how finite IEEE-754 precision, extreme logits ($e^x$ overflow), or ill-conditioned singular values ($\\sigma_{\\max}/\\sigma_{\\min}$) amplify small errors.`
    );
  } else if (/gradient|jacobian|hessian|autodiff|backprop|chain rule|detach|no_grad|relu|xavier|he init|vanishing|exploding/.test(q)) {
    clues.push(
      `Trace the forward activation variance and the backward Jacobian product $\\prod J_l$: ask what is cached in memory during forward, and what causes gradients to shrink to $0$ or blow up to ` + '`NaN`' + `.`
    );
  } else if (/probability|likelihood|mle|prior|posterior|bayesian|clt|confidence interval|p-value|power|mde|type i|fdr|bootstrap|a\/b|cuped|srm|confounder|causal/.test(q)) {
    clues.push(
      `Distinguish sample statistics from population parameters, check independence/exchangeability assumptions, and consider variance reduction, multiple-testing inflation, or selection bias.`
    );
  } else if (/leakage|split|cross-validation|nested cv|time-series|group|smote|imbalance|threshold|calibration|ece|auc|pr-auc|ndcg|log loss|brier|conformal/.test(q)) {
    clues.push(
      `Check whether information from the future, target, or test group crossed the split boundary, and separate **ranking quality** (ROC-AUC/PR-AUC) from **calibrated probability decisions** under asymmetric costs.`
    );
  } else if (/ols|ridge|lasso|logistic|tree|random forest|boosting|xgboost|lightgbm|catboost|shap|permutation|bias.variance|double descent/.test(q)) {
    clues.push(
      `Analyse how the model partitions feature space or regularises weights ($L_1$ diamond corners vs $L_2$ spheres, bagging variance reduction vs sequential residual boosting) and how that affects bias-variance.`
    );
  } else if (/adam|adamw|sgd|momentum|warmup|schedule|batch size|norm|amp|ddp|gpu memory|checkpoint/.test(q)) {
    clues.push(
      `Connect optimizer states ($m_t, v_t$, decoupled weight decay), gradient noise scale, and curvature ($\\lambda_{\\max}(H)$) to training stability and GPU memory breakdown (weights + grads + optimizer states + activations).`
    );
  } else if (/cnn|conv|receptive field|resnet|lstm|rnn|attention|transformer|kv cache|flashattention|vae|elbo|gan|diffusion|gnn|quantis|prun|distill/.test(q)) {
    clues.push(
      `Compare inductive biases (translation equivariance vs all-to-all token routing), compute/memory scaling ($O(T^2)$ attention vs SRAM tiling vs KV cache bytes), and latency-accuracy trade-offs.`
    );
  } else if (/ssl|infonce|simclr|moco|byol|barlow|vicreg|clip|embedding|linear probe|collapse/.test(q)) {
    clues.push(
      `Ask what prevents a trivial constant representation (contrastive negatives + temperature $\\tau$, momentum encoder + stop-gradient, or covariance decorrelation) and how downstream transfer is measured.`
    );
  } else if (/llm|rag|prompt|lora|qlora|sft|preference|judge|vlm|ocr|detector|injection/.test(q)) {
    clues.push(
      `Weigh token cost, p95 latency (TTFT + decoding), retrieval recall vs generation faithfulness, adapter parameter efficiency ($BA$ low-rank updates), and adversarial safety guardrails.`
    );
  } else if (/nfr|slo|idempotent|skew|canary|shadow|blue\/green|rollback|alert|secret|qps|100x|cold-start|cache|degradation/.test(q)) {
    clues.push(
      `Think like a production systems owner: trace the request path, identify single points of failure (feature store latency, GPU saturation, silent data drift), and define automated rollback gates.`
    );
  } else {
    clues.push(
      `Identify the concrete trade-off (accuracy vs latency/cost, bias vs variance, simplicity vs flexibility) and back your claim with a measurable metric or diagnostic check.`
    );
  }

  // Third clue: edge case / failure mode / verification
  if (type === 'Debugging') {
    clues.push(
      `Order your diagnostic checks from **cheapest & most common** (data shapes, nulls/NaNs, label/split leakage, environment mismatch) to **model/optimizer internals**, and state the regression test you would add.`
    );
  } else if (type === 'Coding') {
    clues.push(
      `Before writing code, test your logic against boundary inputs (empty array, single element, all duplicates, extreme values/NaNs) and state both Time and Space Big-O complexity.`
    );
  } else if (type === 'Design') {
    clues.push(
      `End by stress-testing your design: ask what breaks first at $100\\times$ traffic, how you handle cold-start or delayed labels, and what your graceful degradation fallback returns.`
    );
  } else if (type === 'Scenario') {
    clues.push(
      `Don't give a "one-size-fits-all" answer — state the exact condition under which Option A wins vs when you would switch to Option B, and how you would validate the decision offline and online.`
    );
  } else {
    clues.push(
      `Name the #1 assumption that must hold for this to work, what breaks in production when that assumption is violated, and a concrete ML example where you used it.`
    );
  }

  const STRUCTURE_BY_TYPE: Record<string, string> = {
    Concept:
      'Step 1: One-sentence plain definition → Step 2: Core mathematical or mechanical intuition → Step 3: Concrete ML pipeline example → Step 4: Key assumption or failure mode.',
    Scenario:
      'Step 1: Clarify business objective & constraints (latency, cost, data size) → Step 2: Propose simplest baseline first → Step 3: Weigh trade-offs between 2–3 options → Step 4: Define offline + online validation metric.',
    Debugging:
      'Step 1: Rank top 3 root-cause hypotheses (data/split first, code/shapes second, model/optimiser third) → Step 2: Give the fastest diagnostic check to isolate each → Step 3: State the fix + regression test.',
    Design:
      'Step 1: Lock functional & non-functional requirements (QPS, p95 latency, cost) → Step 2: Define data & feature contracts → Step 3: Draw two-stage / serving architecture → Step 4: Cover evaluation, drift monitoring & fallback.',
    Coding:
      'Step 1: Clarify input/output types & edge cases → Step 2: State optimal data structure / vectorised approach → Step 3: Walk through implementation cleanly → Step 4: State Time & Space Big-O complexity.',
  };

  return {
    clues,
    howToStructure: STRUCTURE_BY_TYPE[type] || STRUCTURE_BY_TYPE.Concept,
  };
}
