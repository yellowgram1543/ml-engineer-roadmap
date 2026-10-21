import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  Code2,
  Clock,
  Layers,
  Award,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Target,
  Sparkles,
  BookOpen,
  Calendar,
  Flame,
  FileCode,
} from 'lucide-react';
import { DsaRoadmapData, DsaPhase } from '../types/dsaRoadmap';
import { useDsaProgressStore, computeDsaCompletion } from '../store/useDsaProgressStore';
import { RichText } from '../components/RichText';

interface DsaHomePageProps {
  data: DsaRoadmapData;
}

const PHASE_COLORS: Record<string, { bg: string; text: string; border: string; badge: string; accent: string }> = {
  A: { bg: 'bg-emerald-50/50', text: 'text-emerald-700', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-800', accent: '#059669' },
  B: { bg: 'bg-sky-50/50', text: 'text-sky-700', border: 'border-sky-200', badge: 'bg-sky-100 text-sky-800', accent: '#0284c7' },
  C: { bg: 'bg-purple-50/50', text: 'text-purple-700', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-800', accent: '#7c3aed' },
  D: { bg: 'bg-amber-50/50', text: 'text-amber-700', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-800', accent: '#d97706' },
  E: { bg: 'bg-rose-50/50', text: 'text-rose-700', border: 'border-rose-200', badge: 'bg-rose-100 text-rose-800', accent: '#e11d48' },
};

export const DsaHomePage: React.FC<DsaHomePageProps> = ({ data }) => {
  const checked = useDsaProgressStore((s) => s.checked);
  const selectedRole = useDsaProgressStore((s) => s.selectedRole);
  const setSelectedRole = useDsaProgressStore((s) => s.setSelectedRole);

  const allCheckableIds = React.useMemo(() => {
    const ids: string[] = [];
    for (const p of data.phases) {
      ids.push(...p.checkableIds);
    }
    ids.push(...data.appliedTrack.checkableIds);
    return Array.from(new Set(ids));
  }, [data]);

  const globalStats = computeDsaCompletion(checked, allCheckableIds);

  return (
    <main id="main">
      {/* ───────────────── HERO SECTION ───────────────── */}
      <section className="border-b border-slate-200/80 bg-gradient-to-b from-white via-white to-slate-50/60 py-12 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                <Code2 className="h-3.5 w-3.5" />
                <span>DSA + Interview Engineering · 100 Days</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-slate-900 leading-[1.08]">
                Recognise patterns in <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">90 seconds</span>. Code them under pressure.
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                A focused, timed execution system for <strong className="font-semibold text-slate-900">SDEs, ML Engineers, and Applied Scientists</strong>. 
                16 core patterns, ~250 curated problems, active concept drills, spaced repetition checkpoints, and a parallel ML engineering track.
              </p>

              {/* Progress Summary Card */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs max-w-xl">
                <div className="flex items-center justify-between text-xs font-mono-code text-slate-500 mb-2">
                  <span className="uppercase tracking-wider font-semibold text-slate-700 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Overall 100-Day DSA Progress
                  </span>
                  <span className="font-bold text-slate-900">
                    {globalStats.done} / {globalStats.total} completed ({globalStats.pct}%)
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 transition-all duration-300"
                    style={{ width: `${globalStats.pct}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <a
                  href="#phases"
                  className="inline-flex items-center gap-2.5 rounded-full bg-emerald-600 px-7 py-3.5 text-[15.5px] font-semibold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 transition-all"
                >
                  <span>Explore 100-Day Phases</span>
                  <ArrowDown className="h-4 w-4" />
                </a>
                <Link
                  to="/dsa/block/block-a1"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-[15.5px] font-semibold text-slate-800 hover:border-emerald-600 hover:text-emerald-700 transition-all"
                >
                  <span>Start at Day 1 (Block A1)</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/dsa/patterns"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/70 px-5 py-3.5 text-[15.5px] font-semibold text-emerald-800 hover:bg-emerald-100 transition-all"
                >
                  <Sparkles className="h-4 w-4 text-emerald-600" />
                  <span>16 Patterns &amp; Templates</span>
                </Link>
              </div>
            </div>

            {/* Right Visual: Curriculum Overview */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="font-mono-code text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                    The 100-Day Plan at a Glance
                  </span>
                  <span className="font-mono-code text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    5 Phases · 31 Blocks
                  </span>
                </div>

                <div className="space-y-2.5 text-sm">
                  {data.phases.map((phase) => {
                    const c = PHASE_COLORS[phase.code] || PHASE_COLORS.A;
                    const pStats = computeDsaCompletion(checked, phase.checkableIds);
                    return (
                      <div
                        key={phase.id}
                        className={`flex items-center justify-between p-3 rounded-xl border ${c.border} ${c.bg} transition-all hover:shadow-xs`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`flex h-7 w-7 items-center justify-center rounded-lg font-bold font-mono-code text-xs ${c.badge}`}>
                            {phase.code}
                          </span>
                          <div>
                            <div className="font-semibold text-slate-900 text-[13.5px]">
                              {phase.name}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono-code">
                              {phase.days} · {phase.blocks.length} blocks
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-slate-700 font-mono-code">
                            {pStats.pct}%
                          </span>
                          <div className="w-14 h-1.5 rounded-full bg-slate-200 mt-1 overflow-hidden">
                            <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${pStats.pct}%` }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Target Role Selector */}
                <div className="pt-2 border-t border-slate-100">
                  <div className="text-xs font-mono-code uppercase tracking-wider text-slate-500 mb-2 font-medium">
                    Select Your Target Role:
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-100">
                    {['Applied Scientist', 'ML Engineer', 'SDE'].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setSelectedRole(role)}
                        className={`rounded-lg py-1.5 text-xs font-medium transition ${
                          selectedRole === role
                            ? 'bg-white text-slate-900 font-bold shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-[11.5px] text-slate-500 leading-snug">
                    {selectedRole === 'Applied Scientist' && 'Focus on ML coding scratch implementations, probability, ML theory, and SQL in parallel with Phase A-D.'}
                    {selectedRole === 'ML Engineer' && 'Focus on vectorization, PyTorch/NumPy algorithms, ML system design, and Phase A-E.'}
                    {selectedRole === 'SDE' && 'Focus on pure LeetCode speed, CS fundamentals (OS, DB, Networks), and Low-Level Design.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── DAILY LOOP & MASTERY LADDER ───────────────── */}
      <section className="py-12 border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* The Daily Loop (4 slots) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-600" />
                <h2 className="font-display text-xl font-bold text-slate-900">
                  The Daily Loop (Do Not Improvise)
                </h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every study day has the same shape. Untimed practice trains a skill the interview does not test.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {data.dailyLoop.map((slot, i) => (
                  <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-sm text-slate-900">
                        <RichText text={slot.slot} />
                      </span>
                      <span className="font-mono-code text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                        {slot.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <RichText text={slot.activity} />
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* The Mastery Ladder (T0 -> T4) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-600" />
                <h2 className="font-display text-xl font-bold text-slate-900">
                  The Mastery Ladder (T0 → T4)
                </h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Interview bar: <strong>T3 on ~120 problems</strong> across all 16 patterns, plus T2 on the remainder.
              </p>
              <div className="space-y-2 pt-1">
                {data.masteryLadder.map((tier) => (
                  <div key={tier.tier} className="flex items-start gap-3 p-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition">
                    <span className="flex h-6 w-8 shrink-0 items-center justify-center rounded-md bg-slate-900 text-white font-mono-code text-xs font-bold">
                      {tier.tier}
                    </span>
                    <div className="text-xs flex-1">
                      <span className="font-bold text-slate-900">{tier.meaning}</span>
                      <span className="text-slate-500 font-mono-code ml-1.5">— {tier.evidence}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── PHASES & BLOCKS (MAIN CURRICULUM) ───────────────── */}
      <section id="phases" className="py-14 sm:py-20 bg-[#fcfcfd]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="font-mono-code text-xs uppercase tracking-wider text-emerald-700 font-semibold mb-1">
                Structured 100-Day Curriculum
              </div>
              <h2 className="font-display text-3xl font-bold text-slate-900">
                Explore the Phases &amp; Study Blocks
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/dsa/patterns"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
              >
                <span>View 16 Core Pattern Cards</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="space-y-10">
            {data.phases.map((phase) => {
              const c = PHASE_COLORS[phase.code] || PHASE_COLORS.A;
              const pStats = computeDsaCompletion(checked, phase.checkableIds);

              return (
                <div
                  key={phase.id}
                  id={phase.id}
                  className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden"
                >
                  {/* Phase Header */}
                  <div className={`p-5 sm:p-6 border-b border-slate-200 ${c.bg}`}>
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <span className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold font-mono-code ${c.badge} shadow-xs`}>
                          {phase.code}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono-code text-xs uppercase font-semibold text-slate-500">
                              Phase {phase.code} · {phase.days}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="font-mono-code text-xs font-medium text-slate-500">
                              {phase.blocksLabel || `${phase.blocks.length} Blocks`}
                            </span>
                          </div>
                          <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                            {phase.name}
                          </h3>
                        </div>
                      </div>

                      {/* Phase completion badge */}
                      <div className="flex items-center gap-3 bg-white/90 border border-slate-200/80 rounded-xl px-4 py-2">
                        <div className="text-right">
                          <div className="text-[11px] font-mono-code text-slate-500 uppercase tracking-wider">
                            Phase Mastery
                          </div>
                          <div className="font-mono-code text-sm font-bold text-slate-900">
                            {pStats.done} / {pStats.total} ({pStats.pct}%)
                          </div>
                        </div>
                        <div className="w-12 h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${pStats.pct}%` }} />
                        </div>
                      </div>
                    </div>

                    {phase.goal && (
                      <p className="mt-4 text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                        <strong className="font-semibold text-slate-800">Phase Goal:</strong> {phase.goal}
                      </p>
                    )}
                  </div>

                  {/* Blocks Grid */}
                  <div className="p-5 sm:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {phase.blocks.map((block) => {
                        const bStats = computeDsaCompletion(checked, block.checkableIds);
                        const isDone = bStats.total > 0 && bStats.done === bStats.total;

                        return (
                          <Link
                            key={block.id}
                            to={`/dsa/block/${block.id}`}
                            className="group flex flex-col justify-between p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-md transition-all"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-mono-code text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 group-hover:bg-emerald-100 group-hover:text-emerald-800 transition">
                                  {block.code}
                                </span>
                                <span className="font-mono-code text-[11px] text-slate-400">
                                  {block.days}
                                </span>
                              </div>
                              <h4 className="font-display text-[15px] font-bold text-slate-900 group-hover:text-emerald-700 transition">
                                {block.title}
                              </h4>
                              {block.objective && (
                                <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                  {block.objective}
                                </p>
                              )}
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono-code text-slate-500">
                              <span className="flex items-center gap-1.5">
                                {isDone ? (
                                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                                ) : (
                                  <Code2 className="h-3.5 w-3.5 text-slate-400" />
                                )}
                                <span>{block.practiceLadder.length + block.practiceTasks.length} problems</span>
                              </span>
                              <span className="font-semibold text-slate-700">
                                {bStats.done}/{bStats.total}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────── TEN RULES SECTION ───────────────── */}
      <section className="py-14 border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex items-center gap-2.5 mb-2">
            <ShieldCheck className="h-6 w-6 text-emerald-600" />
            <h2 className="font-display text-2xl font-bold text-slate-900">
              The 10 Rules That Decide Whether This Works
            </h2>
          </div>
          <p className="text-sm text-slate-600 mb-8 max-w-3xl">
            These rules are non-negotiable. Following them converts practice into real interview performance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.tenRules.map((r) => (
              <div key={r.number} className="flex items-start gap-3.5 p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xs transition">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white font-mono-code text-xs font-bold">
                  {r.number}
                </span>
                <div className="text-sm">
                  <div className="font-bold text-slate-900 leading-snug">{r.title}</div>
                  <div className="text-xs text-slate-600 mt-1 leading-relaxed">{r.rule}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
