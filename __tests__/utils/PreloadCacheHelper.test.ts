import { OnResult, preloadCacheHelper } from '../../utils/PreloadCacheHelper';
import { SelectPreloader } from '../../decorators/form/inputs/SelectInput';
import { describe, expect, it, beforeEach, jest } from '@jest/globals';

interface CacheMap {
  cache: Map<SelectPreloader<unknown>, { label: string; value: unknown }[]>;
  asyncQueue: Map<
    SelectPreloader<unknown>,
    ((result: { label: string; value: unknown }[]) => Promise<void>)[]
  >;
}

describe('PreloadCacheHelper', () => {
  beforeEach(() => {
    // Clear the cache before each test
    (preloadCacheHelper as unknown as CacheMap).cache = new Map();
    (preloadCacheHelper as unknown as CacheMap).asyncQueue = new Map();
  });

  it('should maintain singleton instance', () => {
    const instance1 = preloadCacheHelper;
    const instance2 = preloadCacheHelper;
    expect(instance1).toBe(instance2);
  });
});
