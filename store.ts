import { create } from 'zustand';
import { PersonalityType } from './types';

interface AppState {
  userMode: PersonalityType | null;
  theme: 'dark' | 'light';
  isSidebarOpen: boolean;
  currentStreak: number;
  setUserMode: (mode: PersonalityType) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  incrementStreak: () => void;
  resetUser: () => void;
}

export const useStore = create<AppState>((set) => ({
  userMode: null, // Start as null to trigger personality test if not set
  theme: 'dark',
  isSidebarOpen: false,
  currentStreak: 0,
  setUserMode: (mode) => set({ userMode: mode }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  incrementStreak: () => set((state) => ({ currentStreak: state.currentStreak + 1 })),
  resetUser: () => set({ userMode: null, currentStreak: 0 })
}));