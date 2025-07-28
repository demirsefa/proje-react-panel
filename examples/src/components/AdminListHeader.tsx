import React from "react";
import { AdminList } from "../types/Admin";
import { updateListData } from "proje-react-panel";

export function AdminListHeader() {
	return (
		<button
			className="panel-button"
			onClick={() =>
				updateListData(AdminList, {
					id: "f0b84cb3-c387-4404-8d3a-3d16b9dade08",
					updatedAt: new Date().toISOString(),
				})
			}>
			Edit for test
		</button>
	);
}
