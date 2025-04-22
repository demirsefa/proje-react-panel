import React, { useEffect, useMemo } from 'react';
import { InnerForm } from './InnerForm';
import { AnyClass, AnyClassConstructor } from '../../types/AnyClass';
import { useParams } from 'react-router';
import { FormProvider, Resolver, useForm } from 'react-hook-form';
import { getFormPageMeta } from '../../decorators/form/getFormPageMeta';

export interface FormPageProps<T extends AnyClass> {
  model: AnyClassConstructor<T>;
}

export function FormPage<T extends AnyClass>({ model }: FormPageProps<T>) {
  const { class: formClass, inputs, resolver } = useMemo(() => getFormPageMeta(model), [model]);
  const form = useForm<T>({
    resolver: resolver as Resolver<T>,
  });

  const params = useParams();
  useEffect(() => {
    if (formClass.getDetailsData) {
      formClass.getDetailsData(params as Record<string, string>).then(data => {
        form.reset(data as any);
      });
    }
  }, [params, form.reset, formClass.getDetailsData]);

  return (
    <FormProvider {...form}>
      <InnerForm inputs={inputs} formClass={formClass} />
    </FormProvider>
  );
}
