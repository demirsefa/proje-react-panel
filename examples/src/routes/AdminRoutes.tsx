import React from "react";
import { Route, Routes } from "react-router";
import { ListPage, FormPage } from "proje-react-panel";
import { AdminFormDTO, AdminListDTO } from "../types/Admin";
import { dataFetchers } from "../api/dataFetchers";

export const AdminRoutes = () => {
	return (
		<Routes>
			<Route path={""} element={<ListPage getData={dataFetchers.admins.getAll} model={AdminListDTO} />} />
			<Route
				path={"create"}
				element={<FormPage onSubmit={dataFetchers.admins.create} redirect={"/admins"} model={AdminFormDTO} />}
			/>
			<Route
				path={"edit/:id"}
				element={
					<FormPage
						getDetailsData={dataFetchers.admins.details}
						onSubmit={dataFetchers.admins.update}
						redirect={"/admins"}
						model={AdminFormDTO}
					/>
				}
			/>
		</Routes>
	);
};
