import React from 'react';
import { GitBranch, Code2 } from 'lucide-react';

interface MermaidDiagramProps {
  chart: string;
  title?: string;
}

interface ParsedNode {
  id: string;
  label: string;
  group?: string;
}

interface ParsedEdge {
  from: string;
  to: string;
  dashed: boolean;
}

interface ParsedGraph {
  direction: 'LR' | 'TD';
  nodes: ParsedNode[];
  edges: ParsedEdge[];
}

function parseMermaidFlowchart(chart: string): ParsedGraph {
  const lines = chart
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  let direction: 'LR' | 'TD' = 'TD';
  if (lines[0]?.toUpperCase().includes('LR')) {
    direction = 'LR';
  }

  const nodeMap = new Map<string, ParsedNode>();
  const edges: ParsedEdge[] = [];
  let currentSubgraph: string | undefined;

  const ensureNode = (rawToken: string): string => {
    const token = rawToken.trim();
    const match = token.match(/^([A-Za-z0-9_]+)(?:\["([^"]+)"\]|\[([^\]]+)\])?$/);
    if (match) {
      const id = match[1];
      const label = match[2] || match[3];
      const existing = nodeMap.get(id);
      if (!existing) {
        nodeMap.set(id, {
          id,
          label: label || id,
          group: currentSubgraph,
        });
      } else {
        if (label && existing.label === existing.id) {
          existing.label = label;
        }
        if (currentSubgraph && !existing.group) {
          existing.group = currentSubgraph;
        }
      }
      return id;
    }
    if (!nodeMap.has(token)) {
      nodeMap.set(token, { id: token, label: token, group: currentSubgraph });
    }
    return token;
  };

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('subgraph ')) {
      const subMatch = line.match(/^subgraph\s+[A-Za-z0-9_]+\["([^"]+)"\]/) ||
        line.match(/^subgraph\s+(.+)$/);
      currentSubgraph = subMatch ? subMatch[1].replace(/^["']|["']$/g, '') : 'Subgraph';
      continue;
    }
    if (line === 'end') {
      currentSubgraph = undefined;
      continue;
    }

    const edgeMatch = line.match(/^(.+?)\s*(-->|-\.->)\s*(.+)$/);
    if (edgeMatch) {
      const fromId = ensureNode(edgeMatch[1]);
      const dashed = edgeMatch[2] === '-.->';
      const toId = ensureNode(edgeMatch[3]);
      edges.push({ from: fromId, to: toId, dashed });
    } else {
      ensureNode(line);
    }
  }

  return {
    direction,
    nodes: Array.from(nodeMap.values()),
    edges,
  };
}

interface PositionedNode extends ParsedNode {
  rank: number;
  order: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

function layoutFlowchart(graph: ParsedGraph) {
  const { nodes, edges } = graph;
  const ranks = new Map<string, number>();

  for (const n of nodes) {
    ranks.set(n.id, 0);
  }

  // Longest-path layering (relax edges up to N times)
  for (let iter = 0; iter < nodes.length + 2; iter++) {
    let changed = false;
    for (const e of edges) {
      const uRank = ranks.get(e.from) ?? 0;
      const vRank = ranks.get(e.to) ?? 0;
      if (vRank < uRank + 1) {
        ranks.set(e.to, uRank + 1);
        changed = true;
      }
    }
    if (!changed) break;
  }

  const layers = new Map<number, ParsedNode[]>();
  let maxRank = 0;
  for (const n of nodes) {
    const r = ranks.get(n.id) ?? 0;
    if (r > maxRank) maxRank = r;
    const list = layers.get(r) || [];
    list.push(n);
    layers.set(r, list);
  }

  // Always render as a clean top-down layered architecture flowchart with multi-column fan-out
  // so long engineering labels never clip horizontally and fit comfortably inside any card width.
  const NODE_W = 240;
  const NODE_H = 56;
  const COL_GAP = 28;
  const ROW_GAP = 54;
  const PAD_X = 32;
  const PAD_Y = 32;

  let maxCols = 1;
  for (const list of layers.values()) {
    if (list.length > maxCols) maxCols = list.length;
  }

  const totalWidth = Math.max(
    680,
    maxCols * NODE_W + (maxCols - 1) * COL_GAP + PAD_X * 2
  );
  const totalHeight =
    (maxRank + 1) * NODE_H + maxRank * ROW_GAP + PAD_Y * 2;

  const positioned = new Map<string, PositionedNode>();

  for (let r = 0; r <= maxRank; r++) {
    const list = layers.get(r) || [];
    const rowWidth = list.length * NODE_W + (list.length - 1) * COL_GAP;
    const startX = (totalWidth - rowWidth) / 2;
    const y = PAD_Y + r * (NODE_H + ROW_GAP);

    list.forEach((n, idx) => {
      const x = startX + idx * (NODE_W + COL_GAP);
      positioned.set(n.id, {
        ...n,
        rank: r,
        order: idx,
        x,
        y,
        w: NODE_W,
        h: NODE_H,
      });
    });
  }

  return {
    positioned: Array.from(positioned.values()),
    positionedMap: positioned,
    edges,
    width: totalWidth,
    height: totalHeight,
    maxRank,
  };
}

function wrapLabel(label: string, maxCharsPerLine = 28): string[] {
  const words = label.split(/\s+/);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    if (!current) {
      current = word;
    } else if ((current + ' ' + word).length <= maxCharsPerLine) {
      current += ' ' + word;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 2);
}

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({
  chart,
  title = 'Architecture Flowchart',
}) => {
  const [showSource, setShowSource] = React.useState(false);
  const markerId = React.useId().replace(/[^a-zA-Z0-9]/g, '');

  const layout = React.useMemo(() => {
    const parsed = parseMermaidFlowchart(chart);
    return layoutFlowchart(parsed);
  }, [chart]);

  // Compute optional subgraph bounding boxes
  const groupBoxes = React.useMemo(() => {
    const groups = new Map<
      string,
      { label: string; minX: number; minY: number; maxX: number; maxY: number }
    >();
    for (const n of layout.positioned) {
      if (!n.group) continue;
      const g = groups.get(n.group);
      if (!g) {
        groups.set(n.group, {
          label: n.group,
          minX: n.x - 16,
          minY: n.y - 26,
          maxX: n.x + n.w + 16,
          maxY: n.y + n.h + 14,
        });
      } else {
        g.minX = Math.min(g.minX, n.x - 16);
        g.minY = Math.min(g.minY, n.y - 26);
        g.maxX = Math.max(g.maxX, n.x + n.w + 16);
        g.maxY = Math.max(g.maxY, n.y + n.h + 14);
      }
    }
    return Array.from(groups.values());
  }, [layout.positioned]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50/70 to-white shadow-2xs my-2">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 bg-slate-50/90 px-4 py-2.5 text-[11px] font-mono-code text-slate-600">
        <span className="flex items-center gap-1.5 font-semibold uppercase tracking-wider text-[var(--phase-ac)]">
          <GitBranch className="h-3.5 w-3.5 shrink-0" />
          <span>{title}</span>
        </span>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-slate-400">Mermaid Flowchart</span>
          <button
            type="button"
            onClick={() => setShowSource((v) => !v)}
            className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-600 hover:border-[var(--phase-ac)] hover:text-[var(--phase-ac)] transition-colors cursor-pointer"
          >
            <Code2 className="h-3 w-3" />
            {showSource ? 'Hide Mermaid Code' : 'View Mermaid Code'}
          </button>
        </div>
      </div>

      {/* Deterministic Vector SVG Flowchart */}
      <div className="overflow-x-auto p-4 sm:p-6 flex justify-center bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
        <svg
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          width={layout.width}
          height={layout.height}
          className="max-w-full h-auto select-none"
          role="img"
          aria-label={title}
        >
          <defs>
            <marker
              id={`arrow-${markerId}`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#64748b" />
            </marker>
            <filter
              id={`shadow-${markerId}`}
              x="-8%"
              y="-8%"
              width="116%"
              height="124%"
            >
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="2.5"
                floodColor="#0f172a"
                floodOpacity="0.06"
              />
            </filter>
          </defs>

          {/* Subgraph / Cluster Boxes */}
          {groupBoxes.map((g, idx) => (
            <g key={`group-${idx}`}>
              <rect
                x={g.minX}
                y={g.minY}
                width={g.maxX - g.minX}
                height={g.maxY - g.minY}
                rx={14}
                fill="#f8fafc"
                fillOpacity={0.85}
                stroke="#cbd5e1"
                strokeWidth={1.5}
                strokeDasharray="5 4"
              />
              <text
                x={g.minX + 12}
                y={g.minY + 16}
                fill="#475569"
                fontSize="10.5"
                fontWeight="700"
                fontFamily="JetBrains Mono, ui-monospace, monospace"
              >
                {g.label.toUpperCase()}
              </text>
            </g>
          ))}

          {/* Directed Edges (Smooth Cubic Beziers) */}
          {layout.edges.map((e, idx) => {
            const fromNode = layout.positionedMap.get(e.from);
            const toNode = layout.positionedMap.get(e.to);
            if (!fromNode || !toNode) return null;

            const x1 = fromNode.x + fromNode.w / 2;
            const y1 = fromNode.y + fromNode.h;
            const x2 = toNode.x + toNode.w / 2;
            const y2 = toNode.y - 4;
            const midY = (y1 + y2) / 2;

            const pathD = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

            return (
              <path
                key={`edge-${idx}`}
                d={pathD}
                fill="none"
                stroke="#64748b"
                strokeWidth="1.75"
                strokeDasharray={e.dashed ? '5 4' : undefined}
                markerEnd={`url(#arrow-${markerId})`}
              />
            );
          })}

          {/* Flowchart Nodes */}
          {layout.positioned.map((node) => {
            const isStart = node.rank === 0;
            const isEnd = node.rank === layout.maxRank && layout.maxRank > 0;
            const lines = wrapLabel(node.label, 28);

            const fill = isStart
              ? '#f5f3ff'
              : isEnd
              ? '#ecfdf5'
              : '#ffffff';
            const stroke = isStart
              ? '#7c3aed'
              : isEnd
              ? '#10b981'
              : '#cbd5e1';
            const textColor = isStart
              ? '#4c1d95'
              : isEnd
              ? '#065f46'
              : '#0f172a';

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                filter={`url(#shadow-${markerId})`}
              >
                <rect
                  width={node.w}
                  height={node.h}
                  rx={12}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={isStart || isEnd ? 2 : 1.5}
                />
                {/* Left accent pill inside node */}
                <rect
                  x={0}
                  y={10}
                  width={3.5}
                  height={node.h - 20}
                  rx={1.75}
                  fill={isStart ? '#7c3aed' : isEnd ? '#10b981' : '#64748b'}
                />
                {lines.length === 1 ? (
                  <text
                    x={node.w / 2}
                    y={node.h / 2 + 4}
                    textAnchor="middle"
                    fill={textColor}
                    fontSize="12"
                    fontWeight="600"
                    fontFamily="Inter, system-ui, -apple-system, sans-serif"
                  >
                    {lines[0]}
                  </text>
                ) : (
                  <>
                    <text
                      x={node.w / 2}
                      y={node.h / 2 - 4}
                      textAnchor="middle"
                      fill={textColor}
                      fontSize="11.5"
                      fontWeight="600"
                      fontFamily="Inter, system-ui, -apple-system, sans-serif"
                    >
                      {lines[0]}
                    </text>
                    <text
                      x={node.w / 2}
                      y={node.h / 2 + 12}
                      textAnchor="middle"
                      fill={textColor}
                      fontSize="11.5"
                      fontWeight="600"
                      fontFamily="Inter, system-ui, -apple-system, sans-serif"
                    >
                      {lines[1]}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Optional collapsible Mermaid syntax block */}
      {showSource && (
        <pre className="border-t border-slate-200 overflow-x-auto p-4 font-mono-code text-xs leading-relaxed text-slate-700 bg-slate-50">
          <code>{chart}</code>
        </pre>
      )}
    </div>
  );
};
