export const AuthApi = {
	login: (fetchSettings: { baseUrl: string }, username: string, password: string) => {
		return fetch(`${fetchSettings.baseUrl}/auth/login`, {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: { "Content-Type": "application/json" },
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw res;
		});
	},
};
