import 'reflect-metadata';
import { AnyClass } from '../../types/AnyClass';

const DETAILS_ITEM_KEY = Symbol('detailsItem');

interface DetailsItemOptions {
  //NOTE: all optional to support autoFields merging
  name?: string;
}
export interface DetailsItemConfiguration extends DetailsItemOptions {
  name: string;
}

export function DetailsItem(options?: DetailsItemOptions): PropertyDecorator {
  return (target, propertyKey) => {
    const existingInputs: string[] = Reflect.getMetadata(DETAILS_ITEM_KEY, target) || [];
    Reflect.defineMetadata(DETAILS_ITEM_KEY, [...existingInputs, propertyKey.toString()], target);

    if (options) {
      const keyString = `${DETAILS_ITEM_KEY.toString()}:${propertyKey.toString()}:options`;
      Reflect.defineMetadata(keyString, options, target);
    }
  };
}

export function getDetailsItemFields<T extends AnyClass>(
  entityClass: T
): DetailsItemConfiguration[] {
  const prototype = (entityClass as any).prototype;
  const inputFields: string[] = Reflect.getMetadata(DETAILS_ITEM_KEY, prototype) || [];

  return inputFields.map(field => {
    const fields: DetailsItemOptions =
      Reflect.getMetadata(`${DETAILS_ITEM_KEY.toString()}:${field}:options`, prototype) || {};
    return {
      ...fields,
      name: fields.name || field,
    };
  });
}
