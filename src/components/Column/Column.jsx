import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Task } from '../Task/Task';
import s from './Column.module.css';
import { Button } from '../Button/Button';
import icon from '../../images/icons.svg';
import ColumnTitle from '../ColumnTitle/ColumnTitle';
import ModalWithoutRedux from '../ModalWithoutRedux/ModalWithoutRedux';
import CardForm from '../CardForm/CardForm';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const Column = ({ column, boardid }) => {
  const { id } = useParams();
  const columnid = column._id;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState();
  const openCreateModal = () => {
    setIsOpen(true);
  };
  const closeCreateModal = () => {
    setIsOpen(false);
  };

  return (
    <li className={s.li_col}>
      <Droppable droppableId={column._id}>
        {provided => (
          <div
            className={s.columnWrapper}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <ColumnTitle title={column.title} columnid={column._id} />
            <ul className={s.column}>
              {column.tasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Task
                        key={task.id}
                        task={task}
                        index={index}
                        columnid={columnid}
                        boardid={boardid}
                      />
                    </div>
                  )}
                </Draggable>
              ))}

              <Button
                icon={`${icon}#icon-plus-big`}
                className={s.btn_column}
                width="100%"
                typeStyle="primary"
                buttonText="Add another card"
                onClick={openCreateModal}
              />
            </ul>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {isOpen && (
        <ModalWithoutRedux
          isOpen={isOpen}
          onClose={closeCreateModal}
          title="Add another card"
        >
          <CardForm
            onClose={closeCreateModal}
            type="create"
            boardid={id}
            columnid={columnid}
          />
        </ModalWithoutRedux>
      )}
    </li>
  );
};
