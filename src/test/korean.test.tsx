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

  it('parses all 7 phases and 19 level entries from korean map', () => {
    expect(koreanJson.phases.length).toBe(7);
    expect(koreanJson.levels.length).toBe(19);
    expect(koreanJson.meta.totalCheckables).toBeGreaterThan(1200);
    expect(koreanJson.projects.length).toBe(22);
    expect(koreanJson.interviewBanks.length).toBeGreaterThan(0);
  });

  it('renders the Korean roadmap home page with hero and curriculum progression', () => {
    render(
      <MemoryRouter initialEntries={['/korean']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Korean Language Mastery Roadmap/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/한국어 마스터 로드맵 · Korean Language Track/i)
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/Curriculum Progression/i).length
    ).toBeGreaterThan(0);
  });

  it('renders Level 0 page and toggles checkboxes with progress persistence', () => {
    render(
      <MemoryRouter initialEntries={['/korean/level/level-0']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Hangeul and the Sound System/i })
    ).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);

    const firstCheckbox = checkboxes[0];
    expect(firstCheckbox).not.toBeChecked();

    fireEvent.click(firstCheckbox);
    expect(firstCheckbox).toBeChecked();
    expect(Object.keys(useKoreanProgressStore.getState().checked).length).toBe(1);
  });

  it('renders Korean Capstones page with all 18 deliverables', () => {
    render(
      <MemoryRouter initialEntries={['/korean/projects']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Capstones & Production Portfolios/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/All Phases \(22\)/i)).toBeInTheDocument();
  });

  it('renders Korean Question Banks page with questions', () => {
    render(
      <MemoryRouter initialEntries={['/korean/questions']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Korean Practice & Question Banks/i })
    ).toBeInTheDocument();
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
