import type { Component, Signal } from 'solid-js'
import { usePost } from '../src/context/PostContext'
import { Post } from '../src/types/Post'

const Post: Component = () => {
  const post = usePost() as () => Post
  return (<>{post().title}</>)
}

export default Post
