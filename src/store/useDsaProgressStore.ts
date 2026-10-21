import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DsaProgressState {
  checked: Record<string, boolean>;
  notes: Record<string, string>;
  searchQuery: string;
  filterStatus: 'all' | 'todo' | 'done';
  selectedRole: string; // 'SDE' | 'ML Engineer' | 'Applied Scientist'
  toggleItem: (id: string) => void;
  setBatch: (ids: string[], value: boolean) => void;
  setNote: (id: string, note: string) => void;
  setSearchQuery: (q: string) => void;
  setFilterStatus: (status: 'all' | 'todo' | 'done') => void;
  setSelectedRole: (role: string) => void;
  resetAll: () => void;
  importProgress: (checked: Record<string, boolean>, notes?: Record<string, string>) => void;
}

export const useDsaProgressStore = create<DsaProgressState>()(
  persist(
    (set) => ({
      checked: {},
      notes: {},
      searchQuery: '',
      filterStatus: 'all',
      selectedRole: 'Applied Scientist',

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

      setSelectedRole: (selectedRole: string) => set({ selectedRole }),

      resetAll: () => set({ checked: {}, notes: {} }),

      importProgress: (checked, notes = {}) => set({ checked, notes }),
    }),
    {
      name: 'dsa-roadmap-progress-v1',
      partialize: (state) => ({
        checked: state.checked,
        notes: state.notes,
        selectedRole: state.selectedRole,
      }),
    }
  )
);

export function computeDsaCompletion(checked: Record<string, boolean>, ids: string[]) {
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
