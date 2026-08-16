import React, { useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { InputConfiguration } from '../../decorators/form/Input';
import { FormField } from './FormField';
import { useNavigate } from 'react-router';
import { FormConfiguration, FormGroup } from '../../decorators/form/Form';
import { AnyClass } from '../../types/AnyClass';
import { toast } from 'react-toastify';

interface InnerFormProps<T extends AnyClass> {
  inputs: InputConfiguration[];
  formClass: FormConfiguration<T>;
}

interface GroupSection {
  key: string;
  label: string;
  collapsible: boolean;
  defaultCollapsed: boolean;
  inputs: InputConfiguration[];
}

/**
 * Splits the inputs into the fields rendered straight into the form and the grouped sections.
 * With no `group` on any field every input stays ungrouped, so the markup is byte-for-byte what
 * it was before groups existed — no stray fieldset around existing panels' CSS.
 */
function splitIntoGroups(
  inputs: InputConfiguration[],
  groups?: FormGroup[]
): { ungrouped: InputConfiguration[]; sections: GroupSection[] } {
  const ungrouped: InputConfiguration[] = [];
  const inputsByGroup = new Map<string, InputConfiguration[]>();
  const appearanceOrder: string[] = [];

  inputs?.forEach(input => {
    // Hidden fields carry no label and no layout; a fieldset around them would only add noise.
    if (!input.group || input.type === 'hidden') {
      ungrouped.push(input);
      return;
    }
    if (!inputsByGroup.has(input.group)) {
      inputsByGroup.set(input.group, []);
      appearanceOrder.push(input.group);
    }
    inputsByGroup.get(input.group)!.push(input);
  });

  const declared = groups ?? [];
  const declaredKeys = declared.map(group => group.key);
  const orderedKeys = [
    ...declaredKeys.filter(key => inputsByGroup.has(key)),
    // A group nobody declared in @Form({ groups }) still renders — labelled with its own key,
    // appended after the declared ones, in the order the fields introduced it.
    ...appearanceOrder.filter(key => !declaredKeys.includes(key)),
  ];

  const sections = orderedKeys.map(key => {
    const declaration = declared.find(group => group.key === key);
    return {
      key,
      label: declaration?.label ?? key,
      collapsible: declaration?.collapsible ?? false,
      defaultCollapsed: declaration?.defaultCollapsed ?? false,
      inputs: inputsByGroup.get(key)!,
    };
  });

  return { ungrouped, sections };
}

export function InnerForm<T extends AnyClass>({ inputs, formClass }: InnerFormProps<T>) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  //TODO: any is not a good solution, we need to find a better way to do this
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const form = useFormContext<T>();
  const loadingRef = useRef(false);
  const { ungrouped, sections } = useMemo(
    () => splitIntoGroups(inputs, formClass.groups),
    [inputs, formClass.groups]
  );

  const renderField = (input: InputConfiguration) => (
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
  );

  return (
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
                      //NOTE: an empty number field is `undefined` since register() converts it;
                      // appending that would post the literal string 'undefined'. The DOM entry
                      // for the field is already in formData, so skipping it loses nothing.
                      if (dataForm[key] === undefined || dataForm[key] === null) {
                        continue;
                      }
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
            //TODO: https path or relative path
            if (formClass.redirectSuccessUrl) {
              navigate(formClass.redirectSuccessUrl);
            }
            if (formClass.onSubmitSuccess) {
              formClass.onSubmitSuccess(resut);
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
          console.error('error creating creation', errors, event);
        }
      )}
    >
      <div>
        {errorMessage && (
          <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
            {errorMessage}
          </div>
        )}
        {ungrouped.map(renderField)}
        {sections.map(section => (
          <fieldset
            key={section.key}
            data-group={section.key}
            className={`form-group-section${section.collapsible ? ' form-group-section-collapsible' : ''}`}
          >
            {section.collapsible ? (
              <details open={!section.defaultCollapsed}>
                <summary className="form-group-summary">{section.label}</summary>
                <div className="form-group-fields">{section.inputs.map(renderField)}</div>
              </details>
            ) : (
              <>
                <legend className="form-group-legend">{section.label}</legend>
                <div className="form-group-fields">{section.inputs.map(renderField)}</div>
              </>
            )}
          </fieldset>
        ))}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </div>
    </form>
  );
}
