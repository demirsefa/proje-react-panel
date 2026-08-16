/**
 * @jest-environment jsdom
 */
import { TextDecoder, TextEncoder } from 'util';
// react-router reads TextEncoder at import time and jsdom has none — set it up before the
// imports below pull the router in.
Object.assign(globalThis, { TextEncoder, TextDecoder });

import 'reflect-metadata';
import React from 'react';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { plainToInstance, Type } from 'class-transformer';
import { getInputFields, Input } from '../../../decorators/form/Input';
import { Form, getFormConfiguration } from '../../../decorators/form/Form';
import { InnerForm } from '../../../components/form/InnerForm';
import { AnyClass } from '../../../types/AnyClass';

// react-toastify writes to a container that is not mounted here; the calls are noise for
// this test, not the subject of it.
jest.mock('react-toastify', () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const submitted = jest.fn<(data: any) => Promise<any>>();
const onSubmit = async (data: unknown) => {
  submitted(data);
  return {};
};

@Form({ onSubmit })
class NumberForm {
  @Input({ label: 'Name' })
  name: string;

  @Input({ inputType: 'number', label: 'Amount' })
  amount: number;

  @Input({ inputType: 'number', label: 'Discount' })
  discount: number;

  @Input({ inputType: 'date', label: 'Starts at' })
  startsAt: string;

  @Input({ type: 'hidden', inputType: 'number' })
  id: number;
}

@Form({ onSubmit })
class DefaultedNumberForm {
  @Input({ inputType: 'number', label: 'Amount', defaultValue: '3' })
  amount: number;
}

// The model authors used to have to remember this; it must keep working now that the field
// already arrives as a number.
class TypedNumberModel {
  @Type(() => Number)
  amount: number;
}

function renderForm<T extends AnyClass>(model: new () => T) {
  const inputs = getInputFields(model as never);
  const formClass = getFormConfiguration(model as never);
  let form: UseFormReturn | undefined;
  // FormPage seeds useForm with the declared defaultValues, which are typed as strings.
  const defaultValues = inputs.reduce(
    (acc, input) => {
      acc[input.name] = input.defaultValue;
      return acc;
    },
    {} as Record<string, unknown>
  );

  function Harness() {
    form = useForm({ defaultValues });
    return (
      <MemoryRouter>
        <FormProvider {...form}>
          <InnerForm inputs={inputs} formClass={formClass} />
        </FormProvider>
      </MemoryRouter>
    );
  }

  const utils = render(<Harness />);
  return { ...utils, getForm: () => form! };
}

const fieldOf = (container: HTMLElement, name: string) =>
  container.querySelector(`[name="${name}"]`) as HTMLInputElement;

const submitForm = async (container: HTMLElement) => {
  fireEvent.submit(container.querySelector('form')!);
  await waitFor(() => expect(submitted).toHaveBeenCalled());
  return submitted.mock.calls[submitted.mock.calls.length - 1][0];
};

describe('number and date fields in the submitted body', () => {
  beforeEach(() => {
    submitted.mockClear();
  });

  it('sends a filled number input as a number, not a string', async () => {
    const { container } = renderForm(NumberForm);

    fireEvent.change(fieldOf(container, 'amount'), { target: { value: '42' } });
    const body = await submitForm(container);

    expect(typeof body.amount).toBe('number');
    expect(body.amount).toBe(42);
  });

  it('sends an empty number input as undefined, so it drops out of the JSON body', async () => {
    const { container } = renderForm(NumberForm);

    fireEvent.change(fieldOf(container, 'amount'), { target: { value: '7' } });
    // 'discount' is never touched, 'amount' is filled and then cleared again.
    fireEvent.change(fieldOf(container, 'amount'), { target: { value: '' } });
    const body = await submitForm(container);

    expect(body.amount).toBeUndefined();
    expect(body.discount).toBeUndefined();
    // Not 0 and not NaN: NaN would survive @IsOptional() and fail validation, and JSON.stringify
    // would turn it into null.
    expect(JSON.parse(JSON.stringify(body))).not.toHaveProperty('amount');
  });

  it('sends a hidden numeric field as a number too', async () => {
    const { container, getForm } = renderForm(NumberForm);

    // How a hidden id is really filled: getDetailsData loads the record and calls setValue.
    // Typing into it is not a path — React fires no onChange for type="hidden".
    getForm().setValue('id', '17');
    const body = await submitForm(container);

    expect(typeof body.id).toBe('number');
    expect(body.id).toBe(17);
  });

  it('converts the string defaultValue of a number field', async () => {
    const { container } = renderForm(DefaultedNumberForm);
    const body = await submitForm(container);

    expect(typeof body.amount).toBe('number');
    expect(body.amount).toBe(3);
  });

  it('leaves text fields alone', async () => {
    const { container } = renderForm(NumberForm);

    fireEvent.change(fieldOf(container, 'name'), { target: { value: '5' } });
    const body = await submitForm(container);

    expect(typeof body.name).toBe('string');
    expect(body.name).toBe('5');
  });

  it('keeps a date field as the ISO string the input produces', async () => {
    const { container } = renderForm(NumberForm);

    fireEvent.change(fieldOf(container, 'startsAt'), { target: { value: '2026-08-16' } });
    const body = await submitForm(container);

    expect(typeof body.startsAt).toBe('string');
    expect(body.startsAt).toBe('2026-08-16');
    expect(body.startsAt instanceof Date).toBe(false);
  });

  it('passes a value set programmatically through untouched', async () => {
    const { container, getForm } = renderForm(NumberForm);

    // What getDetailsData does when it loads a record: the value is already a number.
    getForm().setValue('amount', 12);
    const body = await submitForm(container);

    expect(body.amount).toBe(12);
  });

  it('still works for a model that declares @Type(() => Number)', async () => {
    const { container } = renderForm(NumberForm);

    fireEvent.change(fieldOf(container, 'amount'), { target: { value: '42' } });
    const body = await submitForm(container);
    const instance = plainToInstance(TypedNumberModel, { amount: body.amount });

    expect(instance.amount).toBe(42);
    expect(typeof instance.amount).toBe('number');
  });
});
