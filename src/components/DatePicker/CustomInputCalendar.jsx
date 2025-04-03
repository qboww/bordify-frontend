import { forwardRef } from 'react';

import icon from '../../images/icons.svg';

import css from './CustomInput.module.css';

const CustomInputCalendar = forwardRef(({ value, onClick }, ref) => {
  return (
    <div className={css.div}>
      <button
        type="button"
        className={css.customInput}
        onClick={onClick}
        ref={ref}
        aria-label="calendar button"
      >
        {value}
        <svg width="18" height="18" className={css.icon}>
          <use href={`${icon}#icon-arrow-down`}></use>
        </svg>
      </button>
    </div>
  );
});

CustomInputCalendar.displayName = 'CustomInputCalendar';

export default CustomInputCalendar;
