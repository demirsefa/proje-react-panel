import React from 'react';
import { FormPage, FormPageProps } from './form/FormPage';
import { AnyClass } from '../types/AnyClass';

export function Login<T extends AnyClass>(props: FormPageProps<T>) {
  return <FormPage className="login-form" {...props} />;
}
