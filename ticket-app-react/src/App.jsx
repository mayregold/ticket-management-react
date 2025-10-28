import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'
import PrivateRoute from './routes/PrivateRoute'
import Navbar from './components/Navbar'

export default function App(){
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="app-container px-4 py-6">
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />

          <Route element={<PrivateRoute/>}>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/tickets" element={<Tickets/>} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
