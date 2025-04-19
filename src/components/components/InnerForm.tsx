import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { InputOptions } from '../../decorators/form/Input';
import { FormField } from './FormField';
import { FormOptions } from '../../decorators/form/FormOptions';
import { AnyClass } from '../../types/AnyClass';
import { OnSubmitFN, GetDetailsDataFN } from '../pages/FormPage';
import { DefaultValues } from 'react-hook-form';
import { useParams } from 'react-router';

interface InnerFormProps<T extends AnyClass> {
  formOptions: FormOptions;
  onSubmit: OnSubmitFN<T>;
  redirect?: string;
  getDetailsData?: GetDetailsDataFN<T>;
}

export function InnerForm<T extends AnyClass>({
  formOptions,
  onSubmit,
  redirect,
  getDetailsData,
}: InnerFormProps<T>) {
  const params = useParams();
  const form = useForm<T>({
    resolver: formOptions.resolver,
  });

  const inputs = formOptions.inputs;
  useEffect(() => {
    if (getDetailsData) {
      getDetailsData(params.id as string).then(data => {
        form.reset({ ...data });
      });
    }
  }, [, form.reset]);

  return (
    <div className="form-wrapper">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(
            async dataForm => {
              await onSubmit(dataForm);
              if (redirect) {
                window.location.href = redirect;
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
