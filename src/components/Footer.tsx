import React from 'react';
import { Link } from 'react-router-dom';
import { GitCommitHorizontal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6c5ce7] text-white">
            <GitCommitHorizontal className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-sm font-bold text-slate-900">
              ML Engineer &amp; Applied Scientist Roadmap
            </p>
            <p className="font-mono-code text-xs text-slate-500">
              7 Phases · 19 Levels · Interactive Checklist Edition
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-600" aria-label="Footer">
          <Link to="/" className="hover:text-[#6c5ce7] transition-colors">
            Full Roadmap
          </Link>
          <Link to="/level/level-0" className="hover:text-[#6c5ce7] transition-colors">
            Level 0
          </Link>
          <Link to="/projects" className="hover:text-[#6c5ce7] transition-colors">
            Projects
          </Link>
          <Link to="/interview-prep" className="hover:text-[#6c5ce7] transition-colors">
            Interview Prep
          </Link>
        </nav>

        <p className="font-mono-code text-xs text-slate-400">
          © 2026 ML &amp; Applied Scientist Roadmap
        </p>
      </div>
    </footer>
  );
};
