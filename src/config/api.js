import axios from 'axios';
const { VITE_API_URL } = import.meta.env;

export const bordifyApiUnAutorized = axios.create({
  baseURL: `${VITE_API_URL}/`,
  headers: { 'Content-Type': 'application/json' },
});

export const bordifyApi = axios.create({
  baseURL: `${VITE_API_URL}/`,
  headers: { 'Content-Type': 'application/json' },
});

export const bordifyApiFormData = axios.create({
  baseURL: `${VITE_API_URL}/`,
  headers: { 'Content-Type': 'multipart/form-data' },
});
