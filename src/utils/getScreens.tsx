import React from "react";
import { Route } from "react-router";
import { ControllerCreate } from "../components/screens/ControllerCreate";
import { ControllerDetails } from "../components/screens/ControllerDetails";
import { ControllerEdit } from "../components/screens/ControllerEdit";
import { ControllerList } from "../components/screens/ControllerList";
import { Screen } from "../types/Screen";
import { useAppStore } from "../store/store";

export function getScreens() {
	const screens = Object.entries(useAppStore.getState().screens ?? {});

	return (
		<>
			{screens.map(([key, screenData]) => {
				let routePath = `/${screenData.crud.controller}`;
				const screen: Screen = {
					key,
					controller: screenData.crud.controller,
				};
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
	);
}
