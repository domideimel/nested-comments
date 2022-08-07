import type { Component } from 'solid-js'
import { createSignal, Show } from 'solid-js'
import { usePost } from '../src/context/PostContext'

const Post: Component = () => {
  const store = usePost()
  const [rootComments] = createSignal(store?.getReplies('main'))
  return (<>
    <Show when={store!.value()}>
      <h1>{store!.value()!.title}</h1>
      <article>{store!.value()!.body}</article>
      <h3 class="comments-title">Comments</h3>
      <section>
        {JSON.stringify(rootComments())}
      </section>
    </Show>
  </>)
}

export default Post
