import React from "react";
import { Panel } from "proje-react-panel";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function Test() {
	return <div>ttdtd</div>;
}

export function App() {
	return (
		<Panel>
			<Router>
				<Routes>
					<Route path="/" element={<Test/>} />
				</Routes>
			</Router>
		</Panel>
	);
}
