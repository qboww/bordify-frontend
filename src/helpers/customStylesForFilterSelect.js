const customStyles = {
  control: () => ({
    width: '64px',
    height: '20px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    position: 'absolute',
    top: '12px',
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
    textAlign: 'left',
    border: '1px solid var(--button-background-color-hoover)',
    backgroundColor: ' var(--filter-bgc)',
    borderRadius: '8px',
    width: '300px',
    height: '234px',
    padding: '24px',
    position: 'absolute',
    top: '38px',
    right: '20px',
    zIndex: '120',
  }),
  menuList: () => ({
    position: 'absolute',
    zIndex: '120',
    bottom: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '110px',
    height: '96px',
  }),
  option: (styles, state) => ({
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '400',
    fontSize: '12px',
    letterSpacing: '-0.02em',
    color: state.isSelected
      ? 'var(--filter-btn-color-hover)'
      : 'var(--filter-btn-color)',
    ':hover': {
      color: state.isSelected
        ? 'var(--filter-btn-color-hover)'
        : 'var(--filter-btn-color)',
    },
    cursor: 'pointer',
    minWidth: '23px',
    maxWidth: '110px',
  }),
  singleValue: () => ({
    display: 'none',
  }),
};

export default customStyles;
