import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import css from './Modal.module.css';
import { useEffect, useRef } from 'react';
import icon from '../../images/icons.svg';

const Modal = ({ isOpen, title, children, closeModal }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && dispatch(closeModal());
    document.addEventListener('keydown', handleEscape);

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        dispatch(closeModal());
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal, dispatch]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={css.wrapper}>
      <div className={css.content} ref={modalRef}>
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