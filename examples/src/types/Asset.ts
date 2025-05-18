import { Cell, List, Input, ImageCell, Form, Details, DetailsItem, DownloadCell } from "proje-react-panel";
import { dataFetchers } from "../api/dataFetchers";

@List({
	headers: {
		create: { path: "create", label: "Create" },
	},
	cells: (item: AssetList) => ({
		details: { path: "" + item.id, label: "Details" },
		edit: { path: "edit/" + item.id, label: "Edit" },
		delete: { label: "Delete", onRemoveItem: dataFetchers.assets.remove },
	}),
	getData: dataFetchers.assets.getAll,
})
export class AssetList {
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
		name: "url",
	})
	urlForImage: string;

	@DownloadCell({
		title: "URL",
		baseUrl: "http://localhost:8080",
		name: "url",
	})
	urlForDownload: string;
}

class AssetForm {
	@Input({
		label: "File",
		type: "file-upload",
	})
	file: unknown;

	@Input({
		type: "hidden",
	})
	clientVersion: number;
}

@Form({
	onSubmit: dataFetchers.assets.create,
	type: "formData",
	redirectSuccessUrl: "/assets",
})
export class CreateAssetForm extends AssetForm {}

@Details({
	getDetailsData: dataFetchers.assets.details,
})
export class DetailsAssetForm {
	@DetailsItem()
	url: string;
}
