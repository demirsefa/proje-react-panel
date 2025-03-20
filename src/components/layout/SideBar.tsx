import React, { useState } from "react";
import { Link } from "react-router";
import { ScreenCreatorData } from "../../types/ScreenCreatorData";
import { useAppStore } from "../../store/store";

export function SideBar<IconType>({
	menu,
	getIcons,
}: {
	menu?: (screens: Record<string, ScreenCreatorData<any>>) => { name: string; path: string; iconType: IconType }[];
	getIcons?: (iconType: IconType) => React.ReactNode;
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
