const TOKEN_KEY = 'ticketapp_session'
const USERS_KEY = 'ticketapp_users'

function _makeToken(email){
  return btoa(JSON.stringify({email, created: Date.now()}))
}

function _loadUsers(){
  try{
    const raw = localStorage.getItem(USERS_KEY)
    if(!raw) return []
    return JSON.parse(raw)
  }catch(e){ return [] }
}

function _saveUsers(users){
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

// Seed a demo user if none exist
;(function seedDemo(){
  const users = _loadUsers()
  if(users.length === 0){
    users.push({email:'demo@demo.test', password:'demo123'})
    _saveUsers(users)
  }
})()

export function login({email, password}) {
  if(!email || !password) return {ok:false, message:'Email and password required'}
  if(password.length < 4) return {ok:false, message:'Password must be at least 4 characters'}
  const users = _loadUsers()
  const u = users.find(x=>x.email === email)
  if(!u) return {ok:false, message:'No account found for that email. Please sign up.'}
  if(u.password !== password) return {ok:false, message:'Invalid credentials'}
  const token = _makeToken(email)
  localStorage.setItem(TOKEN_KEY, token)
  return {ok:true, token}
}

export function signup({email, password}) {
  if(!email || !password) return {ok:false, message:'Email and password required'}
  if(password.length < 4) return {ok:false, message:'Password must be at least 4 characters'}
  const users = _loadUsers()
  const exists = users.find(x=>x.email === email)
  if(exists) return {ok:false, message:'An account with that email already exists'}
  users.push({email, password})
  _saveUsers(users)
  const token = _makeToken(email)
  localStorage.setItem(TOKEN_KEY, token)
  return {ok:true, token}
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
}

export function getSession() {
  return localStorage.getItem(TOKEN_KEY)
}
