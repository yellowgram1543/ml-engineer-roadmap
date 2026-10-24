import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Layers,
  FolderKanban,
  HelpCircle,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { RoadmapData } from '../types/roadmap';

interface CommandPaletteModalProps {
  data: RoadmapData;
  isOpen: boolean;
  onClose: () => void;
  basePath?: string;
  projectsPath?: string;
  questionsPath?: string;
}

interface SearchHit {
  id: string;
  kind: 'Level' | 'Section' | 'Module' | 'Project' | 'Interview Q';
  badge: string;
  title: string;
  subtitle: string;
  href: string;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  data,
  isOpen,
  onClose,
  basePath = '/level',
  projectsPath = '/projects',
  questionsPath = '/interview-prep',
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Build search index once
  const allItems = React.useMemo<SearchHit[]>(() => {
    const items: SearchHit[] = [];

    for (const lvl of data.levels) {
      const bLabel = lvl.badge === 'B' ? 'Bridge' : `L${lvl.badge}`;
      items.push({
        id: `lvl-${lvl.id}`,
        kind: 'Level',
        badge: bLabel,
        title: lvl.title,
        subtitle: `Phase ${lvl.phaseNum} · ${lvl.phaseName} · ${lvl.goal}`,
        href: `${basePath}/${lvl.id}`,
      });

      for (const sec of lvl.sections) {
        items.push({
          id: `sec-${sec.id}`,
          kind: 'Section',
          badge: `${bLabel} · ${sec.code}`,
          title: sec.title,
          subtitle: sec.objective || lvl.title,
          href: `${basePath}/${lvl.id}#${sec.id}`,
        });

        for (const mod of sec.modules) {
          items.push({
            id: `mod-${mod.id}`,
            kind: 'Module',
            badge: `${bLabel} · ${sec.code}`,
            title: mod.title,
            subtitle: `${sec.title} (${lvl.title})`,
            href: `${basePath}/${lvl.id}#${sec.id}`,
          });
        }
      }
    }

    for (const proj of data.projects) {
      items.push({
        id: `proj-${proj.id}`,
        kind: 'Project',
        badge: proj.levelBadge || 'Capstone',
        title: proj.title,
        subtitle: `${proj.kind} · ${proj.phaseName}`,
        href: `${projectsPath}#${proj.id}`,
      });
    }

    for (const bank of data.interviewBanks) {
      for (const grp of bank.groups) {
        for (const q of grp.questions) {
          items.push({
            id: `q-${q.id}`,
            kind: 'Interview Q',
            badge: `${bank.levelBadge} · Q${q.number}`,
            title: q.question.replace(/`/g, ''),
            subtitle: `${grp.title} · ${q.type} (${bank.levelTitle})`,
            href: questionsPath,
          });
        }
      }
    }

    return items;
  }, [data]);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return allItems.filter((it) => it.kind === 'Level' || it.kind === 'Project').slice(0, 14);
    }
    const tokens = q.split(/\s+/);
    const matched = allItems.filter((it) => {
      const hay = `${it.badge} ${it.title} ${it.subtitle}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });
    return matched.slice(0, 24);
  }, [allItems, query]);

  React.useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [isOpen]);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (hit: SearchHit) => {
    onClose();
    if (hit.href.includes('#')) {
      const [pathname, hash] = hit.href.split('#');
      navigate(pathname);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    } else {
      navigate(hit.href);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev - 1 < 0 ? Math.max(0, results.length - 1) : prev - 1
      );
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const getKindIcon = (kind: SearchHit['kind']) => {
    switch (kind) {
      case 'Level':
        return <Layers className="h-4 w-4 text-[#6c5ce7]" />;
      case 'Section':
      case 'Module':
        return <BookOpen className="h-4 w-4 text-sky-600" />;
      case 'Project':
        return <FolderKanban className="h-4 w-4 text-emerald-600" />;
      case 'Interview Q':
        return <HelpCircle className="h-4 w-4 text-amber-600" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-900/50 backdrop-blur-xs pt-14 sm:pt-24 px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Global Roadmap Search"
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Header */}
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3.5">
          <Search className="h-4 w-4 text-[#6c5ce7] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 20 levels, 187 sections, 26 capstones, 532 interview questions (e.g., LoRA, SHAP, CUPED)..."
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono-code text-[10px] font-semibold text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-slate-100">
          {results.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              No matching levels, modules, projects, or questions for "{query}".
            </div>
          ) : (
            results.map((hit, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={hit.id}
                  type="button"
                  onClick={() => handleSelect(hit)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left flex items-center justify-between gap-3 px-4 py-3 transition-colors cursor-pointer ${
                    isSelected ? 'bg-[#6c5ce7]/8' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="mt-0.5 shrink-0">{getKindIcon(hit.kind)}</span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono-code text-[10px] font-bold text-slate-700">
                          {hit.badge}
                        </span>
                        <span className="font-mono-code text-[10px] uppercase tracking-wider text-slate-400">
                          {hit.kind}
                        </span>
                      </div>
                      <p className="font-display text-sm font-bold text-slate-900 truncate mt-0.5">
                        {hit.title}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{hit.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isSelected ? 'text-[#6c5ce7] translate-x-0.5' : 'text-slate-300'
                    }`}
                  />
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2 font-mono-code text-[11px] text-slate-500">
          <span>↑↓ to navigate · Enter to jump · Esc to close</span>
          <span>{allItems.length} indexed items</span>
        </div>
      </div>
    </div>
  );
};
