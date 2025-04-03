import { useDispatch } from 'react-redux';
import s from './NoBoards.module.css';
import { useState } from 'react';
import ModalWithoutRedux from '../ModalWithoutRedux/ModalWithoutRedux';
import BoardModal from '../Sidebar/BoardModal/BoardModal';

export const NoBoards = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false)
  const openModal = ()=>{
    setIsOpen(true)
  }
  const closeModal = ()=>{
    setIsOpen(false)
  }
  return (
    <div className={s.no_boards_wrap}>
      <p className={s.no_boards}>
        Before starting your project, it is essential to
        <a href="#!" onClick={openModal}> create a board </a>
        to visualize and track all the necessary tasks and milestones. This
        board serves as a powerful tool to organize the workflow and ensure
        effective collaboration among team members.
      </p>

      {isOpen && (
        <ModalWithoutRedux
          title="New board"
          isOpen={isOpen}
          onClose={closeModal}
        >
          <BoardModal
            type="create"
            onClose={closeModal}
          />
        </ModalWithoutRedux>
      )}
    </div>
  );
};
