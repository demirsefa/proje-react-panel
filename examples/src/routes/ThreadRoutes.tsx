import React from "react";
import { Route, Routes } from "react-router";
import { ListPage, FormPage } from "proje-react-panel";
import { ThreadFormDTO, ThreadListDTO } from "../types/Thread";
import { dataFetchers } from "../api/dataFetchers";

export const ThreadRoutes = () => {
	return (
		<Routes>
			<Route path={""} element={<ListPage getData={dataFetchers.threads.getAll} model={ThreadListDTO} />} />
			<Route
				path={"create"}
				element={
					<FormPage onSubmit={dataFetchers.threads.create} redirect={"/threads"} model={ThreadFormDTO} />
				}
			/>
			<Route
				path={"update"}
				element={
					<FormPage onSubmit={dataFetchers.threads.update} redirect={"/threads"} model={ThreadFormDTO} />
				}
			/>
		</Routes>
	);
};
