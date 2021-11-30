export type LoginDto = {
  username: string,
  password: string
}

export type LogoutDto = {
  _id: string
}

export type RegisterDto = {
  email: string,
  fullname: string,
} & LoginDto

export type UserDto = {
  _id: string,
  posts: string[],
  roles: string[],
} & RegisterDto
