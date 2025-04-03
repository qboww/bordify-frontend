import s from './ColumnForm.module.css';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import icon from '../../images/icons.svg';

import InputField from '../InputField/InputField';
import { Button } from '../Button/Button';
import { ColumnFormScheme } from '../../schames/BoardFormSchemes';
import {
  createNewColumnThunk,
  updateColumnThunk,
} from '../../redux/columns/columnsOperations';

const ColumnForm = ({ type, title, onClose, boardid, columnid }) => {
  const dispatch = useDispatch();

  const options = {
    create: {
      onSubmitThunk: createNewColumnThunk,
      defaultValues: { title: '' },
    },
    edit: {
      onSubmitThunk: updateColumnThunk,
      defaultValues: {
        title: title,
      },
    },
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: options[type].defaultValues,
    resolver: yupResolver(ColumnFormScheme),
    mode: 'onChange',
  });
  const onSubmit = data => {
    const formData =
      type === 'create'
        ? {
            boardid,
            title: data.title,
          }
        : {
            boardid,
            columnid,
            title: data.title,
          };

    dispatch(options[type].onSubmitThunk(formData));
    onClose(columnid);
    reset();
  };

  return (
    <form
      className={s.form_styles}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="nope"
    >
      <InputField
        type="text"
        name="title"
        placeholder="Title"
        register={register}
        errors={errors}
      />
      <Button
        className={s.btn}
        type="submit"
        buttonText={type === 'create' ? 'Create' : 'Edit'}
        icon={`${icon}#icon-plus-small`}
      />
    </form>
  );
};

export default ColumnForm;
