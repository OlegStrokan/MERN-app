import { instance } from './instance';
import { LoginDto, LoginResponseDto, RegisterDto } from '../types/login.dto';

export const authAPI = {
  registration(data: RegisterDto): Promise<RegisterDto> {
    return instance.post('auth/registration', {data}).then((response) => response.data)
  },
  login(data: LoginDto): Promise<LoginResponseDto> {
    return instance.post<LoginResponseDto>('auth/login', {data}).then((response) => response.data)

  }
}
