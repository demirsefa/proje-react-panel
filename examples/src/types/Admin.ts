import { IsEmail, IsEnum, IsString, MinLength, IsBoolean, ValidateIf } from "class-validator";
import { Cell, List, Input, DetailsItem, Details, Form } from "proje-react-panel";
import { dataFetchers } from "../api/dataFetchers";
@List({
	headers: {
		create: { path: "create", label: "Create" },
	},
	cells: (item: AdminList) => ({
		details: { path: "" + item.id, label: "Details" },
		edit: { path: "edit/" + item.id, label: "Edit" },
		delete: { label: "Delete", onRemoveItem: dataFetchers.admins.remove },
	}),
	getData: dataFetchers.admins.getAll,
})
export class AdminList {
	@Cell({
		title: "ID",
		type: "uuid",
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
}

class AdminForm {
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
}

@Form({
	onSubmit: dataFetchers.admins.create,
})
export class CreateAdminForm extends AdminForm {}

@Form({
	onSubmit: dataFetchers.admins.update,
	getDetailsData: dataFetchers.admins.details,
})
export class EditAdminForm extends AdminForm {}

@Details({
	getDetailsData: dataFetchers.admins.details,
})
export class AdminDetails {
	@DetailsItem()
	username: string;

	@DetailsItem()
	email: string;

	@DetailsItem()
	password: string;

	@DetailsItem()
	role: string;
}
