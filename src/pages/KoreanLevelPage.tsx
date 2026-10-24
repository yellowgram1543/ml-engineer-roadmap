import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  CheckCheck,
  RotateCcw,
  Search,
  BookOpen,
  Award,
  HelpCircle,
  ClipboardCheck,
  Languages,
  Clock,
  Wrench,
  Sparkles,
  Volume2,
  FileText,
  MessageSquare,
  Eye,
  EyeOff,
} from 'lucide-react';
import { RoadmapData } from '../types/roadmap';
import { useKoreanProgressStore, computeKoreanCompletion } from '../store/useKoreanProgressStore';
import { ContentElementsView } from '../components/ContentElementsView';
import { RichText } from '../components/RichText';
import { KoreanMinimapDots } from '../components/KoreanMinimapDots';
import { KoreanAudioButton } from '../components/KoreanAudioButton';
import {
  getKoreanLevelWeights,
  KOREAN_TRACK_PATHS,
  KOREAN_TRACK_INTERPRETATION_NOTE,
} from '../data/koreanTrackWeights';
import {
  KOREAN_DIALOGUES,
  KOREAN_VOCABULARY,
} from '../data/koreanCurriculumContent';

interface KoreanLevelPageProps {
  data: RoadmapData;
}

const QUESTION_TYPE_STYLES: Record<string, string> = {
  Concept: 'bg-sky-50 text-sky-700 border-sky-200',
  Scenario: 'bg-amber-50 text-amber-800 border-amber-200',
  Debugging: 'bg-rose-50 text-rose-700 border-rose-200',
  Design: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Coding: 'bg-indigo-50 text-indigo-700 border-indigo-200', // Production/Speech
};

