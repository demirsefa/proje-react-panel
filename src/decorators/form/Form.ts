import 'reflect-metadata';
import { AnyClass, AnyClassConstructor } from '../../types/AnyClass';
import { GetDetailsDataFN } from '../details/Details';
import { InputConfiguration } from './Input';

const DETAILS_METADATA_KEY = 'DetailsMetaData';
export type OnSubmitFN<T> = (data: T | FormData) => Promise<T | FormData>;

interface FormOptions<T extends AnyClass> {
  onSubmit: OnSubmitFN<T>;
  getDetailsData?: GetDetailsDataFN<T>;
  redirectBackOnSuccess?: boolean;
  type?: 'json' | 'formData';
}

export interface FormConfiguration<T extends AnyClass> extends FormOptions<T> {
  redirectBackOnSuccess: boolean;
  type: 'json' | 'formData';
}

export function Form<T extends AnyClass>(options?: FormOptions<T>): ClassDecorator {
  return (target: Function) => {
    if (options) {
      Reflect.defineMetadata(DETAILS_METADATA_KEY, options, target);
    }
  };
}

export function getFormConfiguration<T extends AnyClass, K extends AnyClassConstructor<T>>(
  entityClass: K
): FormConfiguration<T> {
  const formConfiguration = Reflect.getMetadata(DETAILS_METADATA_KEY, entityClass as Object);
  if (!formConfiguration) {
    throw new Error('Form decerator should be used on class');
  }
  return {
    ...formConfiguration,
    type: formConfiguration.type ?? 'json',
  };
}
