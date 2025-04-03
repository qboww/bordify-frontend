import { components } from 'react-select';
import { useDispatch } from 'react-redux';
import svg from '../images/icons.svg';
import css from '../components/FilterSelect/FilterSelect.module.css';
import { setNewFilter } from '../redux/columns/filterSlice';

const CustomMenu = props => {
  const { selectProps } = props;
  const dispatch = useDispatch();

  const handleCloseMenu = () => {
    if (selectProps && selectProps.onMenuClose) {
      selectProps.onMenuClose();
    }
  };

  const handleChange = ({ value }, selectProps) => {
    dispatch(setNewFilter(value));

    if (selectProps && selectProps.onMenuClose) {
      selectProps.onMenuClose();
    }
  };

  return (
    <components.Menu {...props}>
      <div className={css.icon_close_wrapper} onClick={handleCloseMenu}>
        <svg className={css.icon_close}>
          <use href={`${svg}#icon-x-close-1`}></use>
        </svg>
      </div>
      <div className={css.menuHeader}>
        <div className={css.filtersTitle}>Filters</div>
        <div className={css.separator}></div>
        <div className={css.labelTitle}>Label color</div>
      </div>
      {props.children}
      <div className={css.selectAllContainer}>
        <button
          className={css.selectAllButton}
          onClick={() => handleChange({ value: 'all' }, selectProps)}
        >
          Show all
        </button>
      </div>
    </components.Menu>
  );
};

export default CustomMenu;
