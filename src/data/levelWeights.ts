export interface LevelWeightInfo {
  interviewScore: number; // out of 10
  jobScore: number; // out of 10
  interviewRationale: string;
  jobRationale: string;
  roleNote?: string;
  isCoreForRole?: boolean;
}

export const SCORE_INTERPRETATION_NOTE =
  "How to interpret these scores: Ratings are approximate study-priority estimates for a generalist ML/AI engineering path, not measured interview frequencies or guarantees of workplace usage. Importance varies by company, seniority and specialization. Use the target role's job description to adjust priorities.";

export interface RolePriorityPath {
  role: string;
  focus: string;
  keyLevels: string;
  coreBadges: string[];
  partTimeTimeline: string;
  intensiveTimeline: string;
  scoreOverrides?: Record<string, { interviewScore: number; jobScore: number }>;
}

export const ROLE_PRIORITY_PATHS: RolePriorityPath[] = [
  {
    role: 'General ML Engineer',
    focus: 'Prioritize Python, classical ML, evaluation, PyTorch fundamentals, deployment and system design.',
    keyLevels: 'L0, L3–L6, Bridge, L8, L15–L16',
    coreBadges: ['0', '3', '4', '5', '6', 'B', '8', '15', '16'],
    partTimeTimeline: '26–34 weeks (~6.5–8 months @ 15–18 hrs/wk)',
    intensiveTimeline: '13–17 weeks (~3.5–4 months full-time)',
  },
  {
    role: 'LLM Engineer',
    focus: 'Prioritize transformers, NLP/LLMs, RAG, evaluation, serving and production engineering.',
    keyLevels: 'L0, Bridge, L10, L12–L13, L15–L16',
    coreBadges: ['0', 'B', '10', '12', '13', '15', '16'],
    partTimeTimeline: '22–29 weeks (~5.5–7 months @ 15–18 hrs/wk)',
    intensiveTimeline: '11–15 weeks (~3–3.5 months full-time)',
    scoreOverrides: {
      '5': { interviewScore: 6, jobScore: 6 },
      '9': { interviewScore: 4, jobScore: 5 },
      '10': { interviewScore: 10, jobScore: 10 },
      '12': { interviewScore: 10, jobScore: 10 },
      '13': { interviewScore: 10, jobScore: 10 },
      '14': { interviewScore: 6, jobScore: 6 },
      '15': { interviewScore: 9, jobScore: 10 },
      '16': { interviewScore: 10, jobScore: 9 },
    },
  },
  {
    role: 'Applied Scientist',
    focus: 'Prioritize statistics, ML theory, experimental design, research reading and domain-specific mathematics.',
    keyLevels: 'L1–L3, L5–L6, L8, L10–L14, L17',
    coreBadges: ['1', '2', '3', '5', '6', '8', '10', '11', '12', '13', '14', '17'],
    partTimeTimeline: '38–50 weeks (~9–11.5 months @ 15–18 hrs/wk)',
    intensiveTimeline: '19–25 weeks (~4.5–6 months full-time)',
    scoreOverrides: {
      '1': { interviewScore: 8, jobScore: 8 },
      '2': { interviewScore: 9, jobScore: 8 },
      '3': { interviewScore: 10, jobScore: 10 },
      '11': { interviewScore: 8, jobScore: 8 },
      '12': { interviewScore: 9, jobScore: 9 },
      '14': { interviewScore: 8, jobScore: 9 },
      '17': { interviewScore: 9, jobScore: 9 },
    },
  },
  {
    role: 'Computer Vision Engineer',
    focus: 'Prioritize deep learning, vision architectures, data pipelines and vision evaluation.',
    keyLevels: 'L0–L2, Bridge, L8–L10, L13, L15',
    coreBadges: ['0', '1', '2', 'B', '8', '9', '10', '13', '15'],
    partTimeTimeline: '29–38 weeks (~7–9 months @ 15–18 hrs/wk)',
    intensiveTimeline: '15–19 weeks (~3.5–4.5 months full-time)',
    scoreOverrides: {
      '1': { interviewScore: 8, jobScore: 8 },
      '9': { interviewScore: 10, jobScore: 10 },
      '10': { interviewScore: 9, jobScore: 9 },
      '11': { interviewScore: 8, jobScore: 8 },
      '13': { interviewScore: 9, jobScore: 10 },
    },
  },
  {
    role: 'Research Engineer',
    focus: 'Prioritize PyTorch, optimization, reproducibility, research implementation and efficient training.',
    keyLevels: 'L0–L2, Bridge, L8–L12, L14, L17',
    coreBadges: ['0', '1', '2', 'B', '8', '9', '10', '11', '12', '14', '17'],
    partTimeTimeline: '32–43 weeks (~7.5–10 months @ 15–18 hrs/wk)',
    intensiveTimeline: '16–22 weeks (~4–5 months full-time)',
    scoreOverrides: {
      '1': { interviewScore: 8, jobScore: 9 },
      '2': { interviewScore: 9, jobScore: 9 },
      'B': { interviewScore: 10, jobScore: 10 },
      '8': { interviewScore: 10, jobScore: 10 },
      '10': { interviewScore: 9, jobScore: 9 },
      '12': { interviewScore: 9, jobScore: 10 },
      '14': { interviewScore: 8, jobScore: 9 },
      '17': { interviewScore: 9, jobScore: 9 },
    },
  },
];

