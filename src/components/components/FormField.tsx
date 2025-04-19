import React from 'react';
import { InputOptions } from '../../decorators/form/Input';
import { Label } from './Label';
import { UseFormRegister } from 'react-hook-form';
import { ImageUploader } from './ImageUploader';
import { Checkbox } from './Checkbox';

interface FormFieldProps {
  input: InputOptions;
  register: UseFormRegister<any>;
  error?: { message?: string };
}

export function FormField({ input, register, error }: FormFieldProps) {
  const fieldName = input.name || '';

  const renderField = () => {
    switch (input.type) {
      case 'textarea':
        return <textarea {...register(fieldName)} placeholder={input.placeholder} id={fieldName} />;
      case 'select':
        return (
          <select {...register(fieldName)} id={fieldName}>
            <option value="">Select {fieldName}</option>
            {input.selectOptions?.map(option => (
              <option key={option} value={option}>
                {option}
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
