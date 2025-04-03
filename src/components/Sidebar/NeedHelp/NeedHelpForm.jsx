import { useForm } from 'react-hook-form';
import InputField from '../../InputField/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import s from './NeedHelpForm.module.css';
import { Button } from '../../Button/Button';
import { useSelector } from 'react-redux';
import { selectUserEmail } from '../../../redux/user/userSelectors';
import { useDispatch } from 'react-redux';
import { contactSupportThunk } from '../../../redux/support/supportOperations';
import { NeedHelpFormScheme } from '../../../schames/AuthSchames';
const NeedHelpForm = ({onClose}) => {
  const dispatch = useDispatch()
  const email = useSelector(selectUserEmail);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { email: email, message: '' },
    resolver: yupResolver(NeedHelpFormScheme),
    mode: 'onChange',
  });

  const onSubmit = data => {
    dispatch(contactSupportThunk(data))
    onClose()
    reset();
  };
  return (
<form
    className={s.need_help_form}
    onSubmit={handleSubmit(onSubmit)}
    autoComplete="nope"
  >
      <InputField register={register} name="email" errors={errors} />
      <InputField
        register={register}
        name="message"
        errors={errors}
        isTextArea
      />
      <Button buttonText="Send" type='submit'/>
    </form>
  );
};

export default NeedHelpForm;
