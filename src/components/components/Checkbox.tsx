import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

export function Checkbox({ id, ...props }: CheckboxProps) {
  return <input type="checkbox" id={id} className="checkbox" {...props} />;
}
