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
    //
    // maxHeight ayni isi dikeyde yapiyor: gorsel satir yuksekliginden uzun
    // olursa satiri tek basina buyutur ve otomatik sayfa boyutunun dayandigi
    // rowHeight yalan olurdu. Gorseli buyuk gormek isteyen liste
    // `@List({ rowHeight })` ile satiri buyutur.
    <img
      width={100}
      height={100}
      src={imageConfiguration.baseUrl + value}
      style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: 'var(--prp-list-row-height)' }}
      alt=""
    />
  );
}
