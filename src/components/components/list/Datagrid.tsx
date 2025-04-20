import React from 'react';
import { CellOptions } from '../../../decorators/list/Cell';
import { Link } from 'react-router';
import { useAppStore } from '../../../store/store';
import { ImageCellOptions } from '../../../decorators/list/ImageCell';
import { ListData } from '../../../decorators/list/ListData';
import { EmptyList } from './EmptyList';
import SearchIcon from '../../../assets/icons/svg/search.svg';
import PencilIcon from '../../../assets/icons/svg/pencil.svg';
import TrashIcon from '../../../assets/icons/svg/trash.svg';

interface DatagridProps<T> {
  data: T[];
  listData: ListData<T>;
  onRemoveItem?: (item: T) => Promise<void>;
}

export function Datagrid<T>({ data, listData, onRemoveItem }: DatagridProps<T>) {
  const cells = listData.cells;
  const listGeneralCells =
    typeof listData.list?.cells === 'function'
      ? listData.list?.cells?.(data[0])
      : listData.list?.cells;

  return (
    <div className="datagrid">
      {!data || data.length === 0 ? (
        <EmptyList />
      ) : (
        <table className="datagrid-table">
          <thead>
            <tr>
              {cells.map(cellOptions => (
                <th key={cellOptions.name}>{cellOptions.title ?? cellOptions.name}</th>
              ))}
              {listGeneralCells?.details && <th>Details</th>}
              {listGeneralCells?.edit && <th>Edit</th>}
              {listGeneralCells?.delete && <th>Delete</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {cells.map(cellOptions => {
                  // @ts-ignore
                  const value = item[cellOptions.name];
                  let render = value ?? '-'; // Default value if the field is undefined or null

                  switch (cellOptions.type) {
                    case 'date':
                      if (value) {
                        const date = new Date(value);
                        render = `${date.getDate().toString().padStart(2, '0')}/${(
                          date.getMonth() + 1
                        )
                          .toString()
                          .padStart(
                            2,
                            '0'
                          )}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date
                          .getMinutes()
                          .toString()
                          .padStart(2, '0')}`;
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
                    case 'string':
                    default:
                      render = value ? value.toString() : (cellOptions?.placeHolder ?? '-'); // Handles string type or default fallback
                      break;
                  }
                  /*
								if (cellOptions.linkTo) {
									render = <Link to={cellOptions.linkTo(item)}>{formattedValue}</Link>;
								}
*/
                  return <td key={cellOptions.name}>{render}</td>;
                })}
                {listGeneralCells?.details && (
                  <td>
                    <Link to={listGeneralCells.details.path} className="util-cell-link">
                      <SearchIcon className="icon icon-search" />
                      <span className="util-cell-label">{listGeneralCells.details.label}</span>
                    </Link>
                  </td>
                )}
                {listGeneralCells?.edit && (
                  <td>
                    <Link to={listGeneralCells.edit.path} className="util-cell-link">
                      <PencilIcon className="icon icon-pencil" />
                      <span className="util-cell-label">{listGeneralCells.edit.label}</span>
                    </Link>
                  </td>
                )}
                {listGeneralCells?.delete && (
                  <td>
                    <a
                      onClick={() => {
                        onRemoveItem?.(item);
                      }}
                      className="util-cell-link"
                    >
                      <TrashIcon className="icon icon-trash" />
                      <span className="util-cell-label">{listGeneralCells.delete.label}</span>
                    </a>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
