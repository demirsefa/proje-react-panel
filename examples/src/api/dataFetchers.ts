import { create, getAll } from "./crud";
import { AdminFormDTO, AdminListDTO } from "../types/Admin";
import { AssetListDTO } from "../types/Asset";
import { ThreadListDTO } from "../types/Thread";
import { MessageListDTO } from "../types/Message";
import { UserListDTO } from "../types/User";
import { login } from "./auth";

export const dataFetchers = Object.freeze({
	admins: {
		getAll: getAll<typeof AdminListDTO>("admins"),
		create: create<typeof AdminFormDTO>("admins"),
	},
	assets: {
		getAll: getAll<typeof AssetListDTO>("assets"),
	},
	threads: {
		getAll: getAll<typeof ThreadListDTO>("threads"),
	},
	messages: {
		getAll: getAll<typeof MessageListDTO>("messages"),
	},
	users: {
		getAll: getAll<typeof UserListDTO>("users"),
	},
	auth: {
		login: login(),
	},
});
