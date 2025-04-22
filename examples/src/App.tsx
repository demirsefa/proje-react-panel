import React from "react";
import { Login, Panel, ListPage, FormPage, DetailsPage } from "proje-react-panel";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { AuthLayout } from "./AuthLayout";
import { AdminDetails, AdminList, CreateAdminForm, EditAdminForm } from "./types/Admin";
import { AssetList, CreateAssetForm, DetailsAssetForm } from "./types/Asset";
import { ThreadList, CreateThreadForm, EditThreadForm, DetailsThreadForm } from "./types/Thread";
import { MessageList, CreateMessageForm, EditMessageForm, DetailsMessageForm } from "./types/Message";
import { UserList, CreateUserForm, EditUserForm, DetailsUserForm } from "./types/User";
import { dataFetchers } from "./api/dataFetchers";
import { initApi, initAuthToken } from "./api/apiConfig";
import { CreateLocalizationForm, EditLocalizationForm, LocalizationList } from "./types/Localization";
import { UpdateAllPage } from "./pages/UpdateAllPage";
import { LanguageList, CreateLanguageForm, EditLanguageForm, DetailsLanguageForm } from "./types/Language";

initApi({
	baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
});
initAuthToken();

export function App() {
	return (
		<Panel>
			<Router>
				<Routes>
					<Route path="/" element={<AuthLayout />}>
						<Route path={"/"} index element={<Dashboard />} />
						<Route path={"admins"}>
							<Route path={""} element={<ListPage model={AdminList} />} />
							<Route path={"create"} element={<FormPage model={CreateAdminForm} />} />
							<Route path={"edit/:id"} element={<FormPage model={EditAdminForm} />} />
							<Route path={":id"} element={<DetailsPage model={AdminDetails} />} />
						</Route>
						<Route path={"assets"}>
							<Route path={""} element={<ListPage model={AssetList} />} />
							<Route path={"create"} element={<FormPage model={CreateAssetForm} />} />
							<Route path={":id"} element={<DetailsPage model={DetailsAssetForm} />} />
						</Route>
						<Route path={"messages"}>
							<Route path={""} element={<ListPage model={MessageList} />} />
							<Route path={"create"} element={<FormPage model={CreateMessageForm} />} />
							<Route path={"edit/:id"} element={<FormPage model={EditMessageForm} />} />
							<Route path={":id"} element={<DetailsPage model={DetailsMessageForm} />} />
						</Route>
						<Route path={"threads"}>
							<Route path={""} element={<ListPage model={ThreadList} />} />
							<Route path={"create"} element={<FormPage model={CreateThreadForm} />} />
							<Route path={"edit/:id"} element={<FormPage model={EditThreadForm} />} />
							<Route path={":id"} element={<DetailsPage model={DetailsThreadForm} />} />
						</Route>
						<Route path={"users"}>
							<Route path={""} element={<ListPage model={UserList} />} />
							<Route path={"create"} element={<FormPage model={CreateUserForm} />} />
							<Route path={"edit/:id"} element={<FormPage model={EditUserForm} />} />
							<Route path={":id"} element={<DetailsPage model={DetailsUserForm} />} />
						</Route>
						<Route path={"localization"}>
							<Route
								path={""}
								element={
									<ListPage
										model={LocalizationList}
										customHeader={
											<>
												<Link to={"/localization/update-all/tr"}>Update All</Link>
											</>
										}
									/>
								}
							/>
							<Route path={"create"} element={<FormPage model={CreateLocalizationForm} />} />
							<Route path={"edit/:id"} element={<FormPage model={EditLocalizationForm} />} />
							<Route path={"update-all/:language"} element={<UpdateAllPage />} />
						</Route>
						<Route path={"languages"}>
							<Route path={""} element={<ListPage model={LanguageList} />} />
							<Route path={"create"} element={<FormPage model={CreateLanguageForm} />} />
							<Route path={"edit/:id"} element={<FormPage model={EditLanguageForm} />} />
							<Route path={":id"} element={<DetailsPage model={DetailsLanguageForm} />} />
						</Route>
					</Route>

					<Route path="/login" element={<Login onLogin={dataFetchers.auth.login} />} />
				</Routes>
			</Router>
		</Panel>
	);
}
