import { store } from '../redux/store';
import { refreshTokensThunk } from '../redux/user/userOperations';
import { bordifyApi, bordifyApiFormData } from './api';

bordifyApi.interceptors.response.use(
  response => response,
  async error => {
    const { status } = error.response || {};
    if (status === 401) {
      try {
        await store.dispatch(refreshTokensThunk());

        const retryOriginalRequest = new Promise((resolve, reject) => {
          const originalRequest = error.config;
          bordifyApi(originalRequest).then(resolve).catch(reject);
        });

        return retryOriginalRequest;
      } catch (refreshError) {
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
        await store.dispatch(refreshTokensThunk());

        const retryOriginalRequest = new Promise((resolve, reject) => {
          const originalRequest = error.config;
          bordifyApi(originalRequest).then(resolve).catch(reject);
        });

        return retryOriginalRequest;
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

bordifyApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

bordifyApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshResponse = await bordifyApi.post('api/auth/refresh', {
          sid: localStorage.getItem('sid') 
        });
        
        const { accessToken, refreshToken } = refreshResponse.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return bordifyApi(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; 
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);