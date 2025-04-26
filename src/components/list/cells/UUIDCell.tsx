import React from 'react';

interface UUIDCellProps {
  value: string;
}

export function UUIDCell({ value }: UUIDCellProps) {
  if (!value || typeof value !== 'string' || value.length < 6) return <>-</>;

  return <>{`${value.slice(0, 3)}...${value.slice(-3)}`}</>;
}
