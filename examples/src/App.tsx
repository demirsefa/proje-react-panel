import React from "react";
import type { InitPanelOptions } from "proje-react-panel";
import { Login, Panel, ListPage, FormPage } from "proje-react-panel";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { AuthLayout } from "./AuthLayout";
import { AdminFormDTO, AdminListDTO } from "./types/Admin";
import { AssetFormDTO, AssetListDTO } from "./types/Asset";
import { ThreadFormDTO, ThreadListDTO } from "./types/Thread";
import { MessageFormDTO, MessageListDTO } from "./types/Message";
import { UserFormDTO, UserListDTO } from "./types/User";
import { dataFetchers } from "./api/dataFetchers";
import { initApi, initAuthToken } from "./api/apiConfig";
import { LocalizationFormDTO, LocalizationListDTO } from "./types/Localization";
import { UpdateAllPage } from "./pages/UpdateAllPage";

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
								element={<FormPage onSubmit={dataFetchers.admins.create} model={AdminFormDTO} />}
							/>
							<Route
								path={"edit/:id"}
								element={
									<FormPage
										getDetailsData={dataFetchers.admins.details}
										onSubmit={dataFetchers.admins.update}
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
								element={<FormPage onSubmit={dataFetchers.assets.create} model={AssetFormDTO} />}
							/>
							<Route
								path={"update"}
								element={<FormPage onSubmit={dataFetchers.assets.update} model={AssetFormDTO} />}
							/>
						</Route>
						<Route path={"messages"}>
							<Route
								path={""}
								element={<ListPage getData={dataFetchers.messages.getAll} model={MessageListDTO} />}
							/>
							<Route
								path={"create"}
								element={<FormPage onSubmit={dataFetchers.messages.create} model={MessageFormDTO} />}
							/>
							<Route
								path={"edit/:id"}
								element={<FormPage onSubmit={dataFetchers.messages.update} model={MessageFormDTO} />}
							/>
						</Route>
						<Route path={"threads"}>
							<Route
								path={""}
								element={<ListPage getData={dataFetchers.threads.getAll} model={ThreadListDTO} />}
							/>
							<Route
								path={"create"}
								element={<FormPage onSubmit={dataFetchers.threads.create} model={ThreadFormDTO} />}
							/>
							<Route
								path={"edit/:id"}
								element={<FormPage onSubmit={dataFetchers.threads.update} model={ThreadFormDTO} />}
							/>
						</Route>
						<Route path={"users"}>
							<Route
								path={""}
								element={<ListPage getData={dataFetchers.users.getAll} model={UserListDTO} />}
							/>
							<Route
								path={"create"}
								element={<FormPage onSubmit={dataFetchers.users.create} model={UserFormDTO} />}
							/>
							<Route
								path={"edit/:id"}
								element={<FormPage onSubmit={dataFetchers.users.update} model={UserFormDTO} />}
							/>
						</Route>
						<Route path={"localization"}>
							<Route
								path={""}
								element={
									<ListPage
										customHeader={
											<>
												<Link to={"/localization/update-all/tr"}>Update All</Link>
											</>
										}
										getData={dataFetchers.localization.getAll}
										model={LocalizationListDTO}
									/>
								}
							/>
							<Route
								path={"create"}
								element={
									<FormPage onSubmit={dataFetchers.localization.create} model={LocalizationFormDTO} />
								}
							/>
							<Route
								path={"edit/:id"}
								element={
									<FormPage onSubmit={dataFetchers.localization.update} model={LocalizationFormDTO} />
								}
							/>
							<Route path={"update-all/:language"} element={<UpdateAllPage />} />
						</Route>
					</Route>

					<Route path="/login" element={<Login onLogin={dataFetchers.auth.login} />} />
				</Routes>
			</Router>
		</Panel>
	);
}
