import React, { useEffect } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import { initPanel } from "../initPanel";
import { InitPanelOptions } from "../types/initPanelOptions";

type AppProps = {
	children: React.ReactNode;
	init: () => InitPanelOptions;
};

export function Panel({ children, init }: AppProps) {
	useEffect(() => {
		const options = init();
		initPanel(options);
	}, [init]);

	return <ErrorBoundary>{children}</ErrorBoundary>;
}
