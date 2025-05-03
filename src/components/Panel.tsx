import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { ToastContainer } from 'react-toastify';

interface AppProps {
  children: React.ReactNode;
}

export function Panel({ children }: AppProps) {
  /*useEffect(() => {
    const options = init();
    initPanel(options);
  }, [init]);*/

  return (
    <ErrorBoundary>
      {children}
      <ToastContainer />
    </ErrorBoundary>
  );
}
