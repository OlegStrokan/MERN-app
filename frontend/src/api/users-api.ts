import { instance } from './instance';
import { UserDto } from '../types/user.dto';

export const usersAPI = {
  getUsers(): Promise<{ data: UserDto[] } > {
    return instance.get<{data: UserDto[]}>('/users',  ).then((response) => response.data)
  },
  updateProfile(id: string, email: string, username: string, fullname: string): Promise<UserDto> {
    return instance.post<UserDto>('/profile', { id, email, username, fullname } ).then((response) => response.data)
  },
}

