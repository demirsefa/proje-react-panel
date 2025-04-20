import { IsString, MinLength } from "class-validator";
import { Cell, List, Input } from "proje-react-panel";
import { getInputFields } from "proje-react-panel";
import { DataType } from "./data";
@List({
	headers: {
		create: { path: "create", label: "Create" },
	},
	utilCells: {
		details: { path: "details", label: "Details" },
		edit: { path: "edit", label: "Edit" },
		delete: { path: "delete", label: "Delete" },
	},
})
export class LocalizationListDTO {
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

export class LocalizationFormDTO {
	@IsString()
	@MinLength(1)
	@Input({ label: "Key", type: "input" })
	id: string;

	@IsString()
	@MinLength(1)
	@Input({ label: "Explanation", type: "textarea" })
	explanation: string;
}

export class SimpleLocalizationFormDTO {
	@IsString()
	@MinLength(1)
	@Input({ label: "Key", type: "input" })
	id: string;

	@IsString()
	@MinLength(1)
	@Input({ label: "Text", type: "textarea" })
	text: string;

	@IsString()
	@MinLength(2)
	@Input({
		label: "Language",
		type: "hidden",
	})
	language: string;
}

export class LocalizationAllFormDTO {
	@Input({ type: "hidden" })
	language: string;

	@Input({ label: "Inputs", type: "nested", nestedFields: getInputFields(SimpleLocalizationFormDTO) })
	keys: SimpleLocalizationFormDTO[];
}
