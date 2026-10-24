import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Search,
  CheckCircle2,
  RotateCw,
  Shuffle,
  Volume2,
  Layers,
  List,
  Sparkles,
  Check,
  BookOpen,
} from 'lucide-react';
import { RoadmapData } from '../types/roadmap';
import { useKoreanProgressStore, computeKoreanCompletion } from '../store/useKoreanProgressStore';
import { KoreanAudioButton } from '../components/KoreanAudioButton';
import { RichText } from '../components/RichText';
import { KOREAN_VOCABULARY, KoreanVocabularyItem } from '../data/koreanCurriculumContent';

interface KoreanQuestionsPageProps {
  data: RoadmapData;
}

const QUESTION_TYPE_STYLES: Record<string, string> = {
  Concept: 'bg-sky-50 text-sky-700 border-sky-200',
  Scenario: 'bg-amber-50 text-amber-800 border-amber-200',
  Debugging: 'bg-rose-50 text-rose-700 border-rose-200',
  Design: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Coding: 'bg-indigo-50 text-indigo-700 border-indigo-200', // Production/Speech
};

export const KoreanQuestionsPage: React.FC<KoreanQuestionsPageProps> = ({ data }) => {
  const checked = useKoreanProgressStore((s) => s.checked);
  const toggleItem = useKoreanProgressStore((s) => s.toggleItem);

  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [selectedLevel, setSelectedLevel] = React.useState<string>('all');
  const [selectedType, setSelectedType] = React.useState<string>('all');
  const [viewMode, setViewMode] = React.useState<'list' | 'flashcard'>('list');
  const [deckMode, setDeckMode] = React.useState<'vocabulary' | 'questions'>('vocabulary');

  // Flashcard state
  const [currentCardIndex, setCurrentCardIndex] = React.useState<number>(0);
  const [isFlipped, setIsFlipped] = React.useState<boolean>(false);

  // Collect all questions
  const allQuestionBanks = data.interviewBanks;
  const allQuestionIds = React.useMemo(() => {
    const ids: string[] = [];
    for (const bank of allQuestionBanks) {
      for (const grp of bank.groups) {
        for (const q of grp.questions) {
          ids.push(q.id);
        }
      }
    }
    return ids;
  }, [allQuestionBanks]);

  const totalComp = computeKoreanCompletion(checked, allQuestionIds);

  const filteredBanks = React.useMemo(() => {
    return allQuestionBanks
      .filter((b) => selectedLevel === 'all' || b.levelId === selectedLevel)
      .map((b) => {
        const filteredGroups = b.groups
          .map((grp) => {
            const filteredQuestions = grp.questions.filter((q) => {
              const matchesType = selectedType === 'all' || q.type === selectedType;
              const matchesQuery =
                !searchQuery ||
                q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                grp.title.toLowerCase().includes(searchQuery.toLowerCase());
              return matchesType && matchesQuery;
            });
            return { ...grp, questions: filteredQuestions };
          })
          .filter((grp) => grp.questions.length > 0);

        return { ...b, groups: filteredGroups };
      })
      .filter((b) => b.groups.length > 0);
  }, [allQuestionBanks, selectedLevel, selectedType, searchQuery]);

  // Flattened deck for question flashcard mode
  const flashcardDeck = React.useMemo(() => {
    const deck: Array<{
      id: string;
      number: number;
      question: string;
      category: string;
      type: string;
      levelBadge: string;
      levelTitle: string;
      levelId: string;
    }> = [];

    for (const bank of filteredBanks) {
      for (const grp of bank.groups) {
        for (const q of grp.questions) {
          deck.push({
            ...q,
            levelBadge: bank.levelBadge,
            levelTitle: bank.levelTitle,
            levelId: bank.levelId,
          });
        }
      }
    }
    return deck;
  }, [filteredBanks]);

  // Flattened deck for vocabulary flashcard mode
  const vocabDeck = React.useMemo(() => {
    const deck: Array<KoreanVocabularyItem & { levelTitle: string }> = [];
    for (const [badge, items] of Object.entries(KOREAN_VOCABULARY)) {
      if (selectedLevel !== 'all' && selectedLevel !== `level-${badge}` && selectedLevel !== badge) {
        continue;
      }
      const lvl = data.levels.find((l) => l.badge === badge);
      for (const item of items) {
        if (
          !searchQuery ||
          item.korean.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.romanization.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          deck.push({
            ...item,
            levelTitle: lvl ? lvl.title : `Level ${badge}`,
          });
        }
      }
    }
    return deck;
  }, [selectedLevel, searchQuery, data.levels]);

  const isVocab = deckMode === 'vocabulary';
  const activeDeckLength = isVocab ? vocabDeck.length : flashcardDeck.length;
  const currentVocabCard = isVocab ? vocabDeck[currentCardIndex] || null : null;
  const currentQuestionCard = !isVocab ? flashcardDeck[currentCardIndex] || null : null;

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % Math.max(1, activeDeckLength));
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) =>
      prev === 0 ? Math.max(0, activeDeckLength - 1) : prev - 1
    );
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    if (activeDeckLength > 1) {
      const randomIdx = Math.floor(Math.random() * activeDeckLength);
      setCurrentCardIndex(randomIdx);
    }
  };

  // Keyboard navigation in Flashcard mode
  React.useEffect(() => {
    if (viewMode !== 'flashcard') return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped((f) => !f);
      } else if (e.key === 'ArrowRight' || e.key === 'l') {
        e.preventDefault();
        handleNextCard();
      } else if (e.key === 'ArrowLeft' || e.key === 'h') {
        e.preventDefault();
        handlePrevCard();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [viewMode, flashcardDeck.length]);

  return (
    <div className="min-h-screen bg-[#fcfcfd]">
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
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
                  <HelpCircle className="h-4 w-4" />
                </span>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Korean Practice &amp; Question Banks
                </h1>
              </div>
              <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
                {allQuestionIds.length} production drills, metalanguage questions, listening tests, and spoken scenarios across all 19 levels with native Korean audio pronunciation.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* View Switcher: List vs Flashcard */}
              <div className="flex rounded-xl border border-slate-200 bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <List className="h-3.5 w-3.5" />
                  List View
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('flashcard');
                    setIsFlipped(false);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    viewMode === 'flashcard'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  Flipcards
                </button>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-right shrink-0 hidden sm:block">
                <span className="text-2xl font-extrabold font-mono-code text-indigo-700">
                  {totalComp.pct}%
                </span>
                <span className="text-[11px] font-mono-code text-slate-500 block">
                  {totalComp.done} / {totalComp.total} done
                </span>
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[220px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search questions (e.g. liaison, verbs, honorifics, proverbs)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => {
                setSelectedLevel(e.target.value);
                setCurrentCardIndex(0);
                setIsFlipped(false);
              }}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">All Levels ({allQuestionBanks.length})</option>
              {allQuestionBanks.map((b) => (
                <option key={b.levelId} value={b.levelId}>
                  Level {b.levelBadge} — {b.levelTitle}
                </option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setCurrentCardIndex(0);
                setIsFlipped(false);
              }}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">All Question Types</option>
              <option value="Coding">Production / Speech</option>
              <option value="Scenario">Scenario / Translation</option>
              <option value="Debugging">Error Diagnosis</option>
              <option value="Concept">Concept / Rule</option>
              <option value="Design">Conversation / Dialogue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {viewMode === 'flashcard' ? (
          /* ───────────────── 3D FLASHCARD / FLIPCARD MODE ───────────────── */
          <div className="max-w-2xl mx-auto space-y-5">
            {/* Deck Mode Switcher */}
            <div className="flex items-center justify-center gap-2 p-1 bg-slate-100 rounded-xl max-w-md mx-auto">
              <button
                type="button"
                onClick={() => {
                  setDeckMode('vocabulary');
                  setCurrentCardIndex(0);
                  setIsFlipped(false);
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  deckMode === 'vocabulary'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5 text-emerald-600" />
                <span>Vocabulary Words ({vocabDeck.length})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setDeckMode('questions');
                  setCurrentCardIndex(0);
                  setIsFlipped(false);
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  deckMode === 'questions'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <HelpCircle className="h-3.5 w-3.5 text-indigo-600" />
                <span>Question Drills ({flashcardDeck.length})</span>
              </button>
            </div>

            {activeDeckLength === 0 ? (
              <div className="text-center py-16 text-slate-500 text-sm">
                No cards match your filter criteria. Try adjusting the search or level filter.
              </div>
            ) : (
              <div className="space-y-6">
                {/* Deck progress header */}
                <div className="flex items-center justify-between text-xs font-mono-code text-slate-500">
                  <span className="font-semibold text-slate-700">
                    Card {currentCardIndex + 1} of {activeDeckLength}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleShuffle}
                      className="flex items-center gap-1 hover:text-indigo-600 transition cursor-pointer"
                    >
                      <Shuffle className="h-3.5 w-3.5" />
                      Shuffle
                    </button>
                    <span>{Math.round(((currentCardIndex + 1) / activeDeckLength) * 100)}%</span>
                  </div>
                </div>

                {/* 3D Flipcard Container */}
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  style={{ perspective: '1000px' }}
                  className="min-h-[320px] cursor-pointer select-none"
                >
                  <div
                    className={`relative w-full min-h-[320px] rounded-2xl border transition-transform duration-500 shadow-md ${
                      isFlipped ? 'rotate-y-180 bg-slate-900 text-white border-slate-800' : 'bg-white text-slate-900 border-slate-200'
                    }`}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    {/* Front Face */}
                    <div
                      className={`p-6 sm:p-8 flex flex-col justify-between h-full min-h-[320px] ${
                        isFlipped ? 'hidden' : 'block'
                      }`}
                    >
                      {isVocab && currentVocabCard ? (
                        <div>
                          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
                            <div className="flex items-center gap-2">
                              <span className="rounded-md bg-emerald-600 px-2 py-0.5 text-xs font-bold font-mono-code text-white">
                                Level {currentVocabCard.levelBadge}
                              </span>
                              <span className="text-xs text-slate-500 truncate max-w-[200px]">
                                {currentVocabCard.levelTitle}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {currentVocabCard.partOfSpeech}
                              </span>
                              <KoreanAudioButton
                                koreanText={currentVocabCard.korean}
                                text={currentVocabCard.korean}
                                size="md"
                                title="Listen to Korean word"
                              />
                            </div>
                          </div>

                          <div className="text-center py-6 space-y-2">
                            <span className="font-hangul text-4xl sm:text-5xl font-extrabold text-slate-900 block tracking-wide">
                              {currentVocabCard.korean}
                            </span>
                            <div className="flex items-center justify-center gap-2 text-xs font-mono-code text-slate-500">
                              <span>[{currentVocabCard.romanization}]</span>
                              {currentVocabCard.hanja && (
                                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-600 border border-slate-200">
                                  {currentVocabCard.hanja}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
                            <div className="flex items-center gap-2">
                              <span className="rounded-md bg-indigo-600 px-2 py-0.5 text-xs font-bold font-mono-code text-white">
                                Level {currentQuestionCard?.levelBadge}
                              </span>
                              <span className="text-xs text-slate-500 truncate max-w-[200px]">
                                {currentQuestionCard?.levelTitle}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                                  QUESTION_TYPE_STYLES[currentQuestionCard?.type || 'Concept']
                                }`}
                              >
                                {currentQuestionCard?.type === 'Coding' ? 'Production' : currentQuestionCard?.type}
                              </span>
                              {currentQuestionCard && <KoreanAudioButton text={currentQuestionCard.question} size="md" />}
                            </div>
                          </div>

                          <span className="font-mono-code text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-2">
                            {currentQuestionCard?.category}
                          </span>

                          <div className="font-display font-hangul text-lg sm:text-xl font-bold leading-relaxed mt-2 text-slate-900">
                            <RichText text={currentQuestionCard?.question || ''} />
                          </div>
                        </div>
                      )}

                      <div className="mt-8 border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-400 font-mono-code">
                        <span>Click card or press Space to flip</span>
                        <RotateCw className="h-4 w-4 text-indigo-500 animate-spin-slow" />
                      </div>
                    </div>

                    {/* Back Face */}
                    <div
                      className={`p-6 sm:p-8 flex flex-col justify-between h-full min-h-[320px] ${
                        isFlipped ? 'block' : 'hidden'
                      }`}
                      style={{ transform: 'rotateY(180deg)' }}
                    >
                      {isVocab && currentVocabCard ? (
                        <div>
                          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                            <span className="text-xs font-mono-code text-emerald-400 font-bold uppercase tracking-wider">
                              Meaning &amp; Context Sentence
                            </span>
                            <KoreanAudioButton
                              koreanText={currentVocabCard.korean}
                              text={currentVocabCard.korean}
                              size="md"
                              title="Listen to word"
                            />
                          </div>

                          <div className="space-y-4">
                            <div>
                              <span className="text-[11px] font-mono-code text-slate-400 uppercase tracking-wider block mb-1">
                                English Meaning
                              </span>
                              <h4 className="text-xl sm:text-2xl font-bold text-white font-sans">
                                {currentVocabCard.english}
                              </h4>
                            </div>

                            <div className="rounded-xl bg-slate-800/90 p-4 border border-slate-700 space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <p className="font-hangul text-base sm:text-lg font-bold text-emerald-300">
                                  {currentVocabCard.exampleKorean}
                                </p>
                                <KoreanAudioButton
                                  koreanText={currentVocabCard.exampleKorean}
                                  text={currentVocabCard.exampleKorean}
                                  size="sm"
                                  title="Listen to example sentence"
                                />
                              </div>
                              <p className="text-xs text-slate-300 font-sans">
                                {currentVocabCard.exampleEnglish}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                            <span className="text-xs font-mono-code text-indigo-400 font-bold uppercase tracking-wider">
                              Answer &amp; Production Standard
                            </span>
                            {currentQuestionCard && <KoreanAudioButton text={currentQuestionCard.question} size="md" />}
                          </div>

                          <div className="font-sans text-sm sm:text-base leading-relaxed text-slate-200">
                            <p className="font-semibold text-white mb-2 font-hangul">
                              Question Focus:
                            </p>
                            <p className="text-xs text-slate-300 font-hangul mb-4">
                              {currentQuestionCard?.question}
                            </p>

                            <div className="rounded-xl bg-slate-800/80 p-3.5 border border-slate-700 text-xs text-indigo-200 leading-relaxed">
                              <span className="font-bold text-indigo-400 block mb-1">
                                Target Production Criteria:
                              </span>
                              Deliver this sentence or rule unprompted out loud at native speed with zero pauses and correct sound liaison rules.
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-8 border-t border-slate-800 pt-4 flex items-center justify-between text-xs text-slate-400 font-mono-code">
                        <span>Click card to return to prompt</span>
                        <span className="text-emerald-400 font-semibold">Ready for next</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Flipcard Navigation & Mastery Action Bar */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handlePrevCard}
                    className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-xs"
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </button>

                  {(isVocab ? currentVocabCard : currentQuestionCard) && (
                    <button
                      type="button"
                      onClick={() =>
                        toggleItem(
                          isVocab && currentVocabCard
                            ? currentVocabCard.id
                            : currentQuestionCard!.id
                        )
                      }
                      className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer shadow-xs border ${
                        checked[
                          isVocab && currentVocabCard
                            ? currentVocabCard.id
                            : currentQuestionCard!.id
                        ]
                          ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500 hover:text-emerald-700'
                      }`}
                    >
                      <Check className="h-4 w-4" />
                      {checked[
                        isVocab && currentVocabCard
                          ? currentVocabCard.id
                          : currentQuestionCard!.id
                      ]
                        ? 'Marked Mastered'
                        : 'Mark as Mastered'}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleNextCard}
                    className="flex items-center gap-1 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 transition cursor-pointer shadow-xs"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ───────────────── STANDARD LIST VIEW ───────────────── */
          <div className="space-y-10">
            {filteredBanks.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                No questions match your current filters.
              </div>
            ) : (
              filteredBanks.map((bank) => (
                <div
                  key={bank.levelId}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-indigo-600 px-2 py-0.5 text-xs font-bold font-mono-code text-white">
                        Level {bank.levelBadge}
                      </span>
                      <h2 className="font-display text-lg font-bold text-slate-900">
                        {bank.levelTitle}
                      </h2>
                    </div>
                    <Link
                      to={`/korean/level/${bank.levelId}`}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      Go to Level →
                    </Link>
                  </div>

                  <div className="space-y-6">
                    {bank.groups.map((grp, gIdx) => (
                      <div key={gIdx} className="space-y-2">
                        <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                          {grp.title}
                        </h3>
                        <div className="space-y-2">
                          {grp.questions.map((q) => {
                            const isDone = !!checked[q.id];
                            const badgeClass =
                              QUESTION_TYPE_STYLES[q.type] || QUESTION_TYPE_STYLES.Concept;

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
                                  onChange={() => {}}
                                  className="mt-1 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between gap-2 mb-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-mono-code text-[11px] font-bold text-slate-400">
                                        #{q.number}
                                      </span>
                                      <span
                                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${badgeClass}`}
                                      >
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
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
