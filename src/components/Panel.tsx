import React, { useEffect } from "react";
import { useAppStore } from "../store/store";

type AppProps = {
	children: React.ReactNode;
	setFetchSettings: () => { baseUrl: string };
};

export function Panel({ children, setFetchSettings }: AppProps) {
	useEffect(() => {
		useAppStore.setState({ fetchSettings: setFetchSettings() });
	}, [setFetchSettings]);

	return <>{children}</>;
}
