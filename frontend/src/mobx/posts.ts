import { PostDto } from '../types/post.dto';
import { makeAutoObservable } from 'mobx';
import { postsAPI } from '../api/posts-api';
import { UserDto } from '../types/user.dto';

class Posts  {
  posts: PostDto[] = []
  isLoading = false
  error: any = null


  constructor() {
    makeAutoObservable(this)
  }

  setPosts(posts: PostDto[]) {
    this.posts = posts
  }

  async getPosts() {
    const { data } = await postsAPI.getPosts()
    this.setPosts(data)

  }
  async createPosts(content: string, user: UserDto) {
     await postsAPI.createPost(content, user)
  }

  async updatePost(content: string) {
     await postsAPI.updatePost(content)
  }

  async deletePost(postId: string) {
   await postsAPI.deletePost(postId)
  }
}

export const posts = new Posts()
