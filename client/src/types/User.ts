import { Comment } from './Comment'
import { Like } from './Like'

export interface User {
  id: string
  name: string
  comments: Comment[]
  likes: Like[]
}
