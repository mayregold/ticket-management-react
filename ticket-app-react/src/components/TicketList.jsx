
import React from 'react'
import TicketItem from './TicketItem'

export default function TicketList({ tickets, onChange }){
  if (!tickets || !tickets.length) {
    return <div className="bg-white p-6 rounded shadow text-center">No tickets yet</div>
  }
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="grid gap-2">
        {tickets.map(t => <TicketItem key={t.id} ticket={t} onChange={onChange} />)}
      </div>
    </div>
  )
}
