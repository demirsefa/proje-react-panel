import React from 'react';
import { CellConfiguration } from '../../../decorators/list/Cell';
import { DownloadCellConfiguration } from '../../../decorators/list/cells/DownloadCell';

interface DownloadCellProps {
  value: string;
  configuration: CellConfiguration;
}

export function DownloadCell({ value, configuration }: DownloadCellProps): React.ReactElement {
  if (!value) return <>-</>;

  const downloadConfiguration = configuration as DownloadCellConfiguration;
  const baseUrl = downloadConfiguration.baseUrl || '';
  const downloadUrl = baseUrl + value;

  return (
    <a
      href={downloadUrl}
      download
      className="download-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      Download
    </a>
  );
}
