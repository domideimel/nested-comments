import type { Component } from 'solid-js'
import { createSignal, Show } from 'solid-js'
import { usePost } from '../context/PostContext'
import CommentList from './CommentList'
import { Comment } from '../types/Comment'

const Post: Component = () => {
  const store = usePost()
  const [rootComments] = createSignal<Comment[] | null | undefined>(store?.getReplies('main'))
  return (<>
    <Show when={store!.value()}>
      <h1>{store!.value()!.title}</h1>
      <article>{store!.value()!.body}</article>
      <h3 class="comments-title">Comments</h3>
      <section>
        <Show
          when={rootComments() != null && rootComments()?.length}
          fallback={<div>No Comments found</div>}
        >
          <div class="mt-4">
            <CommentList comments={rootComments()}/>
          </div>
        </Show>
      </section>
    </Show>
  </>)
}

export default Post
