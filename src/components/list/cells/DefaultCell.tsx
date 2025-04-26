import React from 'react';
import { CellConfiguration } from '../../../decorators/list/Cell';

interface DefaultCellProps {
  value: any;
  configuration: CellConfiguration;
}

export function DefaultCell({ value, configuration }: DefaultCellProps): React.ReactElement {
  return <>{value ? value.toString() : configuration.placeHolder}</>;
}
