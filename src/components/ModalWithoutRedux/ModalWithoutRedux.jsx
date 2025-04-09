import ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';
import css from './ModalWithoutRedux.module.css';
import icon from '../../images/icons.svg';

const ModalWithoutRedux = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose();
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={css.wrapper}>
      <div className={css.content} ref={modalRef}>
        <h2>{title}</h2>
        <button className={css.closeBtn} onClick={onClose}>
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