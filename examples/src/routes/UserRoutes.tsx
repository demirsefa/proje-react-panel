import React from "react";
import { Route, Routes } from "react-router";
import { ListPage, FormPage } from "proje-react-panel";
import { UserFormDTO, UserListDTO } from "../types/User";
import { dataFetchers } from "../api/dataFetchers";

export const UserRoutes = () => {
	return (
		<Routes	>
			<Route path={""} element={<ListPage getData={dataFetchers.users.getAll} model={UserListDTO} />} />
			<Route
				path={"create"}
				element={<FormPage onSubmit={dataFetchers.users.create} redirect={"/users"} model={UserFormDTO} />}
			/>
			<Route
				path={"update"}
				element={<FormPage onSubmit={dataFetchers.users.update} redirect={"/users"} model={UserFormDTO} />}
			/>
		</Routes>
	);
};
