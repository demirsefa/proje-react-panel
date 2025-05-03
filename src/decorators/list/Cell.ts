import 'reflect-metadata';
import { AnyClass } from '../../types/AnyClass';
import { createDecorator, DecoratorMap } from '../../utils/decerators';

export const CELL_KEY = Symbol('cell');

interface Filter {
  type: 'string' | 'number' | 'date' | 'static-select';
}

export interface StaticSelectFilter extends Filter {
  type: 'static-select';
  options: { value: string; label: string }[];
}

export type CellTypes = 'string' | 'date' | 'number' | 'boolean' | 'uuid';
export type ExtendedCellTypes = CellTypes | 'image' | 'download';

export interface CellOptions {
  name?: string;
  title?: string;
  type?: CellTypes;
  placeHolder?: string;
  filter?: Filter | StaticSelectFilter;
}

export interface CellConfiguration extends Omit<CellOptions, 'type'> {
  name: string;
  type: ExtendedCellTypes;
}

export const cellMap: DecoratorMap<CellOptions, CellConfiguration> = (
  { propertyKey },
  options
) => ({
  ...options,
  name: options.name || propertyKey.toString(),
  type: options.type || 'string',
});

export function Cell(options?: CellOptions): PropertyDecorator {
  return createDecorator(CELL_KEY, options, cellMap);
}

export function getCellFields<T extends AnyClass>(entityClass: T): CellConfiguration[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prototype = (entityClass as any).prototype;
  const inputFields: string[] = Reflect.getMetadata(CELL_KEY, prototype) || [];

  return inputFields.map(field => {
    const fields: CellConfiguration =
      Reflect.getMetadata(`${CELL_KEY.toString()}:${field}:options`, prototype) || {};
    return fields;
  });
}
