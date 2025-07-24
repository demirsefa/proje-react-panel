import { MinLength } from "class-validator";
import { Form, Input, login } from "proje-react-panel";
import { dataFetchers } from "../api/dataFetchers";
import { AdminDetails } from "./Admin";
import { setAuthToken } from "../api/apiConfig";

export interface LoginResponse {
	access_token: string;
	admin: AdminDetails;
}

@Form<LoginForm, LoginResponse>({
	onSubmit: dataFetchers.auth.login,
	onSubmitSuccess: (data: LoginResponse) => {
		setAuthToken(data.access_token);
		login(data.admin, data.access_token, () => {
			window.location.href = "/";
		});
	},
	type: "formData",
})
export class LoginForm {
	@MinLength(3)
	@Input({
		label: "Username",
	})
	username: string;

	@Input({
		label: "Password",
		inputType: "password",
	})
	password: string;
}
