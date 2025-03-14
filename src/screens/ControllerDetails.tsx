import { Layout } from '../../layout/Layout';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CrudApi } from '../api/crudApi';
import { Screen } from '../types/Screen';

export function ControllerDetails({ screen }: { screen: Screen }) {
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
      <p
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(data, null, '   ' + '<br/>'),
        }}
      />
    </Layout>
  );
}
