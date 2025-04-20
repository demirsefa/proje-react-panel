import React, { useMemo } from 'react';
import { InnerForm } from '../components';
import { AnyClass } from '../../types/AnyClass';
import { getFormFields } from '../../decorators/form/getFormFields';

export type GetDetailsDataFN<T> = (param: Record<string, string>) => Promise<T>;
export type OnSubmitFN<T> = (data: T) => Promise<T>;

export interface FormPageProps<T extends AnyClass> {
  model: T;
  getDetailsData?: GetDetailsDataFN<T>;
  redirect?: string;
  onSubmit: OnSubmitFN<T>;
  redirectBackOnSuccess?: boolean;
}

export function FormPage<T extends AnyClass>({
  model,
  getDetailsData,
  onSubmit,
  redirect,
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
    />
  );
}
