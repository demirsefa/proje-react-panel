import React from "react";
import type { InitPanelOptions } from "proje-react-panel";
import { Login, Panel, ListPage, FormPage } from "proje-react-panel";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { AuthLayout } from "./AuthLayout";
import { AdminFormDTO, AdminListDTO } from "./types/Admin";
import { AssetListDTO } from "./types/Asset";
import { ThreadListDTO } from "./types/Thread";
import { MessageListDTO } from "./types/Message";
import { UserListDTO } from "./types/User";
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
						</Route>
						<Route
							path={"/assets"}
							element={<ListPage getData={dataFetchers.assets.getAll} model={AssetListDTO} />}
						/>
						<Route
							path={"/messages"}
							element={<ListPage getData={dataFetchers.messages.getAll} model={MessageListDTO} />}
						/>
						<Route
							path={"/threads"}
							element={<ListPage getData={dataFetchers.threads.getAll} model={ThreadListDTO} />}
						/>
						<Route
							path={"/users"}
							element={<ListPage getData={dataFetchers.users.getAll} model={UserListDTO} />}
						/>
					</Route>
					<Route path="/login" element={<Login onLogin={dataFetchers.auth.login} />} />
				</Routes>
			</Router>
		</Panel>
	);
}
