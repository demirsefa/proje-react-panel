import React, { useEffect } from "react";
import { useAppStore } from "../store/store";
import { ErrorBoundary } from "./ErrorBoundary";

type AppProps = {
	children: React.ReactNode;
	setFetchSettings: () => { baseUrl: string };
};

export function Panel({ children, setFetchSettings }: AppProps) {
	useEffect(() => {
		useAppStore.setState({ fetchSettings: setFetchSettings() });
	}, [setFetchSettings]);

	return <ErrorBoundary>{children}</ErrorBoundary>;
}
