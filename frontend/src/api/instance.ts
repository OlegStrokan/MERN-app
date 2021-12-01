import axios from 'axios';
import { getFromLS } from '../utils/localStorage/getFromLS';

const token = getFromLS('token', 'Authorization' || '')

export const instance = axios.create({
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
