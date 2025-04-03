import axios from 'axios';
export const taskProApiUnAutorized = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskProApi = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskProApiFormData = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
