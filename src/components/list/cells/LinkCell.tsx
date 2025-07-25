import React from 'react';
import { CellConfiguration } from '../../../decorators/list/Cell';
import { LinkCellConfiguration } from '../../../decorators/list/cells/LinkCell';
import { Link } from 'react-router';

interface LinkCellProps<T> {
  item: T;
  configuration: CellConfiguration;
}

export function LinkCell<T>({ item, configuration }: LinkCellProps<T>) {
  const linkConfiguration = configuration as LinkCellConfiguration<T>;
  const value = item[configuration.name as keyof T] ?? 'Link';

  return (
    <Link to={linkConfiguration.path ?? linkConfiguration.url ?? ''}>
      {linkConfiguration.onClick ? (
        <button
          onClick={() => {
            linkConfiguration.onClick?.(item as T);
          }}
        >
          {value?.toString()}
        </button>
      ) : (
        value?.toString() || linkConfiguration.placeHolder
      )}
    </Link>
  );
}
