import { AnyClass } from '../../types/AnyClass';
import { getDetailsItemFields } from '../details/DetailsItem';
import { CellConfiguration, getCellFields } from './Cell';
import { getListConfiguration, ListConfiguration } from './List';

export interface ListPageMeta<T extends AnyClass> {
  class: ListConfiguration<T>;
  cells: CellConfiguration[];
}

export function getListPageMeta<T extends AnyClass>(entityClass: T): ListPageMeta<T> {
  return {
    class: getListConfiguration(entityClass),
    cells: getCellFields<T>(entityClass),
  };
}
