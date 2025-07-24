import React from "react";
import { AdminDetails } from "../types/Admin";
import { updateDetailsData } from "proje-react-panel";

export function AdminDetailsHeader({ data }: { data: AdminDetails | null }) {
	return (
		<div>
			{data && (
				<button
					onClick={() =>
						updateDetailsData(AdminDetails, {
							username: data.username,
							updatedAt: new Date().toISOString(),
						})
					}>
					Edit for test
				</button>
			)}
			<div>Created At: {data?.createdAt}</div>
			<div>Updated At: {data?.updatedAt}</div>
		</div>
	);
}
