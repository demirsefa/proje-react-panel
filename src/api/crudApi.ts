export const CrudApi = {
	getList: (fetchSettings: { baseUrl: string }, api: string) => {
		return fetch(`${fetchSettings.baseUrl}/${api}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		}).then((res) => {
			return res.json();
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
		return fetch(`${fetchSettings?.baseUrl ?? ""}${api}/${data.id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		}).then((res) => res.json());
	},
};
