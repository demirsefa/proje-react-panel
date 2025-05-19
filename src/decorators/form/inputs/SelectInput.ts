import { ExtendedInput, ExtendedInputOptions, InputConfiguration, InputOptions } from '../Input';

export type SelectPreloader<T> = () => Promise<{ label: string; value: T }[]>;
export interface SelectInputOptions<T> extends InputOptions {
  onSelectPreloader?: SelectPreloader<T>;
  defaultOptions?: { value: T; label: string }[];
  csvExport?: never;
  defaultValue?: never;
}

export interface SelectInputConfiguration<T> extends InputConfiguration {
  type: 'select';
  onSelectPreloader?: SelectPreloader<T>;
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
