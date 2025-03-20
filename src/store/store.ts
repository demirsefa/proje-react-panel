import { createJSONStorage, persist } from "zustand/middleware";
import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/vanilla/shallow";
import { ScreenCreatorData } from "../types/ScreenCreatorData";

interface AppState {
	screens: Record<string, ScreenCreatorData<any>> | null;
	fetchSettings: { baseUrl: string } | null;
}

export const useAppStore = createWithEqualityFn<AppState>()(
	persist((set) => ({ screens: null, fetchSettings: null }), {
		name: "app-store-1",
		storage: createJSONStorage(() => localStorage),
		partialize: (state) => ({}),
	}),
	shallow
);
