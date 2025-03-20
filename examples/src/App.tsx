import React from "react";
import { Panel, Layout, ScreenCreatorData, getScreens, createScreens, getFields } from "proje-react-panel";
import { BrowserRouter as Router, Outlet, Route, Routes } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDashboard, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { Admin } from "./types/generated/Admin";

createScreens({
	admins: getFields(Admin),
});

export function setFetchSettings() {
	return {
		baseUrl: "http://localhost:8080",
	};
}

export type IconType = "dashboard" | "admin";

function getIcons(iconType: IconType) {
	switch (iconType) {
		case "dashboard":
			return <FontAwesomeIcon icon={faDashboard} />;
		case "admin":
			return <FontAwesomeIcon icon={faUserAlt} />;
	}
}

function getMenu(screens: Record<string, ScreenCreatorData<any>>): {
	name: string;
	path: string;
	iconType: IconType;
}[] {
	return [
		{ name: "Dashboard", path: "/", iconType: "dashboard" },
		{ name: "Admins", path: screens["admins"].crud.controller, iconType: "admin" },
	];
}

function AuthLayout() {
	return (
		<Layout getIcons={getIcons} menu={getMenu}>
			<Outlet />
		</Layout>
	);
}

export function App() {
	return (
		<Panel setFetchSettings={setFetchSettings}>
			<Router>
				<Routes>
					<Route path="/" element={<AuthLayout />}>
						<Route path={"/dashboard"} index element={<Dashboard />} />
						{getScreens()}
					</Route>
				</Routes>
			</Router>
		</Panel>
	);
}
