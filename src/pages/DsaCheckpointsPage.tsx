import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Award,
  ArrowLeft,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { DsaRoadmapData } from '../types/dsaRoadmap';
import { RichText } from '../components/RichText';

interface DsaCheckpointsPageProps {
  data: DsaRoadmapData;
}

export const DsaCheckpointsPage: React.FC<DsaCheckpointsPageProps> = ({ data }) => {
  return (
    <main id="main" className="min-h-screen pb-20 bg-[#fcfcfd]">
      {/* Top Banner */}
      <section className="border-b border-slate-200/80 bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-4">
          <Link
            to="/dsa"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to DSA 100-Day Roadmap</span>
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-0.5 text-xs font-semibold text-purple-800">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Evaluation &amp; Retention Milestones</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-2">
                Checkpoints &amp; 14-Week Schedule
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
                Closed-book timed assessments. Pass mark: 70%, with a T3 on at least half of attempted problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-12">
        {/* ───────────────── 5 CHECKPOINTS ───────────────── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-emerald-600" />
            <h2 className="font-display text-xl font-bold text-slate-900">
              The 5 Timed Closed-Book Checkpoints
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.checkpoints.map((cp) => (
              <div
                key={cp.checkpoint}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 hover:shadow-xs transition space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                    Checkpoint {cp.checkpoint}
                  </span>
                  <span className="font-mono-code text-xs font-bold text-slate-500">
                    Day {cp.day}
                  </span>
                </div>
                <div className="text-xs font-semibold text-emerald-900 font-mono-code">
                  ⏱ {cp.format}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  <RichText text={cp.content} />
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ───────────────── 14-WEEK SCHEDULE TABLE ───────────────── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-emerald-600" />
            <h2 className="font-display text-xl font-bold text-slate-900">
              The 14-Week Schedule at a Glance
            </h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 font-mono-code uppercase tracking-wider text-slate-600 text-[11px]">
                <tr>
                  <th className="px-3 py-2.5 w-14 text-center">Week</th>
                  <th className="px-4 py-2.5 w-24">Days</th>
                  <th className="px-3 py-2.5 w-16 text-center">Phase</th>
                  <th className="px-4 py-2.5">Blocks Covered</th>
                  <th className="px-4 py-2.5 w-44 font-semibold text-right">Checkpoint</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700 font-sans">
                {data.schedule.map((w) => (
                  <tr key={w.week} className="hover:bg-slate-50/70 transition">
                    <td className="px-3 py-3 text-center font-mono-code font-bold text-slate-900">
                      W{w.week}
                    </td>
                    <td className="px-4 py-3 font-mono-code text-xs text-slate-600">
                      {w.days}
                    </td>
                    <td className="px-3 py-3 text-center font-mono-code font-bold">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-xs">
                        {w.phase}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-800">
                      <RichText text={w.blocks} />
                    </td>
                    <td className="px-4 py-3 text-right font-mono-code text-xs font-bold text-emerald-700">
                      <RichText text={w.checkpoint} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ───────────────── THE WEAKNESS LEDGER ───────────────── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-amber-600" />
            <h2 className="font-display text-xl font-bold text-slate-900">
              The Weakness Ledger Discipline
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            Keep one document or spreadsheet. One row per problem you could not finish cleanly within the timebox.
            Do not write &ldquo;couldn&rsquo;t solve&rdquo; — be surgically specific: <em>&ldquo;did not see that the window was on the count of distinct chars&rdquo;</em>, <em>&ldquo;off-by-one on hi = mid&rdquo;</em>, <em>&ldquo;forgot dummy node on empty list&rdquo;</em>.
          </p>
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 font-mono-code text-xs text-amber-900 space-y-2">
            <div className="font-bold uppercase tracking-wider text-amber-950">Ledger Columns to Track:</div>
            <div>Date | Problem Name | Pattern | What Broke | First Re-solve (D+2) | Second Re-solve (D+7) | Status (open/closed)</div>
          </div>
        </div>
      </div>
    </main>
  );
};
