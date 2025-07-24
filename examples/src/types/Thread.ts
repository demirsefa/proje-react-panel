import { IsString, MinLength, IsBoolean } from "class-validator";
import { Cell, List, Input, Form, Details, DetailsItem } from "proje-react-panel";
import { dataFetchers } from "../api/dataFetchers";

@List({
	headers: {
		create: { path: "create", label: "Create" },
	},
	cells: (item: ThreadList) => ({
		details: { path: "" + item.id, label: "Details" },
		edit: { path: "edit/" + item.id, label: "Edit" },
		delete: { label: "Delete", onRemoveItem: dataFetchers.threads.remove },
	}),
	getData: dataFetchers.threads.getAll,
})
export class ThreadList {
	id: string;

	@Cell({ name: "title", title: "Title" })
	title: string;

	@Cell({ name: "content", title: "Content" })
	content: string;

	@Cell({ name: "isApprovedByAdmin", title: "Admin", type: "boolean" })
	isApprovedByAdmin: boolean;

	@IsBoolean()
	isActive: boolean;

	@Cell({ name: "createdAt", title: "Created At", type: "date" })
	createdAt: Date;

	@Cell({ name: "updatedAt", title: "Updated At", type: "date" })
	updatedAt: Date;
}

class ThreadForm {
	@Input({
		type: "hidden",
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

@Form({
	onSubmit: dataFetchers.threads.create,
	redirectSuccessUrl: "/threads",
})
export class CreateThreadForm extends ThreadForm {}

@Form({
	onSubmit: dataFetchers.threads.update,
	getDetailsData: dataFetchers.threads.updateDetails,
	redirectSuccessUrl: "/threads",
})
export class EditThreadForm extends ThreadForm {}

@Details({
	getDetailsData: dataFetchers.threads.details,
})
export class DetailsThreadForm {
	@DetailsItem()
	id: string;

	@DetailsItem()
	title: string;

	@DetailsItem()
	content: string;

	@DetailsItem()
	isActive: boolean;

	@DetailsItem()
	createdAt: Date;

	@DetailsItem()
	updatedAt: Date;
}
