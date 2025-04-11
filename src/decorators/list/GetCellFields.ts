import { CELL_KEY, CellOptions } from "./Cell";

export function getCellFields(entityClass: any): CellOptions[] {
	const prototype = entityClass.prototype;
	const cellFields: string[] = Reflect.getMetadata(CELL_KEY, prototype) || [];
	return cellFields.map((field) => {
		const fields = Reflect.getMetadata(`${CELL_KEY.toString()}:${field}:options`, prototype) || {};
		return {
			...fields,
			name: fields?.name ?? field,
		};
	});
}
