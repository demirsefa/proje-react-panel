import React from 'react';
import { CellConfiguration } from '../../../decorators/list/Cell';
import { ImageCellConfiguration } from '../../../decorators/list/cells/ImageCell';
interface ImageCellProps {
  value: string;
  configuration: CellConfiguration;
}

export function ImageCell({ value, configuration }: ImageCellProps) {
  const imageConfiguration = configuration as ImageCellConfiguration;
  if (!value) return <>-</>;

  return (
    <img
      width={100}
      height={100}
      src={imageConfiguration.baseUrl + value}
      style={{ objectFit: 'contain' }}
      alt=""
    />
  );
}
