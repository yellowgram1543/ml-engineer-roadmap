import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  HelpCircle,
  Search,
  CheckCircle2,
  Filter,
  CheckCheck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { RoadmapData } from '../types/roadmap';
import { useKoreanProgressStore, computeKoreanCompletion } from '../store/useKoreanProgressStore';

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
  const setBatch = useKoreanProgressStore((s) => s.setBatch);

  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [selectedLevel, setSelectedLevel] = React.useState<string>('all');
  const [selectedType, setSelectedType] = React.useState<string>('all');

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
                {allQuestionIds.length} production drills, metalanguage questions, listening tests, and spoken scenarios across all 16 levels.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-right shrink-0">
              <span className="text-xs font-mono-code uppercase text-slate-500 font-semibold block">
                Mastery Score
              </span>
              <span className="text-2xl font-extrabold font-mono-code text-indigo-700">
                {totalComp.pct}%
              </span>
              <span className="text-[11px] font-mono-code text-slate-500 block">
                {totalComp.done} / {totalComp.total} answered
              </span>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[220px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search questions (e.g. liaison, verbs, honorifics)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
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
              onChange={(e) => setSelectedType(e.target.value)}
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

      {/* Questions Content */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 space-y-10">
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
                              className="mt-0.5 h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono-code text-[11px] font-bold text-slate-400">
                                  #{q.number}
                                </span>
                                <span
                                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${badgeClass}`}
                                >
                                  {q.type === 'Coding' ? 'Production' : q.type}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm font-medium leading-relaxed">
                                {q.question}
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
    </div>
  );
};
