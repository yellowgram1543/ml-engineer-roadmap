import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Award,
  ArrowLeft,
  AlertCircle,
  FileSpreadsheet,
  Plus,
  Trash2,
  Check,
  X,
  Filter,
} from 'lucide-react';
import { DsaRoadmapData } from '../types/dsaRoadmap';
import { useDsaProgressStore, WeaknessLedgerEntry } from '../store/useDsaProgressStore';
import { RichText } from '../components/RichText';

interface DsaCheckpointsPageProps {
  data: DsaRoadmapData;
}

export const DsaCheckpointsPage: React.FC<DsaCheckpointsPageProps> = ({ data }) => {
  const ledger = useDsaProgressStore((s) => s.ledger);
  const addLedgerEntry = useDsaProgressStore((s) => s.addLedgerEntry);
  const toggleLedgerStatus = useDsaProgressStore((s) => s.toggleLedgerStatus);
  const deleteLedgerEntry = useDsaProgressStore((s) => s.deleteLedgerEntry);

  const [formOpen, setFormOpen] = React.useState(false);
  const [filter, setFilter] = React.useState<'all' | 'open' | 'closed'>('all');

  // Form fields
  const [problem, setProblem] = React.useState('');
  const [pattern, setPattern] = React.useState('Two pointers (opposite)');
  const [whatBroke, setWhatBroke] = React.useState('');

  const openCount = ledger.filter((l) => l.status === 'open').length;
  const closedCount = ledger.filter((l) => l.status === 'closed').length;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim() || !whatBroke.trim()) return;

    const today = new Date();
    const d2 = new Date();
    d2.setDate(today.getDate() + 2);
    const d7 = new Date();
    d7.setDate(today.getDate() + 7);

    addLedgerEntry({
      date: today.toISOString().slice(0, 10),
      problem: problem.trim(),
      pattern: pattern.trim(),
      whatBroke: whatBroke.trim(),
      firstResolveDate: d2.toISOString().slice(0, 10),
      secondResolveDate: d7.toISOString().slice(0, 10),
      status: 'open',
    });

    setProblem('');
    setWhatBroke('');
    setFormOpen(false);
  };

  const filteredLedger = ledger.filter((l) => {
    if (filter === 'open') return l.status === 'open';
    if (filter === 'closed') return l.status === 'closed';
    return true;
  });

  return (
    <main id="main" className="min-h-screen pb-20 bg-[#fcfcfd]">
      {/* Top Banner */}
      <section className="border-b border-slate-200/80 bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-4">
          <Link
            to="/dsa"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to DSA 100-Day Roadmap</span>
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-200 bg-purple-50 px-3 py-0.5 text-xs font-semibold text-purple-800">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Evaluation &amp; Retention Milestones</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-2">
                Checkpoints &amp; Weakness Ledger
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
                Closed-book timed assessments and the active re-solve ledger. Pass mark: 70%, with a T3 on at least half of attempted problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-12">
        {/* ───────────────── 5 CHECKPOINTS ───────────────── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <Award className="h-6 w-6 text-emerald-600" />
            <h2 className="font-display text-xl font-bold text-slate-900">
              The 5 Timed Closed-Book Checkpoints
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.checkpoints.map((cp) => (
              <div
                key={cp.checkpoint}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 hover:shadow-xs transition space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                    Checkpoint {cp.checkpoint}
                  </span>
                  <span className="font-mono-code text-xs font-bold text-slate-500">
                    Day {cp.day}
                  </span>
                </div>
                <div className="text-xs font-semibold text-emerald-900 font-mono-code">
                  ⏱ {cp.format}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  <RichText text={cp.content} />
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ───────────────── INTERACTIVE WEAKNESS LEDGER ───────────────── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                <FileSpreadsheet className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-slate-900">
                  Interactive Weakness Ledger (Rule 4 &amp; 10)
                </h2>
                <p className="text-xs text-slate-500">
                  Log every failed problem. Re-solve at D+2 and D+7 until closed.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFormOpen(!formOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition shadow-xs"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Log Failed Problem</span>
              </button>
            </div>
          </div>

          {/* Warning Banner if > 10 open rows */}
          {openCount > 10 && (
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
              <div>
                <strong className="font-bold">Ledger Alert: {openCount} open rows. </strong>
                Rule 4 states: if your ledger has more than 10 open rows, stop new material and spend 3 days re-solving open rows before taking on new mocks.
              </div>
            </div>
          )}

          {/* Log Problem Form */}
          {formOpen && (
            <form
              onSubmit={handleAdd}
              className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-4 animate-in fade-in duration-150"
            >
              <div className="font-bold text-sm text-slate-900">Log a Problem to Re-Solve</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Problem Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 3Sum, Trapping Rain Water, Course Schedule"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Core Pattern</label>
                  <select
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none"
                  >
                    {data.cheatSheets.patterns.map((p) => (
                      <option key={p.number} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                    <option value="Dynamic Programming">Dynamic Programming</option>
                    <option value="Low-Level Design">Low-Level Design</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="text-xs">
                <label className="block font-semibold text-slate-700 mb-1">
                  What Broke? (Be specific: e.g. &quot;forgot dummy node on empty list&quot;, &quot;off-by-one on hi=mid&quot;)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Did not see the window was on distinct char count"
                  value={whatBroke}
                  onChange={(e) => setWhatBroke(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 shadow-xs"
                >
                  Save Entry
                </button>
              </div>
            </form>
          )}

          {/* Ledger Filter Tabs & Stats */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  filter === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                All ({ledger.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('open')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  filter === 'open'
                    ? 'bg-rose-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Open ({openCount})
              </button>
              <button
                type="button"
                onClick={() => setFilter('closed')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  filter === 'closed'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Closed ({closedCount})
              </button>
            </div>

            <div className="text-xs font-mono-code text-slate-500">
              {ledger.length === 0 ? 'No problems logged yet.' : `${openCount} open · ${closedCount} mastered`}
            </div>
          </div>

          {/* Ledger Table */}
          {ledger.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500">
              <p>Your ledger is currently clean! Click &ldquo;Log Failed Problem&rdquo; whenever a problem times out or fails unaided.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
                <thead className="bg-slate-50 font-mono-code uppercase tracking-wider text-slate-600 text-[11px]">
                  <tr>
                    <th className="px-3 py-2.5 w-24">Status</th>
                    <th className="px-3 py-2.5 w-24">Logged</th>
                    <th className="px-4 py-2.5 font-bold">Problem</th>
                    <th className="px-3 py-2.5">Pattern</th>
                    <th className="px-4 py-2.5">What Broke</th>
                    <th className="px-3 py-2.5 w-24">D+2 / D+7</th>
                    <th className="px-3 py-2.5 w-10 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                  {filteredLedger.map((row) => {
                    const isOpen = row.status === 'open';
                    return (
                      <tr key={row.id} className="hover:bg-slate-50/70 transition">
                        <td className="px-3 py-3">
                          <button
                            type="button"
                            onClick={() => toggleLedgerStatus(row.id)}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold transition cursor-pointer ${
                              isOpen
                                ? 'bg-rose-100 text-rose-800 border border-rose-200 hover:bg-rose-200'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-200 hover:bg-emerald-200'
                            }`}
                          >
                            {isOpen ? 'Open' : 'Closed ✓'}
                          </button>
                        </td>
                        <td className="px-3 py-3 font-mono-code text-[11px] text-slate-500">
                          {row.date}
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-900">
                          {row.problem}
                        </td>
                        <td className="px-3 py-3 text-slate-600 font-mono-code text-[11px]">
                          {row.pattern}
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          <RichText text={row.whatBroke} />
                        </td>
                        <td className="px-3 py-3 font-mono-code text-[10px] text-slate-500 leading-tight">
                          <div>D+2: {row.firstResolveDate || '—'}</div>
                          <div>D+7: {row.secondResolveDate || '—'}</div>
                        </td>
                        <td className="px-3 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => deleteLedgerEntry(row.id)}
                            className="text-slate-400 hover:text-rose-600 transition p-1"
                            title="Delete entry"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ───────────────── 14-WEEK SCHEDULE TABLE ───────────────── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-emerald-600" />
            <h2 className="font-display text-xl font-bold text-slate-900">
              The 14-Week Schedule at a Glance
            </h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 font-mono-code uppercase tracking-wider text-slate-600 text-[11px]">
                <tr>
                  <th className="px-3 py-2.5 w-14 text-center">Week</th>
                  <th className="px-4 py-2.5 w-24">Days</th>
                  <th className="px-3 py-2.5 w-16 text-center">Phase</th>
                  <th className="px-4 py-2.5">Blocks Covered</th>
                  <th className="px-4 py-2.5 w-44 font-semibold text-right">Checkpoint</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700 font-sans">
                {data.schedule.map((w) => (
                  <tr key={w.week} className="hover:bg-slate-50/70 transition">
                    <td className="px-3 py-3 text-center font-mono-code font-bold text-slate-900">
                      W{w.week}
                    </td>
                    <td className="px-4 py-3 font-mono-code text-xs text-slate-600">
                      {w.days}
                    </td>
                    <td className="px-3 py-3 text-center font-mono-code font-bold">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-xs">
                        {w.phase}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-800">
                      <RichText text={w.blocks} />
                    </td>
                    <td className="px-4 py-3 text-right font-mono-code text-xs font-bold text-emerald-700">
                      <RichText text={w.checkpoint} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};
