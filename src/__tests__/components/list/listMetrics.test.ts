import { describe, expect, it } from '@jest/globals';
import {
  LIST_FALLBACK_LIMIT,
  LIST_MAX_LIMIT,
  LIST_MIN_LIMIT,
  LIST_ROW_HEIGHT,
  calculateListLimit,
} from '../../../components/list/listMetrics';

describe('calculateListLimit', () => {
  it('istenen satirlar konteynere sigar, bir fazlasi sigmaz', () => {
    const containerHeight = 780;
    const limit = calculateListLimit(containerHeight);

    // Tablo basligi da konteynerin icinde; onun icin bir satirlik yer ayriliyor.
    // Toplam konteyneri asiyorsa otomatik boyut kendi amacinin tersine scroll
    // uretiyor demektir.
    expect((limit + 1) * LIST_ROW_HEIGHT).toBeLessThanOrEqual(containerHeight);
    expect((limit + 2) * LIST_ROW_HEIGHT).toBeGreaterThan(containerHeight);
  });

  it('yuksek satirda daha az kayit ister', () => {
    expect(calculateListLimit(780, 124)).toBeLessThan(calculateListLimit(780));
  });

  it('cok kisa konteynerde tabana, cok uzununda tavana yapisir', () => {
    expect(calculateListLimit(120)).toBe(LIST_MIN_LIMIT);
    expect(calculateListLimit(100000)).toBe(LIST_MAX_LIMIT);
  });

  it('olculemeyen degerlerde fallback limit doner', () => {
    expect(calculateListLimit(Number.NaN)).toBe(LIST_FALLBACK_LIMIT);
    expect(calculateListLimit(780, 0)).toBe(LIST_FALLBACK_LIMIT);
    expect(calculateListLimit(0)).toBe(LIST_FALLBACK_LIMIT);
  });
});
