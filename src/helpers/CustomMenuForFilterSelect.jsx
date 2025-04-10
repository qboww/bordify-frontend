import { components } from 'react-select';
import { useDispatch } from 'react-redux';
import svg from '../images/icons.svg';
import css from '../components/FilterSelect/FilterSelect.module.css';
import { setNewFilter, setSortOrder, setDeadlineSortOrder  } from '../redux/columns/filterSlice';

const CustomMenu = props => {
  const { selectProps } = props;
  const dispatch = useDispatch();

  const handleCloseMenu = () => {
    if (selectProps && selectProps.onMenuClose) {
      selectProps.onMenuClose();
    }
  };

  const handleFilterChange = ({ value }) => {
    dispatch(setNewFilter(value));
    if (selectProps && selectProps.onMenuClose) {
      selectProps.onMenuClose();
    }
  };

  const handleSortChange = (order) => {
    dispatch(setSortOrder(order));
  };

  const handleDeadlineSortChange = (order) => {
    dispatch(setDeadlineSortOrder(order));
  };

  const handleShowAll = () => {
    dispatch(setNewFilter('showAll'));
    if (selectProps && selectProps.onMenuClose) {
      selectProps.onMenuClose();
    }
  };

  return (
    <components.Menu {...props}>
      <div className={css.menuContainer}>
        <div className={css.menuHeader}>
          <div className={css.filtersTitle}>Filters</div>
          <button className={css.closeButton} onClick={handleCloseMenu}>
            <svg className={css.icon_close}>
              <use href={`${svg}#icon-x-close-1`}></use>
            </svg>
          </button>
        </div>
        
        <div className={css.separator}></div>
        
        <div className={css.section}>
          <div className={css.sectionTitle}>Priority label</div>
          <div className={css.optionsContainer}>
            {props.children}
          </div>
        </div>
        
        <div className={css.separator}></div>
        
        <div className={css.section}>
          <div className={css.sectionTitle}>Sort by priority</div>
          <div className={css.sortButtons}>
            <button
              className={css.sortButton}
              onClick={() => handleSortChange('asc')}
            >
              Low to High
            </button>
            <button
              className={css.sortButton}
              onClick={() => handleSortChange('desc')}
            >
              High to Low
            </button>
          </div>
        </div>

        <div className={css.section}>
          <div className={css.sectionTitle}>Sort by deadline</div>
          <div className={css.sortButtons}>
            <button
              className={css.sortButton}
              onClick={() => handleDeadlineSortChange('asc')}
            >
              Earliest First
            </button>
            <button
              className={css.sortButton}
              onClick={() => handleDeadlineSortChange('desc')}
            >
              Latest First
            </button>
          </div>
        </div>
        
         <div className={css.footer}>
          <button
            className={css.showAllButton}
            onClick={() => {
              handleShowAll();
              dispatch(setDeadlineSortOrder('default'));
            }}
          >
            Reset all filters
          </button>
        </div>
      </div>
    </components.Menu>
  );
};

export default CustomMenu;