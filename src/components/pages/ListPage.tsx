import React, { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Datagrid } from '../list/Datagrid';
import { ErrorComponent } from '../components/ErrorComponent';
import { LoadingScreen } from '../components/LoadingScreen';
import { AnyClass } from '../../types/AnyClass';
import { getListFields } from '../../decorators/list/getListFields';

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

export type GetDataForList<T> = ({
  page,
}: PaginationParams) => PaginatedResponse<T> | Promise<PaginatedResponse<T>>;

export function ListPage<T extends AnyClass>({
  model,
  getData,
}: {
  model: T;
  getData: GetDataForList<T>;
}) {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<unknown | null>(null);
  const listData = useMemo(() => getListFields(model), [model]);

  useEffect(() => {
    setLoading(true);
    try {
      const result = getData({ page: 0 });
      const asyncResult = result as Promise<PaginatedResponse<T>>;
      if (asyncResult.then) {
        asyncResult
          .then(res => {
            setData(res.data);
          })
          .finally(() => setLoading(false));
      } else {
        const syncResult = result as PaginatedResponse<T>;
        setData(syncResult.data);
        setLoading(false);
      }
    } catch (e: unknown) {
      setError(e);
      console.error(e);
      setLoading(false);
    }
  }, [page, getData]);

  if (loading) {
    return <LoadingScreen />;
  }
  if (error) {
    return <ErrorComponent error={error} />;
  }
  return (
    <div>
      <Link to={'create'}>Create</Link>
      {/*
			{error ? <p>Error {error}</p> : <></>}
*/}
      <Datagrid cells={listData.cells} data={data} />
    </div>
  );
}
