import { IsString, MinLength, IsBoolean } from "class-validator";
import { Cell, List, Input } from "proje-react-panel";
import { HardCodedLanguageOptions } from "./HardCodedLanguageOptions";

@List({
	headers: {
		create: { path: "create", label: "Create" },
	},
	cells: (item: LanguageList) => ({
		edit: { path: "edit/" + item.code, label: "Edit" },
		delete: { label: "Delete" },
	}),
})
export class LanguageList {
	@Cell({ name: "code", title: "Code" })
	code: string;

	@Cell({ name: "isDefault", title: "Default Language" })
	isDefault: boolean;

	createdAt: Date;

	updatedAt: Date;
}

export class LanguageForm {
	id: string;

	@IsString()
	@MinLength(2)
	@Input({ label: "Language Code", type: "select", options: HardCodedLanguageOptions })
	code: string;

	@IsBoolean()
	@Input({ label: "Default Language", type: "checkbox" })
	isDefault: boolean;
}
