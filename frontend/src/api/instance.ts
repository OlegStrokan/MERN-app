import axios from 'axios';

export const instance = axios.create({
  withCredentials: true,
  headers: {
    // @ts-ignore
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
  },
});
