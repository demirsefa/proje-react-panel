import React from "react";
import { Screen } from "../../types/Screen";
import { useEffect, useState } from "react";
import { CrudApi } from "../../api/CrudApi";
import { Link } from "react-router";
import { List } from "../list/List";
import { useAppStore } from "../../store/store";
import { ErrorComponent } from "../ErrorComponent";

export function ControllerList({ screen }: { screen: Screen }) {
	const { screens, fetchSettings, token } = useAppStore((s) => ({
		screens: s.screens ?? {},
		fetchSettings: s.fetchSettings,
		token: s.token,
	}));
	const [page, setPage] = useState(0);
	const [data, setData] = useState<any>(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (screen.controller && fetchSettings && token) {
			CrudApi.getList({ ...fetchSettings, token }, screen.controller)
				.then((res) => {
					setData(res);
				})
				.catch((e: any) => {
					setError(e);
					console.error(e);
				});
		}
	}, [page, screen.controller, fetchSettings]);

	if (error) {
		return <ErrorComponent error={error} />;
	}
	return (
		<div>
			<Link to={"create"}>Create</Link>
			{/*
			{error ? <p>Error {error}</p> : <></>}
*/}
			<List screen={screen} cells={screens[screen.key].cells} data={data} />
		</div>
	);
}
