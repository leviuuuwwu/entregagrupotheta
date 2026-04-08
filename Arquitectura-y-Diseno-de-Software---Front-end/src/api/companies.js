<<<<<<< HEAD
const API = "http://localhost:3000"
=======
import axios from "axios"

const API = "/api"
>>>>>>> 2e3e3d733f119badd29cd5cb2d4274f54c5617dc

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
<<<<<<< HEAD
  const res = await fetch(`${API}/empresas`, { 
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  })
  return res.json()
}
=======
 const res = await axios.post(`${API}/empresas`, data)
 return res.data
}
>>>>>>> 2e3e3d733f119badd29cd5cb2d4274f54c5617dc