export const LEVEL_WEIGHTS_BY_BADGE: Record<string, LevelWeightInfo> = {
  '0': {
    interviewScore: 9,
    jobScore: 10,
    interviewRationale:
      '**Python fluency, coding problem-solving, debugging and complexity analysis** are foundational in many ML engineering hiring processes. Practical exercises may also assess **code quality and testing**.',
    jobRationale:
      '**Readable, reliable Python, version control, testing and debugging** make model development and collaboration sustainable.',
  },
  '1': {
    interviewScore: 6,
    jobScore: 7,
    interviewRationale:
      'Understand **vectors, matrices, dot products, projections, eigenvectors and SVD** well enough to explain how they relate to ML. The **mathematical depth depends on the role**.',
    jobRationale:
      'Linear algebra helps you reason about **tensor shapes, embeddings, matrix factorization** and low-rank methods such as **LoRA**.',
  },
  '2': {
    interviewScore: 7,
    jobScore: 7,
    interviewRationale:
      'Be able to explain **gradients, the chain rule, gradient descent, learning rates, regularization** and why training can become unstable. Advanced calculus is more important for **research-heavy roles**.',
    jobRationale:
      'Optimization knowledge helps **diagnose convergence problems**, understand **training dynamics** and choose appropriate optimization strategies.',
  },
  '3': {
    interviewScore: 9,
    jobScore: 9,
    interviewRationale:
      '**Probability, conditional probability, common distributions, estimation, hypothesis testing and Bayesian reasoning** frequently matter in ML and Applied Scientist interviews.',
    jobRationale:
      'Statistical reasoning supports **experiment design, uncertainty estimates, calibration** and **evidence-based model comparisons**.',
  },
  '4': {
    interviewScore: 7,
    jobScore: 10,
    interviewRationale:
      '**Data manipulation, missing values, joins, outliers, exploratory analysis and leakage awareness** often appear in practical ML or data-oriented exercises.',
    jobRationale:
      '**Reliable data preparation, schema validation and diagnostic analysis** prevent data defects from undermining model quality.',
  },
  '5': {
    interviewScore: 9,
    jobScore: 9,
    interviewRationale:
      'Expect to explain **regression, classification, regularization, bias–variance trade-offs, decision trees, SVMs** and the assumptions behind common algorithms.',
    jobRationale:
      'Classical models provide **strong baselines** and can offer an effective balance of **accuracy, cost, interpretability and operational simplicity**.',
  },
  '6': {
    interviewScore: 9,
    jobScore: 10,
    interviewRationale:
      'Know how to **select metrics, design leakage-safe validation, handle imbalanced classes, compare models** and explain boosting methods such as **XGBoost and LightGBM**.',
    jobRationale:
      '**Correct evaluation and strong tabular baselines** are essential for making reliable model-selection and deployment decisions.',
  },
  '7': {
    interviewScore: 6,
    jobScore: 7,
    interviewRationale:
      'Understand **clustering assumptions, PCA, distance measures, anomaly detection** and the differences between methods such as **t-SNE and UMAP**.',
    jobRationale:
      'These methods can support **exploratory analysis, segmentation, embedding inspection and anomaly discovery** when labels are limited or unavailable.',
  },
  B: {
    interviewScore: 8,
    jobScore: 9,
    interviewRationale:
      'Deep learning interviews may require you to **implement a training loop, build a module, define a loss** or **debug tensor and gradient issues**.',
    jobRationale:
      'PyTorch proficiency helps with **model implementation, autograd, data loading, GPU execution, mixed precision and reproducible training**.',
  },
  '8': {
    interviewScore: 8,
    jobScore: 8,
    interviewRationale:
      'Understand **forward and backward propagation, initialization, activation functions, normalization, regularization** and common causes of unstable training.',
    jobRationale:
      'These fundamentals help you **diagnose optimization problems, design architectures** and understand why a neural network performs poorly.',
  },
  '9': {
    interviewScore: 5,
    jobScore: 6,
    interviewRationale:
      'Generalist ML interviews may test **CNNs and vision concepts**, while CV-specific roles can require deeper knowledge of **detection, segmentation, vision transformers and evaluation metrics**.',
    jobRationale:
      'Vision expertise is important for **image classification, OCR, visual inspection, medical imaging** and **vision-based multimodal systems**.',
    roleNote: 'Role-Dependent Depth · Prioritize deeply for Computer Vision & Multimodal roles',
  },
  '10': {
    interviewScore: 9,
    jobScore: 9,
    interviewRationale:
      'For modern deep learning and LLM-focused roles, understand **attention, positional information, transformer architecture, training objectives** and inference concepts such as **KV caching**.',
    jobRationale:
      'Transformers underpin many **language, vision and multimodal systems**, although implementation and optimization requirements **differ by application**.',
  },
  '11': {
    interviewScore: 6,
    jobScore: 7,
    interviewRationale:
      'Research-oriented or specialized interviews may cover **variational autoencoders, contrastive learning, diffusion models or graph neural networks**. Learn the **underlying objectives and trade-offs** rather than memorizing terminology.',
    jobRationale:
      'These methods can support **representation learning, generative applications, retrieval and graph-based prediction** when the problem warrants them.',
    roleNote: 'Role-Dependent Depth · Select sub-topics (Generative, SSL, or GNNs) matching your target domain',
  },
  '12': {
    interviewScore: 9,
    jobScore: 9,
    interviewRationale:
      'For LLM-oriented positions, prepare for **tokenization, transformer models, fine-tuning, LoRA/QLoRA, RAG, evaluation**, and the **trade-offs between prompting, retrieval and training**. Alignment methods such as DPO are more relevant to certain roles.',
    jobRationale:
      'These skills help **build and evaluate language-model applications**, improve **grounding and reliability**, and control **latency and inference cost**.',
  },
  '13': {
    interviewScore: 7,
    jobScore: 8,
    interviewRationale:
      'Prepare for the **domain relevant to the role**: **retrieval and ranking** for recommendations, **forecasting and temporal validation** for time series, or **treatment effects and confounding** for causal ML.',
    jobRationale:
      'These techniques support **personalization, demand forecasting, experimentation and impact measurement** in suitable business settings.',
    roleNote: 'Role-Dependent Depth · Focus on the track (RecSys, Time Series, or Causal ML) used by your target team',
  },
  '14': {
    interviewScore: 4,
    jobScore: 5,
    interviewRationale:
      'RL theory is usually a **specialization rather than a universal ML requirement**. Prioritize it for **RL, robotics, bandits, sequential decision-making** or relevant **model post-training roles**.',
    jobRationale:
      '**RL and contextual bandits** can optimize sequential decisions when **feedback, exploration, delayed rewards and constraints** make them appropriate.',
    roleNote: 'Role-Dependent Depth · Specialized track for RL, Bandits, Robotics, and LLM Post-Training',
  },
  '15': {
    interviewScore: 9,
    jobScore: 10,
    interviewRationale:
      'Production-oriented ML interviews may assess **model serving, deployment, monitoring, data and model drift, latency, reliability, CI/CD and rollback strategies**.',
    jobRationale:
      'A model must be **integrated, observable and maintainable** to deliver sustained value in production.',
  },
  '16': {
    interviewScore: 9,
    jobScore: 9,
    interviewRationale:
      'Many mid-level and senior ML roles assess **end-to-end system design**, including **data pipelines, model selection, evaluation, serving, monitoring** and trade-offs among **quality, latency, cost and scale**.',
    jobRationale:
      '**System-level thinking** connects business objectives to reliable ML products and helps teams make **sound architectural decisions**.',
  },
  '17': {
    interviewScore: 6,
    jobScore: 7,
    interviewRationale:
      '**Paper discussions, experimental reasoning and research presentations** can be important for **Applied Scientist and research engineering roles**; expectations vary considerably elsewhere.',
    jobRationale:
      '**Critical reading, reproducibility and ablation studies** help you judge whether a proposed method is useful and whether reported improvements hold in your setting.',
    roleNote: 'Role-Dependent Depth · High priority for Applied Scientist & Research Engineer roles',
  },
  '18': {
    interviewScore: 8,
    jobScore: 6,
    interviewRationale:
      'A **focused resume, clear project explanations** and effective **coding, ML theory, system design and behavioral preparation** improve your ability to demonstrate competence. Public projects and open-source contributions can help establish credibility, especially early in your career.',
    jobRationale:
      '**Technical writing, reproducible work and clear communication** help teams review, maintain and improve ML systems.',
  },
};

export function getLevelWeights(
  badge: string,
  selectedRole: string = 'General ML Engineer'
): LevelWeightInfo {
  const base = LEVEL_WEIGHTS_BY_BADGE[badge] || {
    interviewScore: 7,
    jobScore: 8,
    interviewRationale:
      'Important for demonstrating **core ML concepts and practical problem-solving** during technical interviews.',
    jobRationale:
      'Supports **day-to-day model development, evaluation, and production engineering** on the job.',
  };

  const roleConfig = ROLE_PRIORITY_PATHS.find((r) => r.role === selectedRole);
  const override = roleConfig?.scoreOverrides?.[badge];
  const isCoreForRole = roleConfig ? roleConfig.coreBadges.includes(badge) : false;

  return {
    ...base,
    interviewScore: override ? override.interviewScore : base.interviewScore,
    jobScore: override ? override.jobScore : base.jobScore,
    isCoreForRole,
  };
}
