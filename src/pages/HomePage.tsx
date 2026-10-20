import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  Compass,
  Layers,
  PackageCheck,
  Terminal,
  Cpu,
  Brain,
  FlaskConical,
  Sparkles,
  Server,
  Briefcase,
  CheckCircle2,
  Flag,
} from 'lucide-react';
import { RoadmapData } from '../types/roadmap';
import { useProgressStore, computeCompletion } from '../store/useProgressStore';
import { MinimapDots } from '../components/MinimapDots';
import { SegmentedMeter } from '../components/SegmentedMeter';
import { RichText } from '../components/RichText';
import {
  getLevelWeights,
  ROLE_PRIORITY_PATHS,
  SCORE_INTERPRETATION_NOTE,
} from '../data/levelWeights';

interface HomePageProps {
  data: RoadmapData;
}

const PHASE_ICONS: Record<string, React.ReactNode> = {
  foundations: <Terminal className="h-4 w-4" />,
  'core-ml': <Layers className="h-4 w-4" />,
  'deep-learning': <Brain className="h-4 w-4" />,
  'advanced-ml': <FlaskConical className="h-4 w-4" />,
  specialization: <Sparkles className="h-4 w-4" />,
  engineering: <Server className="h-4 w-4" />,
  career: <Briefcase className="h-4 w-4" />,
};

