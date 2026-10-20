import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  FolderKanban,
  Compass,
  Ruler,
  ListChecks,
  Check,
  ArrowUpRight,
} from 'lucide-react';
import { RoadmapData } from '../types/roadmap';
import { useProgressStore, computeCompletion } from '../store/useProgressStore';
import { MinimapDots } from '../components/MinimapDots';
import { ContentElementsView } from '../components/ContentElementsView';
import { RichText } from '../components/RichText';

interface ProjectsPageProps {
  data: RoadmapData;
}

const SELF_REVIEW_CHECKLIST = [
  { id: 'proj-self-1', text: 'I can explain the problem, user, and decision in two sentences.' },
  { id: 'proj-self-2', text: 'I measured a trivial baseline first before building complex models.' },
  { id: 'proj-self-3', text: 'Every headline metric is reported with a 95% confidence or bootstrap interval.' },
  { id: 'proj-self-4', text: 'My split is audited for temporal, group, and target leakage.' },
  { id: 'proj-self-5', text: 'A stranger can reproduce my results from a clean clone with one command.' },
  { id: 'proj-self-6', text: 'No secrets, API keys, or personal data exist in my code, logs, or Git history.' },
  { id: 'proj-self-7', text: 'I report cost per 1,000 requests/predictions and p95 latency.' },
  { id: 'proj-self-8', text: 'My README has the result and figure on the first screen, plus an honest failure analysis.' },
  { id: 'proj-self-9', text: 'Automated unit and data-contract tests run in CI on every push.' },
  { id: 'proj-self-10', text: 'I can answer: Why this design? What breaks at 100× traffic? How would I halve the cost?' },
];

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ data }) => {
  const checked = useProgressStore((s) => s.checked);
  const toggleItem = useProgressStore((s) => s.toggleItem);
  const setBatch = useProgressStore((s) => s.setBatch);
  const [phaseFilter, setPhaseFilter] = React.useState<string>('all');

  const filteredProjects = React.useMemo(() => {
    if (phaseFilter === 'all') return data.projects;
    return data.projects.filter((p) => p.phaseSlug === phaseFilter);
  }, [data.projects, phaseFilter]);

  const allProjectIds = React.useMemo(
    () => [
      ...SELF_REVIEW_CHECKLIST.map((c) => c.id),
      ...data.projects.flatMap((p) => p.checkableIds),
    ],
    [data.projects]
  );
  const totalProjComp = computeCompletion(checked, allProjectIds);

  return (
    <div data-phase="specialization">
      {/* ───────────────── STICKY SECONDARY MINIMAP BAR (.sdnav) ───────────────── */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-600 hover:text-[var(--phase-ac)] transition-colors shrink-0"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="rounded-md border border-[var(--phase-br)] bg-[var(--phase-bg)] px-2 py-0.5 font-mono-code text-[11px] font-bold text-[var(--phase-ac)]">
              P
            </span>
            <span className="font-display text-sm font-bold text-slate-900">
              Projects &amp; Capstones
            </span>
          </Link>

          <div className="hidden md:block flex-1 min-w-0">
            <MinimapDots levels={data.levels} variant="nav" />
          </div>
        </div>
      </div>

      <main id="main" className="pb-20">
        <article>
          {/* ───────────────── HEADER (.ph) ───────────────── */}
          <header className="border-b border-slate-200 bg-gradient-to-b from-[var(--phase-bg)]/50 via-white to-white py-10 sm:py-14">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-6">
              <div className="flex items-center gap-1.5 font-mono-code text-xs text-slate-500">
                <Link to="/" className="hover:text-[var(--phase-ac)]">
                  ML &amp; Applied Scientist Roadmap
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                <span className="font-semibold text-[var(--phase-ac)]">Projects</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-2xl border border-[var(--phase-br)] bg-[var(--phase-bg)] text-[var(--phase-ac)]">
                  <FolderKanban className="h-7 w-7" />
                </span>
                <div>
                  <p className="eyebrow">Portfolio &amp; Proof · 19 Level + 7 Phase Capstones</p>
                  <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
                    Projects ({data.projects.length})
                  </h1>
                </div>
              </div>

              {/* Why build more projects callout matching CampusX .ph__why */}
              <div className="rounded-2xl border border-[var(--phase-br)] bg-[var(--phase-bg)]/45 p-5 max-w-3xl space-y-1.5">
                <p className="font-mono-code text-xs font-bold uppercase tracking-wider text-[var(--phase-ac)]">
                  Why build measured artefacts
                </p>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Anyone can clone a tutorial notebook. These {data.projects.length} level and phase capstones prove range and rigour: each one requires a clean package, a baseline, honest validation with intervals, failure analysis, and reproducible execution.
                </p>
                <p className="font-mono-code text-xs font-semibold text-slate-600 pt-1">
                  Overall Project Checklist Progress: {totalProjComp.done} / {totalProjComp.total} items ({totalProjComp.pct}%)
                </p>
              </div>
            </div>
          </header>

          {/* ───────────────── HOW TO USE THIS SECTION ───────────────── */}
          <section className="py-10 border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-5">
              <h2 className="flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-widest text-slate-500">
                <Compass className="h-4 w-4 text-[var(--phase-ac)]" />
                <span>How to use this section</span>
              </h2>

              <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 list-none m-0 p-0">
                {[
                  { n: '01', t: 'Build every level capstone as you complete that level.' },
                  { n: '02', t: 'Use Phase Capstones to integrate multiple levels into one system.' },
                  { n: '03', t: 'Curate your top 3 projects in Level 17 for hiring managers.' },
                  { n: '04', t: 'Check off every requirement and self-review item before shipping.' },
                ].map((step) => (
                  <li
                    key={step.n}
                    className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 space-y-1.5"
                  >
                    <span className="font-mono-code text-xs font-bold text-[var(--phase-ac)]">
                      {step.n}
                    </span>
                    <p className="font-display text-sm font-semibold text-slate-800">
                      {step.t}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ───────────────── GUIDELINES + INTERACTIVE SELF-REVIEW CHECKLIST (.pgrid) ───────────────── */}
          <section className="py-12 border-b border-slate-200 bg-slate-50/70">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Left: Project Guidelines */}
              <div className="lg:col-span-5 space-y-4">
                <h2 className="flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-widest text-slate-500">
                  <Ruler className="h-4 w-4 text-[var(--phase-ac)]" />
                  <span>Project guidelines (The Standard)</span>
                </h2>

                <ol className="space-y-2.5 list-none m-0 p-0">
                  {[
                    'A real problem, a real decision, and a stated unit of analysis',
                    'A trivial baseline measured first before any complex model',
                    'A leak-proof split with 95% confidence or bootstrap intervals',
                    'A modular Python package (src/ + tests/) — never just a notebook',
                    'Reproducible in one command from a clean clone',
                    'Cost per 1,000 requests and latency budget measured',
                    'A README with results on screen one, trade-offs, and a real failure',
                    'Automated tests + CI workflow passing on GitHub',
                  ].map((g, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-2xs"
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-[var(--phase-bg)] font-mono-code text-xs font-bold text-[var(--phase-ac)]">
                        {i + 1}
                      </span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Right: Interactive Self-Review Checklist matching CampusX .check */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-widest text-slate-500">
                    <ListChecks className="h-4 w-4 text-[var(--phase-ac)]" />
                    <span>Interactive Self-Review Checklist</span>
                  </h2>
                  <button
                    type="button"
                    onClick={() =>
                      setBatch(
                        SELF_REVIEW_CHECKLIST.map((c) => c.id),
                        true
                      )
                    }
                    className="font-mono-code text-xs font-semibold text-[var(--phase-ac)] hover:underline cursor-pointer"
                  >
                    Check all
                  </button>
                </div>

                <ul className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs list-none m-0">
                  {SELF_REVIEW_CHECKLIST.map((item) => {
                    const isDone = !!checked[item.id];
                    return (
                      <li key={item.id}>
                        <label
                          className={`flex items-start gap-3 rounded-xl px-3 py-2.5 cursor-pointer select-none transition-all ${
                            isDone
                              ? 'bg-slate-50 text-slate-400'
                              : 'hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => toggleItem(item.id)}
                            className="sr-only"
                          />
                          <span
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                              isDone
                                ? 'border-[var(--phase-ac)] bg-[var(--phase-ac)] text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isDone && <Check className="h-3.5 w-3.5 stroke-[2.75]" />}
                          </span>
                          <span
                            className={`text-sm leading-relaxed ${
                              isDone ? 'line-through text-slate-400' : 'text-slate-700 font-medium'
                            }`}
                          >
                            {item.text}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </section>

          {/* ───────────────── ALL 26 CAPSTONE PROJECTS (.projs) ───────────────── */}
          <section className="py-12" aria-labelledby="projects-h">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2
                  id="projects-h"
                  className="flex items-center gap-2 font-display text-2xl font-bold text-slate-900"
                >
                  <FolderKanban className="h-5 w-5 text-[var(--phase-ac)]" />
                  <span>All {filteredProjects.length} Capstone Projects</span>
                </h2>

                {/* Phase filter pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPhaseFilter('all')}
                    className={`rounded-full px-3 py-1 font-mono-code text-xs font-semibold transition-colors cursor-pointer ${
                      phaseFilter === 'all'
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All Phases ({data.projects.length})
                  </button>
                  {data.phases.map((p) => (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => setPhaseFilter(p.slug)}
                      className={`rounded-full px-3 py-1 font-mono-code text-xs font-semibold transition-colors cursor-pointer ${
                        phaseFilter === p.slug
                          ? 'bg-[#6c5ce7] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      P{p.phaseNum}: {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {filteredProjects.map((proj, pIdx) => {
                  const projComp = computeCompletion(checked, proj.checkableIds);
                  const isProjDone =
                    projComp.total > 0 && projComp.done === projComp.total;

                  return (
                    <details
                      key={proj.id}
                      id={proj.id}
                      data-phase={proj.phaseSlug}
                      open={pIdx === 0}
                      className={`group rounded-2xl border bg-white shadow-2xs transition-all ${
                        isProjDone
                          ? 'border-emerald-300'
                          : 'border-slate-200 hover:border-[var(--phase-ac)]'
                      }`}
                    >
                      <summary className="flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer select-none">
                        <div className="flex items-center gap-4 min-w-0 flex-1">
                          <span
                            className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border font-mono-code text-sm font-bold ${
                              isProjDone
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'bg-[var(--phase-bg)] border-[var(--phase-br)] text-[var(--phase-ac)]'
                            }`}
                          >
                            {String(proj.number).padStart(2, '0')}
                          </span>

                          <div className="min-w-0 flex-1 space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-md bg-[var(--phase-bg)] border border-[var(--phase-br)] px-2 py-0.5 font-mono-code text-[11px] font-bold text-[var(--phase-ac)]">
                                {proj.levelBadge}
                              </span>
                              <span className="font-mono-code text-xs text-slate-500">
                                {proj.phaseName}
                              </span>
                              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-mono-code text-[11px] font-medium text-slate-700">
                                {proj.difficulty}
                              </span>
                              {proj.kind === 'Phase Capstone' && (
                                <span className="rounded-full bg-purple-100 px-2.5 py-0.5 font-mono-code text-[10px] font-bold uppercase text-purple-800">
                                  Phase Integration Capstone
                                </span>
                              )}
                            </div>

                            <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                              <RichText text={proj.title} />
                            </h3>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                          <span className="font-mono-code text-xs font-semibold text-slate-600">
                            {projComp.done}/{projComp.total} ({projComp.pct}%)
                          </span>
                          <ChevronDown className="h-5 w-5 text-slate-400 transition-transform group-open:rotate-180" />
                        </div>
                      </summary>

                      <div className="border-t border-slate-100 p-5 sm:p-6 space-y-5 bg-slate-50/30">
                        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs">
                          <div className="flex flex-wrap items-center gap-4">
                            <span>
                              <strong className="text-slate-700">Builds on:</strong>{' '}
                              <Link
                                to={`/level/${proj.levelId}`}
                                className="font-semibold text-[var(--phase-ac)] hover:underline inline-flex items-center gap-0.5"
                              >
                                {proj.levelBadge} ({proj.levelTitle})
                                <ArrowUpRight className="h-3 w-3" />
                              </Link>
                            </span>
                            {proj.duration && (
                              <span>
                                <strong className="text-slate-700">Duration:</strong>{' '}
                                {proj.duration}
                              </span>
                            )}
                          </div>

                          {proj.checkableIds.length > 0 && (
                            <button
                              type="button"
                              onClick={() =>
                                setBatch(proj.checkableIds, !isProjDone)
                              }
                              className="font-mono-code font-semibold text-[var(--phase-ac)] hover:underline cursor-pointer"
                            >
                              {isProjDone
                                ? 'Uncheck project items'
                                : 'Check all project items'}
                            </button>
                          )}
                        </div>

                        <div className="space-y-4">
                          {proj.subBlocks.map((sb, idx) => (
                            <div
                              key={idx}
                              className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3"
                            >
                              {sb.title && sb.title !== 'Overview' && (
                                <h4 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                                  <RichText text={sb.title} />
                                </h4>
                              )}
                              <ContentElementsView elements={sb.elements} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
};
