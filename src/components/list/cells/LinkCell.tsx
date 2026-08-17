import React from 'react';
import { CellConfiguration } from '../../../decorators/list/Cell';
import { LinkCellConfiguration } from '../../../decorators/list/cells/LinkCell';
import { Link } from 'react-router';

interface LinkCellProps<T> {
  item: T;
  configuration: CellConfiguration;
}

/**
 * `@LinkCell({ path: '/users/:id' })` yazan model sahibi, satirin `id`'siyle dolmus
 * bir adres bekliyor — router path'i zaten oyle okunuyor. Ikame edilmezse `:id`
 * harfi harfine adrese giriyor ve hucredeki her open/edit linki 404'e cikiyor:
 * gorunuste calisan, tiklaninca bozuk bir link. Eslesmeyen bir parametre oldugu
 * gibi birakilir (silinmez) — boylece eksik alan gorunur kalir, sessizce
 * `/users/undefined` uretilmez.
 */
function resolvePath<T>(path: string, item: T): string {
  return path.replace(/:(\w+)/g, (match, key: string) => {
    const value = (item as Record<string, unknown>)[key];
    return value != null ? String(value) : match;
  });
}

export function LinkCell<T>({ item, configuration }: LinkCellProps<T>) {
  const linkConfiguration = configuration as LinkCellConfiguration<T>;
  const value = item[configuration.name as keyof T] ?? 'Link';

  return (
    <Link
      to={resolvePath(
        linkConfiguration.path ?? linkConfiguration.url ?? '',
        item
      )}
    >
      {linkConfiguration.onClick ? (
        <a
          className="util-cell-link"
          onClick={() => {
            linkConfiguration.onClick?.(item as T);
          }}
        >
          {value?.toString()}
        </a>
      ) : (
        value?.toString() || linkConfiguration.placeHolder
      )}
    </Link>
  );
}
