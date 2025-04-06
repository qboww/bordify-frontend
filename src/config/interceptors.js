import { store } from '../redux/store';
import { refreshTokensThunk } from '../redux/user/userOperations';
import { bordifyApi, bordifyApiFormData } from './api';

bordifyApi.interceptors.response.use(
  response => response,
  async error => {
    const { status } = error.response || {};
    if (status === 401) {
      try {
        // Call the refreshThunk action to refresh tokens
        await store.dispatch(refreshTokensThunk());

        // Retry the original request after refreshing the token
        const retryOriginalRequest = new Promise((resolve, reject) => {
          const originalRequest = error.config;
          bordifyApi(originalRequest).then(resolve).catch(reject);
        });

        return retryOriginalRequest;
      } catch (refreshError) {
        // Handle token refresh errors if necessary
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
bordifyApiFormData.interceptors.response.use(
  response => response,
  async error => {
    const { status } = error.response || {};
    if (status === 401) {
      try {
        // Call the refreshThunk action to refresh tokens
        await store.dispatch(refreshTokensThunk());

        // Retry the original request after refreshing the token
        const retryOriginalRequest = new Promise((resolve, reject) => {
          const originalRequest = error.config;
          bordifyApi(originalRequest).then(resolve).catch(reject);
        });

        return retryOriginalRequest;
      } catch (refreshError) {
        // Handle token refresh errors if necessary
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
