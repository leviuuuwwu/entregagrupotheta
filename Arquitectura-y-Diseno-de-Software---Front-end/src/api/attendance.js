
const API = "http://localhost:3000"

const getAuthHeaders = () => {
  const token = localStorage.getItem('imeet_token')
  return { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` 
  }
}

export const registerAttendance = async (data) => {
  const res = await fetch(`${API}/registros`, { 
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  })
  return res.json()
}

export const getAttendance = async () => {
  const res = await fetch(`${API}/registros`, { headers: getAuthHeaders() })
  return res.json()
}
