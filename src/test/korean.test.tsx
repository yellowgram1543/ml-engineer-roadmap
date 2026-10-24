import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../App';
import { useKoreanProgressStore, computeKoreanCompletion } from '../store/useKoreanProgressStore';
import koreanJson from '../data/koreanRoadmapData.json';

describe('Korean Language Mastery Roadmap Application', () => {
  beforeEach(() => {
    useKoreanProgressStore.getState().resetAll();
  });

  it('parses all phases and level entries from korean map', () => {
    expect(koreanJson.phases.length).toBe(7);
    expect(koreanJson.levels.length).toBeGreaterThan(0);
    expect(koreanJson.meta.totalCheckables).toBeGreaterThan(1200);
    expect(koreanJson.projects.length).toBeGreaterThan(10);
    expect(koreanJson.interviewBanks.length).toBeGreaterThan(0);
  });

  it('renders the Korean roadmap home page with Level 1 overview and parts', () => {
    render(
      <MemoryRouter initialEntries={['/korean']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Level 1: Beginner Korean/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/초급 1 한국어 마스터/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Syllabus & Lesson Sequence/i)
    ).toBeInTheDocument();
  });

  it('renders Level 1 page and toggles checkboxes with progress persistence and sub-weights', () => {
    render(
      <MemoryRouter initialEntries={['/korean/level/level-1']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Beginner Korean/i })
    ).toBeInTheDocument();

    // Check dual sub-weight cards
    expect(screen.getByText(/Spoken Fluency Weight/i)).toBeInTheDocument();
    expect(screen.getByText(/Textual & Literacy Weight/i)).toBeInTheDocument();
    expect(screen.getByText(/Track: All-Round Mastery/i)).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);

    const firstCheckbox = checkboxes[0];
    expect(firstCheckbox).not.toBeChecked();

    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).toBeChecked();
    expect(Object.keys(useKoreanProgressStore.getState().checked).length).toBe(1);
  });

  it('renders Korean footer with active track and navigation links on Korean routes', () => {
    render(
      <MemoryRouter initialEntries={['/korean']}>
        <AppRoutes />
      </MemoryRouter>
    );

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent(/Korean Language Mastery Roadmap/i);
    expect(footer).toHaveTextContent(/Question Banks & Flipcards/i);
  });

  it('renders Korean Capstones page with deliverables', () => {
    render(
      <MemoryRouter initialEntries={['/korean/projects']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Capstones & Production Portfolios/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/All Phases/i)).toBeInTheDocument();
  });

  it('renders Level 1 page with checklist mode and allows toggling to SNU 5-step course view', () => {
    render(
      <MemoryRouter initialEntries={['/korean/level/level-1']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // Initial Checklist mode
    expect(screen.getByText(/Curriculum Checklist & Capstone/i)).toBeInTheDocument();
    expect(screen.getAllByText(/안녕하세요/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Unit 1 — /i).length).toBeGreaterThan(0);

    // Toggle to SNU 5-Step Lesson Course
    const courseBtn = screen.getByRole('button', { name: /SNU 5-Step Lesson Course/i });
    expect(courseBtn).toBeInTheDocument();
    fireEvent.click(courseBtn);

    // In 5-step course view
    expect(screen.getByText(/Beginner Korean Level 1 · 초급 1 한국어/i)).toBeInTheDocument();
    expect(screen.getByText(/SNU Korean\+ 1A Inspired Standard/i)).toBeInTheDocument();
    expect(screen.getByText(/5-Step Teaching Method/i)).toBeInTheDocument();
    expect(screen.getByText(/Gate A/i)).toBeInTheDocument();
  });

  it('calculates progress completion correctly', () => {
    const ids = ['id-1', 'id-2', 'id-3', 'id-4'];
    const checked = { 'id-1': true, 'id-3': true };
    const comp = computeKoreanCompletion(checked, ids);
    expect(comp.done).toBe(2);
    expect(comp.total).toBe(4);
    expect(comp.pct).toBe(50);
  });
});
