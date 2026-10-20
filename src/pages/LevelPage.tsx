import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Flag,
  Check,
  CheckCheck,
  RotateCcw,
  Search,
  Map,
  Briefcase,
  Wrench,
  Clock,
  Layers,
  Award,
  HelpCircle,
  ClipboardCheck,
  Sparkles,
} from 'lucide-react';
import { RoadmapData } from '../types/roadmap';
import { useProgressStore, computeCompletion } from '../store/useProgressStore';
import { MinimapDots } from '../components/MinimapDots';
import { SegmentedMeter } from '../components/SegmentedMeter';
import { ContentElementsView } from '../components/ContentElementsView';
import { RichText } from '../components/RichText';
import { MermaidDiagram } from '../components/MermaidDiagram';
import { getLevelWeights, SCORE_INTERPRETATION_NOTE, ROLE_PRIORITY_PATHS } from '../data/levelWeights';
import { PROJECT_MERMAID_CHARTS } from '../data/projectMermaidCharts';

interface LevelPageProps {
  data: RoadmapData;
}

const QUESTION_TYPE_STYLES: Record<string, string> = {
  Concept: 'bg-sky-50 text-sky-700 border-sky-200',
  Scenario: 'bg-amber-50 text-amber-800 border-amber-200',
  Debugging: 'bg-rose-50 text-rose-700 border-rose-200',
  Design: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Coding: 'bg-purple-50 text-purple-700 border-purple-200',
};

