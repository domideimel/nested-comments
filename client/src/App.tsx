import { Route, Router, Routes } from '@solidjs/router'
import type { Component } from 'solid-js'
import PostList from './components/PostList'
import { PostProvider } from './context/PostContext'
import Post from './components/Post'

const App: Component = () => {
  return (
    <Router>
      <div class="container">
        <Routes>
          <Route path="/" component={PostList}/>
          <Route path="/post/:id" element={<PostProvider><Post /></PostProvider>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
