import s from './PriorityList.module.css';
import clsx from 'clsx';
import { useEffect } from 'react';
import { priorities } from '../../../constants/dataForBoardModal';

const PriorityList = ({
  selectedPriority,
  setSelectedPriority,
  register,
  name,
}) => {
  useEffect(() => {
    if (!selectedPriority) {
      setSelectedPriority(priorities[3].priorityLevel);
    }
  }, [selectedPriority, setSelectedPriority]);

  return (
    <ul className={s.priorities_list}>
      {priorities.map((priority, idx) => (
        <li key={idx} className={s.priority_item}>
          <input
            type="radio"
            id={priority.priorityLevel}
            name="priority"
            value={priority.priorityLevel}
            checked={selectedPriority === priority.priorityLevel}
            onClick={() => {
              setSelectedPriority(priority.priorityLevel);
            }}
            className={s.priority_radio}
            {...register(name)}
          />
          <label htmlFor={priority.priorityLevel}>
            <span
              className={clsx(s.icon_wrap, {
                [s.selected]: selectedPriority === priority.priorityLevel,
              })}
              style={{ backgroundColor: priority.color }}
            >
              <span
                className={clsx(
                  s.icon_circle,
                    {
                    [s.selected]: selectedPriority === priority.priorityLevel,
                  }
                )}
                style={{ backgroundColor: priority.color }}
              ></span>
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default PriorityList;
