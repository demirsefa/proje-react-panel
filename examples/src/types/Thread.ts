import { IsString, MinLength, IsBoolean, ValidateNested } from "class-validator";
import { Message } from "./Message";
import { Cell, List, Input } from "proje-react-panel";

@List({
	api: "threads",
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

	messages: Message[];

	@IsBoolean()
	isActive: boolean;

	createdAt: Date;

	updatedAt: Date;
}
class ThreadList {
	id: string;

	@IsString()
	@MinLength(3)
	@Cell({ name: "title", title: "Title" })
	title: string;

	@IsString()
	@MinLength(10)
	@Cell({ name: "content", title: "Content" })
	content: string;

	@Cell({ name: "isApprovedByAdmin", title: "isApprovedByAdmin" })
	isApprovedByAdmin: boolean;

	@ValidateNested()
	approvedBy: object;

	@ValidateNested({ each: true })
	messages: Message[];

	@IsBoolean()
	isActive: boolean;

	createdAt: Date;

	updatedAt: Date;
}
