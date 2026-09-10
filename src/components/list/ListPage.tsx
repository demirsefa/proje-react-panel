import React, {
  useMemo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useId,
} from 'react';
import { useParams, useNavigate } from 'react-router';
import { Datagrid } from './Datagrid';
import { ErrorComponent } from '../ErrorComponent';
import { AnyClass, AnyClassConstructor } from '../../types/AnyClass';
import { Pagination } from './Pagination';
import { ListHeader } from './ListHeader';
import { FilterPopup } from './FilterPopup';
import { getListPageMeta } from '../../decorators/list/getListPageMeta';
import { LIST_ROW_HEIGHT, calculateListLimit } from './listMetrics';

const RESIZE_DEBOUNCE_MS = 200;

export function ListPage<T extends AnyClass>({
  model,
  customHeader,
}: {
  model: AnyClassConstructor<T>;
  customHeader?: React.ReactNode;
}) {
  const id = useId();
  const listPageMeta = useMemo(() => getListPageMeta(model), [model]);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<unknown>(null);

  const [pagination, setPagination] = useState({ total: 0, page: 0, limit: 0 });

  const rowHeight = listPageMeta.class.rowHeight ?? LIST_ROW_HEIGHT;
  const autoCalculate = listPageMeta.class.autoCalculate ?? true;

  const datagridRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);

  // undefined: limit gonderme (autoCalculate kapali). null: henuz olculmedi,
  // yanlis boyutla bir istek atmaktansa bekle.
  const limit = !autoCalculate
    ? undefined
    : containerHeight === null
      ? null
      : calculateListLimit(containerHeight, rowHeight);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>();
  const params = useParams();
  const navigate = useNavigate();

  // Gorsel hucresi satiri kutuphanenin olcusunun cok uzerine cikariyor; tablo
  // artik satiri kirptigi icin bunu soylemeden birakmak gorseli sessizce
  // kucultmek olurdu. Uretim derlemesinde sussun, tuketicinin konsolunu
  // kirletmeyelim.
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;
    if (listPageMeta.class.rowHeight !== undefined) return;
    if (!listPageMeta.cells.some(cell => cell.type === 'image')) return;

    console.warn(
      `[proje-react-panel] "${listPageMeta.class.key}" listesinde gorsel hucresi var ` +
        `ama rowHeight verilmemis; satir ${LIST_ROW_HEIGHT}px'e kirpilacak. ` +
        `@List({ rowHeight: ... }) ile gorselin sigacagi yuksekligi bildir.`
    );
  }, [listPageMeta]);

  const fetchData = useCallback(
    async (page: number, filters?: Record<string, string>) => {
      setLoading(true);
      try {
        const result = await listPageMeta.class.getData({
          page,
          // autoCalculate kapaliysa limit hic gonderilmez: sayfa boyutunu
          // eskisi gibi `getData`/sunucu belirlesin.
          ...(limit ? { limit } : {}),
          filters: filters ?? activeFilters ?? {},
        });
        //TODO: any is not a good solution, we need to find a better way to do this
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setData(result.data as any);
        setPagination({
          total: result.total,
          page: result.page,
          limit: result.limit,
        });
      } catch (e) {
        setError(e);
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [activeFilters, limit, listPageMeta.class]
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filtersFromUrl: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      filtersFromUrl[key] = value;
    });
    setActiveFilters(filtersFromUrl);
  }, []);

  // Datagrid ilk boyamadan once olculuyor: veri beklerken de render edildigi
  // icin yuksekligi hazir, yani dogru limit ILK istekte kullanilabiliyor.
  // Olcum penceye degil elemana bakiyor; tuketicinin kabugu (sidebar, baslik,
  // dolgu) ne kadar yer kaplarsa kaplasin hesap dogru kaliyor.
  //
  // ResizeObserver yerine window resize: icerik buyudukce buyuyen bir
  // konteynerde observer "daha cok satir iste -> daha uzun konteyner" dongusune
  // girebilirdi. Yuksekligi degistiren gercek olay zaten pencere boyutu.
  useLayoutEffect(() => {
    if (!autoCalculate) return;

    const measure = () => {
      const element = datagridRef.current;
      if (!element) return;
      const next = element.clientHeight;
      setContainerHeight(previous => (previous === next ? previous : next));
    };
    measure();

    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(measure, RESIZE_DEBOUNCE_MS);
    };

    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, [autoCalculate]);

  useEffect(() => {
    if (activeFilters && limit !== null) {
      fetchData(parseInt(params.page as string) || 1, activeFilters);
    }
  }, [fetchData, limit, params.page, activeFilters, listPageMeta.class.getData]);

  const handleFilterApply = (filters: Record<string, string>) => {
    setActiveFilters(filters);

    // Convert filters to URLSearchParams
    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    const newUrl = `${location.pathname}${queryString ? `?${queryString}` : ''}`;
    navigate(newUrl);
    fetchData(1, filters); // Reset to first page when filters change
  };

  // Yukleme ekrani artik sayfanin tamamini degil datagrid'in icini kapliyor:
  // konteyner ilk istekten once render olmazsa olculemez, olculemezse ilk
  // istek yanlis sayfa boyutuyla gider ve duzeltmek ikinci bir istek olurdu.
  if (error) return <ErrorComponent id={id} error={error} />;

  return (
    <div
      className="list"
      // Satir yuksekligi hucrelere de lazim (ornegin gorsel bu yukseklige
      // sigdiriliyor); tek kaynak yine `@List({ rowHeight })`.
      style={{ '--prp-list-row-height': `${rowHeight}px` } as React.CSSProperties}
    >
      <ListHeader
        listPageMeta={listPageMeta}
        filtered={!!(activeFilters && !!Object.keys(activeFilters).length)}
        onFilterClick={() => setIsFilterOpen(true)}
        customHeader={customHeader}
      />
      <Datagrid
        listPageMeta={listPageMeta}
        data={data}
        loading={loading}
        rowHeight={rowHeight}
        containerRef={datagridRef}
        onRemoveItem={async () => {
          await fetchData(pagination.page);
        }}
      />
      <div className="list-footer">
        <Pagination pagination={pagination} onPageChange={fetchData} />
        <p className="list-footer-total">
          TOTAL: {pagination.total} / SHOWING: {pagination.limit}
        </p>
      </div>
      <FilterPopup
        isOpen={isFilterOpen}
        activeFilters={activeFilters}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleFilterApply}
        listPageMeta={listPageMeta}
      />
    </div>
  );
}
