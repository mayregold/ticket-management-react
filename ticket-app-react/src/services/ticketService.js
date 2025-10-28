const KEY = 'tickets_v1'

function read(){
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('read tickets error', e)
    return []
  }
}
function write(tickets){ localStorage.setItem(KEY, JSON.stringify(tickets)) }

function list(){
  return read()
}

function create(ticket){
  const tickets = read()
  ticket.id = Date.now().toString()
  ticket.createdAt = new Date().toISOString()
  tickets.unshift(ticket)
  write(tickets)
  return ticket
}

function update(id, patch){
  const tickets = read()
  const idx = tickets.findIndex(t => t.id === id)
  if (idx === -1) throw new Error('Ticket not found')
  tickets[idx] = { ...tickets[idx], ...patch, updatedAt: new Date().toISOString() }
  write(tickets)
  return tickets[idx]
}

function remove(id){
  const tickets = read()
  const filtered = tickets.filter(t => t.id !== id)
  write(filtered)
  return true
}

function getById(id){
  return read().find(t => t.id === id) || null
}

export default { list, create, update, remove, getById }
