import { Post } from './Post'
import { User } from './User'
import { Like } from './Like'

export interface Comment {
  id: string
  message: string
  createdAt: string
  updatedAt: string
  user: User
  userId: string
  post: Post
  postId: string
  parent?: Comment
  parentId?: string
  likes: Like[]
}
