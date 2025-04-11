import React from 'react';
import { CellOptions } from '../../decorators/list/Cell';
import { Link } from 'react-router';
import { useAppStore } from '../../store/store';
import { ImageCellOptions } from '../../decorators/list/ImageCell';

interface ListProps<T> {
  data: T[];
  cells: CellOptions[];
}

export function Datagrid<T>({ data, cells }: ListProps<T>) {
  if (!data || data.length === 0) {
    return <div>No items available</div>;
  }

  return (
    <div className="list-wrapper">
      <div className="header">List</div>
      <table className="list-table">
        <thead>
          <tr>
            {cells.map(cellOptions => (
              <th key={cellOptions.name}>{cellOptions.title ?? cellOptions.name}</th>
            ))}
            <th />
            <th>Delete</th>
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
              <td>
                {/*@ts-ignore*/}
                <Link to={'edit/' + (item?.id ?? '-')}>Edit</Link>
                {/*@ts-ignore*/}
                <Link to={'details/' + (item?.id ?? '-')}>Details</Link>
              </td>
              <td>
                <button
                  onClick={() => {
                    /*@ts-ignore*/
                    //CrudApi.delete({ ...fetchSettings, token }, screen.controller, item?.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
