import React, {useEffect, useState} from 'react'
import * as svc from '../services/tickets'
import Modal from '../components/Modal'
import { useToast } from '../components/Toast'

const STATUS_COLORS = { open: '#16a34a', in_progress: '#f59e0b', closed: '#6b7280' }

function EditForm({ticket, onSave, onCancel}){
  const [title, setTitle] = useState(ticket.title)
  const [status, setStatus] = useState(ticket.status)
  const [description, setDescription] = useState(ticket.description)
  const [error, setError] = useState(null)
  function save(){
    if(!title.trim()){ setError('Title required'); return }
    if(!['open','in_progress','closed'].includes(status)){ setError('Invalid status'); return }
    onSave({...ticket, title: title.trim(), status, description})
  }
  return (
    <div>
      <label className="block text-sm">Title</label>
      <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full p-2 border rounded" />
      <label className="block text-sm mt-2">Status</label>
      <select value={status} onChange={e=>setStatus(e.target.value)} className="w-full p-2 border rounded">
        <option value="open">open</option>
        <option value="in_progress">in_progress</option>
        <option value="closed">closed</option>
      </select>
      <label className="block text-sm mt-2">Description</label>
      <textarea value={description} onChange={e=>setDescription(e.target.value)} className="w-full p-2 border rounded" />
      {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      <div className="mt-3 flex justify-end gap-2">
        <button onClick={onCancel} className="px-3 py-1 border rounded">Cancel</button>
        <button onClick={save} className="px-3 py-1 bg-sky-600 text-white rounded">Save</button>
      </div>
    </div>
  )
}

export default function Tickets(){
  const toast = useToast()
  const [tickets, setTickets] = useState([])
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState('open')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [errors, setErrors] = useState({})

  useEffect(()=> load(), [])

  function load(){
    setLoading(true)
    try{
      const all = svc.readAll()
      setTickets(all)
    }catch(err){
      toast.show('Failed to load tickets. Please retry.', {type:'error'})
    }finally{ setLoading(false) }
  }

  function validate(){
    const e = {}
    if(!title.trim()) e.title = 'Title is required'
    if(!['open','in_progress','closed'].includes(status)) e.status = 'Invalid status'
    if(title.length > 250) e.title = 'Title too long (max 250)'
    return e
  }

  function create(){
    const e = validate(); setErrors(e); if(Object.keys(e).length) return
    try{
      const t = svc.createTicket({title: title.trim(), status, description})
      setTickets(prev=>[...prev, t])
      setTitle(''); setDescription(''); setStatus('open')
      toast.show('Ticket created')
    }catch(err){
      toast.show(err.message, {type:'error'})
    }
  }

  function remove(id){
    if(!confirm('Delete this ticket?')) return
    try{
      svc.deleteTicket(id)
      setTickets(prev=>prev.filter(x=>x.id!==id))
      toast.show('Ticket deleted')
    }catch(err){ toast.show('Delete failed', {type:'error'}) }
  }

  function save(updated){
    try{
      const t = svc.updateTicket(updated.id, updated)
      setTickets(prev=>prev.map(x=>x.id===t.id? t : x))
      setEditing(null)
      toast.show('Ticket updated')
    }catch(err){ toast.show(err.message, {type:'error'}) }
  }

  return (
    <div className="max-w-[1440px] mx-auto p-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Ticket Management</h1>
      </header>

      <section className="mt-4 bg-white p-4 rounded shadow">
        <h2 className="font-medium">Create Ticket</h2>
        <div className="mt-2 grid md:grid-cols-3 gap-2">
          <div>
            <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} className="w-full p-2 border rounded" />
            {errors.title && <div className="text-sm text-red-600">{errors.title}</div>}
          </div>
          <div>
            <select value={status} onChange={e=>setStatus(e.target.value)} className="w-full p-2 border rounded">
              <option value="open">open</option>
              <option value="in_progress">in_progress</option>
              <option value="closed">closed</option>
            </select>
            {errors.status && <div className="text-sm text-red-600">{errors.status}</div>}
          </div>
          <div>
            <textarea placeholder="Description (optional)" value={description} onChange={e=>setDescription(e.target.value)} className="w-full p-2 border rounded" />
          </div>
        </div>
        <div className="mt-3">
          <button onClick={create} className="px-3 py-2 bg-sky-600 text-white rounded">Create</button>
        </div>
      </section>

      <section className="mt-4">
        <h2 className="text-lg font-medium">All Tickets</h2>
        {loading && <p>Loading...</p>}
        <div className="grid md:grid-cols-3 gap-4 mt-3">
          {tickets.map(t=>(
            <div key={t.id} className="p-3 bg-white rounded shadow flex justify-between items-start">
              <div>
                <div className="font-semibold">{t.title}</div>
                <div className="text-sm text-gray-500">{t.description}</div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-sm px-2 py-1 rounded" style={{background: STATUS_COLORS[t.status] + '22', color: STATUS_COLORS[t.status]}}>{t.status}</span>
                <div className="flex gap-2">
                  <button onClick={()=>setEditing(t)} className="px-2 py-1 border rounded">Edit</button>
                  <button onClick={()=>remove(t.id)} className="px-2 py-1 bg-red-100 text-red-700 rounded">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {editing && <Modal onClose={()=>setEditing(null)}><EditForm ticket={editing} onSave={save} onCancel={()=>setEditing(null)} /></Modal>}
    </div>
  )
}
