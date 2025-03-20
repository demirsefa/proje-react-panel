import 'reflect-metadata';

const CRUD_KEY = 'Crud'; // Changed from Symbol to string

export interface CrudOptions {
  controller: string;
}

export function Crud(options?: CrudOptions): ClassDecorator {
  return (target: Function) => {
    if (options) {
      Reflect.defineMetadata(CRUD_KEY, options, target);
    }
  };
}


export function getClassCrudData(entityClass: any): CrudOptions | undefined {
  return Reflect.getMetadata(CRUD_KEY, entityClass);
}
