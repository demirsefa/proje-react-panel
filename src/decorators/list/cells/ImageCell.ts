import 'reflect-metadata';
import { Cell, CellConfiguration, CellOptions, ExtendedCell } from '../Cell';

export interface ImageCellOptions extends CellOptions {
  baseUrl: string;
}

export interface ImageCellConfiguration extends CellConfiguration {
  type: 'image';
}

export function ImageCell(options?: ImageCellOptions): PropertyDecorator {
  return ExtendedCell({
    ...options,
    type: 'image',
  });
}
