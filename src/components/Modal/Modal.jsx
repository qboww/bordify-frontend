import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import css from './Modal.module.css';
import { selectModal } from '../../redux/modal/modalSelector';
import { useEffect } from 'react';
import clsx from 'clsx';
import icon from '../../images/icons.svg';

const Modal = ({ isOpen, title, children, closeModal }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const addCloseEvent = e => {
      e.key === 'Escape' && dispatch(closeModal());
    };
    document.addEventListener('keydown', addCloseEvent);

    return () => {
      document.removeEventListener('keydown', addCloseEvent);
    };
  }, [closeModal]);

  const closeOnClickOutside = event => {
    event.currentTarget === event.target && dispatch(closeModal());
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={css.wrapper} onClick={closeOnClickOutside}>
      <div className={css.content}>
        <h2>{title}</h2>
        <button className={css.closeBtn} onClick={() => dispatch(closeModal())}>
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

export default Modal;
