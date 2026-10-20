import React from 'react';
import {
  ClipboardCheck,
  BookOpen,
  ChevronDown,
  Sigma,
  AlertTriangle,
  Library,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { RoadmapPhase } from '../types/roadmap';
import { useProgressStore, computeCompletion } from '../store/useProgressStore';
import { ContentElementsView } from './ContentElementsView';
import { RichText } from './RichText';

interface PhaseMasteryDrawerProps {
  phase: RoadmapPhase;
  defaultOpen?: boolean;
}

export const PhaseMasteryDrawer: React.FC<PhaseMasteryDrawerProps> = ({
  phase,
  defaultOpen = false,
}) => {
  const checked = useProgressStore((s) => s.checked);
  const setBatch = useProgressStore((s) => s.setBatch);
  const [activeTab, setActiveTab] = React.useState<'assessment' | 'playbook'>('assessment');

  const assessIds = phase.assessment?.checkableIds || [];
  const assessComp = computeCompletion(checked, assessIds);
  const isAllAssessDone = assessComp.total > 0 && assessComp.done === assessComp.total;

  // Flatten all appendix subBlocks for the Playbook view (excluding empty or redundant progress tables)
  const playbookBlocks = React.useMemo(() => {
    const blocks: { id: string; title: string; elements: typeof phase.appendix[0]['subBlocks'][0]['elements'] }[] = [];
    for (const app of phase.appendix || []) {
      for (const sb of app.subBlocks) {
        if (/progress tracker/i.test(sb.title)) continue;
        if (sb.elements.length === 0) continue;
        blocks.push({
          id: `${app.id}-${sb.title}`,
          title: sb.title,
          elements: sb.elements,
        });
      }
    }
    return blocks;
  }, [phase.appendix]);

  if (!phase.assessment && playbookBlocks.length === 0) {
    return null;
  }

  const getBlockIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('formula') || t.includes('estimation')) {
      return <Sigma className="h-4 w-4 text-[var(--phase-ac)] shrink-0" />;
    }
    if (t.includes('fail') || t.includes('common ways')) {
      return <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />;
    }
    if (t.includes('resource')) {
      return <Library className="h-4 w-4 text-sky-600 shrink-0" />;
    }
    if (t.includes('schedule')) {
      return <Calendar className="h-4 w-4 text-emerald-600 shrink-0" />;
    }
    return <Sparkles className="h-4 w-4 text-[var(--phase-ac)] shrink-0" />;
  };

  return (
    <details
      open={defaultOpen}
      className="group rounded-2xl border border-[var(--phase-br)] bg-white/95 shadow-2xs overflow-hidden transition-all"
    >
      <summary className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 cursor-pointer select-none list-none hover:bg-slate-50/80 transition-colors">
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--phase-bg)] text-[var(--phase-ac)] border border-[var(--phase-br)]">
            <ClipboardCheck className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <span className="font-mono-code text-[10px] font-bold uppercase tracking-wider text-[var(--phase-ac)] block">
              Phase {phase.phaseNum} Final Gate &amp; Engineering Playbook
            </span>
            <span className="font-display text-sm sm:text-base font-bold text-slate-900 truncate block">
              Final Assessment ({assessComp.done}/{assessComp.total}) · Formula Sheet · 10 Ways to Fail · Resources
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {assessComp.total > 0 && (
            <span className="rounded-full border border-[var(--phase-br)] bg-[var(--phase-bg)] px-2.5 py-0.5 font-mono-code text-[11px] font-bold text-[var(--phase-ac)]">
              Gate {assessComp.pct}%
            </span>
          )}
          <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180" />
        </div>
      </summary>

      <div className="border-t border-slate-200/80 p-5 space-y-5 bg-slate-50/40">
        {/* Sub-navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            {phase.assessment && (
              <button
                type="button"
                onClick={() => setActiveTab('assessment')}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 font-mono-code text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'assessment'
                    ? 'bg-[var(--phase-ac)] text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <ClipboardCheck className="h-3.5 w-3.5" />
                <span>Final Assessment ({assessComp.done}/{assessComp.total})</span>
              </button>
            )}
            {playbookBlocks.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('playbook')}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 font-mono-code text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'playbook'
                    ? 'bg-[var(--phase-ac)] text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>Formula Sheet, 10 Pitfalls &amp; Resources ({playbookBlocks.length})</span>
              </button>
            )}
          </div>

          {activeTab === 'assessment' && assessIds.length > 0 && (
            <button
              type="button"
              onClick={() => setBatch(assessIds, !isAllAssessDone)}
              className="rounded-xl border border-slate-200 bg-white px-3 py-1 font-mono-code text-xs font-semibold text-[var(--phase-ac)] hover:border-[var(--phase-ac)] cursor-pointer"
            >
              {isAllAssessDone ? 'Uncheck Phase Gate' : 'Mark Phase Gate Complete'}
            </button>
          )}
        </div>

        {/* Tab 1: Phase Final Assessment */}
        {activeTab === 'assessment' && phase.assessment && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {phase.assessment.categories.map((cat, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 space-y-3 ${
                  cat.title === 'Overview' ? 'md:col-span-2' : ''
                }`}
              >
                {cat.title !== 'Overview' && (
                  <h4 className="font-display text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                    <RichText text={cat.title} />
                  </h4>
                )}
                <ContentElementsView elements={cat.elements} />
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Phase Playbook (Formula Sheets, 10 Ways to Fail, Resources) */}
        {activeTab === 'playbook' && playbookBlocks.length > 0 && (
          <div className="space-y-4">
            {playbookBlocks.map((blk) => (
              <div
                key={blk.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 space-y-3"
              >
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  {getBlockIcon(blk.title)}
                  <h4 className="font-display text-base font-bold text-slate-900">
                    <RichText text={blk.title} />
                  </h4>
                </div>
                <ContentElementsView elements={blk.elements} />
              </div>
            ))}
          </div>
        )}
      </div>
    </details>
  );
};
