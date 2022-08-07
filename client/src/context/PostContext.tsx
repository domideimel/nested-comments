import { Accessor, Component, createContext, createMemo, JSX, useContext } from 'solid-js'
import { useParams } from '@solidjs/router'
import { Post } from '../types/Post'
import { useAsync } from '../hooks/useAsync'
import { getPost } from '../services/post'
import { Comment } from '../types/Comment'

export interface PostContextProps {
  children: JSX.Element
}

export interface commentByParentId {
  [key: string]: Comment[] | null
}

export interface PostContextInterface {
  value: Accessor<Post | undefined>
  getReplies: (parentId: string) => Comment[] | null;
}

export const PostContext = createContext<PostContextInterface>()

export const usePost = () => useContext(PostContext)

export const PostProvider: Component<PostContextProps> = (props) => {
  const { id } = useParams()
  const { value, loading, error } = useAsync<Post>(() => getPost(id))

  const commentsByParentId = createMemo(() => {
    const comments = value()?.comments || []
    const group: commentByParentId = {}

    comments.forEach((comment) => {
      if (!comment.parentId) {
        group['main'] ||= []
        group['main'].push(comment)
        return
      }
      group[comment?.parentId] ||= []
      group[comment?.parentId]?.push(comment)
    })

    return group
  })

  const getReplies = (parentId: string) => {
    return commentsByParentId()[parentId]
  }

  const store = {
    value,
    getReplies
  }

  return (
    <PostContext.Provider value={store}>
      {loading() ? (<h1>Loading...</h1>) : error() ? (<h1 class="error-msg">{error()}</h1>) : (props.children)}
    </PostContext.Provider>
  )
}
