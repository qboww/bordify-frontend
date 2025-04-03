import s from './CreateNewBoard.module.css';
import icons from '../../../images/icons.svg';
import Modal from '../../Modal/Modal';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectCreateBoardModal } from '../../../redux/modal/modalSelector';
import { Button } from '../../Button/Button';
import {
  closeCreateBoardModaal,
  openCreateBoardModaal,
} from '../../../redux/modal/modalSlice';
import BoardModal from '../BoardModal/BoardModal';
import { useNavigate } from 'react-router-dom';

const CreateNewBoard = () => {
  const dispatch = useDispatch();
  const isOpenCreateBoardModal = useSelector(selectCreateBoardModal);
  const navigate = useNavigate();

  const HandleCreate = () => {
    dispatch(openCreateBoardModaal());
  };

  return (
    <aside>
      <h2 className={s.text}>My boards</h2>
      <div className={s.create}>
        <p className={s.title}>Create a new board</p>
        <Button
          small
          onClick={HandleCreate}
          icon={`${icons}#icon-plus-small`}
        />
      </div>
      {isOpenCreateBoardModal && (
        <Modal
          title="New board"
          isOpen={openCreateBoardModaal}
          closeModal={closeCreateBoardModaal}
        >
          <BoardModal
            type="create"
            onClose={() => dispatch(closeCreateBoardModaal())}
          />
        </Modal>
      )}
    </aside>
  );
};

export default CreateNewBoard;
