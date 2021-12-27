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

  async updatePost(post: PostDto) {
     await postsAPI.updatePost(post)
  }

  async deletePost() {
   await postsAPI.deletePost()
  }
}

export const posts = new Posts()
