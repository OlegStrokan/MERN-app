import { AuthResponse } from '../types/auth-response';
import { instance } from './instance';
import { UserDto } from '../types/user.dto';

export const usersAPI = {
  getUsers(): Promise<UserDto[]> {
    return instance.get<UserDto[]>('/users',  ).then((response) => response.data)
  },
}
