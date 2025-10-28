import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../services/authService'

export default function Navbar() {
  const navigate = useNavigate()
  const user = authService.getCurrentUser()
  const [isOpen, setIsOpen] = useState(false)

  function logout() {
    authService.logout()
    navigate('/login')
    setIsOpen(false)
  }

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold text-teal-600">
            Ticketly
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-4">
            <Link to="/" className="px-3 py-2 rounded hover:bg-slate-100">
              Home
            </Link>
            {user && (
              <Link to="/dashboard" className="px-3 py-2 rounded hover:bg-slate-100">
                Dashboard
              </Link>
            )}
            {user && (
              <Link to="/tickets" className="px-3 py-2 rounded hover:bg-slate-100">
                Tickets
              </Link>
            )}
          </nav>
        </div>

        {/* Right side (Desktop) */}
        <div className="hidden md:flex items-center">
          {!user ? (
            <>
              <Link to="/login" className="px-3 py-2 mr-2 hover:text-teal-600">
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-2 rounded bg-teal-600 text-white hover:bg-teal-700"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">Hi, {user.username}</span>
              <button
                onClick={logout}
                className="px-3 py-2 rounded bg-red-100 hover:bg-red-200 text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-2xl text-teal-600 md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 py-3 px-4 space-y-2 shadow-sm">
          <Link to="/" onClick={closeMenu} className="block py-2 hover:text-teal-600">
            Home
          </Link>
          {user && (
            <Link
              to="/dashboard"
              onClick={closeMenu}
              className="block py-2 hover:text-teal-600"
            >
              Dashboard
            </Link>
          )}
          {user && (
            <Link
              to="/tickets"
              onClick={closeMenu}
              className="block py-2 hover:text-teal-600"
            >
              Tickets
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="block py-2 hover:text-teal-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="block py-2 bg-teal-600 text-white rounded text-center hover:bg-teal-700"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="w-full py-2 rounded bg-red-100 text-red-600 hover:bg-red-200"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  )
}
