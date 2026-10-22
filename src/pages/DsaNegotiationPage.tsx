import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  DollarSign,
  Briefcase,
  Copy,
  CheckCheck,
  TrendingUp,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Award,
  Layers,
  ArrowRight,
  Calculator,
  MessageSquare,
  Sparkles,
  Clock,
  Building2,
  FileCheck,
} from 'lucide-react';
import { DsaRoadmapData } from '../types/dsaRoadmap';

interface DsaNegotiationPageProps {
  data: DsaRoadmapData;
}

interface OfferData {
  company: string;
  role: string;
  base: number;
  bonusPct: number;
  equity4Yr: number;
  vestingType: 'equal' | 'amazon' | 'frontloaded';
  signOnY1: number;
  signOnY2: number;
}

const DEFAULT_OFFER_A: OfferData = {
  company: 'Tier 1 Tech / Big Tech',
  role: 'Senior Software Engineer (L5)',
  base: 185000,
  bonusPct: 15,
  equity4Yr: 400000,
  vestingType: 'equal',
  signOnY1: 35000,
  signOnY2: 15000,
};

const DEFAULT_OFFER_B: OfferData = {
  company: 'High-Growth AI Scaleup',
  role: 'Applied Scientist II / Senior ML',
  base: 205000,
  bonusPct: 10,
  equity4Yr: 320000,
  vestingType: 'equal',
  signOnY1: 50000,
  signOnY2: 0,
};

function calculateComp(offer: OfferData) {
  const annualBonus = offer.base * (offer.bonusPct / 100);
  
  let equityY1 = 0;
  let equityY2 = 0;
  let equityY3 = 0;
  let equityY4 = 0;

  if (offer.vestingType === 'equal') {
    equityY1 = equityY2 = equityY3 = equityY4 = offer.equity4Yr * 0.25;
  } else if (offer.vestingType === 'amazon') {
    equityY1 = offer.equity4Yr * 0.05;
    equityY2 = offer.equity4Yr * 0.15;
    equityY3 = offer.equity4Yr * 0.40;
    equityY4 = offer.equity4Yr * 0.40;
  } else if (offer.vestingType === 'frontloaded') {
    equityY1 = offer.equity4Yr * 0.33;
    equityY2 = offer.equity4Yr * 0.33;
    equityY3 = offer.equity4Yr * 0.22;
    equityY4 = offer.equity4Yr * 0.12;
  }

  const y1Total = offer.base + annualBonus + equityY1 + offer.signOnY1;
  const y2Total = offer.base + annualBonus + equityY2 + offer.signOnY2;
  const fourYearTotal = (offer.base + annualBonus) * 4 + offer.equity4Yr + offer.signOnY1 + offer.signOnY2;
  const annualizedAvg = fourYearTotal / 4;

  return {
    annualBonus,
    equityY1,
    equityY2,
    y1Total,
    y2Total,
    fourYearTotal,
    annualizedAvg,
  };
}

