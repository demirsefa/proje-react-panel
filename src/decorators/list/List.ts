import 'reflect-metadata';
import { AnyClass, AnyClassConstructor } from '../../types/AnyClass';

const LIST_METADATA_KEY = 'ListMetaData';

export interface GetDataParams {
  page?: number;
  limit?: number;
  //TODO: fix this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filters?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export type GetDataForList<T> = (params: GetDataParams) => Promise<PaginatedResponse<T>>;

export interface ListHeaderOptions {
  title?: string;
  create?: { path: string; label: string };
}

export interface ListActionOptions<T> {
  customActions?: { label: string; onClick: (item: T) => void; icon?: string }[];
  details?: { path: string; label: string };
  edit?: { path: string; label: string };
  delete?: { label: string; onRemoveItem?: (item: T) => Promise<void> };
}

export interface ListOptions<T> {
  getData: GetDataForList<T>;
  headers?: ListHeaderOptions;
  actions?: ((item: T) => ListActionOptions<T>) | ListActionOptions<T>;
  primaryId?: string;
  key?: string;
  /**
   * Sayfa boyutunu ekrana sigan satir sayisindan hesapla. Varsayilan acik:
   * sabit bir sayfa boyutu (ornegin 10) buyuk ekranda tablonun altinda kocaman
   * bir bosluk birakiyordu — datagrid yuksekligi viewport'a civili.
   * Kapatirsan `getData` limit'i eskisi gibi kendi belirler.
   */
  autoCalculate?: boolean;
  /**
   * Satir yuksekligi (px). Sadece bir bilgi degil, tabloya UYGULANIR: satira
   * bu yukseklik verilir ve hucre icerigi (ornegin gorsel) buna kirpilir.
   * Boylece beyan ile gercek asla ayrisamaz. Yalnizca satirini kendi CSS'iyle
   * degistiren ya da `image` gibi yuksek hucre tasiyan listelerde gerekir;
   * verilmezse kutuphanenin kendi olcusu (`LIST_ROW_HEIGHT`) kullanilir.
   */
  rowHeight?: number;
}

export type ListConfiguration<T> = ListOptions<T> & {
  key: string;
};

export function List<T>(options?: ListOptions<T> | ((item: T) => ListOptions<T>)): ClassDecorator {
  return (target: object) => {
    if (options) {
      Reflect.defineMetadata(LIST_METADATA_KEY, options, target);
    }
  };
}

export function getListConfiguration<T extends AnyClass>(
  entityClass: AnyClassConstructor<T>
): ListConfiguration<T> {
  const listConfiguration: ListOptions<T> = Reflect.getMetadata(LIST_METADATA_KEY, entityClass);
  if (!listConfiguration) {
    throw new Error('List decerator should be used on class');
  }
  return {
    ...listConfiguration,
    primaryId: listConfiguration.primaryId,
    key: listConfiguration.key || entityClass.name,
  };
}
