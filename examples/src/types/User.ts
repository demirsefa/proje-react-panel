import { IsEmail, IsString, MinLength, IsBoolean, IsOptional } from "class-validator";
import { Cell, List, Input } from "proje-react-panel";
import { DataType } from "./data";

@List({
	headers: {
		create: { path: "create", label: "Create" },
	},
	cells: (item: UserListDTO) => ({
		details: { path: "details/" + item.id, label: "Details" },
		edit: { path: "edit/" + item.id, label: "Edit" },
		delete: { label: "Delete" },
	}),
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

export class UserFormDTO implements DataType {
	@Input({
		label: "ID",
	})
	id: string;
	@IsString()
	@MinLength(3)
	@Input({ label: "Username" })
	username: string;

	@IsEmail()
	@Input({ label: "Email", inputType: "email" })
	email: string;

	@IsString()
	@MinLength(6)
	@Input({ label: "Password", inputType: "password" })
	password: string;

	@IsString()
	@IsOptional()
	@Input({ label: "First Name" })
	firstName: string;

	@IsString()
	@IsOptional()
	@Input({ label: "Last Name" })
	lastName: string;

	@IsBoolean()
	@Input({ label: "Is Active", type: "checkbox" })
	isActive: boolean;
}
