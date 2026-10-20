import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GitCommitHorizontal, Download, Upload, RotateCcw, CheckCircle2 } from 'lucide-react';
import { RoadmapData } from '../types/roadmap';
import { useProgressStore, computeCompletion } from '../store/useProgressStore';

interface HeaderProps {
  data: RoadmapData;
}

export const Header: React.FC<HeaderProps> = ({ data }) => {
  const location = useLocation();
  const checked = useProgressStore((s) => s.checked);
  const notes = useProgressStore((s) => s.notes);
  const resetAll = useProgressStore((s) => s.resetAll);
  const importProgress = useProgressStore((s) => s.importProgress);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const allIds = React.useMemo(
    () => data.phases.flatMap((p) => p.checkableIds),
    [data.phases]
  );
  const overall = computeCompletion(checked, allIds);

  const handleExport = () => {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      checked,
      notes,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ml-roadmap-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (parsed && typeof parsed.checked === 'object') {
          importProgress(parsed.checked, parsed.notes || {});
        }
      } catch {
        alert('Invalid progress JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const isHome =
    location.pathname === '/' || location.pathname.startsWith('/level/');
  const isProjects = location.pathname.startsWith('/projects');
  const isInterview = location.pathname.startsWith('/interview-prep');

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md relative z-50">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="ML Engineer & Applied Scientist Roadmap, home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6c5ce7] text-white shadow-sm transition-transform group-hover:scale-105">
            <GitCommitHorizontal className="h-5 w-5" />
          </span>
          <span className="flex flex-col">
            <span className="font-display text-[15.5px] font-bold tracking-tight text-slate-900">
              ML &amp; Applied Scientist Roadmap
            </span>
            <span className="font-mono-code text-[11px] text-slate-500">
              7 Phases · 19 Levels · Checklist Edition
            </span>
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-2 sm:gap-5">
          <nav className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 p-1" aria-label="Primary">
            <Link
              to="/"
              className={`rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                isHome
                  ? 'bg-[#6c5ce7] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              The Full <span className="hidden sm:inline">Roadmap</span>
            </Link>
            <Link
              to="/projects"
              className={`rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                isProjects
                  ? 'bg-[#6c5ce7] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Projects <span className="hidden sm:inline">({data.meta.totalProjects})</span>
            </Link>
            <Link
              to="/interview-prep"
              className={`rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                isInterview
                  ? 'bg-[#6c5ce7] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Interview <span className="hidden sm:inline">Prep</span>
            </Link>
          </nav>

          {/* Global Completion Pill & Backup Actions */}
          <div className="flex items-center gap-1.5">
            <div
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-mono-code text-slate-700 shadow-2xs"
              title={`${overall.done} of ${overall.total} total checklist items completed`}
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-[#6c5ce7]" />
              <span className="font-semibold text-slate-900">{overall.pct}%</span>
              <span className="hidden md:inline text-slate-400">
                ({overall.done}/{overall.total})
              </span>
            </div>

            <button
              type="button"
              onClick={handleExport}
              title="Export checklist progress as JSON"
              className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 hover:border-slate-300 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Import checklist progress from JSON"
              className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 hover:border-slate-300 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <Upload className="h-3.5 w-3.5" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              onChange={handleImport}
              className="hidden"
            />
            {overall.done > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset all checked items across the entire roadmap?')) {
                    resetAll();
                  }
                }}
                title="Reset all progress"
                className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-400 hover:border-rose-300 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
