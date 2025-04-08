import s from './TaskController.module.css';
import icons from '../../images/icons.svg';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteTaskThunk,
  updateTaskThunk,
} from '../../redux/tasks/tasksOperations';
import ModalWithoutRedux from '../ModalWithoutRedux/ModalWithoutRedux';
import CardForm from '../CardForm/CardForm';
import { clsx } from 'clsx';
import WarningDeadline from '../WarningDeadline/WarningDedline';

export const TaskController = ({
  taskid: propTaskId, 
  columnid,
  boardid,
  task,
  className,
}) => {
  const { id: paramsBoardId } = useParams();
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const openEditModal = () => setIsEditOpen(true);
  const closeEditModal = () => setIsEditOpen(false);

  const handleDelete = () => {
    dispatch(deleteTaskThunk({ 
      boardid: paramsBoardId || boardid, 
      columnid, 
      taskid: propTaskId 
    }));
  };

  return (
    <>
      <ul className={clsx(s.taskActions, className)}>
        <li>
          <button className={s.btn_icon}>
            <WarningDeadline deadline={task.deadline} />
          </button>
        </li>
        <li>
          <button className={s.btn_icon} onClick={openEditModal}>
            <svg className={s.taskIcon}>
              <use href={`${icons}#icon-pencil`}></use>
            </svg>
          </button>
        </li>
        <li>
          <button className={s.btn_icon} onClick={handleDelete}>
            <svg className={s.taskIcon}>
              <use href={`${icons}#icon-trash`}></use>
            </svg>
          </button>
        </li>
      </ul>
      
      {isEditOpen && (
        <ModalWithoutRedux
          isOpen={isEditOpen}
          onClose={closeEditModal}
          title="Edit card"
        >
          <CardForm
            onClose={closeEditModal}
            type="edit"
            boardid={paramsBoardId || boardid}
            columnid={columnid}
            task={task}
          />
        </ModalWithoutRedux>
      )}
    </>
  );
};