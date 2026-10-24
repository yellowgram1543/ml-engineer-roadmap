import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  Compass,
  Layers,
  Sparkles,
  BookOpen,
  Volume2,
  FileText,
  Award,
  Globe2,
  MessageSquare,
  Languages,
  CheckCircle2,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import { RoadmapData } from '../types/roadmap';
import { useKoreanProgressStore, computeKoreanCompletion } from '../store/useKoreanProgressStore';
import { MinimapDots } from '../components/MinimapDots';
import { SegmentedMeter } from '../components/SegmentedMeter';
import { RichText } from '../components/RichText';

interface KoreanHomePageProps {
  data: RoadmapData;
}

const PHASE_ICONS: Record<number, React.ReactNode> = {
  1: <Volume2 className="h-4 w-4" />,
  2: <MessageSquare className="h-4 w-4" />,
  3: <Layers className="h-4 w-4" />,
  5: <Briefcase className="h-4 w-4" />,
  6: <Award className="h-4 w-4" />,
  7: <GraduationCap className="h-4 w-4" />,
};

const KOREAN_TRACKS: Record<
  string,
  { label: string; description: string; targetLevels: string[]; icon: React.ReactNode }
> = {
  'Comprehensive Mastery': {
    label: 'All-Round Mastery',
    description: 'Complete 16-level immersion from first Hangeul stroke to lifelong native maintenance.',
    targetLevels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '13', '14', '15', '16', '17', '18'],
    icon: <Languages className="h-4 w-4 text-indigo-600" />,
  },
  'Survival & Everyday Life': {
    label: 'Everyday Fluency',
    description: 'Master Hangeul, sound rules, survival conversations, housing, banking, and clinics.',
    targetLevels: ['0', '1', '2', '3', '4', '5', '6'],
    icon: <MessageSquare className="h-4 w-4 text-emerald-600" />,
  },
  'Professional & Workplace': {
    label: 'Business Korean',
    description: 'Formal speech registers, corporate documentation, meetings, client negotiation, and job interviews.',
    targetLevels: ['0', '1', '2', '3', '7', '8', '9', '13'],
    icon: <Briefcase className="h-4 w-4 text-blue-600" />,
  },
  'TOPIK II & Certification': {
    label: 'TOPIK II (Level 5–6)',
    description: 'High-level discourse connectors, grammar synthesis, timed 54-essay writing, and mock exams.',
    targetLevels: ['7', '8', '9', '13', '14', '15'],
    icon: <Award className="h-4 w-4 text-rose-600" />,
  },
  'Literature & Translation': {
    label: 'Literary & Interpretation',
    description: 'Novels, academic abstracts, editorials, literary critique, and consecutive interpreting.',
    targetLevels: ['13', '14', '15', '16', '17', '18'],
    icon: <BookOpen className="h-4 w-4 text-amber-600" />,
  },
};

