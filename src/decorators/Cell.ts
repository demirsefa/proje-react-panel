import 'reflect-metadata';

const CELL_KEY = Symbol('cell');

export interface CellOptions<T> {
  name?: string;
  title?: string;
  type?: 'string' | 'number' | 'date';
  placeHolder?: string;
  linkTo?: (item: T) => string;
}

export function Cell<T>(options?: CellOptions<T>): PropertyDecorator {
  return (target, propertyKey) => {
    const existingCells: string[] = Reflect.getMetadata(CELL_KEY, target) || [];
    Reflect.defineMetadata(CELL_KEY, [...existingCells, propertyKey.toString()], target);

    if (options) {
      const keyString = `${CELL_KEY.toString()}:${propertyKey.toString()}:options`;
      Reflect.defineMetadata(keyString, options, target);
    }
  };
}


export function getCellFields<T>(entityClass: any): CellOptions<T> [] {
  const prototype = entityClass.prototype;
  const cellFields: string[] = Reflect.getMetadata(CELL_KEY, prototype) || [];
  return cellFields.map((field) => {
    const fields = (Reflect.getMetadata(`${CELL_KEY.toString()}:${field}:options`, prototype) || {});
    return {
      ...fields,
      name: fields?.name ?? field,
    };

  });
}
