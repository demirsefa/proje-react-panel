import { ListOptions } from "./List";
import { CellOptions } from "./Cell";

export interface ListData {
	list?: ListOptions;
	cells: CellOptions[];
}
