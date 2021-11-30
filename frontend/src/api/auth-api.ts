import { instance } from './instance';
import { LoginDto, LogoutDto, RegisterDto } from '../types/login.dto';

export const authAPI = {
  registration(data: RegisterDto): Promise<RegisterDto> {
    return instance.post('auth/registration', {data}).then((response) => response.data)
  },
  login(data: LoginDto) {
    return instance.post('auth/login', {data}).then((response) => response.data)

  },
  logout(data: LogoutDto) {
    return instance.delete('auth/logout', {data}).then((response) => response.data)
  }
}
