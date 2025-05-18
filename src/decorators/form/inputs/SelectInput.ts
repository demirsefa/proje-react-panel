import { ExtendedInput, ExtendedInputOptions, InputConfiguration, InputOptions } from '../Input';

export interface SelectInputOptions<T> extends InputOptions {
  onSelectPreloader?: () => Promise<{ label: string; value: T }[]>;
  defaultOptions?: { value: T; label: string }[];
  csvExport?: never;
  defaultValue?: never;
}

export interface SelectInputConfiguration<T> extends InputConfiguration {
  type: 'select';
  onSelectPreloader?: () => Promise<{ label: string; value: T }[]>;
  defaultOptions?: { value: T; label: string }[];
  csvExport?: never;
  defaultValue?: never;
}

export function SelectInput<K>(options?: SelectInputOptions<K>): PropertyDecorator {
  return ExtendedInput({
    ...options,
    type: 'select',
  } as ExtendedInputOptions);
}
