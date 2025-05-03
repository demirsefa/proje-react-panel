import { ExtendedInput, ExtendedInputOptions, InputConfiguration, InputOptions } from '../Input';

export interface SelectInputOptions extends InputOptions {
  //TODO: any is not a good solution, we need to find a better way to do this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelectPreloader?: () => Promise<{ label: string; value: any }[]>;
  //TODO: fix this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultOptions?: { value: any; label: string }[];
}

export interface SelectInputConfiguration extends InputConfiguration {
  type: 'select';
  onSelectPreloader?: () => Promise<{ label: string; value: string }[]>;
  //TODO: fix this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultOptions?: { value: any; label: string }[];
}

export function SelectInput(options?: SelectInputOptions): PropertyDecorator {
  return ExtendedInput({
    ...options,
    type: 'select',
  } as ExtendedInputOptions);
}
