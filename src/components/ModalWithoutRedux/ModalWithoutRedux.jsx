import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../redux/modal/modalSlice';
import css from './ModalWithoutRedux.module.css';
import { useEffect } from 'react';
import icon from '../../images/icons.svg';

const ModalWithoutRedux = ({isOpen, onClose, title,children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const addCloseEvent = e => {
      e.key === 'Escape' && dispatch(closeModal());
    };
    document.addEventListener('keydown', addCloseEvent);
    return () => {
      document.removeEventListener('keydown', addCloseEvent);
    };
  }, [onClose]);

  const closeOnClickOutside = event => {
    event.currentTarget === event.target && onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={css.wrapper} onClick={closeOnClickOutside}>
      <div className={css.content}>
          <h2>{title}</h2>
          <button className={css.closeBtn} onClick={()=>onClose()}>
          <svg width="18" height="18" className={css.icon}>
            <use href={`${icon}#icon-x-close`}></use>
          </svg>
          </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default ModalWithoutRedux;
