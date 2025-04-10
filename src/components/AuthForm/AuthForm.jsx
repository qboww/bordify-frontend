import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import css from './AuthForm.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../InputField/InputField';
import { Button } from '../Button/Button';
import InputPassword from '../InputPassword/InputPassword';
import {
  selectIsVerified,
  selectUserEmail,
} from '../../redux/user/userSelectors';
import {
  selectModal,
  selectResendVerifyEmailModal,
} from '../../redux/modal/modalSelector';
import {
  closeResendVerifyEmailModal,
  openModal,
  openResendVerifyEmailModal,
} from '../../redux/modal/modalSlice';
import { createPortal } from 'react-dom';
import Modal from '../../components/Modal/Modal';
import EmailResendModal from '../EmailResendModal/EmailResendModal';
import { setIsVerified, setUserEmail } from '../../redux/user/userSlice';
import { resendVerificationEmailThunk } from '../../redux/user/userOperations';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthForm = ({
  registerForm = false,
  loginForm = false,
  scheme,
  onSubmitThunk,
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUserEmail);
  const isVerified = useSelector(selectIsVerified);
  const isResendVerifyEmailModalOpen = useSelector(selectResendVerifyEmailModal);

  useEffect(() => {
    if (isVerified === false) {
      dispatch(openResendVerifyEmailModal());
      dispatch(resendVerificationEmailThunk(userEmail));
      dispatch(setIsVerified());
    }
  }, [isVerified, dispatch, userEmail]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: registerForm
      ? { username: '', email: '', password: '' }
      : { email: '', password: '' },
    resolver: yupResolver(scheme),
    mode: 'onChange',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (token) {
      verifyEmailToken(token);
    }
  }, []);

  useEffect(() => {
    if (errorMessage === 'Please verify your email first') {
      dispatch(openResendVerifyEmailModal());
    }
  }, [errorMessage, dispatch]);
  
  const verifyEmailToken = async (token) => {
    try {
      await axios.get(`/api/auth/verify-email/${token}`);
      toast.success('Email verified successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed');
    }
  };

  const onSubmit = async (data) => {
    setErrorMessage('');
    try {
      const result = await dispatch(onSubmitThunk(data)).unwrap();
      if (registerForm) {
        toast.success('Registration successful!');
      } else {
        toast.success('Login successful!');
      }
      reset();
    } catch (error) {
      setErrorMessage(error.payload || 'Something went wrong');
      toast.error(error.payload || 'Something went wrong');
    }
  };

  return (
    <>
      {isResendVerifyEmailModalOpen &&
        createPortal(
          <Modal
            isOpen={openResendVerifyEmailModal}
            closeModal={closeResendVerifyEmailModal}
            title={'Email verification is required'}
          >
            <EmailResendModal />
          </Modal>,
          document.getElementById('modal-root')
        )}
      <form
        className={css.formStyle}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        {registerForm && (
          <InputField
            type="text"
            name="username"
            placeholder="Enter your name"
            register={register}
            errors={errors}
            required
          />
        )}
        
        <InputField
          type="email"
          name="email"
          placeholder="Enter your email"
          register={register}
          errors={errors}
          required
        />
        
        <InputPassword 
          name="password" 
          register={register} 
          errors={errors}
          required
        />
        
        <Button
          className={css.buttonStyles}
          type="submit"
          disabled={!isValid}
          buttonText={registerForm ? 'Register' : 'Log in'}
        />
      </form>
    </>
  );
};

export default AuthForm;