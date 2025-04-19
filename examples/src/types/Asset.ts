import { Cell, List, Input, ImageCell } from "proje-react-panel";

@List({
	api: "assets",
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
