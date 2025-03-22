import React, { useMemo } from "react";
import { Route } from "react-router";
import { ControllerCreate } from "../components/screens/ControllerCreate";
import { ControllerDetails } from "../components/screens/ControllerDetails";
import { ControllerEdit } from "../components/screens/ControllerEdit";
import { ControllerList } from "../components/screens/ControllerList";
import { Screen } from "../types/Screen";
import { useAppStore } from "../store/store";

export function useScreens() {
	const screens = useAppStore((s) => s.screens ?? {});
	return useMemo(
		() => (
			<>
				{Object.entries(screens).map(([key, screenData]) => {
					const controllerName = screenData.crud?.controller ?? key;
					let routePath = `${screenData.path}`;
					const screen: Screen = {
						key,
						controller: controllerName,
					};
					console.log("path", screenData, routePath);
					return (
						<React.Fragment key={"index"}>
							<Route path={routePath + "/create"} element={<ControllerCreate screen={screen} />} />
							<Route path={routePath + "/details/:id"} element={<ControllerDetails screen={screen} />} />
							<Route path={routePath + "/edit/:id"} element={<ControllerEdit screen={screen} />} />
							<Route path={routePath} element={<ControllerList screen={screen} />} />
						</React.Fragment>
					);
				})}
				<Route path="*" element={<div>404 - Not Found</div>} />
			</>
		),
		[screens]
	);
}
