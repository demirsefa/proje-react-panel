import React from 'react';
import { CellConfiguration } from '../../../decorators/list/Cell';
import { AnyClass } from '../../../types/AnyClass';

interface DefaultCellProps {
  item: AnyClass;
  configuration: CellConfiguration;
}

export function DefaultCell({ item, configuration }: DefaultCellProps): React.ReactElement {
  const value = item[configuration.name];
  return <>{value ? value.toString() : configuration.placeHolder}</>;
}
