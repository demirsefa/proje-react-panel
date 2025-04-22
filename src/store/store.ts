import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/vanilla/shallow';

interface User {
  username: string;
}

interface AppState {
  user: User | null;
}

export const useAppStore = createWithEqualityFn<AppState>()(
  persist(
    _ => ({
      user: null,
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
