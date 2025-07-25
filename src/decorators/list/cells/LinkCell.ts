import { CellConfiguration, CellOptions } from '../Cell';
import { ExtendedCell } from '../ExtendedCell';

export interface LinkCellOptions<T> extends Omit<CellOptions, 'type'> {
  url?: string;
  path?: string;
  onClick?: (data: T) => void;
}

export interface LinkCellConfiguration<T> extends CellConfiguration {
  type: 'link';
  url?: string;
  path?: string;
  onClick?: (data: T) => void;
}

export function LinkCell<T>(options?: LinkCellOptions<T>): PropertyDecorator {
  return ExtendedCell(options, (_, options) => ({
    ...options,
    type: 'link',
  }));
}
