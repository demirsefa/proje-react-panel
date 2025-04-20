import { IsString, MinLength, IsBoolean, ValidateNested } from "class-validator";
import { Cell, List, Input } from "proje-react-panel";

@List({
	headers: {
		create: { path: "create", label: "Create" },
	},
	cells: (item: ThreadListDTO) => ({
		details: { path: "details/" + item.id, label: "Details" },
		edit: { path: "edit/" + item.id, label: "Edit" },
		delete: { label: "Delete" },
	}),
})
export class ThreadListDTO {
	id: string;

	@Cell({ name: "title", title: "Title" })
	title: string;

	@Cell({ name: "content", title: "Content" })
	content: string;

	@Cell({ name: "isApprovedByAdmin", title: "isApprovedByAdmin" })
	isApprovedByAdmin: boolean;

	approvedBy: object;

	messages: any[];

	@IsBoolean()
	isActive: boolean;

	createdAt: Date;

	updatedAt: Date;
}

export class ThreadFormDTO {
	@Input({
		label: "ID",
	})
	id: string;
	@IsString()
	@MinLength(3)
	@Input({ label: "Title" })
	title: string;

	@IsString()
	@MinLength(10)
	@Input({ label: "Content", type: "textarea" })
	content: string;

	@IsBoolean()
	@Input({ label: "Is Active", type: "checkbox" })
	isActive: boolean;
}
