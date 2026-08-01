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
import { CellField } from '../../../components/list/CellField';
import { CellConfiguration } from '../../../decorators/list/Cell';

// Tablo `table-layout: fixed` kullaniyor: kolon genisligi sabit ve tasan metin
// ellipsis'e dusuyor. Kesilen degeri okumanin tek yolu hucrenin tooltip'i.
const cell = (over: Partial<CellConfiguration> = {}): CellConfiguration => ({
  name: 'description',
  type: 'string',
  ...over,
});

const titleOf = (configuration: CellConfiguration, item: Record<string, unknown>) =>
  render(
    // Link hucresi react-router'in <Link>'ini basiyor, o da router context'i istiyor.
    <MemoryRouter>
      <table>
        <tbody>
          <tr>
            <CellField configuration={configuration} item={item} />
          </tr>
        </tbody>
      </table>
    </MemoryRouter>
  )
    .container.querySelector('td')
    ?.getAttribute('title');

describe("CellField — hucre tooltip'u", () => {
  it('metin hucresinde tam degeri title olarak verir', () => {
    const uzun = 'a'.repeat(400);

    expect(titleOf(cell(), { description: uzun })).toBe(uzun);
  });

  it('metin olmayan degerleri yaziya cevirir', () => {
    expect(titleOf(cell({ type: 'number' }), { description: 42 })).toBe('42');
  });

  // Bu hucreler metin degil element basiyor; ham url'i tooltip yapmak
  // kullaniciya bir sey anlatmiyor, yalnizca gurultu olurdu.
  it.each(['image', 'download', 'link'] as const)('%s hucresinde title vermez', type => {
    expect(titleOf(cell({ type, name: 'thumbnailUrl' }), { thumbnailUrl: '/uploads/x.png' })).toBe(
      null
    );
  });

  it.each([
    ['null', null],
    ['undefined', undefined],
    ['nesne', { a: 1 }],
  ])('%s degerde title vermez', (_ad, value) => {
    expect(titleOf(cell(), { description: value })).toBe(null);
  });
});
