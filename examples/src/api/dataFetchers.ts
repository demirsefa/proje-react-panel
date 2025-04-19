import { create, getAll, getOne, update } from "./crud";
import { AdminDetailsFormDTO, AdminFormDTO, AdminListDTO } from "../types/Admin";
import { AssetFormDTO, AssetListDTO } from "../types/Asset";
import { ThreadFormDTO, ThreadListDTO } from "../types/Thread";
import { MessageFormDTO, MessageListDTO } from "../types/Message";
import { UserFormDTO, UserListDTO } from "../types/User";
import { login } from "./auth";

export const dataFetchers = Object.freeze({
	admins: {
		getAll: getAll<typeof AdminListDTO>("admins"),
		details: getOne<typeof AdminDetailsFormDTO>("admins"),
		create: create<typeof AdminFormDTO>("admins"),
		update: update<typeof AdminFormDTO>("admins"),
	},
	assets: {
		getAll: getAll<typeof AssetListDTO>("assets"),
		create: create<typeof AssetFormDTO>("assets"),
		update: update<typeof AssetFormDTO>("assets"),
	},
	threads: {
		getAll: getAll<typeof ThreadListDTO>("threads"),
		create: create<typeof ThreadFormDTO>("threads"),
		update: update<typeof ThreadFormDTO>("threads"),
	},
	messages: {
		getAll: getAll<typeof MessageListDTO>("messages"),
		create: create<typeof MessageFormDTO>("messages"),
		update: update<typeof MessageFormDTO>("messages"),
	},
	users: {
		getAll: getAll<typeof UserListDTO>("users"),
		create: create<typeof UserFormDTO>("users"),
		update: update<typeof UserFormDTO>("users"),
	},
	auth: {
		login: login(),
	},
});
