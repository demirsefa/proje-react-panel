/**
 * Otomatik sayfa boyutunun iki girdisi var ve ikisi ayri yollardan geliyor:
 *
 * - Datagrid'in yuksekligi OLCULUR. Tuketici kutuphanenin liste CSS'ini
 *   kullanmak zorunda degil (kendi kabugunu yazan bir panelde datagrid ne
 *   `100vh - 120px`'tir ne de baska bir sabit), dolayisiyla buraya px yazmak
 *   sessizce yanlislanacak bir varsayim olurdu.
 * - Satir yuksekligi BEYAN EDILIR ve tabloya dayatilir (`@List({ rowHeight })`).
 *   Olculmuyor: olcmek icin once satirin render olmasi, yani bir istek atilmis
 *   olmasi gerekirdi; dogru limit ikinci bir istek demek olurdu.
 */

/** Olcum yapilamadiginda (SSR, jsdom, yukseklik 0) kullanilan sayfa boyutu. */
export const LIST_FALLBACK_LIMIT = 10;

/**
 * Satirin varsayilan yuksekligi (px): hucre dolgusu + satir kutusu + alt cizgi.
 * Satirini kendi CSS'iyle degistiren ya da `image` gibi yuksek hucre tasiyan
 * tuketici `@List({ rowHeight })` ile kendi olcusunu verir.
 */
export const LIST_ROW_HEIGHT = 44;

/**
 * Otomatik hesabin tabani ve tavani: cok kisa ekranda kullanilamaz bir liste,
 * cok uzun ekranda sunucuyu doven bir sorgu cikmasin.
 */
export const LIST_MIN_LIMIT = 5;
export const LIST_MAX_LIMIT = 100;

/**
 * Datagrid'e kac satir sigiyorsa o kadar kayit iste. Tablo basligi da o alanin
 * icinde duruyor, o yuzden bir satir dusuluyor; dusulmezse hesap tam bir satir
 * tasar ve otomatik boyut kendi amacinin tersine scroll uretir.
 */
export function calculateListLimit(containerHeight: number, rowHeight = LIST_ROW_HEIGHT): number {
  if (!Number.isFinite(containerHeight) || containerHeight <= 0 || rowHeight <= 0) {
    return LIST_FALLBACK_LIMIT;
  }

  const rows = Math.floor(containerHeight / rowHeight) - 1;
  return Math.min(LIST_MAX_LIMIT, Math.max(LIST_MIN_LIMIT, rows));
}
