const API = "http://localhost:3000"

const getAuthHeaders = () => {
  const token = localStorage.getItem('imeet_token')
  return { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` 
  }
}

export const getCompanies = async () => {
  const res = await fetch(`${API}/empresas`, { headers: getAuthHeaders() })
  return res.json()
}

export const createCompany = async (data) => {
  const res = await fetch(`${API}/empresas`, { 
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  })
  return res.json()
}