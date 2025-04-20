import { ListOptions } from './List';
import { CellOptions } from './Cell';

export interface ListData<T> {
  list?: ListOptions<T>;
  cells: CellOptions[];
}
