import { ContentElement } from './roadmap';

export interface DsaDailyLoopItem {
  slot: string;
  time: string;
  activity: string;
}

export interface DsaRuleItem {
  number: number;
  title: string;
  rule: string;
}

export interface DsaMasteryTier {
  tier: string;
  meaning: string;
  evidence: string;
}

export interface DsaScheduleWeek {
  week: number;
  days: string;
  phase: string;
  blocks: string;
  checkpoint: string;
}

export interface DsaCheckpointItem {
  checkpoint: string;
  day: number;
  format: string;
  content: string;
}

export interface DsaPracticeProblem {
  id: string;
  tier: 'Easy' | 'Medium' | 'Hard' | 'Challenge' | string;
  problem: string;
  cue: string;
  target: string;
}

export interface DsaPatternCard {
  title: string;
  table: {
    headers: string[];
    rows: string[][];
  } | null;
  text?: string;
}

export interface DsaGate {
  id: string;
  title: string;
  text: string;
}

export interface DsaBlock {
  id: string;
  code: string;
  phaseId: string;
  phaseName: string;
  title: string;
  days: string;
  objective: string;
  patternCards: DsaPatternCard[];
  checklist: { id: string; text: string }[];
  conceptDrill: { question: string; answer: string }[];
  practiceLadder: DsaPracticeProblem[];
  practiceTasks: { id: string; text: string }[];
  gate: DsaGate | null;
  elements: ContentElement[];
  checkableIds: string[];
}

export interface DsaPhase {
  id: string;
  code: string;
  name: string;
  days: string;
  blocksLabel: string;
  goal: string;
  prerequisites: string;
  dashboard: Record<string, string>;
  blocks: DsaBlock[];
  reviewDay: {
    title: string;
    elements: ContentElement[];
    checkableIds: string[];
  } | null;
  checkableIds: string[];
}

export interface DsaAppliedSection {
  id: string;
  sectionNum: string;
  title: string;
  format: string;
  elements: ContentElement[];
  checkableIds: string[];
}

export interface DsaAppliedTrack {
  title: string;
  subtitle: string;
  intro: string;
  roleMatrix: {
    headers: string[];
    rows: string[][];
  } | null;
  sections: DsaAppliedSection[];
  checkableIds: string[];
}

export interface Dsa16Pattern {
  number: number;
  name: string;
  trigger: string;
  template: string;
  complexity: string;
}

export interface DsaTemplateSnippet {
  id: string;
  title: string;
  lang: string;
  code: string;
  notes?: string;
  description?: string;
  snippets?: {
    label?: string;
    lang: string;
    code: string;
  }[];
}

export interface DsaCheatSheets {
  title: string;
  subtitle: string;
  patterns: Dsa16Pattern[];
  templates: DsaTemplateSnippet[];
  complexityTable: { headers: string[]; rows: string[][] } | null;
  gotchasTable: { headers: string[]; rows: string[][] } | null;
  failureModes: string[];
  checkableIds: string[];
}

export interface DsaRoadmapData {
  meta: {
    title: string;
    subtitle: string;
    targets: string;
    totalPhases: number;
    totalBlocks: number;
    totalCheckables: number;
    totalProblems: number;
    totalDrills: number;
    totalPatterns: number;
  };
  dailyLoop: DsaDailyLoopItem[];
  tenRules: DsaRuleItem[];
  masteryLadder: DsaMasteryTier[];
  schedule: DsaScheduleWeek[];
  checkpoints: DsaCheckpointItem[];
  phases: DsaPhase[];
  appliedTrack: DsaAppliedTrack;
  cheatSheets: DsaCheatSheets;
}
