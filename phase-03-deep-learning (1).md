# PHASE 3 — DEEP LEARNING

**ML Engineer / Applied Scientist Roadmap · Levels 7–9 of 18**

> **Phase goal.** Stop treating neural networks as a library call. Build one from scratch, understand why training succeeds or collapses, and learn to choose an architecture from evidence rather than fashion. By the end of this phase you can train, debug, ablate, and defend any deep model from an MLP to a transformer.

---

## Phase dashboard

| Item | Details |
|---|---|
| **Phase** | 3 — Deep Learning |
| **Levels** | L7 · L8 · L9 |
| **Difficulty** | Intermediate → Advanced |
| **Suggested duration** | 12–16 weeks at 2–3 hours/day |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Main frameworks** | PyTorch, `torch.autograd`, `einops`, Weights & Biases / MLflow, Hugging Face `transformers` (late L9) |
| **Compute** | One GPU strongly recommended (Colab/Kaggle free tiers are enough for every project here) |
| **Entry requirement** | The PyTorch readiness bridge in this document — unless you already train models in PyTorch |
| **Capstone projects** | 3 level capstones + 1 phase capstone |
| **Final outcome** | Implement autograd and backprop, diagnose any training failure from curves and gradients, and select, train, and ablate a modern architecture with measured evidence. |

**Prerequisites.** Phase 2 complete. Specifically: you can derive gradients (L2), you evaluate with honest splits and intervals (L6), you have a leak-proof pipeline (L4), and you can write a PyTorch training loop (the readiness bridge below). Deep learning magnifies every weakness in those three areas — a bad split produces a spectacular fake result, and a bad gradient produces a model that trains but learns nothing.

---

## How this phase is structured

| Block | What it contains |
|---|---|
| **Prerequisite bridge** | The PyTorch API floor that Level 7 assumes — modules P.1–P.5, a warm-up build, and a gate |
| **Dashboard** | Level, difficulty, duration, tools, project, outcome |
| **Numbered sections** (`7.1`, `7.2`, …) | One theme each |
| **Modules** (`7.1.1`, `7.1.2`, …) | The actual study checklist |
| **Practice tasks** | Small exercises that force retrieval, not re-reading |
| **Module completion gate** | The proof that the section is done |
| **Mini-project** | A small build inside the level |
| **Capstone** | The level's main artefact, with acceptance criteria |
| **Interview bank** | Questions you should be able to answer after the level |
| **Level assessment** | A checklist before you move on |

> **The rule of this phase:** a deep model is not "working" because the loss went down. It is working when you can explain the gradient path, the optimisation behaviour, and the ablation that justified each architectural choice.

---

## Contents

