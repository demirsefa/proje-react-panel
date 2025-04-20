import 'reflect-metadata';
import { AnyClass } from '../../types/AnyClass';

const INPUT_KEY = Symbol('input');

const isFieldSensitive = (fieldName: string): boolean => {
  return ['password'].some(term => fieldName.toLowerCase().includes(term));
};

export interface InputOptions {
  type?: 'input' | 'select' | 'textarea' | 'file-upload' | 'checkbox' | 'hidden' | 'nested';
  inputType?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'date';
  name?: string;
  label?: string;
  placeholder?: string;
  cancelPasswordValidationOnEdit?: boolean;
  options?: { value: string; label: string }[];
  nestedFields?: InputOptions[];
}

export function Input(options?: InputOptions): PropertyDecorator {
  return (target, propertyKey) => {
    const existingInputs: string[] = Reflect.getMetadata(INPUT_KEY, target) || [];
    Reflect.defineMetadata(INPUT_KEY, [...existingInputs, propertyKey.toString()], target);

    if (options) {
      const keyString = `${INPUT_KEY.toString()}:${propertyKey.toString()}:options`;
      Reflect.defineMetadata(keyString, options, target);
    }
  };
}

export function getInputFields<T extends AnyClass>(entityClass: T): InputOptions[] {
  const prototype = entityClass.prototype;
  const inputFields: string[] = Reflect.getMetadata(INPUT_KEY, prototype) || [];
  return inputFields.map(field => {
    const fields = Reflect.getMetadata(`${INPUT_KEY.toString()}:${field}:options`, prototype) || {};
    const inputType = fields?.inputType ?? (isFieldSensitive(field) ? 'password' : 'text');
    return {
      ...fields,
      editable: fields.editable ?? true,
      sensitive: fields.sensitive,
      name: fields?.name ?? field,
      label: fields?.label ?? field,
      placeholder: fields?.placeholder ?? field,
      inputType: inputType,
      type: fields?.type ?? 'input',
      selectOptions: fields?.selectOptions ?? [],
      cancelPasswordValidationOnEdit:
        fields?.cancelPasswordValidationOnEdit ?? inputType === 'password',
    };
  });
}
