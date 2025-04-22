import { AnyClass } from '../../types/AnyClass';
import { DetailsItemConfiguration, getDetailsItemFields } from './DetailsItem';
import { DetailsConfiguration, getDetailsConfiguration } from './Details';

export interface DetailsPageMeta<T extends AnyClass> {
  class: DetailsConfiguration<T>;
  items: DetailsItemConfiguration[];
}

export function getDetailsPageMeta<T extends AnyClass>(entityClass: T): DetailsPageMeta<T> {
  return {
    class: getDetailsConfiguration(entityClass),
    items: getDetailsItemFields<T>(entityClass),
  };
}
