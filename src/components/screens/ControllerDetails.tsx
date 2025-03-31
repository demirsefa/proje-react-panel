import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { CrudApi } from "../../api/CrudApi";
import { Screen } from "../../types/Screen";
import { useAppStore } from "../../store/store";
import { ErrorComponent } from "../ErrorComponent";

export function ControllerDetails({ screen }: { screen: Screen }) {
	const { fetchSettings } = useAppStore((s) => ({
		fetchSettings: s.fetchSettings,
	}));
	const { id } = useParams();
	const [data, setData] = useState<any>(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (fetchSettings && screen.controller && id) {
			CrudApi.details(fetchSettings, screen.controller, id)
				.then((res) => {
					setData(res);
				})
				.catch((e: any) => {
					setError(e);
					console.error(e);
				});
		}
	}, [fetchSettings, id, screen]);

	if (error) {
		return <ErrorComponent error={error} />;
	}

	return (
		<p
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(data, null, "   " + "<br/>"),
			}}
		/>
	);
}
