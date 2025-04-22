import React, { useEffect } from 'react';
import { initPanel } from '../initPanel';
import { InitPanelOptions } from '../types/initPanelOptions';
import { ErrorBoundary } from './ErrorBoundary';

type AppProps = {
  children: React.ReactNode;
  init: () => InitPanelOptions;
};

export function Panel({ children, init }: AppProps) {
  useEffect(() => {
    const options = init();
    initPanel(options);
  }, [init]);

  return <ErrorBoundary>{children}</ErrorBoundary>;
}
