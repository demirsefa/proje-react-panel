import 'reflect-metadata';

const LIST_KEY = 'List';

export interface ListHeaderOptions {
  title?: string;
  create?: { path: string; label: string };
}

export interface ListCellOptions<T> {
  details?: { path: string; label: string };
  edit?: { path: string; label: string };
  delete?: { label: string };
}

export interface ListOptions<T> {
  headers?: ListHeaderOptions;
  cells?: ((item: T) => ListCellOptions<T>) | ListCellOptions<T>;
}

export function List<T>(options?: ListOptions<T> | ((item: T) => ListOptions<T>)): ClassDecorator {
  return (target: Function) => {
    if (options) {
      Reflect.defineMetadata(LIST_KEY, options, target);
    }
  };
}

export function getClassListData<T>(entityClass: T): ListOptions<T> | undefined {
  //TODO: try to remove any
  return Reflect.getMetadata(LIST_KEY, entityClass as any);
}
