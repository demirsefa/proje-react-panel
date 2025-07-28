import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/vanilla/shallow';
import { User } from '../types/User';

interface AppState {
  detailsData: Record<string, Record<string, unknown>>;
  updateDetailsData: (key: string, id: string, data: unknown) => void;
  listData: Record<string, Record<string, unknown>>;
  updateListData: (key: string, id: string, data: unknown) => void;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAppStore = createWithEqualityFn<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      login: (user: User) => set({ user }),
      logout: () => set({ user: null }),
      detailsData: {},
      updateDetailsData: (key: string, id: string, data: unknown) =>
        set({
          detailsData: {
            ...get().detailsData,
            [key]: { ...get().detailsData[key], [id]: data },
          },
        }),
      listData: {},
      updateListData: (key: string, id: string, data: unknown) =>
        set({
          listData: { ...get().listData, [key]: { ...get().listData[key], [id]: data } },
        }),
    }),
    {
      name: 'proje-panel-store',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        user: state.user,
        detailsData: {},
      }),
    }
  ),
  shallow
);
