import React from "react";
import { Route, Routes } from "react-router";
import { ListPage, FormPage } from "proje-react-panel";
import { MessageFormDTO, MessageListDTO } from "../types/Message";
import { dataFetchers } from "../api/dataFetchers";

export const MessageRoutes = () => {
	return (
		<Routes>
			<Route path={""} element={<ListPage getData={dataFetchers.messages.getAll} model={MessageListDTO} />} />
			<Route
				path={"create"}
				element={
					<FormPage onSubmit={dataFetchers.messages.create} redirect={"/messages"} model={MessageFormDTO} />
				}
			/>
			<Route
				path={"update"}
				element={
					<FormPage onSubmit={dataFetchers.messages.update} redirect={"/messages"} model={MessageFormDTO} />
				}
			/>
		</Routes>
	);
};
