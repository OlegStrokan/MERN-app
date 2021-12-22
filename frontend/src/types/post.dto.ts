import { UserDto } from './user.dto';

export interface PostDto {
  _id?: string
  content: string;
  likesCount: string;
  user: UserDto;
}
