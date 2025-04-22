import { useParams } from 'react-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ErrorComponent } from './ErrorComponent';
import { AnyClass } from '../types/AnyClass';
import { getDetailsPageMeta } from '../decorators/details/getDetailsPageMeta';
import { LoadingScreen } from './LoadingScreen';

interface DetailsPageProps<T extends AnyClass> {
  model: new (...args: any[]) => T;
}

export function DetailsPage<T extends AnyClass>({ model }: DetailsPageProps<T>) {
  const { class: detailsClass, items } = useMemo(() => getDetailsPageMeta(model), [model]);
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    detailsClass
      .getDetailsData(params as Record<string, string>)
      .then(data => {
        setData(data);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [params, detailsClass?.getDetailsData]);

  if (error) {
    return (
      <div className="error-container">
        <ErrorComponent error={error} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="details-page">
      {items.map(item => (
        <div key={item.name} className="details-item">
          <div className="item-label">{item.name}</div>
          <div className="item-value">{data[item.name]}</div>
        </div>
      ))}
    </div>
  );
}
