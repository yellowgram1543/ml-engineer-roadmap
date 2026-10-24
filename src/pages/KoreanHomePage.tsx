import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Volume2,
  FileText,
  Award,
  MessageSquare,
  Languages,
  CheckCircle2,
  Sparkles,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { RoadmapData } from '../types/roadmap';
import { useKoreanProgressStore, computeKoreanCompletion } from '../store/useKoreanProgressStore';
import { RichText } from '../components/RichText';
import {
  KOREAN_TRACK_PATHS,
} from '../data/koreanTrackWeights';

interface KoreanHomePageProps {
  data: RoadmapData;
}

interface PartDefinition {
  partCode: string;
  name: string;
  koreanName: string;
  description: string;
  unitRange: string;
  unitIndexes: number[]; // indexes in level.sections (0 to 16)
  checkpointCode?: string;
  checkpointTitle?: string;
}

const LEVEL1_PARTS: PartDefinition[] = [
  {
    partCode: 'Part 0',
    name: 'Hangul Foundations',
    koreanName: '한글과 발음 기초',
    description: 'Vowels, consonants, 3-way phonation, syllable blocks, 받침 7 representative final sounds, and liaison sound shifts.',
    unitRange: 'Unit 0',
    unitIndexes: [0],
  },
  {
    partCode: 'Part A',
    name: 'Learn to Read and Start Speaking',
    koreanName: '기초 회화와 첫 만남',
    description: 'First meetings, greetings, names, nationalities, classroom survival, everyday objects, demonstratives, and possession.',
    unitRange: 'Units 1–3',
    unitIndexes: [1, 2, 3],
    checkpointCode: 'A',
    checkpointTitle: 'Checkpoint A: Reading & Self-Introduction Gate',
  },
  {
    partCode: 'Part B',
    name: 'Handle Everyday Needs',
    koreanName: '일상생활과 생존 한국어',
    description: 'Locating objects in rooms, finding cafes, ordering drinks/meals, asking prices in Won, item counters, daily verbs, and family.',
    unitRange: 'Units 4–8',
    unitIndexes: [4, 5, 6, 7, 8],
    checkpointCode: 'B',
    checkpointTitle: 'Checkpoint B: Everyday Needs, Shopping & Dining Gate',
  },
  {
    partCode: 'Part C',
    name: 'Talk About Your Life',
    koreanName: '나의 하루와 취미 생활',
    description: 'Telling time, calendar dates, days of the week, negotiating appointments, hobbies, desires (-고 싶어요), past tense, weather, and clothing.',
    unitRange: 'Units 9–13',
    unitIndexes: [9, 10, 11, 12, 13],
    checkpointCode: 'C',
    checkpointTitle: 'Checkpoint C: Schedules, Hobbies & Past Outings Gate',
  },
  {
    partCode: 'Part D',
    name: 'Connect Your Korean',
    koreanName: '종합 소통과 미래 계획',
    description: 'Public transit with -(으)로, pedestrian directions, future plans -(으)ㄹ 거예요, suggestions -(으)ㄹ까요?, conversation repair, and comprehensive narrative.',
    unitRange: 'Units 14–16',
    unitIndexes: [14, 15, 16],
    checkpointCode: 'D',
    checkpointTitle: 'Checkpoint D: Final Assessment & Comprehensive Exit Interview Gate',
  },
];

