import s from './Task.module.css';
import { TaskControler } from './TaskControler';
import { priorities } from '../../constants/dataForBoardModal';

import { format } from 'date-fns';

export const Task = ({ task, columnid, boardid }) => {
  const { title, description, priority, deadline } = task;
  const priorityColor = priorities.find(
    item => item.priorityLevel === priority
  );

  const formattedDeadline = format(new Date(deadline), 'dd.MM.yyyy');
  return (
    <li
      className={s.boardTaskBackground}
      key={task._id}
      style={{ borderColor: priorityColor.color }}
    >
      <ul className={s.boardTask}>
        <li className={s.taskTitle}><p>{title}</p></li>
        <li className={s.taskDescr}><p>{description}</p></li>
        <li className={s.taskInfo}>
          <div className={s.priorityBox}>
            <p>Priority</p>
            <div className={s.priorityBoxText}>
              <span
                style={{ backgroundColor: priorityColor.color }}
                className={s.priorityCircle}
              />
              <span className={s.taskProps}>{priority}</span>
            </div>
          </div>
          <div className={s.deadlineBox}>
            <p>Deadline</p>
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
