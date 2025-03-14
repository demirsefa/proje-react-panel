import React from "react";

type AppProps = {
	children: React.ReactNode;
};

export function Panel({ children }: AppProps) {
	return (
		<>
			{children}
		</>
	);
}
