import { IsString, MinLength, IsBoolean, ValidateNested } from "class-validator";
import { Cell, List, Input } from "proje-react-panel";

@List({
	headers: {
		create: { path: "create", label: "Create" },
	},
	cells: (item: MessageListDTO) => ({
		details: { path: "details/" + item.id, label: "Details" },
		edit: { path: "edit/" + item.id, label: "Edit" },
		delete: { label: "Delete" },
	}),
})
export class MessageListDTO {
	id: string;

	@Cell({ name: "content", title: "content" })
	content: string;

	@Cell({ name: "isActive", title: "isActive" })
	isActive: boolean;

	createdAt: Date;

	updatedAt: Date;
}

export class MessageFormDTO {
	id: string;
	@IsString()
	@MinLength(1)
	@Input({ label: "Content", type: "textarea" })
	content: string;

	@IsBoolean()
	@Input({ label: "Is Active", type: "checkbox" })
	isActive: boolean;
}
