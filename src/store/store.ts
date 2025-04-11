import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/vanilla/shallow';
import { ScreenCreatorData } from '../types/ScreenCreatorData';

interface User {
  username: string;
}

interface AppState {
  user: User | null;
  screens: Record<string, ScreenCreatorData> | null;
  screenPaths: Record<string, string>;
}

export const useAppStore = createWithEqualityFn<AppState>()(
  persist(
    _ => ({
      screens: null,
      user: null,
      screenPaths: {},
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
