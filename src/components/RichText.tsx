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
    // Split by inline math $...$, inline code `...`, bold **...**, italic *...*
    const regex = /(\$\$[^$]+\$\$|\$[^$\n]+\$|`[^`]+`|\*\*[^*]+\*\*|\*[^*\n]+\*)/g;
    const parts = text.split(regex);
    return parts.filter(Boolean).map((part, index) => {
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
        return (
          <code key={index} className="term-code">
            {part.slice(1, -1)}
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
