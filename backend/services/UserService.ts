import { UserModel } from '../models/UserModel';

class UserService {
  async getUsers() {
    const users = await UserModel.find();
    return users;
  }
}

export const userService = new UserService()


