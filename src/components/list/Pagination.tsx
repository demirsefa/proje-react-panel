import React from 'react';

interface PaginationProps {
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
  onPageChange: (page: number) => void;
}

export function Pagination({ pagination, onPageChange }: PaginationProps) {
  const { total, page, limit } = pagination;
  const totalPages = Math.floor(total / limit);

  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    const range = 2; // Number of pages to show before and after current page

    // Always show first 2 pages
    for (let i = 1; i <= Math.min(2, totalPages); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`pagination-item ${page === i ? 'active' : ''}`}
          disabled={page === i}
        >
          {i}
        </button>
      );
    }

    // Add ellipsis if needed
    if (page - range > 3) {
      pages.push(
        <span key="ellipsis1" className="pagination-ellipsis">
          ...
        </span>
      );
    }

    // Show pages around current page
    for (let i = Math.max(3, page - range); i <= Math.min(totalPages - 2, page + range); i++) {
      if (i > 2 && i < totalPages - 1) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`pagination-item ${page === i ? 'active' : ''}`}
            disabled={page === i}
          >
            {i}
          </button>
        );
      }
    }

    // Add ellipsis if needed
    if (page + range < totalPages - 2) {
      pages.push(
        <span key="ellipsis2" className="pagination-ellipsis">
          ...
        </span>
      );
    }

    // Always show last 2 pages
    for (let i = Math.max(totalPages - 1, 3); i <= totalPages; i++) {
      if (i > 2) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`pagination-item ${page === i ? 'active' : ''}`}
            disabled={page === i}
          >
            {i}
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(page - 1)}
        className={`pagination-item ${page === 1 ? 'disabled' : ''}`}
        disabled={page === 1}
        aria-disabled={page === 1}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => onPageChange(page + 1)}
        className={`pagination-item ${page === totalPages ? 'disabled' : ''}`}
        disabled={page === totalPages}
        aria-disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
