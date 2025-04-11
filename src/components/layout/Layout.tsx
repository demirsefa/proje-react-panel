import React from "react";
import { SideBar } from "./SideBar";
import { ScreenCreatorData } from "../../types/ScreenCreatorData";
import { useAppStore } from "../../store/store";
import { useNavigate } from "react-router";

export function Layout<IconType>({
	children,
	menu,
	getIcons,
	logout,
}: {
	children?: React.ReactNode;
	menu?: (screens: Record<string, ScreenCreatorData>) => { name: string; path: string; iconType: IconType }[];
	getIcons?: (iconType: IconType) => React.ReactNode;
	logout?: () => void;
}) {
	const { user, screenPaths } = useAppStore((s) => ({
		user: s.user,
		screenPaths: s.screenPaths,
	}));
	const data = useAppStore();
	const navigate = useNavigate();
	if (!user) {
		navigate(screenPaths.login);
	}

	return (
		<div className="layout">
			<SideBar onLogout={() => {
				if (logout) {
					logout();
				}
			}} menu={menu} getIcons={getIcons} />
			<main className="content">{children}</main>
		</div>
	);
}
