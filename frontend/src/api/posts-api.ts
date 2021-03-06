import { instance } from './instance';
import { PostDto, PostResponse } from '../types/post.dto';
import { UserDto } from '../types/user.dto';

export const postsAPI = {
  getPosts(): Promise<PostResponse> {
    return instance.get<PostResponse>('posts').then((response) => response.data)
  },
  showPost(id: string): Promise<{data: PostDto}> {
    return instance.get<{ data: PostDto }>(`posts/${id}`, {}).then((response) => response.data)
  },
  createPost(content: string, title: string , user: UserDto): Promise<PostResponse> {
    return instance.post<PostResponse>('posts', { content, title, user }).then((response) => response.data)
  },
  updatePost(post: PostDto): Promise<PostResponse> {
    return instance.patch<PostResponse>(`posts/${post._id}`, post).then((response) => response.data)
  },
  deletePost(postId: string): Promise<PostResponse> {
    return instance.delete<PostResponse>(`posts/${postId}`, ).then((response) => response.data)
  }
}
