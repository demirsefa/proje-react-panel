import React from 'react';
import { CellConfiguration } from '../../../decorators/list/Cell';

interface DefaultCellProps {
  //TODO: any is not a good solution, we need to find a better way to do this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  configuration: CellConfiguration;
}

export function DefaultCell({ value, configuration }: DefaultCellProps): React.ReactElement {
  return <>{value ? value.toString() : configuration.placeHolder}</>;
}
