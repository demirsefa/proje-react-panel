import React from "react";
import { useForm } from "react-hook-form";
import { FormField } from "../FormField";
import { Screen } from "../../types/Screen";
import "../../styles/login.scss";

interface LoginFormData {
	email: string;
	password: string;
}
function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>();

	const onSubmit = async (data: LoginFormData) => {
		// TODO: Implement login logic
		console.log("Login attempt:", data);
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
							name: "email",
							label: "Email",
							inputType: "email",
							placeholder: "Enter your email",
						}}
						register={register}
						isEditForm={false}
						error={errors.email}
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

export default Login;
