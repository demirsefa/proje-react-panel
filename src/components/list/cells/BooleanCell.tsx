import React from 'react';
import CheckIcon from '../../../assets/icons/svg/check.svg';
import CrossIcon from '../../../assets/icons/svg/cross.svg';
import { AnyClass } from '../../../types/AnyClass';
import { CellConfiguration } from '../../../decorators/list/Cell';

interface BooleanCellProps {
  item: AnyClass;
  configuration: CellConfiguration;
}

export function BooleanCell({ item, configuration }: BooleanCellProps) {
  const value = item[configuration.name];

  return value ? (
    <CheckIcon className="icon icon-true" />
  ) : (
    <CrossIcon className="icon icon-false" />
  );
}
