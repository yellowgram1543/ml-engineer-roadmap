import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { RoadmapLevel } from '../types/roadmap';
import { useKoreanProgressStore, computeKoreanCompletion } from '../store/useKoreanProgressStore';

interface KoreanMinimapDotsProps {
  levels: RoadmapLevel[];
  currentLevelId?: string;
  variant?: 'strip' | 'nav';
}

const PHASE_COLORS: Record<number, { bg: string; border: string; text: string; activeBg: string }> = {
  1: { bg: 'bg-indigo-50/70', border: 'border-indigo-200', text: 'text-indigo-700', activeBg: 'bg-indigo-600' },
  2: { bg: 'bg-emerald-50/70', border: 'border-emerald-200', text: 'text-emerald-700', activeBg: 'bg-emerald-600' },
  3: { bg: 'bg-sky-50/70', border: 'border-sky-200', text: 'text-sky-700', activeBg: 'bg-sky-600' },
  4: { bg: 'bg-purple-50/70', border: 'border-purple-200', text: 'text-purple-700', activeBg: 'bg-purple-600' },
  5: { bg: 'bg-blue-50/70', border: 'border-blue-200', text: 'text-blue-700', activeBg: 'bg-blue-600' },
  6: { bg: 'bg-rose-50/70', border: 'border-rose-200', text: 'text-rose-700', activeBg: 'bg-rose-600' },
  7: { bg: 'bg-amber-50/70', border: 'border-amber-200', text: 'text-amber-700', activeBg: 'bg-amber-600' },
};

export const KoreanMinimapDots: React.FC<KoreanMinimapDotsProps> = ({
  levels,
  currentLevelId,
  variant = 'strip',
}) => {
  const checked = useKoreanProgressStore((s) => s.checked);

  return (
    <nav aria-label="Korean levels map" className="w-full">
      <ol className="flex items-center gap-1 list-none m-0 p-0">
        {levels.map((lvl, idx) => {
          const isCurrent = lvl.id === currentLevelId || lvl.badge === currentLevelId;
          const comp = computeKoreanCompletion(checked, lvl.checkableIds);
          const isFullyDone = comp.total > 0 && comp.done === comp.total;
          const isStarted = comp.done > 0 && !isFullyDone;

          const isFirst = idx <= 1;
          const isLast = idx >= levels.length - 2;

          const theme = PHASE_COLORS[lvl.phaseNum] || PHASE_COLORS[1];

          return (
            <li key={lvl.id} className="relative flex-1 min-w-0 group">
              <Link
                to={`/korean/level/${lvl.id}`}
                aria-current={isCurrent ? 'page' : undefined}
                className={`relative grid place-items-center w-full font-mono-code font-medium transition-all duration-150 border ${
                  variant === 'strip'
                    ? 'h-9 text-xs rounded-lg'
                    : 'h-7 text-[11px] rounded-md'
                } ${
                  isCurrent
                    ? `${theme.activeBg} border-transparent text-white shadow-xs font-bold scale-105 z-10`
                    : isFullyDone
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : `${theme.bg} ${theme.border} ${theme.text} hover:scale-105 hover:border-indigo-400`
                }`}
              >
                <span>{lvl.badge}</span>

                {/* Subtle progress fill */}
                {isStarted && !isCurrent && (
                  <span
                    className="absolute bottom-0.5 left-1 right-1 h-0.5 rounded-full bg-slate-200 overflow-hidden"
                    aria-hidden="true"
                  >
                    <span
                      className="block h-full bg-indigo-600"
                      style={{ width: `${comp.pct}%` }}
                    />
                  </span>
                )}

                {isFullyDone && !isCurrent && (
                  <Check className="absolute top-0.5 right-0.5 h-2 w-2 text-white stroke-[3]" />
                )}

                {/* Hover Tooltip */}
                <span
                  className={`pointer-events-none invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute ${
                    variant === 'nav'
                      ? 'top-[calc(100%+8px)]'
                      : 'bottom-[calc(100%+8px)]'
                  } z-50 flex flex-col gap-0.5 rounded-xl bg-slate-900 px-3 py-2 text-left font-sans text-xs font-medium leading-snug text-white shadow-xl w-max max-w-[240px] ${
                    isFirst
                      ? 'left-0'
                      : isLast
                      ? 'right-0'
                      : 'left-1/2 -translate-x-1/2'
                  }`}
                >
                  <span className="font-mono-code text-[10px] uppercase tracking-wider text-indigo-300">
                    Level {lvl.badge} · {comp.pct}% complete
                  </span>
                  <span className="font-bold text-white text-[13px]">{lvl.title}</span>
                  <span className="font-mono-code text-[10px] text-slate-400">
                    Phase {lvl.phaseNum} · {lvl.phaseName}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
