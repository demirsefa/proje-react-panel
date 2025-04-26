import { CellConfiguration, CellOptions } from '../Cell';
import { ExtendedCell } from '../ExtendedCell';

export interface DownloadCellOptions extends Omit<CellOptions, 'type'> {
  baseUrl: string;
}

export interface DownloadCellConfiguration extends CellConfiguration {
  type: 'download';
  baseUrl: string;
}

export function DownloadCell(options?: DownloadCellOptions): PropertyDecorator {
  return ExtendedCell(options, (_, options) => ({
    ...options,
    type: 'download',
  }));
}
