import React from "react";
import { SideBar } from "./SideBar";
import { ScreenCreatorData } from "../../types/ScreenCreatorData";
import { useAppStore } from "../../store/store";
import { useNavigate } from "react-router";

export function Layout<IconType>({
	children,
	menu,
	getIcons,
}: {
	children?: React.ReactNode;
	menu?: (screens: Record<string, ScreenCreatorData>) => { name: string; path: string; iconType: IconType }[];
	getIcons?: (iconType: IconType) => React.ReactNode;
}) {
	const { user, screenPaths } = useAppStore((s) => ({
		user: s.user,
		screenPaths: s.screenPaths,
	}));
	const navigate = useNavigate();
	if (!user) {
		navigate(screenPaths.login);
	}

	return (
		<div className="layout">
			<SideBar menu={menu} getIcons={getIcons} />
			<main className="content">{children}</main>
		</div>
	);
}
