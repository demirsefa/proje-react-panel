import { IsEmail, IsString, MinLength, IsBoolean, IsOptional } from "class-validator";
import { Cell } from "proje-react-panel";
export class User {
	id: string;

	@IsString()
	@MinLength(3)
	@Cell({ name: "username", title: "Username" })
	username: string;

	@IsEmail()
	email: string;

	@IsString()
	@MinLength(6)
	password: string;

	@IsString()
	@IsOptional()
	firstName: string;

	@IsString()
	@IsOptional()
	lastName: string;

	@IsBoolean()
	isActive: boolean;

	createdAt: Date;

	updatedAt: Date;
}
