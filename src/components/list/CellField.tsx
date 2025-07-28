import React from 'react';
import { AnyClass } from '../../types/AnyClass';
import { CellConfiguration } from '../../decorators/list/Cell';
import { BooleanCell } from './cells/BooleanCell';
import { DateCell } from './cells/DateCell';
import { ImageCell } from './cells/ImageCell';
import { UUIDCell } from './cells/UUIDCell';
import { DefaultCell } from './cells/DefaultCell';
import { DownloadCell } from './cells/DownloadCell';
import { LinkCell } from './cells/LinkCell';

interface CellFieldProps<T extends AnyClass> {
  configuration: CellConfiguration;
  item: T;
}

export function CellField<T extends AnyClass>({
  configuration,
  item,
}: CellFieldProps<T>): React.ReactElement {
  let render;

  switch (configuration.type) {
    case 'boolean':
      render = <BooleanCell item={item} configuration={configuration} />;
      break;
    case 'date':
      render = <DateCell item={item} configuration={configuration} />;
      break;
    case 'image':
      render = <ImageCell item={item} configuration={configuration} />;
      break;
    case 'uuid':
      render = <UUIDCell item={item} configuration={configuration} />;
      break;
    case 'download':
      render = <DownloadCell item={item} configuration={configuration} />;
      break;
    case 'link':
      render = <LinkCell item={item} configuration={configuration} />;
      break;
    default:
      render = <DefaultCell item={item} configuration={configuration} />;
      break;
  }
  const width = configuration.style?.width;
  const minWidth = configuration.style?.minWidth;
  return (
    <td
      key={configuration.name}
      style={{
        minWidth,
        width,
      }}
    >
      {render}
    </td>
  );
}
