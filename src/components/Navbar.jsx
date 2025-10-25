import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSession, logout } from '../services/auth'
import { useToast } from './Toast'

export default function Navbar(){
  const nav = useNavigate()
  const toast = useToast()
  const session = getSession()
  function doLogout(){
    logout(); toast.show('Logged out'); nav('/')
  }
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-white/30 border-b border-gray-200/30" aria-label="Main navigation">
      <div className="max-w-[1440px] mx-auto px-4 py-3 flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-lg font-semibold">Mi Bulleto</Link>
        </div>
        <div>
          {session ? (
            <div className="flex items-center gap-2">
              <Link to="/dashboard" className="px-3 py-1 rounded border">Dashboard</Link>
              <Link to="/tickets" className="px-3 py-1 rounded border">Tickets</Link>
              <button onClick={doLogout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/auth/login" className="px-3 py-1 rounded border">Login</Link>
              <Link to="/auth/signup" className="px-3 py-1 rounded border">Sign up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
