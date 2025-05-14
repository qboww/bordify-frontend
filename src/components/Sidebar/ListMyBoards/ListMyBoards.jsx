import { useSelector } from 'react-redux';
import { selectBoards } from '../../../redux/boards/boardsSelectors';
import s from './ListMyBoards.module.css';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  deleteBoardThunk,
  fetchBoardByIdThunk,
  fetchBoardsThunk,
} from '../../../redux/boards/boardsOperations';
import clsx from 'clsx';
import iconsSprite from '../../../images/icons.svg';
import { icons } from '../../../constants/dataForBoardModal';
import { selectEditBoardOpen } from '../../../redux/modal/modalSelector';
import {
  closeEditBoardModaal,
  openEditBoarModaal,
} from '../../../redux/modal/modalSlice';
import Modal from '../../Modal/Modal';
import BoardModal from '../BoardModal/BoardModal';

import { selectCurrentBoard } from '../../../redux/boards/boardsSelectors';

export const ListMyBoards = ({ className }) => {
  const dispatch = useDispatch();
  const [chosenBoard, setChosenBoard] = useState(null);

  useEffect(() => {
    dispatch(fetchBoardsThunk());
  }, [dispatch]);

  const boards = useSelector(selectBoards);
  const currentBoardId = useSelector(selectCurrentBoard);
  const isEditBoardOpen = useSelector(selectEditBoardOpen);

  const handleEditOpen = id => {
    setChosenBoard(boards.find(board => board._id === id));
    dispatch(openEditBoarModaal(chosenBoard));
  };
  const handleDelete = boardId => {
    dispatch(deleteBoardThunk(boardId));
  };
  const closeModal = () => {
    dispatch(closeEditBoardModaal());
  };
  return (
    <ul className={clsx(s.boards_list, className)}>
      {boards.map(board => {
        const icon = icons.find(icon => icon.iconName === board.icon);
        return (
          <li key={board._id} className={s.li_board_item}>
            <NavLink
              to={`board/${board._id}`}
              className={({ isActive }) =>
                clsx(s.board_item, board._id === currentBoardId ? s.active : '')
              }
            >
              <div className={s.left_side}>
                <svg width="18" height="18" className={s.board_item_svg}>
                  <use href={icon.svg}></use>
                </svg>

                <p>{board.title}</p>
              </div>
              <div className={s.right_side}>
                <button
                  type="button"
                  onClick={() => {
                    handleEditOpen(board._id);
                  }}
                >
                  <svg width="16" height="16">
                    <use href={`${iconsSprite}#icon-pencil`}></use>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    handleDelete(board._id);
                  }}
                >
                  <svg width="16" height="16">
                    <use href={`${iconsSprite}#icon-trash`}></use>
                  </svg>
                </button>
              </div>
            </NavLink>
          </li>
        );
      })}

      {isEditBoardOpen && (
        <Modal
          isOpen={isEditBoardOpen}
          closeModal={closeEditBoardModaal}
          title="Edit dashboard"
        >
          <BoardModal
            type="edit"
            title={chosenBoard.title}
            chosenIcon={chosenBoard.icon}
            chosenBackGround={chosenBoard.preview}
            onClose={() => closeModal()}
          />
        </Modal>
      )}
    </ul>
  );
};
