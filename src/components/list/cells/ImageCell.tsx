import React from 'react';
import { CellConfiguration } from '../../../decorators/list/Cell';
import { ImageCellConfiguration } from '../../../decorators/list/cells/ImageCell';
import { AnyClass } from '../../../types/AnyClass';

interface ImageCellProps {
  item: AnyClass;
  configuration: CellConfiguration;
}

export function ImageCell({ item, configuration }: ImageCellProps) {
  const imageConfiguration = configuration as ImageCellConfiguration;
  const value = item[configuration.name];
  if (!value) return <>-</>;

  return (
    // maxWidth sart: sabit tablo duzeninde kolon 100px'ten dar kalabiliyor ve
    // hucre tasmayi kirptigi icin gorsel sessizce yarim gorunurdu. Kucultmek
    // kirpmaktan iyi; objectFit: contain oranı koruyor.
    <img
      width={100}
      height={100}
      src={imageConfiguration.baseUrl + value}
      style={{ objectFit: 'contain', maxWidth: '100%' }}
      alt=""
    />
  );
}
