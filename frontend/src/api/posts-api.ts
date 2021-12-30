import { instance } from './instance';
import { PostDto, PostResponse } from '../types/post.dto';
import { UserDto } from '../types/user.dto';

export const postsAPI = {
  getPosts(): Promise<PostResponse> {
    return instance.get<PostResponse>('posts', {}).then((response) => response.data)
  },
  createPost(content: string, user: UserDto): Promise<PostResponse> {
    return instance.post<PostResponse>('posts', { content, user }).then((response) => response.data)
  },
  updatePost(post: PostDto): Promise<PostResponse> {
    return instance.patch<PostResponse>('posts', post).then((response) => response.data)
  },
  deletePost(postId: string): Promise<PostResponse> {
    return instance.delete<PostResponse>(`posts/${postId}`, ).then((response) => response.data)
  }
}
