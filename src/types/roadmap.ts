export type ContentElement =
  | {
      type: 'checklist';
      groupType: 'study' | 'practice' | 'gate';
      items: { id: string; text: string; kind?: string }[];
    }
  | {
      type: 'math';
      latex: string;
    }
  | {
      type: 'code';
      lang: string;
      code: string;
    }
  | {
      type: 'table';
      headers: string[];
      rows: string[][];
    }
  | {
      type: 'callout';
      variant: 'gate' | 'info';
      text: string;
      checkId: string | null;
    }
  | {
      type: 'subheading';
      variant: 'practice' | 'group';
      title: string;
      subtitle: string | null;
    }
  | {
      type: 'meta';
      label: string;
      value: string;
    }
  | {
      type: 'paragraph';
      text: string;
    };

export interface RoadmapModule {
  id: string;
  code: string;
  title: string;
  kind: 'module' | 'mini-project' | 'checklist' | 'practice';
  elements: ContentElement[];
  checkableIds: string[];
}

export interface RoadmapSection {
  id: string;
  code: string;
  title: string;
  objective: string;
  modules: RoadmapModule[];
  checkableIds: string[];
}

export interface CapstoneSubBlock {
  title: string;
  elements: ContentElement[];
}

export interface LevelCapstone {
  id: string;
  title: string;
  rawHeading?: string;
  subBlocks: CapstoneSubBlock[];
  checkableIds: string[];
}

export interface InterviewQuestion {
  id: string;
  number: number;
  question: string;
  category: string;
  type: 'Concept' | 'Scenario' | 'Debugging' | 'Design' | 'Coding';
}

export interface InterviewGroup {
  title: string;
  rawHeading: string;
  questions: InterviewQuestion[];
}

export interface LevelInterviewBank {
  title: string;
  groups: InterviewGroup[];
  checkableIds: string[];
}

export interface LevelAssessment {
  id?: string;
  title: string;
  categories: {
    title: string;
    elements: ContentElement[];
  }[];
  checkableIds: string[];
}

export interface RoadmapLevel {
  id: string;
  badge: string;
  title: string;
  phaseNum: number;
  phaseSlug: string;
  phaseName: string;
  goal: string;
  prerequisites: string;
  dashboard: Record<string, string>;
  sections: RoadmapSection[];
  capstone: LevelCapstone | null;
  interviewBank: LevelInterviewBank | null;
  assessment: LevelAssessment | null;
  checkableIds: string[];
  totalModules: number;
  totalSections: number;
}

export interface PhaseLevelSummary {
  id: string;
  badge: string;
  title: string;
  goal: string;
  duration: string;
  difficulty: string;
  mainProject: string;
  totalSections: number;
  totalModules: number;
  checkableCount: number;
  checkableIds: string[];
}

export interface PhaseAppendix {
  id: string;
  title: string;
  subBlocks: CapstoneSubBlock[];
  checkableIds: string[];
}

export interface RoadmapPhase {
  phaseNum: number;
  slug: string;
  name: string;
  rangeLabel: string;
  themeLabel: string;
  goal: string;
  rule: string;
  dashboard: Record<string, string>;
  levels: PhaseLevelSummary[];
  capstone: LevelCapstone | null;
  assessment: LevelAssessment | null;
  appendix: PhaseAppendix[];
  checkableIds: string[];
}

export interface ProjectEntry {
  id: string;
  number: number;
  title: string;
  kind: string;
  levelId?: string;
  levelBadge?: string;
  levelTitle?: string;
  phaseNum?: number;
  phaseSlug?: string;
  phaseName: string;
  difficulty?: string;
  duration?: string;
  tools?: string;
  subBlocks: CapstoneSubBlock[];
  checkableIds: string[];
}

export interface InterviewBankEntry {
  levelId: string;
  levelBadge: string;
  levelTitle: string;
  phaseSlug: string;
  phaseName: string;
  groups: InterviewGroup[];
  checkableIds: string[];
}

export interface RoadmapData {
  meta: {
    title: string;
    subtitle: string;
    totalPhases: number;
    totalLevels: number;
    totalSections: number;
    totalModules: number;
    totalCheckables: number;
    totalProjects: number;
    totalQuestions: number;
  };
  phases: RoadmapPhase[];
  levels: RoadmapLevel[];
  projects: ProjectEntry[];
  interviewBanks: InterviewBankEntry[];
}
