import { IsString, MinLength, IsBoolean } from "class-validator";
import { Cell, List, Input, Form, Details, SelectInput } from "proje-react-panel";
import { HardCodedLanguageOptions } from "../constants/HardCodedLanguageOptions";
import { dataFetchers } from "../api/dataFetchers";

@List({
	headers: {
		create: { path: "create", label: "Create" },
	},
	cells: (item: LanguageList) => ({
		details: { path: `${item.code}`, label: "Details" },
		edit: { path: "edit/" + item.code, label: "Edit" },
		delete: { label: "Delete", onRemoveItem: dataFetchers.languages.remove },
	}),
	getData: dataFetchers.languages.getAll,
})
export class LanguageList {
	@Cell({ name: "code", title: "Code" })
	code: string;

	@Cell({ name: "isDefault", title: "Default Language", type: "boolean" })
	isDefault: boolean;
}

class LanguageForm {
	id: string;

	@IsString()
	@MinLength(2)
	@SelectInput({ label: "Language Code", defaultOptions: HardCodedLanguageOptions })
	code: string;

	@IsBoolean()
	@Input({ label: "Default Language", type: "checkbox" })
	isDefault: boolean;

	@Input({
		type: "hidden",
	})
	clientVersion: number;
}

@Form({
	onSubmit: dataFetchers.languages.create,
	redirectSuccessUrl: "/languages",
})
export class CreateLanguageForm extends LanguageForm {}

@Form({
	onSubmit: dataFetchers.languages.update,
	getDetailsData: dataFetchers.languages.details,
	redirectSuccessUrl: "/languages",
})
export class EditLanguageForm extends LanguageForm {}

@Details({
	getDetailsData: dataFetchers.languages.details,
})
export class DetailsLanguageForm extends LanguageForm {}
