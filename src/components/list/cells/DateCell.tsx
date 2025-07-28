import React from 'react';
import { AnyClass } from '../../../types/AnyClass';
import { CellConfiguration } from '../../../decorators/list/Cell';

interface DateCellProps {
  item: AnyClass;
  configuration: CellConfiguration;
}

export function DateCell({ item, configuration }: DateCellProps) {
  const value = item[configuration.name];
  if (!value) return <>-</>;

  const date = new Date(value);
  return (
    <>
      {`${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${date.getFullYear()} ${date
        .getHours()
        .toString()
        .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`}
    </>
  );
}
