import React, { useEffect, useState } from "react";
import { LocalizationAllForm } from "../types/Localization";
import { dataFetchers } from "../api/dataFetchers";
import { FormPage } from "proje-react-panel";
import Select from "react-select";
import { useNavigate, useParams } from "react-router";
import { LanguageList } from "../types/Language";
import { HardCodedLanguageOptions } from "../constants/HardCodedLanguageOptions";

export function UpdateAllPage() {
	const params = useParams();
	const [fetchedLanguageOptions, setFetchedLanguageOptions] = useState<{ label: string; value: string }[]>([]);
	useEffect(() => {
		dataFetchers.languages.getAll({ page: 1, limit: 200 }).then((response) => {
			setFetchedLanguageOptions(
				(response.data as LanguageList[]).map((language: LanguageList) => {
					const label =
						HardCodedLanguageOptions.find((option) => option.value === language.code)?.label ||
						language.code;
					return {
						value: language.code,
						label: label,
					};
				})
			);
		});
	}, []);
	const [selectedLanguage, setSelectedLanguage] = useState(() =>
		fetchedLanguageOptions.find((option) => option.value === params.language)
	);

	const navigate = useNavigate();
	const [key, setKey] = useState<number>(0);

	return (
		<div>
			<div style={{ margin: "20px" }}>
				<Select
					value={selectedLanguage}
					onChange={(option) => {
						setSelectedLanguage(option as (typeof fetchedLanguageOptions)[0]);
						navigate(`/localization/update-all/${option?.value}`);
						setKey(key + 1);
					}}
					options={fetchedLanguageOptions}
					styles={{
						control: (baseStyles, state) => ({
							...baseStyles,
							backgroundColor: "#1f2937",
							borderColor: state.isFocused ? "#6366f1" : "#374151",
							boxShadow: state.isFocused ? "0 0 0 1px #6366f1" : "none",
							"&:hover": {
								borderColor: "#6366f1",
							},
							borderRadius: "6px",
							padding: "2px",
							color: "white",
							width: "200px",
						}),
						option: (baseStyles, state) => ({
							...baseStyles,
							backgroundColor: state.isSelected ? "#6366f1" : state.isFocused ? "#374151" : "#1f2937",
							color: "white",
							"&:active": {
								backgroundColor: "#6366f1",
							},
							"&:hover": {
								backgroundColor: "#374151",
							},
							cursor: "pointer",
						}),
						input: (baseStyles) => ({
							...baseStyles,
							color: "white",
						}),
						placeholder: (baseStyles) => ({
							...baseStyles,
							color: "#9ca3af",
						}),
						singleValue: (baseStyles) => ({
							...baseStyles,
							color: "white",
						}),
						menuPortal: (baseStyles) => ({
							...baseStyles,
							zIndex: 9999,
						}),
						menu: (baseStyles) => ({
							...baseStyles,
							backgroundColor: "#1f2937",
							border: "1px solid #374151",
							boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
						}),
						menuList: (baseStyles) => ({
							...baseStyles,
							padding: "4px",
						}),
						dropdownIndicator: (baseStyles) => ({
							...baseStyles,
							color: "#9ca3af",
							"&:hover": {
								color: "#6366f1",
							},
						}),
						clearIndicator: (baseStyles) => ({
							...baseStyles,
							color: "#9ca3af",
							"&:hover": {
								color: "#6366f1",
							},
						}),
					}}
				/>
			</div>
			<FormPage
				header={(utils) => (
					<>
						<button
							className="export-button"
							onClick={() => {
								const json = utils.toJSON(utils.getValues());
								utils.export(json, "json");
							}}>
							Export JSON
						</button>

						<button
							className="import-button"
							onClick={() => {
								utils.import().then((json) => {
									const values = utils.fromJSON(json);
									console.log("values", values);
									utils.setValues(values);
								});
							}}>
							Import JSON
						</button>
					</>
				)}
				model={LocalizationAllForm}
			/>
		</div>
	);
}
