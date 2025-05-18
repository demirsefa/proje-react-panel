import 'reflect-metadata';
import { AnyClass, AnyClassConstructor } from '../../types/AnyClass';
import { GetDetailsDataFN } from '../details/Details';

const DETAILS_METADATA_KEY = 'DetailsMetaData';
export type OnSubmitFN<T> = (data: T | FormData) => Promise<T>;

interface FormOptions<T extends AnyClass> {
  onSubmit: OnSubmitFN<T>;
  getDetailsData?: GetDetailsDataFN<T>;
  type?: 'json' | 'formData';
  redirectSuccessUrl?: string;
}

export interface FormConfiguration<T extends AnyClass> {
  onSubmit: OnSubmitFN<T>;
  getDetailsData?: GetDetailsDataFN<T>;
  type: 'json' | 'formData';
  redirectSuccessUrl?: string;
}

export function Form<T extends AnyClass>(options?: FormOptions<T>): ClassDecorator {
  return (target: object) => {
    if (options) {
      Reflect.defineMetadata(DETAILS_METADATA_KEY, options, target);
    }
  };
}

export function getFormConfiguration<T extends AnyClass, K extends AnyClassConstructor<T>>(
  entityClass: K
): FormConfiguration<T> {
  const formOptions: FormOptions<T> = Reflect.getMetadata(
    DETAILS_METADATA_KEY,
    entityClass as object
  );
  if (!formOptions) {
    throw new Error('Form decerator should be used on class');
  }
  const formConfiguration: FormConfiguration<T> = {
    onSubmit: formOptions.onSubmit,
    getDetailsData: formOptions.getDetailsData,
    type: formOptions.type ?? 'json',
    redirectSuccessUrl: formOptions.redirectSuccessUrl,
  };
  return formConfiguration;
}
