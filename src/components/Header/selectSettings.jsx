import { components } from 'react-select';
export const selectOptions = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'cyan', label: 'Cyan' },
];
export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'var(--background-header)',
    color: 'var(--header-arrow-color)',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    cursor: 'pointer',
    pointerEvents: 'auto',
    '&:hover': {
      border: 'none',
      outline: 'none',
    },
    '&:focus-within': { 
      boxShadow: 'none',
      border: 'none',
    }
  }),
  menu: provided => ({
    ...provided,
    backgroundColor: 'var(--background-header)',
    border: 'none',
    boxShadow: 'none',
    border: '1px solid var(--button-background-color)',
    borderRadius: '8px',
    textAlign: 'left',
    overflow: 'hidden',
    padding: '0px',
  }),
  singleValue: provided => ({
    ...provided,
    color: 'var(--header-arrow-color)',
    cursor: 'pointer',
  }),
  option: (provided, state) => ({
    ...provided,
    border: 'none',
    backgroundColor: 'var(--background-header)',
    borderRadius: '8px',
    color: state.isSelected
      ? 'var(--button-background-color)'
      : 'var(--text-color)',
    cursor: 'pointer',
    '&:hover': {
      color: 'var(--button-background-color-hoover)',
      '&:active': {
        color: 'var(--text-color)',
        backgroundColor: 'var(--button-background-color)',
      },
    },
    margin: '0px',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: 'var(--header-arrow-color)',
    padding: 0,
    strokeOpacity: 0.8,
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      color: 'var(--text-color)',
    },
    '&:focus': {
      color: 'var(--text-color)',
    },
  }),
  indicatorSeparator: provided => ({
    ...provided,
    display: 'none',
  }),
  input: (provided) => ({
    ...provided,
    opacity: 0,
    pointerEvents: 'none',
    borderRadius: '8px',
  }),
};

export const customComponents = {
  SingleValue: ({ children, ...props }) => (
    <components.SingleValue {...props}>Theme</components.SingleValue>
  ),
};
