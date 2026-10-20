import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { RoadmapLevel } from '../types/roadmap';
import { useProgressStore, computeCompletion } from '../store/useProgressStore';

interface MinimapDotsProps {
  levels: RoadmapLevel[];
  currentLevelId?: string;
  variant?: 'strip' | 'nav';
}

export const MinimapDots: React.FC<MinimapDotsProps> = ({
  levels,
  currentLevelId,
  variant = 'strip',
}) => {
  const checked = useProgressStore((s) => s.checked);

  return (
    <nav aria-label="All levels" className="w-full">
      <ol className="flex items-center gap-1 list-none m-0 p-0">
        {levels.map((lvl, idx) => {
          const isCurrent = lvl.id === currentLevelId;
          const comp = computeCompletion(checked, lvl.checkableIds);
          const isFullyDone = comp.total > 0 && comp.done === comp.total;
          const isStarted = comp.done > 0 && !isFullyDone;

          const isFirst = idx <= 1;
          const isLast = idx >= levels.length - 2;

          return (
            <li
              key={lvl.id}
              data-phase={lvl.phaseSlug}
              className="relative flex-1 min-w-0 group"
            >
              <Link
                to={`/level/${lvl.id}`}
                aria-current={isCurrent ? 'page' : undefined}
                className={`relative grid place-items-center w-full font-mono-code font-medium transition-all duration-150 border ${
                  variant === 'strip'
                    ? 'h-10 text-xs rounded-[7px]'
                    : 'h-7 text-[11px] rounded-[6px]'
                } ${
                  isCurrent
                    ? 'bg-[var(--phase-ac)] border-[var(--phase-ac)] text-white shadow-xs font-bold'
                    : isFullyDone
                    ? 'bg-[var(--phase-ac)]/90 border-[var(--phase-ac)] text-white'
                    : 'bg-[var(--phase-bg)] border-[var(--phase-br)] text-[var(--phase-ac)] hover:border-[var(--phase-ac)] hover:-translate-y-0.5'
                }`}
              >
                <span>{lvl.badge}</span>
                {/* Subtle bottom progress bar inside each minimap dot when partially completed */}
                {isStarted && !isCurrent && (
                  <span
                    className="absolute bottom-0.5 left-1 right-1 h-0.5 rounded-full bg-[var(--phase-ac)]/30 overflow-hidden"
                    aria-hidden="true"
                  >
                    <span
                      className="block h-full bg-[var(--phase-ac)]"
                      style={{ width: `${comp.pct}%` }}
                    />
                  </span>
                )}
                {isFullyDone && !isCurrent && (
                  <Check className="absolute top-0.5 right-0.5 h-2.5 w-2.5 text-white" />
                )}

                {/* Rich hover tooltip matching CampusX .dots__tip */}
                <span
                  className={`pointer-events-none invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute ${
                    variant === 'nav'
                      ? 'top-[calc(100%+10px)]'
                      : 'bottom-[calc(100%+10px)]'
                  } z-50 flex flex-col gap-0.5 rounded-[10px] bg-slate-900 px-3 py-2 text-left font-body text-[12.5px] font-medium leading-snug text-white shadow-lg w-max max-w-[230px] ${
                    isFirst
                      ? 'left-0'
                      : isLast
                      ? 'right-0'
                      : 'left-1/2 -translate-x-1/2'
                  }`}
                >
                  <span className="font-mono-code text-[10px] uppercase tracking-widest text-white/60">
                    {lvl.badge === 'B' ? 'PyTorch Bridge' : `L${lvl.badge}`} · {comp.pct}% done
                  </span>
                  <span className="font-semibold text-white">{lvl.title}</span>
                  <span className="font-mono-code text-[10px] uppercase tracking-widest text-white/60">
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
