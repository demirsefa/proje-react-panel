import { ExtendedInput, InputConfiguration, InputOptions } from '../Input';

export interface SelectInputOptions extends InputOptions {
  onSelectPreloader?: () => Promise<{ label: string; value: string }[]>;
  defaultOptions?: { value: string; label: string }[];
}

export interface SelectInputConfiguration extends InputConfiguration {
  type: 'select';
  onSelectPreloader?: () => Promise<{ label: string; value: string }[]>;
  defaultOptions?: { value: any; label: string }[];
}

export function SelectInput(options?: SelectInputOptions): PropertyDecorator {
  return ExtendedInput({
    ...options,
    type: 'select',
  });
}
