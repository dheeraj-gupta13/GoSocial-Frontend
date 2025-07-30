import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import Post from './components/Post'
import Feed from './pages/feed'
import CreatePost from './components/CreatePost'
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import PublicRoute from "./pages/PublicRoute";
import MainLayout from "./pages/MainLayout";

function App() {

  return (
    <Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
        />
        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
        />

        {/* Protected Route */}
        <Route
          element={
            <ProtectedRoute />
          }
        >
          <Route path="/" element={<Feed />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
