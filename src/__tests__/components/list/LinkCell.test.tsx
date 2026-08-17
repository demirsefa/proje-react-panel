/**
 * @jest-environment jsdom
 */
import { TextDecoder, TextEncoder } from 'util';
// react-router reads TextEncoder at import time and jsdom has none — set it up before the
// imports below pull the router in.
Object.assign(globalThis, { TextEncoder, TextDecoder });

import 'reflect-metadata';
import React from 'react';
import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { LinkCell } from '../../../components/list/cells/LinkCell';
import { CellConfiguration } from '../../../decorators/list/Cell';

// `@LinkCell({ path: '/users/:id' })` satirin verisiyle dolmalı. Ikame bozulursa
// hucredeki her open/edit linki gorunuste calisir ama tiklaninca 404 verir —
// tarayicida fark edilmesi zor, o yuzden burada kilitli.
const hrefOf = (configuration: CellConfiguration, item: Record<string, unknown>) =>
  render(
    <MemoryRouter>
      <table>
        <tbody>
          <tr>
            <td>
              <LinkCell configuration={configuration} item={item} />
            </td>
          </tr>
        </tbody>
      </table>
    </MemoryRouter>
  )
    .container.querySelector('a')
    ?.getAttribute('href');

const linkCell = (over: Partial<CellConfiguration> = {}): CellConfiguration =>
  ({
    name: 'open',
    type: 'link',
    placeHolder: 'open',
    ...over,
  }) as CellConfiguration;

describe('LinkCell path parameters', () => {
  it('substitutes a single :param from the row', () => {
    expect(hrefOf(linkCell({ path: '/users/:id' } as never), { id: 42 })).toBe(
      '/users/42'
    );
  });

  it('substitutes every :param in the path', () => {
    expect(
      hrefOf(linkCell({ path: '/workspaces/:workspaceId/users/:id' } as never), {
        workspaceId: 'ws-1',
        id: 7,
      })
    ).toBe('/workspaces/ws-1/users/7');
  });

  it('leaves an unmatched :param in place instead of writing undefined', () => {
    expect(hrefOf(linkCell({ path: '/users/:missing' } as never), { id: 1 })).toBe(
      '/users/:missing'
    );
  });

  it('passes a path with no parameters through untouched', () => {
    expect(hrefOf(linkCell({ path: '/users' } as never), { id: 1 })).toBe('/users');
  });
});
