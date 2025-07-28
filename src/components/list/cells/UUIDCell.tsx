import React from 'react';
import { AnyClass } from '../../../types/AnyClass';
import { CellConfiguration } from '../../../decorators/list/Cell';

interface UUIDCellProps {
  item: AnyClass;
  configuration: CellConfiguration;
}

export function UUIDCell({ item, configuration }: UUIDCellProps) {
  const value = item[configuration.name];
  if (!value || typeof value !== 'string' || value.length < 6) return <>-</>;

  return <>{`${value.slice(0, 3)}...${value.slice(-3)}`}</>;
}
