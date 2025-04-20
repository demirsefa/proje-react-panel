import { IsEmail, IsEnum, IsString, MinLength, IsBoolean, ValidateIf } from "class-validator";
import { Cell, List, Input } from "proje-react-panel";
import { DataType } from "./data";
@List({
	headers: {
		create: { path: "create", label: "Create" },
	},
	cells: (item: AdminListDTO) => ({
		details: { path: "details/" + item.id, label: "Details" },
		edit: { path: "edit/" + item.id, label: "Edit" },
		delete: { label: "Delete" },
	}),
})
export class AdminListDTO {
	@Cell({
		title: "ID",
	})
	id: string;
	@Cell({
		title: "Username",
	})
	username: string;

	@Cell({
		title: "email",
	})
	email: string;

	password: string;
	@Input({
		label: "Role",
		type: "select",
		options: [
			{ value: "super-admin", label: "Super Admin" },
			{ value: "admin", label: "Admin" },
		],
	})
	role: string;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export class AdminFormDTO {
	@MinLength(3)
	@Input({
		label: "Username",
	})
	username: string;

	@IsEmail()
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
		options: [
			{ value: "super-admin", label: "Super Admin" },
			{ value: "admin", label: "Admin" },
		],
	})
	role: string;

	createdAt: Date;

	updatedAt: Date;
}

export class AdminDetailsFormDTO extends AdminFormDTO implements DataType {
	@Input({
		label: "ID",
	})
	id: string;
}
