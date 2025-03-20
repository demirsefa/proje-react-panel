import React, { useEffect } from "react";
import { Screen } from "../types/Screen";
import { FieldErrors, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { CrudApi } from "../api/crudApi";
import { useAppStore } from "../store/store";

export function Form({ data, screen }: { data?: any; screen: Screen }) {
	const { screens, fetchSettings } = useAppStore((s) => ({
		screens: s.screens ?? {},
		fetchSettings: s.fetchSettings,
	}));
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
	const fields = screens[screen.controller].fields;

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
					if (data) {
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
				{fields.map((field: any) => (
					<div className="form-field" key={field}>
						<label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
						<input type="text" {...register(field)} placeholder={`Enter ${field}`} id={field} />
						{errors[field] && (
							<span className="error-message">
								{/*@ts-ignore*/}
								{(errors[field] as FieldErrors)?.message}
							</span>
						)}
					</div>
				))}
				<button type="submit" className="submit-button">
					Submit
				</button>
			</form>
		</div>
	);
}
