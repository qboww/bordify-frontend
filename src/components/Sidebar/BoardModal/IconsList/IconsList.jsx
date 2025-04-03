import s from './IconsList.module.css';
import clsx from 'clsx';
import { useEffect } from 'react';
import { icons } from '../../../../constants/dataForBoardModal';

const IconsList = ({ selectedIcon, setSelectedIcon, register, name }) => {
  useEffect(() => {
    if (!selectedIcon) {
      setSelectedIcon(icons[0].iconName);
    }
  }, [selectedIcon, setSelectedIcon]);
  return (
    <ul className={s.icons_list}>
      {icons.map((icon, idx) => (
        <li key={idx} className={s.icon_item}>
          <input
            type="radio"
            id={icon.iconName}
            name="icon"
            value={icon.iconName}
            checked={selectedIcon === icon.iconName}
            onClick={() => {
              setSelectedIcon(icon.iconName);
            }}
            className={s.icon_radio}
            {...register(name)}
          />
          <label htmlFor={icon.iconName}>
            <svg
              width="18"
              height="18"
              className={clsx(s.icon_svg, {
                [s.selected]: selectedIcon === icon.iconName,
              })}
            >
              <use href={icon.svg}></use>
            </svg>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default IconsList;
