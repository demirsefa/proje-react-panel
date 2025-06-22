import 'reflect-metadata';
import { AnyClass, AnyClassConstructor } from '../../types/AnyClass';
import { GetDetailsDataFN } from '../details/Details';

const DETAILS_METADATA_KEY = 'DetailsMetaData';
export type OnSubmitFN<T, L = T> = (data: T | FormData) => Promise<L>;

interface FormOptions<T extends AnyClass, L = T> {
  onSubmit: OnSubmitFN<T, L>;
  onSubmitSuccess?: (data: L) => void;
  getDetailsData?: GetDetailsDataFN<T>;
  type?: 'json' | 'formData';
  redirectSuccessUrl?: string;
}

export interface FormConfiguration<T extends AnyClass, L = T> {
  onSubmit: OnSubmitFN<T, L>;
  onSubmitSuccess?: (data: L) => void;
  getDetailsData?: GetDetailsDataFN<T>;
  type: 'json' | 'formData';
  redirectSuccessUrl?: string;
}

export function Form<T extends AnyClass, L = T>(options?: FormOptions<T, L>): ClassDecorator {
  return (target: object) => {
    if (options) {
      Reflect.defineMetadata(DETAILS_METADATA_KEY, options, target);
    }
  };
}

export function getFormConfiguration<T extends AnyClass, K extends AnyClassConstructor<T>, L = T>(
  entityClass: K
): FormConfiguration<T, L> {
  const formOptions: FormOptions<T, L> = Reflect.getMetadata(
    DETAILS_METADATA_KEY,
    entityClass as object
  );
  if (!formOptions) {
    throw new Error('Form decerator should be used on class');
  }
  const formConfiguration: FormConfiguration<T, L> = {
    onSubmit: formOptions.onSubmit,
    onSubmitSuccess: formOptions.onSubmitSuccess,
    getDetailsData: formOptions.getDetailsData,
    type: formOptions.type ?? 'json',
    redirectSuccessUrl: formOptions.redirectSuccessUrl,
  };
  return formConfiguration;
}
