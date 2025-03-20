import React, { useEffect } from "react";
import { Screen } from "../types/Screen";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { CrudApi } from "../api/crudApi";
import { useAppStore } from "../store/store";
import { InputOptions } from "../decorators/Input";
import { Label } from "./Label";

export function Form({ data, screen }: { data?: any; screen: Screen }) {
	const { screens, fetchSettings } = useAppStore((s) => ({
		screens: s.screens ?? {},
		fetchSettings: s.fetchSettings,
	}));
	const isEditForm = !!data;
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<any>({
		resolver: screens[screen.controller].resolver,
		defaultValues: data,
	});
	const navigate = useNavigate();
	//const fields = screens[screen.controller].fields;
	const inputs = screens[screen.controller].inputs;
	useEffect(() => {
		reset(data);
	}, [data, reset]);

	return (
		<div className="form-wrapper">
			<form
				onSubmit={handleSubmit((dataForm) => {
					if (!fetchSettings) {
						return;
					}
					if (isEditForm) {
						CrudApi.edit(fetchSettings, screen.controller, dataForm).then(() => {
							navigate("/" + screen.controller, {
								replace: true,
							});
						});
					} else {
						CrudApi.create(fetchSettings, screen.controller, dataForm).then(() => {
							navigate("/" + screen.controller, {
								replace: true,
							});
						});
					}
				})}>
				{inputs.map((input: InputOptions) => {
					const fieldName = input.name || "";
					return (
						<div className="form-field" key={fieldName}>
							<Label htmlFor={fieldName} label={input.label} fieldName={fieldName} />
							<input
								type={input.inputType}
								{...register(fieldName)}
								placeholder={input.placeholder}
								id={fieldName}
								disabled={isEditForm && input.editable === false}
							/>
							{errors[fieldName] && (
								<span className="error-message">{errors[fieldName]?.message as string}</span>
							)}
						</div>
					);
				})}
				<button type="submit" className="submit-button">
					Submit
				</button>
			</form>
		</div>
	);
}
