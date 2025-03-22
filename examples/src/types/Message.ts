import { IsString, MinLength, IsBoolean, ValidateNested } from "class-validator";
import { Thread } from "./Thread";
import { Cell } from "proje-react-panel";

export class Message {
	id: string;

	@IsString()
	@MinLength(1)
	@Cell({ name: "content", title: "content" })
	content: string;

	@IsBoolean()
	@Cell({ name: "isActive", title: "isActive" })
	isActive: boolean;

	createdAt: Date;

	updatedAt: Date;
}
