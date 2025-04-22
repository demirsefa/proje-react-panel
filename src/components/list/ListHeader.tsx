import React, { useMemo } from 'react';
import { Link } from 'react-router';
import { AnyClass } from '../../types/AnyClass';
import CreateIcon from '../../assets/icons/svg/create.svg';
import FilterIcon from '../../assets/icons/svg/filter.svg';
import { ListPageMeta } from '../../decorators/list/getListPageMeta';

interface ListHeaderProps<T extends AnyClass> {
  listPageMeta: ListPageMeta<T>;
  filtered: boolean;
  onFilterClick: () => void;
  customHeader?: React.ReactNode;
}

export function ListHeader<T extends AnyClass>({
  listPageMeta,
  filtered,
  onFilterClick,
  customHeader,
}: ListHeaderProps<T>) {
  const fields = useMemo(
    () => listPageMeta.cells.filter(cell => !!cell.filter),
    [listPageMeta.cells]
  );

  const header = listPageMeta.class.headers;
  return (
    <div className="list-header">
      <div className="header-title">{header?.title || 'List'}</div>
      {customHeader && <div className="header-custom">{customHeader}</div>}
      <div className="header-actions">
        {!!fields.length && (
          <button onClick={onFilterClick} className="filter-button">
            <FilterIcon className={`icon icon-filter ${filtered ? 'active' : ''}`} />
            Filter
          </button>
        )}
        {header?.create && (
          <Link to={header.create.path} className="create-button">
            <CreateIcon className="icon icon-create" />
            {header.create.label}
          </Link>
        )}
      </div>
    </div>
  );
}
