import React, { useEffect, useMemo } from 'react';
import { InnerForm } from './InnerForm';
import { AnyClass, AnyClassConstructor } from '../../types/AnyClass';
import { useParams } from 'react-router';
import { FormProvider, Resolver, useForm, UseFormReturn, Path, PathValue } from 'react-hook-form';
import { getFormPageMeta } from '../../decorators/form/getFormPageMeta';
import { FormHeader } from './FormHeader';
import { InputConfiguration } from '../../decorators/form/Input';

export interface FormUtils<T extends AnyClass> {
  getValues: () => T;
  setValues: (values: Partial<T>) => void;
  toJSON: (values: Partial<T>) => string;
  fromJSON: (json: string) => Partial<T>;
  export: (data: string, extension: 'txt' | 'json' | 'csv') => void;
  import: () => Promise<string>;
}

export interface FormPageProps<T extends AnyClass> {
  model: AnyClassConstructor<T>;
  title?: string;
  documentTitle?: string;
  header?: (utils: FormUtils<T>) => React.ReactNode;
}

function useCreateFormUtils<T extends AnyClass>(
  inputs: InputConfiguration[],
  form: UseFormReturn<T>
): FormUtils<T> {
  return {
    getValues: form.getValues,
    setValues: (values: Partial<T>) => {
      Object.entries(values).forEach(([key, value]) => {
        const input = inputs.find(input => input.name === key);
        //form.reset(); //TODO: if there is default fix it??
        if (input) {
          if (input.nestedFields) {
            if (Array.isArray(value)) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const innerArray: Record<string, any>[] = [];
              value.forEach(nestedValue => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const innerObject: Record<string, any> = {};
                input.nestedFields!.forEach(nestedInput => {
                  if (nestedInput.includeInJSON) {
                    innerObject[nestedInput.name] = nestedValue[nestedInput.name];
                  }
                });
                innerArray.push(innerObject);
              });
              form.setValue(key as Path<T>, innerArray as PathValue<T, Path<T>>);
            } else {
              console.warn('Non-array nested fields are not supported for json conversion', value);
            }
          } else {
            form.setValue(key as Path<T>, value);
          }
        }
      });
    },
    toJSON: (values: Partial<T>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const jsonData: Record<string, any> = {};
      Object.entries(values).forEach(([key, value]) => {
        const input = inputs.find(input => input.name === key);
        //form.reset(); //TODO: if there is default fix it??
        if (input && input.includeInJSON) {
          if (input.nestedFields) {
            jsonData[key] = [];
            if (Array.isArray(value)) {
              //TODO: fix this
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              value.forEach((innerValue: any) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const nestedObject: Record<string, any> = {};
                jsonData[key].push(nestedObject);
                Object.entries(innerValue).forEach(([nestedKey, nestedValue]) => {
                  const nestedInput = input.nestedFields!.find(
                    nestedInput => nestedInput.name === nestedKey
                  );
                  if (nestedInput && nestedInput.includeInJSON) {
                    nestedObject[nestedKey] = nestedValue;
                  }
                });
              });
            } else {
              console.warn('Non-array nested fields are not supported for json conversion', value);
            }
          } else {
            jsonData[key] = value;
          }
        }
      });
      return JSON.stringify(jsonData, null, 2);
    },
    fromJSON: (json: string): Partial<T> => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const jsonObject: Record<string, any> = {};
      const jsonData = JSON.parse(json);
      Object.entries(jsonData).forEach(([key, value]) => {
        const input = inputs.find(input => input.name === key);
        if (input && input.includeInJSON) {
          jsonObject[key] = value;
        }
      });
      return jsonObject as Partial<T>;
    },
    export: (data: string, extension: 'txt' | 'json' | 'csv') => {
      const blob = new Blob([data], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `form-data.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    import: () => {
      return new Promise<string>(resolve => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.txt,.json,.csv';
        input.onchange = e => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = event => {
              resolve(event.target?.result as string);
            };
            reader.readAsText(file);
          }
        };
        input.click();
      });
    },
  };
}

export function FormPage<T extends AnyClass>({
  model,
  title,
  documentTitle,
  header,
}: FormPageProps<T>) {
  const { class: formClass, inputs, resolver } = useMemo(() => getFormPageMeta(model), [model]);
  const params = useParams();
  const form = useForm<T>({
    resolver: resolver as Resolver<T>,
  });
  const utils = useCreateFormUtils(inputs, form);

  useEffect(() => {
    if (documentTitle) {
      document.title = documentTitle;
    }
  }, [documentTitle]);

  useEffect(() => {
    if (formClass.getDetailsData) {
      formClass.getDetailsData(params as Record<string, string>).then(data => {
        form.reset(data as T);
      });
    }
  }, [params, form.reset, formClass.getDetailsData, formClass, form]);

  return (
    <FormProvider {...form}>
      <FormHeader title={title} utils={utils} header={header} />
      <InnerForm inputs={inputs} formClass={formClass} />
    </FormProvider>
  );
}
