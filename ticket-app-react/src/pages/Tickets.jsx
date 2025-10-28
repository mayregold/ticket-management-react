import React, { useState, useEffect } from 'react'
import ticketService from '../services/ticketService'
import TicketList from '../components/TicketList'
import TicketForm from '../components/TicketForm'
import ErrorBanner from '../components/ErrorBanner'

export default function Tickets(){
  const [tickets, setTickets] = useState([])
  const [error, setError] = useState(null)

  useEffect(()=> {
    try {
      setTickets(ticketService.list())
    } catch (err) {
      setError('Failed to load tickets')
    }
  }, [])

  function refresh(){ setTickets(ticketService.list()) }

  return (
    <div className="max-w-screen-lg mx-auto grid gap-6">
      {error && <ErrorBanner message={error} />}
      <TicketForm onCreate={() => refresh()} />
      <TicketList tickets={tickets} onChange={() => refresh()} />
    </div>
  )
}
