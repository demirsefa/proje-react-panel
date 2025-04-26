import React from 'react';
import CheckIcon from '../../../assets/icons/svg/check.svg';
import CrossIcon from '../../../assets/icons/svg/cross.svg';

interface BooleanCellProps {
  value: boolean;
}

export function BooleanCell({ value }: BooleanCellProps) {
  return value ? (
    <CheckIcon className="icon icon-true" />
  ) : (
    <CrossIcon className="icon icon-false" />
  );
}
