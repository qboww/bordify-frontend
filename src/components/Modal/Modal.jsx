import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import css from './Modal.module.css';
import { useEffect } from 'react';
import icon from '../../images/icons.svg';

const Modal = ({ isOpen, title, children, closeModal }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && dispatch(closeModal());
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeModal]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={css.wrapper}>
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