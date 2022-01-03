import { UserDto } from '../types/user.dto';
import { makeAutoObservable } from 'mobx';
import { usersAPI } from '../api/users-api';

class Users {
  users: UserDto[] = [];
  error: any = null;

  constructor() {
    makeAutoObservable(this);
  }
  setUsers(users: UserDto[]) {
    this.users = users;
  }

  async getUsers() {
    const users = await usersAPI.getUsers();
    this.setUsers(users.data);
}
}

export const usersState = new Users()
