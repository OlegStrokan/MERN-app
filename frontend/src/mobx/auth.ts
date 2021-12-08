import { makeAutoObservable, runInAction } from 'mobx';
import { LoginDto, RegisterDto, UserDto } from '../types/login.dto';
import { authAPI } from '../api/auth-api';
import { saveToLS } from '../utils/localStorage/setToLS';

class Auth {
  isAuth = false;
  user: UserDto = {
    _id: null,
    username: null,
    password: null,
    email: null,
    fullname: null,
    posts: null,
    roles: null,
  }

  constructor() {
    makeAutoObservable(this)
  }

  registration = async({ email, username, fullname, password }: RegisterDto) => {
    await authAPI.registration({ email, username, fullname, password })
  };
  login = async({ username, password }: LoginDto) => {
    const response = await authAPI.login({ username, password })
    runInAction(() => {
      this.isAuth = true;
      this.user.username = response.user.username;
      this.user.fullname = response.user.fullname;
      this.user.email = response.user.email;
      this.user.posts = response.user.posts;
      this.user.roles = response.user.roles;
      localStorage.setItem('token', JSON.stringify(response.token));
    })

  };
  logout = async( _id: string | null ) => {
    runInAction(() => {
      this.isAuth = false
    })
  }
}

export const auth = new Auth()