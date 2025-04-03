import s from './MyBoards.module.css';
import icons from '../../../images/icons.svg';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../../Modal/Modal';
// import { fetchColumns } from '../../../redux/columns/columnsOperations';

// import DeleteBoard from '../BoardModal/DeleteBoard';
// import EditBoard from '../BoardModal/EditBoard';

const MyBoards = desk => {
  const [isOpen, setIsOpen] = useState(false);
  const [typeModal, setTypeModal] = useState('');

  if (desk.desk === undefined) {
    return null;
  }

  const deskRoute = desk.desk.title.split(' ').join('-');

  const projectIcons = `#${desk.desk.icon}`;

  const toggleModal = typeToggle => {
    setIsOpen(isOpen => !isOpen);
    setTypeModal(typeToggle);
  };
  return (
    <>
      <div className={s.list}>
        <div className={s.item}>
          <NavLink
            to={deskRoute}
            className={({ isActive }) =>
              isActive ? `${s.navItem} ${s.active}` : s.navItem
            }
          >
            <button className={s.wrapperProjects}>
              <svg width="18px" height="16px">
                <use href={projectIcons}></use>
              </svg>
              <p className={s.project}>{}</p>
            </button>
            <div className={s.btnContainer}>
              <div className={s.wrapperIcons}>
                <svg width="16px" height="16px" className={s.iconEdit}>
                  <use href={`${icons}#icon-pencil`}></use>
                </svg>
              </div>
              <div className={s.wrapperIcons}>
                <svg
                  width="16px"
                  height="16px"
                  className={s.iconDelete}
                  onClick={() => toggleModal('delete')}
                >
                  <use href={`${icons}#icon-trash`}></use>
                </svg>
              </div>
            </div>
          </NavLink>
        </div>
        {isOpen &&
          (typeModal === 'edit' ? (
            <Modal
              onClose={toggleModal}
              // children={<EditBoard desk={desk} onClose={toggleModal} />}
              //dispatch(updateBoardThunk(bord, { title: 'NEW TITLE', icon: 'icon_4', backgroundImg: 'image_3' }))
            />
          ) : (
            <Modal
              onClose={toggleModal}
              // children={<DeleteBoard desk={desk} onClose={toggleModal} />}
            />
          ))}
      </div>
    </>
  );
};

export default MyBoards;
