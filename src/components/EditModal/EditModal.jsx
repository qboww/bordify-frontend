import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/modal/modalSlice';
import { updateUserPreferencesThunk } from '../../redux/user/userOperations';
import s from './EditModal.module.css';
import InputField from '../InputField/InputField';
import InputPassword from '../InputPassword/InputPassword';
import { Button } from '../Button/Button';
import icon from '../../images/icons.svg';
import {
  selectAvatar,
  selectUserEmail,
  selectUserName,
} from '../../redux/user/userSelectors';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditUserScheme } from '../../schemas/AuthSchemas';
import SvgIconAnonym from '../Header/SvgIconAnonym';

const EditModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const avatar = useSelector(selectAvatar);
  const email = useSelector(selectUserEmail);

  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      avatar: avatar,
      username: userName,
      email: email, 
      password: '', 
    },
    resolver: yupResolver(EditUserScheme),
    mode: 'onChange',
  });

  const onSubmit = data => {
    const formData = new FormData();
    
    selectedAvatar && formData.append('avatar', selectedAvatar);
    formData.append('username', data.username);
    
    if (data.email && data.email !== email) {
      formData.append('email', data.email);
    }
    
    if (data.password) {
      formData.append('password', data.password);
    }

    dispatch(updateUserPreferencesThunk(formData));
    onClose();
    reset();
  };

  const handleFileChange = event => {
    const file = event.currentTarget.files[0];
    if (file) {
      setSelectedAvatar(file);
    }
  };

  const inputFileRef = useRef(null);
  const handlePlusButtonClick = () => {
    inputFileRef.current?.click();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      className={s.edit_profile_form}
    >
      <div className={s.avatar_wrap}>
        <label>
          {(avatar || selectedAvatar) && (
            <img
              src={
                selectedAvatar ? URL.createObjectURL(selectedAvatar) : avatar
              }
              alt={`Avatar ${userName}`}
            />
          )}
          {!avatar && !selectedAvatar && (
            <SvgIconAnonym
              className={s.svg_anonym}
              fill="var(--user-icon-fill)"
              width="56"
              height="78"
            />
          )}
          <input
            className={s.input_avatar}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            name="avatar"
            ref={inputFileRef}
          />
          <Button
            small
            width={24}
            height={24}
            icon={`${icon}#icon-plus-small`}
            iconSize="10"
            className={s.plus_btn}
            onClick={handlePlusButtonClick}
          />
        </label>
      </div>
      <InputField
        type="text"
        name="username"
        placeholder="Enter your name"
        register={register}
        errors={errors}
      />
      <InputField
        type="email"
        name="email"
        placeholder="Enter your email"
        register={register} 
        errors={errors}
      />
      <InputPassword
        name="password"
        placeholder="Enter new password"
        register={register} 
        errors={errors}
      />
      <Button buttonText="Save" type="submit" />
    </form>
  );
};

export default EditModal;