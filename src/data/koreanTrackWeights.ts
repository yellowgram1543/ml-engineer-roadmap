export interface KoreanLevelWeightInfo {
  fluencyScore: number; // out of 10
  literacyScore: number; // out of 10
  fluencyRationale: string;
  literacyRationale: string;
  trackFocus: string;
  studyDepth: 'Core Mastery' | 'Working Fluency' | 'Selective / Skim';
  isCoreForTrack: boolean;
}

export const KOREAN_TRACK_INTERPRETATION_NOTE =
  "How to interpret these weights: Scores reflect calibrated study depth and production priority based on your selected target track (Conversational Fluency vs Textual/Professional Literacy). Toggle any track above to recalculate your focus priorities.";

export const KOREAN_TRACK_PATHS = [
  {
    track: 'Comprehensive Mastery',
    label: 'All-Round Mastery',
    focus: 'Balanced spoken agility, deep Sino-Korean root recognition, and high-register professional & literary production.',
    keyLevels: 'All Levels (L0–L18)',
    targetBadges: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
    estimatedTimeline: '12–18 months at 2–3 hrs/day',
  },
  {
    track: 'Survival & Everyday Life',
    label: 'Everyday Fluency',
    focus: 'Master reading signs, phonetics, survival interactions, cafes, clinics, transit, and housing without panic.',
    keyLevels: 'Phase 1 & Phase 2 (L0–L6)',
    targetBadges: ['0', '1', '2', '3', '4', '5', '6'],
    estimatedTimeline: '3–5 months at 1.5–2 hrs/day',
  },
  {
    track: 'Professional & Workplace',
    label: 'Business Korean',
    focus: 'Corporate documentation, meetings, client negotiation, honorific etiquette, and job interviewing in Korea.',
    keyLevels: 'L0–L3, L7–L9, L10, L11, L13',
    targetBadges: ['0', '1', '2', '3', '7', '8', '9', '10', '11', '13'],
    estimatedTimeline: '6–9 months at 2 hrs/day',
  },
  {
    track: 'TOPIK II & Certification',
    label: 'TOPIK II (Level 5–6)',
    focus: 'High-speed reading comprehension, discourse connectors, 54-essay plain form argumentation, and past papers.',
    keyLevels: 'L7–L11, L12, L13, L14, L15',
    targetBadges: ['7', '8', '9', '10', '11', '12', '13', '14', '15'],
    estimatedTimeline: '6–8 months intensive',
  },
  {
    track: 'Literature & Translation',
    label: 'Literary & Interpretation',
    focus: 'Novels, idioms & proverbs (L12), Hanja roots (L11), academic abstracts, editorials, and consecutive interpreting.',
    keyLevels: 'L11, L12, L14, L15, L16, L17, L18',
    targetBadges: ['11', '12', '14', '15', '16', '17', '18'],
    estimatedTimeline: '9–12 months advanced',
  },
];

export const BASE_KOREAN_LEVEL_WEIGHTS: Record<
  string,
  {
    fluencyScore: number;
    literacyScore: number;
    fluencyRationale: string;
    literacyRationale: string;
  }
