import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastProvider } from './components/Toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
export default function App(){
  return (
    <ToastProvider>
  <div className="min-h-screen bg-sky-100 flex flex-col">
    <Navbar />
    {/* offset for fixed navbar */}
  <main className="grow pt-16">
          <Routes>
            <Route path="/" element={<Landing/>} />
            <Route path="/auth/:mode" element={<Auth/>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
            <Route path="/tickets" element={<ProtectedRoute><Tickets/></ProtectedRoute>} />
            <Route path="*" element={<Landing/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ToastProvider>
  )
}
