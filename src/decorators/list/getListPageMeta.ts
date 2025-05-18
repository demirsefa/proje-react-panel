import { AnyClass, AnyClassConstructor } from '../../types/AnyClass';
import { CellConfiguration, getCellFields } from './Cell';
import { getListConfiguration, ListConfiguration } from './List';

export interface ListPageMeta<T extends AnyClass> {
  class: ListConfiguration<T>;
  cells: CellConfiguration[];
}

export function getListPageMeta<T extends AnyClass>(
  entityClass: AnyClassConstructor<T>
): ListPageMeta<T> {
  return {
    class: getListConfiguration(entityClass),
    cells: getCellFields<T>(entityClass),
  };
}
