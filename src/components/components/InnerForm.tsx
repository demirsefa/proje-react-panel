import React, { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { InputOptions } from '../../decorators/form/Input';
import { FormField } from './FormField';
import { FormOptions } from '../../decorators/form/FormOptions';
import { AnyClass } from '../../types/AnyClass';
import { OnSubmitFN, GetDetailsDataFN } from '../pages/FormPage';
import { useParams, useNavigate } from 'react-router';

interface InnerFormProps<T> {
  formOptions: FormOptions;
  onSubmit: OnSubmitFN<T>;
  getDetailsData?: GetDetailsDataFN<T>;
  redirectBackOnSuccess?: boolean;
  onSelectPreloader?: (inputOptions: InputOptions) => Promise<{ label: string; value: string }[]>;
  type?: 'json' | 'formData';
}

export function InnerForm<T>({
  formOptions,
  onSubmit,
  getDetailsData,
  redirectBackOnSuccess,
  onSelectPreloader,
  type,
}: InnerFormProps<T>) {
  const params = useParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  //TODO: any is not a good solution, we need to find a better way to do this
  const form = useForm<any>({
    resolver: formOptions.resolver,
  });
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const inputs = formOptions.inputs;
  useEffect(() => {
    if (getDetailsData) {
      getDetailsData(params as Record<string, string>).then(data => {
        form.reset({ ...data });
      }); 
    }
  }, [params, form.reset]);

  return (
    <div className="form-wrapper">
      <FormProvider {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(
            async dataForm => {
              try {
                console.log('dataForm', dataForm);
                const data =
                  type === 'json'
                    ? dataForm
                    : (() => {
                        const formData = new FormData(formRef.current!);
                        for (const key in dataForm) {
                          if (!formData.get(key)) {
                            formData.append(key, dataForm[key]);
                          }
                        }
                        console.log('formData', formData);
                        return formData;
                      })();
                console.log('data', data);
                await onSubmit(data);
                setErrorMessage(null);
                if (redirectBackOnSuccess) {
                  navigate(-1);
                }
              } catch (error: any) {
                const message =
                  error?.response?.data?.message ||
                  (error instanceof Error ? error.message : 'An error occurred');
                setErrorMessage(message);
                console.error(error);
              }
            },
            (errors, event) => {
              //TOOD: put error if useer choose global error
              console.log('error creating creation', errors, event);
            }
          )}
        >
          <div>
            {errorMessage && (
              <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
                {errorMessage}
              </div>
            )}
            {inputs?.map((input: InputOptions) => (
              <FormField
                key={input.name || ''}
                input={input}
                register={form.register}
                onSelectPreloader={onSelectPreloader}
                error={
                  input.name
                    ? { message: (form.formState.errors[input.name as keyof T] as any)?.message }
                    : undefined
                }
              />
            ))}
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
