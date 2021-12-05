export type LoginDto = {
  username: string | null;
  password: string | null;
}

export type RegisterDto = {
  email: string | null;
  fullname: string | null;
} & LoginDto

export type UserDto = {
  _id: string | null;
  posts: string[] | null;
  roles: string[] | null;
} & RegisterDto

export type LoginResponseDto = {
  token: string;
  user: UserDto;
}
