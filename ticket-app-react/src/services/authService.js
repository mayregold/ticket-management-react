const USERS_KEY = 'ticket_users_v1'
const SESSION_KEY = 'ticket_session_v1'

function readUsers(){
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e){
    console.error('Failed reading users', e)
    return []
  }
}
function writeUsers(users){ localStorage.setItem(USERS_KEY, JSON.stringify(users)) }

function register({ username, password }){
  const users = readUsers()
  if (users.find(u=>u.username === username)) {
    throw new Error('User already exists')
  }
  const user = { id: Date.now(), username, password }
  users.push(user)
  writeUsers(users)
  const token = `tok-${user.id}`
  localStorage.setItem(SESSION_KEY, JSON.stringify({ token, username, id: user.id }))
  return { token, username, id: user.id }
}

function login({ username, password }){
  const users = readUsers()
  const user = users.find(u => u.username === username && u.password === password)
  if (!user) throw new Error('Invalid credentials')
  const token = `tok-${user.id}`
  localStorage.setItem(SESSION_KEY, JSON.stringify({ token, username, id: user.id }))
  return { token, username, id: user.id }
}

function logout(){
  localStorage.removeItem(SESSION_KEY)
}

function getCurrentUser(){
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export default { register, login, logout, getCurrentUser }
