import 'reflect-metadata';

const LIST_KEY = 'List';

export interface ListHeaderOptions {
  title?: string;
  create?: { path: string; label: string };
}

export interface ListUtilCellOptions {
  details?: { path: string; label: string };
  edit?: { path: string; label: string };
  delete?: { path: string; label: string };
}

export interface ListOptions {
  headers?: ListHeaderOptions;
  utilCells?: ListUtilCellOptions;
}

export function List(options?: ListOptions): ClassDecorator {
  return (target: Function) => {
    if (options) {
      Reflect.defineMetadata(LIST_KEY, options, target);
    }
  };
}

export function getClassListData(entityClass: any): ListOptions | undefined {
  return Reflect.getMetadata(LIST_KEY, entityClass);
}
