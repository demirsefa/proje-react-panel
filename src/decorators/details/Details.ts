import 'reflect-metadata';
import { AnyClass } from '../../types/AnyClass';

const DETAILS_METADATA_KEY = 'DetailsMetaData';
export type GetDetailsDataFN<T> = (param: Record<string, string>) => Promise<T>;

interface DetailsOptions<T extends AnyClass> {
  getDetailsData: GetDetailsDataFN<T>;
  key?: string;
  primaryId?: keyof T;
}

export type DetailsConfiguration<T extends AnyClass> = DetailsOptions<T> & {
  key: string;
};

export function Details<T extends AnyClass>(options?: DetailsOptions<T>): ClassDecorator {
  return (target: object) => {
    if (options) {
      Reflect.defineMetadata(DETAILS_METADATA_KEY, options, target);
    }
  };
}

export function getDetailsConfiguration<T extends AnyClass>(
  entityClass: T
): DetailsConfiguration<T> {
  const detailsConfiguration = Reflect.getMetadata(DETAILS_METADATA_KEY, entityClass);
  if (!detailsConfiguration) {
    throw new Error('Details decerator should be used on class');
  }
  return {
    ...detailsConfiguration,
    key: detailsConfiguration.key || entityClass.name,
  };
}
