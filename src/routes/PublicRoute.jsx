import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsLoggined } from '../redux/user/userSelectors';

const PublicRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggined);
  const location = useLocation();

  return isLoggedIn 
    ? <Navigate to="/dashboard" state={{ from: location }} replace /> 
    : children;
};

export default PublicRoute;