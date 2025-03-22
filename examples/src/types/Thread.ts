import { IsString, MinLength, IsBoolean, ValidateNested } from "class-validator";
import { Message } from "./Message";
import { Cell } from "proje-react-panel";

export class Thread {
	id: string;

	@IsString()
	@MinLength(3)
	@Cell({ name: "title", title: "Title" })
	title: string;

	@IsString()
	@MinLength(10)
	@Cell({ name: "content", title: "Content" })
	content: string;

	@IsBoolean()
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
