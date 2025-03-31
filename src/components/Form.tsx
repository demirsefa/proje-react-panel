import React, { useEffect } from "react";
import { Screen } from "../types/Screen";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { CrudApi } from "../api/CrudApi";
import { useAppStore } from "../store/store";
import { InputOptions } from "../decorators/Input";
import { FormField } from "./FormField";

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
		//TODO: remove __formEdit from api
		defaultValues: { ...data, __formEdit: isEditForm },
	});
	const navigate = useNavigate();
	//const fields = screens[screen.controller].fields;
	const inputs = screens[screen.controller].inputs;
	useEffect(() => {
		reset({ ...data, __formEdit: isEditForm });
	}, [isEditForm, data, reset]);

	return (
		<div className="form-wrapper">
			<form
				onSubmit={handleSubmit((dataForm) => {
					if (!fetchSettings) {
						return;
					}
					delete dataForm.__formEdit;
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
				{inputs.map((input: InputOptions) => (
					<FormField
						key={input.name || ""}
						input={input}
						register={register}
						isEditForm={isEditForm}
						error={errors[input.name || ""]}
					/>
				))}
				<button type="submit" className="submit-button">
					Submit
				</button>
			</form>
		</div>
	);
}
