import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { InputOptions } from '../../decorators/form/Input';
import { FormField } from './FormField';
import { FormOptions } from '../../decorators/form/FormOptions';
import { AnyClass } from '../../types/AnyClass';
import { OnSubmitFN } from '../pages/FormPage';
interface InnerFormProps<T extends AnyClass> {
  data?: any;
  formOptions: FormOptions;
  onSubmit: OnSubmitFN<T>;
  redirect?: string;
}

export function InnerForm<T extends AnyClass>({
  data,
  formOptions,
  onSubmit,
  redirect,
}: InnerFormProps<T>) {
  const isEditForm = !!data;
  const form = useForm<T>({
    resolver: formOptions.resolver,
    //TODO: remove __formEdit from api
    defaultValues: { ...data, __formEdit: isEditForm },
  });
  const inputs = formOptions.inputs;
  useEffect(() => {
    form.reset({ ...data, __formEdit: isEditForm });
  }, [isEditForm, data, form.reset]);

  return (
    <div className="form-wrapper">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(
            async (dataForm) => {
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
                isEditForm={isEditForm}
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
