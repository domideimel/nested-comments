import { Route, Router, Routes } from '@solidjs/router'
import type { Component } from 'solid-js'
import { lazy } from 'solid-js'

const PostList = lazy(() => import('../components/PostList'))
const Post = lazy(() => import('../components/Post'))

const App: Component = () => {
  return (
    <Router>
      <div class="container">
        <Routes>
          <Route path="/" component={PostList}/>
          <Route path="/post/:id" component={Post}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
