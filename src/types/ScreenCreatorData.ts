import { CellOptions } from "../declerations/Cell";
import { CrudOptions } from "../declerations/Crud";

export type ScreenCreatorData<T> = {
	resolver: any,
	fields: string[],
	cells: CellOptions<T>[],
	crud: CrudOptions
}
