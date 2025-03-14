import { Layout } from '../layout/Layout';
import { Form } from './Form';
import React, { useEffect, useState } from 'react';
import { Screen } from '../types/Screen';
import { useParams } from 'react-router-dom';
import { CrudApi } from '../api/crudApi';

export function ControllerEdit({ screen }: { screen: Screen }) {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (screen.controller && id) {
      CrudApi.details(screen.controller, id)
        .then((res) => {
          setData(res.data);
        })
        .catch((e: any) => {
          setError(e);
          console.error(e);
        });
    }
  }, [id, screen]);

  return (
    <Layout>
      <Form data={data} screen={screen} />
    </Layout>
  );
}
