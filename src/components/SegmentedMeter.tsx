import React from 'react';

interface SegmentedMeterProps {
  totalSegments?: number;
  activeSegments?: number;
  completedRatio: number; // 0 to 1
  maxWidth?: string;
  size?: 'sm' | 'md';
}

export const SegmentedMeter: React.FC<SegmentedMeterProps> = ({
  totalSegments = 20,
  activeSegments,
  completedRatio,
  maxWidth = '220px',
  size = 'sm',
}) => {
  const segCount = Math.max(1, Math.min(totalSegments, 24));
  const plannedCount =
    activeSegments !== undefined ? Math.min(segCount, activeSegments) : segCount;
  const doneCount = Math.round(completedRatio * plannedCount);

  return (
    <div
      className="meter-track"
      style={{ maxWidth }}
      role="progressbar"
      aria-valuenow={Math.round(completedRatio * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {Array.from({ length: segCount }).map((_, idx) => {
        const isDone = idx < doneCount;
        const isPlanned = idx < plannedCount;
        return (
          <span
            key={idx}
            className={`meter-seg ${size === 'md' ? 'h-1.5' : 'h-1'} ${
              isDone ? 'is-done' : isPlanned ? 'is-planned' : ''
            }`}
          />
        );
      })}
    </div>
  );
};
