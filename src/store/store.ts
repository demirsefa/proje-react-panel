import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/vanilla/shallow';

interface User {
  username: string;
}

interface AppState {
  user: User | null;
  login: (user: User) => void;
}

export const useAppStore = createWithEqualityFn<AppState>()(
  persist(
    set => ({
      user: null,
      login: (user: User) => set({ user }),
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
