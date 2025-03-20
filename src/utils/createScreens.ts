import { useAppStore } from "../store/store";

export function createScreens(screens: Record<string, any>) {
	useAppStore.setState({ screens });
}
