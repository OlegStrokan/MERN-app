import { makeAutoObservable } from 'mobx';
import { authAPI } from '../api/auth-api';
import { UserDto } from '../types/user.dto';
import { usersAPI } from '../api/users-api';

class Auth {
  isAuth = false;
  user = {
    id: null,
    username: null,
    password: null,
    email: null,
    fullname: null,
    isActivated: false,
    activationLink: null,
    posts: null,
    role: null,
  } as unknown as UserDto;

  error: any = null;

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(value: boolean) {
    this.isAuth = value;
  }

  setUser(user: UserDto) {
    this.user = user
  }

  setError(error: any) {
    this.error = error;
  }

  async registration(email: string, username: string, fullname: string, password: string, confirmPassword: string) {
    await authAPI.registration(email, username, fullname, password, confirmPassword)
  };

  async login(username: string, password: string) {
    try {
      debugger;
      const response = await authAPI.login(username, password)
      localStorage.setItem('token', JSON.stringify(response.accessToken));
      this.setAuth(true);
      this.setUser(response.user)
    } catch (e: any) {
      this.setError(e.response?.message)
    }

  };

  async logout() {
    try {
      const response = await authAPI.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as UserDto)
    } catch (e: any) {
      this.setError(e.response?.message)
    }

  }

  async updateProfile(id: string, email: string, username: string, fullname: string) {
    try {
      const profile = await usersAPI.updateProfile(id, email, username, fullname);
      this.setUser(profile);
    } catch(e: any) {
      this.setError(e.response?.message)
    }
  }
}

export const auth = new Auth()
