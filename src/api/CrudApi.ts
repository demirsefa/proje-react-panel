interface FetchOptions {
	token: string;
	baseUrl: string;
}

export const CrudApi = {
	getList: (options: FetchOptions, api: string) => {
		return fetch(`${options.baseUrl}/${api}`, {
			method: "GET",
			headers: { "Content-Type": "application/json", Authorization: `Bearer ${options.token}` },
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw res;
		});
	},
	create: (fetchSettings: { baseUrl: string }, api: string, data: any) => {
		return fetch(`${fetchSettings?.baseUrl ?? ""}/${api}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		}).then((res) => res.json());
	},
	details: (fetchSettings: { baseUrl: string }, api: string, id: any) => {
		return fetch(`${fetchSettings?.baseUrl ?? ""}/${api}/${id}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		}).then((res) => {
			return res.json();
		});
	},
	edit: (fetchSettings: { baseUrl: string }, api: string, data: any) => {
		return fetch(`${fetchSettings?.baseUrl ?? ""}/${api}/${data.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		}).then((res) => res.json());
	},
};
