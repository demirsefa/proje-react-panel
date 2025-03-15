import { StoreData } from "./storeData";

export function createScreens(screens: Record<string, any>) {
	StoreData.screens = screens;
}
