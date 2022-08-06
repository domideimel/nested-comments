import { makeRequest } from './makeRequest'
import type { Post } from '../types/Post'

export const getPosts = async (): Promise<Post[]> => {
  return await makeRequest('/posts')
}

export const getPost = async (id: string): Promise<Post> => {
  return await makeRequest(`/posts/${id}`)
}
