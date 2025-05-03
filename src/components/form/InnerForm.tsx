import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { InputConfiguration } from '../../decorators/form/Input';
import { FormField } from './FormField';
import { useNavigate } from 'react-router';
import { FormConfiguration } from '../../decorators/form/Form';
import { AnyClass } from '../../types/AnyClass';
import { toast } from 'react-toastify';

interface InnerFormProps<T extends AnyClass> {
  inputs: InputConfiguration[];
  formClass: FormConfiguration<T>;
}

export function InnerForm<T extends AnyClass>({ inputs, formClass }: InnerFormProps<T>) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  //TODO: any is not a good solution, we need to find a better way to do this
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const form = useFormContext<T>();
  const loadingRef = useRef(false);

  return (
    <div className="form-wrapper">
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(
          async (dataForm: T) => {
            if (loadingRef.current) return;
            loadingRef.current = true;
            try {
              const data =
                formClass.type === 'json'
                  ? dataForm
                  : (() => {
                      const formData = new FormData(formRef.current!);
                      for (const key in dataForm) {
                        if (!formData.get(key)) {
                          formData.append(key, dataForm[key]);
                        }
                      }
                      return formData;
                    })();
              const resut = await formClass.onSubmit(data);
              form.reset(resut);
              setErrorMessage(null);
              toast.success('Form submitted successfully');
              if (formClass.redirectBackOnSuccess) {
                navigate(-1);
              }
              if (formClass.redirectSuccessUrl) {
                navigate(formClass.redirectSuccessUrl);
              }
            } catch (error: unknown) {
              const errorResponse = error as { response?: { data?: { message?: string } } };
              const message =
                errorResponse?.response?.data?.message ||
                (error instanceof Error ? error.message : 'An error occurred');
              toast.error('Something went wrong');
              setErrorMessage(message);
              console.error(error);
            } finally {
              loadingRef.current = false;
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
          {inputs?.map((input: InputConfiguration) => (
            <FormField
              key={input.name || ''}
              input={input}
              register={form.register}
              error={
                input.name
                  ? {
                      message: (
                        form.formState.errors[input.name as keyof T] as {
                          message: string;
                        }
                      )?.message,
                    }
                  : undefined
              }
            />
          ))}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
