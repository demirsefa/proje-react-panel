import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import { Screen } from '../types/Screen';
import { ErrorComponent } from '../components/ErrorComponent';

export function ControllerDetails({ screen }: { screen: Screen }) {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (screen.controller && id) {
      /*
      CrudApi.details({ ...fetchSettings, token }, screen.controller, id)
        .then(res => {
          setData(res);
        })
        .catch((e: any) => {
          setError(e);
          console.error(e);
        });
*/
    }
  }, [id, screen]);

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <p
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, '   ' + '<br/>'),
      }}
    />
  );
}
