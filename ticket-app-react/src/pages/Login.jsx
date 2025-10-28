import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'
import ErrorBanner from '../components/ErrorBanner'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [serverError, setServerError] = useState(null)
  const navigate = useNavigate()

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function onSubmit(e) {
    e.preventDefault()
    try {
      authService.login(form)
      navigate('/dashboard')
    } catch (err) {
      setServerError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-teal-50 px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-slate-100">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-teal-100 text-teal-600 flex items-center justify-center rounded-full text-3xl font-bold shadow-sm">
            🎫
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mt-4">Welcome Back</h2>
          <p className="text-sm text-slate-500 mt-1">Sign in to your account to continue</p>
        </div>

        {serverError && <ErrorBanner message={serverError} />}

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Username
            </label>
            <input
              name="username"
              value={form.username}
              onChange={onChange}
              placeholder="Enter your username"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 mt-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-sm transition duration-200"
          >
            Sign In
          </button>

          <div className="text-center text-sm text-slate-500 mt-4">
            Don’t have an account?{' '}
            <a href="/register" className="text-teal-600 font-medium hover:underline">
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