export const HomePage: React.FC<HomePageProps> = ({ data }) => {
  const checked = useProgressStore((s) => s.checked);
  const selectedRole = useProgressStore((s) => s.selectedRole);
  const setSelectedRole = useProgressStore((s) => s.setSelectedRole);

  const allCheckableIds = React.useMemo(
    () => data.phases.flatMap((p) => p.checkableIds),
    [data.phases]
  );
  const globalStats = computeCompletion(checked, allCheckableIds);

  return (
    <main id="main">
      {/* ───────────────── HERO SECTION ───────────────── */}
      <section className="border-b border-slate-200/80 bg-gradient-to-b from-white via-white to-slate-50/60 py-12 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <p className="eyebrow">ML Engineer &amp; Applied Scientist Roadmap</p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-slate-900 leading-[1.08]">
                Nineteen levels from{' '}
                <span className="grad-text">writing software</span> to shipping research &amp; ML systems.
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                Master ML engineering and applied science step by step with an interactive{' '}
                <strong className="font-semibold text-slate-900">Checklist UI</strong>. Every level builds on the ones before it, with mathematical derivations, completion gates, interview banks, and 26 hands-on capstones.
              </p>

              {/* Global Interactive Checklist Progress Summary Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs max-w-xl">
                <div className="flex items-center justify-between text-xs font-mono-code text-slate-500 mb-2">
                  <span className="uppercase tracking-wider font-semibold text-slate-700 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#6c5ce7]" />
                    Your Overall Checklist Progress
                  </span>
                  <span className="font-bold text-slate-900">
                    {globalStats.done} / {globalStats.total} items ({globalStats.pct}%)
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#6c5ce7] via-sky-500 to-emerald-500 transition-all duration-300"
                    style={{ width: `${globalStats.pct}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <a
                  href="#map"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#6c5ce7] px-7 py-4 text-[16px] font-semibold text-white shadow-md shadow-[#6c5ce7]/20 hover:bg-[#5a4ad1] transition-all"
                >
                  <span>See the Roadmap</span>
                  <ArrowDown className="h-4 w-4" />
                </a>
                <Link
                  to="/level/level-0"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 text-[16px] font-semibold text-slate-800 hover:border-[#6c5ce7] hover:text-[#6c5ce7] transition-all"
                >
                  <span>Start at Level 0</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Visual: "The path at a glance" matching CampusX .hp */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
                  <span className="font-mono-code text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                    The path at a glance
                  </span>
                  <span className="font-mono-code text-xs font-medium text-slate-500">
                    7 phases · {data.meta.totalLevels} levels · {data.meta.totalCheckables} checks
                  </span>
                </div>

                <ol className="space-y-2.5 list-none m-0 p-0">
                  {data.phases.map((phase) => {
                    const phaseComp = computeCompletion(checked, phase.checkableIds);
                    return (
                      <li
                        key={phase.slug}
                        data-phase={phase.slug}
                        className="flex items-center gap-3 rounded-xl border border-[var(--phase-br)]/70 bg-[var(--phase-bg)]/55 px-3.5 py-2.5 transition-all hover:border-[var(--phase-ac)]"
                      >
                        <span className="flex h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--phase-ac)]" />
                        <div className="flex flex-1 items-center justify-between gap-2 min-w-0">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-[var(--phase-ac)] shrink-0">
                              {PHASE_ICONS[phase.slug]}
                            </span>
                            <span className="font-display text-sm font-bold text-slate-900 truncate">
                              {phase.name}
                            </span>
                            {phaseComp.done > 0 && (
                              <span className="font-mono-code text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white/80 text-[var(--phase-ac)]">
                                {phaseComp.pct}%
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            {phase.levels.map((lvl) => {
                              const lvlComp = computeCompletion(checked, lvl.checkableIds);
                              const isDone = lvlComp.total > 0 && lvlComp.done === lvlComp.total;
                              return (
                                <Link
                                  key={lvl.id}
                                  to={`/level/${lvl.id}`}
                                  title={`Level ${lvl.badge}: ${lvl.title} (${lvlComp.pct}% done)`}
                                  className={`font-mono-code text-xs font-semibold h-6 min-w-[24px] px-1.5 rounded-md grid place-items-center border transition-all ${
                                    isDone
                                      ? 'bg-[var(--phase-ac)] border-[var(--phase-ac)] text-white'
                                      : 'bg-white border-[var(--phase-br)] text-[var(--phase-ac)] hover:bg-[var(--phase-ac)] hover:text-white'
                                  }`}
                                >
                                  {lvl.badge}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>

                <p className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-mono-code text-slate-500">
                  <ArrowDown className="h-3.5 w-3.5 text-[#6c5ce7]" />
                  <span>Go through the phases in order · Check off every topic</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── HOW TO USE IT (THREE SIMPLE RULES) ───────────────── */}
      <section id="how" className="py-14 sm:py-16 border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <header className="space-y-2 mb-8">
            <p className="eyebrow">How to use it</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Three simple rules.
            </h2>
          </header>

          <ol className="grid grid-cols-1 gap-6 md:grid-cols-3 list-none m-0 p-0">
            <li className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6c5ce7]/10 text-[#6c5ce7]">
                  <Compass className="h-5 w-5" />
                </span>
                <span className="font-mono-code text-xs font-bold text-slate-400">01</span>
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Start where you are
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Each level lists its prerequisites and completion gates. If you already know a module, prove it by passing its gate and checking off its items.
              </p>
            </li>

            <li className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
                  <Layers className="h-5 w-5" />
                </span>
                <span className="font-mono-code text-xs font-bold text-slate-400">02</span>
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Check off as you build &amp; derive
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                You are allowed to move on when you can <em>build it</em> and <em>explain it</em>, not when you have watched it. Every module ends with a completion gate.
              </p>
            </li>

            <li className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
                  <PackageCheck className="h-5 w-5" />
                </span>
                <span className="font-mono-code text-xs font-bold text-slate-400">03</span>
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                Finish with measured artefacts
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                A level is done when you have built its capstone project, passed the acceptance criteria, and can answer the interview bank without notes.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* ───────────────── THE ROADMAP MAP SECTION ───────────────── */}
      <section id="map" className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
          <header className="space-y-2.5">
            <p className="eyebrow">The roadmap</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
              All {data.meta.totalLevels} levels across 7 phases, in order.
            </h2>
            <p className="text-base text-slate-600 max-w-2xl">
              Each color represents a phase. Click any level to open its interactive study checklists, formulas, practice tasks, capstone project, and interview bank.
            </p>
          </header>

          {/* Minimap Legend Card matching CampusX .map__legend */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono-code text-xs font-semibold uppercase tracking-widest text-slate-500">
                The whole path
              </span>
              <span className="font-mono-code text-xs text-slate-500">
                {data.meta.totalLevels} levels · {data.meta.totalModules} modules · {data.meta.totalCheckables} checklist items
              </span>
            </div>

            <MinimapDots levels={data.levels} variant="strip" />

            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 list-none m-0 p-0">
              {data.phases.map((phase) => (
                <li
                  key={phase.slug}
                  data-phase={phase.slug}
                  className="flex items-center gap-2 text-xs"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--phase-ac)]" />
                  <span className="font-semibold text-slate-800">{phase.name}</span>
                  <span className="font-mono-code text-slate-400">{phase.rangeLabel}</span>
                </li>
              ))}
            </ul>

            {/* Role-Specific Priority Paths & Score Interpretation */}
            <details open className="group pt-3 border-t border-slate-100">
              <summary className="flex flex-wrap items-center justify-between gap-2 cursor-pointer list-none text-xs font-mono-code text-slate-600 hover:text-[#6c5ce7]">
                <span className="font-semibold">
                  Target Role Track: <strong className="text-[#6c5ce7]">{selectedRole}</strong> · Click a role below to adjust priority weights &amp; core levels
                </span>
                <span className="text-[11px] text-[#6c5ce7] font-semibold group-open:underline">
                  Toggle role selector ↓
                </span>
              </summary>
              <div className="mt-3 space-y-3 pt-2">
                <p className="text-xs text-slate-500 italic leading-relaxed">
                  {SCORE_INTERPRETATION_NOTE}
                </p>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
                  {ROLE_PRIORITY_PATHS.map((rp) => {
                    const isActive = selectedRole === rp.role;
                    return (
                      <button
                        key={rp.role}
                        type="button"
                        onClick={() => setSelectedRole(rp.role)}
                        className={`text-left rounded-xl border p-3 space-y-1 transition-all cursor-pointer ${
                          isActive
                            ? 'border-[#6c5ce7] bg-[#6c5ce7]/5 ring-2 ring-[#6c5ce7]/20 shadow-2xs'
                            : 'border-slate-200/80 bg-slate-50/70 hover:border-slate-300 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-display text-xs font-bold text-slate-900">
                            {rp.role}
                          </span>
                          {isActive && (
                            <span className="rounded-full bg-[#6c5ce7] px-1.5 py-0.5 font-mono-code text-[9px] font-bold uppercase text-white">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="font-mono-code text-[10px] font-semibold text-[#6c5ce7]">
                          Core: {rp.keyLevels}
                        </div>
                        <p className="text-[11px] text-slate-600 leading-snug">
                          {rp.focus}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </details>
          </div>

          {/* Phase Bands matching CampusX .map__bands / .band */}
          <div className="space-y-12">
            {data.phases.map((phase) => {
              const phaseStats = computeCompletion(checked, phase.checkableIds);
              return (
                <section
                  key={phase.slug}
                  data-phase={phase.slug}
                  aria-labelledby={`phase-${phase.slug}`}
                  className="grid grid-cols-1 gap-6 lg:grid-cols-12 rounded-3xl border border-[var(--phase-br)]/80 bg-[var(--phase-bg)]/35 p-5 sm:p-7"
                >
                  {/* Sticky Left Phase Gutter */}
                  <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-24 space-y-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--phase-br)] bg-white px-3 py-1 font-mono-code text-xs font-semibold text-[var(--phase-ac)] shadow-2xs">
                        {PHASE_ICONS[phase.slug]}
                        <span>Phase {phase.phaseNum}</span>
                      </span>

                      <h3
                        id={`phase-${phase.slug}`}
                        className="font-display text-2xl font-bold text-slate-900"
                      >
                        {phase.name}
                      </h3>

                      <p className="font-mono-code text-xs font-semibold uppercase tracking-wider text-[var(--phase-ac)]">
                        Levels {phase.rangeLabel} · {phase.dashboard['suggested duration'] || '12–16 weeks'}
                      </p>

                      <p className="text-sm text-slate-600 leading-relaxed">
                        {phase.themeLabel}
                      </p>

                      {phase.goal && (
                        <p className="text-xs text-slate-500 leading-relaxed border-l-2 border-[var(--phase-br)] pl-3">
                          <RichText text={phase.goal} />
                        </p>
                      )}

                      {/* Phase Checklist Progress */}
                      <div className="pt-2 space-y-1.5">
                        <div className="flex items-center justify-between font-mono-code text-xs text-slate-600">
                          <span>Phase Checklist</span>
                          <span className="font-semibold text-[var(--phase-ac)]">
                            {phaseStats.done} / {phaseStats.total} ({phaseStats.pct}%)
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-white/80 border border-[var(--phase-br)] overflow-hidden">
                          <div
                            className="h-full bg-[var(--phase-ac)] transition-all duration-300"
                            style={{ width: `${phaseStats.pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Level Nodes */}
                  <div className="lg:col-span-8 space-y-4">
                    <ol className="space-y-4 list-none m-0 p-0">
                      {phase.levels.map((lvl) => {
                        const lvlComp = computeCompletion(checked, lvl.checkableIds);
                        const ratio = lvlComp.total > 0 ? lvlComp.done / lvlComp.total : 0;
                        const lvlWeights = getLevelWeights(lvl.badge, selectedRole);

                        return (
                          <li key={lvl.id} className="relative">
                            <Link
                              to={`/level/${lvl.id}`}
                              className="group flex items-stretch gap-3 sm:gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-2xs transition-all duration-150 hover:border-[var(--phase-ac)] hover:shadow-md"
                            >
                              {/* Level Pin Badge */}
                              <div className="flex flex-col items-center shrink-0">
                                <span
                                  className={`grid h-11 w-11 place-items-center rounded-xl border font-mono-code text-base font-bold transition-colors ${
                                    lvlComp.pct === 100
                                      ? 'bg-[var(--phase-ac)] border-[var(--phase-ac)] text-white'
                                      : 'bg-[var(--phase-bg)] border-[var(--phase-br)] text-[var(--phase-ac)] group-hover:bg-[var(--phase-ac)] group-hover:text-white'
                                  }`}
                                >
                                  {lvl.badge}
                                </span>
                                <span className="mt-2 w-0.5 flex-1 rounded-full bg-[var(--phase-br)]/60" />
                              </div>

                              {/* Level Card Body */}
                              <div className="flex flex-1 flex-col justify-between min-w-0 space-y-3">
                                <div className="space-y-1">
                                  <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="font-mono-code text-[11px] font-semibold uppercase tracking-widest text-[var(--phase-ac)]">
                                        {lvl.badge === 'B' ? 'Prerequisite Bridge' : `Level ${lvl.badge}`}
                                        {lvl.duration ? ` · ${lvl.duration}` : ''}
                                      </span>
                                      {lvlWeights.isCoreForRole && (
                                        <span className="rounded-md border border-[#6c5ce7]/30 bg-[#6c5ce7]/10 px-1.5 py-0.5 font-mono-code text-[10px] font-bold text-[#6c5ce7]">
                                          Core · {selectedRole}
                                        </span>
                                      )}
                                      {lvlWeights.roleNote && (
                                        <span className="rounded-md border border-amber-200 bg-amber-50 px-1.5 py-0.5 font-mono-code text-[10px] font-semibold text-amber-800">
                                          Role-Dependent Depth
                                        </span>
                                      )}
                                    </div>
                                    <span className="font-mono-code text-xs font-semibold text-slate-600">
                                      {lvlComp.done}/{lvlComp.total} checked ({lvlComp.pct}%)
                                    </span>
                                  </div>

                                  <h4 className="font-display text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[var(--phase-ac)] transition-colors">
                                    {lvl.title}
                                  </h4>

                                  <p className="text-sm text-slate-600 leading-relaxed">
                                    <RichText text={lvl.goal} />
                                  </p>
                                </div>

                                {lvl.mainProject && (
                                  <div className="inline-flex items-start gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 border border-slate-200/70 rounded-lg px-2.5 py-1.5 w-fit max-w-full">
                                    <Flag className="h-3.5 w-3.5 text-[var(--phase-ac)] shrink-0 mt-0.5" />
                                    <span className="leading-snug">
                                      Capstone: <RichText text={lvl.mainProject} />
                                    </span>
                                  </div>
                                )}

                                {/* Card Footer with SegmentedMeter & Calibrated Weights */}
                                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                                  <div className="flex items-center gap-3 flex-1 min-w-[140px]">
                                    <SegmentedMeter
                                      totalSegments={20}
                                      activeSegments={Math.min(20, Math.max(4, lvl.totalModules))}
                                      completedRatio={ratio}
                                    />
                                  </div>

                                  <div className="flex flex-wrap items-center gap-2 font-mono-code text-xs text-slate-500">
                                    <span
                                      title="Estimated Interview Weight (Generalist ML/AI Path)"
                                      className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700"
                                    >
                                      Interview {lvlWeights.interviewScore}/10
                                    </span>
                                    <span
                                      title="Estimated On-The-Job Weight (Generalist ML/AI Path)"
                                      className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700"
                                    >
                                      Job {lvlWeights.jobScore}/10
                                    </span>
                                    <span>·</span>
                                    <span>{lvl.totalSections} sections</span>
                                    <span>·</span>
                                    <span>{lvl.totalModules} modules</span>
                                    <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-[var(--phase-ac)]" />
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ol>

                    {/* Phase Integration Capstone Banner */}
                    {phase.capstone && (
                      <Link
                        to={`/projects#${phase.capstone.id}`}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-dashed border-[var(--phase-ac)]/60 bg-white/90 px-5 py-3.5 text-sm hover:bg-white transition-all group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--phase-bg)] text-[var(--phase-ac)]">
                            <Cpu className="h-4 w-4" />
                          </span>
                          <div className="min-w-0">
                            <span className="font-mono-code text-[10px] font-bold uppercase tracking-wider text-[var(--phase-ac)] block">
                              Phase {phase.phaseNum} Integration Project
                            </span>
                            <span className="font-display font-bold text-slate-900 truncate block">
                              {phase.capstone.title}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-[var(--phase-ac)] shrink-0 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};
