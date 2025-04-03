import { useEffect, useState } from 'react';
import s from './Header.module.css';
import Select from 'react-select';
import {
  customComponents,
  customStyles,
  selectOptions,
} from './selectSettings.jsx';
import {
  selectAvatar,
  selectUserName,
  selectUserTheme,
} from '../../redux/user/userSelectors.js';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  closeEditProfileModal,
  openEditProfileModal,
} from '../../redux/modal/modalSlice.js';
import Modal from '../Modal/Modal.jsx';
import { useMedia } from '../../hooks/useMedia.jsx';
import icons from '../../images/icons.svg';
import SvgIconAnonym from './SvgIconAnonym.jsx';
import { updateUserPreferencesThunk } from '../../redux/user/userOperations.js';
import EditModal from '../EditModal/EditModal.jsx';

import { selectEditProfileModal } from '../../redux/modal/modalSelector.js';

import Loader from '../Loader/Loader.jsx';
import { selectLoadingData } from '../../redux/columns/columnsSelectors.js';

const Header = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const avatar = useSelector(selectAvatar);

  const userTheme = useSelector(selectUserTheme);
  const [theme, setTheme] = useState(
    selectOptions.filter(el => el.value === userTheme)
  );
  const isOpen = useSelector(selectEditProfileModal);
  const isLoading = useSelector(selectLoadingData);

  const { isDesktop } = useMedia();

  const handleOpen = () => {
    dispatch(openEditProfileModal());
  };

  const handleChange = selectedOption => {
    setTheme(selectedOption);
    dispatch(updateUserPreferencesThunk({ theme: selectedOption.value }));
    document.documentElement.setAttribute('theme', selectedOption.value);
  };
  useEffect(() => {
    document.documentElement.setAttribute('theme', theme.value);
  }, [theme.value]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <header className={s.header}>
      {!isDesktop ? (
        <svg
          width="32"
          height="32"
          className={s.svg_burger}
          onClick={toggleSidebar}
        >
          <use href={`${icons}#icon-burger`}></use>
        </svg>
      ) : (
        <span></span>
      )}
      {isLoading ?? <Loader />}
      <section className={s.right}>
        <Select
          value={theme}
          onChange={handleChange}
          options={selectOptions}
          placeholder="Theme"
          styles={customStyles}
          components={customComponents}
          isOptionSelected={true}
        />
        <div className={s.user_info} onClick={handleOpen}>
          <p>{userName ? userName : 'Anonym'}</p>
          {avatar ? (
            <div className={s.img_wrap}>
              <img src={avatar} alt={`Avatar ${userName}`} />
            </div>
          ) : (
            <div className={s.svg_wrap}>
              <div>
                <SvgIconAnonym fill="var(--user-icon-fill)" />
              </div>
            </div>
          )}
        </div>
      </section>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          closeModal={closeEditProfileModal}
          title="Edit profile"
        >
          <EditModal onClose={() => dispatch(closeEditProfileModal())} />
        </Modal>
      )}
    </header>
  );
};
export default Header;