export const KoreanHomePage: React.FC<KoreanHomePageProps> = ({ data }) => {
  const checked = useKoreanProgressStore((s) => s.checked);
  const selectedFocus = useKoreanProgressStore((s) => s.selectedFocus);
  const setSelectedFocus = useKoreanProgressStore((s) => s.setSelectedFocus);

  const allCheckableIds = React.useMemo(
    () => data.phases.flatMap((p) => p.checkableIds),
    [data.phases]
  );
  const globalStats = computeKoreanCompletion(checked, allCheckableIds);

  const activeTrack = KOREAN_TRACKS[selectedFocus] || KOREAN_TRACKS['Comprehensive Mastery'];

  const targetLevelsSet = React.useMemo(
    () => new Set(activeTrack.targetLevels),
    [activeTrack]
  );

  return (
    <main id="main">
      {/* ───────────────── HERO SECTION ───────────────── */}
      <section className="border-b border-slate-200/80 bg-gradient-to-b from-indigo-50/40 via-white to-slate-50/60 py-12 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Column — Title & Subtitle */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-3 py-1 text-xs font-semibold text-indigo-700 mb-4 shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                <span>한국어 마스터 로드맵 · Korean Language Track</span>
              </div>

              <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.12]">
                Korean Language <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-rose-600 to-amber-600">
                  Mastery Roadmap
                </span>
              </h1>

              <p className="mt-4 text-base text-slate-600 sm:text-lg leading-relaxed max-w-2xl">
                A rigorous, production-first Korean curriculum spanning 16 levels across 6 phases.
                From phonetics and Hangeul featural design to corporate negotiation, TOPIK II Level 6 certification, and native-adjacent fluency.
              </p>

              {/* Stats Bar */}
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono-code text-slate-600">
                <div className="rounded-lg bg-white px-3 py-2 border border-slate-200 shadow-xs flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">6</span>
                  <span>Phases</span>
                </div>
                <div className="rounded-lg bg-white px-3 py-2 border border-slate-200 shadow-xs flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{data.meta.totalLevels}</span>
                  <span>Levels</span>
                </div>
                <div className="rounded-lg bg-white px-3 py-2 border border-slate-200 shadow-xs flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{data.meta.totalModules}</span>
                  <span>Modules</span>
                </div>
                <div className="rounded-lg bg-white px-3 py-2 border border-slate-200 shadow-xs flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{data.meta.totalProjects}</span>
                  <span>Capstones</span>
                </div>
                <div className="rounded-lg bg-white px-3 py-2 border border-slate-200 shadow-xs flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{data.meta.totalQuestions}</span>
                  <span>Questions</span>
                </div>
              </div>

              {/* CTA Row */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/korean/level/level-0"
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
                >
                  Start Level 0 (Hangeul)
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/korean/projects"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <Award className="h-4 w-4 text-amber-600" />
                  View All 18 Capstones
                </Link>
                <Link
                  to="/korean/questions"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <MessageSquare className="h-4 w-4 text-indigo-600" />
                  Question Banks ({data.meta.totalQuestions})
                </Link>
              </div>
            </div>

            {/* Right Column — Global Progress Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs font-bold tracking-wider text-slate-500 uppercase">
                    Overall Curriculum Progress
                  </span>
                  <span className="font-mono-code text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {globalStats.pct}% Complete
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex items-baseline justify-between font-mono-code">
                    <span className="text-3xl font-extrabold text-slate-900">{globalStats.pct}%</span>
                    <span className="text-xs text-slate-500">
                      {globalStats.done} / {globalStats.total} checkable gates
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 via-rose-500 to-amber-500 transition-all duration-300"
                      style={{ width: `${globalStats.pct}%` }}
                    />
                  </div>
                </div>

                {/* Focus Track Selector */}
                <div className="mt-6 border-t border-slate-100 pt-5">
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Learning Focus / Target Track:
                  </label>
                  <div className="grid grid-cols-1 gap-1.5">
                    {Object.entries(KOREAN_TRACKS).map(([key, t]) => {
                      const active = selectedFocus === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setSelectedFocus(key)}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition cursor-pointer border ${
                            active
                              ? 'bg-indigo-50/70 border-indigo-200 text-indigo-900 font-semibold'
                              : 'bg-white border-slate-200/80 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {t.icon}
                            <span>{t.label}</span>
                          </div>
                          {active && <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">
                    {activeTrack.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── PHASES & LEVELS GRID ───────────────── */}
      <section className="py-12 sm:py-16 bg-slate-50/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">
                Curriculum Progression
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                6 structured phases designed to transition from reading syllables to living in Korean.
              </p>
            </div>
            <a
              href="#phase-1"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              Scroll to Phase 1 <ArrowDown className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="space-y-12">
            {data.phases.map((phase) => {
              const phaseComp = computeKoreanCompletion(checked, phase.checkableIds);

              return (
                <div
                  key={phase.phaseNum}
                  id={`phase-${phase.phaseNum}`}
                  className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs scroll-mt-20"
                >
                  {/* Phase Header */}
                  <div className="border-b border-slate-100 pb-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-xs">
                          {PHASE_ICONS[phase.phaseNum] || <Layers className="h-5 w-5" />}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono-code text-xs font-bold uppercase tracking-wider text-indigo-600">
                              Phase {phase.phaseNum}
                            </span>
                            <span className="text-slate-300">·</span>
                            <span className="font-mono-code text-xs text-slate-500">
                              Levels {phase.rangeLabel}
                            </span>
                          </div>
                          <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                            {phase.name}
                          </h3>
                        </div>
                      </div>

                      {/* Phase completion badge */}
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-xs font-mono-code font-bold text-slate-900">
                            {phaseComp.pct}% complete
                          </div>
                          <div className="text-[11px] font-mono-code text-slate-500">
                            {phaseComp.done} / {phaseComp.total} items
                          </div>
                        </div>
                        <div className="h-8 w-8 rounded-full border-2 border-indigo-200 flex items-center justify-center bg-indigo-50/50">
                          <span className="text-[11px] font-bold font-mono-code text-indigo-700">
                            {phaseComp.pct}
                          </span>
                        </div>
                      </div>
                    </div>

                    {phase.goal && (
                      <p className="mt-3 text-sm text-slate-600 leading-relaxed italic">
                        "{phase.goal}"
                      </p>
                    )}

                    {phase.rule && (
                      <div className="mt-3 rounded-lg bg-amber-50/80 border border-amber-200/80 px-3 py-2 text-xs text-amber-900 flex items-start gap-2">
                        <span className="font-bold uppercase tracking-wider text-amber-700 shrink-0">
                          Phase Rule:
                        </span>
                        <span>{phase.rule}</span>
                      </div>
                    )}
                  </div>

                  {/* Level Cards inside Phase */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {phase.levels.map((lvl) => {
                      const lvlComp = computeKoreanCompletion(checked, lvl.checkableIds);
                      const isHighlighted = targetLevelsSet.has(lvl.badge);

                      return (
                        <Link
                          key={lvl.id}
                          to={`/korean/level/${lvl.id}`}
                          className={`group flex flex-col justify-between rounded-xl border p-4 transition ${
                            isHighlighted
                              ? 'border-indigo-200 bg-white hover:border-indigo-400 hover:shadow-md'
                              : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="font-mono-code text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 group-hover:bg-indigo-600 group-hover:text-white transition">
                                Level {lvl.badge}
                              </span>
                              <span className="font-mono-code text-xs text-slate-500">
                                {lvlComp.pct}%
                              </span>
                            </div>

                            <h4 className="mt-2.5 font-display text-base font-bold text-slate-900 group-hover:text-indigo-600 transition">
                              {lvl.title}
                            </h4>

                            <p className="mt-1.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                              {lvl.goal || 'Master core grammar patterns and production gates.'}
                            </p>
                          </div>

                          <div className="mt-4 border-t border-slate-100 pt-3">
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full bg-indigo-600 transition-all"
                                style={{ width: `${lvlComp.pct}%` }}
                              />
                            </div>
                            <div className="mt-2 flex items-center justify-between text-[11px] font-mono-code text-slate-500">
                              <span>{lvl.totalSections} sections · {lvl.totalModules} modules</span>
                              <span>{lvlComp.done}/{lvl.checkableCount}</span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Phase Capstone footer callout */}
                  {phase.capstone && (
                    <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <Award className="h-4 w-4 text-indigo-600" />
                        <div>
                          <span className="text-xs font-bold text-indigo-900">
                            Phase Milestone: {phase.capstone.title}
                          </span>
                          <p className="text-[11px] text-indigo-700/80">
                            Integrative production deliverable verifying readiness for the next phase.
                          </p>
                        </div>
                      </div>
                      <Link
                        to="/korean/projects"
                        className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1"
                      >
                        Inspect Capstone <ArrowRight className="h-3 w-3" />
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
