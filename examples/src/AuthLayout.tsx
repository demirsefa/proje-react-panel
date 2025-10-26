import { Outlet } from "react-router";
import React from "react";
import { Layout, logout } from "proje-react-panel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faDashboard,
	faEnvelope,
	faGlobe,
	faImage,
	faLanguage,
	faMessage,
	faUserAlt,
	faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

export type IconType = "dashboard" | "admin" | "user" | "message" | "thread" | "assets" | "localization" | "language";
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
		case "localization":
			return <FontAwesomeIcon icon={faLanguage} />;
		case "language":
			return <FontAwesomeIcon icon={faGlobe} />;
	}
}

function getMenu(): {
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
		{ name: "Localization", path: "localization?language=tr", iconType: "localization" },
		{ name: "Languages", path: "languages", iconType: "language" },
	];
}

export function AuthLayout() {
	return (
		<Layout
			logout={() => {
				logout(() => {
					window.location.href = "/login";
				});
			}}
			getIcons={getIcons}
			menu={getMenu}>
			<Outlet />
		</Layout>
	);
}
