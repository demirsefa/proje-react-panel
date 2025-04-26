import React from 'react';

interface DateCellProps {
  value: string | number | Date;
}

export function DateCell({ value }: DateCellProps) {
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
