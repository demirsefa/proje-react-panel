import React from 'react';
import { ImageCellOptions } from '../../decorators/list/cells/ImageCell';
import { AnyClass } from '../../types/AnyClass';
import { ExtendedCellTypes } from '../../decorators/list/Cell';
import CheckIcon from '../../assets/icons/svg/check.svg';
import CrossIcon from '../../assets/icons/svg/cross.svg';

interface CellFieldProps<T extends AnyClass> {
  cellOptions: any; // TODO: Create proper type for cellOptions
  item: T;
  value: any;
}

export function CellField<T extends AnyClass>({ cellOptions, item, value }: CellFieldProps<T>) {
  let render = value ?? '-'; // Default value if the field is undefined or null

  switch (cellOptions.type as ExtendedCellTypes) {
    case 'boolean': {
      render = value ? <CheckIcon className="icon icon-true" /> : <CrossIcon className="icon icon-false" />;
      break;
    }
    case 'date':
      if (value) {
        const date = new Date(value);
        render = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
          .toString()
          .padStart(2, '0')}/${date.getFullYear()} ${date
          .getHours()
          .toString()
          .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
      }
      break;

    case 'image': {
      const imageCellOptions = cellOptions as ImageCellOptions;
      render = (
        <img
          width={100}
          height={100}
          src={imageCellOptions.baseUrl + value}
          style={{ objectFit: 'contain' }}
        />
      );
      break;
    }
    case 'uuid':
      if (value && typeof value === 'string' && value.length >= 6) {
        render = `${value.slice(0, 3)}...${value.slice(-3)}`;
      }
      break;
    default:
      render = value ? value.toString() : (cellOptions?.placeHolder ?? '-');
      break;
  }

  /*
  if (cellOptions.linkTo) {
    render = <Link to={cellOptions.linkTo(item)}>{formattedValue}</Link>;
  }
  */

  return <td key={cellOptions.name}>{render}</td>;
}
