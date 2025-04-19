import React from "react";
import { Route, Routes } from "react-router";
import { ListPage, FormPage } from "proje-react-panel";
import { AssetFormDTO, AssetListDTO } from "../types/Asset";
import { dataFetchers } from "../api/dataFetchers";

export const AssetRoutes = () => {
	return (
		<Routes>
			<Route path={""} element={<ListPage getData={dataFetchers.assets.getAll} model={AssetListDTO} />} />
			<Route
				path={"create"}
				element={<FormPage onSubmit={dataFetchers.assets.create} redirect={"/assets"} model={AssetFormDTO} />}
			/>
			<Route
				path={"update"}
				element={<FormPage onSubmit={dataFetchers.assets.update} redirect={"/assets"} model={AssetFormDTO} />}
			/>
		</Routes>
	);
};
