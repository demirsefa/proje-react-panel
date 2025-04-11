import axios from "axios";
import { OnLogin } from "proje-react-panel";
import { getAxiosInstance, setAuthToken } from "./apiConfig";


// Define the API response data type
interface LoginResponseData {
	access_token: string;
	admin: {
		email: string;
		id: string;
	};
}

export function login(): OnLogin {
	return {
		login: async (username: string, password: string) => {
			try {
				const response = await getAxiosInstance().post<LoginResponseData>("/auth/login", { username, password });
				console.log(response);
				const { access_token, admin } = response.data;
				setAuthToken(access_token);
				// map response to LoginResponse
				return {
					user: admin,
					token: access_token
				};
			} catch (error) {
				throw error;
			}
		},
	};
}

