import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_SERVER, 
  withCredentials: true,
  headers: {
    Accept: "application/json"
  }
})

export default http
