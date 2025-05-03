import React from 'react';
import { InputConfiguration } from '../../decorators/form/Input';
import { useFormContext, UseFormRegister } from 'react-hook-form';
import { Uploader } from './Uploader';
import { Checkbox } from './Checkbox';
import { Label } from './Label';
import { Select } from './Select';
import { AnyClass } from '../../types/AnyClass';

interface FormFieldProps {
  input: InputConfiguration;
  //TODO: any is not a good solution, we need to find a better way to do this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: { message?: string };
  baseName?: string;
}

interface NestedFormFieldsProps {
  input: InputConfiguration;
  //TODO: any is not a good solution, we need to find a better way to do this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
}

function NestedFormFields({ input, register }: NestedFormFieldsProps) {
  const form = useFormContext();
  //TODO: inputOptions İnputResult seperate
  const data = form.getValues(input.name!);
  return (
    <div>
      {/* TODO: any is not a good solution, we need to find a better way to do this */}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {data?.map((value: any, index: number) => (
        <div key={index}>
          {input.nestedFields?.map((nestedInput: InputConfiguration) => (
            <FormField
              key={nestedInput.name?.toString() ?? ''}
              baseName={input.name + '[' + index + ']'}
              input={nestedInput}
              register={register}
              error={
                input.name
                  ? { message: (form.formState.errors[input.name] as { message: string })?.message }
                  : undefined
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function FormField<T extends AnyClass>({
  input,
  register,
  error,
  baseName,
}: FormFieldProps<T>) {
  const fieldName: string = (baseName ? baseName.toString() + '.' : '') + input.name || '';
  const renderField = () => {
    switch (input.type) {
      case 'textarea':
        return <textarea {...register(fieldName)} placeholder={input.placeholder} />;
      case 'select':
        return <Select input={input} fieldName={fieldName} />;
      case 'input': {
        return (
          <input type={input.inputType} {...register(fieldName)} placeholder={input.placeholder} />
        );
      }
      case 'file-upload':
        return <Uploader input={input} />;
      case 'checkbox':
        return <Checkbox input={input} />;
      case 'hidden':
        return <input type="hidden" {...register(fieldName)} />;
      case 'nested':
        return <NestedFormFields input={input} register={register} />;
      default:
        return null;
    }
  };

  return (
    <div className="form-field">
      {input.type !== 'checkbox' && (
        <Label htmlFor={fieldName} label={input.label} fieldName={fieldName} />
      )}
      {renderField()}
      {error && <span className="error-message">{error.message}</span>}
    </div>
  );
}
