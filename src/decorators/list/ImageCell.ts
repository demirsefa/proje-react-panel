import "reflect-metadata";
import { Cell, CellOptions } from "./Cell";

export interface ImageCellOptions extends CellOptions {
	baseUrl: string;
}

export function ImageCell(options?: ImageCellOptions): PropertyDecorator {
	return Cell({
		...options,
		type: "image",
	});
}
