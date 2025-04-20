import { IsString, MinLength, IsBoolean } from "class-validator";
import { Cell, List, Input } from "proje-react-panel";

@List({
	headers: {
		create: { path: "create", label: "Create" },
	},
	cells: (item: LanguageList) => ({
		edit: { path: "edit/" + item.id, label: "Edit" },
		delete: { label: "Delete" },
	}),
})
export class LanguageList {
	id: string;

	@Cell({ name: "code", title: "Code" })
	code: string;

	@Cell({ name: "name", title: "Name" })
	name: string;

	@Cell({ name: "isDefault", title: "Default Language" })
	isDefault: boolean;

	createdAt: Date;

	updatedAt: Date;
}

export class LanguageForm {
	id: string;

	@IsString()
	@MinLength(2)
	@Input({ label: "Language Code", type: "input" })
	code: string;

	@IsString()
	@MinLength(2)
	@Input({ label: "Language Name", type: "input" })
	name: string;

	@IsBoolean()
	@Input({ label: "Default Language", type: "checkbox" })
	isDefault: boolean;
}
