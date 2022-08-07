import type { Component } from 'solid-js'
import { For } from 'solid-js'
import { getPosts } from '../services/post'
import { Link } from '@solidjs/router'
import { useAsync } from '../hooks/useAsync'

const PostList: Component = () => {
  const { loading, value, error } = useAsync(getPosts)
  return (
    <For each={value()} fallback={<div>Loading...</div>}>
      {(post) => (
        <Link href={`/post/${post.id}`}>
          <h1>{post.title}</h1>
        </Link>
      )}
    </For>
  )
}

export default PostList
