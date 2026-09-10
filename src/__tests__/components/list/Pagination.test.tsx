/**
 * @jest-environment jsdom
 */
import { TextDecoder, TextEncoder } from 'util';
// jsdom'da TextEncoder yok; testing-library'nin cektigi bagimliliklar import
// aninda okuyor.
Object.assign(globalThis, { TextEncoder, TextDecoder });

import React from 'react';
import { describe, expect, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { Pagination } from '../../../components/list/Pagination';

const lastPageButton = () => {
  const numbered = screen
    .getAllByRole('button')
    .map(button => Number(button.textContent))
    .filter(value => Number.isFinite(value) && value > 0);
  return Math.max(...numbered);
};

describe('Pagination', () => {
  it('eksik dolu son sayfayi da cizer', () => {
    // 2151 kayit / 10 limit = 216 sayfa. `floor` ile 215 ciziliyordu ve son
    // kayda hicbir sayfadan ulasilamiyordu.
    render(
      <Pagination pagination={{ total: 2151, page: 1, limit: 10 }} onPageChange={jest.fn()} />
    );
    expect(lastPageButton()).toBe(216);
  });

  it('ikinci sayfasi olan listede gizlenmez', () => {
    // total < 2*limit: `floor` 1 sayfa sanip pagination'i tamamen gizliyordu.
    render(<Pagination pagination={{ total: 15, page: 1, limit: 10 }} onPageChange={jest.fn()} />);
    expect(lastPageButton()).toBe(2);
  });

  it('tek sayfaya sigan listede cizilmez', () => {
    const { container } = render(
      <Pagination pagination={{ total: 8, page: 1, limit: 10 }} onPageChange={jest.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('limit gelmeden cizilmez', () => {
    // Liste ilk fetch'ini beklerken pagination state'i {0,0,0}; bolme NaN
    // uretip "NaN <= 1" false donuyordu.
    const { container } = render(
      <Pagination pagination={{ total: 0, page: 0, limit: 0 }} onPageChange={jest.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });
});
