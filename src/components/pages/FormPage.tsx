import React, { useMemo } from 'react';
import { InnerForm } from '../components';
import { AnyClass } from '../../types/AnyClass';
import { getFormFields } from '../../decorators/form/getFormFields';

export type GetDetailsDataFN<T> = (param: string) => Promise<T>;
export type OnSubmitFN<T> = (data: T) => Promise<T>;

export interface FormPageProps<T extends AnyClass> {
  model: T;
  getDetailsData?: GetDetailsDataFN<T>;
  redirect?: string;
  onSubmit: OnSubmitFN<T>;
}

export function FormPage<T extends AnyClass>({
  model,
  getDetailsData,
  onSubmit,
  redirect,
  ...rest
}: FormPageProps<T>) {
  const formOptions = useMemo(() => getFormFields(model), [model]);
  return (
    <InnerForm
      getDetailsData={getDetailsData}
      redirect={redirect}
      onSubmit={onSubmit}
      formOptions={formOptions}
    />
  );
}
