import React, { useEffect, useMemo, useRef } from 'react';
import { ListData } from '../../decorators/list/ListData';
import { CellOptions, StaticSelectFilter } from '../../decorators/list/Cell';
import Select from 'react-select';

interface FilterPopupProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Record<string, string>) => void;
  listData: ListData<T>;
  activeFilters?: Record<string, string>;
}

interface FilterFieldProps {
  field: CellOptions;
  value: string;
  onChange: (value: string) => void;
}

function FilterField({ field, value, onChange }: FilterFieldProps): React.ReactElement {
  switch (field.filter?.type) {
    case 'static-select': {
      const filter = field.filter as StaticSelectFilter;
      return (
        <Select
          id={field.name}
          menuPortalTarget={document.body}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: '#1f2937',
              borderColor: state.isFocused ? '#6366f1' : '#374151',
              boxShadow: state.isFocused ? '0 0 0 1px #6366f1' : 'none',
              '&:hover': {
                borderColor: '#6366f1',
              },
              borderRadius: '6px',
              padding: '2px',
              color: 'white',
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: state.isSelected
                ? '#6366f1'
                : state.isFocused
                  ? '#374151'
                  : '#1f2937',
              color: 'white',
              '&:active': {
                backgroundColor: '#6366f1',
              },
              '&:hover': {
                backgroundColor: '#374151',
              },
              cursor: 'pointer',
            }),
            input: baseStyles => ({
              ...baseStyles,
              color: 'white',
            }),
            placeholder: baseStyles => ({
              ...baseStyles,
              color: '#9ca3af',
            }),
            singleValue: baseStyles => ({
              ...baseStyles,
              color: 'white',
            }),
            menuPortal: baseStyles => ({
              ...baseStyles,
              zIndex: 9999,
            }),
            menu: baseStyles => ({
              ...baseStyles,
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }),
            menuList: baseStyles => ({
              ...baseStyles,
              padding: '4px',
            }),
            dropdownIndicator: baseStyles => ({
              ...baseStyles,
              color: '#9ca3af',
              '&:hover': {
                color: '#6366f1',
              },
            }),
            clearIndicator: baseStyles => ({
              ...baseStyles,
              color: '#9ca3af',
              '&:hover': {
                color: '#6366f1',
              },
            }),
          }}
          value={
            value
              ? {
                  value: value,
                  label: filter.options.find(opt => opt.value === value)?.label || value,
                }
              : null
          }
          onChange={option => onChange(option?.value || '')}
          options={filter.options.map(opt => ({
            value: opt.value,
            label: opt.label,
          }))}
          placeholder={`Filter by ${field.title || field.name}`}
          isClearable
        />
      );
    }
    default:
      return (
        <input
          type={field.type === 'number' ? 'number' : 'text'}
          id={field.name}
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          placeholder={`Filter by ${field.title || field.name}`}
        />
      );
  }
}

export function FilterPopup<T>({
  isOpen,
  onClose,
  onApplyFilters,
  listData,
  activeFilters,
}: FilterPopupProps<T>): React.ReactElement | null {
  const [filters, setFilters] = React.useState<Record<string, any>>(activeFilters ?? {});
  const popupRef = useRef<HTMLDivElement>(null);
  const fields = useMemo(() => listData.cells.filter(cell => !!cell.filter), [listData.cells]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFilterChange = (fieldName: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  return (
    <div className="filter-popup-overlay">
      <div ref={popupRef} className="filter-popup">
        <div className="filter-popup-header">
          <h3>Filter</h3>
          <button onClick={onClose} className="close-button">
            ×
          </button>
        </div>
        <div className="filter-popup-content">
          {fields.map((field: CellOptions) => (
            <div key={field.name} className="filter-field">
              <label htmlFor={field.name}>{field.title || field.name}</label>
              <FilterField
                field={field}
                value={filters[field.name || '']}
                onChange={value => handleFilterChange(field.name || '', value)}
              />
            </div>
          ))}
        </div>
        <div className="filter-popup-footer">
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
          <button onClick={handleApply} className="apply-button">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
