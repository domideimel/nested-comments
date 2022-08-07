import { Component, For } from 'solid-js'
import { Comment } from '../types/Comment'
import SingleComment from './SingleComment'
export interface CommentListProps {
  comments: Comment[] | null | undefined
}

const CommentList: Component<CommentListProps> = (props) => {
  return (
    <For each={props.comments}>
      {(comment) => (
        <div class="comment-stack">
            <SingleComment comment={comment}/>
        </div>
      )}
    </For>
  )
}

export default CommentList
