import { Form } from "../Form";
import React, { useEffect, useState } from "react";
import { Screen } from "../../types/Screen";
import { useParams } from "react-router";
import { CrudApi } from "../../api/CrudApi";
import { useAppStore } from "../../store/store";
import { ErrorComponent } from "../ErrorComponent";

export function ControllerEdit({ screen }: { screen: Screen }) {
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

	return <Form data={data} screen={screen} />;
}
