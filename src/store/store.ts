import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/vanilla/shallow';
import { User } from '../types/User';

interface AppState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAppStore = createWithEqualityFn<AppState>()(
  persist(
    set => ({
      user: null,
      login: (user: User) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'app-store-1',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        user: state.user,
      }),
    }
  ),
  shallow
);
