import { CellOptions } from "../decorators/Cell";
import { CrudOptions } from "../decorators/Crud";
import { InputOptions } from "../decorators/Input";

export interface ScreenCreatorData<T> {
	resolver: any;
	fields: string[];
	cells: CellOptions<T>[];
	inputs: InputOptions[];
	crud: CrudOptions;
}
