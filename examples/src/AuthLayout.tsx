import { Outlet } from "react-router";
import React from "react";
import type { ScreenCreatorData } from "proje-react-panel";
import { Layout } from "proje-react-panel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faDashboard,
	faEnvelope,
	faImage,
	faMessage,
	faUserAlt,
	faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { setAuthLogout } from "./api/apiConfig";

export type IconType = "dashboard" | "admin" | "user" | "message" | "thread" | "assets";
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
		case "assets":
			return <FontAwesomeIcon icon={faImage} />;
	}
}

function getMenu(screens: Record<string, ScreenCreatorData>): {
	name: string;
	path: string;
	iconType: IconType;
}[] {
	return [
		{ name: "Dashboard", path: "/", iconType: "dashboard" },
		{ name: "Admins", path: "/admins", iconType: "admin" },
		{ name: "Users", path: "users", iconType: "user" },
		{ name: "Threads", path: "threads", iconType: "thread" },
		{ name: "Messages", path: "messages", iconType: "message" },
		{ name: "Assets", path: "assets", iconType: "assets" },
	];
}

export function AuthLayout() {
	return (
		<Layout logout={() => {
			setAuthLogout();
		}} getIcons={getIcons} menu={getMenu}>
			<Outlet />
		</Layout>
	);
}
