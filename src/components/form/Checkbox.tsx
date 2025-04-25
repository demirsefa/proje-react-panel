import React, { useState } from 'react';
import { InputConfiguration } from '../../decorators/form/Input';
import { useFormContext } from 'react-hook-form';
import { Label } from './Label';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  input: InputConfiguration;
}

//TODO2:
export function Checkbox({ input, ...props }: CheckboxProps) {
  const { label, name } = input;
  const form = useFormContext();
  const { register } = form;

  return (
    <Label className="checkbox-label" htmlFor={name} label={label} fieldName={name}>
      <input
        type="checkbox"
        id={name}
        className="apple-switch"
        {...props}
        {...register(name, {
          setValueAs: (value: string) => value === 'on',
        })}
      />
    </Label>
  );
}
