import { useParams } from 'react-router';
import React, { useEffect, useId, useMemo, useState } from 'react';
import { ErrorComponent } from './ErrorComponent';
import { AnyClass, AnyClassConstructor } from '../types/AnyClass';
import { getDetailsPageMeta } from '../decorators/details/getDetailsPageMeta';
import { LoadingScreen } from './LoadingScreen';

interface DetailsPageProps<T extends AnyClass> {
  model: AnyClassConstructor<T>;
}

export function DetailsPage<T extends AnyClass>({ model }: DetailsPageProps<T>) {
  const id = useId();
  const { class: detailsClass, items } = useMemo(() => getDetailsPageMeta(model), [model]);
  const params = useParams();
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    detailsClass
      .getDetailsData(params as Record<string, string>)
      .then(data => {
        //TODO: any is not a good solution, we need to find a better way to do this
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setData(data as any);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [params, detailsClass.getDetailsData, detailsClass]);

  if (error) {
    return (
      <div className="error-container">
        <ErrorComponent error={error} id={id} />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingScreen id={id} />
      </div>
    );
  }

  return (
    <div className="details-page">
      {items.map(item => (
        <div key={item.name} className="details-item">
          <div className="item-label">{item.name}</div>
          <div className="item-value">{data?.[item.name]}</div>
        </div>
      ))}
    </div>
  );
}
