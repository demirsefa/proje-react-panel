import React from 'react';
import { Link } from 'react-router';
import { EmptyList } from './EmptyList';
import SearchIcon from '../../assets/icons/svg/search.svg';
import PencilIcon from '../../assets/icons/svg/pencil.svg';
import DownArrowIcon from '../../assets/icons/svg/down-arrow-backup-2.svg';
import TrashIcon from '../../assets/icons/svg/trash.svg';
import { ListPageMeta } from '../../decorators/list/getListPageMeta';
import { AnyClass } from '../../types/AnyClass';
import { CellField } from './CellField';
import { CellConfiguration } from '../../decorators/list/Cell';
import { useAppStore } from '../../store/store';

interface DatagridProps<T extends AnyClass> {
  data: T[];
  listPageMeta: ListPageMeta<T>;
  onRemoveItem?: (item: T) => Promise<void>;
}

export function Datagrid<T extends AnyClass>({
  data,
  listPageMeta,
  onRemoveItem,
}: DatagridProps<T>) {
  const cells = listPageMeta.cells;
  const listData = useAppStore(state => state.listData[listPageMeta.class.key]);
  const listGeneralCells = data?.[0]
    ? typeof listPageMeta.class.cells === 'function'
      ? listPageMeta.class.cells?.(data[0])
      : listPageMeta.class.cells
    : null;

  return (
    <div className="datagrid">
      {!data || data.length === 0 ? (
        <EmptyList />
      ) : (
        <table className="datagrid-table">
          <thead>
            <tr>
              {cells.map(cellOptions => (
                <th
                  key={cellOptions.name}
                  style={{ width: cellOptions.style?.width, minWidth: cellOptions.style?.minWidth }}
                >
                  {cellOptions.title ?? cellOptions.name}
                </th>
              ))}
              {(listGeneralCells?.details ||
                listGeneralCells?.edit ||
                listGeneralCells?.delete) && <th style={{ width: '30px' }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const listCells = item
                ? typeof listPageMeta.class.cells === 'function'
                  ? listPageMeta.class.cells?.(item)
                  : listPageMeta.class.cells
                : null;
              const listDataItem = listPageMeta.class.primaryId
                ? (listData?.[item[listPageMeta.class.primaryId!] as string] as
                    | Record<string, unknown>
                    | undefined)
                : null;
              return (
                <tr key={index}>
                  {cells.map((configuration: CellConfiguration) => {
                    return (
                      <CellField
                        key={configuration.name}
                        item={{
                          ...(listDataItem ?? {}),
                          ...item,
                        }}
                        configuration={configuration}
                      />
                    );
                  })}
                  {(listCells?.details || listCells?.edit || listCells?.delete) && (
                    <td style={{ width: '30px' }}>
                      <div className="util-cell-actions">
                        <p className="util-cell-actions-label">
                          Actions <DownArrowIcon className="icon icon-down" />
                        </p>
                        <ul className="util-cell-actions-list">
                          {listCells?.details && (
                            <li>
                              <Link to={listCells.details.path} className="util-cell-link">
                                <SearchIcon className="icon icon-search" />
                                <span className="util-cell-label">{listCells.details.label}</span>
                              </Link>
                            </li>
                          )}
                          {listCells?.edit && (
                            <li>
                              <Link to={listCells.edit.path} className="util-cell-link">
                                <PencilIcon className="icon icon-pencil" />
                                <span className="util-cell-label">{listCells.edit.label}</span>
                              </Link>
                            </li>
                          )}
                          {listCells?.delete && (
                            <li>
                              <a
                                onClick={() => {
                                  listCells.delete
                                    ?.onRemoveItem?.(item)
                                    .then(() => {
                                      onRemoveItem?.(item);
                                    })
                                    .catch((e: unknown) => {
                                      console.error(e);
                                      const message =
                                        e instanceof Error ? e.message : 'Error deleting item';
                                      alert(message);
                                    });
                                }}
                                className="util-cell-link util-cell-link-remove"
                              >
                                <TrashIcon className="icon icon-trash" />
                                <span className="util-cell-label">{listCells.delete.label}</span>
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
