import { NavLink, useParams } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import { LoginSchame, RegistrationSchame } from '../../schemas/AuthSchemas';
import { loginThunk, registerThunk } from '../../redux/user/userOperations';
import css from './AuthPage.module.css';
import DocumentTitle from '../../components/Title/Title';
import { GoogleAuthButton } from '../../components/GoogleAuthButton/GoogleAuthButton';
import { googleAuthThunk } from '../../redux/user/userOperations';
const { VITE_API_URL } = import.meta.env;

export const AuthPage = () => {
  const { type } = useParams();

  const handleGoogleAuth = () => {
    window.location.href = `${VITE_API_URL}/api/auth/google`;
  };

  return (
    <>
      <DocumentTitle>
        {type === 'login'
          ? 'Log in'
          : 'Register'}
      </DocumentTitle>

      <div className={css.background}>
        <div className={css.formWrapper}>
          <ul className={css.authNav}>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? css.authLink
                    : `${css.activeAuthLink} ${css.authLink}`
                }
                to="/auth/register"
              >
                Registration
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? css.authLink
                    : `${css.activeAuthLink} ${css.authLink}`
                }
                to="/auth/login"
              >
                Log in
              </NavLink>
            </li>
          </ul>

          <div className={css.btnWrapper}>
            {type === 'login' ? (
              <AuthForm
                loginForm
                key="login"
                scheme={LoginSchame}
                onSubmitThunk={loginThunk}
              />
            ) : (
              <AuthForm
                registerForm
                key="register"
                scheme={RegistrationSchame}
                onSubmitThunk={registerThunk}
              />
            )}
            <div className={css.socialAuthWrapper}>
              <GoogleAuthButton onClick={handleGoogleAuth} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;