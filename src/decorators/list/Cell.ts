import 'reflect-metadata';

export const CELL_KEY = Symbol('cell');

interface Filter {
  type: 'string' | 'number' | 'date' | 'static-select';
}

export interface StaticSelectFilter extends Filter {
  type: 'static-select';
  options: { value: string; label: string }[];
}

export interface CellOptions {
  name?: string;
  title?: string;
  type?: 'string' | 'date' | 'image' | 'number';
  placeHolder?: string;
  filter?: Filter | StaticSelectFilter;
}

export function Cell(options?: CellOptions): PropertyDecorator {
  return (target, propertyKey) => {
    const existingCells: string[] = Reflect.getMetadata(CELL_KEY, target) || [];
    Reflect.defineMetadata(CELL_KEY, [...existingCells, propertyKey.toString()], target);

    if (options) {
      const keyString = `${CELL_KEY.toString()}:${propertyKey.toString()}:options`;
      Reflect.defineMetadata(keyString, options, target);
    }
  };
}
