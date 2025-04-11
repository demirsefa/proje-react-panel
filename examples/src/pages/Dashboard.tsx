import React from "react";
import { Counter } from "proje-react-panel";

export function Dashboard() {
	return (
		<div className="dashboard">
			<Counter targetNumber={100} duration={2000} image={""} text={"Products"} />
			<Counter targetNumber={100} duration={2000} image={""} text={"Downloads"} />
			<Counter targetNumber={100} duration={2000} image={""} text={"Services"} />
			<Counter targetNumber={100} duration={2000} image={""} text={"Admins"} />
		</div>
	);
}
