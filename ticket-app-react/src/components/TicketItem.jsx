import React, { useState } from 'react'
import ticketService from '../services/ticketService'
import { validateTicket } from '../utils/validators'

export default function TicketItem({ ticket, onChange }){
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(ticket)
  const [errors, setErrors] = useState({})

  function change(e){ setForm({...form, [e.target.name]: e.target.value }) }

  function save(){
    if (form.status === 'closed' && (!form.resolution || form.resolution.trim().length < 3)) {
      setErrors({ resolution: 'Provide a resolution before closing' })
      return
    }
    const v = validateTicket(form)
    setErrors(v)
    if (Object.keys(v).length) return
    try {
      ticketService.update(ticket.id, form)
      setEditing(false)
      onChange && onChange()
    } catch (err){
      setErrors({ server: 'Failed to save' })
    }
  }

  async function remove(){
    if (!confirm('Delete this ticket?')) return
    try {
      ticketService.remove(ticket.id)
      onChange && onChange()
    } catch {
      alert('Failed to delete')
    }
  }

  return (
    <div className="border p-3 rounded flex flex-col md:flex-row md:items-start md:justify-between gap-3">
      <div className="flex-1">
        {!editing ? (
          <>
            <div className="flex items-center gap-4">
              <div className="font-semibold">{ticket.title}</div>
              <div className="text-sm text-slate-500">[{ticket.priority}]</div>
              <div className="ml-auto text-sm">{ticket.status}</div>
            </div>
            <p className="mt-2 text-sm text-slate-600">{ticket.description}</p>
            {ticket.resolution && <p className="mt-2 text-sm text-green-700">Resolution: {ticket.resolution}</p>}
          </>
        ) : (
          <>
            <input name="title" value={form.title} onChange={change} className="w-full input mb-2" />
            <textarea name="description" value={form.description} onChange={change} className="w-full input h-20 mb-2" />
            <div className="flex gap-2">
              <select name="priority" value={form.priority} onChange={change} className="input">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <select name="status" value={form.status} onChange={change} className="input">
                <option value="open">Open</option>
                <option value="pending">Pending</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            {errors.resolution && <div className="text-red-600 text-sm mt-1">{errors.resolution}</div>}
          </>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {!editing ? (
          <>
            <button onClick={()=>setEditing(true)} className="px-3 py-1 border rounded">Edit</button>
            <button onClick={remove} className="px-3 py-1 border rounded">Delete</button>
          </>
        ) : (
          <>
            <button onClick={save} className="px-3 py-1 bg-teal-500 text-white rounded">Save</button>
            <button onClick={()=> { setEditing(false); setForm(ticket); setErrors({}) }} className="px-3 py-1 border rounded">Cancel</button>
          </>
        )}
      </div>
    </div>
  )
}
