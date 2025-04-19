import { IsString, MinLength, IsBoolean, ValidateNested } from "class-validator";
import { Cell, List, Input } from "proje-react-panel";

@List({
	api: "messages",
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
