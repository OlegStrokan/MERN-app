import { instance } from './instance';
import { PostDto } from '../types/post.dto';
import { UserDto } from '../types/user.dto';

export const postsAPI = {
  getPosts(): Promise<PostDto[]> {
    return instance.get('posts', {} ).then((response) => response.data)
  },
  createPost(content: string, user: UserDto): Promise<void> {
    return instance.post('posts', {content, user}).then((response) => response.data)
  },
  updatePost(post: PostDto): Promise<void> {
    return instance.patch('posts').then((response) => response.data)
  },
  deletePost(): Promise<void> {
    return instance.delete('posts').then((response) => response.data)
  }
}
