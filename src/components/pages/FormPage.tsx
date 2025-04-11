import React, { useMemo } from 'react';
import { InnerForm } from '../components';
import { AnyClass } from '../../types/AnyClass';
import { getFormFields } from '../../decorators/form/getFormFields';

export type GetDetailsDataFN<T extends AnyClass> = () => Promise<T>;
export type OnSubmitFN<T extends AnyClass> = (data: T) => Promise<T>;

interface FormPageProps<T extends AnyClass> {
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
}: FormPageProps<T>) {
  const formOptions = useMemo(() => getFormFields(model), [model]);

  return <InnerForm redirect={redirect} onSubmit={onSubmit} formOptions={formOptions} />;
}
