import { instance } from './instance';
import { LoginDto, LoginResponseDto, RegisterDto, UserDto } from '../types/login.dto';

export const authAPI = {
  registration(data: RegisterDto): Promise<RegisterDto> {
    return instance.post('auth/registration', {data}).then((response) => response.data)
  },
  login(data: LoginDto): Promise<LoginResponseDto> {
    return instance.post<LoginResponseDto>('auth/login', {data}).then((response) => response.data)
  },
  updateProfile(fullname: string, username: string, email: string, _id: string): Promise<UserDto> {
    return instance.patch<UserDto>('profile', {fullname, username, email, _id}).then((response) => response.data)
  }
}
