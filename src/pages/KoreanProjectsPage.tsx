import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  Award,
  Layers,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { RoadmapData } from '../types/roadmap';
import { useKoreanProgressStore, computeKoreanCompletion } from '../store/useKoreanProgressStore';
import { ContentElementsView } from '../components/ContentElementsView';
import { KoreanMinimapDots } from '../components/KoreanMinimapDots';

interface KoreanProjectsPageProps {
  data: RoadmapData;
}

export const KoreanProjectsPage: React.FC<KoreanProjectsPageProps> = ({ data }) => {
  const checked = useKoreanProgressStore((s) => s.checked);
  const toggleItem = useKoreanProgressStore((s) => s.toggleItem);
  const [phaseFilter, setPhaseFilter] = React.useState<string>('all');

  const filteredProjects = React.useMemo(() => {
    if (phaseFilter === 'all') return data.projects;
    return data.projects.filter((p) => String(p.phaseNum) === phaseFilter);
  }, [data.projects, phaseFilter]);

  const allProjectIds = React.useMemo(
    () => data.projects.flatMap((p) => p.checkableIds),
    [data.projects]
  );
  const totalProjComp = computeKoreanCompletion(checked, allProjectIds);

  return (
    <div className="min-h-screen bg-[#fcfcfd]">
      {/* ───────────────── STICKY SECONDARY MINIMAP BAR ───────────────── */}
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
          <Link
            to="/korean"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition shrink-0"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="font-display font-bold text-slate-900">Capstones ({data.projects.length})</span>
          </Link>

          <div className="flex-1 min-w-0 max-w-md hidden sm:block">
            <KoreanMinimapDots levels={data.levels} variant="nav" />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono-code text-xs font-bold text-slate-700">
              {totalProjComp.pct}% done
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <Link
            to="/korean"
            className="inline-flex items-center gap-1.5 text-xs font-mono-code text-slate-500 hover:text-indigo-600 transition mb-3"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Korean Roadmap
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white shadow-xs">
                  <Award className="h-4 w-4" />
                </span>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Capstones &amp; Production Portfolios
                </h1>
              </div>
              <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
                18 rigorous, proof-of-work capstones designed to verify production ability — from audio reading corpora to live interviews, TOPIK 6 mock benchmarks, and literary analysis.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-right shrink-0">
              <span className="text-xs font-mono-code uppercase text-slate-500 font-semibold block">
                Portfolio Progress
              </span>
              <span className="text-2xl font-extrabold font-mono-code text-indigo-700">
                {totalProjComp.pct}%
              </span>
              <span className="text-[11px] font-mono-code text-slate-500 block">
                {totalProjComp.done} / {totalProjComp.total} criteria met
              </span>
            </div>
          </div>

          {/* Phase Filter Tabs */}
          <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={() => setPhaseFilter('all')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                phaseFilter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Phases ({data.projects.length})
            </button>
            {data.phases.map((p) => (
              <button
                key={p.phaseNum}
                type="button"
                onClick={() => setPhaseFilter(String(p.phaseNum))}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                  phaseFilter === String(p.phaseNum)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Phase {p.phaseNum} ({p.name})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-8">
        {filteredProjects.map((proj) => {
          const comp = computeKoreanCompletion(checked, proj.checkableIds);

          return (
            <div
              key={proj.id}
              id={proj.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs scroll-mt-20"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="rounded-md bg-amber-50 px-2 py-0.5 text-xs font-bold font-mono-code text-amber-800 border border-amber-200">
                      Capstone #{proj.number}
                    </span>
                    <span className="text-xs font-mono-code text-slate-500">
                      Phase {proj.phaseNum} ({proj.phaseName})
                    </span>
                    {proj.levelBadge && (
                      <span className="text-xs font-mono-code text-indigo-600 font-semibold">
                        · Level {proj.levelBadge}
                      </span>
                    )}
                  </div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                    {proj.title}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs font-mono-code font-bold text-slate-800">
                      {comp.pct}%
                    </div>
                    <div className="text-[11px] font-mono-code text-slate-500">
                      {comp.done}/{comp.total}
                    </div>
                  </div>
                  {proj.levelId && (
                    <Link
                      to={`/korean/level/${proj.levelId}#capstone`}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 transition flex items-center gap-1"
                    >
                      Jump to Level <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Sub-blocks / Acceptance Criteria */}
              <div className="mt-6 space-y-6">
                {proj.subBlocks.map((sb, idx) => (
                  <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                    <h3 className="font-display text-sm font-bold text-slate-900 mb-3">
                      {sb.title}
                    </h3>
                    <ContentElementsView
                      elements={sb.elements}
                      checked={checked}
                      onToggle={toggleItem}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
