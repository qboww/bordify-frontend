import { components } from 'react-select';
export const selectOptions = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'violet', label: 'Violet' },
];
export const customStyles = {
  control: provided => ({
    ...provided,
    backgroundColor: 'var(--background-header)',
    color: 'var(--header-arrow-color)',
    border: 'none',
    outline: 'none',
    '&:hover': {
      border: 'none',
      outline: 'none',
    },
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
  }),
  option: (provided, state) => ({
    ...provided,

    border: 'none',
    backgroundColor: 'var(--background-header)',
    borderRadius: '8px',
    color: state.isSelected
      ? 'var(--button-background-color)'
      : 'var(--text-color)',
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
    strokeOpacity: 0.8,
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s ease',
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
};

export const customComponents = {
  SingleValue: ({ children, ...props }) => (
    <components.SingleValue {...props}>Theme</components.SingleValue>
  ),
};
