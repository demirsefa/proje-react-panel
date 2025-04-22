import React, { useEffect } from 'react';
import { initPanel } from '../initPanel';
import { InitPanelOptions } from '../types/initPanelOptions';
import { ErrorBoundary } from './ErrorBoundary';

type AppProps = {
  children: React.ReactNode;
};

export function Panel({ children }: AppProps) {
  /*useEffect(() => {
    const options = init();
    initPanel(options);
  }, [init]);*/

  return <ErrorBoundary>{children}</ErrorBoundary>;
}
