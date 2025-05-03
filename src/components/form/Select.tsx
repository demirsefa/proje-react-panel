import React, { useEffect, useState } from 'react';
import { InputConfiguration } from '../../decorators/form/Input';
import { useFormContext, Controller } from 'react-hook-form';
import { SelectInputConfiguration } from '../../decorators/form/inputs/SelectInput';
import ReactSelect from 'react-select';
import { darkSelectStyles } from './SelectStyles';

interface SelectProps {
  input: InputConfiguration;
  fieldName: string;
}

interface OptionType {
  label: string;
  value: string;
}

export function Select({ input, fieldName }: SelectProps) {
  const inputSelect = input as SelectInputConfiguration;
  const { control } = useFormContext();
  const [options, setOptions] = useState<OptionType[]>(inputSelect.defaultOptions || []);
  const [key, setKey] = useState(0);
  useEffect(() => {
    if (inputSelect.onSelectPreloader) {
      inputSelect.onSelectPreloader().then(option => {
        setOptions(option);
        setKey(key + 1);
      });
    }
  }, [inputSelect, inputSelect.onSelectPreloader, key]);

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => {
        return (
          <ReactSelect
            key={key}
            options={options}
            styles={darkSelectStyles}
            value={options.find(option => option.value === field.value) || null}
            onChange={(selectedOption: OptionType | null) => {
              field.onChange(selectedOption?.value);
            }}
          />
        );
      }}
    />
  );
}
