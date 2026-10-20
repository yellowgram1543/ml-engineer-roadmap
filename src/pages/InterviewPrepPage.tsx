import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MessageSquareCode,
  Tag,
  Check,
  Search,
} from 'lucide-react';
import { RoadmapData } from '../types/roadmap';
import { useProgressStore, computeCompletion } from '../store/useProgressStore';
import { MinimapDots } from '../components/MinimapDots';
import { RichText } from '../components/RichText';
import { getQuestionHint } from '../data/interviewHints';

interface InterviewPrepPageProps {
  data: RoadmapData;
}

const QUESTION_TYPES = [
  {
    type: 'Concept',
    desc: 'explain how something works mathematically or mechanically, and when to use it.',
    badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  {
    type: 'Scenario',
    desc: 'decide what to do in a specific modelling, evaluation, or production trade-off.',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  {
    type: 'Debugging',
    desc: 'diagnose the root cause of a training, data leakage, or serving failure.',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  {
    type: 'Design',
    desc: 'design an end-to-end ML system within latency, cost, and reliability constraints.',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    type: 'Coding',
    desc: 'implement an algorithm, estimator, or pipeline cleanly from scratch.',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
  },
];

const BADGE_MAP: Record<string, string> = {
  Concept: 'bg-sky-50 text-sky-700 border-sky-200',
  Scenario: 'bg-amber-50 text-amber-800 border-amber-200',
  Debugging: 'bg-rose-50 text-rose-700 border-rose-200',
  Design: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Coding: 'bg-purple-50 text-purple-700 border-purple-200',
};

export const InterviewPrepPage: React.FC<InterviewPrepPageProps> = ({ data }) => {
  const checked = useProgressStore((s) => s.checked);
  const toggleItem = useProgressStore((s) => s.toggleItem);
  const setBatch = useProgressStore((s) => s.setBatch);

  const [selectedLevel, setSelectedLevel] = React.useState<string>('all');
  const [selectedType, setSelectedType] = React.useState<string>('all');
  const [query, setQuery] = React.useState<string>('');

  const allQuestionIds = React.useMemo(
    () => data.interviewBanks.flatMap((b) => b.checkableIds),
    [data.interviewBanks]
  );
  const overallComp = computeCompletion(checked, allQuestionIds);

  const filteredBanks = React.useMemo(() => {
    const qNorm = query.trim().toLowerCase();
    return data.interviewBanks
      .filter((b) => selectedLevel === 'all' || b.levelId === selectedLevel)
      .map((bank) => {
        const groups = bank.groups
          .map((grp) => ({
            ...grp,
            questions: grp.questions.filter((q) => {
              if (selectedType !== 'all' && q.type !== selectedType) return false;
              if (
                qNorm &&
                !q.question.toLowerCase().includes(qNorm) &&
                !grp.title.toLowerCase().includes(qNorm)
              ) {
                return false;
              }
              return true;
            }),
          }))
          .filter((grp) => grp.questions.length > 0);

        return { ...bank, groups };
      })
      .filter((bank) => bank.groups.length > 0);
  }, [data.interviewBanks, selectedLevel, selectedType, query]);

  return (
    <div data-phase="career">
      {/* ───────────────── STICKY SECONDARY MINIMAP BAR (.sdnav) ───────────────── */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-slate-600 hover:text-[var(--phase-ac)] transition-colors shrink-0"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="rounded-md border border-[var(--phase-br)] bg-[var(--phase-bg)] px-2 py-0.5 font-mono-code text-[11px] font-bold text-[var(--phase-ac)]">
              IP
            </span>
            <span className="font-display text-sm font-bold text-slate-900">
              Interview Prep
            </span>
          </Link>

          <div className="hidden md:block flex-1 min-w-0">
            <MinimapDots levels={data.levels} variant="nav" />
          </div>
        </div>
      </div>

      <main id="main" className="pb-20">
        <article>
          {/* ───────────────── HEADER (.ih) ───────────────── */}
          <header className="border-b border-slate-200 bg-gradient-to-b from-[var(--phase-bg)]/50 via-white to-white py-10 sm:py-14">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-5">
              <div className="flex items-center gap-1.5 font-mono-code text-xs text-slate-500">
                <Link to="/" className="hover:text-[var(--phase-ac)]">
                  ML &amp; Applied Scientist Roadmap
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                <span className="font-semibold text-[var(--phase-ac)]">
                  Interview Prep
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl border border-[var(--phase-br)] bg-[var(--phase-bg)] text-[var(--phase-ac)]">
                    <MessageSquareCode className="h-7 w-7" />
                  </span>
                  <div>
                    <p className="eyebrow">
                      All {data.meta.totalQuestions} Questions Across L0–L18 · Interactive Mastery Ledger
                    </p>
                    <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
                      Interview Prep
                    </h1>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right shadow-2xs">
                  <span className="font-mono-code text-[11px] uppercase tracking-wider text-slate-400 block">
                    Questions Mastered
                  </span>
                  <span className="font-mono-code text-lg font-bold text-[var(--phase-ac)]">
                    {overallComp.done} / {overallComp.total} ({overallComp.pct}%)
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* ───────────────── QUESTION TYPES LEGEND (.isec--gray) ───────────────── */}
          <section
            aria-labelledby="types-h"
            className="border-b border-slate-200 bg-slate-50/80 py-8"
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-4">
              <h2
                id="types-h"
                className="flex items-center gap-2 font-mono-code text-xs font-bold uppercase tracking-widest text-slate-500"
              >
                <Tag className="h-3.5 w-3.5 text-[var(--phase-ac)]" />
                <span>Question types (Click to filter)</span>
              </h2>

              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 list-none m-0 p-0">
                {QUESTION_TYPES.map((qt) => {
                  const isActive = selectedType === qt.type;
                  return (
                    <li
                      key={qt.type}
                      onClick={() =>
                        setSelectedType(isActive ? 'all' : qt.type)
                      }
                      className={`rounded-xl border p-3.5 transition-all cursor-pointer ${
                        isActive
                          ? 'border-[var(--phase-ac)] bg-white ring-2 ring-[var(--phase-ac)]/20'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block rounded-md border px-2 py-0.5 font-mono-code text-[11px] font-semibold uppercase mb-1.5 ${qt.badgeClass}`}
                      >
                        {qt.type}
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {qt.desc}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          {/* ───────────────── FILTER BAR & THE QUESTIONS (.qgroup / .qs) ───────────────── */}
          <section className="py-10" aria-labelledby="qs-h">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
              {/* Filter Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
                <div className="relative flex-1 min-w-[240px] max-w-md">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search 530+ interview questions (e.g. backprop, leakage, SVD, RAG)..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-9 pr-3 py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[var(--phase-ac)] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    aria-label="Filter by Level"
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono-code text-xs font-semibold text-slate-700 focus:border-[var(--phase-ac)] focus:outline-none"
                  >
                    <option value="all">All Levels (L0–L18)</option>
                    {data.interviewBanks.map((b) => (
                      <option key={b.levelId} value={b.levelId}>
                        {b.levelBadge} · {b.levelTitle}
                      </option>
                    ))}
                  </select>

                  {(selectedLevel !== 'all' ||
                    selectedType !== 'all' ||
                    query.trim() !== '') && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedLevel('all');
                        setSelectedType('all');
                        setQuery('');
                      }}
                      className="rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 font-mono-code text-xs font-semibold text-slate-600 hover:bg-slate-200 cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Render Question Banks by Level */}
              <div className="space-y-12">
                {filteredBanks.map((bank) => {
                  const bankComp = computeCompletion(checked, bank.checkableIds);
                  const allBankDone =
                    bankComp.total > 0 && bankComp.done === bankComp.total;

                  return (
                    <div
                      key={bank.levelId}
                      data-phase={bank.phaseSlug}
                      className="space-y-5"
                    >
                      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-3">
                        <div>
                          <p className="font-mono-code text-xs font-semibold uppercase tracking-wider text-[var(--phase-ac)]">
                            {bank.phaseName} ·{' '}
                            <Link
                              to={`/level/${bank.levelId}`}
                              className="underline hover:opacity-80"
                            >
                              {bank.levelBadge}
                            </Link>
                          </p>
                          <h3 className="font-display text-2xl font-bold text-slate-900">
                            {bank.levelTitle}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-mono-code text-xs font-semibold text-slate-500">
                            {bankComp.done}/{bankComp.total} mastered ({bankComp.pct}%)
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setBatch(bank.checkableIds, !allBankDone)
                            }
                            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-mono-code text-xs font-semibold text-[var(--phase-ac)] hover:border-[var(--phase-ac)] cursor-pointer"
                          >
                            {allBankDone ? 'Reset Level Qs' : 'Mark All Mastered'}
                          </button>
                        </div>
                      </div>

                      {bank.groups.map((grp, gIdx) => (
                        <div key={gIdx} className="space-y-2.5">
                          <h4 className="font-mono-code text-xs font-bold uppercase tracking-wider text-slate-500">
                            {grp.rawHeading}
                          </h4>

                          <div className="space-y-2">
                            {grp.questions.map((q) => {
                              const isDone = !!checked[q.id];
                              return (
                                <details
                                  key={q.id}
                                  className={`group rounded-2xl border bg-white transition-all ${
                                    isDone
                                      ? 'border-emerald-200 bg-emerald-50/15'
                                      : 'border-slate-200 hover:border-slate-300'
                                  }`}
                                >
                                  <summary className="flex items-center gap-3.5 px-4 py-3.5 cursor-pointer select-none">
                                    {/* Interactive Checkbox */}
                                    <button
                                      type="button"
                                      aria-label={`Mark question ${q.number} as mastered`}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        toggleItem(q.id);
                                      }}
                                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all cursor-pointer ${
                                        isDone
                                          ? 'border-[var(--phase-ac)] bg-[var(--phase-ac)] text-white'
                                          : 'border-slate-300 bg-white hover:border-[var(--phase-ac)]'
                                      }`}
                                    >
                                      {isDone && (
                                        <Check className="h-3.5 w-3.5 stroke-[2.75]" />
                                      )}
                                    </button>

                                    <span className="font-mono-code text-xs font-semibold text-slate-400 w-7 shrink-0">
                                      {q.number}
                                    </span>

                                    <span
                                      className={`flex-1 text-[14.5px] font-medium leading-snug ${
                                        isDone
                                          ? 'line-through text-slate-400'
                                          : 'text-slate-900'
                                      }`}
                                    >
                                      <RichText text={q.question} />
                                    </span>

                                    <span
                                      className={`shrink-0 rounded-md border px-2.5 py-0.5 font-mono-code text-[10px] font-semibold uppercase ${
                                        BADGE_MAP[q.type] || BADGE_MAP.Concept
                                      }`}
                                    >
                                      {q.type}
                                    </span>

                                    <ChevronDown className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
                                  </summary>

                                  <div className="border-t border-slate-100 px-4 py-4 pl-14 text-xs sm:text-sm text-slate-700 bg-slate-50/50 rounded-b-2xl space-y-3">
                                    {(() => {
                                      const hint = getQuestionHint(
                                        q.id,
                                        q.question,
                                        grp.title,
                                        q.type,
                                        bank.levelBadge
                                      );
                                      return (
                                        <>
                                          <div className="space-y-1.5">
                                            <div className="font-mono-code text-[11px] font-bold uppercase tracking-wider text-[var(--phase-ac)]">
                                              💡 Clues to Form Your Answer (Think Through These)
                                            </div>
                                            <ul className="list-disc pl-4 space-y-1 text-slate-700 leading-relaxed">
                                              {hint.clues.map((c, cIdx) => (
                                                <li key={cIdx}>
                                                  <RichText text={c} />
                                                </li>
                                              ))}
                                            </ul>
                                          </div>

                                          <div className="rounded-xl border border-slate-200/80 bg-white px-3.5 py-2.5 text-xs text-slate-600 leading-relaxed">
                                            <strong className="font-semibold text-slate-900">
                                              How to structure your spoken answer ·{' '}
                                            </strong>
                                            <RichText text={hint.howToStructure} />{' '}
                                            <span className="text-slate-400">
                                              (Topic: <em>{grp.title}</em> in{' '}
                                              <Link
                                                to={`/level/${bank.levelId}`}
                                                className="font-semibold text-[var(--phase-ac)] hover:underline"
                                              >
                                                {bank.levelBadge}
                                              </Link>
                                              )
                                            </span>
                                          </div>
                                        </>
                                      );
                                    })()}
                                  </div>
                                </details>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
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
