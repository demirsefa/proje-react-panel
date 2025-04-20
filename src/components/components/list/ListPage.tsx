import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router';
import { Datagrid } from './Datagrid';
import { ErrorComponent } from '../ErrorComponent';
import { LoadingScreen } from '../LoadingScreen';
import { AnyClass } from '../../../types/AnyClass';
import { getListFields } from '../../../decorators/list/getListFields';
import { Pagination } from './Pagination';
import { ListData } from '../../../decorators/list/ListData';
import CreateIcon from '../../../assets/icons/svg/create.svg';
import FilterIcon from '../../../assets/icons/svg/filter.svg';
import { FilterPopup } from './FilterPopup';

export interface GetDataParams {
  page?: number;
  limit?: number;
  filters?: Record<string, any>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export type GetDataForList<T> = (params: GetDataParams) => Promise<PaginatedResponse<T>>;

function ListHeader<T extends AnyClass>({
  listData,
  filtered,
  onFilterClick,
  customHeader,
}: {
  listData: ListData<T>;
  filtered: boolean;
  onFilterClick: () => void;
  customHeader?: React.ReactNode;
}) {
  const fields = useMemo(() => listData.cells.filter(cell => !!cell.filter), [listData.cells]);

  const header = listData.list?.headers;
  return (
    <div className="list-header">
      <div className="header-title">{header?.title || 'List'}</div>
      {customHeader && <div className="header-custom">{customHeader}</div>}
      <div className="header-actions">
        {!!fields.length && (
          <button onClick={onFilterClick} className="filter-button">
            <FilterIcon className={`icon icon-filter ${filtered ? 'active' : ''}`} />
            Filter
          </button>
        )}
        {header?.create && (
          <Link to={header.create.path} className="create-button">
            <CreateIcon className="icon icon-create" />
            {header.create.label}
          </Link>
        )}
      </div>
    </div>
  );
}

export function ListPage<T extends AnyClass>({
  model,
  getData,
  onRemoveItem,
  customHeader,
}: {
  model: any;
  getData: GetDataForList<T>;
  customHeader?: React.ReactNode;
  onRemoveItem?: (item: T) => Promise<void>;
}) {
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, page: 0, limit: 0 });
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<unknown>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>();
  const listData = useMemo(() => getListFields(model), [model]);
  const params = useParams();
  const navigate = useNavigate();

  const fetchData = useCallback(
    async (page: number, filters?: Record<string, string>) => {
      setLoading(true);
      try {
        const result = await getData({ page, filters: filters ?? activeFilters ?? {} });
        setData(result.data);
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
    [getData, activeFilters]
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filtersFromUrl: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      filtersFromUrl[key] = value;
    });
    setActiveFilters(filtersFromUrl);
  }, [location.search]);

  useEffect(() => {
    if (activeFilters) {
      fetchData(parseInt(params.page as string) || 1, activeFilters);
    }
  }, [fetchData, params.page, activeFilters]);

  const handleFilterApply = (filters: Record<string, any>) => {
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

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorComponent error={error} />;

  return (
    <div className="list">
      <ListHeader
        listData={listData}
        filtered={!!(activeFilters && !!Object.keys(activeFilters).length)}
        onFilterClick={() => setIsFilterOpen(true)}
        customHeader={customHeader}
      />
      <Datagrid
        listData={listData}
        data={data}
        onRemoveItem={async (item: T) => {
          if (onRemoveItem) {
            if (
              confirm('Are you sure you want to delete this item? This action cannot be undone.')
            ) {
              await onRemoveItem(item);
              //setData(data.filter((d: T) => d.id !== item.id));
              await fetchData(pagination.page);
            }
          }
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
        listData={listData}
      />
    </div>
  );
}
