import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../App';
import { useProgressStore, computeCompletion } from '../store/useProgressStore';
import roadmapJson from '../data/roadmapData.json';

describe('ML Engineer & Applied Scientist Roadmap Application', () => {
  beforeEach(() => {
    useProgressStore.getState().resetAll();
  });

  it('parses all 7 phases and 20 level entries (L0-L18 + PyTorch Bridge)', () => {
    expect(roadmapJson.phases.length).toBe(7);
    expect(roadmapJson.levels.length).toBe(20);
    expect(roadmapJson.meta.totalCheckables).toBeGreaterThan(3500);
    expect(roadmapJson.projects.length).toBeGreaterThanOrEqual(25);
  });

  it('renders the main roadmap page with hero, phases, and level nodes', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Nineteen levels from/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Three simple rules/i })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/Software Engineering Fundamentals/i).length
    ).toBeGreaterThan(0);
  });

  it('renders Level 0 detail page and updates Zustand checklist progress when an item is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/level/level-0']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Software Engineering Fundamentals/i })
    ).toBeInTheDocument();

    // Find first checkbox in Level 0
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(10);

    const firstCheckbox = checkboxes[0] as HTMLInputElement;
    expect(firstCheckbox.checked).toBe(false);

    fireEvent.click(firstCheckbox);
    expect(firstCheckbox.checked).toBe(true);

    const checkedIds = Object.keys(useProgressStore.getState().checked);
    expect(checkedIds.length).toBe(1);
    const stats = computeCompletion(useProgressStore.getState().checked, checkedIds);
    expect(stats.done).toBe(1);
    expect(stats.pct).toBe(100);
  });

  it('renders the Projects page with Self-Review Checklist and all capstones', () => {
    render(
      <MemoryRouter initialEntries={['/projects']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Interactive Self-Review Checklist/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/I measured a trivial baseline first/i)
    ).toBeInTheDocument();
  });

  it('renders the Interview Prep page with question type filters and expandable questions', () => {
    render(
      <MemoryRouter initialEntries={['/interview-prep']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /^Interview Prep$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/What is the difference between a list and a tuple\?/i)
    ).toBeInTheDocument();
  });
});
