import React from 'react';

export function LoadingScreen({ id }: { id: string }) {
  //Note: key added for react-router bug. Page is not reload
  return (
    <div key={id} className="loading-screen">
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    </div>
  );
}
