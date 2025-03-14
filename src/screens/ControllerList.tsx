import React from 'react';
import { Layout } from '../layout/Layout';
import { Screen } from '../types/Screen';
import { useEffect, useState } from 'react';
import { CrudApi } from '../api/crudApi';
import { Link } from 'react-router-dom';
import { List } from '../list/List';
import { StoreData } from '../index';

export function ControllerList({ screen }: { screen: Screen }) {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (screen.controller) {
      CrudApi.getList(screen.controller, page)
        .then((res) => {
          setData(res.data);
        })
        .catch((e: any) => {
          setError(e);
          console.error(e);
        });
    }
  }, [page, screen.controller]);

  return (
    <Layout>
      <Link to={'/maps/create'}>Create</Link>
      {error ? <p>Error {error}</p> : null}
      <List
        screen={screen}
        cells={StoreData.screens[screen.key].cells}
        data={data}
      />
    </Layout>
  );
}
