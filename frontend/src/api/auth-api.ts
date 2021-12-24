import { instance } from './instance';
import { AuthResponse } from '../types/auth-response';

export const authAPI = {
  registration(email: string, username: string, fullname: string, password: string, passwordConfirmation: string, ): Promise<AuthResponse> {
    return instance.post<AuthResponse>('auth/registration', {email, username, fullname, password, passwordConfirmation} ).then((response) => response.data)
  },
  login(email: string, password: string): Promise<AuthResponse> {
    return instance.post<AuthResponse>('auth/login', {email, password}).then((response) => response.data)
  },
  logout(): Promise<void> {
    return instance.post('auth/logout')
  }
}
