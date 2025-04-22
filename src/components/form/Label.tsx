import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  label?: string;
  fieldName: string;
  children?: React.ReactNode;
}

export function Label({ label, fieldName, children, ...props }: LabelProps) {
  return (
    <label {...props} className={'label ' + props.className}>
      {
        <span>
          {label ? label + ':' : fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ':'}
        </span>
      }
      {children}
    </label>
  );
}
