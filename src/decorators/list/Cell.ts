import 'reflect-metadata';
import { AnyClass } from '../../types/AnyClass';

export const CELL_KEY = Symbol('cell');

interface Filter {
  type: 'string' | 'number' | 'date' | 'static-select';
}

export interface StaticSelectFilter extends Filter {
  type: 'static-select';
  options: { value: string; label: string }[];
}

export type CellTypes = 'string' | 'date' | 'number' | 'boolean' | 'uuid';
export type ExtendedCellTypes = CellTypes | 'image';

export interface CellOptions {
  name?: string;
  title?: string;
  type?: CellTypes;
  placeHolder?: string;
  filter?: Filter | StaticSelectFilter;
}
export interface ExtendedCellOptions extends Omit<CellOptions, 'type'> {
  type?: ExtendedCellTypes;
}

export interface CellConfiguration extends Omit<CellOptions, 'type'> {
  name: string;
  type: ExtendedCellTypes;
}

export function Cell(options?: CellOptions): PropertyDecorator {
  //TODO: reduce all similar code
  return (target, propertyKey) => {
    const existingCells: string[] = Reflect.getMetadata(CELL_KEY, target) || [];
    Reflect.defineMetadata(CELL_KEY, [...existingCells, propertyKey.toString()], target);

    if (options) {
      const keyString = `${CELL_KEY.toString()}:${propertyKey.toString()}:options`;
      Reflect.defineMetadata(keyString, options, target);
    }
  };
}

export function ExtendedCell(options?: ExtendedCellOptions): PropertyDecorator {
  return (target, propertyKey) => {
    const existingCells: string[] = Reflect.getMetadata(CELL_KEY, target) || [];
    Reflect.defineMetadata(CELL_KEY, [...existingCells, propertyKey.toString()], target);

    if (options) {
      const keyString = `${CELL_KEY.toString()}:${propertyKey.toString()}:options`;
      Reflect.defineMetadata(keyString, options, target);
    }
  };
}

export function getCellFields<T extends AnyClass>(entityClass: T): CellConfiguration[] {
  const prototype = (entityClass as any).prototype;
  const inputFields: string[] = Reflect.getMetadata(CELL_KEY, prototype) || [];

  return inputFields.map(field => {
    const fields: CellOptions =
      Reflect.getMetadata(`${CELL_KEY.toString()}:${field}:options`, prototype) || {};
    return {
      ...fields,
      name: fields.name || field,
      type: fields.type as ExtendedCellTypes,
    };
  });
}