export const KoreanHomePage: React.FC<KoreanHomePageProps> = ({ data }) => {
  const checked = useKoreanProgressStore((s) => s.checked);
  const selectedFocus = useKoreanProgressStore((s) => s.selectedFocus);
  const setSelectedFocus = useKoreanProgressStore((s) => s.setSelectedFocus);

  // Find Level 1 directly from data
  const level1 = data.levels.find((l) => l.badge === '1') || data.levels[0];

  const level1Comp = computeKoreanCompletion(checked, level1.checkableIds);

  const activeTrack =
    KOREAN_TRACK_PATHS.find((t) => t.track === selectedFocus) || KOREAN_TRACK_PATHS[0];

  return (
    <main id="main">
      {/* ───────────────── HERO SECTION ───────────────── */}
      <section className="border-b border-slate-200/80 bg-gradient-to-b from-indigo-50/40 via-white to-slate-50/60 py-10 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Column — Title & Subtitle */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-3 py-1 text-xs font-semibold text-indigo-700 mb-4 shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                <span>한국어 마스터 로드맵 · SNU Korean+ Inspired Standard</span>
              </div>

              <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.15]">
                Level 1: Beginner Korean <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-rose-600 to-amber-600">
                  초급 1 한국어 마스터
                </span>
              </h1>

              <p className="mt-3 font-mono-code text-xs sm:text-sm font-semibold text-indigo-700">
                Absolute Beginner → Basic Communication (4 Parts · 17 Units · 34 Lessons)
              </p>

              <p className="mt-3 text-sm text-slate-600 sm:text-base leading-relaxed max-w-2xl">
                Every unit and lesson is built as an interactive checklist following the authentic 5-step university method: 
                <strong> 1. 대화 (Conversation)</strong> → <strong>2. 어휘 (Vocabulary)</strong> → <strong>3. 문법 (Grammar)</strong> → <strong>4. 말하기·듣기 (Drills)</strong> → <strong>5. 읽기·쓰기 (Reading &amp; Writing)</strong>.
              </p>

              {/* Stats Bar */}
              <div className="mt-6 flex flex-wrap gap-3 text-xs font-mono-code text-slate-600">
                <div className="rounded-xl bg-white px-3.5 py-2 border border-slate-200 shadow-xs flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">4</span>
                  <span>Parts</span>
                </div>
                <div className="rounded-xl bg-white px-3.5 py-2 border border-slate-200 shadow-xs flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">17</span>
                  <span>Units (0–16)</span>
                </div>
                <div className="rounded-xl bg-white px-3.5 py-2 border border-slate-200 shadow-xs flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">34</span>
                  <span>Lessons</span>
                </div>
                <div className="rounded-xl bg-white px-3.5 py-2 border border-slate-200 shadow-xs flex items-center gap-2">
                  <span className="font-bold text-indigo-700 text-sm">1,211</span>
                  <span>Checkable Steps</span>
                </div>
                <div className="rounded-xl bg-white px-3.5 py-2 border border-slate-200 shadow-xs flex items-center gap-2">
                  <span className="font-bold text-amber-700 text-sm">4</span>
                  <span>Milestone Gates</span>
                </div>
              </div>

              {/* CTA Row */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/korean/level/level-1"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  Open Level 1 Checklist Course
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/korean/questions"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  <Volume2 className="h-4 w-4 text-rose-600" />
                  Vocabulary &amp; Audio Drills
                </Link>
                <Link
                  to="/korean/projects"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                >
                  <Award className="h-4 w-4 text-amber-600" />
                  Milestone Checkpoints (A–D)
                </Link>
              </div>
            </div>

            {/* Right Column — Global Progress Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs font-bold tracking-wider text-slate-500 uppercase">
                    Level 1 Master Progress
                  </span>
                  <span className="font-mono-code text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {level1Comp.pct}% Complete
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex items-baseline justify-between font-mono-code">
                    <span className="font-display text-4xl font-extrabold text-slate-900">
                      {level1Comp.pct}%
                    </span>
                    <span className="text-xs text-slate-500">
                      {level1Comp.done} of {level1Comp.total} steps mastered
                    </span>
                  </div>
                  <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-rose-500 transition-all duration-300"
                      style={{ width: `${level1Comp.pct}%` }}
                    />
                  </div>
                </div>

                {/* 5-Step Pedagogy Legend */}
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <div className="text-[11px] font-mono-code text-slate-500 uppercase tracking-wider font-semibold mb-2">
                    5-Step Method Applied To Every Lesson:
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-100 text-indigo-700 font-bold text-[10px]">1</span>
                      <span><strong>대화 (Conversation):</strong> Situational dialogue + native audio</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-100 text-indigo-700 font-bold text-[10px]">2</span>
                      <span><strong>어휘 (Vocabulary):</strong> Target words, Hanja, definitions &amp; audio</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-100 text-indigo-700 font-bold text-[10px]">3</span>
                      <span><strong>문법 (Grammar):</strong> Formula boxes, verb stems &amp; contrast rules</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-100 text-indigo-700 font-bold text-[10px]">4</span>
                      <span><strong>말하기·듣기 (Drills):</strong> Shadowing &amp; substitution ladders</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-100 text-indigo-700 font-bold text-[10px]">5</span>
                      <span><strong>읽기·쓰기 (Production):</strong> Reading passages &amp; guided writing</span>
                    </div>
                  </div>
                </div>

                {/* Track Target Pill */}
                <div className="mt-5 rounded-xl bg-slate-50 border border-slate-200/80 p-3 flex items-center justify-between text-xs">
                  <span className="font-mono-code text-slate-600">Goal Track:</span>
                  <span className="font-bold text-indigo-700 font-mono-code">{activeTrack.label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── LEVEL 1 PARTS & UNITS GRID ───────────────── */}
      <section className="py-12 sm:py-16 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-indigo-600 px-2.5 py-1 text-xs font-bold font-mono-code text-white shadow-xs">
                  Level 1 Curriculum
                </span>
                <span className="font-mono-code text-xs text-slate-500">
                  Parts 0, A, B, C, D · Units 0–16
                </span>
              </div>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Syllabus &amp; Lesson Sequence
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Browse through all 4 Parts and 17 Units. Each unit contains structured 5-step lessons with checkboxes and audio.
              </p>
            </div>

            <Link
              to="/korean/level/level-1"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-white border border-indigo-200 px-3.5 py-2 rounded-xl shadow-2xs hover:bg-indigo-50/50 transition cursor-pointer"
            >
              <span>Expand All Units in Checklist View</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Parts Accordions / Containers */}
          <div className="space-y-10">
            {LEVEL1_PARTS.map((part) => {
              // Gather units for this part
              const partUnits = part.unitIndexes
                .map((idx) => level1.sections[idx])
                .filter(Boolean);

              const partCheckableIds = partUnits.flatMap((u) => u.checkableIds);
              const partComp = computeKoreanCompletion(checked, partCheckableIds);

              return (
                <div
                  key={part.partCode}
                  className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs"
                >
                  {/* Part Header */}
                  <div className="border-b border-slate-100 pb-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs font-display font-extrabold text-sm">
                          {part.partCode.replace('Part ', '')}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono-code text-xs font-bold uppercase tracking-wider text-indigo-600">
                              {part.partCode}
                            </span>
                            <span className="text-slate-300">·</span>
                            <span className="font-mono-code text-xs text-slate-500">
                              {part.unitRange}
                            </span>
                          </div>
                          <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                            {part.name} <span className="font-hangul text-lg font-semibold text-slate-500">({part.koreanName})</span>
                          </h3>
                        </div>
                      </div>

                      {/* Part completion badge */}
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-xs font-mono-code font-bold text-slate-900">
                            {partComp.pct}% complete
                          </div>
                          <div className="text-[11px] font-mono-code text-slate-500">
                            {partComp.done} / {partComp.total} steps
                          </div>
                        </div>
                        <div className="h-9 w-9 rounded-full border-2 border-indigo-200 flex items-center justify-center bg-indigo-50/50">
                          <span className="text-[11px] font-bold font-mono-code text-indigo-700">
                            {partComp.pct}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      {part.description}
                    </p>
                  </div>

                  {/* Units Grid under this Part */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {partUnits.map((unit) => {
                      const unitComp = computeKoreanCompletion(checked, unit.checkableIds);
                      const unitCleanTitle = unit.title.replace(/^Unit \d+ — /, '');

                      return (
                        <Link
                          key={unit.id}
                          to={`/korean/level/level-1#${unit.id}`}
                          className="group flex flex-col justify-between rounded-xl border border-slate-200/90 bg-slate-50/40 p-4 transition hover:border-indigo-400 hover:bg-white hover:shadow-md cursor-pointer"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="font-mono-code text-xs font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition">
                                {unit.title.split(' — ')[0] || `Unit ${unit.code}`}
                              </span>
                              <span className="font-mono-code text-xs text-slate-500 font-semibold">
                                {unitComp.pct}%
                              </span>
                            </div>

                            <h4 className="mt-2.5 font-display text-base font-bold text-slate-900 group-hover:text-indigo-600 transition line-clamp-1">
                              {unitCleanTitle}
                            </h4>

                            {unit.objective && (
                              <p className="mt-1.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                                {unit.objective}
                              </p>
                            )}

                            {/* Lessons List Preview inside Unit card */}
                            <div className="mt-3 space-y-1 border-t border-slate-200/60 pt-2.5">
                              {unit.modules.map((mod) => (
                                <div key={mod.id} className="flex items-center gap-1.5 text-[11px] text-slate-600 truncate">
                                  <span className="font-mono-code font-bold text-indigo-600">{mod.code}</span>
                                  <span className="truncate">{mod.title.replace(/^[\d.]+\s*—\s*/, '')}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-4 border-t border-slate-200/60 pt-3">
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200/70">
                              <div
                                className="h-full bg-indigo-600 transition-all duration-300"
                                style={{ width: `${unitComp.pct}%` }}
                              />
                            </div>
                            <div className="mt-2 flex items-center justify-between text-[11px] font-mono-code text-slate-500">
                              <span>{unit.modules.length} Lessons · 5 Steps Each</span>
                              <span>{unitComp.done}/{unit.checkableIds.length}</span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Part Milestone Checkpoint Footer Callout */}
                  {part.checkpointCode && (
                    <div className="mt-6 rounded-xl border border-amber-200/90 bg-amber-50/50 p-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-slate-950 font-bold text-xs shadow-xs">
                          {part.checkpointCode}
                        </span>
                        <div>
                          <span className="text-xs font-bold text-amber-950">
                            {part.checkpointTitle}
                          </span>
                          <p className="text-[11px] text-amber-800">
                            Spoken simulation and written draft verifying conversational competence for this part.
                          </p>
                        </div>
                      </div>
                      <Link
                        to="/korean/level/level-1"
                        className="text-xs font-bold text-amber-900 hover:text-amber-950 flex items-center gap-1 underline underline-offset-2"
                      >
                        Inspect Gate in Level 1 <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};
