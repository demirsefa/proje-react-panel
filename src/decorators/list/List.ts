import 'reflect-metadata';
import { AnyClass } from '../../types/AnyClass';

const LIST_METADATA_KEY = 'ListMetaData';

export interface GetDataParams {
  page?: number;
  limit?: number;
  filters?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export type GetDataForList<T> = (params: GetDataParams) => Promise<PaginatedResponse<T>>;

export interface ListHeaderOptions {
  title?: string;
  create?: { path: string; label: string };
}

export interface ListCellOptions<T> {
  details?: { path: string; label: string };
  edit?: { path: string; label: string };
  delete?: { label: string; onRemoveItem?: (item: T) => Promise<void> };
}

export interface ListOptions<T> {
  getData: GetDataForList<T>;
  headers?: ListHeaderOptions;
  cells?: ((item: T) => ListCellOptions<T>) | ListCellOptions<T>;
}

export interface ListConfiguration<T> extends ListOptions<T> {}

export function List<T>(options?: ListOptions<T> | ((item: T) => ListOptions<T>)): ClassDecorator {
  return (target: Function) => {
    if (options) {
      Reflect.defineMetadata(LIST_METADATA_KEY, options, target);
    }
  };
}

export function getListConfiguration<T extends AnyClass>(entityClass: T): ListConfiguration<T> {
  const listConfiguration = Reflect.getMetadata(LIST_METADATA_KEY, entityClass);
  if (!listConfiguration) {
    throw new Error('List decerator should be used on class');
  }
  return {
    ...listConfiguration,
  };
}
