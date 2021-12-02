import { makeAutoObservable, runInAction } from 'mobx';
import { LoginDto, LogoutDto, RegisterDto } from '../types/login.dto';
import { authAPI } from '../api/auth-api';

class Auth {
  isAuth = false;
  username = null as null | string;
  fullname = null as null | string;
  email = null as null | string;

  constructor() {
    makeAutoObservable(this)
  }

  registration = async({ email, username, fullname, password }: RegisterDto) => {
    await authAPI.registration({ email, username, fullname, password })
  };
  login = async({ username, password }: LoginDto) => {
    const data = await authAPI.login({ username, password })
    runInAction(() => {
      this.username = data.username;
      this.fullname = data.fullname;
      this.email = data.email;
      this.isAuth = true;
    })

  };
  logout = async({ _id }: LogoutDto) => {
    const data = await authAPI.logout({ _id })
    runInAction(() => {
      this.isAuth = false
    })
  }
}

export const auth = new Auth()
