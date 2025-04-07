import { NavLink, useParams } from 'react-router-dom';
import AuthForm from '../../components/AuthForm/AuthForm';
import { LoginSchame, RegistrationSchame } from '../../schemas/AuthSchemas';
import { loginThunk, registerThunk } from '../../redux/user/userOperations';
import css from './AuthPage.module.css';
import DocumentTitle from '../../components/Title/Title';

export const AuthPage = () => {
  const { type } = useParams();

  return (
    <>
      <DocumentTitle>
        {type === 'login'
          ? 'Log in to your account and start using our service'
          : 'Register and start using our service'}
      </DocumentTitle>

      <div className={css.background}>
        {/* {isLoading && <Loader />} */}
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


