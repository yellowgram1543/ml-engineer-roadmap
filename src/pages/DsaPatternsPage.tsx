import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Search,
  Code2,
  Copy,
  CheckCheck,
  AlertTriangle,
  ArrowLeft,
  Flame,
  FileCode,
  Table,
} from 'lucide-react';
import { DsaRoadmapData } from '../types/dsaRoadmap';
import { RichText } from '../components/RichText';

interface DsaPatternsPageProps {
  data: DsaRoadmapData;
}

export const DsaPatternsPage: React.FC<DsaPatternsPageProps> = ({ data }) => {
  const [search, setSearch] = React.useState('');
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const copyTemplate = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPatterns = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data.cheatSheets.patterns;
    return data.cheatSheets.patterns.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.trigger.toLowerCase().includes(q) ||
        p.template.toLowerCase().includes(q)
    );
  }, [data.cheatSheets.patterns, search]);

  const filteredTemplates = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data.cheatSheets.templates;
    return data.cheatSheets.templates.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.code.toLowerCase().includes(q)
    );
  }, [data.cheatSheets.templates, search]);

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
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-0.5 text-xs font-semibold text-emerald-800">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Reference · Banks &amp; Cheatsheets</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-2">
                {data.cheatSheets.patterns.length} Pattern Cards &amp; Master Templates
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
                Recognise triggers inside 90 seconds. Produce these standard templates from muscle memory under a timer.
              </p>
            </div>

            {/* Search Box */}
            <div className="w-full sm:w-72">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter patterns or templates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2.5 text-xs sm:text-sm focus:border-emerald-500 focus:bg-white focus:outline-none transition shadow-2xs"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-12">
        {/* ───────────────── THE PATTERN CARDS TABLE ───────────────── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-900">
                The {data.cheatSheets.patterns.length} Pattern Cards &amp; Recognition Triggers
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Practice the recognition drill: read 20 problem titles cold, name the pattern in &lt; 10s.
              </p>
            </div>
            <span className="font-mono-code text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
              {filteredPatterns.length} of {data.cheatSheets.patterns.length} Patterns
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 font-mono-code uppercase tracking-wider text-slate-600 text-[11px]">
                <tr>
                  <th className="px-3 py-3 w-10 text-center">#</th>
                  <th className="px-4 py-3 w-44 font-bold">Pattern</th>
                  <th className="px-4 py-3 font-semibold">Trigger Sentence in Question</th>
                  <th className="px-4 py-3 font-semibold">One-Line Template</th>
                  <th className="px-4 py-3 w-28 font-semibold">Complexity</th>
                  <th className="px-4 py-3 w-28 text-center font-semibold">Template</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                {filteredPatterns.map((p) => {
                  const matchingTpl = data.cheatSheets.templates.find((t) =>
                    p.templateRef ? t.title.includes(p.templateRef.replace('§', '')) : false
                  );
                  return (
                    <tr key={p.number} className="hover:bg-slate-50/80 transition">
                      <td className="px-3 py-3 text-center font-mono-code text-xs text-slate-400 font-bold">
                        {p.number}
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-mono-code text-xs mr-1.5">
                          {p.name}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-emerald-900 font-medium">
                        <RichText text={p.trigger} />
                      </td>
                      <td className="px-4 py-3 text-slate-600 font-mono-code text-xs">
                        <RichText text={p.template} />
                      </td>
                      <td className="px-4 py-3 font-mono-code text-xs font-bold text-slate-700">
                        <RichText text={p.complexity} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        {matchingTpl ? (
                          <a
                            href={`#${matchingTpl.id}`}
                            className="inline-flex items-center gap-1 font-mono-code text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition"
                          >
                            <span>{p.templateRef || 'View'}</span>
                            <Code2 className="h-3 w-3" />
                          </a>
                        ) : p.templateRef ? (
                          <span className="font-mono-code text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                            {p.templateRef}
                          </span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ───────────────── TEMPLATES TO MEMORIZE ───────────────── */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">
              Templates to Memorise ({data.cheatSheets.templates.length} Core Implementations)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Write each by hand until you can produce it cold, in under three minutes, with no reference.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredTemplates.map((tpl) => {
              const isCopied = copiedId === tpl.id;
              const hasSnippets = tpl.snippets && tpl.snippets.length > 0;

              return (
                <div
                  key={tpl.id}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:shadow-sm transition"
                >
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200 text-xs">
                    <span className="font-bold text-slate-900 font-display text-base">
                      {tpl.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyTemplate(tpl.code, tpl.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 font-semibold text-slate-700 shadow-2xs transition"
                    >
                      {isCopied ? (
                        <>
                          <CheckCheck className="h-3.5 w-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-slate-500" />
                          <span>Copy Template</span>
                        </>
                      )}
                    </button>
                  </div>

                  {tpl.notes && (
                    <div className="px-4 py-2.5 text-xs text-slate-600 bg-amber-50/50 border-b border-amber-100/70 leading-relaxed font-sans">
                      <strong className="font-semibold text-amber-900">Note: </strong>
                      <RichText text={tpl.notes} />
                    </div>
                  )}

                  {hasSnippets ? (
                    <div className="divide-y divide-slate-800">
                      {tpl.snippets!.map((snip, sIdx) => {
                        const snipCopied = copiedId === `${tpl.id}-${sIdx}`;
                        return (
                          <div key={sIdx} className="bg-[#0d1117]">
                            {snip.label && (
                              <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-slate-800 text-xs font-mono-code text-slate-300">
                                <span className="font-semibold text-emerald-400">
                                  {snip.label}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => copyTemplate(snip.code, `${tpl.id}-${sIdx}`)}
                                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white"
                                >
                                  {snipCopied ? (
                                    <>
                                      <CheckCheck className="h-3 w-3 text-emerald-400" />
                                      <span className="text-emerald-400">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-3 w-3" />
                                      <span>Copy Variant</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                            <pre className="p-4 overflow-x-auto text-xs sm:text-[13px] font-mono-code text-slate-200 leading-relaxed">
                              <code>{snip.code}</code>
                            </pre>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <pre className="p-4 overflow-x-auto text-xs sm:text-[13px] font-mono-code bg-[#0d1117] text-slate-200 leading-relaxed">
                      <code>{tpl.code}</code>
                    </pre>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ───────────────── PYTHON GOTCHAS TABLE ───────────────── */}
        {data.cheatSheets.gotchasTable && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <h2 className="font-display text-xl font-bold text-slate-900">
                Python Gotchas at Interview Speed
              </h2>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 font-mono-code uppercase tracking-wider text-slate-600 text-[11px]">
                  <tr>
                    {data.cheatSheets.gotchasTable.headers.map((h, i) => (
                      <th key={i} className="px-4 py-2.5 font-semibold">
                        <RichText text={h} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                  {data.cheatSheets.gotchasTable.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/70">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-4 py-2.5">
                          <RichText text={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ───────────────── THE 10 WAYS PEOPLE FAIL ───────────────── */}
        {data.cheatSheets.failureModes && data.cheatSheets.failureModes.length > 0 && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-rose-900">
              <Flame className="h-5 w-5 text-rose-600" />
              <h2 className="font-display text-xl font-bold">
                The Ten Ways Candidates Fail This Plan
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {data.cheatSheets.failureModes.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-rose-200/80 shadow-2xs">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-rose-600 text-white font-mono-code text-[11px] font-bold">
                    {idx + 1}
                  </span>
                  <div className="text-xs text-slate-700 leading-relaxed font-medium">
                    <RichText text={item} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
