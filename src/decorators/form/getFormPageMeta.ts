import { AnyClass, AnyClassConstructor } from '../../types/AnyClass';
import { getInputFields, InputConfiguration } from './Input';
import { FormConfiguration, getFormConfiguration } from './Form';
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { Resolver } from 'react-hook-form';

export interface FormPageMeta<T extends AnyClass> {
  resolver: Resolver<T>;
  class: FormConfiguration<T>;
  inputs: InputConfiguration[];
}

export function getFormPageMeta<T extends AnyClass, K extends AnyClassConstructor<T>>(
  entityClass: K
): FormPageMeta<T> {
  return {
    resolver: classValidatorResolver(entityClass),
    class: getFormConfiguration(entityClass),
    inputs: getInputFields(entityClass),
  };
}
