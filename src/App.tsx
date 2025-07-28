import { useState } from 'react'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import Post from './components/Post'
import Feed from './pages/feed'
import CreatePost from './components/CreatePost'

function App() {

  return (
    <>
      {/* <Register />
      <div>break</div>
      <Login />
      <div>break</div>
      <Post /> */}
      {/* <CreatePost /> */}
      <Login />
      <Feed />
    </>
  )
}

export default App
