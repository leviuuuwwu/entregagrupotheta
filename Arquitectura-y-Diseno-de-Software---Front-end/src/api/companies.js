import axios from "axios"

const API = "/api"

export const getCompanies = async () => {
 const res = await axios.get(`${API}/empresas`)
 return res.data
}

export const createCompany = async (data) => {
 const res = await axios.post(`${API}/empresas`, data)
 return res.data
}
