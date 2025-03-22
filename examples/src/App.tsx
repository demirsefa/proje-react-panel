import React from "react";
import { Panel, Layout, ScreenCreatorData, useScreens, InitPanelOptions } from "proje-react-panel";
import { BrowserRouter as Router, Outlet, Route, Routes } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDashboard, faEnvelope, faMessage, faUserAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Admin } from "./types/Admin";
import { User } from "./types/User";
import { Message } from "./types/Message";
import { Thread } from "./types/Thread";

function init(): InitPanelOptions {
	return {
		fetch: {
			baseURL: "http://localhost:8080",
		},
		crud: {
			admins: Admin,
			users: User,
			messages: Message,
			threads: Thread,
		},
	};
}

export type IconType = "dashboard" | "admin" | "user" | "message" | "thread";
function getIcons(iconType: IconType) {
	switch (iconType) {
		case "dashboard":
			return <FontAwesomeIcon icon={faDashboard} />;
		case "admin":
			return <FontAwesomeIcon icon={faUserAlt} />;
		case "user":
			return <FontAwesomeIcon icon={faUserCircle} />;
		case "message":
			return <FontAwesomeIcon icon={faEnvelope} />;
		case "thread":
			return <FontAwesomeIcon icon={faMessage} />;
	}
}

function getMenu(screens: Record<string, ScreenCreatorData>): {
	name: string;
	path: string;
	iconType: IconType;
}[] {
	return [
		{ name: "Dashboard", path: "/", iconType: "dashboard" },
		{ name: "Admins", path: screens["admins"]?.path, iconType: "admin" },
		{ name: "Users", path: screens["users"]?.path, iconType: "user" },
		{ name: "Threads", path: screens["threads"]?.path, iconType: "thread" },
		{ name: "Messages", path: screens["messages"]?.path, iconType: "message" },
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
	const screens = useScreens();
	return (
		<Panel init={init}>
			<Router>
				<Routes>
					<Route path="/" element={<AuthLayout />}>
						<Route path={"/dashboard"} index element={<Dashboard />} />
						{screens}
					</Route>
				</Routes>
			</Router>
		</Panel>
	);
}
