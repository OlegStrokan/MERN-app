import { UserDto } from './user.dto';


export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}
