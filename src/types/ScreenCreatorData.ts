import { CellOptions } from "../decorators/Cell";
import { CrudOptions } from "../decorators/Crud";

export interface ScreenCreatorData<T> {
	resolver: any;
	fields: string[];
	cells: CellOptions<T>[];
	crud: CrudOptions;
}
