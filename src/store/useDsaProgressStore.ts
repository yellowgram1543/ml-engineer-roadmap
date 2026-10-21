import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WeaknessLedgerEntry {
  id: string;
  date: string;
  problem: string;
  pattern: string;
  whatBroke: string;
  firstResolveDate?: string;
  secondResolveDate?: string;
  status: 'open' | 'closed';
}

interface DsaProgressState {
  checked: Record<string, boolean>;
  notes: Record<string, string>;
  searchQuery: string;
  filterStatus: 'all' | 'todo' | 'done';
  selectedRole: string; // 'SDE' | 'ML Engineer' | 'Applied Scientist'
  ledger: WeaknessLedgerEntry[];

  toggleItem: (id: string) => void;
  setBatch: (ids: string[], value: boolean) => void;
  setNote: (id: string, note: string) => void;
  setSearchQuery: (q: string) => void;
  setFilterStatus: (status: 'all' | 'todo' | 'done') => void;
  setSelectedRole: (role: string) => void;
  resetAll: () => void;
  importProgress: (checked: Record<string, boolean>, notes?: Record<string, string>, ledger?: WeaknessLedgerEntry[]) => void;

  addLedgerEntry: (entry: Omit<WeaknessLedgerEntry, 'id'>) => void;
  toggleLedgerStatus: (id: string) => void;
  deleteLedgerEntry: (id: string) => void;
}

export const useDsaProgressStore = create<DsaProgressState>()(
  persist(
    (set) => ({
      checked: {},
      notes: {},
      searchQuery: '',
      filterStatus: 'all',
      selectedRole: 'Applied Scientist',
      ledger: [],

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

      resetAll: () => set({ checked: {}, notes: {}, ledger: [] }),

      importProgress: (checked, notes = {}, ledger = []) => set({ checked, notes, ledger }),

      addLedgerEntry: (entry) =>
        set((state) => ({
          ledger: [
            {
              ...entry,
              id: `ledger-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            },
            ...state.ledger,
          ],
        })),

      toggleLedgerStatus: (id) =>
        set((state) => ({
          ledger: state.ledger.map((item) =>
            item.id === id
              ? { ...item, status: item.status === 'open' ? 'closed' : 'open' }
              : item
          ),
        })),

      deleteLedgerEntry: (id) =>
        set((state) => ({
          ledger: state.ledger.filter((item) => item.id !== id),
        })),
    }),
    {
      name: 'dsa-roadmap-progress-v1',
      partialize: (state) => ({
        checked: state.checked,
        notes: state.notes,
        selectedRole: state.selectedRole,
        ledger: state.ledger,
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
