import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { login, signup, getSession } from '../services/auth'
import { useToast } from '../components/Toast'

export default function Auth(){
  const {mode} = useParams()
  const nav = useNavigate()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(()=>{
    if(getSession()){
      nav('/dashboard')
    }
  }, [])

  function validate(){
    const e = {}
    if(!email) e.email = 'Email is required'
    else if(!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Enter a valid email'
    if(!password) e.password = 'Password is required'
    else if(password.length < 4) e.password = 'Password must be at least 4 characters'
    if(mode === 'signup'){
      if(!confirm) e.confirm = 'Please confirm your password'
      else if(password !== confirm) e.confirm = 'Passwords do not match'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handle(e){
    e.preventDefault()
    if(!validate()) { toast.show('Please fix the errors', {type:'error'}); return }
    const fn = mode === 'signup' ? signup : login
    const res = fn({email, password})
    if(!res.ok){ setErrors({form: res.message}); toast.show(res.message, {type:'error'}); return }
    toast.show('Authenticated', {type:'success'})
    nav('/dashboard')
  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-sky-300 p-6">
      <div className="w-full max-w-md">
        <div className="bg-white/30 backdrop-blur-md border border-white/30 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h2>
          <p className="mt-2 text-sm text-gray-600">{mode === 'signup' ? 'Sign up to manage tickets for your team.' : 'Login to access your dashboard and tickets.'}</p>

          <form onSubmit={handle} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                aria-invalid={errors.email ? 'true' : 'false'}
                value={email}
                onChange={e=>setEmail(e.target.value)}
                className={`mt-1 p-2 rounded w-full border ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                placeholder="you@example.com"
              />
              {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                aria-invalid={errors.password ? 'true' : 'false'}
                value={password}
                onChange={e=>setPassword(e.target.value)}
                type="password"
                className={`mt-1 p-2 rounded w-full border ${errors.password ? 'border-red-500' : 'border-gray-200'}`}
              />
              {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  aria-invalid={errors.confirm ? 'true' : 'false'}
                  value={confirm}
                  onChange={e=>setConfirm(e.target.value)}
                  type="password"
                  className={`mt-1 p-2 rounded w-full border ${errors.confirm ? 'border-red-500' : 'border-gray-200'}`}
                />
                {errors.confirm && <div className="text-red-600 text-sm mt-1">{errors.confirm}</div>}
              </div>
            )}

            {errors.form && <div className="text-red-600 text-sm">{errors.form}</div>}

            <div className="flex items-center justify-between gap-3">
              <button className="px-4 py-2 bg-sky-600 text-white rounded-md">{mode === 'signup' ? 'Create account' : 'Login'}</button>
              {/* <div className="text-sm text-gray-500">Demo: <strong>demo@demo.test</strong> / <strong>demo123</strong></div> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
