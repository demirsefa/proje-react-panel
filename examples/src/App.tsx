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
import { initApi, initAuthToken, setAuthToken } from "./api/apiConfig";
import { CreateLocalizationForm, EditLocalizationForm, LocalizationList } from "./types/Localization";
import { UpdateAllPage } from "./pages/UpdateAllPage";
import { LanguageList, CreateLanguageForm, EditLanguageForm, DetailsLanguageForm } from "./types/Language";
import { LoginForm } from "./types/Login";

initApi({
	baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
});
initAuthToken();

export function App() {
	return (
		<Panel onInit={appData => {
			if (appData.token) {
				setAuthToken(appData.token);
			}
		}}>
			<Router>
				<Routes>
					<Route path="/" element={<AuthLayout />}>
						<Route path={"/"} index element={<Dashboard key="dashboard" />} />
						<Route path={"admins"}>
							<Route path={""} element={<ListPage key="admin-list" model={AdminList} />} />
							<Route path={"create"} element={<FormPage key="admin-create" model={CreateAdminForm} />} />
							<Route path={"edit/:id"} element={<FormPage key="admin-edit" model={EditAdminForm} />} />
							<Route path={":id"} element={<DetailsPage key="admin-details" model={AdminDetails} />} />
						</Route>
						<Route path={"assets"}>
							<Route path={""} element={<ListPage key="asset-list" model={AssetList} />} />
							<Route path={"create"} element={<FormPage key="asset-create" model={CreateAssetForm} />} />
							<Route
								path={":id"}
								element={<DetailsPage key="asset-details" model={DetailsAssetForm} />}
							/>
						</Route>
						<Route path={"messages"}>
							<Route path={""} element={<ListPage key="message-list" model={MessageList} />} />
							<Route
								path={"create"}
								element={<FormPage key="message-create" model={CreateMessageForm} />}
							/>
							<Route
								path={"edit/:id"}
								element={<FormPage key="message-edit" model={EditMessageForm} />}
							/>
							<Route
								path={":id"}
								element={<DetailsPage key="message-details" model={DetailsMessageForm} />}
							/>
						</Route>
						<Route path={"threads"}>
							<Route path={""} element={<ListPage key="thread-list" model={ThreadList} />} />
							<Route
								path={"create"}
								element={<FormPage key="thread-create" model={CreateThreadForm} />}
							/>
							<Route path={"edit/:id"} element={<FormPage key="thread-edit" model={EditThreadForm} />} />
							<Route
								path={":id"}
								element={<DetailsPage key="thread-details" model={DetailsThreadForm} />}
							/>
						</Route>
						<Route path={"users"}>
							<Route path={""} element={<ListPage key="user-list" model={UserList} />} />
							<Route path={"create"} element={<FormPage key="user-create" model={CreateUserForm} />} />
							<Route path={"edit/:id"} element={<FormPage key="user-edit" model={EditUserForm} />} />
							<Route path={":id"} element={<DetailsPage key="user-details" model={DetailsUserForm} />} />
						</Route>
						<Route path={"localization"}>
							<Route
								path={""}
								element={
									<ListPage
										key="localization-list"
										model={LocalizationList}
										customHeader={
											<>
												<Link to={"/localization/update-all/tr"}>Update All</Link>
											</>
										}
									/>
								}
							/>
							<Route
								path={"create"}
								element={<FormPage key="localization-create" model={CreateLocalizationForm} />}
							/>
							<Route
								path={"edit/:id"}
								element={<FormPage key="localization-edit" model={EditLocalizationForm} />}
							/>
							<Route
								path={"update-all/:language"}
								element={<UpdateAllPage key="localization-update-all" />}
							/>
						</Route>
						<Route path={"languages"}>
							<Route path={""} element={<ListPage key="language-list" model={LanguageList} />} />
							<Route
								path={"create"}
								element={<FormPage key="language-create" model={CreateLanguageForm} />}
							/>
							<Route
								path={"edit/:id"}
								element={<FormPage key="language-edit" model={EditLanguageForm} />}
							/>
							<Route
								path={":id"}
								element={<DetailsPage key="language-details" model={DetailsLanguageForm} />}
							/>
						</Route>
					</Route>

					<Route path="/login" element={<Login key="login" model={LoginForm} />} />
				</Routes>
			</Router>
		</Panel>
	);
}
