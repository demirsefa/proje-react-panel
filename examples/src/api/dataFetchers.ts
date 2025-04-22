import { create, getAll, getOne, update, updateSimple, remove, createFormData } from "./crud";
import { AssetList, CreateAssetForm, DetailsAssetForm } from "../types/Asset";
import { EditThreadForm, CreateThreadForm, DetailsThreadForm, ThreadList } from "../types/Thread";
import { CreateMessageForm, DetailsMessageForm, EditMessageForm, MessageList } from "../types/Message";
import { UserList, CreateUserForm, EditUserForm, DetailsUserForm } from "../types/User";
import {
	CreateLocalizationForm,
	EditLocalizationForm,
	LocalizationAllForm,
	LocalizationList,
} from "../types/Localization";
import { LanguageList, CreateLanguageForm, EditLanguageForm, DetailsLanguageForm } from "../types/Language";
import { login } from "./auth";
import { AdminDetails, AdminList, CreateAdminForm, EditAdminForm } from "../types/Admin";

export const dataFetchers = Object.freeze({
	admins: {
		getAll: getAll<AdminList>("admins"),
		details: getOne<AdminDetails>("admins"),
		create: create<CreateAdminForm>("admins"),
		update: update<EditAdminForm>("admins"),
		remove: remove("admins", "id"),
	},
	assets: {
		getAll: getAll<AssetList>("assets"),
		create: createFormData<CreateAssetForm>("assets"),
		details: getOne<DetailsAssetForm>("assets"),
		remove: remove("assets", "id"),
	},
	threads: {
		getAll: getAll<ThreadList>("threads"),
		details: getOne<DetailsThreadForm>("threads"),
		create: create<CreateThreadForm>("threads"),
		update: update<EditThreadForm>("threads"),
		remove: remove("threads", "id"),
	},
	messages: {
		getAll: getAll<MessageList>("messages"),
		details: getOne<DetailsMessageForm>("messages"),
		create: create<CreateMessageForm>("messages"),
		update: update<EditMessageForm>("messages"),
		remove: remove("messages", "id"),
	},
	users: {
		getAll: getAll<UserList>("users"),
		details: getOne<DetailsUserForm>("users"),
		create: create<CreateUserForm>("users"),
		update: update<EditUserForm>("users"),
		remove: remove("users", "id"),
	},
	localization: {
		getAll: getAll<LocalizationList>("localization"),
		details: getOne<EditLocalizationForm>("localization"),
		create: create<CreateLocalizationForm>("localization"),
		update: update<EditLocalizationForm>("localization"),
		remove: remove("localization", "id"),
	},
	localizationAll: {
		details: getOne<LocalizationAllForm>("localizationAll", "language"),
		update: updateSimple<LocalizationAllForm>("localizationAll"),
	},
	languages: {
		getAll: getAll<LanguageList>("languages"),
		details: getOne<DetailsLanguageForm>("languages"),
		create: create<CreateLanguageForm>("languages"),
		update: update<EditLanguageForm>("languages", "code"),
		remove: remove("languages", "code"),
	},
	auth: {
		login: login(),
	},
});
