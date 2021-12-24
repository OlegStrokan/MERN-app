import axios from 'axios';
import { AuthResponse } from '../types/auth-response';

export const BASE_URL = 'http://localhost:8000'

export const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
  // @ts-ignore
  config.headers.Authorization =  `Bearer ${localStorage.getItem('token')}`
  return config;
});

instance.interceptors.response.use((config) => {
  return config;
},async (error) => {
  const originalRequest = error.config;
  if (error.response.status == 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get<AuthResponse>(`${BASE_URL}/token/refresh`, {withCredentials: true})
      localStorage.setItem('token', response.data.accessToken);
      return instance.request(originalRequest);
    } catch (e) {
      console.log('НЕ АВТОРИЗОВАН')
    }
  }
  throw error;
})
