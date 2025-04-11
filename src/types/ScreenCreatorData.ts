import { CellOptions } from "../decorators/list/Cell";
import { CrudOptions } from "../decorators/Crud";
import { InputOptions } from "../decorators/form/Input";
import { ListOptions } from "../decorators/list/List";

export interface ScreenCreatorData {
	resolver: any;
	fields: string[];
	inputs: InputOptions[];
	crud?: CrudOptions;
	path: string;
	list?: ListOptions;
	cells: CellOptions[];
}
