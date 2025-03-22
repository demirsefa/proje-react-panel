import React, { useState } from "react";
import { Link } from "react-router";
import { ScreenCreatorData } from "../../types/ScreenCreatorData";
import { useAppStore } from "../../store/store";

type GetMenuFunction<IconType> = (
	screens: Record<string, ScreenCreatorData>
) => { name: string; path: string; iconType: IconType }[];

type GetIconsFunction<IconType> = (iconType: IconType) => React.ReactNode;

export function SideBar<IconType>({
	menu,
	getIcons,
}: {
	menu?: GetMenuFunction<IconType>;
	getIcons?: GetIconsFunction<IconType>;
}) {
	const screens = useAppStore((s) => s.screens ?? {});
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className={`sidebar ${isOpen ? "open" : "closed"}`}>
			<button className="toggle-button" onClick={() => setIsOpen(!isOpen)}>
				{isOpen ? "<" : ">"}
			</button>
			<nav className="nav-links">
				{menu?.(screens).map((item, index) => (
					<Link key={index} to={item.path} className="nav-link">
						<span className={"nav-links-icon"}>{getIcons?.(item.iconType)}</span>
						{isOpen ? <span>{item.name}</span> : null}
					</Link>
				))}
				{/*{screens.map(([key, screen], index) => (
					<Link key={`screen-${index}`} to={`/${key}`} className="nav-link">
						{isOpen ? <span>{key}</span> : null}
					</Link>
				))}*/}
			</nav>
		</div>
	);
}
