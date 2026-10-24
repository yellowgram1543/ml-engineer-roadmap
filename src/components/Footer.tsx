import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GitCommitHorizontal, Code2, Languages } from 'lucide-react';

export const Footer: React.FC = () => {
  const location = useLocation();
  const isKorean = location.pathname.startsWith('/korean');
  const isDsa = location.pathname.startsWith('/dsa');

  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-xl text-white ${
              isKorean
                ? 'bg-indigo-600'
                : isDsa
                ? 'bg-emerald-600'
                : 'bg-[#6c5ce7]'
            }`}
          >
            {isKorean ? (
              <Languages className="h-5 w-5" />
            ) : isDsa ? (
              <Code2 className="h-5 w-5" />
            ) : (
              <GitCommitHorizontal className="h-5 w-5" />
            )}
          </span>
          <div>
            <p className="font-display text-sm font-bold text-slate-900">
              {isKorean
                ? 'Korean Language Mastery Roadmap'
                : isDsa
                ? 'DSA & Interview Engineering (100 Days)'
                : 'ML Engineer & Applied Scientist Roadmap'}
            </p>
            <p className="font-mono-code text-xs text-slate-500">
              {isKorean
                ? '7 Phases · 19 Levels · 22 Capstones · 349 Questions'
                : isDsa
                ? '5 Phases · 31 Blocks · 22 Core Patterns'
                : '7 Phases · 19 Levels · Interactive Checklist Edition'}
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-5 text-xs sm:text-sm font-medium text-slate-600" aria-label="Footer">
          {isKorean ? (
            <>
              <Link to="/korean" className="hover:text-indigo-600 transition-colors font-semibold text-slate-900">
                Korean Roadmap
              </Link>
              <Link to="/korean/projects" className="hover:text-indigo-600 transition-colors">
                22 Capstones
              </Link>
              <Link to="/korean/questions" className="hover:text-indigo-600 transition-colors">
                Question Banks &amp; Flipcards
              </Link>
              <span className="text-slate-300">|</span>
              <Link to="/" className="hover:text-[#6c5ce7] transition-colors">
                ML Roadmap
              </Link>
              <Link to="/dsa" className="hover:text-emerald-700 transition-colors">
                DSA 100 Days
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-[#6c5ce7] transition-colors">
                ML Roadmap
              </Link>
              <Link to="/dsa" className="hover:text-emerald-700 transition-colors">
                DSA 100 Days
              </Link>
              <Link to="/korean" className="hover:text-indigo-600 transition-colors">
                Korean Mastery
              </Link>
              <Link to="/dsa/patterns" className="hover:text-emerald-700 transition-colors">
                22 Patterns
              </Link>
              <Link to="/dsa/applied-track" className="hover:text-emerald-700 transition-colors">
                Applied Track
              </Link>
              <Link to="/dsa/negotiation" className="hover:text-emerald-700 transition-colors">
                Negotiation Playbook
              </Link>
              <Link to="/projects" className="hover:text-[#6c5ce7] transition-colors">
                Projects
              </Link>
              <Link to="/interview-prep" className="hover:text-[#6c5ce7] transition-colors">
                Interview Prep
              </Link>
            </>
          )}
        </nav>

        <p className="font-mono-code text-xs text-slate-400">
          © 2026 Interactive Roadmap Suite
        </p>
      </div>
    </footer>
  );
};
