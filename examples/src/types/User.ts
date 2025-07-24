import { IsEmail, IsString, MinLength, IsBoolean, IsOptional } from "class-validator";
import { Cell, List, Input, Form, Details, DetailsItem } from "proje-react-panel";
import { dataFetchers } from "../api/dataFetchers";

@List({
	headers: {
		create: { path: "create", label: "Create" },
	},
	cells: (item: UserList) => ({
		details: { path: "" + item.id, label: "Details" },
		edit: { path: "edit/" + item.id, label: "Edit" },
		delete: { label: "Delete", onRemoveItem: dataFetchers.users.remove },
	}),
	getData: dataFetchers.users.getAll,
})
export class UserList {
	@Cell({ name: "id", title: "id", type: "uuid" })
	id: string;

	@Cell({ name: "username", title: "Username" })
	username: string;

	@Cell({ name: "email", title: "Email" })
	email: string;

	@Cell({ name: "firstName", title: "First Name" })
	firstName: string;

	@Cell({ name: "lastName", title: "Last Name" })
	lastName: string;

	@Cell({ name: "isActive", title: "Is Active", type: "boolean" })
	isActive: boolean;

	@Cell({ name: "createdAt", title: "Created At", type: "date" })
	createdAt: Date;

	@Cell({ name: "updatedAt", title: "Updated At", type: "date" })
	updatedAt: Date;
}

class UserForm {
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

@Form({
	onSubmit: dataFetchers.users.create,
	redirectSuccessUrl: "/users",
})
export class CreateUserForm extends UserForm {}

@Form({
	onSubmit: dataFetchers.users.update,
	getDetailsData: dataFetchers.users.updateDetails,
	redirectSuccessUrl: "/users",
})
export class EditUserForm extends UserForm {
	@Input({
		label: "ID",
		type: "hidden",
	})
	id: string;
}

@Details({
	getDetailsData: dataFetchers.users.details,
})
export class DetailsUserForm {
	@DetailsItem()
	id: string;

	@DetailsItem()
	username: string;

	@DetailsItem()
	email: string;

	@DetailsItem()
	firstName: string;

	@DetailsItem()
	lastName: string;

	@DetailsItem()
	isActive: boolean;

	@DetailsItem()
	createdAt: Date;

	@DetailsItem()
	updatedAt: Date;
}
