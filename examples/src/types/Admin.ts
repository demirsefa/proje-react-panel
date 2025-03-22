import { IsEmail, IsEnum, IsString, MinLength, IsBoolean, IsOptional, IsEmpty, ValidateIf } from "class-validator";
import { Cell, Crud, Input } from "proje-react-panel";

@Crud({
	controller: "admins",
})
export class Admin {
	@Cell({
		title: "ID",
	})
	@Input({
		label: "Id",
		editable: false,
	})
	id: string;
	@IsString()
	@MinLength(3)
	@Cell({
		title: "Username",
	})
	@Input({
		label: "Username",
	})
	username: string;

	@IsEmail()
	@Cell({
		title: "email",
	})
	@Input({
		label: "Email",
		inputType: "email",
	})
	email: string;

	@ValidateIf((o) => !o.__formEdit)
	@IsString()
	@MinLength(6)
	@Input({
		label: "Password",
		inputType: "password",
	})
	password: string;

	@IsEnum(["super-admin", "admin"])
	@Input({
		label: "Role",
		type: "select",
		selectOptions: ["super-admin", "admin"],
	})
	role: string;

	@IsBoolean()
	isActive: boolean;

	createdAt: Date;

	updatedAt: Date;
}
