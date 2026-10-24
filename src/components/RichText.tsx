import React from 'react';
import katex from 'katex';

export function MathBlock({ latex }: { latex: string }) {
  const html = React.useMemo(() => {
    try {
      return katex.renderToString(latex, {
        displayMode: true,
        throwOnError: false,
      });
    } catch {
      return latex;
    }
  }, [latex]);

  return (
    <div
      className="katex-display-wrap"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Renders inline text containing $...$ math, `...` inline code, **...** bold, and *...* italic
 */
export function RichText({ text, className = '' }: { text: string; className?: string }) {
  const tokens = React.useMemo(() => {
    if (!text) return [];
    // Split by inline math $...$, inline code `...`, bold **...**, italic *...*, and markdown links [text](url)
    const regex = /(\$\$[^$]+\$\$|\$[^$\n]+\$|`[^`]+`|\*\*[^*]+\*\*|\*[^*\n]+\*|\[[^\]]+\]\([^)]+\))/g;
    const parts = text.split(regex);
    return parts.filter(Boolean).map((part, index) => {
      // Markdown link [label](url)
      if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          return (
            <a
              key={index}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700 underline font-medium inline-flex items-center gap-0.5"
            >
              <span>{linkMatch[1]}</span>
            </a>
          );
        }
      }
      if (part.startsWith('$$') && part.endsWith('$$') && part.length > 4) {
        const math = part.slice(2, -2);
        try {
          const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
          return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
        } catch {
          return <code key={index}>{math}</code>;
        }
      }
      if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
        const math = part.slice(1, -1);
        try {
          const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
          return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
        } catch {
          return <code key={index}>{math}</code>;
        }
      }
      if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
        const content = part.slice(1, -1);
        const hasHangul = /[\uac00-\ud7af\u1100-\u11ff\u3130-\u318f]/.test(content);
        const hasHanja = /[\u4e00-\u9fff]/.test(content);
        const isPhonetic = /^\[.+\]$/.test(content);

        let customClass = '';
        if (hasHanja) {
          customClass = 'korean-hanja';
        } else if (isPhonetic) {
          customClass = 'korean-phonetic';
        } else if (hasHangul) {
          customClass = 'font-hangul bg-indigo-50/80 text-indigo-950 border border-indigo-200/80 font-semibold px-1.5 py-0.5 rounded shadow-2xs';
        }

        return (
          <code key={index} className={`term-code ${customClass}`}>
            {content}
          </code>
        );
      }
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return (
          <strong key={index} className="font-semibold text-slate-900">
            <RichText text={part.slice(2, -2)} />
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
        return (
          <em key={index} className="italic text-slate-800">
            {part.slice(1, -1)}
          </em>
        );
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  }, [text]);

  return <span className={className}>{tokens}</span>;
}
