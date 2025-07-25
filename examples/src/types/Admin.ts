import { IsEmail, IsEnum, IsString, MinLength, ValidateIf } from "class-validator";
import { Cell, List, Input, DetailsItem, Details, Form, SelectInput } from "proje-react-panel";
import { dataFetchers } from "../api/dataFetchers";

function getAssetOptions() {
	return dataFetchers.assets.getAll({}).then((res) => {
		return res.data.map((asset) => {
			return { value: asset.id, label: asset.filename };
		});
	});
}
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
	primaryId: "id",
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

	@Cell({
		title: "Created At",
		type: "date",
	})
	createdAt: string;

	@Cell({
		title: "Updated At",
		type: "date",
	})
	updatedAt: string;
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
	@SelectInput({
		label: "Role",
		defaultOptions: [
			{ value: "super-admin", label: "Super Admin" },
			{ value: "admin", label: "Admin" },
		],
	})
	role: string;

	@SelectInput({
		label: "Asset",
		defaultOptions: [],
		onSelectPreloader: getAssetOptions,
	})
	assetId: number;
}

@Form({
	onSubmit: dataFetchers.admins.create,
	type: "formData",
	redirectSuccessUrl: "/admins",
})
export class CreateAdminForm extends AdminForm {}

@Form({
	onSubmit: dataFetchers.admins.update,
	getDetailsData: dataFetchers.admins.updateDetails,
	redirectSuccessUrl: "/admins",
})
export class EditAdminForm extends AdminForm {}

@Details({
	getDetailsData: dataFetchers.admins.details,
	primaryId: "username",
})
export class AdminDetails {
	@DetailsItem()
	id: string;

	@DetailsItem()
	username: string;

	@DetailsItem()
	email: string;

	@DetailsItem()
	password: string;

	@DetailsItem()
	role: string;

	@DetailsItem()
	createdAt: string;

	@DetailsItem()
	updatedAt: string;
}
