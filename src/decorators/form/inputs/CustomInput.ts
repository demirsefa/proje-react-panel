import type { ReactNode } from 'react';
import { ExtendedInput, ExtendedInputOptions, InputConfiguration, InputOptions } from '../Input';

export interface CustomRenderProps {
  fieldName: string;
  value: unknown;
  onChange: (value: unknown) => void;
  error?: string;
}

export interface CustomInputOptions extends Omit<InputOptions, 'type'> {
  render: (props: CustomRenderProps) => ReactNode;
}

export interface CustomInputConfiguration extends InputConfiguration {
  type: 'custom';
  render: (props: CustomRenderProps) => ReactNode;
}

//NOTE: the render function travels through Reflect metadata like any other option value.
export function CustomInput(options: CustomInputOptions): PropertyDecorator {
  return ExtendedInput({
    ...options,
    type: 'custom',
  } as ExtendedInputOptions);
}
