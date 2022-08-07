import { Component, JSX } from 'solid-js'

export interface IconBtnProps {
  Icon: Component,
  isActive?: boolean,
  color?: string,
  children?: JSX.Element,
  props?: any
}

const IconBtn: Component<IconBtnProps> = (props) => {
  return <button
    class={`btn icon-btn ${props.isActive && 'icon-btn-active'} ${props.color || ''}`}
    {...props.props}
  >
      <span class={`${props.children != null ? 'mr-1' : ''}`}>
          {<props.Icon/>}
      </span>
    {props.children}
  </button>
}

export default IconBtn
