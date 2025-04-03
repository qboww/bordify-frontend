import { useDispatch } from 'react-redux';
import s from './ColumnTitle.module.css';
import {
  openEditColumnModal,
  closeEditColumnModal,
} from '../../redux/modal/modalSlice';
import iconsSprite from '../../images/icons.svg';
import {
  deleteColumnThunk,
  updateColumnThunk,
} from '../../redux/columns/columnsOperations';
import { useSelector } from 'react-redux';
import { selectEditColumnOpen } from '../../redux/modal/modalSelector';
import ColumnForm from '../ColumnForm/ColumnForm';
import Modal from '../Modal/Modal';
import { useParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { useEffect, useState } from 'react';
import InputField from '../InputField/InputField';

const ColumnTitle = ({ title, columnid }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isOpen = useSelector(state => selectEditColumnOpen(state, columnid));
  const handleEditOpen = () => {
    dispatch(openEditColumnModal(columnid));
  };
  const [inputValue, setInputValue] = useState(title);
  const [debouncedText] = useDebounce(inputValue.trim(), 1000);
  const handleBlur = () => {
    if (debouncedText !== inputValue.trim() && debouncedText !== '') {
      dispatch(updateColumnThunk({ boardid: id, columnid, title: inputValue }));
    }
  };
  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const handleDelete = columnid => {
    dispatch(deleteColumnThunk({ boardid: id, columnid }));
  };

  return (
    <>
      <InputField
        className={s.col_title}
        classNameLabel={s.col_label}
        value={inputValue}
        defaultValue={title}
        onChange={handleChange}
        onBlur={() => {
          handleBlur();
        }}
      >
        <div className={s.right_side}>
          <button onClick={handleEditOpen}>
            <svg width="16" height="16">
              <use href={`${iconsSprite}#icon-pencil`}></use>
            </svg>
          </button>
          <button
            type="button"
            onClick={() => {
              handleDelete(columnid);
            }}
          >
            <svg width="16" height="16">
              <use href={`${iconsSprite}#icon-trash`}></use>
            </svg>
          </button>
        </div>
      </InputField>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          closeModal={() => dispatch(closeEditColumnModal(columnid))}
          title="Edit column"
        >
          <ColumnForm
            boardid={id}
            type="edit"
            title={title}
            columnid={columnid}
            onClose={() => dispatch(closeEditColumnModal(columnid))}
          />
        </Modal>
      )}
    </>
  );
};
export default ColumnTitle;
{
  /* <div className={s.col_title}>
<p>{title}</p>
<div className={s.right_side}>
  <button onClick={handleEditOpen}>
    <svg width="16" height="16">
      <use href={`${iconsSprite}#icon-pencil`}></use>
    </svg>
  </button>
  <button
    type="button"
    onClick={() => {
      handleDelete(columnid);
    }}
  >
    <svg width="16" height="16">
      <use href={`${iconsSprite}#icon-trash`}></use>
    </svg>
  </button>
</div>

{isOpen && (
  <Modal
    isOpen={isOpen}
    closeModal={() => dispatch(closeEditColumnModal(columnid))}
    title="Edit column"
  >
    <ColumnForm
      boardid={id}
      type="edit"
      title={title}
      columnid={columnid}
      onClose={() => dispatch(closeEditColumnModal(columnid))}
    />
  </Modal>
)}
</div> */
}
