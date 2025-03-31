import React from "react";
import { useForm } from "react-hook-form";
import { FormField } from "../FormField";
import { AuthApi } from "../../api/AuthApi";
import { useAppStore } from "../../store/store";
import { useNavigate } from "react-router";

interface LoginFormData {
	username: string;
	password: string;
}

export function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>();
	const { fetchSettings } = useAppStore((s) => ({ fetchSettings: s.fetchSettings }));
	const navigate = useNavigate();
	const onSubmit = async (data: LoginFormData) => {
		AuthApi.login(fetchSettings!, data.username, data.password).then((dataInner) => {
			const { access_token, admin } = dataInner;
			useAppStore.setState({ user: admin, token: access_token });
			navigate("/");
		});
	};

	return (
		<div className="login-container">
			<div className="login-panel">
				<div className="login-header">
					<h1>Welcome Back</h1>
					<p>Please sign in to continue</p>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className="login-form">
					<FormField
						input={{
							name: "username",
							label: "Username",
							inputType: "text",
							placeholder: "Enter your username",
						}}
						register={register}
						isEditForm={false}
						error={errors.username}
					/>
					<FormField
						input={{
							name: "password",
							label: "Password",
							inputType: "password",
							placeholder: "Enter your password",
						}}
						register={register}
						isEditForm={false}
						error={errors.password}
					/>
					<div className="form-actions">
						<button type="submit" className="submit-button">
							Sign In
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
