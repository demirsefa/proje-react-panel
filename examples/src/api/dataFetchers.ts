import { create, getAll, getOne, update, updateSimple, remove } from "./crud";
import { AdminDetailsForrm, AdminForm, AdminList } from "../types/Admin";
import { AssetForm, AssetList } from "../types/Asset";
import { ThreadForm, ThreadList } from "../types/Thread";
import { MessageForm, MessageList } from "../types/Message";
import { UserForm, UserList } from "../types/User";
import { LocalizationAllForm, LocalizationForm, LocalizationList } from "../types/Localization";
import { LanguageForm, LanguageList } from "../types/Language";
import { login } from "./auth";

export const dataFetchers = Object.freeze({
	admins: {
		getAll: getAll<AdminList>("admins"),
		details: getOne<AdminDetailsForrm>("admins"),
		create: create<AdminForm>("admins"),
		update: update<AdminForm>("admins"),
		remove: remove("admins", "id"),
	},
	assets: {
		getAll: getAll<AssetList>("assets"),
		create: create<AssetForm>("assets"),
		update: update<AssetForm>("assets"),
		remove: remove("assets", "id"),
	},
	threads: {
		getAll: getAll<ThreadList>("threads"),
		create: create<ThreadForm>("threads"),
		update: update<ThreadForm>("threads"),
		remove: remove("threads", "id"),
	},
	messages: {
		getAll: getAll<MessageList>("messages"),
		create: create<MessageForm>("messages"),
		update: update<MessageForm>("messages"),
		remove: remove("messages", "id"),
	},
	users: {
		getAll: getAll<UserList>("users"),
		create: create<UserForm>("users"),
		update: update<UserForm>("users"),
		remove: remove("users", "id"),
	},
	localization: {
		getAll: getAll<LocalizationList>("localization"),
		details: getOne<LocalizationForm>("localization"),
		create: create<LocalizationForm>("localization"),
		update: update<LocalizationForm>("localization"),
		remove: remove("localization", "id"),
	},
	localizationAll: {
		details: getOne<LocalizationAllForm>("localizationAll", "language"),
		update: updateSimple<LocalizationAllForm>("localizationAll"),
	},
	languages: {
		getAll: getAll<LanguageList>("languages"),
		details: getOne<LanguageForm>("languages"),
		create: create<LanguageForm>("languages"),
		update: update<LanguageForm>("languages", "code"),
		remove: remove("languages", "code"),
	},
	auth: {
		login: login(),
	},
});
