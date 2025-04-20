import React from "react";
import type { InitPanelOptions } from "proje-react-panel";
import { Login, Panel, ListPage, FormPage } from "proje-react-panel";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { AuthLayout } from "./AuthLayout";
import { AdminForm, AdminList } from "./types/Admin";
import { AssetForm, AssetList } from "./types/Asset";
import { ThreadForm, ThreadList } from "./types/Thread";
import { MessageForm, MessageList } from "./types/Message";
import { UserForm, UserList } from "./types/User";
import { dataFetchers } from "./api/dataFetchers";
import { initApi, initAuthToken } from "./api/apiConfig";
import { LocalizationForm, LocalizationList } from "./types/Localization";
import { UpdateAllPage } from "./pages/UpdateAllPage";
import { LanguageForm, LanguageList } from "./types/Language";

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
								element={
									<ListPage
										getData={dataFetchers.admins.getAll}
										onRemoveItem={dataFetchers.admins.remove}
										model={AdminList}
									/>
								}
							/>
							<Route
								path={"create"}
								element={<FormPage onSubmit={dataFetchers.admins.create} model={AdminForm} />}
							/>
							<Route
								path={"edit/:id"}
								element={
									<FormPage
										getDetailsData={dataFetchers.admins.details}
										onSubmit={dataFetchers.admins.update}
										model={AdminForm}
									/>
								}
							/>
						</Route>
						<Route path={"assets"}>
							<Route
								path={""}
								element={
									<ListPage
										getData={dataFetchers.assets.getAll}
										onRemoveItem={dataFetchers.assets.remove}
										model={AssetList}
									/>
								}
							/>
							<Route
								path={"create"}
								element={<FormPage onSubmit={dataFetchers.assets.create} model={AssetForm} />}
							/>
							<Route
								path={"update"}
								element={<FormPage onSubmit={dataFetchers.assets.update} model={AssetForm} />}
							/>
						</Route>
						<Route path={"messages"}>
							<Route
								path={""}
								element={
									<ListPage
										getData={dataFetchers.messages.getAll}
										onRemoveItem={dataFetchers.messages.remove}
										model={MessageList}
									/>
								}
							/>
							<Route
								path={"create"}
								element={<FormPage onSubmit={dataFetchers.messages.create} model={MessageForm} />}
							/>
							<Route
								path={"edit/:id"}
								element={<FormPage onSubmit={dataFetchers.messages.update} model={MessageForm} />}
							/>
						</Route>
						<Route path={"threads"}>
							<Route
								path={""}
								element={
									<ListPage
										getData={dataFetchers.threads.getAll}
										onRemoveItem={dataFetchers.threads.remove}
										model={ThreadList}
									/>
								}
							/>
							<Route
								path={"create"}
								element={<FormPage onSubmit={dataFetchers.threads.create} model={ThreadForm} />}
							/>
							<Route
								path={"edit/:id"}
								element={<FormPage onSubmit={dataFetchers.threads.update} model={ThreadForm} />}
							/>
						</Route>
						<Route path={"users"}>
							<Route
								path={""}
								element={
									<ListPage
										getData={dataFetchers.users.getAll}
										onRemoveItem={dataFetchers.users.remove}
										model={UserList}
									/>
								}
							/>
							<Route
								path={"create"}
								element={<FormPage onSubmit={dataFetchers.users.create} model={UserForm} />}
							/>
							<Route
								path={"edit/:id"}
								element={<FormPage onSubmit={dataFetchers.users.update} model={UserForm} />}
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
										onRemoveItem={dataFetchers.localization.remove}
										model={LocalizationList}
									/>
								}
							/>
							<Route
								path={"create"}
								element={
									<FormPage onSubmit={dataFetchers.localization.create} model={LocalizationForm} />
								}
							/>
							<Route
								path={"edit/:id"}
								element={
									<FormPage onSubmit={dataFetchers.localization.update} model={LocalizationForm} />
								}
							/>
							<Route path={"update-all/:language"} element={<UpdateAllPage />} />
						</Route>
						<Route path={"languages"}>
							<Route
								path={""}
								element={
									<ListPage
										getData={dataFetchers.languages.getAll}
										onRemoveItem={dataFetchers.languages.remove}
										model={LanguageList}
									/>
								}
							/>
							<Route
								path={"create"}
								element={<FormPage onSubmit={dataFetchers.languages.create} model={LanguageForm} />}
							/>
							<Route
								path={"edit/:id"}
								element={
									<FormPage
										getDetailsData={dataFetchers.languages.details}
										onSubmit={dataFetchers.languages.update}
										model={LanguageForm}
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
