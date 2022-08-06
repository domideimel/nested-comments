import { Component, createContext, JSX, useContext } from 'solid-js'
import { useParams } from '@solidjs/router'
import { Post } from '../types/Post'
import { useAsync } from '../hooks/useAsync'
import { getPost } from '../services/post'
import { createStore } from 'solid-js/store'

export interface PostContextProps {
  children: JSX.Element
}

export const PostContext = createContext()

export const usePost = () => useContext(PostContext)

export const PostProvider: Component<PostContextProps> = (props) => {
  const { id } = useParams()

  const { value, loading, error } = useAsync<Post>(() => getPost(id))

  const post = createStore({ post: { id, ...value() } })

  return (
    <PostContext.Provider value={post}>
      {loading() ? (<h1>Loading...</h1>) : error() ? (<h1 class="error-msg">{error()}</h1>) : (props.children)}
    </PostContext.Provider>
  )
}
