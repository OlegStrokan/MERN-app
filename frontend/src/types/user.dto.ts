import { PostDto } from './post.dto';


export interface UserDto {
  _id?: string;
  email: string;
  fullname: string;
  username: string;
  password: string;
  roles: string[];
  isActivated: boolean;
  activationLink: string;
  posts?: PostDto[];
}
