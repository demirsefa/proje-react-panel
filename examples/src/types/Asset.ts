import { Cell, List, Input, ImageCell, Form, Details, DetailsItem, DownloadCell } from "proje-react-panel";
import { dataFetchers } from "../api/dataFetchers";
import { getInputFields } from "proje-react-panel";
import { SimpleLocalizationForm } from "./Localization";

@List({
	headers: {
		create: { path: "create", label: "Create" },
	},
	cells: (item: AssetList) => ({
		details: { path: "" + item.id, label: "Details" },
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
		title: "Title",
	})
	title: string;

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
		label: "Title",
		type: "nested",
		nestedFields: getInputFields(SimpleLocalizationForm),
	})
	title: SimpleLocalizationForm;

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
