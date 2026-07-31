import 'reflect-metadata';
import { AnyClass, AnyClassConstructor } from '../../types/AnyClass';

const INPUT_KEY = Symbol('input');

const isFieldSensitive = (fieldName: string): boolean => {
  return ['password'].some(term => fieldName.toLowerCase().includes(term));
};

export type InputTypes = 'input' | 'textarea' | 'file-upload' | 'checkbox' | 'hidden' | 'nested';
export type ExtendedInputTypes = InputTypes | 'select' | 'custom' | 'richtext';

export interface InputOptions {
  type?: InputTypes;
  inputType?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'date';
  label?: string;
  placeholder?: string;
  nestedFields?: InputConfiguration[];
  defaultValue?: string;
  includeInCSV?: boolean;
  includeInJSON?: boolean;
  //NOTE: the visual section this field belongs to, matched against @Form({ groups }) by key.
  group?: string;
  rows?: number;
}

export interface ExtendedInputOptions extends Omit<InputOptions, 'type'> {
  type: ExtendedInputTypes;
}

export interface InputConfiguration {
  name: string;
  isNested: boolean;
  type: ExtendedInputTypes;
  inputType: 'text' | 'email' | 'tel' | 'password' | 'number' | 'date';
  label?: string;
  placeholder?: string;
  nestedFields?: InputConfiguration[];
  defaultValue?: string;
  includeInCSV: boolean;
  includeInJSON: boolean;
  group?: string;
  rows?: number;
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

export function ExtendedInput(options?: ExtendedInputOptions): PropertyDecorator {
  return (target, propertyKey) => {
    const existingInputs: string[] = Reflect.getMetadata(INPUT_KEY, target) || [];
    Reflect.defineMetadata(INPUT_KEY, [...existingInputs, propertyKey.toString()], target);
    if (options) {
      const keyString = `${INPUT_KEY.toString()}:${propertyKey.toString()}:options`;
      Reflect.defineMetadata(keyString, options, target);
    }
  };
}

export function getInputFields<T extends AnyClass>(
  entityClass: AnyClassConstructor<T>
): InputConfiguration[] {
  const prototype = entityClass.prototype;
  const inputFields: string[] = Reflect.getMetadata(INPUT_KEY, prototype) || [];
  return inputFields.map(field => {
    const fields: InputOptions =
      Reflect.getMetadata(`${INPUT_KEY.toString()}:${field}:options`, prototype) || {};
    const inputType = fields?.inputType ?? (isFieldSensitive(field) ? 'password' : 'text');

    // Check if field is in format translations[0].x
    const isNested: boolean = field.match(/^[a-zA-Z]+\[\d+\]\.[a-zA-Z]+$/) !== null;
    const inputConfiguration: InputConfiguration = {
      ...fields,
      name: field,
      isNested,
      label: fields?.label ?? field,
      placeholder: fields?.placeholder ?? field,
      inputType: inputType,
      nestedFields: fields?.nestedFields ?? [],
      type: fields?.type ?? 'input',
      includeInCSV: fields?.includeInCSV ?? false,
      includeInJSON: fields?.includeInJSON ?? false,
    };
    return inputConfiguration;
  });
}
