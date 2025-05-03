import React, { useMemo, useCallback, useEffect, useState, useId } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Datagrid } from './Datagrid';
import { ErrorComponent } from '../ErrorComponent';
import { LoadingScreen } from '../LoadingScreen';
import { AnyClass, AnyClassConstructor } from '../../types/AnyClass';
import { Pagination } from './Pagination';
import { ListHeader } from './ListHeader';
import { FilterPopup } from './FilterPopup';
import { getListPageMeta } from '../../decorators/list/getListPageMeta';

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>();
  const params = useParams();
  const navigate = useNavigate();

  const fetchData = useCallback(
    async (page: number, filters?: Record<string, string>) => {
      setLoading(true);
      try {
        const result = await listPageMeta.class.getData({
          page,
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
    [activeFilters, listPageMeta.class]
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filtersFromUrl: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      filtersFromUrl[key] = value;
    });
    setActiveFilters(filtersFromUrl);
  }, []);

  useEffect(() => {
    if (activeFilters) {
      fetchData(parseInt(params.page as string) || 1, activeFilters);
    }
  }, [fetchData, params.page, activeFilters, listPageMeta.class.getData]);

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

  if (loading) return <LoadingScreen id={id} />;
  if (error) return <ErrorComponent id={id} error={error} />;

  return (
    <div className="list">
      <ListHeader
        listPageMeta={listPageMeta}
        filtered={!!(activeFilters && !!Object.keys(activeFilters).length)}
        onFilterClick={() => setIsFilterOpen(true)}
        customHeader={customHeader}
      />
      <Datagrid
        listPageMeta={listPageMeta}
        data={data}
        onRemoveItem={async () => {
          await fetchData(pagination.page);
        }}
      />
      <div className="list-footer">
        <Pagination pagination={pagination} onPageChange={fetchData} />
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
