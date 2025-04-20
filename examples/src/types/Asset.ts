import { Cell, List, Input, ImageCell } from "proje-react-panel";

@List({
	headers: {
		create: { path: "create", label: "Create" },
	},
	cells: (item: AssetListDTO) => ({
		details: { path: "details/" + item.id, label: "Details" },
		edit: { path: "edit/" + item.id, label: "Edit" },
		delete: { label: "Delete" },
	}),
})
export class AssetListDTO {
	@Cell({
		title: "ID",
	})
	id: number;

	@Cell({
		title: "File",
	})
	filename: string;

	@ImageCell({
		title: "URL",
		baseUrl: "http://localhost:8080",
	})
	url: string;
}

export class AssetFormDTO {
	@Input({
		label: "ID",
	})
	id: string;
	@Input({
		label: "File",
		type: "file-upload",
	})
	filename: string;
}
