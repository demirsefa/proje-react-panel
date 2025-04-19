import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { Datagrid } from '../list/Datagrid';
import { ErrorComponent } from '../components/ErrorComponent';
import { LoadingScreen } from '../components/LoadingScreen';
import { AnyClass } from '../../types/AnyClass';
import { getListFields } from '../../decorators/list/getListFields';
import { Pagination } from '../list/Pagination';
import { ListData } from '../../decorators/list/ListData';

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export type GetDataForList<T> = (params: PaginationParams) => Promise<PaginatedResponse<T>>;

const ListHeader = ({ listData }: { listData: ListData }) => {
  const header = listData.list?.headers;
  return (
    <div className="list-header">
      <div className="header-title">{header?.title || 'List'}</div>
      <div className="header-actions">
        {header?.create && (
          <Link to={header.create.path} className="create-button">
            {header.create.label}
            <i className="icon icon-create"></i>
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
  const listData = useMemo(() => getListFields(model), [model]);
  const params = useParams();

  const fetchData = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const result = await getData({ page });
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
    [getData]
  );

  useEffect(() => {
    fetchData(parseInt(params.page as string) || 1);
  }, [fetchData, params.page]);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorComponent error={error} />;

  return (
    <div className="list">
      <ListHeader listData={listData} />
      <Datagrid listData={listData} data={data} />
      <div className="list-footer">
        <Pagination pagination={pagination} onPageChange={fetchData} />
      </div>
    </div>
  );
}
