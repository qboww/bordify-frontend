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
        To ensure your project runs smoothly, begin by
        <a href="#!" onClick={openModal}> creating a board! </a>
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
