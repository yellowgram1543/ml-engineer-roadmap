import React from 'react';
import { Check, Sparkles, Terminal, ShieldCheck, Info } from 'lucide-react';
import { ContentElement } from '../types/roadmap';
import { useProgressStore } from '../store/useProgressStore';
import { MathBlock, RichText } from './RichText';

interface ContentElementsViewProps {
  elements: ContentElement[];
  searchQuery?: string;
}

export const ContentElementsView: React.FC<ContentElementsViewProps> = ({
  elements,
  searchQuery = '',
}) => {
  const checked = useProgressStore((s) => s.checked);
  const toggleItem = useProgressStore((s) => s.toggleItem);

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
                  ? 'bg-amber-50/55 border border-amber-200/80 p-3.5'
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
                            ? 'border-[var(--phase-ac)] bg-[var(--phase-ac)] text-white shadow-xs'
                            : 'border-slate-300 bg-white group-hover:border-[var(--phase-ac)]'
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
                    {el.title}
                  </span>
                ) : (
                  <p className="font-mono-code text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {el.title}
                  </p>
                )}
              </div>
              {el.subtitle && (
                <p className="mt-1 text-sm text-slate-600">
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
          return (
            <div
              key={idx}
              className="overflow-hidden rounded-xl border border-slate-200 bg-slate-900 text-slate-100 shadow-xs my-3"
            >
              <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/60 px-3.5 py-1.5 text-[11px] font-mono-code text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Terminal className="h-3 w-3 text-slate-400" />
                  {el.lang}
                </span>
              </div>
              <pre className="overflow-x-auto p-4 font-mono-code text-xs leading-relaxed text-slate-100">
                <code>{el.code}</code>
              </pre>
            </div>
          );
        }

        if (el.type === 'table') {
          return (
            <div
              key={idx}
              className="overflow-x-auto rounded-xl border border-slate-200 bg-white my-3"
            >
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80">
                    {el.headers.map((h, hIdx) => (
                      <th
                        key={hIdx}
                        className="px-3.5 py-2.5 font-display text-xs font-semibold uppercase tracking-wider text-slate-600"
                      >
                        <RichText text={h} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {el.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/60">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-3.5 py-2.5 text-slate-700 align-top">
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
          const isGateChecked = el.checkId ? !!checked[el.checkId] : false;

          return (
            <div
              key={idx}
              onClick={() => {
                if (el.checkId) toggleItem(el.checkId);
              }}
              className={`flex items-start gap-3 rounded-xl border p-3.5 text-sm transition-all ${
                el.checkId ? 'cursor-pointer select-none' : ''
              } ${
                isGate
                  ? isGateChecked
                    ? 'border-emerald-300 bg-emerald-50/80 text-emerald-900'
                    : 'border-[var(--phase-br)] bg-[var(--phase-bg)] text-slate-800'
                  : 'border-slate-200 bg-slate-50 text-slate-700'
              }`}
            >
              {el.checkId ? (
                <button
                  type="button"
                  aria-label="Toggle completion gate"
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                    isGateChecked
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : 'border-[var(--phase-ac)] bg-white'
                  }`}
                >
                  {isGateChecked && <Check className="h-3.5 w-3.5 stroke-[2.75]" />}
                </button>
              ) : isGate ? (
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--phase-ac)]" />
              ) : (
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
              )}
              <div className={isGateChecked ? 'line-through opacity-75' : ''}>
                <RichText text={el.text} />
              </div>
            </div>
          );
        }

        if (el.type === 'meta') {
          return (
            <div
              key={idx}
              className="flex flex-wrap items-baseline gap-2 text-sm text-slate-700 bg-slate-50/80 border border-slate-200/70 rounded-lg px-3 py-2"
            >
              <span className="font-mono-code text-xs font-semibold uppercase tracking-wider text-slate-500">
                {el.label}:
              </span>
              <span className="text-slate-800">
                <RichText text={el.value} />
              </span>
            </div>
          );
        }

        if (el.type === 'paragraph') {
          return (
            <p key={idx} className="text-[14.5px] leading-relaxed text-slate-600">
              <RichText text={el.text} />
            </p>
          );
        }

        return null;
      })}
    </div>
  );
};
