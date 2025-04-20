import React from 'react';
import { CellOptions } from '../../decorators/list/Cell';
import { Link } from 'react-router';
import { useAppStore } from '../../store/store';
import { ImageCellOptions } from '../../decorators/list/ImageCell';
import { ListData } from '../../decorators/list/ListData';
import { EmptyList } from './EmptyList';
import SearchIcon from '../../assets/icons/svg/search.svg';
import PencilIcon from '../../assets/icons/svg/pencil.svg';
import TrashIcon from '../../assets/icons/svg/trash.svg';

interface ListProps<T extends { id: string }> {
  data: T[];
  listData: ListData;
}

export function Datagrid<T extends { id: string }>({ data, listData }: ListProps<T>) {
  const cells = listData.cells;
  const utilCells = listData.list?.utilCells;

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
              {utilCells?.details && <th>Details</th>}
              {utilCells?.edit && <th>Edit</th>}
              {utilCells?.delete && <th>Delete</th>}
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
                {utilCells?.details && (
                  <td>
                    <Link to={`${utilCells.details.path}/${item.id}`} className="util-cell-link">
                      <SearchIcon className="util-cell-icon" />
                      <span className="util-cell-label">{utilCells.details.label}</span>
                    </Link>
                  </td>
                )}
                {utilCells?.edit && (
                  <td>
                    <Link to={`${utilCells.edit.path}/${item.id}`} className="util-cell-link">
                      <PencilIcon className="util-cell-icon" />
                      <span className="util-cell-label">{utilCells.edit.label}</span>
                    </Link>
                  </td>
                )}
                {utilCells?.delete && (
                  <td>
                    <Link to={`${utilCells.delete.path}/${item.id}`} className="util-cell-link">
                      <TrashIcon className="util-cell-icon" />
                      <span className="util-cell-label">{utilCells.delete.label}</span>
                    </Link>
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
