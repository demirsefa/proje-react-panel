import { createScreens } from "./utils/createScreens";
import { getFields } from "./utils/getFields";
import { ScreenCreatorData } from "./types/ScreenCreatorData";
import { InitPanelOptions } from "./types/initPanelOptions";
import { useAppStore } from "./store/store";

export function initPanel({ crud, fetch, screenPaths }: InitPanelOptions) {
	const screensCrudOptions: Record<string, ScreenCreatorData> = {};
	Object.entries(crud).forEach(([key, value]) => {
		screensCrudOptions[key] = getFields(key, value);
	});
	createScreens(screensCrudOptions);
	useAppStore.setState({ fetchSettings: { baseUrl: fetch.baseURL }, screenPaths });
}
