import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import authService from '../services/authService'

export default function PrivateRoute(){
  const user = authService.getCurrentUser()
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}
