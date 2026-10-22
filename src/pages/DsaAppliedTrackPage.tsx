import React from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  Database,
  Calculator,
  FlaskConical,
  Server,
  Layers,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { DsaRoadmapData } from '../types/dsaRoadmap';
import { useDsaProgressStore, computeDsaCompletion } from '../store/useDsaProgressStore';
import { RichText } from '../components/RichText';
import { DsaContentElementsView } from '../components/DsaContentElementsView';

interface DsaAppliedTrackPageProps {
  data: DsaRoadmapData;
}

const SECTION_ICONS: Record<string, React.ReactNode> = {
  '1': <FileCode className="h-4 w-4" />,
  '2': <Database className="h-4 w-4" />,
  '3': <Brain className="h-4 w-4" />,
  '4': <Calculator className="h-4 w-4" />,
  '5': <FlaskConical className="h-4 w-4" />,
  '6': <Server className="h-4 w-4" />,
  '7': <Layers className="h-4 w-4" />,
};

export const DsaAppliedTrackPage: React.FC<DsaAppliedTrackPageProps> = ({ data }) => {
  const checked = useDsaProgressStore((s) => s.checked);
  const track = data.appliedTrack;
  const trackStats = computeDsaCompletion(checked, track.checkableIds);

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
              <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-0.5 text-xs font-semibold text-sky-800">
                <Brain className="h-3.5 w-3.5" />
                <span>Parallel Specialization Track</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-2">
                {track.title}
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-3xl">
                {track.subtitle}
              </p>
            </div>

            {/* Track Progress */}
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
              <div className="text-right">
                <div className="text-[11px] font-mono-code text-slate-500 uppercase tracking-wider">
                  Track Mastery
                </div>
                <div className="font-mono-code text-sm font-bold text-slate-900">
                  {trackStats.done} / {trackStats.total} ({trackStats.pct}%)
                </div>
              </div>
              <div className="w-14 h-2.5 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-sky-600 rounded-full transition-all" style={{ width: `${trackStats.pct}%` }} />
              </div>
            </div>
          </div>

          {track.intro && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-mono-code">
              <RichText text={track.intro} />
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-12">
        {/* ───────────────── ROLE MATRIX ───────────────── */}
        {track.roleMatrix && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Who Needs What — Role Matrix
            </h2>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 font-mono-code uppercase tracking-wider text-slate-600 text-[11px]">
                  <tr>
                    {track.roleMatrix.headers.map((h, i) => (
                      <th key={i} className="px-4 py-2.5 font-semibold">
                        <RichText text={h} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                  {track.roleMatrix.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/70">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-4 py-2.5 font-medium">
                          <RichText text={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ───────────────── ALL 7 SECTIONS ───────────────── */}
        <div className="space-y-10">
          {track.sections.map((sec) => {
            const secStats = computeDsaCompletion(checked, sec.checkableIds);
            const icon = SECTION_ICONS[sec.sectionNum] || <Sparkles className="h-4 w-4" />;

            return (
              <div
                key={sec.id}
                id={sec.id}
                className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden"
              >
                {/* Header */}
                <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/60 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-800 font-mono-code font-bold text-sm">
                      §{sec.sectionNum}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-slate-900">
                        {sec.title}
                      </h3>
                      {sec.format && (
                        <p className="text-xs text-slate-500 font-mono-code mt-0.5">
                          <strong className="text-slate-700">Format: </strong>
                          <RichText text={sec.format} />
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono-code text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
                    <CheckCircle2 className="h-3.5 w-3.5 text-sky-600" />
                    <span>{secStats.done}/{secStats.total} ({secStats.pct}%)</span>
                  </div>
                </div>

                {/* Content Elements */}
                {sec.sectionNum === '2' && (
                  <div className="mx-5 sm:mx-6 mt-5 p-4 rounded-xl bg-gradient-to-r from-sky-50 via-indigo-50/60 to-emerald-50 border border-sky-200 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-white shadow-xs">
                        <Database className="h-5 w-5" />
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          Dedicated SQL Patterns &amp; Interview Playbook
                          <span className="text-[10px] font-mono-code font-bold uppercase bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full border border-sky-200">
                            Dedicated Sheet
                          </span>
                        </h4>
                        <p className="text-xs text-slate-600">
                          Complete production SQL templates for all 10 patterns, code solutions for all 10 practice queries, execution order, and the 7 deadly SQL traps.
                        </p>
                      </div>
                    </div>
                    <Link
                      to="/dsa/sql"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-600 text-white text-xs font-semibold hover:bg-sky-700 transition shadow-xs"
                    >
                      <span>Open SQL Playbook</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                )}

                <div className="p-5 sm:p-6 space-y-4">
                  <DsaContentElementsView elements={sec.elements} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};
