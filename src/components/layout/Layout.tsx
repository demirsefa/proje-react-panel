import React from "react";
import { SideBar } from "./SideBar";
import { ScreenCreatorData } from "../../types/ScreenCreatorData";

export function Layout<IconType>({
	children,
	menu,
	getIcons,
}: {
	children?: React.ReactNode;
	menu?: (screens: Record<string, ScreenCreatorData>) => { name: string; path: string; iconType: IconType }[];
	getIcons?: (iconType: IconType) => React.ReactNode;
}) {
	return (
		<div className="layout">
			<SideBar menu={menu} getIcons={getIcons} />
			<main className="content">{children}</main>
		</div>
	);
}
