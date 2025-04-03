import s from './BoardModal.module.css';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import InputField from '../../InputField/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import icon from '../../../images/icons.svg';
import { Button } from '../../Button/Button';
import IconsList from './IconsList/IconsList';
import BgcList from './BgcList/BgcList';
import { useEffect, useState } from 'react';
import { BoardFormScheme } from '../../../schames/BoardFormSchemes';
import {
  createBoardThunk,
  updateBoardThunk,
} from '../../../redux/boards/boardsOperations';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

const BoardModal = ({ type, title, chosenIcon, chosenBackGround, onClose }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = {
    create: {
      scheme: BoardFormScheme,
      onSubmitThunk: createBoardThunk,
      defaultValues: { title: '', icon: '', backgroundImg: '' },
    },
    edit: {
      scheme: BoardFormScheme,
      onSubmitThunk: updateBoardThunk,
      defaultValues: {
        title: title,
        icon: chosenIcon,
        backgroundImg: chosenBackGround,
      },
    },
  };

  const [selectedIcon, setSelectedIcon] = useState(
    options[type].defaultValues.icon
  );
  const [selectedBgc, setSelectedBgc] = useState(
    options[type].defaultValues.backgroundImg
  );
  const [chosenTitle, setChosenTitle] = useState(
    options[type].defaultValues.title
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: options[type].defaultValues,
    resolver: yupResolver(BoardFormScheme),
    mode: 'onChange',
    async: true,
  });

  const onSubmit = async data => {
    const formData =
      type === 'create'
        ? {
            ...data,
            title: chosenTitle,
            icon: selectedIcon,
            backgroundImg: selectedBgc === 'none' ? null : selectedBgc,
          }
        : {
            ...data,
            title: chosenTitle,
            icon: selectedIcon,
            backgroundImg: selectedBgc === 'none' ? null : selectedBgc,
            _id: id,
          };

    const board = await dispatch(options[type].onSubmitThunk(formData));

    if (type === 'create') {
      navigate(`/board/${board.payload.data._id}`);
    }
    onClose();
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
        onChange={e => setChosenTitle(e.target.value)}
      />

      <section>
        <h2>Icons</h2>
        <IconsList
          selectedIcon={selectedIcon}
          setSelectedIcon={setSelectedIcon}
          register={register}
          name="icon"
        />
      </section>
      <section>
        <h2>Background</h2>
        <BgcList
          selectedBgc={selectedBgc}
          setSelectedBgc={setSelectedBgc}
          register={register}
          name="backgroundImg"
        />
      </section>
      <Button
        className={s.btn}
        type="submit"
        buttonText={type === 'create' ? 'Create' : 'Edit'}
        icon={`${icon}#icon-plus-small`}
      />
    </form>
  );
};

export default BoardModal;