| Level | Title | Sections | Duration | Capstone |
|---|---|---|---|---|
| [Bridge](#prerequisite-bridge--pytorch-readiness) | PyTorch readiness (entry gate) | P.1 – P.5 | 3–5 days | `torch-warmup` — a working training loop you can explain |
| [L7](#level-7--neural-networks-from-first-principles) | Neural Networks from First Principles | 7.1 – 7.11 | 4–5 weeks | `mlp-lab` — MLP from scratch + PyTorch parity |
| [L8](#level-8--optimization-and-training-dynamics) | Optimization and Training Dynamics | 8.1 – 8.11 | 4–5 weeks | `dynamics-lab` — optimiser and stability ablation study |
| [L9](#level-9--deep-learning-architectures) | Deep Learning Architectures | 9.1 – 9.11 | 4–6 weeks | `arch-zoo` — five architectures, one task, one comparison |
| [Phase capstone](#phase-3-capstone--deep-learning-bench) | Integration project | — | 1–2 weeks | `deep-bench` benchmark suite |

---

## Prerequisite bridge — PyTorch readiness

> **Who this is for.** Anyone who has not yet written a PyTorch training loop end to end. If you can build an `nn.Module`, step an optimiser, and explain what `optimizer.zero_grad()` does without looking it up, skip straight to 7.1 and prove it by passing the gate at the end of this block.

Until now the roadmap has deliberately stayed out of the framework API. **Level 1 §1.9** gives you *tensors* — creation, `dtype`, `device`, broadcasting, `requires_grad`, seeding — and **Level 2 §2.4** makes you write a reverse-mode autograd engine, which gives you the *idea* behind `backward()`. Neither teaches `nn.Module`, `torch.optim`, `DataLoader`, `state_dict`, or `train()` / `eval()`. Level 7 assumes all of them from its first line of code, so this bridge supplies exactly that surface and nothing else. It is not a level: no capstone, no new theory — a gate.

**Duration.** 3–5 days at 2–3 hours/day. **Not covered here:** CNNs, sequence models, transformers, and any deep-learning theory — those are Levels 7 and 9.

### Module P.1 — Tensors you can actually trust

- Re-do the §1.9 checklist from memory in ten minutes; if any item fails, reread that module before continuing.
- `float32` vs `float64` vs `bfloat16`: why the default differs between CPU and GPU, and where a silent downcast changes a result.
- `.to(device)` discipline: every tensor in an operation must live on the same device and dtype; know the error message before you meet it.
- Views versus copies — `view`, `reshape`, `permute`, `contiguous`, and when `view` throws.
- In-place operations and autograd: why `x += 1` can be fine and `x.add_(1)` on a leaf requiring grad is not.
- Shape arithmetic with `torch.einsum` and `einops`; write one `einsum` for a batch matmul and check it against `@`.

### Module P.2 — `nn.Module` and the parameter object model

- `nn.Parameter` versus a plain tensor; what `model.parameters()` and `model.named_parameters()` actually yield, and why optimisers receive the former.
- `nn.Linear` internals: weight shape `(out, in)`, bias `(out,)`, initialisation distribution.
- Composition: `nn.Sequential`, nested modules, and how `state_dict()` flattens names (`0.weight`, `blocks.1.attn.in_proj_weight`).
- **Batch dimension first**, always: `(B, F)` in, `(B, C)` out. Most shape bugs in Level 7 are a missing batch axis, not a wrong formula.
- Save the `state_dict()`, not the model object; load with `strict=True` and understand what a key mismatch is telling you.
- Count parameters by hand for a two-layer MLP, then verify with `sum(p.numel() for p in model.parameters())`.

### Module P.3 — The canonical training loop

- The five calls that define training: `optimizer.zero_grad()` → forward → `loss` → `loss.backward()` → `optimizer.step()`. Know what state each one touches.
- What actually happens if you forget `zero_grad()`: gradients accumulate across batches, and your effective update silently becomes a sum over history.
- Losses: `nn.CrossEntropyLoss` takes **logits**, not probabilities; `BCEWithLogitsLoss` fuses sigmoid and loss for numerical stability; know the `reduction` options.
- Optimisers: `SGD` with momentum, `AdamW`; what learning rate does to the first hundred steps; why weight decay is not equivalent to L2 inside adaptive methods.
- `model.train()` versus `model.eval()`, and `torch.no_grad()` at inference — the three bugs these prevent: dropout at test time, stale batch-norm statistics, and a retained computation graph that eats memory.
- Determinism: `torch.manual_seed`, `np.random.seed`, `random.seed`, DataLoader worker seeding, `torch.use_deterministic_algorithms(True)`.

### Module P.4 — Data, batching, and pipeline honesty

- `Dataset` (`__len__`, `__getitem__`) and `DataLoader` (`batch_size`, `shuffle`, `num_workers`, `collate_fn`, `pin_memory`).
- Where augmentation belongs (training only) and why an augmentation applied to validation inflates nothing but destroys comparability.
- Split discipline: `Subset` with a fixed seed, then assert that no index appears in two splits. This is the Phase 2 leakage rule, re-implemented in framework code.
- Throughput: measure samples/sec, then find the bottleneck by comparing `num_workers=0` and `num_workers=8`.

### Module P.5 — Device, precision, and one profiling pass

- Place the model **and** each batch on the same device; then log the device once per run rather than debugging it later.
- Mixed precision in ten lines: `torch.autocast` plus `GradScaler`; when the speed-up is not worth the complexity (small models, CPU-only).
- Profile one training step with `torch.profiler` and name the top-three time consumers.
- Memory: batch size versus activation memory; read `torch.cuda.max_memory_allocated()` before and after doubling the batch.
- Checkpoint the whole run — model, optimiser, epoch, and RNG state — resume it, and verify the loss curve continues rather than jumps.

### Bridge mini-build — `torch-warmup`

```
torch-warmup/
├── README.md
├── src/
│   ├── data.py          # Dataset, DataLoader, seeded split + leakage assert
│   ├── model.py         # nn.Module, parameter count printed at init
│   ├── train.py         # the loop, AMP optional, checkpoint + resume
│   └── evaluate.py      # eval() + no_grad() + accuracy/loss
├── tests/
│   └── test_shapes.py   # batch shapes and split disjointness
└── results/
    └── curve.png
```

**Acceptance.** Fashion-MNIST reaches ≥ 90% test accuracy in ≤ 3 epochs (MNIST ≥ 97%); a resumed run reproduces the pre-checkpoint loss within $10^{-4}$; loading a saved `state_dict` into a fresh model yields identical logits.

**Practice tasks**

- Write the training loop from a blank file, from memory, five times — deleting it between attempts. Time the fifth; under 15 minutes is the target.
- Break the loop four ways on purpose: no `zero_grad()`, loss computed on softmax output, `eval()` left on during training, model on CPU while the batch is on GPU. Record each error message verbatim — you will meet all four again in 7.8.
- Predict the parameter count of `nn.Sequential(nn.Linear(784, 256), nn.ReLU(), nn.Linear(256, 10))` before running the code; then explain the 2,048-number gap if you used a bias in both layers.
- Explain in one paragraph why `step()` must follow `backward()`, and what `backward()` has written into `.grad` by the time `step()` reads it.

> **Bridge gate.** Do not start 7.1 until every box is ticked.
>
> - [ ] `torch-warmup` hits the accuracy target and the checkpoint resume is verified.
> - [ ] The loop has been written from memory five times; the fifth took under 15 minutes.
> - [ ] I can state the device, dtype, and shape of every tensor in one batch, at every step.
> - [ ] I can explain `zero_grad`, `backward`, `step`, `train`, `eval`, `no_grad`, and `state_dict` in one sentence each.
> - [ ] I have triggered and fixed all four deliberate breakages above.
>
> **Rule.** A shaky `optimizer.zero_grad()` costs more time inside 7.4 than this bridge costs now. Treat it as the reference implementation you are about to outgrow: in Level 7 you rebuild this same loop twice, once in NumPy with hand-derived gradients and once in PyTorch with the pieces taken apart.

---

# LEVEL 7 — NEURAL NETWORKS FROM FIRST PRINCIPLES

> **Goal.** Build a neural network twice — once in NumPy with hand-derived gradients, once in PyTorch — and understand every line of the training loop. No `model.fit()`, no hidden magic.

## Level dashboard

| Item | Details |
|---|---|
| **Level** | 7 — Neural Networks from First Principles |
| **Difficulty** | Intermediate → Advanced |
| **Suggested duration** | 4–5 weeks |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Core tools** | Python, NumPy, PyTorch, Matplotlib, `einops` |
| **Main project** | **`mlp-lab`** — a NumPy MLP with manual backprop, matched against a PyTorch implementation |
| **Final outcome** | Implement forward and backward passes for any feed-forward network, train it reliably, and debug it from first principles. |

**Prerequisites.** Level 2 §2.4 (matrix calculus, chain rule, reverse-mode autograd and gradient checking), Level 4 (a leak-proof feature pipeline), Level 6 (honest splits, intervals, and evaluation discipline), and the **PyTorch readiness bridge** above — Level 1 §1.9 supplies tensors, but `nn.Module`, `torch.optim`, `DataLoader`, and the training loop are taught in that bridge, not in Level 4. Level 4 is a data-and-features level; it is a prerequisite here for pipeline discipline, never for PyTorch.

---

## 7.1 — From Classical ML to Neural Networks

**Objective.** Know when a network is the right tool, and what it buys you over a boosted tree.

### Module 7.1.1 — What deep learning actually changes

- Representation learning: features are learned, not hand-built.
- Composition of simple non-linear units as a universal approximator.
- The three levers: data, compute, and inductive bias.
- Regimes where deep learning wins: high-dimensional perceptual data, sequences, generative tasks.
- Regimes where it loses: small tabular data, strict interpretability, tight latency with no GPU.

$$
f(x)=W_3\,\sigma\!\left(W_2\,\sigma\!\left(W_1 x+b_1\right)+b_2\right)+b_3
$$

**Practice tasks**

- Take a tabular dataset you modelled in L5 and train an MLP on it; report the honest comparison.
- Explain, with your numbers, why the GBDT won or lost.

---

### Module 7.1.2 — Inductive bias and parameter sharing

- What an inductive bias is, and why it is a *prior*, not a limitation.
- MLP: no structure assumed, all connections learned.
- CNN: locality and translation equivariance.
- RNN: temporal recurrence and weight sharing over time.
- Transformer: content-based routing with weak positional prior.
- Choosing an architecture is choosing which assumptions are true for your data.

$$
\text{params}_{\text{dense}}=d_{\text{in}}d_{\text{out}},\qquad
\text{params}_{\text{conv}}=k^2\,c_{\text{in}}c_{\text{out}}
$$

**Practice tasks**

- Compute the parameter count of a dense and a convolutional layer with the same input and output width, and explain the ratio.
- Write one paragraph on which inductive bias a tabular task violates most.

---

### Module 7.1.3 — The universal approximation idea, and its limits

- Universal approximation: a wide enough network can approximate a continuous function on a compact set.
- Why the theorem says nothing about learnability, data requirements, or generalisation.
- Depth versus width: why depth is exponentially more parameter-efficient for some functions.
- The gap between "can represent" and "will learn".

> **Module completion gate (7.1).** You can justify using (or not using) a neural network for a specific task with reference to data regime and inductive bias.

---

## 7.2 — Tensors, Shapes and the Computation Graph

**Objective.** Make shape discipline automatic, so debugging becomes about logic rather than dimensions.

### Module 7.2.1 — Tensor mechanics

- Creation, dtype, device, and contiguity.
- Broadcasting rules, and why silent broadcasting is a common bug source.
- `view` versus `reshape` versus `permute`; when `.contiguous()` is required.
- Indexing, masking, `gather`, `scatter`, and `index_select`.
- `einops.rearrange` and `einsum` for readable tensor algebra.
- Memory layout and the cost of transposes in hot loops.

$$
\text{einsum: } C_{ij}=\sum_k A_{ik}B_{kj}
\quad\Longleftrightarrow\quad \texttt{torch.einsum('ik,kj->ij', A, B)}
$$

**Practice tasks**

- Rewrite five `view`/`permute` chains with `einops` and confirm identical outputs.
- Reproduce a `view` error caused by a non-contiguous tensor, then fix it correctly.
- Write a shape-annotation docstring for every module in a small model.

---

### Module 7.2.2 — Modules, parameters and buffers

- `nn.Module`: `__init__`, `forward`, submodule registration, and `state_dict`.
- Parameters versus buffers: what gets gradients and what gets saved.
- `train()` versus `eval()` and the layers that care.
- `nn.Sequential`, `nn.ModuleList`, `nn.ModuleDict` and when each is appropriate.
- Hooks for inspection: forward hooks, backward hooks, activation statistics.
- Freezing and unfreezing parameters.

**Practice tasks**

- Build a model with a registered buffer and confirm it moves with `.to(device)`.
- Use a forward hook to log activation statistics for every layer in one pass.
- Freeze the first half of a network and verify with `requires_grad` and gradient checks.

---

### Module 7.2.3 — The computation graph

- Nodes as operations, edges as dependencies.
- Dynamic graphs in PyTorch versus static graphs in compiled frameworks.
- Why the graph is freed after `backward()` and what `retain_graph=True` costs.
- Graph breaks and their performance consequence.
- Reading a graph visually with `torchviz` or a profiler trace.

> **Module completion gate (7.2).** You can trace any shape through a model on paper, and no dimension error surprises you twice.

---

## 7.3 — The Perceptron and the MLP

**Objective.** Understand the smallest network completely before scaling up.

### Module 7.3.1 — Linear layer, then non-linearity

- Affine transformation $z=Wx+b$ and its geometric meaning.
- Why stacking linear layers collapses to a single linear map.
- The role of the activation: introducing curvature.
- Feature-space view: a network bends space until classes separate.

$$
W_2(W_1x+b_1)+b_2=(W_2W_1)x+(W_2b_1+b_2)
\;\Rightarrow\;
\text{no gain from depth without non-linearity}
$$

**Practice tasks**

- Prove algebraically and numerically that a two-layer linear network equals a one-layer linear model.
- Visualise how a 2-layer network transforms a 2D dataset before classification.

---

### Module 7.3.2 — Activations

- Sigmoid: saturation and vanishing gradients.
- Tanh: zero-centred but still saturating.
- ReLU: cheap, sparse, and the dying-ReLU failure mode.
- Leaky ReLU, ELU, GELU, SiLU: what each fixes.
- Choosing an activation: modern defaults and why they changed.

$$
\sigma(z)=\frac{1}{1+e^{-z}},\qquad
\mathrm{ReLU}(z)=\max(0,z),\qquad
\mathrm{GELU}(z)=z\,\Phi(z)
$$

| Activation | Range | Derivative behaviour | Typical use |
|---|---|---|---|
| Sigmoid | $(0,1)$ | saturates at both ends | output layer for binary tasks |
| Tanh | $(-1,1)$ | saturates, zero-centred | small RNNs, legacy |
| ReLU | $[0,\infty)$ | $0$ or $1$, dead-unit risk | default in CNNs |
| GELU / SiLU | approximately $[0,\infty)$ | smooth, near-ReLU | transformers |

**Practice tasks**

- Train identical networks with sigmoid versus ReLU and plot gradient norms per layer.
- Create dying ReLUs with a large learning rate and demonstrate the fix.

---

### Module 7.3.3 — Output layers and losses

- Binary: one logit with `BCEWithLogitsLoss` (never sigmoid + BCELoss).
- Multiclass: logits with `CrossEntropyLoss`, which applies log-softmax internally.
- Regression: linear output with MSE, L1, or Huber.
- Counts: Poisson or negative-binomial output parameterisation.
- Why passing probabilities where logits are expected is a silent quality bug.

$$
\mathcal{L}_{\text{CE}}=-\frac{1}{n}\sum_{i=1}^{n}\log\frac{e^{z_{i,y_i}}}{\sum_j e^{z_{ij}}},\qquad
\mathrm{BCEWithLogits}=\max(z,0)-zy+\log\left(1+e^{-\lvert z\rvert}\right)
$$

**Practice tasks**

- Show numerically that sigmoid + BCE produces worse gradients than BCE-with-logits at extreme logits.
- Implement `CrossEntropyLoss` from logits and verify against PyTorch.

---

> **Module completion gate (7.3).** You can choose the correct output layer and loss for five task types, and explain the failure mode of each wrong choice.

---

## 7.4 — Backpropagation from Scratch

**Objective.** Derive and implement the backward pass yourself, for a network with multiple layers.

### Module 7.4.1 — The chain rule on the graph

- Forward pass: cache the intermediate values you will need.
- Backward pass: start from $\partial\mathcal{L}/\partial\mathcal{L}=1$ and walk the graph in reverse topological order.
- The three reusable local gradients: linear, activation, loss.
- Shape discipline: every gradient has the shape of the thing it differentiates.

$$
\frac{\partial \mathcal{L}}{\partial W^{(\ell)}}=\delta^{(\ell)}\left(a^{(\ell-1)}\right)^\top,\qquad
\frac{\partial\mathcal{L}}{\partial a^{(\ell-1)}}=\left(W^{(\ell)}\right)^\top\delta^{(\ell)},\qquad
\delta^{(\ell)}=\frac{\partial\mathcal{L}}{\partial z^{(\ell)}}
$$

**Practice tasks**

- Derive the backward pass for a 3-layer MLP with ReLU and softmax cross-entropy, on paper.
- Implement it in NumPy, then verify every parameter's gradient with finite differences.

---

### Module 7.4.2 — A full NumPy MLP

- Layer classes with `forward` returning output plus cache, and `backward` consuming an upstream gradient.
- A `Sequential` container that chains forward and reverse.
- Loss modules with their own backward.
- An optimiser that consumes gradients and updates parameters.
- A training loop with batching, shuffling, and epoch-level validation.

$$
\theta \leftarrow \theta-\eta\,\frac{\partial\mathcal{L}}{\partial\theta}
\quad\text{applied to every parameter tensor}
$$

**Practice tasks**

- Implement a 2-layer MLP on MNIST in NumPy, reaching at least 96% test accuracy.
- Implement momentum and compare convergence against plain SGD at the same learning rate.

---

### Module 7.4.3 — Gradient checking

- Central differences and the choice of epsilon.
- Relative error thresholds and why absolute thresholds mislead.
- Checking a random subset of parameters rather than all of them.
- Common gradient bugs: missing transpose, wrong axis in a sum, forgetting the bias gradient, double-counting a shared parameter.

$$
\frac{\lVert g_{\text{analytic}}-g_{\text{numeric}}\rVert_2}{\lVert g_{\text{analytic}}\rVert_2+\lVert g_{\text{numeric}}\rVert_2}<\epsilon
\quad(\epsilon\approx10^{-7}\text{ in float64})
$$

**Practice tasks**

- Write a `grad_check` utility that reports per-parameter relative error.
- Deliberately break the transpose in the linear layer and confirm the checker catches it.

---

> **Module completion gate (7.4).** Your NumPy MLP trains on MNIST with gradient-checked layers, and you can teach the backward pass on a whiteboard without notes.

---

## 7.5 — Automatic Differentiation

**Objective.** Understand the machinery that replaces your hand-written backward pass.

### Module 7.5.1 — How autograd works

- Each tensor carries `grad_fn` and `requires_grad`.
- Reverse-mode differentiation over a dynamically built graph.
- Leaf tensors accumulate gradients; non-leaf tensors free them.
- `torch.no_grad()` for inference and evaluation, and its memory effect.
- `detach()` versus `.data` — and why `detach` is the correct habit.

$$
\text{var}(x)\ \text{for } x\sim\mathcal{N}(0,1) \Rightarrow \text{grad accumulates across backward calls unless zeroed}
$$

**Practice tasks**

- Print `grad_fn` chains for three expressions and draw the corresponding graph.
- Reproduce gradient accumulation by omitting `zero_grad()` and explain the numbers.

---

### Module 7.5.2 — Custom autograd functions

- Subclassing `torch.autograd.Function` with `forward` and `backward`.
- Saving tensors for backward with `ctx.save_for_backward`.
- Marking non-differentiable outputs.
- When a custom function is worth writing (memory, numerics, a fused kernel).

**Practice tasks**

- Implement a stable log-sum-exp as a custom autograd function and gradient-check it.
- Implement a straight-through estimator for quantisation and verify gradients flow.

---

### Module 7.5.3 — Backward hooks and gradient inspection

- Registering backward hooks to capture per-layer gradient norms.
- Detecting vanishing and exploding gradients early.
- Gradient clipping as a diagnostic *and* a fix.
- The gradient/parameter norm ratio as a training-health signal.

$$
\text{gradient ratio}_\ell=\frac{\lVert \nabla_\ell\rVert_2}{\lVert \theta_\ell\rVert_2}
$$

> **Module completion gate (7.5).** You can explain why autograd exists, write one custom function, and diagnose a training run from gradient statistics alone.

---

## 7.6 — Initialisation and Signal Propagation

**Objective.** Start training from a point where gradients can actually flow.

### Module 7.6.1 — Why initialisation matters

- Zero initialisation: all units identical, no symmetry breaking.
- Constant initialisation: same problem, different constant.
- Too large: saturated activations and exploding forward pass.
- Too small: shrinking signal and vanishing gradients.
- The variance-preservation goal: keep activation variance constant across layers.

$$
\operatorname{Var}(z^{(\ell)})=n_{\text{in}}\operatorname{Var}(W)\operatorname{Var}(a^{(\ell-1)})
\;\Rightarrow\;
\operatorname{Var}(W)=\frac{1}{n_{\text{in}}}\ \text{to preserve variance}
$$

**Practice tasks**

- Train with three initialisation scales and plot activation variance per layer.
- Show that symmetry prevents a zero-initialised network from learning.

---

### Module 7.6.2 — Xavier, He and orthogonal initialisation

- Xavier/Glorot for tanh and linear activations.
- He/Kaiming for ReLU (factor of 2 for the rectifier's variance).
- Orthogonal initialisation for recurrent and deep stacks.
- Bias initialisation, and why a small positive bias helps ReLU.
- Initialisation for residual networks: scaling the residual branch.

$$
W\sim\mathcal{N}\!\left(0,\frac{2}{n_{\text{in}}}\right)\ \text{(He)},\qquad
W\sim\mathcal{N}\!\left(0,\frac{2}{n_{\text{in}}+n_{\text{out}}}\right)\ \text{(Xavier)}
$$

**Practice tasks**

- Compare Xavier and He on a 20-layer ReLU network; report the depth at which each fails.
- Show that orthogonal initialisation improves an LSTM's early training stability.

---

### Module 7.6.3 — Normalisation at the point of initialisation

- Why normalisation layers reduce initialisation sensitivity.
- Pre-norm residuals and their effect on gradient flow.
- The interaction between initialisation scale and learning rate.

> **Module completion gate (7.6).** Given a failing deep network, you can identify whether the problem is initialisation, normalisation, or learning rate — and fix it.

---

## 7.7 — Data Loading and the Training Loop

**Objective.** Make the loop correct and fast, because a slow or wrong loop wastes weeks.

### Module 7.7.1 — Dataset and DataLoader

- `Dataset` protocol: `__len__` and `__getitem__`.
- Batching, shuffling, `drop_last`, and deterministic worker seeding.
- `num_workers`, pinning memory, and where the bottleneck usually is.
- Collation for variable-length sequences (padding and masking).
- Custom samplers: stratified, weighted, curriculum, and distributed.

**Practice tasks**

- Build a dataset that loads images from disk and measure throughput at 0, 2, 4 workers.
- Show the training loop starved by the data loader, then fix it.

---

### Module 7.7.2 — The canonical loop, written correctly

- Zero gradients, forward, loss, backward, step — in that order.
- Train versus eval mode, and `torch.no_grad()` for validation.
- Metric accumulation across batches without holding tensors.
- Checkpointing: model, optimiser, scheduler, epoch, and RNG state.
- Resuming training and proving it is bit-comparable.

$$
\text{epoch}:\ \text{shuffle}\rightarrow\text{batches}\rightarrow\text{update};\qquad
\text{validation}:\ \text{no grad},\ \text{eval mode}
$$

**Practice tasks**

- Write the loop from memory, with checkpointing and resume.
- Kill a run mid-epoch, resume it, and confirm the loss curve is continuous.

---

### Module 7.7.3 — Overfit one batch as the first test

- Why memorising ten examples isolates optimisation from generalisation.
- Interpreting success and failure of the overfit test.
- Common causes of failure: label mismatch, wrong loss, frozen parameters, detached graph, learning rate.
- The second test: verify the loss at initialisation is near $\log K$ for $K$ classes.

> **Module completion gate (7.7).** You can write the loop from memory and diagnose a model that fails the one-batch test in under ten minutes.

---

## 7.8 — Regularisation for Neural Networks

**Objective.** Control capacity deliberately, not by adding dropout everywhere and hoping.

### Module 7.8.1 — Dropout and its variants

- Dropout: masking, scaling, and the train/eval difference.
- Why dropout at inference must be disabled (and the calibration damage if it is not).
- Inverted dropout and the $1/(1-p)$ rescaling.
- Dropout on embeddings, attention, and residual branches.
- Variants: spatial dropout, DropPath/stochastic depth, and when each is used.

$$
h_i'=\frac{m_i}{1-p}h_i,\qquad m_i\sim\mathrm{Bernoulli}(1-p)
$$

**Practice tasks**

- Show accuracy collapsing when eval mode forgets to disable dropout.
- Compare dropout rates 0, 0.1, 0.3, 0.5 on the same architecture with a fixed protocol.

---

### Module 7.8.2 — Weight decay, early stopping and augmentation

- $L_2$ regularisation versus decoupled weight decay (AdamW).
- Early stopping on a validation metric, with patience and min-delta.
- Data augmentation as the strongest regulariser for vision and audio.
- Label smoothing and its effect on calibration.
- Mixup, CutMix, and their interaction with small datasets.

$$
\theta_{t+1}=(1-\eta\lambda)\,\theta_t-\eta\,\nabla_\theta\mathcal{L}(\theta_t)
\quad\text{(decoupled weight decay)}
$$

**Practice tasks**

- Compare Adam with $L_2$ in the loss versus AdamW on the same task.
- Show early stopping preventing overfitting and report the epoch it fires.

---

### Module 7.8.3 — Choosing regularisation from evidence

- Diagnose first: is the gap between train and validation large, or is both high?
- Regularise the side that is failing.
- Budget-aware choices: augmentation costs compute, dropout costs nothing.
- Interactions: dropout plus weight decay plus augmentation is not automatically better.

> **Module completion gate (7.8).** Each regulariser in your model has a measured justification and a known cost.

---

## 7.9 — Debugging Neural Networks

**Objective.** Turn "it doesn't learn" into a specific, testable hypothesis within minutes.

### Module 7.9.1 — The debugging ladder

Run these in order, and never skip a rung:

1. **Can it overfit ten examples?** If not, the bug is in the model, loss, labels, or gradient path.
2. **Is the initial loss sensible?** For $K$ classes, expect about $\log K$.
3. **Are shapes and dtypes what you think?** Print once with labels, not everywhere.
4. **Are gradients flowing?** Check per-layer gradient norms, not just the total.
5. **Is the data what you think it is?** Visualise inputs, labels, and a few predictions.
6. **Is the learning rate sane?** A five-point log sweep costs minutes and answers everything.
7. **Only then** consider architecture and regularisation.

$$
\text{initial loss}\approx\log K\ \text{for }K\text{ balanced classes}
$$

**Practice tasks**

- Take five broken training scripts and diagnose each using only the ladder.
- Record which rung found the bug and how long it took.

---

### Module 7.9.2 — Reading loss curves

- Train falling, validation falling: healthy.
- Train falling, validation rising: overfitting.
- Both flat and high: underfitting or a broken gradient.
- Both high and unstable: learning rate too high or data problem.
- Sudden spikes: bad batch, exploding gradients, or a data pipeline fault.
- Periodic oscillation: batch-size or sampler interaction.

**Practice tasks**

- Generate synthetic loss curves for each failure mode and write the correct diagnosis and intervention for each.
- Match six real (anonymised) curve screenshots to their causes.

---

### Module 7.9.3 — Failure catalogues

| Symptom | Likely cause | First check | Fix |
|---|---|---|---|
| Loss stuck at $\log K$ | no learning signal | gradients, labels | fix loss/labels, raise LR |
| Loss becomes NaN | overflow or bad LR | gradient norms | clip, lower LR, stable loss |
| Dead units after a few steps | large LR, ReLU | activation histogram | lower LR, LeakyReLU |
| Train fine, val chance | leakage in reverse (mismatched split) | pipeline | correct split |
| Accuracy plateaus at 60% | underfitting | learning curves | more capacity, better features |
| Wildly different runs | seed or data order | seeds | fix seeds, report variance |

> **Module completion gate (7.9).** Given a training log and nothing else, you can name the most likely failure and the first experiment to confirm it.

---

## 7.10 — Mini-project: Break and fix a training loop

- Take a working MNIST classifier.
- Introduce **eight deliberate faults**: wrong loss for logits, frozen first layer, missing `zero_grad`, dropout left on at eval, learning rate 100× too high, labels shuffled, `detach()` in the middle of the graph, and a data loader that returns the same batch every step.
- For each fault: write the symptom, the diagnostic that identifies it, the fix, and the test that would catch it next time.
- Produce a one-page diagnostic table from memory.

> **Gate.** A teammate can use your table to diagnose a broken loop without asking you anything.

---

## 7.11 — Level 7 Capstone: MLP from Scratch + PyTorch Parity

### Project: `mlp-lab` — two implementations, one truth

**Difficulty.** Intermediate → Advanced

**Purpose.** Prove you understand neural networks at the level of gradients and memory, not at the level of API calls.

### A. Functional requirements

**Part 1 — NumPy implementation (no deep-learning libraries)**

- `Linear`, `ReLU`, `GELU`, `Dropout`, and a `Sequential` container.
- Losses: softmax cross-entropy, binary cross-entropy with logits, MSE.
- Optimisers: SGD, momentum, RMSProp, Adam.
- A training loop with batching, shuffling, validation, and early stopping.
- Gradient checking for every layer and loss.

**Part 2 — PyTorch implementation**

- The identical architecture and hyperparameters in PyTorch.
- Identical weight initialisation (copy the same random draws where possible).
- A parity test: same initial weights ⇒ same logits and same losses to within $10^{-6}$.

**Part 3 — Ablation study**

- Initialisation: zero, small, Xavier, He.
- Activation: sigmoid, tanh, ReLU, GELU.
- Depth: 1, 2, 4, 8 hidden layers.
- Regularisation: none, dropout, weight decay, both.
- Report mean ± spread across at least three seeds for each configuration.

**Part 4 — Write-up**

- Derive the backward pass for the exact architecture implemented.
- A parity table (NumPy versus PyTorch) with tolerances.
- An ablation table with the winning configuration and the evidence.
- A "what failed" section documenting at least two bugs you introduced and found.

### B. Suggested architecture

```text
mlp-lab/
├── numpy_impl/
│   ├── layers.py        # Linear, activations, dropout
│   ├── losses.py        # CE, BCE-with-logits, MSE
│   ├── optim.py         # SGD, momentum, RMSProp, Adam
│   ├── model.py         # Sequential container
│   └── train.py
├── torch_impl/
│   ├── model.py         # mirrored architecture
│   └── train.py
├── parity/
│   └── test_parity.py   # same weights => same outputs
├── ablations/
│   └── configs.yaml
├── reports/
│   ├── derivation.md
│   ├── parity_table.md
│   └── ablation_table.md
└── tests/
```

### C. Acceptance targets

| Component | Target |
|---|---|
| Gradient check | Relative error $<10^{-6}$ for every parameter, float64 |
| MNIST accuracy (NumPy) | $\ge 97\%$ test accuracy |
| Parity | Logits match PyTorch to $<10^{-6}$ with shared initial weights |
| Ablation rigour | 3+ seeds per cell, mean ± spread reported |
| Failure documentation | At least 2 real bugs with symptom, cause, and fix |

### D. Stretch goals

- Add batch normalisation to the NumPy implementation and gradient-check it.
- Add mixed-precision simulation with `float32` and quantify accuracy loss.
- Implement a convolutional layer in NumPy and train a small CNN.
- Port the NumPy forward pass to `numba` and report the speed-up.

### E. Acceptance criteria

| Area | Required evidence |
|---|---|
| **Mathematical correctness** | Hand derivation matches implementation; gradient checks pass |
| **Parity** | Numerical agreement with PyTorch on shared weights |
| **Rigour** | Ablations across seeds with variance reported |
| **Understanding** | README explains every line of the backward pass |
| **Honesty** | Bugs found and documented, not hidden |
| **Reproducibility** | One command reproduces every table |

> Level 7 is complete when both implementations train to target, the parity table is green, and you can derive the backward pass from memory.

---

## Level 7 interview question bank

### A. Fundamentals

- What does a neural network compute, in one sentence?
- Why is a non-linear activation necessary?
- What is the difference between a parameter and a hyperparameter?
- What does the universal approximation theorem guarantee, and what does it not?
- Why does depth help more than width for some functions?
- What is an inductive bias, and what is the inductive bias of a CNN versus an MLP?

### B. Backpropagation

- Derive the backward pass for a two-layer network with ReLU and cross-entropy.
- Why do we cache activations during the forward pass?
- What is the cost of backprop relative to the forward pass, and why?
- How would you check a gradient implementation?
- What are three common gradient bugs and their symptoms?
- Why do we zero gradients between steps?

### C. PyTorch mechanics

- What does `.detach()` do, and when do you need it?
- What is the difference between `train()` and `eval()`?
- Why is `BCEWithLogitsLoss` preferred over sigmoid followed by BCE?
- What does `no_grad()` save?
- How do you freeze part of a model?
- What is a forward hook used for?

### D. Training

- Why do we check that the model can overfit one batch?
- What loss value do you expect at initialisation, and why?
- What happens if you initialise all weights to zero?
- Why Xavier for tanh and He for ReLU?
- What is dying ReLU, and how do you detect it?
- What is the difference between dropout at train and eval time?

### E. Debugging scenarios

- Loss is exactly constant at $\log K$. What do you check first?
- Loss goes to NaN after 200 steps. Give three causes and one fix each.
- Train accuracy is 99%, validation is 20%. What are the possible causes, including non-obvious ones?
- Your model trains but predictions are constant. What is the most likely bug?
- Two runs with the same config produce very different results. What do you fix and what do you report?

### Interview readiness standard

1. Draw the computation graph.
2. State the shapes at each step.
3. Give the gradient expression.
4. Name one numerical failure mode.
5. Give the diagnostic you would run first.

---

## Level 7 final assessment

### Knowledge

- I can explain representation learning and inductive bias.
- I can trace shapes through any feed-forward network.
- I can derive and implement backpropagation for a multi-layer network.
- I can explain what autograd does and write a custom function.
- I can justify an initialisation scheme.
- I can write the training loop from memory, correctly.
- I can diagnose a broken training run from curves and gradients.

### Practical skills

- I have trained an MLP in NumPy to at least 97% on MNIST.
- I have passed gradient checks at $10^{-6}$ relative error.
- I have achieved parity with a PyTorch implementation.
- I have run ablations across seeds and reported variance.
- I have broken and repaired a training loop in eight different ways.

### Project

- `mlp-lab` passes every acceptance target.
- The derivation document is written in my own words.
- I can explain any line of the backward pass without notes.

> **Level 7 completion rule.** If you can build, train, and debug a network without a framework hiding anything, you are ready for Level 8.

---

# LEVEL 8 — OPTIMIZATION AND TRAINING DYNAMICS

> **Goal.** Understand why deep networks train at all, why they stop training, and how to make training faster, more stable, and more reproducible. This is the level that separates people who tune by folklore from people who diagnose by mechanism.

## Level dashboard

| Item | Details |
|---|---|
| **Level** | 8 — Optimization and Training Dynamics |
| **Difficulty** | Advanced |
| **Suggested duration** | 4–5 weeks |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Core tools** | PyTorch, `torch.optim`, `torch.cuda.amp`, `torch.nn.parallel.DistributedDataParallel`, W&B/MLflow, `torch.profiler` |
| **Main project** | **`dynamics-lab`** — an optimiser, schedule, and stability ablation study with a reproducible report |
| **Final outcome** | Explain and control the optimisation process: choose optimisers and schedules from evidence, diagnose instability, and scale training to multiple GPUs. |

**Prerequisites.** Level 7. You need a working training loop you wrote yourself before you can study what happens inside it.

---

## 8.1 — Loss Landscapes and Why This Is Hard

**Objective.** Know what kind of problem gradient descent is actually solving.

### Module 8.1.1 — Non-convexity in high dimensions

- Convex versus non-convex: what guarantees are lost.
- Local minima, plateaus, and saddle points; why saddles dominate in high dimensions.
- Random matrix intuition: a random critical point is almost never a local minimum.
- The empirical finding: many well-performing low-loss regions, connected by paths.
- Why convergence theory for convex optimisation does not transfer directly.

$$
\text{a critical point with }k\text{ negative Hessian eigenvalues is a saddle of index }k;\quad
\Pr(\text{all positive})\to 0\ \text{as }d\to\infty
$$

**Practice tasks**

- Plot a 2D non-convex surface and show gradient descent stalling at a saddle.
- Add noise to the gradient and show the run escaping; explain why mini-batch noise does this.

---

### Module 8.1.2 — Curvature and conditioning

- The Hessian, its eigenvalues, and what they mean for step size.
- Ill-conditioning: a long narrow valley forces a small learning rate.
- Sharp versus flat minima and their generalisation behaviour.
- Why normalisation and residual connections improve conditioning.
- Second-order methods and why they are impractical at scale.

$$
\text{condition number }\kappa=\frac{\lambda_{\max}}{\lambda_{\min}},\qquad
\text{max stable step}\ \eta\lesssim\frac{2}{\lambda_{\max}}
$$

**Practice tasks**

- Compute the Hessian spectrum for a small network at initialisation and after training.
- Show a network that only trains with normalisation because of conditioning.

---

### Module 8.1.3 — Noise, batch size and the stochastic gradient

- Why the mini-batch gradient is a noisy estimate of the true gradient.
- Gradient noise scale and the linear scaling rule.
- Critical batch size: where more parallelism stops helping.
- Noise as an implicit regulariser.
- The trade-off between step count and step quality.

$$
g_B=\frac{1}{B}\sum_{i\in B}\nabla\ell_i,\qquad
\operatorname{Var}(g_B)\propto\frac{1}{B},\qquad
\eta_{\text{new}}=\eta_{\text{base}}\cdot\frac{B_{\text{new}}}{B_{\text{base}}}
$$

**Practice tasks**

- Train with batch sizes 32, 128, 512 and tune the learning rate for each; plot accuracy versus steps and versus wall clock.
- Find the batch size beyond which increasing it no longer reduces steps to target.

---

> **Module completion gate (8.1).** You can explain why a run stalls, oscillates, or diverges in terms of curvature, noise, and step size.

---

## 8.2 — Stochastic Gradient Descent and Momentum

**Objective.** Understand the baseline optimiser completely, including why momentum works.

### Module 8.2.1 — SGD and its failure modes

- The update rule and the effect of each hyperparameter.
- Oscillation across a narrow valley.
- Slow progress along a flat direction.
- Sensitivity to feature and activation scale.
- Why plain SGD can still be competitive with a good schedule.

$$
\theta_{t+1}=\theta_t-\eta\,\hat g_t
$$

**Practice tasks**

- Train the same model with SGD and Adam at their best learning rates and compare final accuracy and time to target.
- Visualise SGD oscillating in a 2D quadratic with high condition number.

---

### Module 8.2.2 — Momentum and Nesterov

- Heavy-ball momentum as an exponential moving average of gradients.
- The effective learning rate multiplier $1/(1-\beta)$.
- Nesterov: look-ahead gradient evaluation.
- Momentum's interaction with learning rate and batch size.
- Why momentum helps with ravines and small gradients.

$$
v_{t+1}=\beta v_t+\hat g_t,\qquad
\theta_{t+1}=\theta_t-\eta\,v_{t+1}
$$

**Practice tasks**

- Implement momentum with $\beta \in \{0, 0.5, 0.9, 0.99\}$ and describe each trajectory.
- Show momentum causing overshoot when the learning rate is raised without retuning.

---

### Module 8.2.3 — SGD in practice

- Momentum plus a cosine schedule remains a strong baseline.
- When SGD generalises better than adaptive methods, and when that claim fails.
- Practical ranges: $\eta$, $\beta$, weight decay, and warmup.
- Reproducing a published SGD result as a calibration exercise.

> **Module completion gate (8.2).** You can implement momentum from scratch and explain its effect on a trajectory you drew yourself.

---

## 8.3 — Adaptive Optimisation

**Objective.** Use adaptive methods correctly, and understand what they change about training.

### Module 8.3.1 — AdaGrad, RMSProp and per-parameter scaling

- AdaGrad accumulates squared gradients; the step shrinks over time.
- RMSProp replaces the sum with an exponential moving average.
- Per-parameter effective learning rates and why that matters for sparse features.
- The bias toward parameters with small historical gradients.

$$
\text{AdaGrad: } \theta_{t+1}=\theta_t-\frac{\eta}{\sqrt{G_t+\epsilon}}\hat g_t,\qquad
\text{RMSProp: } v_{t+1}=\beta v_t+(1-\beta)\hat g_t^2
$$

**Practice tasks**

- Compare AdaGrad and RMSProp on an embedding-heavy model and explain the difference.
- Show AdaGrad's learning rate collapsing on a long run.

---

### Module 8.3.2 — Adam and AdamW

- First and second moment estimates.
- Bias correction and why it matters in the first steps.
- The decoupling of weight decay from the adaptive step (AdamW).
- $\epsilon$'s role and choosing it.
- Known issues: non-convergence in some settings, memory cost, and generalisation gaps.
- Adam's defaults and when to deviate.

$$
m_t=\beta_1m_{t-1}+(1-\beta_1)g_t,\quad
v_t=\beta_2v_{t-1}+(1-\beta_2)g_t^2,\quad
\theta_t=\theta_{t-1}-\eta\frac{\hat m_t}{\sqrt{\hat v_t}+\epsilon}
$$

**Practice tasks**

- Implement Adam by hand and match `torch.optim.Adam` step for step.
- Compare Adam versus AdamW with the same weight decay on the same model.
- Show the first-step bias-correction effect numerically.

---

### Module 8.3.3 — Newer optimisers and how to judge them

- LAMB for very large batches.
- Lion (sign-based), Sophia (second-order approximation), and their claims.
- Why "new optimiser beats Adam" claims often fail to replicate.
- The criteria for adopting one: same final quality, lower cost, fewer hyperparameters, reproducible.
- Keeping the optimiser a controlled variable in ablations.

**Practice tasks**

- Reproduce one optimiser comparison on your own task; report whether the claim holds.
- Write a decision memo on whether to switch optimisers for a given constraint.

---

> **Module completion gate (8.3).** You can implement Adam from scratch, explain bias correction, and defend your optimiser choice with a measured comparison.

---

## 8.4 — Learning Rate Schedules

**Objective.** Treat the schedule as a first-class hyperparameter, because it often matters more than the optimiser.

### Module 8.4.1 — Why schedules help

- Large steps early for progress, small steps late for convergence.
- The interaction between schedule shape and final loss.
- Cyclical schedules and warm restarts.
- Why a constant learning rate is rarely optimal but is a good baseline.

### Module 8.4.2 — Common schedules

- Step decay and its brittleness.
- Cosine annealing, including restarts.
- Linear decay and inverse-square-root.
- One-cycle policy: warmup, peak, cooldown.
- Warmup: why transformers need it and CNNs often do not.

$$
\eta_t=\eta_{\min}+\tfrac{1}{2}\left(\eta_{\max}-\eta_{\min}\right)\left(1+\cos\frac{t\pi}{T}\right)
\quad\text{(cosine)}
$$

**Practice tasks**

- Compare constant, step, cosine, and one-cycle on the same architecture with tuned peak learning rate.
- Show a transformer failing without warmup and succeeding with it.

---

### Module 8.4.3 — Learning-rate range test

- Sweeping exponentially from tiny to large and reading the loss curve.
- Choosing a peak learning rate from the steepest-descent region.
- Identifying divergence onset.
- Retuning after changing batch size, architecture, or optimizer.

$$
\eta_{\text{good}}\approx\frac{1}{10}\eta_{\text{divergence}}
\quad\text{(a practical starting heuristic)}
$$

**Practice tasks**

- Run a range test and mark the divergence point on the plot.
- Show the optimal peak learning rate moving when batch size changes 4×.

---

> **Module completion gate (8.4).** You can choose a schedule and a peak learning rate from a measurement, not a blog post.

---

## 8.5 — Normalisation and Signal Flow

**Objective.** Understand the layer that most changed deep learning practice, and when it hurts.

### Module 8.5.1 — Batch normalisation

- Normalising across the batch per feature.
- Learnable scale and shift.
- The train/eval discrepancy: batch statistics versus running statistics.
- Why BN allows higher learning rates and reduces initialisation sensitivity.
- Failure cases: small batches, sequence padding, and distribution mismatch.

$$
\hat x=\frac{x-\mu_B}{\sqrt{\sigma_B^2+\epsilon}},\qquad
y=\gamma\hat x+\beta
$$

**Practice tasks**

- Train with batch size 2 and show BN degrading; fix it with a different normalisation.
- Demonstrate a model evaluated with the wrong running statistics.

---

### Module 8.5.2 — Layer, group, instance and RMS normalisation

- LayerNorm: per-example across features; standard in transformers.
- RMSNorm: no mean subtraction, cheaper, widely used in modern LLMs.
- GroupNorm: a middle ground for small batches in vision.
- InstanceNorm for style transfer.
- Weight standardisation and normaliser-free networks.

$$
\text{LayerNorm: }\hat x=\frac{x-\mu_{\text{features}}}{\sqrt{\sigma^2_{\text{features}}+\epsilon}},\qquad
\text{RMSNorm: }\hat x=\frac{x}{\sqrt{\frac{1}{d}\sum_i x_i^2+\epsilon}}
$$

**Practice tasks**

- Compare BN, LN, GN, and no normalisation at batch sizes 2, 32, 256.
- Show LayerNorm removing the need for careful bias initialisation in a transformer block.

---

### Module 8.5.3 — Placement: pre-norm versus post-norm

- Post-norm: original transformer formulation, needs warmup.
- Pre-norm: stable training, weaker residual identity, standard today.
- The residual stream perspective.
- Normalisation and gradient flow through depth.

**Practice tasks**

- Train identical blocks with pre-norm and post-norm; plot gradient norms by depth.
- Show the depth at which each configuration fails.

> **Module completion gate (8.5).** Given a batch size and architecture family, you can choose a normalisation scheme and justify it with a measured comparison.

---

## 8.6 — Gradient Pathologies and Remedies

**Objective.** Fix instability at its cause rather than by lowering the learning rate until it stops hurting.

### Module 8.6.1 — Vanishing and exploding gradients

- Why products of Jacobians shrink or grow exponentially with depth.
- Diagnosing with per-layer gradient norms and the gradient/parameter ratio.
- Gradient clipping: by norm versus by value, and choosing the threshold.
- Residual connections and their effect on gradient magnitude.
- Saturation in sigmoid and tanh stacks.

$$
\frac{\partial\mathcal{L}}{\partial h^{(1)}}=\prod_{\ell=2}^{L}\frac{\partial h^{(\ell)}}{\partial h^{(\ell-1)}}\cdot\frac{\partial\mathcal{L}}{\partial h^{(L)}}
$$

**Practice tasks**

- Train a 30-layer tanh network and plot gradient norms per layer.
- Show clipping turning a diverging run into a converging one.

---

### Module 8.6.2 — Numerical stability in losses

- Log-sum-exp and log-softmax for cross-entropy.
- `BCEWithLogitsLoss` versus manual sigmoid plus log.
- Softmax temperature and overflow.
- Mixed-precision-specific overflows and where they appear.
- Detecting NaN/Inf and which step introduced them.

$$
\log\sum_i e^{z_i}=m+\log\sum_i e^{z_i-m},\qquad m=\max_i z_i
$$

**Practice tasks**

- Reproduce a NaN from a naive softmax at logits of 100 and fix it with log-sum-exp.
- Add an anomaly-detection mode to training and catch the exact operation that produces Inf.

---

### 8.6.3 — Spikes, divergence and recovery

- Causes: bad batch, high LR, exploding gradient, data corruption, hardware fault.
- Detecting a spike early via loss and gradient-norm thresholds.
- Checkpoint-before-batch and replay-on-divergence strategies.
- Skipping corrupted batches safely and logging them.
- Distinguishing a transient spike from a structural problem.

**Practice tasks**

- Inject one corrupted batch and detect it automatically.
- Build a training loop that skips and logs bad steps, then verify it finishes successfully.

> **Module completion gate (8.6).** You can turn a flaky run into a stable one and explain which mechanism fixed it.

---

## 8.7 — Initialisation, Depth and the Edge of Stability

**Objective.** Understand what limits depth, and how modern architectures push past it.

### Checklist

- Variance propagation and the critical initialisation scale.
- Residual scaling and why deep residual networks need smaller branch outputs.
- The edge-of-stability phenomenon: training at the boundary of divergence can still converge.
- Sharpness-aware minimisation concepts.
- Depthwise scaling rules for transformers and CNNs.
- Practical rules: pre-norm, residual scaling, and warmup together.

$$
\operatorname{Var}\!\left(h^{(L)}\right)\approx\prod_{\ell=1}^{L}\left(n_\ell\operatorname{Var}(W^{(\ell)})\right)\operatorname{Var}\!\left(h^{(0)}\right)
$$

### Practice tasks

- Train a residual network at depths 18, 34, 50, 100 and record when stability breaks.
- Show that pre-norm plus residual scaling rescues a depth that post-norm cannot train.

> **Module completion gate (8.7).** You can explain why a 100-layer network fails and name two concrete interventions that fix it.

---

## 8.8 — Generalisation in Deep Networks

**Objective.** Reconcile the classical bias–variance story with what deep networks actually do.

### Module 8.8.1 — Overparameterisation and double descent

- Classical regime: more parameters, more overfitting.
- Modern regime: interpolation threshold, then improvement with more parameters.
- Model-wise, epoch-wise, and sample-wise double descent.
- What double descent does and does not explain.
- Practical implication: do not assume the smallest model is best.

**Practice tasks**

- Reproduce model-wise double descent with a polynomial model and with a small network.
- Identify the interpolation threshold in your own training curves.

---

### Module 8.8.2 — Implicit regularisation

- SGD's preference for flat minima.
- Early stopping as implicit regularisation.
- The role of architecture in constraining the function class.
- Data augmentation as a prior.
- Why two models with identical training error can generalise very differently.

$$
\text{flat minimum: large neighbourhood with low loss}\ \Rightarrow\ \text{more robust to shift}
$$

**Practice tasks**

- Compare sharpness (Hessian trace or gradient-norm proxy) across two runs with different batch sizes.
- Show two runs with equal training loss and different validation loss, and explain the gap.

---

### Module 8.8.3 — Measuring generalisation honestly

- The need for a validation protocol fixed before training (from L6).
- Variance across seeds is often larger than the effect you are chasing.
- Reporting mean ± spread, and the minimum number of seeds for a stable estimate.
- Hyperparameter search inflation in deep learning.
- Reproducing a claimed gain before believing it.

**Practice tasks**

- Run the same configuration with five seeds and report the spread in final accuracy.
- Show a "gain" of 0.4% disappearing when seed variance is included.

> **Module completion gate (8.8).** You can explain double descent, name two mechanisms of implicit regularisation, and report deep-learning results with honest variance.

---

## 8.9 — Efficient and Distributed Training

**Objective.** Train bigger models in less time without breaking the optimiser.

### Module 8.9.1 — Mixed precision

- FP16 and BF16: range versus precision.
- Loss scaling for FP16 and why BF16 usually does not need it.
- Which operations must stay in FP32 (reductions, norms, softmax).
- Automatic mixed precision with `torch.cuda.amp` and the autocast context.
- Measuring the speed-up and the accuracy cost.

$$
\text{FP16: } 5.96\times10^{-8}\ \text{resolution},\ \text{max}\approx6.5\times10^4;\qquad
\text{BF16: } 7.8\times10^{-3}\ \text{resolution},\ \text{max}\approx3.4\times10^{38}
$$

**Practice tasks**

- Train the same model in FP32 and AMP; report speed, memory, and final accuracy.
- Show an FP16 overflow and fix it with loss scaling.

---

### Module 8.9.2 — Memory, checkpointing and accumulation

- Where GPU memory goes: parameters, gradients, optimiser states, activations.
- Activation checkpointing (recomputation) and its compute cost.
- Gradient accumulation to reach a larger effective batch.
- The interaction between accumulation and normalisation layers.
- Memory profiling with `torch.cuda.max_memory_allocated`.

$$
\text{memory}\approx \underbrace{4P}_{\text{params+grads}}+\underbrace{8P}_{\text{Adam states}}+\underbrace{A}_{\text{activations}}\ \text{(bytes, FP32)}
$$

**Practice tasks**

- Profile memory for a model at three batch sizes and identify the dominant term.
- Halve memory with checkpointing and report the runtime cost.

---

### Module 8.9.3 — Data and model parallelism

- DistributedDataParallel: gradient all-reduce and effective batch size.
- The linear scaling rule and warmup when the batch grows.
- ZeRO stages and FSDP: sharding parameters, gradients, and optimiser states.
- Tensor and pipeline parallelism at a conceptual level.
- Common failure: each rank seeing a different data order.
- Debugging distributed runs: hangs, uneven shards, and NCCL timeouts.

**Practice tasks**

- Run a two-GPU DDP job (or simulate with two processes on CPU) and verify identical gradients.
- Compute the effective batch size and adjust the learning rate and warmup accordingly.

> **Module completion gate (8.9).** You can explain where memory goes, cut it meaningfully, and scale a run to multiple devices without changing the optimisation semantics.

---

## 8.10 — Experiment Tracking and Reproducibility at Depth

**Objective.** Make every run auditable, comparable, and rerunnable.

### Checklist

- Log config, seed, code commit, environment, and data version with every run.
- Log curves, gradient norms, learning rate, and throughput, not just final metrics.
- Compare runs with matched budgets (epochs, steps, wall clock, and FLOPs).
- Seed everything: Python, NumPy, PyTorch, CUDA, and data loader workers.
- Understand which operations are non-deterministic on GPU and choose determinism deliberately.
- Save checkpoints with optimiser and scheduler state.
- Write a run card: hypothesis, configuration, result, and decision.

### Practice tasks

- Take any past experiment and rebuild it from its logged metadata alone.
- Run the same config with and without deterministic algorithms; report the difference and the cost.

> **Module completion gate (8.10).** Any run you report can be reproduced from its metadata, and you know its variance across seeds.

---

## 8.11 — Level 8 Capstone: Training Dynamics Lab

### Project: `dynamics-lab` — an optimisation and stability study

**Difficulty.** Advanced

**Purpose.** Produce a controlled, reproducible study that answers real training questions with numbers. This is the artefact that makes you credible in a deep-learning interview.

### A. Functional requirements

**Task and model**

- One task (image or text classification at small scale) and one fixed architecture.
- A fixed evaluation protocol from Level 6, decided before any experiment.
- Three seeds minimum per configuration.

**Study 1 — Optimisers**

- SGD, SGD + momentum, RMSProp, Adam, AdamW.
- Tuned peak learning rate per optimiser via range tests.
- Report: final metric, time to target, stability, and seed variance.

**Study 2 — Schedules**

- Constant, step, cosine, one-cycle, warmup + cosine.
- Interaction with optimiser choice.
- Report: metric versus steps and versus wall clock.

**Study 3 — Stability interventions**

- Baseline, gradient clipping, pre-norm, residual scaling, LR warmup.
- Deliberately induce instability and show which intervention rescues it.
- Report gradient-norm trajectories for each.

**Study 4 — Efficiency**

- FP32 versus AMP, with and without activation checkpointing.
- Batch size versus effective batch size via accumulation.
- Report speed, memory, and accuracy trade-offs.

**Report**

- One figure per study, one table per study, one paragraph of interpretation per study.
- A final recommendation for your task, with the rejected options and why.

### B. Suggested architecture

```text
dynamics-lab/
├── conf/
│   ├── base.yaml
│   ├── optimisers/*.yaml
│   ├── schedules/*.yaml
│   └── stability/*.yaml
├── src/dynamics/
│   ├── data.py
│   ├── model.py
│   ├── train.py           # loops with hooks for grad norms and spikes
│   ├── optim.py           # custom implementations + torch wrappers
│   ├── schedules.py
│   ├── diagnostics.py     # grad norms, spike detection, LR range test
│   └── report.py
├── runs/                  # tracked experiment metadata
├── reports/
│   ├── optimisers.md
│   ├── schedules.md
│   ├── stability.md
│   └── efficiency.md
└── tests/
```

### C. Acceptance targets

| Component | Target |
|---|---|
| Protocol | Fixed and committed before experiments; same eval set throughout |
| Seeds | At least 3 per configuration; spread reported |
| Optimiser study | Best LR found by range test for each optimiser, not inherited |
| Schedule study | Compared at matched budget, plus wall-clock comparison |
| Stability study | One instability induced and one intervention shown to fix it |
| Efficiency study | Speed-up and memory saving measured, accuracy cost stated |
| Reproducibility | Every table regenerates from one command |

### D. Stretch goals

- Add a second architecture family and test whether the ranking of optimisers holds.
- Implement one optimiser from the paper and compare with the library version.
- Reproduce the linear scaling rule by sweeping batch size and learning rate.
- Profile the training step and eliminate the largest bottleneck.

### E. Acceptance criteria

| Area | Required evidence |
|---|---|
| **Controlled comparison** | One variable changed at a time, matched budgets |
| **Statistical honesty** | Seed variance reported; no cherry-picked runs |
| **Mechanistic explanation** | Each result explained, not just tabulated |
| **Efficiency** | Speed and memory measured with a profiler |
| **Decision** | A clear recommendation with trade-offs |
| **Reproducibility** | Metadata sufficient to rebuild every run |

> Level 8 is complete when you can predict, before running, how an optimiser or schedule change will affect a given training run — and then verify the prediction.

---

## Level 8 interview question bank

### A. Optimisation fundamentals

- Why is deep learning optimisation hard, given that gradient descent works so well?
- What is a saddle point, and why are they more common than local minima?
- What does the condition number of the Hessian tell you about training?
- Why does the mini-batch gradient work as an estimate?
- What is the critical batch size?

### B. Optimisers

- Explain momentum mechanically.
- What does Adam's second moment do, and why the square root?
- Why does Adam need bias correction?
- What is the difference between Adam and AdamW?
- When would you choose SGD over Adam?
- How do you decide whether a new optimiser claim is real?

### C. Schedules and learning rates

- Why do schedules help?
- Why do transformers need warmup?
- How do you run a learning-rate range test and interpret it?
- What changes when you double the batch size?
- What is one-cycle, and when would you use it?

### D. Stability

- Give three causes of NaN in training and their fixes.
- How do you detect exploding gradients early?
- What is gradient clipping, and how do you choose the threshold?
- Why does batch normalisation break at small batch sizes?
- What is the difference between pre-norm and post-norm, and why does it matter?
- What is the edge-of-stability phenomenon?

### E. Scale and reproducibility

- Where does GPU memory go for a training step?
- What does activation checkpointing trade?
- How does DDP compute gradients?
- What is the linear scaling rule, and when does it fail?
- What is non-deterministic on GPU, and how do you handle it?
- How would you compare two runs fairly when they used different batch sizes?

### Interview readiness standard

1. Name the mechanism, not the acronym.
2. State the failure mode it fixes.
3. Give the measurement that decides the choice.
4. Give the cost in memory, time, or complexity.
5. Say when it would not help.

---

## Level 8 final assessment

### Knowledge

- I can explain optimisation difficulty in terms of curvature, noise, and conditioning.
- I can implement SGD, momentum, RMSProp, and Adam from scratch.
- I can choose and justify a schedule and peak learning rate.
- I can explain BN, LN, and RMSNorm and their failure cases.
- I can diagnose vanishing/exploding gradients and fix them.
- I can explain double descent and implicit regularisation.
- I can describe where memory goes and how to reduce it.
- I understand DDP and sharding at a working level.

### Practical skills

- I have run a learning-rate range test and picked a peak rate from data.
- I have induced and fixed an unstable training run.
- I have trained with mixed precision and measured the trade-off.
- I have run a multi-device job and verified gradient equivalence.
- I have reproduced a run from metadata alone.

### Project

- `dynamics-lab` passes every acceptance target.
- Every result in the report is explained mechanistically.
- I can predict the effect of an optimiser change before running it.

> **Level 8 completion rule.** If you can make a training run faster or more stable on demand, and explain the mechanism, you are ready for Level 9.

---

# LEVEL 9 — DEEP LEARNING ARCHITECTURES

> **Goal.** Learn the major architecture families well enough to choose one from evidence: convolutions, recurrence, attention, and generative designs. Then make them cheap enough to ship.

## Level dashboard

| Item | Details |
|---|---|
| **Level** | 9 — Deep Learning Architectures |
| **Difficulty** | Advanced |
| **Suggested duration** | 4–6 weeks |
| **Study commitment** | 2–3 hours per day, 6 days per week |
| **Core tools** | PyTorch, `torchvision`, `timm`, `einops`, Hugging Face `transformers`, `torch.profiler` |
| **Main project** | **`arch-zoo`** — five architectures, one task, one controlled comparison |
| **Final outcome** | Select, implement, and ablate an architecture, then compress and serve it within a latency and memory budget. |

**Prerequisites.** Level 8. You must be able to train stably before you can fairly compare architectures.

---

## 9.1 — Architectural Thinking

**Objective.** Choose an architecture by reasoning about the data, not by copying the state of the art.

### Module 9.1.1 — The four questions before any architecture choice

1. What is the structure of the input? (grid, sequence, set, graph, tabular)
2. Which invariances are true? (translation, permutation, time order)
3. How long is the context, and how much of it matters?
4. What are the latency, memory, and data budgets?

- Matching inductive bias to data structure.
- Why "transformers are better" is a statement about data scale and compute, not a universal law.
- Parameter efficiency and compute efficiency as separate concerns.
- The cost of ignoring structure: more data and more compute to learn the same prior.

$$
\text{CNN: locality + weight sharing};\qquad
\text{RNN: recurrence over time};\qquad
\text{Transformer: content-based global mixing}
$$

**Practice tasks**

- Answer the four questions for five real problems and derive the likely architecture family for each.
- Find a task where a CNN beats a transformer at equal compute, and explain why.

---

### Module 9.1.2 — Reading architecture papers efficiently

- Identify the block diagram, the ablation table, and the compute budget.
- Distinguish architectural contributions from training-recipe contributions.
- Check the baselines: were they tuned equally?
- Check the evaluation: same data, same protocol, same compute?
- Extract the reproducible core into a one-page note.

**Practice tasks**

- Read three architecture papers and write one-page notes with "claim / evidence / what would falsify it".
- Identify one paper whose gain came mostly from the training recipe.

---

> **Module completion gate (9.1).** You can justify an architecture family from data structure, invariances, and budget — before training anything.

---

## 9.2 — Convolutional Networks

**Objective.** Understand convolution deeply: the operation, the parameter savings, and the design vocabulary.

### Module 9.2.1 — The convolution operation

- 2D convolution as a sliding dot product; cross-correlation in practice.
- Kernels, channels, receptive fields, and the effect of stacking.
- Stride, padding, dilation, and output-size arithmetic.
- Groups and depthwise convolution; the cost model.
- Why convolution is equivariant to translation and how pooling adds invariance.

$$
H_{\text{out}}=\left\lfloor\frac{H_{\text{in}}+2P-D(K-1)-1}{S}\right\rfloor+1
$$

**Practice tasks**

- Compute output shapes for ten layer configurations by hand and verify with PyTorch.
- Implement 2D convolution with explicit loops and match `nn.Conv2d`.
- Compute FLOPs for a conv layer and compare with a dense layer of equal output size.

---

### Module 9.2.2 — Pooling, stride and downsampling

- Max pooling, average pooling, and their gradient behaviour.
- Strided convolution as learned downsampling.
- Global average pooling as a classifier head.
- The receptive-field growth table for a ResNet-style stack.
- Aliasing and why some modern networks downsample more carefully.

**Practice tasks**

- Compute the receptive field of a five-layer CNN by hand and verify empirically with gradient attribution.
- Compare max and average pooling on a small dataset and report the difference.

---

### Module 9.2.3 — Classic and modern backbones

- LeNet → AlexNet → VGG: what each contributed.
- ResNet: residual connections and the degradation problem.
- Inception: multi-scale branches.
- EfficientNet: compound scaling of depth, width, and resolution.
- ConvNeXt: modernising a CNN with transformer-era design choices.
- Choosing a backbone: pretrained availability, latency, memory, and licensing.

$$
y=x+\mathcal{F}(x)\ \Rightarrow\ \frac{\partial\mathcal{L}}{\partial x}=\frac{\partial\mathcal{L}}{\partial y}\left(I+\frac{\partial\mathcal{F}}{\partial x}\right)
$$

**Practice tasks**

- Train a small ResNet from scratch and the same backbone fine-tuned; report the data-efficiency difference.
- Compare ResNet-18, EfficientNet-B0, and ConvNeXt-T on latency and accuracy at fixed input size.

---

> **Module completion gate (9.2).** You can design a convolutional stack from a shape budget, compute its output dimensions and cost, and defend each block.

---

## 9.3 — Sequence Models: RNN, LSTM, GRU

**Objective.** Understand recurrence, its gradient problem, and the cases where it still wins.

### Module 9.3.1 — Recurrent networks

- Hidden state, recurrence, and weight sharing across time.
- Backpropagation through time and the cost of long sequences.
- Vanishing and exploding gradients in recurrent stacks.
- Truncated BPTT and sequence chunking.
- Teacher forcing and exposure bias.

$$
h_t=\tanh\left(W_{hh}h_{t-1}+W_{xh}x_t+b\right),\qquad
\frac{\partial h_T}{\partial h_1}=\prod_{t=2}^{T}\frac{\partial h_t}{\partial h_{t-1}}
$$

**Practice tasks**

- Implement an RNN cell from scratch and train it on a copy task; find the sequence length at which it fails.
- Show gradient norms decaying with sequence length.

---

### Module 9.3.2 — Gating: LSTM and GRU

- Cell state and the forget, input, and output gates.
- Why gating mitigates vanishing gradients.
- GRU as a simpler two-gate variant.
- Bidirectional and stacked layers.
- When recurrence beats attention: short sequences, streaming inference, low memory.

$$
f_t=\sigma\left(W_f[h_{t-1},x_t]+b_f\right),\quad
i_t=\sigma\left(W_i[h_{t-1},x_t]+b_i\right),\quad
c_t=f_t\odot c_{t-1}+i_t\odot\tilde c_t
$$

**Practice tasks**

- Train an LSTM on sequences longer than an RNN's limit and compare.
- Benchmark LSTM versus a small transformer on a short-sequence task at equal parameters.

---

### Module 9.3.3 — Sequence-to-sequence and the bridge to attention

- Encoder–decoder architecture and the fixed-vector bottleneck.
- Additive and multiplicative attention over encoder states.
- Teacher forcing at training versus free-running inference.
- Why attention replaced recurrence at scale.
- Modern use of recurrent components: streaming, state-space models (preview).

**Practice tasks**

- Build a small seq2seq model with attention and visualise the alignment matrix.
- Show the fixed-vector bottleneck by measuring quality versus source length.

> **Module completion gate (9.3).** You can explain when recurrence is the right choice and demonstrate its limits on long sequences.

---

## 9.4 — Attention and the Transformer

**Objective.** Implement attention from scratch and understand every component of the transformer block.

### Module 9.4.1 — Scaled dot-product attention

- Queries, keys, values and the shapes involved.
- The scaling factor and why it exists.
- Masks: padding masks and causal masks.
- Softmax over keys and its numerical stability.
- Complexity: $O(n^2 d)$ time and $O(n^2)$ memory.

$$
\mathrm{Attention}(Q,K,V)=\mathrm{softmax}\!\left(\frac{QK^{\top}}{\sqrt{d_k}}+M\right)V
$$

**Practice tasks**

- Implement attention from scratch and match `nn.MultiheadAttention` numerically.
- Show softmax saturation without the $\sqrt{d_k}$ scaling at $d_k=512$.
- Visualise an attention map for a sentence and interpret it.

---

### Module 9.4.2 — Multi-head attention

- Splitting the model dimension into heads.
- Why multiple heads help: different subspaces, different relations.
- Head pruning and interpretability research.
- Grouped-query and multi-query attention for inference efficiency.
- The output projection and residual placement.

$$
\text{MultiHead}(Q,K,V)=\mathrm{Concat}(\text{head}_1,\dots,\text{head}_h)W_O
$$

**Practice tasks**

- Train a 4-head and a 1-head model at equal parameter count and compare.
- Implement grouped-query attention and measure KV-cache memory reduction.

---

### Module 9.4.3 — The transformer block

- LayerNorm placement: pre-norm versus post-norm (from 8.5).
- The feed-forward network and its expansion ratio.
- Positional information: sinusoidal, learned, relative, and rotary (RoPE).
- Residual stream and the residual scaling.
- Embedding tying and the output head.

$$
\mathrm{Block}(x)=x+\mathrm{FFN}\!\left(\mathrm{LN}\!\left(x+\mathrm{Attn}(\mathrm{LN}(x))\right)\right)
\quad\text{(pre-norm)}
$$

**Practice tasks**

- Implement a full transformer block and verify it against a reference implementation.
- Compare learned, sinusoidal, and rotary positional encodings on a length-generalisation test.

---

### Module 9.4.4 — Transformer families

- Encoder-only (BERT): bidirectional, masked language modelling.
- Decoder-only (GPT): causal, next-token prediction.
- Encoder–decoder (T5, BART): conditional generation.
- Task fit: classification and retrieval versus generation versus translation.
- Compute characteristics: training versus inference cost.

| Family | Attention | Best for | Cost profile |
|---|---|---|---|
| Encoder-only | bidirectional | classification, NER, retrieval | cheap inference, parallel prefill |
| Decoder-only | causal | generation, in-context learning | KV cache dominates memory |
| Encoder–decoder | both | translation, summarisation | heavier encode, flexible decode |

**Practice tasks**

- Take one dataset and apply all three families; compare quality and inference cost.
- Explain which family you would choose for a tagging task and why.

---

### Module 9.4.5 — Efficient attention

- KV caching and its memory formula.
- Sparse and sliding-window attention.
- Linear attention and its quality trade-off.
- FlashAttention: IO-aware exact attention and why it is fast.
- Recomputation and chunked attention for long contexts.
- When long-context claims are real versus marketing.

$$
\text{KV cache bytes}=2\times L\times H_{kv}\times d_{\text{head}}\times T\times B\times\text{bytes per element}
$$

**Practice tasks**

- Compute KV-cache memory for a 7B model at 4k and 32k context, and compare with the weights.
- Benchmark sliding-window versus full attention on a long-sequence task.

> **Module completion gate (9.4).** You can implement a transformer block from memory, explain every matrix dimension, and state its memory cost at inference.

---

## 9.5 — Generative Architectures

**Objective.** Understand the three generative families at the architecture level, with the training objectives that drive them.

### Module 9.5.1 — Autoencoders and VAEs

- Bottleneck autoencoders and reconstruction loss.
- Variational autoencoders: the reparameterisation trick and the ELBO.
- Posterior collapse and the reconstruction–KL trade-off.
- Latent space structure and interpolation.
- Architecture choices: convolutional and transformer VAEs.

$$
\mathcal{L}_{\text{VAE}}=\mathbb{E}_{q_\phi(z\mid x)}\left[\log p_\theta(x\mid z)\right]-D_{\mathrm{KL}}\left(q_\phi(z\mid x)\,\Vert\,p(z)\right)
$$

**Practice tasks**

- Train a VAE on a small image dataset and interpolate between two latents.
- Show posterior collapse with an over-weighted KL term and fix it with KL annealing.

---

### Module 9.5.2 — GANs

- The minimax objective and the equilibrium.
- Generator and discriminator architecture choices.
- Mode collapse and its diagnostics.
- Training tricks: spectral normalisation, progressive growing, EMA of weights.
- Evaluation: FID and its limitations.
- Where GANs still win: fast single-step generation.

$$
\min_G\max_D\ \mathbb{E}_{x\sim p_{\text{data}}}\left[\log D(x)\right]+\mathbb{E}_{z}\left[\log\left(1-D(G(z))\right)\right]
$$

**Practice tasks**

- Train a small DCGAN and identify mode collapse from the sample grid.
- Compare FID across two checkpoints and explain why the lower score might not be better.

---

### Module 9.5.3 — Diffusion models

- Forward noising process and the closed-form noising distribution.
- Reverse denoising and the noise-prediction objective.
- DDPM training and ancestral sampling.
- Latent diffusion: running the process in a compressed space.
- Guidance and conditioning at the architecture level (details in Level 13).
- Compute cost of sampling and step-distillation approaches.

$$
q(x_t\mid x_0)=\mathcal{N}\left(\sqrt{\bar\alpha_t}\,x_0,\ (1-\bar\alpha_t)I\right),\qquad
\mathcal{L}=\mathbb{E}_{t,x_0,\epsilon}\left[\lVert\epsilon-\epsilon_\theta(x_t,t)\rVert_2^2\right]
$$

**Practice tasks**

- Implement DDPM training on a small dataset and sample images.
- Measure FID versus number of sampling steps and plot the trade-off.

---

### Module 9.5.4 — Choosing a generative architecture

| Family | Sample quality | Sampling speed | Training stability | Control |
|---|---|---|---|---|
| VAE | blurry, diverse | one pass | very stable | strong latent control |
| GAN | sharp | one pass | unstable | moderate |
| Diffusion | sharp, diverse | many steps | stable | strong with conditioning |

**Practice tasks**

- Write a one-page comparison for a product that needs 200ms generation latency.
- State which architecture you would choose and what you would measure first.

> **Module completion gate (9.5).** You can explain how each generative family trains, what it is good at, and what it costs at inference.

---

## 9.6 — Graph Neural Networks

**Objective.** Handle relational data that is not a grid or a sequence.

### Checklist

- Graph representations: adjacency matrix, edge list, sparse tensors.
- Message passing: aggregate, update, and readout.
- Graph convolutional networks and their spectral intuition.
- GraphSAGE, GAT (attention over neighbours), and GIN.
- Over-smoothing with depth; the effective depth limit.
- Batching graphs: block-diagonal adjacency and masking.
- Node, edge, and graph-level tasks.
- When a graph is unnecessary — tabular aggregates often suffice.

$$
h_v^{(k)}=\sigma\left(W^{(k)}\cdot\mathrm{AGG}\left(\left\{h_u^{(k-1)}:u\in\mathcal{N}(v)\right\}\right)\right)
$$

### Practice tasks

- Implement a two-layer GCN on a citation dataset and compare with an MLP on node features.
- Show over-smoothing by measuring representation similarity as depth increases.

> **Module completion gate (9.6).** You can implement message passing and explain when graph structure adds value over tabular features.

---

## 9.7 — Architecture Selection and Scaling

**Objective.** Choose a model size from a budget, and know when scale is the answer.

### Module 9.7.1 — Scaling laws

- Power-law loss in parameters, data, and compute.
- Compute-optimal allocation and its practical implications.
- The Chinchilla correction: most models were data-starved.
- Inference-optimal scaling: smaller models trained longer win at serving time.
- Extrapolating from small runs responsibly.

$$
L(N,D)\approx\frac{a}{N^{\alpha}}+\frac{b}{D^{\beta}}+L_\infty
$$

**Practice tasks**

- Fit a small scaling curve from three model sizes and predict a fourth; check the error.
- Compare a large short-trained model with a small long-trained one at equal compute.

---

### Module 9.7.2 — Choosing a model for a constraint

- Given a latency SLA, derive the maximum parameter count and context length.
- Given a memory budget, compute weights, activations, and KV cache.
- Given a data budget, decide between pretrained and from-scratch.
- The trade-space: accuracy, latency, cost, and maintainability.
- Documenting the decision with rejected alternatives.

$$
\text{params}_{\max}\approx\frac{\text{GPU memory}-\text{activations}-\text{KV cache}}{\text{bytes per parameter}}
$$

**Practice tasks**

- Produce three candidate architectures for a fixed deployment constraint and cost each.
- Write the selection memo including the two rejected options.

---

> **Module completion gate (9.7).** Your architecture choice is derived from constraints and data, and you can predict its cost before training it.

---

## 9.8 — Compression and Efficient Inference

**Objective.** Make a trained model small and fast without losing the quality you reported.

### Module 9.8.1 — Pruning and sparsity

- Unstructured pruning and the reality of sparse speed-ups.
- Structured pruning: channels, heads, and layers.
- Magnitude versus movement-based criteria.
- Iterative pruning with fine-tuning.
- Structured sparsity's hardware support and actual latency gains.

**Practice tasks**

- Prune 50% of channels in a CNN with fine-tuning and report the accuracy and latency change.
- Show unstructured pruning that does not speed up inference on your hardware, and explain why.

---

### Module 9.8.2 — Quantisation

- Post-training quantisation: dynamic, static, and weight-only.
- Quantisation-aware training.
- INT8 and INT4; per-channel versus per-tensor scales.
- Accuracy recovery with calibration sets.
- Hardware support and the difference between measured and theoretical speed-ups.

$$
q=\mathrm{round}\left(\frac{x}{s}\right)+z,\qquad
\hat x=s\,(q-z)
$$

**Practice tasks**

- Quantise a trained model to INT8 and compare accuracy, latency, and model size.
- Build a calibration set and show its effect on static quantisation quality.

---

### Module 9.8.3 — Distillation

- Teacher–student training with soft targets.
- The temperature parameter and what it reveals.
- Feature-level and attention-level distillation.
- Distilling into a smaller architecture versus the same family.
- When distillation beats simply training a small model from scratch.

$$
\mathcal{L}_{\text{KD}}=(1-\alpha)\,\mathcal{L}_{\text{CE}}(y,\hat y_s)+\alpha\,T^2\,\mathcal{L}_{\text{KL}}\left(\sigma\!\left(\frac{z_t}{T}\right)\Vert\sigma\!\left(\frac{z_s}{T}\right)\right)
$$

**Practice tasks**

- Distil a large model into a small one and compare against training the small model directly.
- Sweep the temperature and report the accuracy/softness relationship.

---

### Module 9.8.4 — Export and deployment formats

- TorchScript and `torch.compile`.
- ONNX export, operator coverage, and dynamic shapes.
- TensorRT, OpenVINO, and mobile runtimes at a conceptual level.
- Batching strategies and continuous batching for inference servers.
- Benchmarking honestly: warm-up, percentiles, and batch effects.

**Practice tasks**

- Export a model to ONNX and verify numerical parity with PyTorch.
- Benchmark latency at p50 and p95 for batch sizes 1, 8, and 32.

> **Module completion gate (9.8).** You can compress a model to a stated budget and prove the trade-off with measured latency, memory, and accuracy.

---

## 9.9 — Evaluating Architectures Fairly

**Objective.** Compare models without fooling yourself or your reviewers.

### Checklist

- Equalise compute, not epochs: match FLOPs or wall clock.
- Match parameter counts when comparing architectural ideas.
- Use the same data, augmentation, and training recipe.
- Tune each architecture's learning rate; do not handicap one.
- Report mean ± spread across at least three seeds.
- Separate architectural gains from training-recipe gains.
- Report latency and memory alongside accuracy.
- Publish the full comparison table, including the models that lost.

### Practice tasks

- Compare two architectures under both equal-parameter and equal-FLOP budgets; show the ranking can change.
- Reproduce a claimed architectural gain and check whether it survives matched tuning.

> **Module completion gate (9.9).** Any architecture comparison you present is matched on compute, tuned fairly, and reported with variance.

---

## 9.10 — Putting It Together: A Model Card

**Objective.** Document a model so it can be used, audited, and maintained by someone else.

### Checklist

- Intended use and explicitly out-of-scope uses.
- Training data: source, size, date range, known gaps and biases.
- Architecture summary and parameter count.
- Evaluation: datasets, metrics with intervals, slices, worst-group results.
- Fairness and safety considerations with evidence.
- Latency, memory, and cost at stated batch sizes.
- Limitations and known failure modes.
- Version, date, and the commit that produced it.

### Practice tasks

- Write a model card for your Level 9 capstone.
- Have a teammate read only the card and list what they would not trust.

> **Module completion gate (9.10).** Someone can decide whether to use your model from the card alone.

---

## 9.11 — Level 9 Capstone: Architecture Zoo

### Project: `arch-zoo` — five architectures, one task, one honest comparison

**Difficulty.** Advanced

**Purpose.** Build the comparison that lets you say, with evidence, which architecture you would ship and why. This is the single most useful artefact for deep-learning interviews.

### A. Functional requirements

**The task**

- One dataset you can train five models on within your compute budget (CIFAR-10, Fashion-MNIST, a text classification set, or a small audio set).
- A fixed evaluation protocol from Level 6, committed before experiments.

**The five architectures**

1. An MLP baseline (from Level 7).
2. A CNN (ResNet-style, from scratch).
3. A pretrained CNN fine-tuned.
4. A transformer (ViT-style or text transformer, from scratch or pretrained).
5. One architecture of your choice: RNN/LSTM, a small GNN, or a compact diffusion model if your task is generative.

**Controlled comparison**

- Equal-parameter and equal-FLOP comparisons for at least two pairs.
- Learning rate tuned per architecture (range test each).
- Three seeds minimum per architecture.
- Report accuracy, macro-F1, latency at p50/p95, parameters, FLOPs, and peak memory.

**Efficiency study**

- Compress the best model with quantisation, pruning, or distillation.
- Report the accuracy/size/latency trade-off against the uncompressed baseline.

**Documentation**

- A model card for the winning model.
- A one-page recommendation memo with the rejected architectures and reasons.

### B. Suggested architecture

```text
arch-zoo/
├── conf/
│   ├── protocol.yaml       # frozen before experiments
│   └── models/*.yaml
├── src/arch_zoo/
│   ├── data.py
│   ├── models/
│   │   ├── mlp.py
│   │   ├── cnn.py
│   │   ├── vit.py
│   │   ├── rnn.py
│   │   └── registry.py     # name → constructor, params, FLOPs
│   ├── train.py
│   ├── compare.py          # matched-budget comparison tables
│   ├── compress.py         # quantise, prune, distil
│   ├── benchmark.py        # latency percentiles, memory
│   └── card.py             # model card generator
├── reports/
│   ├── comparison.md
│   ├── efficiency.md
│   ├── model_card.md
│   └── recommendation.md
└── tests/
```

### C. Acceptance targets

| Component | Target |
|---|---|
| Protocol | Committed before experiments; identical eval set for all models |
| Fair comparison | LR tuned per model; equal-parameter and equal-FLOP tables |
| Seeds | 3+ per architecture; spread reported |
| Cost reporting | Parameters, FLOPs, p50/p95 latency, peak memory for every model |
| Compression | At least one method applied to the winner, with measured trade-off |
| Documentation | Model card and recommendation memo complete |
| Reproducibility | One command regenerates every table and figure |

### D. Stretch goals

- Add a second task modality and check whether the ranking transfers.
- Implement one architecture from its paper, not from a library.
- Add a scaling study: three sizes of the winning family.
- Serve the compressed model behind an API and load-test it.
- Compare against a strong tabular baseline if your task permits.

### E. Acceptance criteria

| Area | Required evidence |
|---|---|
| **Fairness of comparison** | Matched budgets, per-model tuning, seed variance |
| **Breadth** | Five distinct architecture families actually trained |
| **Cost awareness** | Latency and memory measured, not estimated |
| **Compression** | A real trade-off curve, not a single point |
| **Decision** | A recommendation with rejected alternatives and reasons |
| **Documentation** | Model card sufficient for a stranger to decide usage |

> Level 9 is complete when you can defend your architecture choice against a cheaper and a stronger alternative, with numbers from your own runs.

---

## Level 9 interview question bank

### A. Convolutional networks

- What does a convolution compute, and why is it parameter-efficient?
- How do you compute the output size of a conv layer?
- What is the receptive field, and how does it grow with depth?
- Why do residual connections help train deep networks?
- What does depthwise separable convolution save?
- When would a CNN beat a transformer?

### B. Sequence models

- What is backpropagation through time, and what is its cost?
- How does an LSTM gate solve the vanishing-gradient problem?
- What is teacher forcing, and what bias does it introduce?
- When is an RNN a better choice than a transformer?
- What is the fixed-vector bottleneck in seq2seq?

### C. Transformers

- Derive scaled dot-product attention and explain each step.
- Why divide by $\sqrt{d_k}$?
- What is the difference between pre-norm and post-norm?
- How many parameters are in a transformer block of width $d$ and depth $L$?
- What is the KV cache, and how much memory does it use?
- Why is FlashAttention faster if it computes the same thing?
- When would you choose encoder-only over decoder-only?

### D. Generative and graph models

- What is the ELBO, and what does each term do?
- Why do GANs suffer from mode collapse?
- Explain the DDPM loss in one sentence.
- Why is latent diffusion cheaper than pixel diffusion?
- What is message passing in a GNN?
- Why do GNNs over-smooth with depth?

### E. Efficiency and selection

- How do you choose a model size from a latency budget?
- What is the difference between pruning and distillation?
- When does quantisation hurt accuracy, and how do you recover it?
- How would you fairly compare two architectures?
- What goes in a model card?
- Your model must run in 50 ms on CPU. What do you do, in order?

### Interview readiness standard

1. Draw the block.
2. State the tensor shapes.
3. Give the compute and memory cost.
4. Name the inductive bias and its consequence.
5. Say when you would choose the alternative.

---

## Level 9 final assessment

### Knowledge

- I can justify an architecture family from data structure and budget.
- I can compute conv output shapes, receptive fields, and FLOPs.
- I can implement attention and a transformer block from memory.
- I can explain RNN gating and its limits.
- I can compare VAE, GAN, and diffusion training objectives.
- I can implement message passing for graphs.
- I can estimate parameter count, memory, and KV-cache size.
- I can compress a model with quantisation, pruning, and distillation.

### Practical skills

- I have trained five architecture families on one task.
- I have compared them at equal parameters and equal FLOPs.
- I have measured latency percentiles and peak memory.
- I have compressed a model and reported the trade-off.
- I have written a model card a teammate could act on.

### Project

- `arch-zoo` passes every acceptance target.
- The recommendation memo names what I rejected and why.
- I can predict a model's inference cost before running it.

> **Level 9 completion rule.** If you can pick an architecture from constraints, train it stably, compress it to a budget, and defend the choice with your own numbers — you are ready for Phase 4.

---

# PHASE 3 CAPSTONE — DEEP LEARNING BENCH

> **Purpose.** Compose Levels 7, 8, and 9 into one system: a benchmark harness that trains multiple architectures under one protocol, with an ablation engine, a stability suite, and a report a reviewer can trust.

**Difficulty.** Advanced
**Suggested duration.** 1–2 weeks
**Depends on.** Levels 7, 8, and 9.

## A. The brief

Build a benchmark suite that answers, for one task of your choosing:

1. **Which architecture wins** under equal parameters and under equal compute?
2. **Which training recipe** (optimiser, schedule, normalisation, precision) is best for each?
3. **Where does training break**, and which intervention restores stability?
4. **What does it cost** in parameters, FLOPs, latency, and memory?
5. **What would you ship**, and what did you reject?

The domain is your choice: image classification, text classification, audio tagging, or a small generative task. The rigour is not optional.

## B. Required deliverables

| # | Deliverable | What "done" looks like |
|---|---|---|
| 1 | Protocol document | Committed before any experiment, with success criteria |
| 2 | Data pipeline | Deterministic, measurable throughput, correct splits |
| 3 | Architecture registry | Five families, each with parameter and FLOP counts |
| 4 | Training engine | Config-driven, checkpoint/resume, gradient diagnostics |
| 5 | Optimiser/schedule study | Matched-budget comparison, per-model tuned learning rate |
| 6 | Stability suite | One instability induced, three interventions compared |
| 7 | Architecture comparison | Equal-parameter and equal-FLOP tables, 3+ seeds |
| 8 | Efficiency report | Quantisation/pruning/distillation trade-off curve |
| 9 | Serving benchmark | p50/p95 latency, throughput, peak memory |
| 10 | Failure log | Every bug and unstable run, with cause and fix |
| 11 | Model card | Intended use, limits, metrics with intervals |
| 12 | Reproducibility | One command rebuilds all tables and figures |

## C. Suggested architecture

```text
deep-bench/
├── conf/
│   ├── protocol.yaml
│   ├── models/
│   ├── optimisers/
│   └── studies/
├── src/deep_bench/
│   ├── data/               # deterministic loaders, throughput probe
│   ├── models/             # registry: name → model, params, flops
│   ├── train/
│   │   ├── loop.py         # train/eval, checkpoint, resume
│   │   ├── diagnostics.py  # grad norms, spike detection, dead units
│   │   └── schedules.py
│   ├── studies/
│   │   ├── optimisers.py
│   │   ├── stability.py
│   │   ├── architecture.py
│   │   └── efficiency.py
│   ├── compress.py
│   ├── benchmark.py
│   └── report.py
├── runs/                   # metadata per run
├── reports/
└── tests/
```

## D. Grading rubric

| Dimension | 1 — Not yet | 3 — Competent | 5 — Strong |
|---|---|---|---|
| **Implementation depth** | Uses libraries only | Custom loop and one custom module | Custom autograd op or optimiser, verified |
| **Experimental control** | Configs differ unintentionally | Matched budgets, one variable changed | Matched budgets plus seed variance and paired analysis |
| **Stability engineering** | Crashes are mysterious | Bugs logged and fixed | Instability induced deliberately and diagnosed mechanistically |
| **Efficiency** | Latency estimated | Latency and memory measured | Compression trade-off curve plus serving benchmark |
| **Interpretation** | Tables only | Tables with a paragraph | Mechanism explained, prediction verified |
| **Communication** | Notebook dump | Clear report | Model card and memo a stranger can act on |

**Pass mark.** At least 3 in every dimension, with **Experimental control** and **Interpretation** at 4 or above.

## E. Defence questions

- Why this architecture, and what did the equal-FLOP comparison change about your answer?
- Which of your results would not survive a change of seed, and how do you know?
- Show me the run where training became unstable, and the exact step you fixed it.
- Where does the GPU memory go, and what did you do about it?
- Your model must run in 30 ms on CPU with a 100 MB budget. What changes?
- What would you do differently with 100× the compute?
- Which result in your report are you least confident in?

---

# PHASE 3 FINAL ASSESSMENT

Complete this before starting Phase 4 (Advanced ML and Research).

## Knowledge checklist

**First principles (L7)**

- I can derive and implement backpropagation for a multi-layer network.
- I can explain autograd, custom functions, and hooks.
- I can write the training loop from memory.
- I can justify an initialisation scheme.
- I can debug a broken training run using the ladder.

**Dynamics (L8)**

- I can explain curvature, conditioning, and gradient noise.
- I can implement SGD, momentum, RMSProp, and Adam.
- I can choose a schedule and peak learning rate from a measurement.
- I can explain BN, LN, RMSNorm, and pre-norm versus post-norm.
- I can diagnose and fix vanishing/exploding gradients.
- I can explain double descent and implicit regularisation.
- I can reduce memory and scale to multiple devices.

**Architectures (L9)**

- I can compute conv shapes, receptive fields, and FLOPs.
- I can implement attention and a transformer block from scratch.
- I can explain RNN gating and seq2seq attention.
- I can compare VAE, GAN, and diffusion objectives.
- I can implement message passing for graphs.
- I can estimate parameters, memory, and KV-cache size.
- I can compress a model and measure the trade-off.

## Practical checklist

- [ ] Level 7 capstone (`mlp-lab`) passes parity and gradient checks.
- [ ] Level 8 capstone (`dynamics-lab`) has a four-study report with seed variance.
- [ ] Level 9 capstone (`arch-zoo`) compares five architectures fairly.
- [ ] Phase capstone scores at least 3 in every rubric dimension.
- [ ] I have induced and fixed a training instability, and documented the mechanism.
- [ ] I have measured latency percentiles, not just accuracy.
- [ ] I have written a model card for a model I trained.

## The self-honesty test

Answer these out loud, without notes. If any answer takes more than 60 seconds, revisit that level.

1. Derive the backward pass for your model on a whiteboard.
2. Why is your initialisation scheme appropriate for your activation?
3. What is your optimiser doing differently from SGD, mechanically?
4. Why that learning-rate schedule, and what did you compare it against?
5. Your loss spiked at step 4,000 — what happened and how would you find out?
6. What is the memory cost of one forward-backward pass in your model?
7. Why did your architecture beat the alternative at equal FLOPs?
8. What would you change if the dataset were 100× larger?

> **Phase 3 is complete** when all four capstones pass and you can answer the eight questions above with derivations and numbers.

---

# APPENDIX

## A. Formula sheet for Phase 3

| Topic | Formula |
|---|---|
| Dense layer | $z=Wx+b$ |
| Activation — ReLU | $\max(0,z)$ |
| Activation — GELU | $z\,\Phi(z)$ |
| Softmax | $\sigma(z)_i=\dfrac{e^{z_i}}{\sum_j e^{z_j}}$ |
| Cross-entropy (logits) | $-\log\dfrac{e^{z_y}}{\sum_j e^{z_j}}$ |
| BCE with logits | $\max(z,0)-zy+\log(1+e^{-\lvert z\rvert})$ |
| Linear layer gradients | $\dfrac{\partial\mathcal{L}}{\partial W}=\delta a^{\top}$, $\dfrac{\partial\mathcal{L}}{\partial b}=\delta$ |
| Backprop recursion | $\delta^{(\ell)}=(W^{(\ell+1)})^{\top}\delta^{(\ell+1)}\odot\sigma'(z^{(\ell)})$ |
| He initialisation | $W\sim\mathcal{N}\!\left(0,\tfrac{2}{n_{\text{in}}}\right)$ |
| Xavier initialisation | $W\sim\mathcal{N}\!\left(0,\tfrac{2}{n_{\text{in}}+n_{\text{out}}}\right)$ |
| Momentum | $v_t=\beta v_{t-1}+g_t$, $\theta_t=\theta_{t-1}-\eta v_t$ |
| RMSProp | $v_t=\beta v_{t-1}+(1-\beta)g_t^2$ |
| Adam | $m_t=\beta_1m_{t-1}+(1-\beta_1)g_t$, $v_t=\beta_2v_{t-1}+(1-\beta_2)g_t^2$ |
| Adam update | $\theta_t=\theta_{t-1}-\eta\dfrac{\hat m_t}{\sqrt{\hat v_t}+\epsilon}$ |
| AdamW decay | $\theta_t=(1-\eta\lambda)\theta_{t-1}-\eta\dfrac{\hat m_t}{\sqrt{\hat v_t}+\epsilon}$ |
| Cosine schedule | $\eta_t=\eta_{\min}+\tfrac12(\eta_{\max}-\eta_{\min})\left(1+\cos\dfrac{t\pi}{T}\right)$ |
| Batch norm | $\hat x=\dfrac{x-\mu_B}{\sqrt{\sigma_B^2+\epsilon}}$, $y=\gamma\hat x+\beta$ |
| Layer norm | $\hat x=\dfrac{x-\mu_{\text{feat}}}{\sqrt{\sigma_{\text{feat}}^2+\epsilon}}$ |
| RMSNorm | $\hat x=\dfrac{x}{\sqrt{\frac1d\sum_i x_i^2+\epsilon}}$ |
| Conv output size | $H_{\text{out}}=\left\lfloor\dfrac{H_{\text{in}}+2P-D(K-1)-1}{S}\right\rfloor+1$ |
| Attention | $\mathrm{softmax}\!\left(\dfrac{QK^{\top}}{\sqrt{d_k}}+M\right)V$ |
| Multi-head | $\mathrm{Concat}(\text{head}_1,\dots,\text{head}_h)W_O$ |
| Transformer block (pre-norm) | $x+\mathrm{FFN}(\mathrm{LN}(x+\mathrm{Attn}(\mathrm{LN}(x))))$ |
| KV cache size | $2\,L\,H_{kv}\,d_{\text{head}}\,T\,B\times\text{bytes}$ |
| RNN state | $h_t=\tanh(W_{hh}h_{t-1}+W_{xh}x_t+b)$ |
| LSTM cell | $c_t=f_t\odot c_{t-1}+i_t\odot\tilde c_t$ |
| ELBO | $\mathbb{E}_{q}\left[\log p(x\mid z)\right]-D_{\mathrm{KL}}(q(z\mid x)\Vert p(z))$ |
| GAN objective | $\min_G\max_D\ \mathbb{E}\log D(x)+\mathbb{E}\log(1-D(G(z)))$ |
| DDPM loss | $\mathbb{E}_{t,x_0,\epsilon}\left[\lVert\epsilon-\epsilon_\theta(x_t,t)\rVert^2\right]$ |
| GNN update | $h_v^{(k)}=\sigma\!\left(W\cdot\mathrm{AGG}(\{h_u^{(k-1)}\})\right)$ |
| Distillation | $(1-\alpha)\mathcal{L}_{\text{CE}}+\alpha T^2\mathcal{L}_{\text{KL}}$ |
| Scaling law | $L(N,D)\approx aN^{-\alpha}+bD^{-\beta}+L_\infty$ |

## B. Twelve-week schedule

> Assumes the **PyTorch readiness bridge** is finished before week 1. Starting cold? Add 3–5 days and shift the schedule right; do not compress the bridge into week 1.

| Weeks | Focus | Milestone |
|---|---|---|
| 1 | L7: tensors, modules, MLP, activations, losses | MLP trains on MNIST in PyTorch |
| 2 | L7: backprop by hand, NumPy implementation | Gradient checks pass |
| 3 | L7: autograd internals, initialisation, data pipeline | Parity table green |
| 4 | L7: regularisation, debugging ladder **+ L7 capstone** | `mlp-lab` complete |
| 5 | L8: landscapes, conditioning, SGD and momentum | Trajectory visualisations done |
| 6 | L8: adaptive optimisers, schedules, range tests | Best LR found by measurement |
| 7 | L8: normalisation, gradient pathologies, stability | Unstable run fixed and explained |
| 8 | L8: mixed precision, distributed **+ L8 capstone** | `dynamics-lab` report complete |
| 9 | L9: CNNs, backbones, sequence models | CNN and RNN trained and compared |
| 10 | L9: attention and transformers from scratch | Transformer block matches reference |
| 11 | L9: generative architectures, GNNs, scaling | Generative model trained |
| 12 | L9: compression, fair comparison **+ L9 capstone + phase capstone** | `arch-zoo` and `deep-bench` complete |

> Compute-poor? Train on Fashion-MNIST and TinyStories-scale text. The lessons and the acceptance targets are identical at small scale; only the wall clock changes.

## C. Recommended resources

### Courses

| Course | Focus |
|---|---|
| Stanford CS231n | computer vision and CNNs |
| Stanford CS224n | NLP and transformers |
| MIT 6.S191 | fast overview of DL building blocks |
| fast.ai — Practical Deep Learning | top-down, engineering-first |
| DeepLearning.AI — Deep Learning Specialisation | structured fundamentals |
| Karpathy's "Neural Networks: Zero to Hero" | build backprop and GPT from scratch |

### Books and references

| Resource | Use it for |
|---|---|
| *Dive into Deep Learning* (d2l.ai) | executable textbook for L7–L9 |
| *Deep Learning* — Goodfellow et al. | reference depth |
| *Understanding Deep Learning* — Prince | modern, clear, free |
| PyTorch documentation and tutorials | source of truth for mechanics |
| The Annotated Transformer | line-by-line transformer implementation |
| Lil'Log (Lilian Weng) | optimisation, diffusion, attention surveys |

### Papers worth reading at this level

- "Attention Is All You Need"
- "Deep Residual Learning for Image Recognition"
- "Adam: A Method for Stochastic Optimization" and "Decoupled Weight Decay Regularization"
- "Batch Normalization" and "Layer Normalization"
- "On the difficulty of training recurrent neural networks"
- "Neural Networks and the Bias/Variance Dilemma" and "Deep Double Descent"
- "Denoising Diffusion Probabilistic Models"
- "Generative Adversarial Networks"
- "Auto-Encoding Variational Bayes"
- "Semi-Supervised Classification with Graph Convolutional Networks"
- "Training Compute-Optimal Large Language Models" (Chinchilla)
- "FlashAttention"

### Practice

- **Kaggle** — one small vision competition with a fixed protocol.
- **`timm`** — train several backbones with identical recipes; the comparison is the lesson.
- **NanoGPT-style reproductions** — implement, then diff against a reference.
- **Papers with Code** — pick one architecture paper and re-implement its block.

## D. The ten most common ways to fail this phase

| Failure | Symptom | Fix |
|---|---|---|
| Using `model.fit()`-style libraries | Cannot debug anything | Write the loop yourself at least once |
| Skipping the one-batch test | Days lost to a broken loss | Overfit 10 examples before anything else |
| Tuning architecture before fixing data | Nothing improves | Validate data and labels first |
| Comparing at unequal budgets | Wrong architecture chosen | Match parameters or FLOPs, tune each fairly |
| One seed, one number | "Gain" is noise | Three seeds minimum, report spread |
| Fighting instability with a lower LR | Slow, underfit, unexplained | Diagnose the actual mechanism |
| No gradient diagnostics | Cannot see the real problem | Log per-layer grad norms from step 1 |
| Copying a state-of-the-art config | Does not reproduce | Reproduce at small scale first |
| Ignoring inference cost | Ships a model that cannot serve | Measure latency and memory before choosing |
| No failure log | Repeats the same bug monthly | Keep a running bug-and-fix table |

## E. Progress tracker

| Level | Capstone | Repo link | Parity/grad checks | Key metric + spread | Cost measured | Defence rehearsed |
|---|---|---|---|---|---|---|
| L7 | `mlp-lab` | | ☐ | | ☐ | ☐ |
| L8 | `dynamics-lab` | | ☐ | | ☐ | ☐ |
| L9 | `arch-zoo` | | ☐ | | ☐ | ☐ |
| Phase | `deep-bench` | | ☐ | | ☐ | ☐ |

---

## What comes next

**Phase 4 — Advanced ML and Research · Levels 10–12**

| Level | Title | What it adds |
|---|---|---|
| **L10** | Representation and Self-Supervised Learning | Learning without labels: contrastive, masked, and transfer methods |
| **L11** | Advanced ML Methods | Probabilistic, causal, and modern hybrid methods beyond the standard toolbox |
| **L12** | Research Methods and Experimental Science | Reading, reproducing, and critiquing research with rigour |

Phase 4 assumes everything here: you can build a model from scratch (L7), train it stably and efficiently (L8), choose and compress an architecture (L9), and — critically — evaluate any of it with the protocol discipline from Phase 2. Research is where weak evaluation gets published; your job is to be the person who does not do that.

*Phase 3 of 6 · Levels 7–9 of 18 · Deep Learning*
