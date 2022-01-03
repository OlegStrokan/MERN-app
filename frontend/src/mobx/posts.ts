import { PostDto } from '../types/post.dto';
import { makeAutoObservable } from 'mobx';
import { postsAPI } from '../api/posts-api';
import { UserDto } from '../types/user.dto';

class Posts  {
  posts: PostDto[] = []
  isLoading = false
  error: any = null
  currentPost: PostDto | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setPosts(posts: PostDto[]) {
    this.posts = posts
  }

  setCurrentPost(post: PostDto) {
    this.currentPost = post
  }

  async getPosts() {
    const { data } = await postsAPI.getPosts()
    this.setPosts(data)

  }

  async showPost(id: string) {
    const { data } = await postsAPI.showPost(id)
    this.setCurrentPost(data)

  }
  async createPosts(content: string, user: UserDto) {
     await postsAPI.createPost(content, user)
  }

  async updatePost(post: PostDto) {
     await postsAPI.updatePost(post)
  }

  async deletePost(postId: string) {
   await postsAPI.deletePost(postId)
  }
}

export const postsState = new Posts()
