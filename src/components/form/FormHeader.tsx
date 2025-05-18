import React from 'react';
import { AnyClass } from '../../types/AnyClass';
import { FormUtils } from './FormPage';

interface FormHeaderProps<T extends AnyClass> {
  title?: string;
  header?: (utils: FormUtils<T>) => React.ReactNode;
  utils: FormUtils<T>;
}

export function FormHeader<T extends AnyClass>({ utils, header, title }: FormHeaderProps<T>) {
  return (
    <div className="form-header">
      {title && <h2 className="form-title">{title}</h2>}
      <div className="form-actions">{header ? header(utils) : null}</div>
    </div>
  );
}
