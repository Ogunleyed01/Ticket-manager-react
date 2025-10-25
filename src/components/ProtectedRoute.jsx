import React from 'react'
import { Navigate } from 'react-router-dom'
import { getSession } from '../services/auth'

export default function ProtectedRoute({children}){
  const s = getSession()
  if(!s) return <Navigate to="/auth/login" replace />
  return children
}
