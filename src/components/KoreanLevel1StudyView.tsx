import React from 'react';
import {
  MessageSquare,
  BookOpen,
  Sparkles,
  Volume2,
  FileText,
  CheckCircle2,
  ChevronRight,
  Eye,
  EyeOff,
  HelpCircle,
  PenTool,
  RotateCcw,
  Headphones,
  Award,
  Layers,
  ArrowRight,
} from 'lucide-react';
import {
  KOREAN_LEVEL_1_UNITS,
  KOREAN_CHECKPOINTS,
  KoreanUnit,
  KoreanLesson,
  KoreanCheckpoint,
} from '../data/koreanLevel1Curriculum';
import { KoreanAudioButton } from './KoreanAudioButton';
import { RichText } from './RichText';

export const KoreanLevel1StudyView: React.FC = () => {
  const [selectedUnitId, setSelectedUnitId] = React.useState<string>(KOREAN_LEVEL_1_UNITS[0].id);
  const [selectedLessonId, setSelectedLessonId] = React.useState<string>(
    KOREAN_LEVEL_1_UNITS[0].lessons[0].id
  );
  const [activeStep, setActiveStep] = React.useState<number>(1);
  const [showEnglishDialogue, setShowEnglishDialogue] = React.useState<boolean>(true);
  const [showReadingAnswers, setShowReadingAnswers] = React.useState<boolean>(false);
  const [selectedPart, setSelectedPart] = React.useState<string>('all');
  const [activeCheckpoint, setActiveCheckpoint] = React.useState<KoreanCheckpoint | null>(null);

  // User writing submissions stored in localStorage
  const [userWriting, setUserWriting] = React.useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('korean_level1_user_writing');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleSaveWriting = (lessonId: string, text: string) => {
    const next = { ...userWriting, [lessonId]: text };
    setUserWriting(next);
    try {
      localStorage.setItem('korean_level1_user_writing', JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  };

  const filteredUnits = React.useMemo(() => {
    if (selectedPart === 'all') return KOREAN_LEVEL_1_UNITS;
    return KOREAN_LEVEL_1_UNITS.filter((u) => u.partId === selectedPart);
  }, [selectedPart]);

  const currentUnit = React.useMemo(() => {
    return KOREAN_LEVEL_1_UNITS.find((u) => u.id === selectedUnitId) || KOREAN_LEVEL_1_UNITS[0];
  }, [selectedUnitId]);

  const currentLesson = React.useMemo(() => {
    return (
      currentUnit.lessons.find((l) => l.id === selectedLessonId) || currentUnit.lessons[0]
    );
  }, [currentUnit, selectedLessonId]);

  const handleSelectUnit = (unit: KoreanUnit) => {
    setSelectedUnitId(unit.id);
    setSelectedLessonId(unit.lessons[0].id);
    setActiveStep(1);
    setActiveCheckpoint(null);
  };

  const handleSelectLesson = (lesson: KoreanLesson) => {
    setSelectedLessonId(lesson.id);
    setActiveStep(1);
    setActiveCheckpoint(null);
  };

  return (
    <div className="space-y-8">
      {/* ───────────────── HEADER / HERO BANNER ───────────────── */}
      <div className="rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-md bg-indigo-500/30 border border-indigo-400/40 px-2.5 py-0.5 font-mono-code text-xs font-bold text-indigo-200">
                SNU Korean+ 1A Inspired Standard
              </span>
              <span className="rounded-md bg-emerald-500/30 border border-emerald-400/40 px-2.5 py-0.5 font-mono-code text-xs font-bold text-emerald-200">
                5-Step Teaching Method
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              Beginner Korean Level 1 · 초급 1 한국어
            </h2>
            <p className="mt-2 text-sm text-indigo-200/90 max-w-2xl leading-relaxed">
              Every lesson begins with a real Korean dialogue, introduces vocabulary and grammar in context, trains listening &amp; shadowing, and culminates in reading and guided writing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {KOREAN_CHECKPOINTS.map((cp) => (
              <button
                key={cp.id}
                type="button"
                onClick={() => setActiveCheckpoint(cp)}
                className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition cursor-pointer shadow-xs ${
                  activeCheckpoint?.id === cp.id
                    ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                }`}
              >
                <Award className="h-3.5 w-3.5" />
                <span>Gate {cp.checkpointCode}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 5-Step Method Visual Breadcrumb */}
        <div className="mt-6 pt-5 border-t border-indigo-700/50 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          {[
            { num: 1, name: '1. 대화 Conversation', desc: 'Real situation dialogue' },
            { num: 2, name: '2. 어휘 Vocabulary', desc: 'Target words with audio' },
            { num: 3, name: '3. 문법 Grammar', desc: 'Formulas & contrast notes' },
            { num: 4, name: '4. 말하기·듣기 Speaking', desc: 'Shadowing & substitution' },
            { num: 5, name: '5. 읽기·쓰기 Reading', desc: 'Comprehension & writing' },
          ].map((s) => (
            <div
              key={s.num}
              onClick={() => {
                setActiveStep(s.num);
                setActiveCheckpoint(null);
              }}
              className={`rounded-xl p-2.5 border transition cursor-pointer ${
                activeStep === s.num && !activeCheckpoint
                  ? 'bg-white text-indigo-950 border-white font-bold shadow-xs'
                  : 'bg-indigo-950/40 text-indigo-200 border-indigo-700/40 hover:bg-indigo-950/70'
              }`}
            >
              <span className="block font-display text-[11px] font-bold">{s.name}</span>
              <span className="block text-[10px] opacity-75 font-mono-code truncate">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ───────────────── PART & UNIT NAVIGATION BAR ───────────────── */}
      <div className="space-y-4">
        {/* Part Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'all', label: 'All Units (0–16)' },
            { id: '0', label: 'Unit 0: Hangul' },
            { id: 'A', label: 'Part A: Identity & Belongings (1–3)' },
            { id: 'B', label: 'Part B: Everyday Needs (4–8)' },
            { id: 'C', label: 'Part C: Life & Daily Routine (9–13)' },
            { id: 'D', label: 'Part D: Connecting Korean (14–16)' },
          ].map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedPart(p.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition shrink-0 cursor-pointer border ${
                selectedPart === p.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Units Carousel / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredUnits.map((u) => {
            const isSelected = u.id === selectedUnitId && !activeCheckpoint;
            return (
              <button
                key={u.id}
                type="button"
                onClick={() => handleSelectUnit(u)}
                className={`text-left rounded-xl p-3.5 border transition cursor-pointer space-y-1 ${
                  isSelected
                    ? 'bg-indigo-50/90 border-indigo-300 ring-2 ring-indigo-200 shadow-2xs'
                    : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="font-mono-code text-[11px] font-bold text-indigo-700">
                    Unit {u.unitNum}
                  </span>
                  <span className="font-mono-code text-[10px] text-slate-400">
                    {u.lessons.length} Lessons
                  </span>
                </div>
                <h4 className="font-display text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                  {u.title}
                </h4>
                <p className="font-hangul text-[11px] text-slate-500 line-clamp-1">
                  {u.koreanTitle}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ───────────────── CHECKPOINT MODAL / VIEW ───────────────── */}
      {activeCheckpoint ? (
        <div className="rounded-2xl border border-amber-300 bg-amber-50/30 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-amber-200 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-slate-950 font-bold shadow-xs">
                {activeCheckpoint.checkpointCode}
              </span>
              <div>
                <span className="font-mono-code text-xs font-bold uppercase tracking-wider text-amber-700">
                  Curriculum Assessment Gate
                </span>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  {activeCheckpoint.title}
                </h3>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setActiveCheckpoint(null)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
            >
              Back to Lessons
            </button>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900">Prerequisites &amp; Target Mastery Standards</h4>
            <p className="text-xs text-slate-600 italic">{activeCheckpoint.prerequisites}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {activeCheckpoint.targetSkills.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-amber-200/60">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Spoken Simulation */}
          <div className="rounded-xl border border-amber-200 bg-white p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono-code text-xs font-bold uppercase text-amber-800 flex items-center gap-1.5">
                <Headphones className="h-4 w-4" /> Spoken Role-Play Simulation
              </span>
              <KoreanAudioButton
                koreanText={activeCheckpoint.spokenSimulation.sampleKoreanResponse}
                text={activeCheckpoint.spokenSimulation.sampleKoreanResponse}
                size="md"
                title="Listen to native model response"
              />
            </div>
            <p className="text-xs text-slate-600">
              <strong>Scenario:</strong> {activeCheckpoint.spokenSimulation.scenario}
            </p>
            <div className="rounded-lg bg-slate-50 p-3 border border-slate-100 text-xs">
              <strong>Prompt:</strong> {activeCheckpoint.spokenSimulation.prompt}
            </div>
            <div className="rounded-lg bg-amber-50/60 p-3.5 border border-amber-200 space-y-1">
              <span className="font-mono-code text-[11px] font-bold text-amber-900 block">Model Korean Response:</span>
              <p className="font-hangul text-base font-bold text-slate-900">
                {activeCheckpoint.spokenSimulation.sampleKoreanResponse}
              </p>
              <p className="text-xs text-slate-600">{activeCheckpoint.spokenSimulation.english}</p>
            </div>
          </div>

          {/* Written Task */}
          <div className="rounded-xl border border-amber-200 bg-white p-5 space-y-3">
            <span className="font-mono-code text-xs font-bold uppercase text-amber-800 flex items-center gap-1.5">
              <PenTool className="h-4 w-4" /> Written Submission Gate
            </span>
            <p className="text-xs text-slate-700">
              <strong>Task:</strong> {activeCheckpoint.writtenTask.prompt} ({activeCheckpoint.writtenTask.wordCountTarget})
            </p>
            <div className="rounded-lg bg-slate-50 p-3 border border-slate-100 space-y-1.5">
              <span className="font-mono-code text-[11px] font-bold text-slate-500 block">Sample High-Scoring Submission:</span>
              <p className="font-hangul text-sm font-medium text-slate-900 leading-relaxed">
                {activeCheckpoint.writtenTask.sampleSubmission}
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* ───────────────── ACTIVE LESSON VIEW (5-STEP METHOD) ───────────────── */
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
          {/* Lesson Selection Pills & Title Bar */}
          <div className="border-b border-slate-200 bg-slate-50/70 p-5 sm:p-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-indigo-600 px-2.5 py-1 text-xs font-bold font-mono-code text-white">
                  Lesson {currentLesson.code}
                </span>
                <span className="font-mono-code text-xs font-semibold text-slate-500">
                  {currentUnit.title}
                </span>
              </div>

              {/* Lesson Switcher within Current Unit */}
              <div className="flex items-center gap-1.5">
                {currentUnit.lessons.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => handleSelectLesson(l)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-mono-code transition cursor-pointer border ${
                      l.id === selectedLessonId
                        ? 'bg-indigo-600 text-white font-bold border-indigo-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Lesson {l.code}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
                {currentLesson.title}
              </h3>
              <p className="font-hangul text-sm font-semibold text-indigo-600 mt-0.5">
                {currentLesson.koreanTitle}
              </p>
            </div>

            {/* Context & Pragmatics badge */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-600">
              <span className="rounded-md bg-white border border-slate-200/80 px-2.5 py-1 font-mono-code text-slate-700">
                📍 {currentLesson.location}
              </span>
              <span className="rounded-md bg-white border border-slate-200/80 px-2.5 py-1 text-slate-700">
                <strong>Context:</strong> {currentLesson.situation}
              </span>
            </div>
          </div>

          {/* 5-Step Tab Navigation Bar */}
          <div className="flex items-center border-b border-slate-200 bg-white overflow-x-auto text-xs font-semibold">
            {[
              { num: 1, label: '1. 대화 (Conversation)', icon: <MessageSquare className="h-4 w-4" /> },
              { num: 2, label: '2. 어휘 (Vocabulary)', icon: <BookOpen className="h-4 w-4" /> },
              { num: 3, label: '3. 문법 (Grammar)', icon: <Sparkles className="h-4 w-4" /> },
              { num: 4, label: '4. 말하기·듣기 (Speaking)', icon: <Headphones className="h-4 w-4" /> },
              { num: 5, label: '5. 읽기·쓰기 (Reading & Writing)', icon: <FileText className="h-4 w-4" /> },
            ].map((t) => (
              <button
                key={t.num}
                type="button"
                onClick={() => setActiveStep(t.num)}
                className={`flex items-center gap-2 px-5 py-3.5 transition shrink-0 border-b-2 cursor-pointer ${
                  activeStep === t.num
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50/30'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* ───────────────── STEP CONTENT BODIES ───────────────── */}
          <div className="p-6 sm:p-8">
            {/* STEP 1: CONVERSATION */}
            {activeStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="font-display text-base font-bold text-slate-900">
                      Step 1: Real-life Conversational Dialogue (실전 대화)
                    </h4>
                    <p className="text-xs text-slate-500">
                      Listen to native pronunciation and observe grammar and vocabulary in action.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowEnglishDialogue(!showEnglishDialogue)}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                  >
                    {showEnglishDialogue ? <EyeOff className="h-3.5 w-3.5 text-slate-500" /> : <Eye className="h-3.5 w-3.5 text-indigo-600" />}
                    <span>{showEnglishDialogue ? 'Hide English' : 'Show English'}</span>
                  </button>
                </div>

                {/* Cultural & Pragmatic Etiquette Note */}
                {currentLesson.pragmaticNote && (
                  <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 text-xs text-indigo-900 space-y-1">
                    <span className="font-mono-code font-bold uppercase tracking-wider text-indigo-700 block">
                      💡 Cultural &amp; Pragmatic Note
                    </span>
                    <p className="leading-relaxed">{currentLesson.pragmaticNote}</p>
                  </div>
                )}

                {/* Dialogue Lines */}
                <div className="space-y-3">
                  {currentLesson.dialogue.map((line, idx) => {
                    const isAlternate = idx % 2 !== 0;
                    return (
                      <div
                        key={idx}
                        className={`flex items-start gap-4 rounded-xl p-4 transition ${
                          isAlternate
                            ? 'bg-slate-50/90 border border-slate-200/70'
                            : 'bg-indigo-50/40 border border-indigo-100/80'
                        }`}
                      >
                        <div className="shrink-0 w-24">
                          <span className="block font-display text-xs font-bold text-slate-900 truncate">
                            {line.speaker}
                          </span>
                          <span className="block font-mono-code text-[10px] text-slate-500 truncate">
                            {line.speakerRole}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex items-start justify-between gap-3">
                            <p className="font-hangul text-lg sm:text-xl font-bold text-slate-900 tracking-wide leading-snug">
                              {line.korean}
                            </p>
                            <KoreanAudioButton
                              koreanText={line.korean}
                              text={line.korean}
                              size="md"
                              title="Listen in Korean"
                            />
                          </div>

                          {showEnglishDialogue && (
                            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                              {line.english}
                            </p>
                          )}

                          {line.notes && (
                            <span className="inline-block rounded bg-white/90 border border-slate-200/70 px-2 py-0.5 font-mono-code text-[10px] text-indigo-700 mt-1">
                              {line.notes}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-xs font-semibold text-white transition shadow-xs cursor-pointer"
                  >
                    <span>Proceed to Step 2: Vocabulary</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: VOCABULARY */}
            {activeStep === 2 && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h4 className="font-display text-base font-bold text-slate-900">
                    Step 2: Target Vocabulary &amp; Expressions (어휘와 표현)
                  </h4>
                  <p className="text-xs text-slate-500">
                    {currentLesson.vocabulary.length} core words introduced in this lesson with audio pronunciation and example sentences.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {currentLesson.vocabulary.map((v) => (
                    <div
                      key={v.id}
                      className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-emerald-300 transition space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="font-hangul text-xl font-extrabold text-slate-900 tracking-wide">
                            {v.korean}
                          </span>
                          {v.hanja && (
                            <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono-code text-[11px] text-slate-600 border border-slate-200">
                              {v.hanja}
                            </span>
                          )}
                          <span className="font-mono-code text-xs text-slate-400">
                            [{v.romanization}]
                          </span>
                          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                            {v.partOfSpeech}
                          </span>
                        </div>
                        <KoreanAudioButton
                          koreanText={v.korean}
                          text={v.korean}
                          size="md"
                          title={`Listen to ${v.korean}`}
                        />
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-slate-700">
                        {v.english}
                      </p>

                      <div className="rounded-lg bg-slate-50/80 border border-slate-100 p-2.5 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-hangul text-xs sm:text-sm font-medium text-slate-900">
                            {v.exampleKorean}
                          </p>
                          <KoreanAudioButton
                            koreanText={v.exampleKorean}
                            text={v.exampleKorean}
                            size="sm"
                            title="Listen to example sentence"
                          />
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug">
                          {v.exampleEnglish}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                  >
                    Back to Dialogue
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep(3)}
                    className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-xs font-semibold text-white transition shadow-xs cursor-pointer"
                  >
                    <span>Proceed to Step 3: Grammar</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: GRAMMAR */}
            {activeStep === 3 && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h4 className="font-display text-base font-bold text-slate-900">
                    Step 3: Focused Grammar Patterns &amp; Formulas (문법과 표현)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Conjugation formulas, attachment rules, and side-by-side contrast notes.
                  </p>
                </div>

                <div className="space-y-6">
                  {currentLesson.grammar.map((g) => (
                    <div
                      key={g.id}
                      className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div>
                          <span className="font-mono-code text-[11px] font-bold uppercase tracking-wider text-indigo-600 block">
                            Pattern
                          </span>
                          <h5 className="font-display text-lg font-bold text-slate-900">
                            {g.pattern}
                          </h5>
                        </div>
                        <span className="font-mono-code text-xs font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {g.englishMeaning}
                        </span>
                      </div>

                      {/* Formula Box */}
                      <div className="rounded-xl bg-slate-900 text-white p-4 font-mono-code text-xs sm:text-sm space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                          Conjugation Formula
                        </span>
                        <div className="text-emerald-400 font-bold">{g.formula}</div>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {g.explanation}
                      </p>

                      {/* Attachment Rules */}
                      <div className="space-y-1.5">
                        <span className="font-mono-code text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                          Attachment Rules:
                        </span>
                        <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                          {g.rules.map((r, rIdx) => (
                            <li key={rIdx}>{r}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Example sentences */}
                      <div className="rounded-xl bg-slate-50 border border-slate-200/70 p-4 space-y-2">
                        <span className="font-mono-code text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                          Natural Examples:
                        </span>
                        <div className="space-y-2">
                          {g.examples.map((ex, exIdx) => (
                            <div key={exIdx} className="flex items-start justify-between gap-2 border-b border-slate-200/40 pb-1.5 last:border-none">
                              <div>
                                <p className="font-hangul text-sm font-bold text-slate-900">
                                  {ex.korean}
                                </p>
                                <p className="text-xs text-slate-500">{ex.english}</p>
                              </div>
                              <KoreanAudioButton
                                koreanText={ex.korean}
                                text={ex.korean}
                                size="sm"
                                title="Listen to example"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                  >
                    Back to Vocabulary
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep(4)}
                    className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-xs font-semibold text-white transition shadow-xs cursor-pointer"
                  >
                    <span>Proceed to Step 4: Speaking</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: SPEAKING & LISTENING */}
            {activeStep === 4 && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h4 className="font-display text-base font-bold text-slate-900">
                    Step 4: Speaking, Repetition &amp; Shadowing Drills (말하기와 듣기)
                  </h4>
                  <p className="text-xs text-slate-500">
                    {currentLesson.speakingListening.instruction}
                  </p>
                </div>

                <div className="space-y-4">
                  {currentLesson.speakingListening.drills.map((d, dIdx) => (
                    <div
                      key={dIdx}
                      className="rounded-xl border border-slate-200 bg-white p-5 shadow-2xs space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono-code text-xs font-bold text-indigo-700 uppercase tracking-wider">
                          Drill {dIdx + 1}: {d.prompt}
                        </span>
                        <KoreanAudioButton
                          koreanText={d.audioText}
                          text={d.audioText}
                          size="md"
                          title="Listen to native drill"
                        />
                      </div>

                      <div className="rounded-lg bg-indigo-50/50 border border-indigo-100 p-3.5 space-y-1">
                        <span className="text-[10px] font-mono-code font-bold text-indigo-600 uppercase block">
                          Say aloud unprompted:
                        </span>
                        <p className="font-hangul text-lg sm:text-xl font-extrabold text-slate-900">
                          {d.targetKorean}
                        </p>
                        <p className="text-xs text-slate-600">{d.english}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveStep(3)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                  >
                    Back to Grammar
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveStep(5)}
                    className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-xs font-semibold text-white transition shadow-xs cursor-pointer"
                  >
                    <span>Proceed to Step 5: Reading &amp; Writing</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: READING & WRITING */}
            {activeStep === 5 && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h4 className="font-display text-base font-bold text-slate-900">
                    Step 5: Reading Comprehension &amp; Guided Writing (읽기와 쓰기)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Read the contextual passage, verify comprehension, and produce your own written sentences.
                  </p>
                </div>

                {/* Reading Passage */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h5 className="font-display text-sm font-bold text-slate-900">
                      📖 {currentLesson.readingWriting.readingTitle}
                    </h5>
                    <KoreanAudioButton
                      koreanText={currentLesson.readingWriting.readingPassage}
                      text={currentLesson.readingWriting.readingPassage}
                      size="md"
                      title="Listen to reading passage"
                    />
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 space-y-2">
                    <p className="font-hangul text-sm sm:text-base font-medium text-slate-900 leading-relaxed">
                      {currentLesson.readingWriting.readingPassage}
                    </p>
                    <p className="text-xs text-slate-500 pt-2 border-t border-slate-200/60 leading-relaxed">
                      {currentLesson.readingWriting.readingTranslation}
                    </p>
                  </div>

                  {/* Comprehension Questions */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-code text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Comprehension Check:
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowReadingAnswers(!showReadingAnswers)}
                        className="text-[11px] font-mono-code text-indigo-600 font-semibold hover:underline cursor-pointer"
                      >
                        {showReadingAnswers ? 'Hide Answers' : 'Reveal Answers'}
                      </button>
                    </div>

                    {currentLesson.readingWriting.comprehensionQuestions.map((q, qIdx) => (
                      <div key={qIdx} className="rounded-lg bg-white border border-slate-200 p-3 text-xs space-y-1">
                        <p className="font-semibold text-slate-800">
                          {qIdx + 1}. {q.question}
                        </p>
                        {showReadingAnswers && (
                          <div className="rounded bg-emerald-50 text-emerald-900 p-2 border border-emerald-200 font-mono-code text-[11px]">
                            <strong>Answer:</strong> {q.answer} ({q.explanation})
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guided Writing Task */}
                <div className="rounded-2xl border border-indigo-200 bg-indigo-50/30 p-5 sm:p-6 shadow-2xs space-y-4">
                  <div className="flex items-center gap-2 text-indigo-900">
                    <PenTool className="h-4 w-4 text-indigo-600" />
                    <h5 className="font-display text-sm font-bold">
                      ✍️ Guided Writing Production Task
                    </h5>
                  </div>

                  <p className="text-xs text-slate-700">
                    <strong>Task:</strong> {currentLesson.readingWriting.writingPrompt}
                  </p>

                  <div className="rounded-lg bg-white p-3 border border-slate-200 text-xs font-mono-code text-slate-600">
                    <span className="font-bold text-slate-700 block mb-1">Recommended Template:</span>
                    <pre className="whitespace-pre-wrap font-sans">{currentLesson.readingWriting.writingTemplate}</pre>
                  </div>

                  {/* Textarea */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700">
                      Your Korean Writing (Saved automatically):
                    </label>
                    <textarea
                      rows={4}
                      value={userWriting[currentLesson.id] || ''}
                      onChange={(e) => handleSaveWriting(currentLesson.id, e.target.value)}
                      placeholder="Write your Korean sentences here in Hangul..."
                      className="w-full rounded-xl border border-slate-300 bg-white p-3 font-hangul text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 shadow-2xs"
                    />
                  </div>

                  {/* Model Sample Answer */}
                  <details className="text-xs group">
                    <summary className="font-mono-code text-indigo-600 font-semibold cursor-pointer list-none hover:underline">
                      Inspect Model Writing Answer ↓
                    </summary>
                    <div className="mt-2 rounded-lg bg-white p-3 border border-slate-200 font-hangul text-slate-800">
                      {currentLesson.readingWriting.sampleAnswer}
                    </div>
                  </details>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveStep(4)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                  >
                    Back to Speaking
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCheckpoint(KOREAN_CHECKPOINTS[0])}
                    className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-xs font-semibold text-white transition shadow-xs cursor-pointer"
                  >
                    <Award className="h-4 w-4" />
                    <span>View Checkpoint A Milestone</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
