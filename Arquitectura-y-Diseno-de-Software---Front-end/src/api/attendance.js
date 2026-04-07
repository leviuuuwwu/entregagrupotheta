import axios from "axios"

const API = "/api"

export const registerAttendance = async (data) => {
 const res = await axios.post(`${API}/registros`, data)
 return res.data
}

export const getAttendance = async () => {
 const res = await axios.get(`${API}/registros`)
 return res.data
}
