import { User } from './User'
import {Comment} from './Comment'

export interface Like {
  id: string
  user: User
  userId: string
  comment: Comment
  commentId: string
}
