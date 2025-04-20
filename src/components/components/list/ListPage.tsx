import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { Datagrid } from '../components/list/Datagrid';
import { ErrorComponent } from '../components/ErrorComponent';
import { LoadingScreen } from '../components/LoadingScreen';
import { AnyClass } from '../../types/AnyClass';
import { getListFields } from '../../decorators/list/getListFields';
import { Pagination } from '../components/list/Pagination';
import { ListData } from '../../decorators/list/ListData';
import CreateIcon from '../../assets/icons/svg/create.svg';
import FilterIcon from '../../assets/icons/svg/filter.svg';
import { FilterPopup } from '../components/list/FilterPopup';
import { useAppStore } from '../../store/store';

export interface PaginationParams {
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

export type GetDataForList<T> = (params: PaginationParams) => Promise<PaginatedResponse<T>>;

const ListHeader = ({
  listData,
  onFilterClick,
}: {
  listData: ListData;
  onFilterClick: () => void;
}) => {
  const header = listData.list?.headers;
  return (
    <div className="list-header">
      <div className="header-title">{header?.title || 'List'}</div>
      <div className="header-actions">
        <button onClick={onFilterClick} className="filter-button">
          <FilterIcon />
          Filter
        </button>
        {header?.create && (
          <Link to={header.create.path} className="create-button">
            <CreateIcon />
            {header.create.label}
          </Link>
        )}
      </div>
    </div>
  );
};

export function ListPage<T extends AnyClass>({
  model,
  getData,
}: {
  model: T;
  getData: GetDataForList<T>;
}) {
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, page: 0, limit: 0 });
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<unknown>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const listData = useMemo(() => getListFields(model), [model]);
  const params = useParams();

  const fetchData = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const result = await getData({ page, filters: activeFilters });
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
    fetchData(parseInt(params.page as string) || 1);
  }, [fetchData, params.page]);

  const handleFilterApply = (filters: Record<string, any>) => {
    setActiveFilters(filters);
    fetchData(1); // Reset to first page when filters change
  };

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorComponent error={error} />;

  return (
    <div className="list">
      <ListHeader listData={listData} onFilterClick={() => setIsFilterOpen(true)} />
      <Datagrid listData={listData} data={data} />
      <div className="list-footer">
        <Pagination pagination={pagination} onPageChange={fetchData} />
      </div>
      <FilterPopup
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleFilterApply}
        fields={listData.cells}
      />
    </div>
  );
}
