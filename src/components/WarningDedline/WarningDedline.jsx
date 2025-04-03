import { useEffect, useState } from 'react';
import { differenceInHours } from 'date-fns';
import icon from '../../images/icons.svg';
import css from './WarningDedline.module.css';

const WarningDedline = ({ deadline }) => {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const checkDeadline = () => {
      const hoursLeft = differenceInHours(new Date(deadline), new Date());
      if (hoursLeft < 24) {
        setShowWarning(true);
      } else {
        setShowWarning(false);
      }
    };

    checkDeadline();

    const intervalId = setInterval(checkDeadline, 3600000);

    return () => clearInterval(intervalId);
  }, [deadline]);

  if (!showWarning) {
    return null;
  }

  return (
    <svg width="18" height="18" className={css.icon}>
      <use href={`${icon}#icon-bell`}></use>
    </svg>
  );
};

export default WarningDedline;
