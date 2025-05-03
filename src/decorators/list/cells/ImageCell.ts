import { CellConfiguration, CellOptions } from '../Cell';
import { ExtendedCell } from '../ExtendedCell';

export interface ImageCellOptions extends Omit<CellOptions, 'type'> {
  baseUrl: string;
}

export interface ImageCellConfiguration extends CellConfiguration {
  type: 'image';
  baseUrl: string;
}

export function ImageCell(options?: ImageCellOptions): PropertyDecorator {
  return ExtendedCell(options, (_, options) => ({
    ...options,
    type: 'image',
  }));
}
