import React from 'react';
import { InputConfiguration } from '../../decorators/form/Input';
import { useFormContext } from 'react-hook-form';
import { Label } from './Label';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  input: InputConfiguration;
  fieldName: string;
}

//TODO2:
export function Checkbox({ input, fieldName, ...props }: CheckboxProps) {
  const { label } = input;
  const form = useFormContext();
  const { register } = form;

  return (
    <Label className="checkbox-label" htmlFor={fieldName} label={label} fieldName={fieldName}>
      <input
        type="checkbox"
        id={fieldName}
        className="apple-switch"
        {...props}
        {...register(fieldName, {
          setValueAs: (value: string) => value === 'on',
        })}
      />
    </Label>
  );
}
