import { StylesConfig } from 'react-select';

interface OptionType {
  label: string;
  value: string;
}

export const darkSelectStyles: StylesConfig<OptionType, false> = {
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
    backgroundColor: state.isSelected ? '#6366f1' : state.isFocused ? '#374151' : '#1f2937',
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
};