> = {
  '0': {
    fluencyScore: 10,
    literacyScore: 10,
    fluencyRationale: 'The 7 sound-change rules (liaison, nasalisation, tensification) dictate whether you sound natural or unintelligible.',
    literacyRationale: 'Featural syllable blocks allow instant decoding of any Korean sign, menu, or word.',
  },
  '1': {
    fluencyScore: 10,
    literacyScore: 8,
    fluencyRationale: 'Survival questions, numbers (Sino vs Native), basic requests, and direction finding under pressure.',
    literacyRationale: 'Essential survival vocabulary for storefronts, transit kiosks, and receipts.',
  },
  '2': {
    fluencyScore: 10,
    literacyScore: 9,
    fluencyRationale: 'The core conjugation engine: present, past, future, and irregular stems (`ㅂ`, `ㄷ`, `ㅅ`, `ㅡ`, `르`).',
    literacyRationale: 'Syntax foundation for verbs and adjectives that generate all written sentences.',
  },
  '3': {
    fluencyScore: 9,
    literacyScore: 9,
    fluencyRationale: 'Basic clausal connectors (`-아서/어서`, `-고`, `-(으)니까`, `-(으)면`) allowing complex multi-clause speech.',
    literacyRationale: 'Compound sentence structure in messages, emails, and basic notices.',
  },
  '4': {
    fluencyScore: 10,
    literacyScore: 8,
    fluencyRationale: 'Daily life domains: banking, real estate, clinics, pharmacies, and post offices.',
    literacyRationale: 'Understanding medical instructions, bank transfer prompts, and lease clauses.',
  },
  '5': {
    fluencyScore: 10,
    literacyScore: 7,
    fluencyRationale: 'Listening comprehension at native speed; mastering reduction and fast colloquial intonation.',
    literacyRationale: 'Phonetic transcription and auditory matching against transcripts.',
  },
  '6': {
    fluencyScore: 8,
    literacyScore: 10,
    fluencyRationale: 'Speaking about reading materials, summarizing brief news items.',
    literacyRationale: 'Reading short news articles, blog posts, and writing 300-word daily essays with correct spacing.',
  },
  '7': {
    fluencyScore: 9,
    literacyScore: 9,
    fluencyRationale: 'Logical discourse connectors (`-는데도`, `-도록`, `-다시피`) for cohesive multi-minute conversational arguments.',
    literacyRationale: 'Paragraph cohesion in argumentative and descriptive writing.',
  },
  '8': {
    fluencyScore: 9,
    literacyScore: 9,
    fluencyRationale: 'Direct and indirect reported speech (`-다고 하다`, `-재요`) and passive/causative verb forms.',
    literacyRationale: 'News reporting style and quoting external statements accurately in writing.',
  },
  '9': {
    fluencyScore: 9,
    literacyScore: 8,
    fluencyRationale: 'Flawless register shifting between 해요체, 하십시오체, and 해체 based on age, rank, and intimacy.',
    literacyRationale: 'Selecting correct register for formal letters, messaging, and announcements.',
  },
  '10': {
    fluencyScore: 8,
    literacyScore: 10,
    fluencyRationale: 'Supposition (`-을 텐데`), regret (`-을 걸 그랬다`), and inevitable tendency (`-기 마련이다`).',
    literacyRationale: 'Essential grammar structures for TOPIK II Levels 4–5 reading and essay sections.',
  },
  '11': {
    fluencyScore: 7,
    literacyScore: 10,
    fluencyRationale: 'Recognizing root meanings in spoken formal debate and academic lectures.',
    literacyRationale: '1,800 Hanja roots: decrypting 60%+ of all advanced nouns, headlines, and contracts on sight.',
  },
  '12': {
    fluencyScore: 8,
    literacyScore: 9,
    fluencyRationale: 'Natural proverbs (`속담`), sound-symbolic words (`의성어·의태어`), and four-character idioms (`사자성어`).',
    literacyRationale: 'Plain form (`해라체`) essay writing for editorials, journals, and analytical columns.',
  },
  '13': {
    fluencyScore: 9,
    literacyScore: 9,
    fluencyRationale: 'Running corporate meetings, client negotiations, formal proposals, and job interviews in Korean.',
    literacyRationale: 'Drafting 3,000-word business reports, executive summaries, and formal proposals.',
  },
  '14': {
    fluencyScore: 7,
    literacyScore: 10,
    fluencyRationale: 'Discussing literature, philosophy, and political analysis with nuance.',
    literacyRationale: 'Reading contemporary novels, academic journal abstracts, and high-register editorials.',
  },
  '15': {
    fluencyScore: 7,
    literacyScore: 10,
    fluencyRationale: 'Oral summarisation of complex social charts under strict time limits.',
    literacyRationale: 'TOPIK II Level 6 exam mastery: reading speed (160+ wpm), timed Question 53/54 essay writing.',
  },
  '16': {
    fluencyScore: 10,
    literacyScore: 10,
    fluencyRationale: 'Consecutive and simultaneous interpretation: zero invented facts, flawless mental memory buffer.',
    literacyRationale: 'Professional document translation between Korean and English with fidelity to register.',
  },
  '17': {
    fluencyScore: 10,
    literacyScore: 8,
    fluencyRationale: 'Native-adjacent fluency: subtext, humor, cultural timing, dialect awareness, zero foreigner seams.',
    literacyRationale: 'Effortless absorption of Korean-language media as a native default.',
  },
  '18': {
    fluencyScore: 10,
    literacyScore: 10,
    fluencyRationale: 'Teaching Korean, diagnosing fossilised learner errors, and leading cultural discourse.',
    literacyRationale: 'Lifelong immersion engine: maintaining vocabulary corpora and curriculum documentation.',
  },
};

export function getKoreanLevelWeights(
  badge: string,
  selectedFocus: string = 'Comprehensive Mastery'
): KoreanLevelWeightInfo {
  const base = BASE_KOREAN_LEVEL_WEIGHTS[badge] || {
    fluencyScore: 8,
    literacyScore: 8,
    fluencyRationale: 'Core communication skill building across vocabulary and grammar.',
    literacyRationale: 'Reading and writing foundation for modern Korean language.',
  };

  const track = KOREAN_TRACK_PATHS.find((t) => t.track === selectedFocus) || KOREAN_TRACK_PATHS[0];
  const isCore = track.targetBadges.includes(badge);

  let studyDepth: 'Core Mastery' | 'Working Fluency' | 'Selective / Skim' = 'Core Mastery';
  let trackFocus = `Vital curriculum component for ${track.label}.`;

  if (!isCore) {
    studyDepth = 'Selective / Skim';
    trackFocus = `Secondary priority for ${track.label}. Can be skimmed or completed after target milestones.`;
  } else if (
    (selectedFocus === 'Survival & Everyday Life' && parseInt(badge, 10) <= 3) ||
    (selectedFocus === 'TOPIK II & Certification' && ['10', '11', '15'].includes(badge)) ||
    (selectedFocus === 'Professional & Workplace' && ['9', '11', '13'].includes(badge))
  ) {
    studyDepth = 'Core Mastery';
    trackFocus = `Critical flagship requirement for ${track.label} pass standard.`;
  } else {
    studyDepth = 'Working Fluency';
    trackFocus = `High-yield supporting competence for ${track.label}.`;
  }

  return {
    fluencyScore: base.fluencyScore,
    literacyScore: base.literacyScore,
    fluencyRationale: base.fluencyRationale,
    literacyRationale: base.literacyRationale,
    trackFocus,
    studyDepth,
    isCoreForTrack: isCore,
  };
}
