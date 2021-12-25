
export interface PostDto {
  _id?: string
  content: string;
  likesCount: string;
  userId: string;
}

export interface PostResponse {
  message: string,
  posts: PostDto[]
}
