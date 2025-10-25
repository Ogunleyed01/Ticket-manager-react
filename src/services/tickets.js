const STORE = 'tickets_store_v2'

export function readAll(){
  return JSON.parse(localStorage.getItem(STORE) || '[]')
}
export function stats(){
  const t = readAll()
  return {
    total: t.length,
    open: t.filter(x=>x.status==='open').length,
    in_progress: t.filter(x=>x.status==='in_progress').length,
    closed: t.filter(x=>x.status==='closed').length
  }
}
function persist(arr){ localStorage.setItem(STORE, JSON.stringify(arr)) }

export function createTicket({title, status='open', description=''}) {
  if(!title || !status) throw new Error('title and status are required')
  if(!['open','in_progress','closed'].includes(status)) throw new Error('invalid status')
  if(title.length > 250) throw new Error('title too long')
  const t = { id: Date.now(), title, status, description }
  const arr = readAll()
  arr.push(t); persist(arr)
  return t
}

export function updateTicket(id, data) {
  const arr = readAll()
  const idx = arr.findIndex(x=>x.id===id)
  if(idx === -1) throw new Error('ticket not found')
  const updated = {...arr[idx], ...data}
  if(!updated.title || !updated.status) throw new Error('title and status required')
  if(!['open','in_progress','closed'].includes(updated.status)) throw new Error('invalid status')
  arr[idx] = updated; persist(arr)
  return updated
}

export function deleteTicket(id) {
  const arr = readAll().filter(x=>x.id!==id)
  persist(arr); return true
}