export const KoreanLevelPage: React.FC<KoreanLevelPageProps> = ({ data }) => {
  const { levelId } = useParams<{ levelId: string }>();

  const levelIndex = data.levels.findIndex(
    (l) => l.id === levelId || l.badge.toLowerCase() === levelId?.toLowerCase()
  );
  const level = levelIndex >= 0 ? data.levels[levelIndex] : null;

  const checked = useKoreanProgressStore((s) => s.checked);
  const toggleItem = useKoreanProgressStore((s) => s.toggleItem);
  const setBatch = useKoreanProgressStore((s) => s.setBatch);
  const selectedFocus = useKoreanProgressStore((s) => s.selectedFocus);
  const setSelectedFocus = useKoreanProgressStore((s) => s.setSelectedFocus);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [expandAll, setExpandAll] = React.useState<boolean>(false);
  const [showEnglishDialogue, setShowEnglishDialogue] = React.useState<boolean>(true);

  React.useEffect(() => {
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [levelId]);

  if (!level) {
    return <Navigate to="/korean" replace />;
  }

  const prevLevel = levelIndex > 0 ? data.levels[levelIndex - 1] : null;
  const nextLevel = levelIndex < data.levels.length - 1 ? data.levels[levelIndex + 1] : null;

  const levelComp = computeKoreanCompletion(checked, level.checkableIds);
  const phase = data.phases.find((p) => p.phaseNum === level.phaseNum);

  const weights = getKoreanLevelWeights(level.badge, selectedFocus);
  const activeTrack =
    KOREAN_TRACK_PATHS.find((t) => t.track === selectedFocus) || KOREAN_TRACK_PATHS[0];

  const levelDialogues = KOREAN_DIALOGUES[level.badge] || [];
  const levelVocab = KOREAN_VOCABULARY[level.badge] || [];

  const rawTools =
    level.dashboard['core tools'] ||
    level.dashboard['tools'] ||
    'Naver Dictionary, Anki, Voice Recorder';
  const toolTags = rawTools
    .split(/[,·]/)
    .map((t) => t.replace(/`/g, '').trim())
    .filter(Boolean);

  const handleCheckAll = () => {
    setBatch(level.checkableIds, true);
  };

  const handleUncheckAll = () => {
    setBatch(level.checkableIds, false);
  };

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
            <span className="font-mono-code font-bold text-indigo-600">L{level.badge}</span>
            <span className="hidden sm:inline font-display text-slate-900 truncate max-w-[160px]">
              {level.title}
            </span>
          </Link>

          <div className="flex-1 min-w-0 max-w-md hidden sm:block">
            <KoreanMinimapDots levels={data.levels} currentLevelId={level.id} variant="nav" />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono-code text-xs font-bold text-slate-700">
              {levelComp.pct}% complete
            </span>
          </div>
        </div>
      </div>

      {/* ───────────────── HEADER / HERO ───────────────── */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-mono-code text-slate-500 mb-4">
            <Link to="/korean" className="hover:text-indigo-600 transition">
              Korean Roadmap
            </Link>
            <span>/</span>
            <span>Phase {level.phaseNum} ({level.phaseName})</span>
            <span>/</span>
            <span className="text-slate-900 font-bold">Level {level.badge}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="rounded-md bg-indigo-600 px-2.5 py-1 text-xs font-bold font-mono-code text-white shadow-xs">
                  Level {level.badge}
                </span>
                <span className="text-xs font-mono-code text-slate-500">
                  Phase {level.phaseNum} · {level.phaseName}
                </span>
              </div>
              <h1 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                {level.title}
              </h1>
            </div>

            {/* Prev / Next Level Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              {prevLevel ? (
                <Link
                  to={`/korean/level/${prevLevel.id}`}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>L{prevLevel.badge}</span>
                </Link>
              ) : (
                <span className="flex items-center gap-1.5 rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs text-slate-400">
                  <ChevronLeft className="h-4 w-4" /> Start
                </span>
              )}

              {nextLevel ? (
                <Link
                  to={`/korean/level/${nextLevel.id}`}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  <span>L{nextLevel.badge}</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <span className="flex items-center gap-1.5 rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs text-slate-400">
                  End <ChevronRight className="h-4 w-4" />
                </span>
              )}
            </div>
          </div>

          {/* Goal quote */}
          {level.goal && (
            <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50/40 p-4 text-sm text-slate-700 leading-relaxed">
              <span className="font-bold text-indigo-900">Level Goal: </span>
              {level.goal}
            </div>
          )}

          {/* Prerequisites */}
          {level.prerequisites && (
            <div className="mt-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Prerequisites: </span>
              {level.prerequisites}
            </div>
          )}

          {/* Dashboard Table / Metrics */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3">
              <span className="text-[11px] font-mono-code uppercase text-slate-400 font-semibold block">
                Duration
              </span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                {level.dashboard['suggested duration'] || '2–3 weeks'}
              </span>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3">
              <span className="text-[11px] font-mono-code uppercase text-slate-400 font-semibold block">
                Difficulty
              </span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                {level.dashboard['difficulty'] || 'Beginner'}
              </span>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3">
              <span className="text-[11px] font-mono-code uppercase text-slate-400 font-semibold block">
                Study Time
              </span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                {level.dashboard['study commitment'] || '2–3 hrs/day'}
              </span>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-3">
              <span className="text-[11px] font-mono-code uppercase text-slate-400 font-semibold block">
                Capstone
              </span>
              <span className="font-semibold text-indigo-700 mt-0.5 block truncate">
                {level.dashboard['main project'] || (level.capstone ? level.capstone.title : 'Level Capstone')}
              </span>
            </div>
          </div>

          {/* Tools */}
          {toolTags.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
              <Wrench className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span className="font-semibold text-slate-700">Core Tools:</span>
              {toolTags.map((t, idx) => (
                <span
                  key={idx}
                  className="rounded-md bg-slate-100 px-2 py-0.5 font-mono-code text-[11px] text-slate-700 border border-slate-200/60"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* ───────────────── DUAL SUB-WEIGHT & PRODUCTION PRIORITY SECTION ───────────────── */}
          <div className="mt-6 space-y-3.5">
            {/* Active Learner Goal Track Banner & Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                <span className="rounded-lg bg-indigo-600 px-2.5 py-0.5 font-mono-code text-[11px] font-bold text-white shadow-xs">
                  Track: {activeTrack.label}
                </span>
                <span
                  className={`rounded-lg border px-2.5 py-0.5 font-mono-code text-[11px] font-bold ${
                    weights.studyDepth === 'Core Mastery'
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                      : weights.studyDepth === 'Working Fluency'
                      ? 'border-indigo-300 bg-white text-indigo-700'
                      : 'border-slate-300 bg-slate-100 text-slate-600'
                  }`}
                >
                  {weights.studyDepth}
                </span>
                <span className="text-slate-700 font-medium text-xs sm:text-sm">
                  <RichText text={weights.trackFocus} />
                </span>
              </div>

              {/* Track Switcher Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-mono-code text-slate-500 font-semibold uppercase tracking-wider">
                  Switch Goal:
                </span>
                {KOREAN_TRACK_PATHS.map((tp) => {
                  const isCurrent = tp.track === selectedFocus;
                  return (
                    <button
                      key={tp.track}
                      type="button"
                      onClick={() => setSelectedFocus(tp.track)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-mono-code transition cursor-pointer ${
                        isCurrent
                          ? 'bg-indigo-600 text-white font-bold shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                      title={tp.focus}
                    >
                      {tp.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dual Calibrated Weight Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Spoken Fluency Weight Card */}
              <section className="rounded-2xl border border-slate-200 border-l-4 border-l-rose-500 bg-white p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600">
                      <Volume2 className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                        Spoken Fluency Weight
                      </span>
                      <span className="font-mono-code text-[11px] font-bold text-rose-600 truncate block">
                        Audio Production &amp; Real-time Agility
                      </span>
                    </div>
                  </div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-rose-600 shrink-0">
                    {weights.fluencyScore}
                    <span className="font-mono-code text-sm font-medium text-slate-400">/10</span>
                  </div>
                </div>

                <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-400 to-rose-600 transition-all duration-300"
                    style={{ width: `${weights.fluencyScore * 10}%` }}
                  />
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <RichText text={weights.fluencyRationale} />
                </p>
              </section>

              {/* Textual & Literacy Weight Card */}
              <section className="rounded-2xl border border-slate-200 border-l-4 border-l-indigo-600 bg-white p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-600">
                      <FileText className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                        Textual &amp; Literacy Weight
                      </span>
                      <span className="font-mono-code text-[11px] font-bold text-indigo-600 truncate block">
                        Reading, Writing &amp; Discourse Logic
                      </span>
                    </div>
                  </div>
                  <div className="font-display text-2xl sm:text-3xl font-bold text-indigo-600 shrink-0">
                    {weights.literacyScore}
                    <span className="font-mono-code text-sm font-medium text-slate-400">/10</span>
                  </div>
                </div>

                <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 transition-all duration-300"
                    style={{ width: `${weights.literacyScore * 10}%` }}
                  />
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <RichText text={weights.literacyRationale} />
                </p>
              </section>
            </div>

            {/* Calibration note */}
            <p className="text-[11px] text-slate-500 italic px-1 leading-relaxed">
              {KOREAN_TRACK_INTERPRETATION_NOTE}
            </p>
          </div>

          {/* Level Progress Bar & Actions */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
            <div className="flex-1 min-w-[200px]">
              <div className="flex items-center justify-between text-xs font-mono-code mb-1.5">
                <span className="font-semibold text-slate-700">Level Progress</span>
                <span className="font-bold text-indigo-700">
                  {levelComp.pct}% ({levelComp.done}/{levelComp.total})
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full bg-indigo-600 transition-all duration-300"
                  style={{ width: `${levelComp.pct}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCheckAll}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                <CheckCheck className="h-3.5 w-3.5 text-emerald-600" />
                Check All
              </button>
              <button
                type="button"
                onClick={handleUncheckAll}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5 text-slate-400" />
                Reset
              </button>
              <button
                type="button"
                onClick={() => setExpandAll(!expandAll)}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                {expandAll ? 'Collapse All' : 'Expand All'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────── CONTENT BODY ───────────────── */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {/* Search within level */}
        <div className="mb-8">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={`Search within Level ${level.badge} (syllables, grammar rules, drills)...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-xs"
            />
          </div>
        </div>

        {/* ───────────────── SITUATIONAL DIALOGUES (실전 대화 실습) ───────────────── */}
        {levelDialogues.length > 0 && (
          <div className="mb-10 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50/50 via-white to-slate-50/50 p-6 sm:p-7 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-100/80 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
                  <MessageSquare className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-code text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                      Situational Dialogues · 실전 대화 실습
                    </span>
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 font-mono-code text-[10px] font-bold text-indigo-700">
                      {levelDialogues.length} Scenario{levelDialogues.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                    Authentic Conversational Scenarios with Native Audio
                  </h3>
                </div>
              </div>

              {/* Subtitle toggle */}
              <button
                type="button"
                onClick={() => setShowEnglishDialogue(!showEnglishDialogue)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs cursor-pointer"
              >
                {showEnglishDialogue ? <EyeOff className="h-3.5 w-3.5 text-slate-500" /> : <Eye className="h-3.5 w-3.5 text-indigo-600" />}
                <span>{showEnglishDialogue ? 'Hide English Subtitles' : 'Show English Subtitles'}</span>
              </button>
            </div>

            <div className="space-y-6">
              {levelDialogues.map((d) => (
                <div key={d.id} className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-2xs space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="font-display text-base font-bold text-slate-900">
                        {d.title}
                      </h4>
                      <p className="text-xs text-indigo-600 font-hangul font-medium">
                        {d.koreanTitle}
                      </p>
                    </div>
                    <span className="font-mono-code text-[11px] text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/70">
                      📍 {d.location}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 italic">
                    Context: {d.situation}
                  </p>

                  {/* Lines exchange */}
                  <div className="space-y-3 pt-1">
                    {d.lines.map((line, lIdx) => {
                      const isAlternate = lIdx % 2 !== 0;
                      return (
                        <div
                          key={lIdx}
                          className={`flex items-start gap-3 rounded-xl p-3.5 transition ${
                            isAlternate
                              ? 'bg-slate-50/80 border border-slate-200/60'
                              : 'bg-indigo-50/40 border border-indigo-100/70'
                          }`}
                        >
                          <div className="shrink-0 w-24">
                            <span className="block font-display text-xs font-bold text-slate-900 truncate">
                              {line.speaker}
                            </span>
                            {line.speakerRole && (
                              <span className="block font-mono-code text-[10px] text-slate-500 truncate">
                                {line.speakerRole}
                              </span>
                            )}
                          </div>

                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-hangul text-base sm:text-lg font-bold text-slate-900 leading-snug tracking-wide">
                                {line.korean}
                              </p>
                              <KoreanAudioButton koreanText={line.korean} text={line.korean} size="md" title="Listen to line in Korean" />
                            </div>

                            {showEnglishDialogue && (
                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                                {line.english}
                              </p>
                            )}

                            {line.notes && (
                              <p className="text-[11px] font-mono-code text-indigo-700 bg-indigo-50/80 inline-block px-2 py-0.5 rounded border border-indigo-200/60 mt-1">
                                💡 {line.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ───────────────── CORE VOCABULARY & WORDS TO LEARN (핵심 어휘) ───────────────── */}
        {levelVocab.length > 0 && (
          <div className="mb-10 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/40 via-white to-slate-50/50 p-6 sm:p-7 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-100/80 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
                  <BookOpen className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono-code text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                      Core Vocabulary &amp; Words to Learn · 핵심 어휘
                    </span>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-mono-code text-[10px] font-bold text-emerald-800">
                      {levelVocab.length} Target Words
                    </span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">
                    High-Frequency Korean Words with Audio &amp; Context Sentences
                  </h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {levelVocab.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-emerald-300 transition space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-hangul text-xl font-extrabold text-slate-900 tracking-wide">
                        {item.korean}
                      </span>
                      {item.hanja && (
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono-code text-[11px] font-semibold text-slate-600 border border-slate-200">
                          {item.hanja}
                        </span>
                      )}
                      <span className="font-mono-code text-xs text-slate-400">
                        [{item.romanization}]
                      </span>
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                        {item.partOfSpeech}
                      </span>
                    </div>
                    <KoreanAudioButton koreanText={item.korean} text={item.korean} size="md" title={`Listen to ${item.korean}`} />
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-slate-700">
                    {item.english}
                  </p>

                  <div className="rounded-lg bg-slate-50/80 border border-slate-100 p-2.5 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-hangul text-xs sm:text-sm font-medium text-slate-900">
                        {item.exampleKorean}
                      </p>
                      <KoreanAudioButton koreanText={item.exampleKorean} text={item.exampleKorean} size="sm" title="Listen to example" />
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      {item.exampleEnglish}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sections and Modules */}
        <div className="space-y-8">
          {level.sections.map((section) => {
            const secComp = computeKoreanCompletion(checked, section.checkableIds);

            return (
              <div
                key={section.id}
                id={section.id}
                className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden"
              >
                {/* Section Header */}
                <div className="border-b border-slate-100 bg-slate-50/60 p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono-code text-xs font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                      § {section.code}
                    </span>
                    <h2 className="font-display text-lg font-bold text-slate-900">
                      {section.title}
                    </h2>
                  </div>

                  <span className="font-mono-code text-xs text-slate-500 shrink-0">
                    {secComp.pct}% ({secComp.done}/{secComp.total})
                  </span>
                </div>

                {section.objective && (
                  <div className="p-4 sm:p-5 border-b border-slate-100 text-xs text-slate-600 bg-white italic">
                    {section.objective}
                  </div>
                )}

                {/* Modules list */}
                <div className="divide-y divide-slate-100">
                  {section.modules.map((module) => {
                    const modComp = computeKoreanCompletion(checked, module.checkableIds);

                    return (
                      <details
                        key={module.id}
                        open={expandAll || undefined}
                        className="group/mod p-4 sm:p-5 hover:bg-slate-50/30 transition"
                      >
                        <summary className="flex items-center justify-between gap-3 cursor-pointer select-none list-none">
                          <div className="flex items-center gap-2.5">
                            <ChevronDown className="h-4 w-4 text-slate-400 group-open/mod:rotate-180 transition-transform" />
                            <span className="font-mono-code text-xs font-semibold text-indigo-600">
                              {module.code}
                            </span>
                            <span className="font-display text-sm font-bold text-slate-900">
                              {module.title}
                            </span>
                            {module.kind === 'mini-project' && (
                              <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200">
                                Mini-project
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-xs font-mono-code text-slate-500">
                            <span>{modComp.done}/{modComp.total}</span>
                          </div>
                        </summary>

                        {/* Module Content Elements */}
                        <div className="mt-4 pt-3 border-t border-slate-100 pl-6">
                          <ContentElementsView
                            elements={module.elements}
                            checked={checked}
                            onToggle={toggleItem}
                          />
                        </div>
                      </details>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* ───────────────── CAPSTONE SECTION ───────────────── */}
        {level.capstone && (
          <div id="capstone" className="mt-12 rounded-2xl border border-amber-200 bg-amber-50/30 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow-xs">
                <Award className="h-5 w-5" />
              </span>
              <div>
                <span className="font-mono-code text-xs font-bold uppercase tracking-wider text-amber-700">
                  Level {level.badge} Capstone Project
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                  {level.capstone.title}
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              {level.capstone.subBlocks.map((block, idx) => (
                <div key={idx} className="rounded-xl border border-amber-200/80 bg-white p-5 shadow-xs">
                  <h3 className="font-display text-sm font-bold text-slate-900 mb-3">
                    {block.title}
                  </h3>
                  <ContentElementsView
                    elements={block.elements}
                    checked={checked}
                    onToggle={toggleItem}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ───────────────── QUESTION BANK SECTION ───────────────── */}
        {level.interviewBank && (
          <div id="questions" className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-xs">
                  <HelpCircle className="h-5 w-5" />
                </span>
                <div>
                  <span className="font-mono-code text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Graded Question Bank
                  </span>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                    Level {level.badge} Assessment Questions
                  </h2>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {level.interviewBank.groups.map((grp, idx) => (
                <div key={idx} className="border-t border-slate-100 pt-5">
                  <h3 className="font-display text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-indigo-600" />
                    {grp.title}
                  </h3>

                  <div className="space-y-2.5">
                    {grp.questions.map((q) => {
                      const isDone = !!checked[q.id];
                      const badgeClass = QUESTION_TYPE_STYLES[q.type] || QUESTION_TYPE_STYLES.Concept;

                      return (
                        <div
                          key={q.id}
                          onClick={() => toggleItem(q.id)}
                          className={`flex items-start gap-3 p-3 rounded-xl border transition cursor-pointer select-none ${
                            isDone
                              ? 'border-emerald-200 bg-emerald-50/40 text-slate-900'
                              : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => {}} // handled by parent onClick
                            className="mt-0.5 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono-code text-[11px] font-bold text-slate-500">
                                  #{q.number}
                                </span>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${badgeClass}`}>
                                  {q.type === 'Coding' ? 'Production' : q.type}
                                </span>
                              </div>
                              <KoreanAudioButton text={q.question} size="sm" />
                            </div>
                            <p className="text-xs sm:text-sm font-medium leading-relaxed font-hangul">
                              <RichText text={q.question} />
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ───────────────── FINAL ASSESSMENT ───────────────── */}
        {level.assessment && (
          <div id="assessment" className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-xs">
                <ClipboardCheck className="h-5 w-5" />
              </span>
              <div>
                <span className="font-mono-code text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Level Assessment Checklist
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                  {level.assessment.title}
                </h2>
              </div>
            </div>

            <div className="space-y-6">
              {level.assessment.categories.map((cat, idx) => (
                <div key={idx} className="border-t border-slate-100 pt-4">
                  <h3 className="font-display text-sm font-bold text-slate-900 mb-3">
                    {cat.title}
                  </h3>
                  <ContentElementsView
                    elements={cat.elements}
                    checked={checked}
                    onToggle={toggleItem}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Pagination */}
        <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-6">
          {prevLevel ? (
            <Link
              to={`/korean/level/${prevLevel.id}`}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous: Level {prevLevel.badge} — {prevLevel.title}</span>
            </Link>
          ) : (
            <div />
          )}

          {nextLevel ? (
            <Link
              to={`/korean/level/${nextLevel.id}`}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition"
            >
              <span>Next: Level {nextLevel.badge} — {nextLevel.title}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              to="/korean"
              className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition"
            >
              Back to Overview <ChevronRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
