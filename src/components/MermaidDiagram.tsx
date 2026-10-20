import React from 'react';
import { GitBranch } from 'lucide-react';

interface MermaidDiagramProps {
  chart: string;
  title?: string;
}

let mermaidInitialized = false;

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({
  chart,
  title = 'Architecture Flowchart',
}) => {
  const [svgHtml, setSvgHtml] = React.useState<string>('');
  const [renderFailed, setRenderFailed] = React.useState<boolean>(false);
  const uniqueId = React.useId().replace(/[^a-zA-Z0-9]/g, '');

  React.useEffect(() => {
    let cancelled = false;

    async function renderChart() {
      // Skip full SVG layout in headless jsdom unit test environments where getBBox is absent
      if (
        typeof window === 'undefined' ||
        typeof SVGElement === 'undefined' ||
        typeof (SVGElement.prototype as unknown as { getBBox?: unknown }).getBBox !== 'function'
      ) {
        return;
      }

      try {
        const mermaidModule = await import('mermaid');
        const mermaid = mermaidModule.default;

        if (!mermaidInitialized) {
          mermaid.initialize({
            startOnLoad: false,
            theme: 'base',
            securityLevel: 'loose',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            flowchart: {
              htmlLabels: true,
              curve: 'basis',
              padding: 14,
              nodeSpacing: 36,
              rankSpacing: 42,
            },
            themeVariables: {
              primaryColor: '#f5f3ff',
              primaryTextColor: '#0f172a',
              primaryBorderColor: '#6c5ce7',
              lineColor: '#64748b',
              secondaryColor: '#f8fafc',
              tertiaryColor: '#ffffff',
              fontSize: '13px',
            },
          });
          mermaidInitialized = true;
        }

        const { svg } = await mermaid.render(`mermaid-${uniqueId}`, chart);
        if (!cancelled) {
          setSvgHtml(svg);
          setRenderFailed(false);
        }
      } catch {
        if (!cancelled) {
          setRenderFailed(true);
        }
      }
    }

    renderChart();
    return () => {
      cancelled = true;
    };
  }, [chart, uniqueId]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/70 to-white shadow-2xs my-2">
      <div className="flex items-center justify-between border-b border-slate-200/80 bg-slate-50/90 px-4 py-2 text-[11px] font-mono-code text-slate-600">
        <span className="flex items-center gap-1.5 font-semibold uppercase tracking-wider text-[var(--phase-ac)]">
          <GitBranch className="h-3.5 w-3.5" />
          <span>{title} · Mermaid Flowchart</span>
        </span>
        <span className="text-slate-400">System Pipeline</span>
      </div>

      {svgHtml ? (
        <div
          className="overflow-x-auto p-4 sm:p-6 flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svgHtml }}
        />
      ) : renderFailed ? (
        <pre className="overflow-x-auto p-4 font-mono-code text-xs leading-relaxed text-slate-700 bg-slate-50">
          <code>{chart}</code>
        </pre>
      ) : (
        <div className="p-4 sm:p-5">
          <pre className="overflow-x-auto font-mono-code text-xs leading-relaxed text-slate-600">
            <code>{chart}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
