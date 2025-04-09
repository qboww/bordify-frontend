// src/pages/AuthPage/AuthPage.jsx
import { NavLink, useParams } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import { LoginSchame, RegistrationSchame } from '../../schemas/AuthSchemas';
import { loginThunk, registerThunk } from '../../redux/user/userOperations';
import css from './AuthPage.module.css';
import DocumentTitle from '../../components/Title/Title';
import { GoogleAuthButton } from '../../components/GoogleAuthButton/GoogleAuthButton';
import { googleAuthThunk } from '../../redux/user/userOperations';

export const AuthPage = () => {
  const { type } = useParams();

  const handleGoogleAuth = () => {
    window.location.href = 'http://localhost:3000/api/auth/google';
  };

  return (
    <>
      <DocumentTitle>
        {type === 'login'
          ? 'Log in to your account and start using our service'
          : 'Register and start using our service'}
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
          
          {/* Add Google Auth Button */}
          <div className={css.socialAuthWrapper}>
            <GoogleAuthButton onClick={handleGoogleAuth} />
          </div>
          
          <div className={css.divider}>or</div>
          
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
        </div>
      </div>
    </>
  );
};

export default AuthPage;