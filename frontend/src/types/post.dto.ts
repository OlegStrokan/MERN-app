
export interface PostDto {
  _id?: string
  content: string;
  likesCount: string;
  user: string;
}

export interface PostResponse {
  message: string,
  data: PostDto[]
}
