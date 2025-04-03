import clsx from 'clsx';
import icons from '../../images/icons.svg';

import s from './Logo.module.css';
const Logo = ({ big = false, className }) => {
  return (
    <div
      className={clsx(s.logo, className, {
        [s.big_logo]: big,
      })}
    >
      <div className={s.icon_box}>
        <svg>
          <use href={`${icons}#icon-Logo-task-Pro`}></use>
        </svg>
      </div>
      <span>Task Pro</span>
    </div>
  );
};
export default Logo;
