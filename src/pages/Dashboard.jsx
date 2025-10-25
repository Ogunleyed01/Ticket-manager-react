import React from 'react'
import { stats } from '../services/tickets'
import { useNavigate } from 'react-router-dom'
import { logout } from '../services/auth'
import { useToast } from '../components/Toast'

export default function Dashboard(){
  const s = stats()
  const nav = useNavigate()
  const toast = useToast()
  function doLogout(){
    logout(); toast.show('Logged out'); nav('/')
  }
  return (
    <div className="max-w-[1440px] mx-auto p-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex items-center gap-3">
          <button onClick={doLogout} className="px-3 py-2 rounded bg-red-500 text-white">Logout</button>
        </div>
      </header>

      <main className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-sm text-gray-500">Total Tickets</h3>
          <div className="text-2xl font-bold">{s.total}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-sm text-gray-500">Open</h3>
          <div className="text-2xl font-bold">{s.open}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="text-sm text-gray-500">Resolved</h3>
          <div className="text-2xl font-bold">{s.closed}</div>
        </div>
      </main>
    </div>
  )
}
