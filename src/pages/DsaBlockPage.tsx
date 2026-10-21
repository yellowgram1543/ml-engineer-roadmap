import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Check,
  CheckCircle2,
  Clock,
  Code2,
  ShieldCheck,
  HelpCircle,
  Eye,
  EyeOff,
  Sparkles,
  ArrowLeft,
  ListOrdered,
  BookOpen,
} from 'lucide-react';
import { DsaRoadmapData, DsaBlock, DsaPhase } from '../types/dsaRoadmap';
import { useDsaProgressStore, computeDsaCompletion } from '../store/useDsaProgressStore';
import { RichText } from '../components/RichText';
import { DsaContentElementsView } from '../components/DsaContentElementsView';

interface DsaBlockPageProps {
  data: DsaRoadmapData;
}

const TIER_COLORS: Record<string, string> = {
  Easy: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Medium: 'bg-amber-100 text-amber-800 border-amber-200',
  Hard: 'bg-rose-100 text-rose-800 border-rose-200',
  Challenge: 'bg-purple-100 text-purple-800 border-purple-200',
};

export const DsaBlockPage: React.FC<DsaBlockPageProps> = ({ data }) => {
  const { blockId } = useParams<{ blockId: string }>();

  // Find block across all phases
  let currentBlock: DsaBlock | null = null;
  let currentPhase: DsaPhase | null = null;
  let allBlocksList: DsaBlock[] = [];

  for (const phase of data.phases) {
    for (const b of phase.blocks) {
      allBlocksList.push(b);
      if (b.id === blockId || b.code.toLowerCase() === blockId?.toLowerCase()) {
        currentBlock = b;
        currentPhase = phase;
      }
    }
  }

  const checked = useDsaProgressStore((s) => s.checked);
  const toggleItem = useDsaProgressStore((s) => s.toggleItem);
  const setBatch = useDsaProgressStore((s) => s.setBatch);

  // Concept drill reveal states
  const [revealedDrills, setRevealedDrills] = React.useState<Record<number, boolean>>({});
  const toggleDrill = (idx: number) => {
    setRevealedDrills((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };
  const revealAllDrills = () => {
    if (!currentBlock) return;
    const allRev: Record<number, boolean> = {};
    currentBlock.conceptDrill.forEach((_, i) => (allRev[i] = true));
    setRevealedDrills(allRev);
  };
  const hideAllDrills = () => setRevealedDrills({});

  if (!currentBlock || !currentPhase) {
    return <Navigate to="/dsa" replace />;
  }

  const currentIndex = allBlocksList.findIndex((b) => b.id === currentBlock?.id);
  const prevBlock = currentIndex > 0 ? allBlocksList[currentIndex - 1] : null;
  const nextBlock = currentIndex < allBlocksList.length - 1 ? allBlocksList[currentIndex + 1] : null;

  const blockStats = computeDsaCompletion(checked, currentBlock.checkableIds);

  return (
    <main id="main" className="min-h-screen pb-20 bg-[#fcfcfd]">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="border-b border-slate-200/80 bg-white sticky top-0 z-20 backdrop-blur-md bg-white/95">
        <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono-code text-slate-500">
            <Link to="/dsa" className="hover:text-emerald-700 flex items-center gap-1 font-semibold text-slate-700">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>DSA Home</span>
            </Link>
            <span>/</span>
            <span className="text-slate-600 font-medium">Phase {currentPhase.code}</span>
            <span>/</span>
            <span className="text-slate-900 font-bold">{currentBlock.code}</span>
          </div>

          <div className="flex items-center gap-2">
            {prevBlock && (
              <Link
                to={`/dsa/block/${prevBlock.id}`}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                title={`Previous: ${prevBlock.code} - ${prevBlock.title}`}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{prevBlock.code}</span>
              </Link>
            )}
            {nextBlock && (
              <Link
                to={`/dsa/block/${nextBlock.id}`}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                title={`Next: ${nextBlock.code} - ${nextBlock.title}`}
              >
                <span className="hidden sm:inline">{nextBlock.code}</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-8">
        {/* Block Header Banner */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white font-mono-code text-lg font-bold shadow-sm">
                {currentBlock.code}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono-code text-xs uppercase font-semibold text-emerald-700">
                    Phase {currentPhase.code} · {currentPhase.name}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="font-mono-code text-xs text-slate-500 font-semibold">
                    {currentBlock.days}
                  </span>
                </div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-0.5">
                  {currentBlock.title}
                </h1>
              </div>
            </div>

            {/* Block Progress */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
              <div className="text-right">
                <div className="text-[11px] font-mono-code text-slate-500 uppercase tracking-wider">
                  Block Progress
                </div>
                <div className="font-mono-code text-sm font-bold text-slate-900">
                  {blockStats.done} / {blockStats.total} ({blockStats.pct}%)
                </div>
              </div>
              <div className="w-14 h-2.5 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full transition-all" style={{ width: `${blockStats.pct}%` }} />
              </div>
            </div>
          </div>

          {currentBlock.objective && (
            <div className="mt-5 rounded-xl bg-emerald-50/50 border border-emerald-100 p-4 text-sm text-slate-700 leading-relaxed">
              <strong className="font-semibold text-emerald-950">Objective: </strong>
              <RichText text={currentBlock.objective} />
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-5 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <button
              type="button"
              onClick={() => setBatch(currentBlock!.checkableIds, true)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              Mark all items in this block complete
            </button>
            <button
              type="button"
              onClick={() => setBatch(currentBlock!.checkableIds, false)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              Reset block checks
            </button>
          </div>
        </div>

        {/* ───────────────── PATTERN CARDS ───────────────── */}
        {currentBlock.patternCards && currentBlock.patternCards.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-600" />
              <h2 className="font-display text-lg font-bold text-slate-900">
                Pattern Recognition Card
              </h2>
            </div>

            {currentBlock.patternCards.map((card, cIdx) => (
              <div key={cIdx} className="space-y-3">
                {card.title && card.title !== 'Pattern card' && (
                  <h3 className="font-display text-sm font-bold text-slate-800">
                    {card.title}
                  </h3>
                )}

                {card.table && (
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
                      <thead className="bg-slate-50 font-mono-code uppercase tracking-wider text-slate-600">
                        <tr>
                          {card.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="px-4 py-2.5 font-semibold">
                              <RichText text={h} />
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                        {card.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/60">
                            {row.map((cell, cellIdx) => (
                              <td key={cellIdx} className="px-4 py-2.5">
                                <RichText text={cell} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {card.text && (
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-mono-code bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <RichText text={card.text} />
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ───────────────── LEARN CHECKLIST ───────────────── */}
        {currentBlock.checklist && currentBlock.checklist.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <h2 className="font-display text-lg font-bold text-slate-900">
                  Learn — Core Checklist
                </h2>
              </div>
              <span className="text-xs font-mono-code text-slate-500">
                {currentBlock.checklist.filter((c) => checked[c.id]).length} / {currentBlock.checklist.length} cleared
              </span>
            </div>

            <ul className="space-y-2">
              {currentBlock.checklist.map((item) => {
                const isDone = !!checked[item.id];
                return (
                  <li key={item.id}>
                    <label
                      className={`group flex items-start gap-3 rounded-xl p-3 cursor-pointer select-none transition-all ${
                        isDone
                          ? 'bg-slate-50 text-slate-400'
                          : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-100 hover:border-slate-200 shadow-2xs'
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
                            ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                            : 'border-slate-300 bg-white group-hover:border-emerald-600'
                        }`}
                      >
                        {isDone && <Check className="h-3.5 w-3.5 stroke-[2.75]" />}
                      </span>
                      <span
                        className={`text-[14px] leading-relaxed transition-colors ${
                          isDone ? 'line-through text-slate-400' : 'text-slate-700'
                        }`}
                      >
                        <RichText text={item.text} />
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* ───────────────── CONCEPT DRILL (ACTIVE RECALL) ───────────────── */}
        {currentBlock.conceptDrill && currentBlock.conceptDrill.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-sky-600" />
                <h2 className="font-display text-lg font-bold text-slate-900">
                  Concept Drill · Active Recall
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={revealAllDrills}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Reveal All</span>
                </button>
                <button
                  type="button"
                  onClick={hideAllDrills}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <EyeOff className="h-3.5 w-3.5" />
                  <span>Hide All</span>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Answer each out loud from memory <em>before</em> clicking to reveal the model answer.
            </p>

            <div className="space-y-3 pt-1">
              {currentBlock.conceptDrill.map((drill, idx) => {
                const isRevealed = !!revealedDrills[idx];
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-slate-50/40 p-4 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-[14.5px] font-semibold text-slate-900 leading-snug">
                        <span className="font-mono-code text-xs text-sky-700 mr-2">Q{idx + 1}.</span>
                        <RichText text={drill.question} />
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleDrill(idx)}
                        className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-slate-600 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-200 transition"
                      >
                        {isRevealed ? (
                          <>
                            <ChevronUp className="h-3.5 w-3.5" />
                            <span>Hide</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3.5 w-3.5" />
                            <span>Answer</span>
                          </>
                        )}
                      </button>
                    </div>

                    {isRevealed && (
                      <div className="mt-3 pt-3 border-t border-slate-200/70 text-[13.5px] text-emerald-900 bg-emerald-50/70 p-3 rounded-lg leading-relaxed animate-in fade-in duration-150">
                        <strong className="text-xs font-mono-code uppercase text-emerald-800 tracking-wider block mb-1">
                          Model Answer:
                        </strong>
                        <RichText text={drill.answer} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ───────────────── PRACTICE LADDER ───────────────── */}
        {currentBlock.practiceLadder && currentBlock.practiceLadder.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-emerald-600" />
                <h2 className="font-display text-lg font-bold text-slate-900">
                  Practice Ladder · Timed Target Problems
                </h2>
              </div>
              <span className="text-xs font-mono-code text-slate-500">
                {currentBlock.practiceLadder.filter((p) => checked[p.id]).length} / {currentBlock.practiceLadder.length} solved
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Solve against the clock. Stop when the timer expires and inspect the pattern cue if stuck.
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 font-mono-code uppercase tracking-wider text-slate-600 text-[11px]">
                  <tr>
                    <th className="px-3 py-2.5 w-10 text-center">Done</th>
                    <th className="px-3 py-2.5 w-24">Tier</th>
                    <th className="px-4 py-2.5">Problem</th>
                    <th className="px-4 py-2.5">Recognition Cue</th>
                    <th className="px-3 py-2.5 w-24 text-right">Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                  {currentBlock.practiceLadder.map((prob) => {
                    const isDone = !!checked[prob.id];
                    const tierClass = TIER_COLORS[prob.tier] || 'bg-slate-100 text-slate-700';

                    return (
                      <tr
                        key={prob.id}
                        className={`hover:bg-slate-50/80 transition ${
                          isDone ? 'bg-slate-50/40 text-slate-400' : ''
                        }`}
                      >
                        <td className="px-3 py-3 text-center">
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => toggleItem(prob.id)}
                            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                          />
                        </td>
                        <td className="px-3 py-3">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold border ${tierClass}`}>
                            {prob.tier}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-slate-900">
                          <span className={isDone ? 'line-through text-slate-400' : ''}>
                            {prob.problem}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600 text-xs font-mono-code">
                          <RichText text={prob.cue} />
                        </td>
                        <td className="px-3 py-3 text-right font-mono-code text-xs font-bold text-slate-700">
                          <span className="inline-flex items-center gap-1 justify-end">
                            <Clock className="h-3 w-3 text-slate-400" />
                            {prob.target}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ───────────────── PRACTICE TASKS (IF ANY) ───────────────── */}
        {currentBlock.practiceTasks && currentBlock.practiceTasks.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <ListOrdered className="h-5 w-5 text-amber-600" />
              <h2 className="font-display text-lg font-bold text-slate-900">
                Practice Tasks · Memory Drills
              </h2>
            </div>
            <ul className="space-y-2">
              {currentBlock.practiceTasks.map((t) => {
                const isDone = !!checked[t.id];
                return (
                  <li key={t.id}>
                    <label className={`flex items-start gap-3 p-3 rounded-xl border border-slate-200 cursor-pointer select-none transition ${isDone ? 'bg-slate-50 line-through text-slate-400' : 'bg-white hover:bg-slate-50 text-slate-800'}`}>
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => toggleItem(t.id)}
                        className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 mt-0.5 cursor-pointer"
                      />
                      <span className="text-sm leading-relaxed">
                        <RichText text={t.text} />
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* ───────────────── COMPLETION GATE ───────────────── */}
        {currentBlock.gate && (
          <div className="rounded-2xl border border-emerald-300 bg-emerald-50/60 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-emerald-950">
              <ShieldCheck className="h-6 w-6 text-emerald-600" />
              <h2 className="font-display text-lg font-bold">
                {currentBlock.gate.title} · Verification Check
              </h2>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed">
              <RichText text={currentBlock.gate.text} />
            </p>
            <div>
              <label className="inline-flex items-center gap-2 cursor-pointer select-none rounded-xl bg-white border border-emerald-300 px-4 py-2 text-xs font-semibold text-emerald-900 hover:bg-emerald-50/80 shadow-xs transition">
                <input
                  type="checkbox"
                  checked={!!checked[currentBlock.gate.id]}
                  onChange={() => toggleItem(currentBlock!.gate!.id)}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
                <span>
                  {checked[currentBlock.gate.id] ? 'Gate verified and cleared!' : 'I confirm I cleared all gate criteria for this block'}
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200">
          {prevBlock ? (
            <Link
              to={`/dsa/block/${prevBlock.id}`}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition shadow-xs"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous: {prevBlock.code}</span>
            </Link>
          ) : <div />}

          {nextBlock && (
            <Link
              to={`/dsa/block/${nextBlock.id}`}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition shadow-xs"
            >
              <span>Next: {nextBlock.code}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </main>
  );
};
