import React, { useEffect, useMemo, useState } from 'react';
import { InputConfiguration } from '../../decorators/form/Input';
import { useFormContext, Controller } from 'react-hook-form';
import { SelectInputConfiguration } from '../../decorators/form/inputs/SelectInput';
import ReactSelect from 'react-select';
import { darkSelectStyles } from './SelectStyles';

interface SelectProps {
  input: InputConfiguration;
  fieldName: string;
}

interface OptionType<TValue> {
  label: string;
  value: TValue;
}

export function Select<TValue>({ input, fieldName }: SelectProps) {
  const inputSelect = input as SelectInputConfiguration<TValue>;
  const { control } = useFormContext();
  const [options, setOptions] = useState<OptionType<TValue>[]>(inputSelect.defaultOptions || []);
  //NOTE: is added to component to fix type error. Need to find a better solution.
  const styles = useMemo(() => darkSelectStyles<TValue>(), []);
  useEffect(() => {
    if (inputSelect.onSelectPreloader) {
      inputSelect.onSelectPreloader().then(option => {
        setOptions(option);
      });
    }
  }, [inputSelect, inputSelect.onSelectPreloader]);

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => {
        return (
          <ReactSelect
            options={options}
            styles={styles}
            value={options.find(option => option.value === field.value) || null}
            onChange={(selectedOption: OptionType<TValue> | null) => {
              field.onChange(selectedOption?.value as TValue);
            }}
          />
        );
      }}
    />
  );
}
