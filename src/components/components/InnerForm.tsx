import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { InputOptions } from '../../decorators/form/Input';
import { FormField } from './FormField';
import { FormOptions } from '../../decorators/form/FormOptions';
import { AnyClass } from '../../types/AnyClass';
import { OnSubmitFN, GetDetailsDataFN } from '../pages/FormPage';
import { useParams, useNavigate } from 'react-router';

interface InnerFormProps<T extends AnyClass> {
  formOptions: FormOptions;
  onSubmit: OnSubmitFN<T>;
  getDetailsData?: GetDetailsDataFN<T>;
  redirectBackOnSuccess?: boolean;
}

export function InnerForm<T extends AnyClass>({
  formOptions,
  onSubmit,
  getDetailsData,
  redirectBackOnSuccess,
}: InnerFormProps<T>) {
  const params = useParams();
  const form = useForm<T>({
    resolver: formOptions.resolver,
  });
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
          onSubmit={form.handleSubmit(
            async dataForm => {
              await onSubmit(dataForm);
              if (redirectBackOnSuccess) {
                navigate(-1);
              }
            },
            (errors, event) => {
              console.log('error creating creation', errors, event);
            }
          )}
        >
          <div>
            {inputs?.map((input: InputOptions) => (
              <FormField
                key={input.name || ''}
                input={input}
                register={form.register}
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
