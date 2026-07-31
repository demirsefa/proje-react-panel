import React, { useMemo } from 'react';
import { InputConfiguration } from '../../decorators/form/Input';
import { useFormContext, UseFormRegister } from 'react-hook-form';
import { Uploader } from './Uploader';
import { Checkbox } from './Checkbox';
import { Label } from './Label';
import { Select } from './Select';
import { CustomField } from './CustomField';

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
  fieldName: string;
}

function NestedFormFields({ input, register, fieldName }: NestedFormFieldsProps) {
  const form = useFormContext();
  //TODO: inputOptions İnputResult seperate
  const data = form.getValues(fieldName);
  return (
    <div className="nested-form-field-inner">
      {/* TODO: any is not a good solution, we need to find a better way to do this */}
      {Array.isArray(data) ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?.map((value: any, index: number) => (
          <div key={index}>
            {input.nestedFields?.map((nestedInput: InputConfiguration) => (
              <FormField
                key={nestedInput.name?.toString() ?? ''}
                baseName={fieldName + '[' + index + ']'}
                input={nestedInput}
                register={register}
                error={
                  input.name
                    ? {
                        message: (form.formState.errors[fieldName] as { message: string })?.message,
                      }
                    : undefined
                }
              />
            ))}
          </div>
        ))
      ) : (
        <div>
          {input.nestedFields?.map((nestedInput: InputConfiguration) => (
            <FormField
              key={nestedInput.name?.toString() ?? ''}
              baseName={fieldName}
              input={nestedInput}
              register={register}
              error={
                input.name
                  ? {
                      message: (form.formState.errors[fieldName] as { message: string })?.message,
                    }
                  : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function FormField({ input, register, error, baseName }: FormFieldProps) {
  const fieldName: string = (baseName ? baseName.toString() + '.' : '') + input.name || '';
  const renderedField = useMemo(() => {
    switch (input.type) {
      case 'textarea':
        return <textarea {...register(fieldName)} placeholder={input.placeholder} />;
      case 'select':
        return <Select input={input} fieldName={fieldName} />;
      case 'custom':
        return <CustomField input={input} fieldName={fieldName} error={error?.message} />;
      case 'input': {
        return (
          <input type={input.inputType} {...register(fieldName)} placeholder={input.placeholder} />
        );
      }
      case 'file-upload':
        return <Uploader fieldName={fieldName} input={input} />;
      case 'checkbox':
        return <Checkbox fieldName={fieldName} input={input} />;
      case 'hidden':
        return <input type="hidden" {...register(fieldName)} />;
      case 'nested':
        return <NestedFormFields fieldName={fieldName} input={input} register={register} />;
      default:
        return null;
    }
    // NOTE: error message is a dependency because 'custom' forwards it into the render prop.
  }, [input, register, fieldName, error?.message]);

  return (
    <div className={`form-field ${input.type === 'nested' ? 'nested-form-field' : ''}`}>
      {input.type !== 'hidden' && input.type !== 'checkbox' && (
        <Label htmlFor={fieldName} label={input.label} fieldName={fieldName} />
      )}
      {renderedField}
      {error && input.type !== 'hidden' && <span className="error-message">{error.message}</span>}
    </div>
  );
}
