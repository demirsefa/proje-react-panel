import { CellOptions } from "../decorators/Cell";
import { CrudOptions } from "../decorators/Crud";
import { InputOptions } from "../decorators/Input";

export interface ScreenCreatorData {
	resolver: any;
	fields: string[];
	cells: CellOptions[];
	inputs: InputOptions[];
	crud?: CrudOptions;
	path: string;
}
