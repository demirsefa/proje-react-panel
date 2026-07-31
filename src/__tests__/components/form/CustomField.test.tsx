/**
 * @jest-environment jsdom
 */
import 'reflect-metadata';
import React from 'react';
import { describe, expect, it, beforeEach } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { CustomInput, CustomRenderProps } from '../../../decorators/form/inputs/CustomInput';
import { Input, getInputFields } from '../../../decorators/form/Input';
import { FormField } from '../../../components/form/FormField';

// Every call the library makes into the consumer supplied render prop.
let renderCalls: CustomRenderProps[] = [];

function renderControl(props: CustomRenderProps) {
  renderCalls.push(props);
  return (
    <button type="button" data-testid="custom-control" onClick={() => props.onChange('picked-42')}>
      {String(props.value ?? '')}
    </button>
  );
}

class AssetForm {
  @Input({ label: 'Title' })
  title: string;

  @CustomInput({ label: 'Asset', render: renderControl })
  asset: unknown;
}

// The values react-hook-form currently holds, mirrored out of the harness.
let formValues: Record<string, unknown> = {};

function Harness() {
  const form = useForm({ defaultValues: { title: '', asset: 'initial' } });
  formValues = form.watch();
  const inputs = getInputFields(AssetForm);
  return (
    <FormProvider {...form}>
      {inputs.map(input => (
        <FormField key={input.name} input={input} register={form.register} />
      ))}
    </FormProvider>
  );
}

describe('CustomInput', () => {
  beforeEach(() => {
    renderCalls = [];
    formValues = {};
  });

  it('carries the render function through the metadata', () => {
    const asset = getInputFields(AssetForm).find(input => input.name === 'asset');
    expect(asset?.type).toBe('custom');
    expect(typeof (asset as unknown as { render?: unknown })?.render).toBe('function');
  });

  it('calls the render prop with the field name and current value', () => {
    render(<Harness />);

    expect(renderCalls.length).toBeGreaterThan(0);
    expect(renderCalls[0].fieldName).toBe('asset');
    expect(renderCalls[0].value).toBe('initial');
    expect(renderCalls[0].error).toBeUndefined();
    expect(screen.getByTestId('custom-control').textContent).toBe('initial');
  });

  it('renders the label like any other field', () => {
    render(<Harness />);

    expect(screen.getByText('Asset:')).toBeTruthy();
  });

  it('updates the form value when the render prop calls onChange', () => {
    render(<Harness />);

    fireEvent.click(screen.getByTestId('custom-control'));

    expect(formValues.asset).toBe('picked-42');
    expect(screen.getByTestId('custom-control').textContent).toBe('picked-42');
  });

  it('leaves the other field types untouched', () => {
    render(<Harness />);

    expect(screen.getByText('Title:')).toBeTruthy();
    expect(formValues.title).toBe('');
  });
});
