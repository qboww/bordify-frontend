export const customStyles = {
  control: () => ({
    width: '88px',
    height: '44px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    position: 'absolute',
    top: '20px',
    right: '24px',
  }),
  indicatorsContainer: () => ({
    display: 'none',
  }),
  input: () => ({
    pointerEvents: 'none',
    caretColor: 'transparent',
  }),
  menu: () => ({
    border: '1px solid var(--button-background-color-hoover)',
    backgroundColor: 'var(--filter-bgc)',
    borderRadius: '8px',
    width: '300px',
    padding: '0',
    position: 'absolute',
    top: '68px',
    right: '24px',
    zIndex: '120',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  }),
  menuList: () => ({
    position: 'relative',
    zIndex: '120',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    height: 'auto',
    padding: '0',
  }),
  option: (styles, state) => ({
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '400',
    fontSize: '14px',
    letterSpacing: '-0.02em',
    color: state.isSelected
      ? 'var(--filter-btn-color-hover)'
      : 'var(--filter-btn-color)',
    ':hover': {
      color: 'var(--filter-btn-color-hover)',
      backgroundColor: 'var(--button-background-color-hoover)',
      borderRadius: '5px'
    },
    cursor: 'pointer',
    backgroundColor: 'transparent',
  }),
  singleValue: () => ({
    display: 'none',
  }),
};