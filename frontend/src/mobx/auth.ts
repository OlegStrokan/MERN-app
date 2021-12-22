import { makeAutoObservable, runInAction } from 'mobx';
import { authAPI } from '../api/auth-api';
import { UserDto } from '../types/user.dto';
import { saveToLS } from '../utils/localStorage/setToLS';
import { PostDto } from '../types/post.dto';

class Auth {
  isAuth = false;
  user = {
    _id: null,
    username: null,
    password: null,
    email: null,
    fullname: null,
    isActivated: false,
    activationLink: null,
    posts: null,
    roles: null,
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

   async registration( email: string, username: string, fullname: string, password: string, password2: string) {
    await authAPI.registration( email, username, fullname, password, password2)
  };
   async login(username: string, password: string) {
     try {
       const response = await authAPI.login(username, password)
       localStorage.setItem('token', JSON.stringify(response.accessToken));
       this.setAuth(true);
       this.setUser(response.user)
     } catch (e: any) {
       console.log(e.response?.message)
     }


  };
   async logout() {
     try {
       const response = await authAPI.logout();
       localStorage.removeItem('token');
       this.setAuth(false);
       this.setUser({} as UserDto)
     } catch (e: any) {
       console.log(e.response?.message)
     }
  }
}

export const auth = new Auth()
