import React from 'react';
import { Check, Sparkles, Terminal, ShieldCheck, Info, Copy, CheckCheck } from 'lucide-react';
import { ContentElement } from '../types/roadmap';
import { useDsaProgressStore } from '../store/useDsaProgressStore';
import { MathBlock, RichText } from './RichText';

interface DsaContentElementsViewProps {
  elements: ContentElement[];
  searchQuery?: string;
}

export const DsaContentElementsView: React.FC<DsaContentElementsViewProps> = ({
  elements,
  searchQuery = '',
}) => {
  const checked = useDsaProgressStore((s) => s.checked);
  const toggleItem = useDsaProgressStore((s) => s.toggleItem);
  const [copiedIdx, setCopiedIdx] = React.useState<number | null>(null);

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const qTokens = normalizedQuery ? normalizedQuery.split(/\s+/).filter(Boolean) : [];
  const matchesTokens = (text: string) => {
    if (qTokens.length === 0) return true;
    const lower = text.toLowerCase();
    return qTokens.every((t) => lower.includes(t));
  };

  return (
    <div className="space-y-4">
      {elements.map((el, idx) => {
        if (el.type === 'checklist') {
          const filteredItems = qTokens.length > 0
            ? el.items.filter((item) => matchesTokens(item.text))
            : el.items;

          const itemsToRender = filteredItems.length > 0 ? filteredItems : el.items;
          const isPractice = el.groupType === 'practice';
          const isGate = el.groupType === 'gate';

          return (
            <ul
              key={idx}
              role="list"
              className={`space-y-1.5 rounded-xl ${
                isPractice
                  ? 'bg-amber-50/60 border border-amber-200/80 p-3.5'
                  : isGate
                  ? 'bg-emerald-50/60 border border-emerald-200/80 p-3.5'
                  : ''
              }`}
            >
              {itemsToRender.map((item) => {
                const isDone = !!checked[item.id];
                return (
                  <li key={item.id}>
                    <label
                      className={`group flex items-start gap-3 rounded-lg px-2.5 py-2 cursor-pointer select-none transition-all ${
                        isDone
                          ? 'bg-slate-50/90 text-slate-400'
                          : 'hover:bg-slate-50/90 text-slate-800'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => toggleItem(item.id)}
                        className="sr-only"
                      />
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                          isDone
                            ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                            : 'border-slate-300 bg-white group-hover:border-emerald-600'
                        }`}
                      >
                        {isDone && <Check className="h-3.5 w-3.5 stroke-[2.75]" />}
                      </span>
                      <span
                        className={`text-[14.5px] leading-relaxed transition-colors ${
                          isDone ? 'line-through text-slate-400' : 'text-slate-700'
                        }`}
                      >
                        <RichText text={item.text} />
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          );
        }

        if (el.type === 'subheading') {
          const isPractice = el.variant === 'practice';
          return (
            <div key={idx} className="pt-2">
              <div className="flex items-center gap-2">
                {isPractice ? (
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-100/80 px-2.5 py-0.5 font-mono-code text-[11px] font-semibold uppercase tracking-wider text-amber-800 border border-amber-200">
                    <Sparkles className="h-3 w-3" />
                    Practice
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-0.5 font-mono-code text-[11px] font-semibold uppercase tracking-wider text-slate-700 border border-slate-200">
                    <Terminal className="h-3 w-3" />
                    Core
                  </span>
                )}
                <h4 className="font-display text-base font-bold text-slate-900">
                  <RichText text={el.title} />
                </h4>
              </div>
              {el.subtitle && (
                <p className="mt-1 text-xs text-slate-500 font-mono-code">
                  <RichText text={el.subtitle} />
                </p>
              )}
            </div>
          );
        }

        if (el.type === 'math') {
          return <MathBlock key={idx} latex={el.latex} />;
        }

        if (el.type === 'code') {
          const isCopied = copiedIdx === idx;
          return (
            <div key={idx} className="relative group my-3 rounded-xl border border-slate-800 bg-[#0d1117] overflow-hidden text-slate-200 shadow-sm">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-[#161b22] text-xs font-mono-code text-slate-400">
                <span>{el.lang || 'code'}</span>
                <button
                  type="button"
                  onClick={() => copyCode(el.code, idx)}
                  className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-slate-700 text-slate-300 hover:text-white transition"
                >
                  {isCopied ? (
                    <>
                      <CheckCheck className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-[13px] font-mono-code leading-relaxed text-slate-200">
                <code>{el.code}</code>
              </pre>
            </div>
          );
        }

        if (el.type === 'table') {
          return (
            <div key={idx} className="my-3 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-600 font-mono-code">
                  <tr>
                    {el.headers.map((h, hIdx) => (
                      <th key={hIdx} className="px-4 py-3 font-semibold">
                        <RichText text={h} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white text-slate-700 font-sans">
                  {el.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/60 transition-colors">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-4 py-2.5 text-[13.5px] leading-snug">
                          <RichText text={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (el.type === 'callout') {
          const isGate = el.variant === 'gate';
          const isDone = el.checkId ? !!checked[el.checkId] : false;

          return (
            <div
              key={idx}
              className={`rounded-xl border p-4 transition-all ${
                isGate
                  ? isDone
                    ? 'border-emerald-300 bg-emerald-50/60 text-slate-700'
                    : 'border-emerald-300 bg-emerald-50/40 text-slate-800'
                  : 'border-sky-200 bg-sky-50/40 text-slate-800'
              }`}
            >
              <div className="flex items-start gap-3">
                {isGate ? (
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-xs">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                ) : (
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-sky-600 text-white shadow-xs">
                    <Info className="h-4 w-4" />
                  </span>
                )}
                <div className="flex-1">
                  <div className="text-[14px] leading-relaxed">
                    <RichText text={el.text} />
                  </div>
                  {el.checkId && (
                    <div className="mt-3">
                      <label className="inline-flex items-center gap-2 cursor-pointer select-none rounded-lg bg-white/90 border border-emerald-300 px-3 py-1.5 text-xs font-semibold text-emerald-900 hover:bg-white shadow-xs transition">
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => el.checkId && toggleItem(el.checkId)}
                          className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                        <span>{isDone ? 'Gate requirement verified!' : 'Mark gate requirement cleared'}</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }

        if (el.type === 'paragraph') {
          return (
            <p key={idx} className="text-[14.5px] leading-relaxed text-slate-700">
              <RichText text={el.text} />
            </p>
          );
        }

        return null;
      })}
    </div>
  );
};
