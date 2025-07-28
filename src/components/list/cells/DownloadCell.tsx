import React from 'react';
import { CellConfiguration } from '../../../decorators/list/Cell';
import { DownloadCellConfiguration } from '../../../decorators/list/cells/DownloadCell';
import { AnyClass } from '../../../types/AnyClass';

interface DownloadCellProps {
  item: AnyClass;
  configuration: CellConfiguration;
}

export function DownloadCell({ item, configuration }: DownloadCellProps): React.ReactElement {
  const value = item[configuration.name];
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
