import type { Component } from 'solid-js'
import { useParams } from '@solidjs/router'

const Post: Component = () => {
  const params = useParams()
  return (<>Post, {params.id}</>)
}

export default Post
