import 'reflect-metadata';
import { AnyClass, AnyClassConstructor } from '../../types/AnyClass';
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
export type ExtendedCellTypes = CellTypes | 'image' | 'download' | 'link';

export interface CellOptions {
  name?: string;
  title?: string;
  type?: CellTypes;
  placeHolder?: string;
  filter?: Filter | StaticSelectFilter;
  style?: {
    /**
     * @deprecated Tablo `table-layout: fixed` kullaniyor; sabit duzende hucre
     * `min-width`'i kolon genisligini etkilemiyor (CSS 2.1 17.5.2.1). Bunun
     * yerine `width` verin.
     */
    minWidth?: string;
    /**
     * Kolon genisligi. Sabit duzende birebir uygulanir; yuzde vermek tabloyu
     * konteynere sigdirir, px vermek toplam konteyneri asarsa yatay scroll acar.
     */
    width?: string;
  };
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

export function getCellFields<T extends AnyClass>(
  entityClass: AnyClassConstructor<T>
): CellConfiguration[] {
  const prototype = entityClass.prototype;
  const inputFields: string[] = Reflect.getMetadata(CELL_KEY, prototype) || [];

  return inputFields.map(field => {
    const fields: CellConfiguration =
      Reflect.getMetadata(`${CELL_KEY.toString()}:${field}:options`, prototype) || {};
    return fields;
  });
}
