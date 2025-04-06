import axios from 'axios';
export const bordifyApiUnAutorized = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bordifyApi = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bordifyApiFormData = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
