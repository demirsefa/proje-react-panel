import { Outlet } from "react-router";
import React from "react";

export function Dashboard() {
	return (
		<div>
			<h1>Dashboard</h1>
			{/* will either be <Home/> or <Settings/> */}
			<Outlet />
		</div>
	);
}
