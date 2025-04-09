import 'typeface-roboto';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { DashboardLayout, WelcomePage, NotFound, AuthPage } from './pages';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import { refreshUserThunk } from './redux/user/userOperations';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsRefreshing } from './redux/user/userSelectors';
import { lazy, useEffect } from 'react';
import Loader from './components/Loader/Loader';
import { Board } from './components/Board/Board';
import GoogleRedirectPage from './pages/GoogleRedirectPage/GoogleRedirectPage';


const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const ScreensPage = lazy(() => import('./pages/ScreensPage/ScreensPage'));
function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/" element={<GoogleRedirectPage />} />
      <Route
        path="/dashboard" // Add this dashboard route
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<HomePage />} />
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
