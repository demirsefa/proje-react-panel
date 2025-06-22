import { SelectPreloader } from '../decorators/form/inputs/SelectInput';

export type OnResult<T> = (result: { label: string; value: T }[]) => void;

class PreloadCacheHelper {
  private static instance: PreloadCacheHelper;
  private cache: Map<SelectPreloader<unknown>, { label: string; value: unknown }[]>;
  private asyncQueue: Map<SelectPreloader<unknown>, OnResult<unknown>[]>;

  private constructor() {
    this.cache = new Map();
    this.asyncQueue = new Map();
  }

  public async setOrGetCache<T>(key: SelectPreloader<T>, onResult: OnResult<T>): Promise<void> {
    if (this.cache.has(key)) {
      onResult(this.cache.get(key) as { label: string; value: T }[]);
      return;
    }
    if (this.asyncQueue.get(key) === undefined) {
      this.asyncQueue.set(key, []);
    }
    const length = this.asyncQueue.get(key)!.length;
    if (!this.asyncQueue.get(key)!.includes(onResult as OnResult<unknown>)) {
      this.asyncQueue.get(key)?.push(onResult as OnResult<unknown>);
    } else {
      return;
    }
    if (length > 0) {
      return;
    }

    const result = await key();
    this.cache.set(key, result);
    this.asyncQueue.get(key)?.forEach(onResult => onResult(result));
    this.asyncQueue.delete(key);
  }

  public static getInstance() {
    if (!PreloadCacheHelper.instance) {
      PreloadCacheHelper.instance = new PreloadCacheHelper();
    }
    return PreloadCacheHelper.instance;
  }
}

export const preloadCacheHelper = PreloadCacheHelper.getInstance();
