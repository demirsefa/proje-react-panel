import React, { useMemo } from 'react';
import { InnerForm } from '../components';
import { AnyClass } from '../../types/AnyClass';
import { getFormFields } from '../../decorators/form/getFormFields';
import { InputOptions } from '../../decorators/form/Input';

export type GetDetailsDataFN<T> = (param: Record<string, string>) => Promise<T>;
export type OnSubmitFN<T> = (data: T) => Promise<T>;

export interface FormPageProps<T extends AnyClass> {
  model: any; //TODO: use T not typeof T
  getDetailsData?: GetDetailsDataFN<T>;
  redirect?: string;
  onSubmit: OnSubmitFN<T>;
  onSelectPreloader?: (inputOptions: InputOptions) => Promise<{ label: string; value: string }[]>;
  redirectBackOnSuccess?: boolean;
}

export function FormPage<T extends AnyClass>({
  model,
  getDetailsData,
  onSubmit,
  redirect,
  onSelectPreloader,
  redirectBackOnSuccess = true,
  ...rest
}: FormPageProps<T>) {
  const formOptions = useMemo(() => getFormFields(model), [model]);
  return (
    <InnerForm
      getDetailsData={getDetailsData}
      onSubmit={onSubmit}
      formOptions={formOptions}
      redirectBackOnSuccess={redirectBackOnSuccess}
      onSelectPreloader={onSelectPreloader}
    />
  );
}
