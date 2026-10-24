import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface KoreanProgressState {
  checked: Record<string, boolean>;
  notes: Record<string, string>;
  searchQuery: string;
  filterStatus: 'all' | 'todo' | 'done';
  selectedFocus: string;
  toggleItem: (id: string) => void;
  setBatch: (ids: string[], value: boolean) => void;
  setNote: (id: string, note: string) => void;
  setSearchQuery: (q: string) => void;
  setFilterStatus: (status: 'all' | 'todo' | 'done') => void;
  setSelectedFocus: (focus: string) => void;
  resetAll: () => void;
  importProgress: (checked: Record<string, boolean>, notes?: Record<string, string>) => void;
}

export const useKoreanProgressStore = create<KoreanProgressState>()(
  persist(
    (set) => ({
      checked: {},
      notes: {},
      searchQuery: '',
      filterStatus: 'all',
      selectedFocus: 'Comprehensive Mastery',

      toggleItem: (id: string) =>
        set((state) => {
          const next = { ...state.checked };
          if (next[id]) {
            delete next[id];
          } else {
            next[id] = true;
          }
          return { checked: next };
        }),

      setBatch: (ids: string[], value: boolean) =>
        set((state) => {
          const next = { ...state.checked };
          for (const id of ids) {
            if (value) {
              next[id] = true;
            } else {
              delete next[id];
            }
          }
          return { checked: next };
        }),

      setNote: (id: string, note: string) =>
        set((state) => ({
          notes: { ...state.notes, [id]: note },
        })),

      setSearchQuery: (searchQuery: string) => set({ searchQuery }),

      setFilterStatus: (filterStatus: 'all' | 'todo' | 'done') => set({ filterStatus }),

      setSelectedFocus: (selectedFocus: string) => set({ selectedFocus }),

      resetAll: () => set({ checked: {}, notes: {} }),

      importProgress: (checked, notes = {}) => set({ checked, notes }),
    }),
    {
      name: 'korean-roadmap-progress-v1',
      partialize: (state) => ({
        checked: state.checked,
        notes: state.notes,
        selectedFocus: state.selectedFocus,
      }),
    }
  )
);

export function computeKoreanCompletion(checked: Record<string, boolean>, ids: string[]) {
  if (!ids || ids.length === 0) {
    return { done: 0, total: 0, pct: 0 };
  }
  let done = 0;
  for (let i = 0; i < ids.length; i++) {
    if (checked[ids[i]]) done++;
  }
  return {
    done,
    total: ids.length,
    pct: Math.round((done / ids.length) * 100),
  };
}
