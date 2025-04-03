import { DragDropContext } from '@hello-pangea/dnd';
import { useDispatch } from 'react-redux';
import { getAllCoulumnsWithBoardIdThunk } from '../../redux/columns/columnsOperations';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  startDrag,
  stopDrag,
  updateTaskOrder,
} from '../../redux/columns/columnsSlice';
import {
  selectBoardBackground,
  selectBoardTitle,
  selectFilteredTasks,
} from '../../redux/columns/columnsSelectors';
import icon from '../../images/icons.svg';

import { useEffect, useState } from 'react';
import { Column } from '../Column/Column';
import s from './Board.module.css';
import { updateTaskThunk } from '../../redux/tasks/tasksOperations';
import { Button } from '../Button/Button';
import ModalWithoutRedux from '../ModalWithoutRedux/ModalWithoutRedux';
import ColumnForm from '../ColumnForm/ColumnForm';

import FilterSelect from '../FilterSelect/FilterSelect';
import { useMedia } from '../../hooks/useMedia';
import { getBackgroundImage } from '../../helpers/getBackgroundImage.js';
export const Board = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getAllCoulumnsWithBoardIdThunk(id));
    }
  }, [id, dispatch]);
  const boardTitle = useSelector(selectBoardTitle);
  const columns = useSelector(selectFilteredTasks);
  const backgroundImg = useSelector(selectBoardBackground);
  const { isMobile, isTablet, isDesktop } = useMedia();
  const backgroundImage = getBackgroundImage(
    backgroundImg,
    isMobile,
    isTablet,
    isDesktop
  );
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const onDragStart = () => {
    dispatch(startDrag());
  };
  const onDragEnd = async result => {
    const { source, destination } = result;

    if (!destination) {
      dispatch(stopDrag());
      return;
    }
    try {
      dispatch(
        updateTaskOrder({
          source,
          destination,
          sourceColumnId: source.droppableId,
          destinationColumnId: destination.droppableId,
        })
      );
      await dispatch(
        updateTaskThunk({
          boardid: id,
          columnid: source.droppableId,
          taskid: result.draggableId,
          body: { columnId: destination.droppableId },
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopDrag());
    }
  };

  return (
    <div
      className={s.board_wrap}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <FilterSelect className={s.filter_select} />

      <div className={s.nested_wrap}>
        <DragDropContext
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          className={s.board_wrap}
        >
          <div className={s.boardTitle}>
            <h2>{boardTitle}</h2>
          </div>
          <div className={s.board}>
            <ul>
              {columns.map(column => (
                <Column key={column._id} column={column} />
              ))}
            </ul>
            <Button
              buttonText="Add another column"
              onClick={openModal}
              typeStyle="secondary"
              icon={`${icon}#icon-plus-big`}
            />
          </div>
        </DragDropContext>
      </div>
      {isOpen && (
        <ModalWithoutRedux
          isOpen={isOpen}
          onClose={closeModal}
          title="Add another column"
        >
          <ColumnForm onClose={closeModal} type="create" boardid={id} />
        </ModalWithoutRedux>
      )}
    </div>
  );
};
