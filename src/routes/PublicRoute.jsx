import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggined } from '../redux/user/userSelectors';

const PublicRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggined);
  return isLoggedIn ? <Navigate to="/" /> : children;
};

export default PublicRoute;
