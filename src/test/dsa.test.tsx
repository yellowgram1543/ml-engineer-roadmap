import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../App';
import { useDsaProgressStore, computeDsaCompletion } from '../store/useDsaProgressStore';
import dsaRoadmapJson from '../data/dsaRoadmapData.json';

describe('DSA + Interview Engineering (100 Days) Roadmap Application', () => {
  beforeEach(() => {
    useDsaProgressStore.getState().resetAll();
  });

  it('parses all phases, blocks, 22 patterns, and practice problems', () => {
    expect(dsaRoadmapJson.phases.length).toBe(5);
    expect(dsaRoadmapJson.meta.totalBlocks).toBe(31);
    expect(dsaRoadmapJson.meta.totalPatterns).toBe(22);
    expect(dsaRoadmapJson.meta.totalProblems).toBeGreaterThanOrEqual(230);
    expect(dsaRoadmapJson.meta.totalCheckables).toBeGreaterThan(400);
  });

  it('renders the DSA home page with hero, daily loop, and 10 rules', () => {
    render(
      <MemoryRouter initialEntries={['/dsa']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Recognise patterns in/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /The Daily Loop/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /The 10 Rules That Decide Whether This Works/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/DSA \+ Interview Engineering · 100 Days/i)
    ).toBeInTheDocument();
  });

  it('renders a DSA Block page (Block A2) and toggles practice problem checkboxes', () => {
    render(
      <MemoryRouter initialEntries={['/dsa/block/block-a2']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Arrays and strings/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Opposite-ends two pointers/i)
    ).toBeInTheDocument();

    // Check concept drills exist
    expect(screen.getByText(/Concept Drill · Active Recall/i)).toBeInTheDocument();

    // Check practice ladder
    expect(screen.getAllByText(/3Sum/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Trapping Rain Water/i).length).toBeGreaterThan(0);

    // Find checkboxes in Block A2
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(5);

    const firstCheckbox = checkboxes[0] as HTMLInputElement;
    expect(firstCheckbox.checked).toBe(false);

    fireEvent.click(firstCheckbox);
    expect(firstCheckbox.checked).toBe(true);

    const checkedIds = Object.keys(useDsaProgressStore.getState().checked);
    expect(checkedIds.length).toBe(1);
    const stats = computeDsaCompletion(useDsaProgressStore.getState().checked, checkedIds);
    expect(stats.done).toBe(1);
    expect(stats.pct).toBe(100);
  });

  it('renders the 22 Patterns page with search and memory templates', () => {
    render(
      <MemoryRouter initialEntries={['/dsa/patterns']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /22 Pattern Cards & Master Templates/i })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/Two pointers/i).length
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Sliding window/i).length
    ).toBeGreaterThan(0);
  });

  it('renders the Applied Scientist Track with scratch ML algorithms and role matrix', () => {
    render(
      <MemoryRouter initialEntries={['/dsa/applied-track']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /The Applied Scientist Track/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Who Needs What — Role Matrix/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/The ML coding round/i)
    ).toBeInTheDocument();
  });

  it('allows switching tracks from the Header dropdown', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // Header switcher trigger
    const switcherButton = screen.getByLabelText(/Switch between ML and DSA roadmaps/i);
    expect(switcherButton).toBeInTheDocument();

    fireEvent.click(switcherButton);

    // Expect dropdown options to be visible
    expect(screen.getByText(/Switch Active Roadmap Track/i)).toBeInTheDocument();
    expect(screen.getByText(/DSA \+ Interview Engineering/i)).toBeInTheDocument();
  });

  it('renders Checkpoints page with interactive Weakness Ledger and allows logging problems', () => {
    render(
      <MemoryRouter initialEntries={['/dsa/checkpoints']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Checkpoints & Weakness Ledger/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Interactive Weakness Ledger/i)
    ).toBeInTheDocument();

    const logButton = screen.getByRole('button', { name: /Log Failed Problem/i });
    fireEvent.click(logButton);

    expect(screen.getByText(/Log a Problem to Re-Solve/i)).toBeInTheDocument();
  });

  it('renders the Offer & Negotiation Playbook page with calculator, rules, and scripts', () => {
    render(
      <MemoryRouter initialEntries={['/dsa/negotiation']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /The Offer & Negotiation Playbook/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Total Compensation \(TC\) & Offer Comparator/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/The Five Immutable Rules of Tech Negotiation/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Never Name a Number First/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Battle-Tested Scripts \(1-Click Copy\)/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Tech Leveling Equivalency & Compensation Weights/i)
    ).toBeInTheDocument();
  });

  it('renders Block D6 Low-Level Design with authentic non-duplicative LLD systems and 1-click ledger logging', () => {
    render(
      <MemoryRouter initialEntries={['/dsa/block/block-d6']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Low-Level Design \(LLD\) & Object Design/i })
    ).toBeInTheDocument();

    expect(screen.getAllByText(/Design Tic-Tac-Toe \(LC 348\)/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Design In-Memory File System \(LC 588\)/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Design Twitter \(LC 355\)/i).length).toBeGreaterThan(0);

    // Toggle flashcard mode
    const flashcardButton = screen.getByRole('button', { name: /Flashcard Mode/i });
    fireEvent.click(flashcardButton);
    expect(screen.getByText(/Flashcard Drill/i)).toBeInTheDocument();

    // Click + Ledger on a problem row
    const ledgerButtons = screen.getAllByRole('button', { name: /\+ Ledger/i });
    expect(ledgerButtons.length).toBeGreaterThan(0);
    fireEvent.click(ledgerButtons[0]);

    // Check that problem was logged into the Weakness Ledger store
    const ledger = useDsaProgressStore.getState().ledger;
    expect(ledger.length).toBe(1);
    expect(ledger[0].problem).toContain('Design Tic-Tac-Toe');
  });
});
