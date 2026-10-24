import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  GitCommitHorizontal,
  Code2,
  ChevronDown,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  Search,
  Check,
  Languages,
} from 'lucide-react';
import { RoadmapData } from '../types/roadmap';
import { DsaRoadmapData } from '../types/dsaRoadmap';
import { useProgressStore, computeCompletion } from '../store/useProgressStore';
import { useDsaProgressStore, computeDsaCompletion } from '../store/useDsaProgressStore';
import { useKoreanProgressStore, computeKoreanCompletion } from '../store/useKoreanProgressStore';
import { CommandPaletteModal } from './CommandPaletteModal';

interface HeaderProps {
  data: RoadmapData;
  dsaData: DsaRoadmapData;
  koreanData: RoadmapData;
}

export const Header: React.FC<HeaderProps> = ({ data, dsaData, koreanData }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isKorean = location.pathname.startsWith('/korean');
  const isDsa = location.pathname.startsWith('/dsa');
  const isMl = !isDsa && !isKorean;

  // ML Store
  const mlChecked = useProgressStore((s) => s.checked);
  const mlNotes = useProgressStore((s) => s.notes);
  const mlResetAll = useProgressStore((s) => s.resetAll);
  const mlImportProgress = useProgressStore((s) => s.importProgress);

  // DSA Store
  const dsaChecked = useDsaProgressStore((s) => s.checked);
  const dsaNotes = useDsaProgressStore((s) => s.notes);
  const dsaResetAll = useDsaProgressStore((s) => s.resetAll);
  const dsaImportProgress = useDsaProgressStore((s) => s.importProgress);

  // Korean Store
  const koreanChecked = useKoreanProgressStore((s) => s.checked);
  const koreanNotes = useKoreanProgressStore((s) => s.notes);
  const koreanResetAll = useKoreanProgressStore((s) => s.resetAll);
  const koreanImportProgress = useKoreanProgressStore((s) => s.importProgress);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [switcherOpen, setSwitcherOpen] = React.useState(false);
  const switcherRef = React.useRef<HTMLDivElement>(null);

  // Close switcher on click outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) {
        setSwitcherOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Compute completions
  const mlAllIds = React.useMemo(() => data.phases.flatMap((p) => p.checkableIds), [data.phases]);
  const mlOverall = computeCompletion(mlChecked, mlAllIds);

  const dsaAllIds = React.useMemo(() => {
    const ids: string[] = [];
    for (const p of dsaData.phases) ids.push(...p.checkableIds);
    ids.push(...dsaData.appliedTrack.checkableIds);
    return Array.from(new Set(ids));
  }, [dsaData]);
  const dsaOverall = computeDsaCompletion(dsaChecked, dsaAllIds);

  const koreanAllIds = React.useMemo(
    () => koreanData.phases.flatMap((p) => p.checkableIds),
    [koreanData.phases]
  );
  const koreanOverall = computeKoreanCompletion(koreanChecked, koreanAllIds);

  const currentOverall = isKorean ? koreanOverall : isDsa ? dsaOverall : mlOverall;

  const handleExport = () => {
    if (isKorean) {
      const payload = {
        roadmap: 'korean',
        version: 1,
        exportedAt: new Date().toISOString(),
        checked: koreanChecked,
        notes: koreanNotes,
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `korean-roadmap-progress-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (isDsa) {
      const payload = {
        roadmap: 'dsa',
        version: 1,
        exportedAt: new Date().toISOString(),
        checked: dsaChecked,
        notes: dsaNotes,
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dsa-100-days-progress-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const payload = {
        roadmap: 'ml',
        version: 1,
        exportedAt: new Date().toISOString(),
        checked: mlChecked,
        notes: mlNotes,
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ml-roadmap-progress-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (parsed && typeof parsed.checked === 'object') {
          if (isKorean) {
            koreanImportProgress(parsed.checked, parsed.notes || {});
          } else if (isDsa) {
            dsaImportProgress(parsed.checked, parsed.notes || {});
          } else {
            mlImportProgress(parsed.checked, parsed.notes || {});
          }
        }
      } catch {
        alert('Invalid progress JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Nav states
  const isMlHome = isMl && (location.pathname === '/' || location.pathname.startsWith('/level/'));
  const isProjects = isMl && location.pathname.startsWith('/projects');
  const isInterview = isMl && location.pathname.startsWith('/interview-prep');

  const isDsaHome = isDsa && (location.pathname === '/dsa' || location.pathname.startsWith('/dsa/block/'));
  const isDsaPatterns = location.pathname.startsWith('/dsa/patterns');
  const isDsaSql = location.pathname.startsWith('/dsa/sql');
  const isDsaCheatsheets = location.pathname.startsWith('/dsa/cheatsheets');
  const isDsaCsFundamentals = location.pathname.startsWith('/dsa/cs-fundamentals');
  const isDsaApplied = location.pathname.startsWith('/dsa/applied-track');
  const isDsaCheckpoints = location.pathname.startsWith('/dsa/checkpoints');
  const isDsaNegotiation = location.pathname.startsWith('/dsa/negotiation');

  const isKoreanHome = isKorean && (location.pathname === '/korean' || location.pathname.startsWith('/korean/level/'));
  const isKoreanProjects = location.pathname.startsWith('/korean/projects');
  const isKoreanQuestions = location.pathname.startsWith('/korean/questions');

  const activeIcon = isKorean ? (
    <Languages className="h-5 w-5" />
  ) : isDsa ? (
    <Code2 className="h-5 w-5" />
  ) : (
    <GitCommitHorizontal className="h-5 w-5" />
  );

  const activeColor = isKorean
    ? 'bg-indigo-600'
    : isDsa
    ? 'bg-emerald-600'
    : 'bg-[#6c5ce7]';

  const activeTitle = isKorean
    ? 'Korean Language Mastery'
    : isDsa
    ? 'DSA & Interview Engineering'
    : 'ML & Applied Scientist Roadmap';

  const activeSubtitle = isKorean
    ? '6 Phases · 16 Levels · TOPIK & Fluency'
    : isDsa
    ? '100 Days · 5 Phases · 22 Patterns Edition'
    : '7 Phases · 19 Levels · Checklist Edition';

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md relative z-50">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Track Switcher Dropdown */}
        <div className="relative" ref={switcherRef}>
          <button
            type="button"
            onClick={() => setSwitcherOpen(!switcherOpen)}
            className="flex items-center gap-3 group text-left focus:outline-none p-1.5 -m-1.5 rounded-xl hover:bg-slate-50 transition cursor-pointer"
            aria-label="Switch between ML and DSA roadmaps"
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm transition-transform group-hover:scale-105 ${activeColor}`}
            >
              {activeIcon}
            </span>
            <span className="flex flex-col">
              <span className="flex items-center gap-1.5 font-display text-[15px] sm:text-[15.5px] font-bold tracking-tight text-slate-900">
                {activeTitle}
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 group-hover:text-slate-700 transition-transform ${
                    switcherOpen ? 'rotate-180' : ''
                  }`}
                />
              </span>
              <span className="font-mono-code text-[11px] text-slate-500">
                {activeSubtitle}
              </span>
            </span>
          </button>

          {/* Dropdown Menu */}
          {switcherOpen && (
            <div className="absolute left-0 top-full mt-2 w-84 sm:w-96 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 text-[11px] font-mono-code uppercase tracking-wider text-slate-400 font-semibold border-b border-slate-100">
                Switch Active Roadmap Track
              </div>

              <div className="p-1 space-y-1">
                {/* ML Track Option */}
                <button
                  type="button"
                  onClick={() => {
                    setSwitcherOpen(false);
                    navigate('/');
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition cursor-pointer ${
                    isMl
                      ? 'bg-purple-50/70 border border-purple-200 text-slate-900'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#6c5ce7] text-white">
                      <GitCommitHorizontal className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-sm font-bold font-display text-slate-900 flex items-center gap-1.5">
                        ML &amp; Applied Scientist
                        {isMl && <Check className="h-3.5 w-3.5 text-[#6c5ce7]" />}
                      </div>
                      <div className="text-xs text-slate-500 font-mono-code">
                        7 Phases · 19 Levels · 26 Capstones
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono-code font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                    {mlOverall.pct}%
                  </span>
                </button>

                {/* DSA Track Option */}
                <button
                  type="button"
                  onClick={() => {
                    setSwitcherOpen(false);
                    navigate('/dsa');
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition cursor-pointer ${
                    isDsa
                      ? 'bg-emerald-50/70 border border-emerald-200 text-slate-900'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
                      <Code2 className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-sm font-bold font-display text-slate-900 flex items-center gap-1.5">
                        DSA + Interview Engineering
                        {isDsa && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                      </div>
                      <div className="text-xs text-slate-500 font-mono-code">
                        100 Days · 5 Phases · 22 Patterns
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono-code font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                    {dsaOverall.pct}%
                  </span>
                </button>

                {/* Korean Track Option */}
                <button
                  type="button"
                  onClick={() => {
                    setSwitcherOpen(false);
                    navigate('/korean');
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition cursor-pointer ${
                    isKorean
                      ? 'bg-indigo-50/70 border border-indigo-200 text-slate-900'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white">
                      <Languages className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-sm font-bold font-display text-slate-900 flex items-center gap-1.5">
                        Korean Language Mastery
                        {isKorean && <Check className="h-3.5 w-3.5 text-indigo-600" />}
                      </div>
                      <div className="text-xs text-slate-500 font-mono-code">
                        6 Phases · 16 Levels · 18 Capstones
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono-code font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                    {koreanOverall.pct}%
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Center / Right Navigation */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <nav className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 p-1" aria-label="Primary">
            {isKorean ? (
              <>
                <Link
                  to="/korean"
                  className={`rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                    isKoreanHome
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Roadmap
                </Link>
                <Link
                  to="/korean/projects"
                  className={`rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                    isKoreanProjects
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Capstones <span className="hidden sm:inline">({koreanData.meta.totalProjects})</span>
                </Link>
                <Link
                  to="/korean/questions"
                  className={`rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                    isKoreanQuestions
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Question Banks <span className="hidden sm:inline">({koreanData.meta.totalQuestions})</span>
                </Link>
              </>
            ) : isDsa ? (
              <>
                <Link
                  to="/dsa"
                  className={`rounded-full px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                    isDsaHome
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  100 Days
                </Link>
                <Link
                  to="/dsa/patterns"
                  className={`rounded-full px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                    isDsaPatterns
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  22 Patterns
                </Link>
                <Link
                  to="/dsa/sql"
                  className={`rounded-full px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                    isDsaSql
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  SQL Sheet
                </Link>
                <Link
                  to="/dsa/cheatsheets"
                  className={`rounded-full px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                    isDsaCheatsheets
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Cheatsheets
                </Link>
                <Link
                  to="/dsa/cs-fundamentals"
                  className={`rounded-full px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                    isDsaCsFundamentals
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  CS Fundamentals
                </Link>
                <Link
                  to="/dsa/applied-track"
                  className={`rounded-full px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                    isDsaApplied
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Applied Track
                </Link>
                <Link
                  to="/dsa/checkpoints"
                  className={`rounded-full px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                    isDsaCheckpoints
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Checkpoints
                </Link>
                <Link
                  to="/dsa/negotiation"
                  className={`rounded-full px-3 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                    isDsaNegotiation
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Negotiation
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className={`rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-all ${
                    isMlHome
                      ? 'bg-[#6c5ce7] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Roadmap
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
                  Interview Prep
                </Link>
              </>
            )}
          </nav>

          {/* Quick Actions (Search, Progress Pill, Export/Import/Reset) */}
          <div className="flex items-center gap-1.5">
            {!isDsa && (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                title={`Search ${isKorean ? 'Korean' : 'ML'} roadmap (Ctrl+K)`}
                className={`flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/90 px-3 py-1.5 text-xs font-mono-code text-slate-600 hover:border-indigo-500 hover:text-indigo-600 transition-colors cursor-pointer`}
              >
                <Search className={`h-3.5 w-3.5 ${isKorean ? 'text-indigo-600' : 'text-[#6c5ce7]'}`} />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden md:inline rounded border border-slate-200 bg-white px-1.5 py-0.2 text-[10px] font-semibold text-slate-400">
                  Ctrl K
                </kbd>
              </button>
            )}

            <div
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-mono-code text-slate-700 shadow-2xs"
              title={`${currentOverall.done} of ${currentOverall.total} items completed in active roadmap`}
            >
              <CheckCircle2
                className={`h-3.5 w-3.5 ${
                  isKorean ? 'text-indigo-600' : isDsa ? 'text-emerald-600' : 'text-[#6c5ce7]'
                }`}
              />
              <span className="font-semibold text-slate-900">{currentOverall.pct}%</span>
              <span className="hidden md:inline text-slate-400">
                ({currentOverall.done}/{currentOverall.total})
              </span>
            </div>

            <button
              type="button"
              onClick={handleExport}
              title={`Export ${isKorean ? 'Korean' : isDsa ? 'DSA' : 'ML'} progress as JSON`}
              className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 hover:border-slate-300 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title={`Import ${isKorean ? 'Korean' : isDsa ? 'DSA' : 'ML'} progress from JSON`}
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
            {currentOverall.done > 0 && (
              <button
                type="button"
                onClick={() => {
                  const trackName = isKorean ? 'Korean' : isDsa ? 'DSA' : 'ML';
                  if (window.confirm(`Reset all checked items in the active ${trackName} roadmap?`)) {
                    if (isKorean) koreanResetAll();
                    else if (isDsa) dsaResetAll();
                    else mlResetAll();
                  }
                }}
                title={`Reset all ${isKorean ? 'Korean' : isDsa ? 'DSA' : 'ML'} progress`}
                className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-400 hover:border-rose-300 hover:text-rose-600 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <CommandPaletteModal
        data={isKorean ? koreanData : data}
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        basePath={isKorean ? '/korean/level' : '/level'}
        projectsPath={isKorean ? '/korean/projects' : '/projects'}
        questionsPath={isKorean ? '/korean/questions' : '/interview-prep'}
      />
    </header>
  );
};
