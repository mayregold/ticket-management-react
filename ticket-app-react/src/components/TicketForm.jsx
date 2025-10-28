import React, { useState } from 'react'
import ticketService from '../services/ticketService'
import { validateTicket } from '../utils/validators'
import ErrorBanner from './ErrorBanner'

const defaultForm = { title: '', description: '', priority: 'medium', status: 'open', resolution: '' }

export default function TicketForm({ onCreate }){
  const [form, setForm] = useState(defaultForm)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState(null)

  function change(e){ setForm({...form, [e.target.name]: e.target.value }) }

  function submit(e){
    e.preventDefault()
    const v = validateTicket(form)
    setErrors(v)
    if (Object.keys(v).length) return
    try {
      ticketService.create({...form})
      setForm(defaultForm)
      setServerError(null)
      onCreate && onCreate()
    } catch (err){
      setServerError('Could not create ticket')
    }
  }

  return (
    <form onSubmit={submit} className="bg-white rounded p-6 shadow">
      {serverError && <ErrorBanner message={serverError} />}
      <h3 className="text-lg font-semibold mb-3">Create ticket</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label>Title<input name="title" value={form.title} onChange={change} className="w-full mt-1 input"/></label>
          {errors.title && <div className="text-red-600 text-sm">{errors.title}</div>}
        </div>
        <div>
          <label>Priority
            <select name="priority" value={form.priority} onChange={change} className="w-full mt-1 input">
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="critical">Critical</option>
            </select>
          </label>
          {errors.priority && <div className="text-red-600 text-sm">{errors.priority}</div>}
        </div>
        <div className="md:col-span-2">
          <label>Description
            <textarea name="description" value={form.description} onChange={change} className="w-full mt-1 input h-24"/>
          </label>
          {errors.description && <div className="text-red-600 text-sm">{errors.description}</div>}
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button className="px-4 py-2 bg-teal-500 text-white rounded">Create</button>
      </div>
    </form>
  )
}
