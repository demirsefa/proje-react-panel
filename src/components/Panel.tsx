import React, { useEffect } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { ToastContainer } from 'react-toastify';

interface AppProps {
  onInit?: (appData: { token?: string }) => void;
  children: React.ReactNode;
}

export function Panel({ onInit, children }: AppProps) {
  useEffect(() => {
    if (onInit) {
      const token = localStorage.getItem('token');
      const params: { token?: string } = { token: '' };
      if (token) {
        params.token = token;
      }
      onInit(params);
    }
  }, [onInit]);

  return (
    <ErrorBoundary>
      {children}
      <ToastContainer />
    </ErrorBoundary>
  );
}
