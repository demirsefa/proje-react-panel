import React, { useEffect, useState } from 'react';
import { InputOptions } from '../../decorators/form/Input';
import { Label } from './Label';
import { useFormContext, UseFormRegister } from 'react-hook-form';
import { ImageUploader } from './ImageUploader';
import { Checkbox } from './Checkbox';

interface FormFieldProps {
  input: InputOptions;
  register: UseFormRegister<any>;
  error?: { message?: string };
  baseName?: string;
  onSelectPreloader?: (inputOptions: InputOptions) => Promise<{ label: string; value: string }[]>;
}

interface NestedFormFieldsProps {
  input: InputOptions;
  register: UseFormRegister<any>;
}

function NestedFormFields({ input, register }: NestedFormFieldsProps) {
  const form = useFormContext();
  //TODO: inputOptions İnputResult seperate
  const data = form.getValues(input.name!);
  return (
    <div>
      {data?.map((value: any, index: number) => (
        <div key={index}>
          {input.nestedFields?.map((nestedInput: InputOptions) => (
            <FormField
              key={nestedInput.name?.toString() ?? ''}
              baseName={input.name + '[' + index + ']'}
              input={nestedInput}
              register={register}
              error={
                input.name
                  ? { message: (form.formState.errors[input.name] as any)?.message }
                  : undefined
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function FormField({ input, register, error, baseName, onSelectPreloader }: FormFieldProps) {
  const fieldName = (baseName ? baseName.toString() + '.' : '') + input.name || '';
  const [options, setOptions] = useState<{ label: string; value: string }[]>(input.options || []);
  useEffect(() => {
    if (input.optionsPreload && onSelectPreloader) {
      onSelectPreloader(input).then(option => {
        setOptions(option);
      });
    }
  }, [input]);
  const renderField = () => {
    switch (input.type) {
      case 'textarea':
        return <textarea {...register(fieldName)} placeholder={input.placeholder} id={fieldName} />;
      case 'select':
        return (
          <select {...register(fieldName)} id={fieldName}>
            <option value="">Select {fieldName}</option>
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'input': {
        return (
          <input
            type={input.inputType}
            {...register(fieldName)}
            placeholder={input.placeholder}
            id={fieldName}
          />
        );
      }
      case 'file-upload':
        return <ImageUploader />;
      case 'checkbox':
        return <Checkbox {...register(fieldName)} id={fieldName} />;
      case 'hidden':
        return <input type="hidden" {...register(fieldName)} id={fieldName} />;
      case 'nested':
        return <NestedFormFields input={input} register={register} />;
      default:
        null;
    }
  };

  return (
    <div className="form-field">
      <Label htmlFor={fieldName} label={input.label} fieldName={fieldName} />
      {renderField()}
      {error && <span className="error-message">{error.message}</span>}
    </div>
  );
}
