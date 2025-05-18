import { IsString, MinLength, IsBoolean, ValidateNested } from "class-validator";
import { Cell, List, Input, Form, Details, DetailsItem } from "proje-react-panel";
import { dataFetchers } from "../api/dataFetchers";

@List({
	headers: {
		create: { path: "create", label: "Create" },
	},
	cells: (item: MessageList) => ({
		details: { path: "" + item.id, label: "Details" },
		edit: { path: "edit/" + item.id, label: "Edit" },
		delete: { label: "Delete", onRemoveItem: dataFetchers.messages.remove },
	}),
	getData: dataFetchers.messages.getAll,
})
export class MessageList {
	@Cell({ name: "id", title: "id" })
	id: string;

	@Cell({ name: "content", title: "content" })
	content: string;

	@Cell({ name: "isActive", title: "isActive" })
	isActive: boolean;
}

class MessageForm {
	@IsString()
	@MinLength(1)
	@Input({ label: "Content", type: "textarea" })
	content: string;

	@IsBoolean()
	@Input({ label: "Is Active", type: "checkbox" })
	isActive: boolean;

	@Input({
		type: "hidden",
	})
	clientVersion: number;
}

@Form({
	onSubmit: dataFetchers.messages.create,
	redirectSuccessUrl: "/messages",
})
export class CreateMessageForm extends MessageForm {}

@Form({
	onSubmit: dataFetchers.messages.update,
	getDetailsData: dataFetchers.messages.updateDetails,
	redirectSuccessUrl: "/messages",
})
export class EditMessageForm extends MessageForm {}

@Details({
	getDetailsData: dataFetchers.messages.details,
})
export class DetailsMessageForm {
	@DetailsItem()
	id: string;

	@DetailsItem()
	content: string;

	@DetailsItem()
	isActive: boolean;
}
