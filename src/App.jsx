import { useDispatch, useSelector } from 'react-redux';
import { lazy, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { DashboardLayout, WelcomePage, NotFound, AuthPage } from './pages';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import { refreshUserThunk } from './redux/user/userOperations';
import { selectIsRefreshing } from './redux/user/userSelectors';
import { selectBoards } from './redux/boards/boardsSelectors';
import Loader from './components/Loader/Loader';
import GoogleRedirectPage from './pages/GoogleRedirectPage/GoogleRedirectPage';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const ScreensPage = lazy(() => import('./pages/ScreensPage/ScreensPage'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const boards = useSelector(selectBoards);
  
  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  const DashboardRedirect = () => {
    if (boards.length > 0) {
      return <Navigate to={`/dashboard/board/${boards[0]._id}`} replace />;
    }

    return <HomePage />;
  };

  return isRefreshing ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/" element={<GoogleRedirectPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardRedirect />} />
        <Route path="board/:id" element={<ScreensPage />} />
      </Route>
      <Route
        path="/welcome"
        element={
          <PublicRoute>
            <WelcomePage />
          </PublicRoute>
        }
      />
      <Route
        path="/auth/:type"
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;