export const DsaNegotiationPage: React.FC<DsaNegotiationPageProps> = () => {
  const [offerA, setOfferA] = useState<OfferData>(DEFAULT_OFFER_A);
  const [offerB, setOfferB] = useState<OfferData>(DEFAULT_OFFER_B);
  const [compareMode, setCompareMode] = useState<boolean>(true);
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);

  const statsA = calculateComp(offerA);
  const statsB = calculateComp(offerB);

  const copyScript = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScriptId(id);
    setTimeout(() => setCopiedScriptId(null), 2200);
  };

  const deltaY1 = statsB.y1Total - statsA.y1Total;
  const deltaAvg = statsB.annualizedAvg - statsA.annualizedAvg;

  return (
    <main id="main" className="min-h-screen pb-24 bg-[#fcfcfd]">
      {/* ───────────────── HERO BANNER ───────────────── */}
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
                <span>Post-Loop Execution · Offer Engineering</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-2">
                The Offer &amp; Negotiation Playbook
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-3xl leading-relaxed">
                Passing the technical loop is only half the battle. This playbook converts your offers into maximum total compensation, the right leveling band, and career compounding. Never negotiate blindly.
              </p>
            </div>

            {/* Quick jump anchor tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a
                href="#calculator"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-emerald-600 hover:text-emerald-700 transition"
              >
                <Calculator className="h-3.5 w-3.5 text-emerald-600" />
                <span>TC Calculator</span>
              </a>
              <a
                href="#rules"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-emerald-600 hover:text-emerald-700 transition"
              >
                <Award className="h-3.5 w-3.5 text-emerald-600" />
                <span>5 Core Rules</span>
              </a>
              <a
                href="#scripts"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-emerald-600 hover:text-emerald-700 transition"
              >
                <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
                <span>Copyable Scripts</span>
              </a>
              <a
                href="#leveling"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-emerald-600 hover:text-emerald-700 transition"
              >
                <Layers className="h-3.5 w-3.5 text-emerald-600" />
                <span>Leveling Bands</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-16">
        {/* ───────────────── 1. INTERACTIVE TC CALCULATOR & COMPARATOR ───────────────── */}
        <section id="calculator" className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 text-emerald-700 font-mono-code text-xs uppercase font-bold tracking-wider mb-1">
                <Calculator className="h-4 w-4" />
                Interactive Modeling Tool
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Total Compensation (TC) &amp; Offer Comparator
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Model real Year 1 take-home vs 4-year annualized earnings across base, bonus, equity cliffs, and sign-ons.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center">
              <button
                type="button"
                onClick={() => setCompareMode(!compareMode)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold border transition-all ${
                  compareMode
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                {compareMode ? '✓ Comparing Two Offers' : '+ Compare Another Offer'}
              </button>
            </div>
          </div>

          {/* Calculator Grid */}
          <div className={`grid grid-cols-1 ${compareMode ? 'lg:grid-cols-2' : ''} gap-8`}>
            {/* Offer A Panel */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono-code text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Offer A (Primary)
                </span>
                <span className="font-mono-code text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Year 1 TC: ${statsA.y1Total.toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase">Company Name</label>
                  <input
                    type="text"
                    value={offerA.company}
                    onChange={(e) => setOfferA({ ...offerA, company: e.target.value })}
                    className="w-full mt-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase">Role / Level</label>
                  <input
                    type="text"
                    value={offerA.role}
                    onChange={(e) => setOfferA({ ...offerA, role: e.target.value })}
                    className="w-full mt-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase">Base Salary ($)</label>
                  <input
                    type="number"
                    step="5000"
                    value={offerA.base}
                    onChange={(e) => setOfferA({ ...offerA, base: Number(e.target.value) })}
                    className="w-full mt-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase">Target Bonus (%)</label>
                  <input
                    type="number"
                    step="1"
                    value={offerA.bonusPct}
                    onChange={(e) => setOfferA({ ...offerA, bonusPct: Number(e.target.value) })}
                    className="w-full mt-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase">4-Yr Equity Grant ($)</label>
                  <input
                    type="number"
                    step="10000"
                    value={offerA.equity4Yr}
                    onChange={(e) => setOfferA({ ...offerA, equity4Yr: Number(e.target.value) })}
                    className="w-full mt-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase">Vesting Schedule</label>
                  <select
                    value={offerA.vestingType}
                    onChange={(e) => setOfferA({ ...offerA, vestingType: e.target.value as any })}
                    className="w-full mt-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-emerald-500"
                  >
                    <option value="equal">Standard (25% / year)</option>
                    <option value="amazon">Amazon Backloaded (5% / 15% / 40% / 40%)</option>
                    <option value="frontloaded">Frontloaded (33% / 33% / 22% / 12%)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase">Sign-On Bonus Year 1 ($)</label>
                  <input
                    type="number"
                    step="5000"
                    value={offerA.signOnY1}
                    onChange={(e) => setOfferA({ ...offerA, signOnY1: Number(e.target.value) })}
                    className="w-full mt-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase">Sign-On Bonus Year 2 ($)</label>
                  <input
                    type="number"
                    step="5000"
                    value={offerA.signOnY2}
                    onChange={(e) => setOfferA({ ...offerA, signOnY2: Number(e.target.value) })}
                    className="w-full mt-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-emerald-500"
                  />
                </div>
              </div>

              {/* Offer A Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center">
                <div className="rounded-lg bg-white p-2.5 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Year 1 TC</span>
                  <div className="text-sm font-bold text-emerald-700">${statsA.y1Total.toLocaleString()}</div>
                </div>
                <div className="rounded-lg bg-white p-2.5 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Year 2 TC</span>
                  <div className="text-sm font-bold text-slate-800">${statsA.y2Total.toLocaleString()}</div>
                </div>
                <div className="rounded-lg bg-white p-2.5 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400">4-Yr Total</span>
                  <div className="text-sm font-bold text-slate-900">${statsA.fourYearTotal.toLocaleString()}</div>
                </div>
                <div className="rounded-lg bg-white p-2.5 border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Annual Avg</span>
                  <div className="text-sm font-bold text-slate-800">${Math.round(statsA.annualizedAvg).toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Offer B Panel (If compareMode is enabled) */}
            {compareMode && (
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Offer B (Competing / Counter)
                  </span>
                  <span className="font-mono-code text-xs font-semibold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                    Year 1 TC: ${statsB.y1Total.toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase">Company Name</label>
                    <input
                      type="text"
                      value={offerB.company}
                      onChange={(e) => setOfferB({ ...offerB, company: e.target.value })}
                      className="w-full mt-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase">Role / Level</label>
                    <input
                      type="text"
                      value={offerB.role}
                      onChange={(e) => setOfferB({ ...offerB, role: e.target.value })}
                      className="w-full mt-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase">Base Salary ($)</label>
                    <input
                      type="number"
                      step="5000"
                      value={offerB.base}
                      onChange={(e) => setOfferB({ ...offerB, base: Number(e.target.value) })}
                      className="w-full mt-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase">Target Bonus (%)</label>
                    <input
                      type="number"
                      step="1"
                      value={offerB.bonusPct}
                      onChange={(e) => setOfferB({ ...offerB, bonusPct: Number(e.target.value) })}
                      className="w-full mt-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase">4-Yr Equity Grant ($)</label>
                    <input
                      type="number"
                      step="10000"
                      value={offerB.equity4Yr}
                      onChange={(e) => setOfferB({ ...offerB, equity4Yr: Number(e.target.value) })}
                      className="w-full mt-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase">Vesting Schedule</label>
                    <select
                      value={offerB.vestingType}
                      onChange={(e) => setOfferB({ ...offerB, vestingType: e.target.value as any })}
                      className="w-full mt-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-emerald-500"
                    >
                      <option value="equal">Standard (25% / year)</option>
                      <option value="amazon">Amazon Backloaded (5% / 15% / 40% / 40%)</option>
                      <option value="frontloaded">Frontloaded (33% / 33% / 22% / 12%)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase">Sign-On Bonus Year 1 ($)</label>
                    <input
                      type="number"
                      step="5000"
                      value={offerB.signOnY1}
                      onChange={(e) => setOfferB({ ...offerB, signOnY1: Number(e.target.value) })}
                      className="w-full mt-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase">Sign-On Bonus Year 2 ($)</label>
                    <input
                      type="number"
                      step="5000"
                      value={offerB.signOnY2}
                      onChange={(e) => setOfferB({ ...offerB, signOnY2: Number(e.target.value) })}
                      className="w-full mt-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-emerald-500"
                    />
                  </div>
                </div>

                {/* Offer B Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center">
                  <div className="rounded-lg bg-white p-2.5 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Year 1 TC</span>
                    <div className="text-sm font-bold text-sky-700">${statsB.y1Total.toLocaleString()}</div>
                  </div>
                  <div className="rounded-lg bg-white p-2.5 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Year 2 TC</span>
                    <div className="text-sm font-bold text-slate-800">${statsB.y2Total.toLocaleString()}</div>
                  </div>
                  <div className="rounded-lg bg-white p-2.5 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400">4-Yr Total</span>
                    <div className="text-sm font-bold text-slate-900">${statsB.fourYearTotal.toLocaleString()}</div>
                  </div>
                  <div className="rounded-lg bg-white p-2.5 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Annual Avg</span>
                    <div className="text-sm font-bold text-slate-800">${Math.round(statsB.annualizedAvg).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Differential Analysis Callout */}
          {compareMode && (
            <div className="rounded-xl border border-emerald-300 bg-emerald-50/70 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono-code text-xs uppercase font-bold text-emerald-900">
                  Delta Comparison (Offer B vs Offer A)
                </span>
                <p className="text-sm text-slate-800">
                  {deltaAvg >= 0 ? (
                    <>
                      <strong>{offerB.company}</strong> offers an annualized surplus of{' '}
                      <span className="font-bold text-emerald-800">+${Math.abs(Math.round(deltaAvg)).toLocaleString()}/year</span>{' '}
                      (+{((deltaAvg / statsA.annualizedAvg) * 100).toFixed(1)}%) compared to {offerA.company}.
                    </>
                  ) : (
                    <>
                      <strong>{offerA.company}</strong> leads by{' '}
                      <span className="font-bold text-emerald-800">+${Math.abs(Math.round(deltaAvg)).toLocaleString()}/year</span>{' '}
                      over {offerB.company}.
                    </>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-mono-code">Year 1 Delta</div>
                  <div className={`font-mono-code text-base font-bold ${deltaY1 >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {deltaY1 >= 0 ? `+$${deltaY1.toLocaleString()}` : `-$${Math.abs(deltaY1).toLocaleString()}`}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ───────────────── 2. THE 5 IMMUTABLE RULES ───────────────── */}
        <section id="rules" className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-emerald-700 font-mono-code text-xs uppercase font-bold tracking-wider mb-1">
              <Award className="h-4 w-4" />
              Strategic Principles
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              The Five Immutable Rules of Tech Negotiation
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
              Internalize these 5 principles. Negotiation is not about confrontation — it is a joint problem-solving exercise with the recruiter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Rule 1 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 font-mono-code font-bold text-sm">
                    01
                  </span>
                  <span className="text-xs font-mono-code text-slate-400">Anchor Control</span>
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Never Name a Number First
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The moment you state a number during early recruiter calls, you set a ceiling on your offer. Recruiters ask to ensure you fit within their band — your goal is to let them reveal the band first.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs space-y-1.5">
                <div className="font-semibold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> What to say:
                </div>
                <p className="italic text-slate-700">
                  "I'd rather understand the scope and leveling first — what compensation band is this role budgeted for?"
                </p>
              </div>
            </div>

            {/* Rule 2 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 font-mono-code font-bold text-sm">
                    02
                  </span>
                  <span className="text-xs font-mono-code text-slate-400">Total Package</span>
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Get Total Comp in Writing
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Never negotiate against a verbal base number. You must see the full package: Base, Target Bonus, 4-Yr RSU grant, Vesting Schedule (cliff/backloaded), and Sign-On clawbacks before discussing counters.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs space-y-1.5">
                <div className="font-semibold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> What to say:
                </div>
                <p className="italic text-slate-700">
                  "I'm thrilled with the team's feedback! Could you send over the full written compensation breakdown so I can review it in detail?"
                </p>
              </div>
            </div>

            {/* Rule 3 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 font-mono-code font-bold text-sm">
                    03
                  </span>
                  <span className="text-xs font-mono-code text-slate-400">Single Shot</span>
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Negotiate Once, Politely, with a Reason
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Do not ping-pong 5 times with small increments. Prepare one strong, comprehensive counter with clear business justification (competing offer or market data), and state what would close the deal immediately.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs space-y-1.5">
                <div className="font-semibold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" /> What to say:
                </div>
                <p className="italic text-slate-700">
                  "If we can bring the equity grant to $X or add a sign-on of $Y to match Company Z, I am ready to sign today."
                </p>
              </div>
            </div>

            {/* Rule 4 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 font-mono-code font-bold text-sm">
                    04
                  </span>
                  <span className="text-xs font-mono-code text-slate-400">Boundary Setting</span>
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Know Your Walk-Away Point
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Write down your hard bottom line (your BATNA) on a sheet of paper before every negotiation call. Knowing your walk-away point prevents emotional concession-making when facing ticking deadlines.
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs space-y-1.5">
                <div className="font-semibold text-amber-800 flex items-center gap-1">
                  <AlertTriangle className="h-3.5 w-3.5" /> The BATNA Rule:
                </div>
                <p className="text-slate-700">
                  Never accept a lower offer out of fear. A signed bad offer costs 2+ years of reduced earning trajectory.
                </p>
              </div>
            </div>

            {/* Rule 5 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4 md:col-span-2 lg:col-span-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 font-mono-code font-bold text-sm">
                    05
                  </span>
                  <span className="text-xs font-mono-code text-slate-400">Compounding Multiplier</span>
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Level Beats Cash Every Single Time
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  A high-end L4 offer ($240k) might look close to an entry-level L5 offer ($265k). But an L5 position has higher bonus multipliers, double the annual equity refreshers, and establishes an executive track. When given the choice between pushing for $15k more base vs pushing for a level upgrade, <strong>always fight for the higher level</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs">
                  <span className="font-bold text-slate-900">Top-of-Band Mid (L4):</span>
                  <p className="text-slate-500 mt-1">Base: $180k · Equity: $80k/yr · Refreshers: ~$25k/yr. Promotion to L5 takes 2–3 years.</p>
                </div>
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs">
                  <span className="font-bold text-emerald-950">Entry-Band Senior (L5):</span>
                  <p className="text-emerald-900 mt-1">Base: $195k · Equity: $120k/yr · Refreshers: ~$60k/yr. Immediate leverage for L6.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────── 3. BATTLE-TESTED SCRIPTS ───────────────── */}
        <section id="scripts" className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-emerald-700 font-mono-code text-xs uppercase font-bold tracking-wider mb-1">
              <MessageSquare className="h-4 w-4" />
              Word-for-Word Templates
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Battle-Tested Scripts (1-Click Copy)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
              Professional, high-leverage responses tailored to every phase of the recruiter dialogue. Click copy to customize the placeholders.
            </p>
          </div>

          <div className="space-y-4">
            {/* Script 1: Initial Recruiter Screen Deflection */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono-code text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    Scenario 1
                  </span>
                  <h4 className="font-display text-base font-bold text-slate-900">
                    Recruiter Screening: "What are your salary expectations?"
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    copyScript(
                      `"Right now, I'm primarily focused on finding the right technical fit and understanding the team's roadmap. Since compensation varies widely depending on leveling and equity structure, could you share what salary band is budgeted for this role?"`,
                      'script-1'
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 hover:border-emerald-600 hover:text-emerald-700 transition"
                >
                  {copiedScriptId === 'script-1' ? (
                    <>
                      <CheckCheck className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Script</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Use when the recruiter asks for your current salary or expectations in the initial 15-minute phone screen.
              </p>
              <div className="rounded-xl bg-slate-900 p-4 font-mono-code text-xs text-slate-200 leading-relaxed">
                "Right now, I'm primarily focused on finding the right technical fit and understanding the team's roadmap. Since compensation varies widely depending on leveling and equity structure, could you share what salary band is budgeted for this role?"
              </div>
            </div>

            {/* Script 2: Receiving the First Verbal Offer */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono-code text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    Scenario 2
                  </span>
                  <h4 className="font-display text-base font-bold text-slate-900">
                    Receiving the Verbal Offer (The 24-Hour Review Rule)
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    copyScript(
                      `"Thank you so much! I really enjoyed meeting the team and I'm very excited about the problems you're tackling in [Domain/Area]. I want to review the full details carefully with my family. Could you email me the complete written compensation breakdown including base, bonus targets, equity vesting schedule, and benefits? I'll review it and get back to you by [Day]."`,
                      'script-2'
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 hover:border-emerald-600 hover:text-emerald-700 transition"
                >
                  {copiedScriptId === 'script-2' ? (
                    <>
                      <CheckCheck className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Script</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Express enthusiasm, but commit to nothing verbally on the spot. Never say "Yes" or "That sounds great" to numbers on the phone.
              </p>
              <div className="rounded-xl bg-slate-900 p-4 font-mono-code text-xs text-slate-200 leading-relaxed">
                "Thank you so much! I really enjoyed meeting the team and I'm very excited about the problems you're tackling in [Domain/Area]. I want to review the full details carefully with my family. Could you email me the complete written compensation breakdown including base, bonus targets, equity vesting schedule, and benefits? I'll review it and get back to you by [Day]."
              </div>
            </div>

            {/* Script 3: Counter-Offering with Competing Offers */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono-code text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Scenario 3
                  </span>
                  <h4 className="font-display text-base font-bold text-slate-900">
                    Counter-Offering with Competing Offer Leverage
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    copyScript(
                      `"Hi [Recruiter Name],

Thank you again for the offer to join [Company]. I'm really impressed by the team and the technical challenge ahead.

[Company] is my top choice culturally and technically. However, I have received another offer from [Competing Company] at $[Competing TC] total compensation ($[Base] base, $[Equity/yr] equity, $[SignOn] sign-on). 

Given my background in [Specialization / Key Project], if we can bridge the gap by adjusting the equity grant to $[Target Equity] or adding a sign-on bonus of $[Target SignOn], I would be thrilled to sign immediately and decline my other processes.

Looking forward to your thoughts!"`,
                      'script-3'
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 hover:border-emerald-600 hover:text-emerald-700 transition"
                >
                  {copiedScriptId === 'script-3' ? (
                    <>
                      <CheckCheck className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Script</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-500">
                The gold standard email. Establishes that they are #1 choice, cites concrete numbers, and gives them an explicit price to close you today.
              </p>
              <div className="rounded-xl bg-slate-900 p-4 font-mono-code text-xs text-slate-200 leading-relaxed whitespace-pre-line">
{`Hi [Recruiter Name],

Thank you again for the offer to join [Company]. I'm really impressed by the team and the technical challenge ahead.

[Company] is my top choice culturally and technically. However, I have received another offer from [Competing Company] at $[Competing TC] total compensation ($[Base] base, $[Equity/yr] equity, $[SignOn] sign-on). 

Given my background in [Specialization / Key Project], if we can bridge the gap by adjusting the equity grant to $[Target Equity] or adding a sign-on bonus of $[Target SignOn], I would be thrilled to sign immediately and decline my other processes.

Looking forward to your thoughts!`}
              </div>
            </div>

            {/* Script 4: Counter-Offering WITHOUT Competing Leverage */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono-code text-xs font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                    Scenario 4
                  </span>
                  <h4 className="font-display text-base font-bold text-slate-900">
                    Counter-Offering Without a Competing Offer (Market Value Anchor)
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    copyScript(
                      `"Hi [Recruiter Name],

Thank you for putting this offer together. I'm very excited about joining [Team/Org] and contributing to [Core Project].

Based on my research into current market percentiles for [Role & Level] roles in [Location/Remote], as well as my specialized track record in [e.g., distributed training / low-latency systems], I was expecting total compensation closer to $[Target TC]. 

Is there flexibility to increase the initial equity grant to $[Target Equity] or introduce a sign-on bonus of $[Target SignOn] to reflect this market level? Doing so would make this an easy decision for me."`,
                      'script-4'
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 hover:border-emerald-600 hover:text-emerald-700 transition"
                >
                  {copiedScriptId === 'script-4' ? (
                    <>
                      <CheckCheck className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Script</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-500">
                You don't need a competing offer to negotiate. Anchor on market compensation percentiles (e.g., Levels.fyi 75th percentile) and specialized domain expertise.
              </p>
              <div className="rounded-xl bg-slate-900 p-4 font-mono-code text-xs text-slate-200 leading-relaxed whitespace-pre-line">
{`Hi [Recruiter Name],

Thank you for putting this offer together. I'm very excited about joining [Team/Org] and contributing to [Core Project].

Based on my research into current market percentiles for [Role & Level] roles in [Location/Remote], as well as my specialized track record in [e.g., distributed training / low-latency systems], I was expecting total compensation closer to $[Target TC]. 

Is there flexibility to increase the initial equity grant to $[Target Equity] or introduce a sign-on bonus of $[Target SignOn] to reflect this market level? Doing so would make this an easy decision for me.`}
              </div>
            </div>

            {/* Script 5: Requesting an Extension */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono-code text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                    Scenario 5
                  </span>
                  <h4 className="font-display text-base font-bold text-slate-900">
                    Defusing an Exploding Offer Deadline
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    copyScript(
                      `"Hi [Recruiter Name],

I really appreciate the deadline you've outlined. Because this is a major career milestone, I want to make sure I give this decision the full consideration it deserves. I am in the final stages of a couple of other loops that conclude by next Wednesday. 

Would it be possible to extend the decision deadline to [Target Date, e.g. next Friday]? This will give me enough time to wrap up those discussions and make a 100% committed decision to [Company]."`,
                      'script-5'
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 hover:border-emerald-600 hover:text-emerald-700 transition"
                >
                  {copiedScriptId === 'script-5' ? (
                    <>
                      <CheckCheck className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Script</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-slate-500">
                Almost all exploding deadlines (e.g. 48 or 72 hours) are recruiter tactics. Companies invest \$20k+ in candidate screening and won't walk away over a 1-week extension.
              </p>
              <div className="rounded-xl bg-slate-900 p-4 font-mono-code text-xs text-slate-200 leading-relaxed whitespace-pre-line">
{`Hi [Recruiter Name],

I really appreciate the deadline you've outlined. Because this is a major career milestone, I want to make sure I give this decision the full consideration it deserves. I am in the final stages of a couple of other loops that conclude by next Wednesday. 

Would it be possible to extend the decision deadline to [Target Date, e.g. next Friday]? This will give me enough time to wrap up those discussions and make a 100% committed decision to [Company].`}
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────── 4. LEVELING & BANDS MATRIX ───────────────── */}
        <section id="leveling" className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-emerald-700 font-mono-code text-xs uppercase font-bold tracking-wider mb-1">
              <Layers className="h-4 w-4" />
              Band Economics
            </div>
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Tech Leveling Equivalency &amp; Compensation Weights
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              How FAANG and Tier 1 Tech calibrate levels, stock weighting, and autonomous ownership expectations.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 font-mono-code text-[11px] uppercase tracking-wider text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-bold">Standard Level</th>
                  <th className="px-4 py-3 font-semibold">Equivalent Bands</th>
                  <th className="px-4 py-3 font-semibold">Autonomy &amp; Scope</th>
                  <th className="px-4 py-3 font-semibold">Typical Comp Ratio</th>
                  <th className="px-4 py-3 font-semibold">Negotiation Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                <tr className="hover:bg-slate-50/80 transition">
                  <td className="px-4 py-3.5 font-bold text-slate-900">
                    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono-code text-xs">
                      Junior / Entry
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono-code text-xs text-slate-600">
                    L3 · E3 · SDE I · AS I
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-xs">
                    Executes well-defined tasks; requires code reviews and architectural oversight.
                  </td>
                  <td className="px-4 py-3 font-mono-code text-xs">
                    75% Base / 25% Equity
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold text-emerald-800">
                    Sign-on bonus &amp; Base salary
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition">
                  <td className="px-4 py-3.5 font-bold text-slate-900">
                    <span className="inline-block px-2 py-0.5 rounded bg-sky-50 text-sky-800 font-mono-code text-xs border border-sky-200">
                      Mid-Level
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono-code text-xs text-slate-600">
                    L4 · E4 · SDE II · AS II
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-xs">
                    Owns features end-to-end; handles ambiguity within a single service or model.
                  </td>
                  <td className="px-4 py-3 font-mono-code text-xs">
                    60% Base / 40% Equity
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold text-emerald-800">
                    Initial equity grant + sign-on
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition bg-emerald-50/30">
                  <td className="px-4 py-3.5 font-bold text-slate-900">
                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono-code text-xs border border-emerald-300">
                      Senior (Career Level)
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono-code text-xs text-slate-600">
                    L5 · E5 · Senior SDE · Senior AS
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-xs">
                    Owns entire systems; defines multi-quarter roadmap; mentors junior engineers.
                  </td>
                  <td className="px-4 py-3 font-mono-code text-xs">
                    45% Base / 55% Equity
                  </td>
                  <td className="px-4 py-3 text-xs font-bold text-emerald-700">
                    Level calibration &amp; Equity size
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/80 transition">
                  <td className="px-4 py-3.5 font-bold text-slate-900">
                    <span className="inline-block px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-mono-code text-xs border border-purple-200">
                      Staff / Principal
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono-code text-xs text-slate-600">
                    L6 · E6 · Staff SWE · Principal
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-xs">
                    Multi-team organizational impact; defines strategic technical direction.
                  </td>
                  <td className="px-4 py-3 font-mono-code text-xs">
                    30% Base / 70% Equity
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold text-purple-800">
                    Equity vesting terms &amp; Org scope
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ───────────────── 5. DAY 100+ MAINTENANCE & ONBOARDING ───────────────── */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-emerald-700 font-mono-code text-xs uppercase font-bold tracking-wider mb-1">
              <Clock className="h-4 w-4" />
              Sustainability Blueprint
            </div>
            <h2 className="font-display text-2xl font-bold text-slate-900">
              After Day 100: Skill Maintenance &amp; Day 1 Onboarding
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              The decay curve is real. Protect your investment while navigating offer deadlines and onboarding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 space-y-2">
              <div className="font-mono-code text-xs font-bold text-emerald-700 uppercase">
                The 30-Minute Maintenance Routine
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pattern recognition degrades within 3 weeks without practice. Maintain peak readiness with <strong>one medium LeetCode per day</strong> in under 20 minutes, plus reviewing 5 pattern cards cold.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 space-y-2">
              <div className="font-mono-code text-xs font-bold text-emerald-700 uppercase">
                The 48-Hour Pre-Interview Ritual
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Never solve new hard problems 48 hours before an on-site. Re-read your <strong>Weakness Ledger</strong>, recite your 6 STAR stories aloud in 90 seconds, and write out the 22 master templates from muscle memory.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 space-y-2">
              <div className="font-mono-code text-xs font-bold text-emerald-700 uppercase">
                First 90 Days Promotion Trajectory
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ship one small pull request in Week 1. Find the undocumented pain point in your team's CI/CD or training pipelines, fix it, and establish your reputation as an execution-oriented engineer immediately.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
