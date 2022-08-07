import { Comment } from '../types/Comment'
import { Component, createSignal, Show } from 'solid-js'
import { dateFormatter } from '../utils/date'
import IconBtn from './IconBtn'
import { FaRegularHeart, FaSolidReply, FaSolidTrash } from 'solid-icons/fa'
import { BiSolidEdit } from 'solid-icons/bi'
import { usePost } from '../context/PostContext'
import CommentList from './CommentList'

export interface SingleCommentProps {
    comment: Comment
}

const SingleComment: Component<SingleCommentProps> = (props) => {
  const [hiddenChildren, setHiddenChildren] = createSignal<boolean>(false)


  const store = usePost()
  const childComments = store?.getReplies(props.comment.id)

  return <>
    <div class="comment">
      <header class="header">
        <span class='name'>{props.comment.user.name}</span>
        <span class='date'>{dateFormatter(props.comment.createdAt)}</span>
      </header>
      <main class='message'>
        {props.comment.message}
      </main>
      <footer class="footer">
        <IconBtn Icon={FaRegularHeart} aria-label="Like">2</IconBtn>
        <IconBtn Icon={FaSolidReply} aria-label="Reply" />
        <IconBtn Icon={BiSolidEdit} aria-label="Edit" />
        <IconBtn Icon={FaSolidTrash} aria-label="Delete" color="danger" />
      </footer>
    </div>
    <Show when={childComments?.length}>
      <>
        <div class={`nested-comments-stack ${hiddenChildren() && 'hide'}`}>
          <button aria-label="Hide Replys" class="collapse-line" onclick={() => setHiddenChildren(true)} />
          <div class='nested-comments'>
            <CommentList comments={childComments} />
          </div>
        </div>
        <button
          class={`btn mt-1 ${!hiddenChildren() && 'hide'}`}
          onclick={() => setHiddenChildren(false)}
        >Show Replies</button>
      </>
    </Show>
  </>
}

export default SingleComment
