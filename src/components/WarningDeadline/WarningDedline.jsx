import { useEffect, useState } from 'react';
import { differenceInHours, isAfter } from 'date-fns';
import icon from '../../images/icons.svg';
import css from './WarningDeadline.module.css';

const WarningDeadline = ({ deadline }) => {
  const [warningState, setWarningState] = useState(null);

  useEffect(() => {
    const checkDeadline = () => {
      const now = new Date();
      const deadlineDate = new Date(deadline);
      const hoursLeft = differenceInHours(deadlineDate, now);

      if (isAfter(now, deadlineDate)) {
        const hoursMissed = Math.abs(hoursLeft);
        setWarningState(hoursMissed >= 24 ? 'missed' : null);
      } else {
        setWarningState(hoursLeft < 24 ? 'approaching' : null);
      }
    };

    checkDeadline();
    const intervalId = setInterval(checkDeadline, 3600000);

    return () => clearInterval(intervalId);
  }, [deadline]);

  if (!warningState) return null;

  return (
    <svg width="18" height="18" className={css.icon}>
      <use href={`${icon}#icon-${warningState === 'missed' ? 'alert' : 'bell'}`}></use>
    </svg>
  );
};

export default WarningDeadline;