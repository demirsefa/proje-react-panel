import { create, getAll, getOne, update, updateSimple } from "./crud";
import { AdminDetailsForrm, AdminForm, AdminList } from "../types/Admin";
import { AssetForm, AssetList } from "../types/Asset";
import { ThreadForm, ThreadList } from "../types/Thread";
import { MessageForm, MessageList } from "../types/Message";
import { UserForm, UserList } from "../types/User";
import { LocalizationAllFormDTO, LocalizationFormDTO, LocalizationListDTO } from "../types/Localization";
import { LanguageForm, LanguageList } from "../types/Language";
import { login } from "./auth";

export const dataFetchers = Object.freeze({
	admins: {
		getAll: getAll<typeof AdminList>("admins"),
		details: getOne<typeof AdminDetailsForrm>("admins"),
		create: create<typeof AdminForm>("admins"),
		update: update<typeof AdminForm>("admins"),
	},
	assets: {
		getAll: getAll<typeof AssetList>("assets"),
		create: create<typeof AssetForm>("assets"),
		update: update<typeof AssetForm>("assets"),
	},
	threads: {
		getAll: getAll<typeof ThreadList>("threads"),
		create: create<typeof ThreadForm>("threads"),
		update: update<typeof ThreadForm>("threads"),
	},
	messages: {
		getAll: getAll<typeof MessageList>("messages"),
		create: create<typeof MessageForm>("messages"),
		update: update<typeof MessageForm>("messages"),
	},
	users: {
		getAll: getAll<typeof UserList>("users"),
		create: create<typeof UserForm>("users"),
		update: update<typeof UserForm>("users"),
	},
	localization: {
		getAll: getAll<typeof LocalizationListDTO>("localization"),
		details: getOne<typeof LocalizationFormDTO>("localization"),
		create: create<typeof LocalizationFormDTO>("localization"),
		update: update<typeof LocalizationFormDTO>("localization"),
	},
	localizationAll: {
		details: getOne<typeof LocalizationAllFormDTO>("localizationAll", "language"),
		update: updateSimple<typeof LocalizationAllFormDTO>("localizationAll"),
	},
	languages: {
		getAll: getAll<typeof LanguageList>("languages"),
		details: getOne<typeof LanguageForm>("languages"),
		create: create<typeof LanguageForm>("languages"),
		update: update<typeof LanguageForm>("languages"),
	},
	auth: {
		login: login(),
	},
});
