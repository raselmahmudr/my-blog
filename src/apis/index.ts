import axios from "axios";

export const backend = "http://localhost:3300"
// export const backend = "https://rsl-blog-server.herokuapp.com"


const api = axios.create({
  baseURL: backend,
  // withCredentials: true,
  headers: {
    token: window.localStorage.getItem("token") || ""
  }
})

export default api