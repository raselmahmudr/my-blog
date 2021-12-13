import axios from "axios";

// export const backend = "http://localhost:3300"
// export const backend = "http://localhost:5000"
// export const backend = "https://rsl-blog-server.herokuapp.com"
export const backend = "https://rsl-blog-server-1.herokuapp.com"



const api = axios.create({
  baseURL: backend,
  withCredentials: true, // to send cookie in server
  headers: {
    token: window.localStorage.getItem("token") || ""
  }
})


export function getApi(){
  return axios.create({
    baseURL: backend,
    withCredentials: true, // to send cookie in server
    headers: {
      token: window.localStorage.getItem("token") || ""
    }
  })
}


export default  api
