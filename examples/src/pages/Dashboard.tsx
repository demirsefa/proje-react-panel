import React from "react";
import { Counter, DashboardGrid, DashboardItem } from "proje-react-panel";

export function Dashboard() {
	return (
		<DashboardGrid columns={3}>
			<DashboardItem>
				<Counter targetNumber={100} duration={2000} image={""} text={"Products"} />
			</DashboardItem>
			<DashboardItem>
				<Counter targetNumber={100} duration={2000} image={""} text={"Downloads"} />
			</DashboardItem>
			<DashboardItem>
				<Counter targetNumber={100} duration={2000} image={""} text={"Services"} />
			</DashboardItem>
			<DashboardItem>
				<Counter targetNumber={100} duration={2000} image={""} text={"Admins"} />
			</DashboardItem>
		</DashboardGrid>
	);
}
