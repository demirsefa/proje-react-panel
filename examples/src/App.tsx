import React from "react";
import type { InitPanelOptions } from "proje-react-panel";
import { Login, Panel } from "proje-react-panel";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { AuthLayout } from "./AuthLayout";
import { dataFetchers } from "./api/dataFetchers";
import { initApi, initAuthToken } from "./api/apiConfig";
import { AdminRoutes } from "./routes/AdminRoutes";
import { AssetRoutes } from "./routes/AssetRoutes";
import { MessageRoutes } from "./routes/MessageRoutes";
import { ThreadRoutes } from "./routes/ThreadRoutes";
import { UserRoutes } from "./routes/UserRoutes";

initApi({
	baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
});
initAuthToken();

function init(): InitPanelOptions {
	return {
		screenPaths: {
			login: "/login",
		},
	};
}

export function App() {
	return (
		<Panel init={init}>
			<Router>
				<Routes>
					<Route path="/" element={<AuthLayout />}>
						<Route path={"/"} index element={<Dashboard />} />
						<Route path={"admins"} element={<AdminRoutes />} />
						<Route path={"assets"} element={<AssetRoutes />} />
						<Route path={"messages"} element={<MessageRoutes />} />
						<Route path={"threads"} element={<ThreadRoutes />} />
						<Route path={"users"} element={<UserRoutes />} />
					</Route>
					<Route path="/login" element={<Login onLogin={dataFetchers.auth.login} />} />
				</Routes>
			</Router>
		</Panel>
	);
}
