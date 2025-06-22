import { IsString, MinLength } from "class-validator";
import { Cell, List, Input, getInputFields, Form } from "proje-react-panel";
import { dataFetchers } from "../api/dataFetchers";
@List({
	headers: {
		create: { path: "create", label: "Create" },
	},
	cells: (item: LocalizationList) => ({
		edit: { path: "edit/" + item.id, label: "Edit" },
		delete: { label: "Delete", onRemoveItem: dataFetchers.localization.remove },
	}),
	getData: dataFetchers.localization.getAll,
})
export class LocalizationList {
	@Cell({ name: "id", title: "Key" })
	id: string;

	@Cell({ name: "text", title: "Text" })
	text: string;

	@Cell({ name: "explanation", title: "Explanation" })
	explanation: string;

	@Cell({
		name: "language",
		title: "Language",
		filter: {
			type: "static-select",
			options: [
				{ value: "tr", label: "Türkçe" },
				{ value: "en", label: "English" },
				{ value: "fr", label: "Français" },
				{ value: "es", label: "Español" },
			],
		},
	})
	language: string;

	createdAt: Date;

	updatedAt: Date;
}

class LocalizationForm {
	@IsString()
	@MinLength(1)
	@Input({ label: "Key", type: "input" })
	id: string;

	@IsString()
	@MinLength(1)
	@Input({ label: "Explanation", type: "textarea" })
	explanation: string;

	//@IsString()
	//@MinLength(2) //we do not support nested fields yet TODO: warning
	@Input({ defaultValue: "", label: "Turkish Text", placeholder: "Enter Turkish Text" })
	"translations[0].text": string;

	//@IsString() //we do not support nested fields yet TODO: warning
	@Input({ defaultValue: "tr", type: "hidden" })
	"translations[0].language": string;

	@Input({
		type: "hidden",
	})
	clientVersion: number;
}

export class SimpleLocalizationForm {
	@IsString()
	@MinLength(1)
	@Input({ label: "Key", type: "input", includeInJSON: true, includeInCSV: true })
	id: string;

	@IsString()
	@MinLength(1)
	@Input({ label: "Text", type: "textarea", includeInJSON: true, includeInCSV: true })
	text: string;

	@IsString()
	@MinLength(2)
	@Input({
		label: "Language",
		type: "hidden",
		includeInJSON: true,
		includeInCSV: true,
	})
	language: string;

	@Input({
		type: "hidden",
	})
	clientVersion: number;
}

@Form({
	onSubmit: dataFetchers.localizationAll.update,
	getDetailsData: dataFetchers.localizationAll.details,
	redirectSuccessUrl: "/localization",
})
export class LocalizationAllForm {
	@Input({ type: "hidden" })
	language: string;

	@Input({
		label: "Inputs",
		includeInJSON: true,
		includeInCSV: true,
		type: "nested",
		nestedFields: getInputFields(SimpleLocalizationForm),
	})
	keys: SimpleLocalizationForm[];

	@Input({
		type: "hidden",
	})
	clientVersion: number;
}

@Form({
	onSubmit: dataFetchers.localization.create,
	redirectSuccessUrl: "/localization",
})
export class CreateLocalizationForm extends LocalizationForm {}

@Form({
	onSubmit: dataFetchers.localization.update,
	getDetailsData: dataFetchers.localization.details,
	redirectSuccessUrl: "/localization",
})
export class EditLocalizationForm extends LocalizationForm {}
