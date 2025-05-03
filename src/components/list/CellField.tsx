import React from 'react';
import { AnyClass } from '../../types/AnyClass';
import { CellConfiguration } from '../../decorators/list/Cell';
import { BooleanCell } from './cells/BooleanCell';
import { DateCell } from './cells/DateCell';
import { ImageCell } from './cells/ImageCell';
import { UUIDCell } from './cells/UUIDCell';
import { DefaultCell } from './cells/DefaultCell';
import { DownloadCell } from './cells/DownloadCell';

interface CellFieldProps<T extends AnyClass> {
  configuration: CellConfiguration;
  value: T[keyof T];
}

export function CellField<T extends AnyClass>({
  configuration,
  value,
}: CellFieldProps<T>): React.ReactElement {
  let render;

  switch (configuration.type) {
    case 'boolean':
      render = <BooleanCell value={value} />;
      break;
    case 'date':
      render = <DateCell value={value} />;
      break;
    case 'image':
      render = <ImageCell value={value} configuration={configuration} />;
      break;
    case 'uuid':
      render = <UUIDCell value={value} />;
      break;
    case 'download':
      render = <DownloadCell value={value} configuration={configuration} />;
      break;
    default:
      render = <DefaultCell value={value} configuration={configuration} />;
      break;
  }

  return <td key={configuration.name}>{render}</td>;
}
