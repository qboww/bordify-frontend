import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectNewFilter } from '../../redux/columns/filterSlice';

import { setNewFilter } from '../../redux/columns/filterSlice';
import options from '../../helpers/optionsForFilterSelect';
import CustomOption from '../../helpers/CustomOptionsForFilterSelect';
import CustomMenu from '../../helpers/CustomMenuForFilterSelect';
import {customStyles} from '../../helpers/customStylesForFilterSelect';

import svg from '../../images/icons.svg';
import css from './FilterSelect.module.css';

const FilterSelect = () => {
  const dispatch = useDispatch();

  const handleChange = ({ value }) => {
    dispatch(setNewFilter(value));
  };
  
  const filter = useSelector(selectNewFilter); 

  return (
    <>
      <div className={css.container}>
        <svg className={css.icon_filter}>
          <use href={`${svg}#icon-filter`}></use>
        </svg>
        <span className={css.text}>Filters</span>
      </div>
      <Select
        value={filter !== 'showAll' ? options.find(opt => opt.value === filter) : null}
        options={options}
        styles={customStyles}
        placeholder=""
        components={{ Option: CustomOption, Menu: CustomMenu }}
        onChange={handleChange}
        closeMenuOnSelect={false} 
        selectProps={{
          handleChange,
        }}
      />
    </>
  );
};

export default FilterSelect;
