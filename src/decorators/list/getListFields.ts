import { getClassListData } from './List';
import { getCellFields } from './GetCellFields';
import { ListData } from './ListData';

export function getListFields<T>(entityClass: T): ListData<T> {
  return {
    list: getClassListData(entityClass),
    cells: getCellFields(entityClass),
  };
}
