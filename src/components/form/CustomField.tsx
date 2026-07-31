import React from 'react';
import { InputConfiguration } from '../../decorators/form/Input';
import { useFormContext, Controller } from 'react-hook-form';
import { CustomInputConfiguration } from '../../decorators/form/inputs/CustomInput';

interface CustomFieldProps {
  input: InputConfiguration;
  fieldName: string;
  error?: string;
}

export function CustomField({ input, fieldName, error }: CustomFieldProps) {
  const inputCustom = input as CustomInputConfiguration;
  const { control } = useFormContext();

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => {
        return (
          <>
            {inputCustom.render({
              fieldName,
              value: field.value,
              onChange: field.onChange,
              error,
            })}
          </>
        );
      }}
    />
  );
}
