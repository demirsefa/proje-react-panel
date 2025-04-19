import React from "react";
import type { InitPanelOptions } from "proje-react-panel";
import { Login, Panel, ListPage, FormPage } from "proje-react-panel";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { AuthLayout } from "./AuthLayout";
import { AdminFormDTO, AdminListDTO } from "./types/Admin";
import { AssetFormDTO, AssetListDTO } from "./types/Asset";
import { ThreadFormDTO, ThreadListDTO } from "./types/Thread";
import { MessageFormDTO, MessageListDTO } from "./types/Message";
import { UserFormDTO, UserListDTO } from "./types/User";
import { dataFetchers } from "./api/dataFetchers";
import { initApi, initAuthToken } from "./api/apiConfig";

initApi({
	baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
});
initAuthToken();

function init(): InitPanelOptions {
	return {
		screenPaths: {
			login: "/login",
		},
	};
}

export function App() {
	return (
		<Panel init={init}>
			<Router>
				<Routes>
					<Route path="/" element={<AuthLayout />}>
						<Route path={"/"} index element={<Dashboard />} />
						<Route path={"admins"}>
							<Route
								path={""}
								element={<ListPage getData={dataFetchers.admins.getAll} model={AdminListDTO} />}
							/>
							<Route
								path={"create"}
								element={
									<FormPage
										onSubmit={dataFetchers.admins.create}
										redirect={"/admins"}
										model={AdminFormDTO}
									/>
								}
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
						</Route>
						<Route path={"assets"}>
							<Route
								path={""}
								element={<ListPage getData={dataFetchers.assets.getAll} model={AssetListDTO} />}
							/>
							<Route
								path={"create"}
								element={
									<FormPage
										onSubmit={dataFetchers.assets.create}
										redirect={"/assets"}
										model={AssetFormDTO}
									/>
								}
							/>
							<Route
								path={"update"}
								element={
									<FormPage
										onSubmit={dataFetchers.assets.update}
										redirect={"/assets"}
										model={AssetFormDTO}
									/>
								}
							/>
						</Route>
						<Route path={"messages"}>
							<Route
								path={""}
								element={<ListPage getData={dataFetchers.messages.getAll} model={MessageListDTO} />}
							/>
							<Route
								path={"create"}
								element={
									<FormPage
										onSubmit={dataFetchers.messages.create}
										redirect={"/messages"}
										model={MessageFormDTO}
									/>
								}
							/>
							<Route
								path={"update"}
								element={
									<FormPage
										onSubmit={dataFetchers.messages.update}
										redirect={"/messages"}
										model={MessageFormDTO}
									/>
								}
							/>
						</Route>
						<Route path={"threads"}>
							<Route
								path={""}
								element={<ListPage getData={dataFetchers.threads.getAll} model={ThreadListDTO} />}
							/>
							<Route
								path={"create"}
								element={
									<FormPage
										onSubmit={dataFetchers.threads.create}
										redirect={"/threads"}
										model={ThreadFormDTO}
									/>
								}
							/>
							<Route
								path={"update"}
								element={
									<FormPage
										onSubmit={dataFetchers.threads.update}
										redirect={"/threads"}
										model={ThreadFormDTO}
									/>
								}
							/>
						</Route>
						<Route path={"users"}>
							<Route
								path={""}
								element={<ListPage getData={dataFetchers.users.getAll} model={UserListDTO} />}
							/>
							<Route
								path={"create"}
								element={
									<FormPage
										onSubmit={dataFetchers.users.create}
										redirect={"/users"}
										model={UserFormDTO}
									/>
								}
							/>
							<Route
								path={"update"}
								element={
									<FormPage
										onSubmit={dataFetchers.users.update}
										redirect={"/users"}
										model={UserFormDTO}
									/>
								}
							/>
						</Route>
					</Route>
					<Route path="/login" element={<Login onLogin={dataFetchers.auth.login} />} />
				</Routes>
			</Router>
		</Panel>
	);
}
