import s from './Task.module.css';
import { TaskControler } from './TaskControler';
import { priorities } from '../../constants/dataForBoardModal';

import { format } from 'date-fns';

export const Task = ({ task, columnid, boardid }) => {
  const { title, description, priority, deadline } = task;
  const priorityColor = priorities.find(
    item => item.priorityLevel === priority
  );

  const formattedDeadline = format(new Date(deadline), 'dd/MM/yyyy');
  return (
    <li
      className={s.boardTaskBackground}
      key={task._id}
      style={{ borderColor: priorityColor.color }}
    >
      <ul className={s.boardTask}>
        <li className={s.taskTitle}>{title}</li>
        <li className={s.taskDescr}>{description}</li>
        <li className={s.taskInfo}>
          <div>
            Priority
            <div className={s.priorityBox}>
              <span
                style={{ backgroundColor: priorityColor.color }}
                className={s.priorityCircle}
              ></span>
              <span className={s.taskProps}>{priority}</span>
            </div>
          </div>
          <div className={s.deadlineBox}>
            Deadline
            {/* change for DatePicker */}
            <span className={s.taskProps}>{formattedDeadline}</span>
          </div>
          <TaskControler
            columnid={columnid}
            boardid={boardid}
            task={task}
            className={s.task_controller}
          />
        </li>
      </ul>
    </li>
  );
};
