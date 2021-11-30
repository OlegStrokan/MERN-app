import axios from 'axios';
import { getFromLS } from '../utils/localStorage/getFromLS';

const token = getFromLS('token', 'Authorization' || '')

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8888/',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
