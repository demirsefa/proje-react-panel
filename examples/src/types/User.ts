import { IsEmail, IsString, MinLength, IsBoolean, IsOptional } from "class-validator";
import { Cell, List, Input } from "proje-react-panel";

@List({
	api: "users",
})
export class UserListDTO {
	id: string;

	@Cell({ name: "username", title: "Username" })
	username: string;

	email: string;

	password: string;

	firstName: string;

	lastName: string;

	isActive: boolean;

	createdAt: Date;

	updatedAt: Date;
}

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
