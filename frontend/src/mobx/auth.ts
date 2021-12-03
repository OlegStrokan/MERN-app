import { makeAutoObservable, runInAction } from 'mobx';
import { LoginDto, LogoutDto, RegisterDto } from '../types/login.dto';
import { authAPI } from '../api/auth-api';
import { saveToLS } from '../utils/localStorage/setToLS';

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
      this.isAuth = true;
      saveToLS('token', data.token, 'token')
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
