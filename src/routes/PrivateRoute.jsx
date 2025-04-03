import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggined } from '../redux/user/userSelectors';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggined);

  return isLoggedIn ? children : <Navigate to="/welcome" />;
};

export default PrivateRoute;