export const LevelPage: React.FC<LevelPageProps> = ({ data }) => {
  const { levelId } = useParams<{ levelId: string }>();

  const levelIndex = data.levels.findIndex(
    (l) => l.id === levelId || l.badge.toLowerCase() === levelId?.toLowerCase()
  );
  const level = levelIndex >= 0 ? data.levels[levelIndex] : null;

  const checked = useProgressStore((s) => s.checked);
  const toggleItem = useProgressStore((s) => s.toggleItem);
  const setBatch = useProgressStore((s) => s.setBatch);
  const selectedRole = useProgressStore((s) => s.selectedRole);
  const setSelectedRole = useProgressStore((s) => s.setSelectedRole);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  // Manage open state of modules for Expand All / Collapse All
  const [expandAll, setExpandAll] = React.useState<boolean>(false);

  React.useEffect(() => {
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [levelId]);

  if (!level) {
    return <Navigate to="/" replace />;
  }

  const prevLevel = levelIndex > 0 ? data.levels[levelIndex - 1] : null;
  const nextLevel =
    levelIndex < data.levels.length - 1 ? data.levels[levelIndex + 1] : null;

  const levelComp = computeCompletion(checked, level.checkableIds);
  const phase = data.phases.find((p) => p.slug === level.phaseSlug);
  const phaseComp = phase
    ? computeCompletion(checked, phase.checkableIds)
    : { done: 0, total: 0, pct: 0 };

  const allRoadmapIds = React.useMemo(
    () => data.phases.flatMap((p) => p.checkableIds),
    [data.phases]
  );
  const overallComp = computeCompletion(checked, allRoadmapIds);

  const weights = getLevelWeights(level.badge, selectedRole);

  const rawTools =
    level.dashboard['core tools'] ||
    level.dashboard['main libraries'] ||
    level.dashboard['main frameworks'] ||
    'Python, Git, pytest';
  const toolTags = rawTools
    .split(/[,·]/)
    .map((t) => t.replace(/`/g, '').trim())
    .filter(Boolean);

  return (
    <div data-phase={level.phaseSlug}>
      {/* ───────────────── STICKY SECONDARY MINIMAP BAR (.slnav) ───────────────── */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
          <Link
            to="/#map"
            title="Back to the map"
            className="flex items-center gap-2 text-slate-600 hover:text-[var(--phase-ac)] transition-colors min-w-0 max-w-[280px] shrink-0"
          >
            <ChevronLeft className="h-4 w-4 shrink-0" />
            <span className="rounded-md border border-[var(--phase-br)] bg-[var(--phase-bg)] px-2 py-0.5 font-mono-code text-[11px] font-bold text-[var(--phase-ac)]">
              {level.badge === 'B' ? 'Bridge' : `L${level.badge}`}
            </span>
            <span className="font-display text-sm font-bold text-slate-900 truncate">
              {level.title}
            </span>
          </Link>

          <div className="hidden md:block flex-1 min-w-0">
            <MinimapDots
              levels={data.levels}
              currentLevelId={level.id}
              variant="nav"
            />
          </div>
        </div>
      </div>

      <main id="main" className="pb-16">
        <article>
          {/* ───────────────── LEVEL HEADER (.lh) ───────────────── */}
          <header className="border-b border-slate-200 bg-gradient-to-b from-[var(--phase-bg)]/50 via-white to-white py-10 sm:py-14">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-7">
              {/* Breadcrumbs + Target Role Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 font-mono-code text-xs text-slate-500">
                  <Link to="/#map" className="hover:text-[var(--phase-ac)] transition-colors">
                    Roadmap
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                  <span className="font-semibold text-[var(--phase-ac)]">
                    Phase {level.phaseNum} · {level.phaseName}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {weights.isCoreForRole ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--phase-br)] bg-[var(--phase-bg)] px-3 py-1 font-mono-code text-[11px] font-bold text-[var(--phase-ac)]">
                      Core · {selectedRole}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 font-mono-code text-[11px] font-medium text-slate-600">
                      Optional · {selectedRole}
                    </span>
                  )}
                  {weights.roleNote && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 font-mono-code text-[11px] font-semibold text-amber-800">
                      {weights.roleNote}
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Target Role Selector Pill Strip */}
              <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white/80 px-3 py-2">
                <span className="font-mono-code text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                  Target Role:
                </span>
                {ROLE_PRIORITY_PATHS.map((r) => {
                  const active = selectedRole === r.role;
                  return (
                    <button
                      key={r.role}
                      type="button"
                      onClick={() => setSelectedRole(r.role)}
                      className={`rounded-lg px-2.5 py-1 font-mono-code text-[11px] font-semibold transition-all cursor-pointer ${
                        active
                          ? 'bg-[var(--phase-ac)] text-white shadow-2xs'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {r.role}
                    </button>
                  );
                })}
              </div>

              {/* Big Level Number + Title */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <span
                  aria-hidden="true"
                  className="grid h-16 w-16 sm:h-20 sm:w-20 shrink-0 place-items-center rounded-2xl border-2 border-[var(--phase-br)] bg-[var(--phase-bg)] font-mono-code text-3xl sm:text-4xl font-bold text-[var(--phase-ac)] shadow-xs"
                >
                  {level.badge}
                </span>
                <div className="space-y-1.5">
                  <p className="eyebrow">
                    Phase {level.phaseNum} · {level.phaseName}
                  </p>
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-900 leading-tight">
                    {level.title}
                  </h1>
                </div>
              </div>

              {/* Scope / Goal Description */}
              <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
                <RichText text={level.goal} />
              </p>

              {/* ───────────────── INTERVIEW WEIGHT & ON-THE-JOB WEIGHT CARDS (.lh__weights / .wc) ───────────────── */}
              <div className="space-y-2.5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Interview Weight Card */}
                  <section className="rounded-2xl border border-slate-200 border-l-4 border-l-[var(--phase-ac)] bg-white p-5 sm:p-6 shadow-2xs space-y-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[var(--phase-br)] bg-[var(--phase-bg)] text-[var(--phase-ac)]">
                          <Briefcase className="h-4 w-4" />
                        </span>
                        <span className="font-mono-code text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                          Interview Weight
                        </span>
                      </div>
                      <div className="font-display text-2xl sm:text-3xl font-bold text-[var(--phase-ac)] shrink-0">
                        {weights.interviewScore}
                        <span className="font-mono-code text-sm font-medium text-slate-400">
                          /10
                        </span>
                      </div>
                    </div>

                    <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--phase-ac)]"
                        style={{ width: `${weights.interviewScore * 10}%` }}
                      />
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      <RichText text={weights.interviewRationale} />
                    </p>
                  </section>

                  {/* On-The-Job Weight Card */}
                  <section className="rounded-2xl border border-slate-200 border-l-4 border-l-[var(--phase-ac)] bg-white p-5 sm:p-6 shadow-2xs space-y-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[var(--phase-br)] bg-[var(--phase-bg)] text-[var(--phase-ac)]">
                          <Wrench className="h-4 w-4" />
                        </span>
                        <span className="font-mono-code text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                          On-The-Job Weight
                        </span>
                      </div>
                      <div className="font-display text-2xl sm:text-3xl font-bold text-[var(--phase-ac)] shrink-0">
                        {weights.jobScore}
                        <span className="font-mono-code text-sm font-medium text-slate-400">
                          /10
                        </span>
                      </div>
                    </div>

                    <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--phase-ac)]"
                        style={{ width: `${weights.jobScore * 10}%` }}
                      />
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      <RichText text={weights.jobRationale} />
                    </p>
                  </section>
                </div>

                {/* Score Interpretation Note */}
                <p className="text-[11px] sm:text-xs text-slate-500 italic px-1 leading-relaxed">
                  {SCORE_INTERPRETATION_NOTE}
                </p>
              </div>

              {/* Two Dashboard Cards: Study Commitment & Core Stack */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 font-display text-sm font-bold text-slate-900">
                      <Clock className="h-4 w-4 shrink-0 text-[var(--phase-ac)]" />
                      Study Commitment &amp; Pace
                    </span>
                    <span className="shrink-0 whitespace-nowrap font-mono-code text-xs font-bold text-[var(--phase-ac)] bg-[var(--phase-bg)] border border-[var(--phase-br)] px-2.5 py-0.5 rounded-full">
                      {level.dashboard['suggested duration'] || '3–4 weeks'}
                    </span>
                  </div>

                  {/* Structured Pill Tags for Difficulty, Part-Time, Full-Time & Items */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--phase-br)] bg-[var(--phase-bg)]/70 px-2.5 py-1 font-mono-code text-[11px] font-bold text-[var(--phase-ac)]">
                      Difficulty · {level.dashboard['difficulty'] || 'Intermediate'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono-code text-[11px] font-semibold text-slate-700">
                      Part-Time · 15–18 hrs/wk (2.5 hrs/day)
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono-code text-[11px] font-semibold text-slate-700">
                      Full-Time · 30–35 hrs/wk (~2× faster)
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono-code text-[11px] font-medium text-slate-600">
                      {level.checkableIds.length} checklist items
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Complete every section checklist, practice task, and completion gate in order before shipping the level capstone.
                  </p>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 font-display text-sm font-bold text-slate-900">
                      <Wrench className="h-4 w-4 shrink-0 text-[var(--phase-ac)]" />
                      Core Stack &amp; Target Outcome
                    </span>
                    <span className="shrink-0 whitespace-nowrap font-mono-code text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {level.totalSections} sections · {level.totalModules} modules
                    </span>
                  </div>

                  {/* Tool Stack Pill Tags */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {toolTags.map((tool, i) => (
                      <span
                        key={i}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono-code text-[11px] font-semibold text-slate-800"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <strong className="font-semibold text-slate-900">Final outcome:</strong>{' '}
                    <RichText
                      text={
                        level.dashboard['final outcome'] ||
                        level.goal
                      }
                    />
                  </p>
                </section>
              </div>

              {/* Three Fact Strips matching CampusX .lh__facts */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-1">
                <div className="rounded-xl border border-slate-200/90 bg-white px-4 py-3 space-y-1.5">
                  <div className="flex items-center justify-between font-mono-code text-[11px] uppercase tracking-wider text-slate-500">
                    <span>Phase {level.phaseNum} Checklist</span>
                    <span className="font-bold text-slate-900">{phaseComp.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-[var(--phase-ac)] transition-all duration-300"
                      style={{ width: `${phaseComp.pct}%` }}
                    />
                  </div>
                  <p className="font-mono-code text-xs text-slate-600">
                    {phaseComp.done} of {phaseComp.total} Phase {level.phaseNum} items completed
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200/90 bg-white px-4 py-3 space-y-1.5">
                  <div className="flex items-center justify-between font-mono-code text-[11px] uppercase tracking-wider text-slate-500">
                    <span>Cumulative Roadmap Checklist</span>
                    <span className="font-bold text-slate-900">{overallComp.pct}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-[var(--phase-ac)] transition-all duration-300"
                      style={{ width: `${overallComp.pct}%` }}
                    />
                  </div>
                  <p className="font-mono-code text-xs text-slate-600">
                    {overallComp.done} of {overallComp.total} total roadmap items completed
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200/90 bg-white px-4 py-3 space-y-1">
                  <span className="font-mono-code text-[11px] uppercase tracking-wider text-slate-500 block">
                    Assumes / Prerequisites
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <RichText text={level.prerequisites} />
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* ───────────────── INTERACTIVE FILTER & ACTION TOOLBAR ───────────────── */}
          <section className="border-b border-slate-200 bg-slate-50/70 py-3.5">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 sm:px-6">
              {/* Search & Level Summary */}
              <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[260px]">
                <div className="relative flex-1 max-w-xs">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search topics in this level..."
                    className="w-full rounded-lg border border-slate-200 bg-white pl-8 pr-14 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[var(--phase-ac)] focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-1.5 py-0.5 font-mono-code text-[10px] font-semibold text-slate-500 hover:bg-slate-100 hover:text-slate-800 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <span className="font-mono-code text-xs text-slate-600 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5">
                  Level items: <strong className="text-slate-900">{levelComp.done}/{levelComp.total}</strong> ({levelComp.pct}%)
                </span>
              </div>

              {/* Quick Level Actions */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setExpandAll((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-300 cursor-pointer"
                >
                  <Layers className="h-3.5 w-3.5 text-[var(--phase-ac)]" />
                  <span>{expandAll ? 'Collapse Modules' : 'Expand All Modules'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBatch(level.checkableIds, true)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-emerald-300 hover:text-emerald-700 cursor-pointer"
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                  <span>Check All in Level</span>
                </button>

                {levelComp.done > 0 && (
                  <button
                    type="button"
                    onClick={() => setBatch(level.checkableIds, false)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 hover:border-rose-300 hover:text-rose-600 cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset Level</span>
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* ───────────────── SECTIONS & MODULES ACCORDION MAP (.lsec / .mods) ───────────────── */}
          <section className="py-10 sm:py-12" aria-labelledby="modules-h">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2
                  id="modules-h"
                  className="flex items-center gap-2.5 font-display text-xl sm:text-2xl font-bold text-slate-900"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--phase-bg)] text-[var(--phase-ac)] border border-[var(--phase-br)]">
                    <Layers className="h-4 w-4" />
                  </span>
                  <span>Sections &amp; Study Modules</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-mono-code text-xs font-semibold text-slate-600">
                    {level.totalSections} sections · {level.totalModules} modules
                  </span>
                </h2>

                <div className="flex items-center gap-3 text-xs font-mono-code">
                  {level.capstone && (
                    <a
                      href="#ship"
                      className="text-[var(--phase-ac)] hover:underline font-semibold"
                    >
                      Jump to Capstone ↓
                    </a>
                  )}
                  {level.interviewBank && (
                    <a
                      href="#interview-bank"
                      className="text-slate-600 hover:text-[var(--phase-ac)] hover:underline font-semibold"
                    >
                      Interview Bank ↓
                    </a>
                  )}
                  {level.assessment && (
                    <a
                      href="#assessment"
                      className="text-slate-600 hover:text-[var(--phase-ac)] hover:underline font-semibold"
                    >
                      Final Assessment ↓
                    </a>
                  )}
                </div>
              </div>

              {/* Render Each Numbered Section */}
              <div className="space-y-10">
                {level.sections.map((section, sIdx) => {
                  const secComp = computeCompletion(checked, section.checkableIds);
                  const allSecDone =
                    secComp.total > 0 && secComp.done === secComp.total;

                  return (
                    <div
                      key={section.id}
                      id={section.id}
                      className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-2xs space-y-5"
                    >
                      {/* Section Header */}
                      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
                        <div className="space-y-1 max-w-3xl">
                          <div className="flex items-center gap-2">
                            <span className="rounded-md bg-[var(--phase-bg)] border border-[var(--phase-br)] px-2 py-0.5 font-mono-code text-xs font-bold text-[var(--phase-ac)]">
                              Section {section.code}
                            </span>
                            <span className="font-mono-code text-xs text-slate-400">
                              {secComp.done}/{secComp.total} items checked ({secComp.pct}%)
                            </span>
                          </div>
                          <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                            {section.title}
                          </h3>
                          {section.objective && (
                            <p className="text-sm text-slate-600">
                              <strong className="font-semibold text-slate-800">
                                Objective:
                              </strong>{' '}
                              <RichText text={section.objective} />
                            </p>
                          )}
                        </div>

                        {/* Section Check All Toggle */}
                        {section.checkableIds.length > 0 && (
                          <button
                            type="button"
                            onClick={() =>
                              setBatch(section.checkableIds, !allSecDone)
                            }
                            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono-code text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                              allSecDone
                                ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-[var(--phase-ac)] hover:text-[var(--phase-ac)]'
                            }`}
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span>
                              {allSecDone ? 'Section Completed' : 'Check Section'}
                            </span>
                          </button>
                        )}
                      </div>

                      {/* Modules Accordion List inside Section matching CampusX .mods / details.mod */}
                      <div className="space-y-3">
                        {section.modules.map((mod, mIdx) => {
                          const modComp = computeCompletion(
                            checked,
                            mod.checkableIds
                          );
                          const modRatio =
                            modComp.total > 0 ? modComp.done / modComp.total : 0;
                          const isModDone =
                            modComp.total > 0 && modComp.done === modComp.total;

                          return (
                            <details
                              key={`${mod.id}-${expandAll ? 'open' : 'closed'}`}
                              open={expandAll || (sIdx === 0 && mIdx === 0)}
                              className={`group rounded-2xl border transition-all ${
                                isModDone
                                  ? 'border-emerald-200/90 bg-emerald-50/15'
                                  : 'border-slate-200 bg-white hover:border-slate-300'
                              }`}
                            >
                              <summary className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-5 cursor-pointer select-none">
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                  <span
                                    className={`font-mono-code text-xs font-bold px-2 py-1 rounded-lg border shrink-0 ${
                                      isModDone
                                        ? 'bg-emerald-600 border-emerald-600 text-white'
                                        : mod.kind === 'mini-project'
                                        ? 'bg-amber-50 border-amber-200 text-amber-800'
                                        : 'bg-[var(--phase-bg)] border-[var(--phase-br)] text-[var(--phase-ac)]'
                                    }`}
                                  >
                                    {String(mIdx + 1).padStart(2, '0')}
                                  </span>

                                  <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="font-display text-base font-bold text-slate-900">
                                        <RichText text={mod.title} />
                                      </span>
                                      <span className="font-mono-code text-[11px] font-medium text-slate-400">
                                        {mod.code}
                                      </span>
                                      {mod.kind === 'mini-project' && (
                                        <span className="rounded-full bg-amber-100 px-2 py-0.5 font-mono-code text-[10px] font-bold uppercase text-amber-800">
                                          Mini-Project
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 shrink-0">
                                  <div className="hidden sm:flex items-center gap-2.5 w-36">
                                    <SegmentedMeter
                                      totalSegments={Math.min(
                                        12,
                                        Math.max(4, modComp.total)
                                      )}
                                      completedRatio={modRatio}
                                    />
                                  </div>
                                  <span
                                    className={`font-mono-code text-xs font-semibold min-w-[46px] text-right ${
                                      isModDone
                                        ? 'text-emerald-600'
                                        : 'text-slate-500'
                                    }`}
                                  >
                                    {modComp.done}/{modComp.total}
                                  </span>
                                  <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180" />
                                </div>
                              </summary>

                              <div className="border-t border-slate-100 px-4 py-4 sm:px-6 sm:py-5 space-y-4">
                                {/* Quick module check toggle */}
                                {mod.checkableIds.length > 1 && (
                                  <div className="flex items-center justify-end">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setBatch(mod.checkableIds, !isModDone)
                                      }
                                      className="text-xs font-mono-code font-semibold text-[var(--phase-ac)] hover:underline cursor-pointer"
                                    >
                                      {isModDone
                                        ? 'Uncheck all in module'
                                        : `Mark all ${modComp.total} items done`}
                                    </button>
                                  </div>
                                )}

                                <ContentElementsView
                                  elements={mod.elements}
                                  searchQuery={searchQuery}
                                />
                              </div>
                            </details>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ───────────────── SHIP IT / CAPSTONE SECTION (#ship) ───────────────── */}
          {level.capstone && (
            <section id="ship" className="py-8 sm:py-10">
              <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <aside className="rounded-3xl border-2 border-[var(--phase-ac)]/40 bg-gradient-to-br from-[var(--phase-bg)]/70 via-white to-white p-6 sm:p-8 shadow-sm space-y-6">
                  {(() => {
                    const capComp = computeCompletion(
                      checked,
                      level.capstone.checkableIds
                    );
                    const isCapDone =
                      capComp.total > 0 && capComp.done === capComp.total;
                    return (
                      <>
                        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--phase-br)]/60 pb-5">
                          <div className="flex items-start gap-3.5">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--phase-ac)] text-white shadow-xs">
                              <Flag className="h-5 w-5" />
                            </span>
                            <div className="space-y-1">
                              <p className="eyebrow">
                                Ship it · Level {level.badge} Capstone
                              </p>
                              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                                <RichText text={level.capstone.title} />
                              </h2>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-mono-code text-xs font-bold text-[var(--phase-ac)] bg-white border border-[var(--phase-br)] px-3 py-1.5 rounded-xl">
                              {capComp.done}/{capComp.total} requirements ({capComp.pct}%)
                            </span>
                            {level.capstone.checkableIds.length > 0 && (
                              <button
                                type="button"
                                onClick={() =>
                                  setBatch(
                                    level.capstone!.checkableIds,
                                    !isCapDone
                                  )
                                }
                                className="rounded-xl bg-[var(--phase-ac)] px-3.5 py-1.5 font-mono-code text-xs font-semibold text-white hover:opacity-90 cursor-pointer"
                              >
                                {isCapDone ? 'Completed!' : 'Mark All Shipped'}
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                          {level.capstone.subBlocks.map((sb, idx) => {
                            const isArch = /suggested architecture/i.test(sb.title);
                            const mermaidChart = isArch
                              ? PROJECT_MERMAID_CHARTS[level.capstone!.id]
                              : undefined;
                            // Filter out ASCII arrow diagrams when Mermaid flowchart is available
                            const filteredElements = mermaidChart
                              ? sb.elements.filter(
                                  (el) =>
                                    !(
                                      el.type === 'code' &&
                                      /[►▼▲◄]/.test(el.code)
                                    )
                                )
                              : sb.elements;
                            const hasRepoTree =
                              Boolean(mermaidChart) &&
                              filteredElements.some(
                                (el) => el.type === 'code' && /[├└]──/.test(el.code)
                              );

                            return (
                              <div
                                key={idx}
                                className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-3"
                              >
                                {sb.title && sb.title !== 'Overview' && (
                                  <h3 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                                    <RichText text={sb.title} />
                                  </h3>
                                )}
                                {mermaidChart && (
                                  <MermaidDiagram
                                    chart={mermaidChart}
                                    title={`${level.capstone!.title} — Architecture Flowchart`}
                                  />
                                )}
                                {filteredElements.length > 0 && (
                                  <div className="space-y-2 pt-2">
                                    {hasRepoTree && (
                                      <h4 className="font-mono-code text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Suggested Repository Structure
                                      </h4>
                                    )}
                                    <ContentElementsView elements={filteredElements} />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </>
                    );
                  })()}
                </aside>
              </div>
            </section>
          )}

          {/* ───────────────── LEVEL INTERVIEW QUESTION BANK (#interview-bank) ───────────────── */}
          {level.interviewBank && (
            <section id="interview-bank" className="py-8 sm:py-10">
              <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs space-y-6">
                  {(() => {
                    const qComp = computeCompletion(
                      checked,
                      level.interviewBank.checkableIds
                    );
                    return (
                      <>
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-200">
                              <HelpCircle className="h-5 w-5" />
                            </span>
                            <div>
                              <p className="eyebrow">Self-test &amp; Oral Defence</p>
                              <h2 className="font-display text-2xl font-bold text-slate-900">
                                {level.interviewBank.title}
                              </h2>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-mono-code text-xs font-semibold text-slate-600">
                              {qComp.done}/{qComp.total} mastered ({qComp.pct}%)
                            </span>
                            <Link
                              to="/interview-prep"
                              className="font-mono-code text-xs font-semibold text-[#6c5ce7] hover:underline"
                            >
                              Open Full Interview Hub →
                            </Link>
                          </div>
                        </div>

                        <div className="space-y-6">
                          {level.interviewBank.groups.map((grp, gIdx) => (
                            <div key={gIdx} className="space-y-2.5">
                              <h3 className="font-display text-base font-bold text-slate-800 flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-[var(--phase-ac)]" />
                                {grp.rawHeading}
                              </h3>

                              <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200 overflow-hidden">
                                {grp.questions.map((q) => {
                                  const isQDone = !!checked[q.id];
                                  return (
                                    <label
                                      key={q.id}
                                      className={`flex items-start gap-3.5 px-4 py-3 cursor-pointer select-none transition-colors ${
                                        isQDone
                                          ? 'bg-slate-50/90 text-slate-400'
                                          : 'bg-white hover:bg-slate-50/70 text-slate-800'
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={isQDone}
                                        onChange={() => toggleItem(q.id)}
                                        className="sr-only"
                                      />
                                      <span
                                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                                          isQDone
                                            ? 'border-[var(--phase-ac)] bg-[var(--phase-ac)] text-white'
                                            : 'border-slate-300 bg-white'
                                        }`}
                                      >
                                        {isQDone && (
                                          <Check className="h-3.5 w-3.5 stroke-[2.75]" />
                                        )}
                                      </span>

                                      <span className="font-mono-code text-xs font-semibold text-slate-400 w-7 shrink-0 pt-0.5">
                                        Q{q.number}
                                      </span>

                                      <span
                                        className={`flex-1 text-sm leading-relaxed ${
                                          isQDone
                                            ? 'line-through text-slate-400'
                                            : 'text-slate-800 font-medium'
                                        }`}
                                      >
                                        <RichText text={q.question} />
                                      </span>

                                      <span
                                        className={`shrink-0 rounded-md border px-2 py-0.5 font-mono-code text-[10px] font-semibold uppercase ${
                                          QUESTION_TYPE_STYLES[q.type] ||
                                          QUESTION_TYPE_STYLES.Concept
                                        }`}
                                      >
                                        {q.type}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </section>
          )}

          {/* ───────────────── FINAL LEVEL ASSESSMENT (#assessment) ───────────────── */}
          {level.assessment && (
            <section id="assessment" className="py-6 sm:py-8">
              <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="rounded-3xl border border-emerald-200 bg-emerald-50/30 p-6 sm:p-8 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-200/70 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                        <ClipboardCheck className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-mono-code text-xs font-bold uppercase tracking-wider text-emerald-700">
                          Readiness Gate Before Next Level
                        </p>
                        <h2 className="font-display text-2xl font-bold text-slate-900">
                          {level.assessment.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    {level.assessment.categories.map((cat, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 md:col-span-1 last:md:col-span-1"
                      >
                        <h3 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                          {cat.title}
                        </h3>
                        <ContentElementsView elements={cat.elements} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ───────────────── BOTTOM LEVEL NAVIGATION (.lnav) ───────────────── */}
          <section className="pt-8">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <nav
                aria-label="Level navigation"
                className="grid grid-cols-1 gap-4 sm:grid-cols-3 items-stretch"
              >
                {prevLevel ? (
                  <Link
                    to={`/level/${prevLevel.id}`}
                    data-phase={prevLevel.phaseSlug}
                    className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 hover:border-[var(--phase-ac)] transition-all"
                  >
                    <ChevronLeft className="h-5 w-5 text-slate-400 group-hover:-translate-x-1 group-hover:text-[var(--phase-ac)] transition-transform shrink-0" />
                    <div className="min-w-0">
                      <span className="font-mono-code text-[11px] uppercase tracking-wider text-slate-400 block">
                        Previous · {prevLevel.badge === 'B' ? 'Bridge' : `Level ${prevLevel.badge}`}
                      </span>
                      <span className="font-display text-base font-bold text-slate-900 truncate block">
                        {prevLevel.title}
                      </span>
                      <span className="font-mono-code text-[11px] text-[var(--phase-ac)]">
                        {prevLevel.phaseName}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-center rounded-2xl border border-slate-200/60 bg-slate-50/60 p-4 text-slate-400">
                    <div>
                      <span className="font-mono-code text-[11px] uppercase tracking-wider block">
                        Start of the path
                      </span>
                      <span className="font-display text-sm font-semibold">
                        Level 0 is the beginning
                      </span>
                    </div>
                  </div>
                )}

                <Link
                  to="/#map"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 font-display text-sm font-bold text-slate-700 hover:border-[#6c5ce7] hover:text-[#6c5ce7] transition-all"
                >
                  <Map className="h-4 w-4" />
                  <span>Back to full map</span>
                </Link>

                {nextLevel ? (
                  <Link
                    to={`/level/${nextLevel.id}`}
                    data-phase={nextLevel.phaseSlug}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-right hover:border-[var(--phase-ac)] transition-all"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="font-mono-code text-[11px] uppercase tracking-wider text-slate-400 block">
                        Next · {nextLevel.badge === 'B' ? 'Bridge' : `Level ${nextLevel.badge}`}
                      </span>
                      <span className="font-display text-base font-bold text-slate-900 truncate block">
                        {nextLevel.title}
                      </span>
                      <span className="font-mono-code text-[11px] text-[var(--phase-ac)]">
                        {nextLevel.phaseName}
                      </span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-slate-400 group-hover:translate-x-1 group-hover:text-[var(--phase-ac)] transition-transform shrink-0" />
                  </Link>
                ) : (
                  <Link
                    to="/projects"
                    className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-right text-emerald-900"
                  >
                    <div className="flex-1">
                      <span className="font-mono-code text-[11px] uppercase tracking-wider text-emerald-700 block">
                        Final Level Reached
                      </span>
                      <span className="font-display text-base font-bold block">
                        Review All 26 Projects →
                      </span>
                    </div>
                  </Link>
                )}
              </nav>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
};
