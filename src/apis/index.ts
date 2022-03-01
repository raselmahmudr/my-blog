import axios from "axios";


// export const baseBackend = "http://localhost:8888"
export const baseBackend = "https://rsl-my-blog-server.netlify.app"
// export const baseBackend = "http://localhost:3300"


// @ts-ignore
export const backend = import.meta.env.MODE === "development"
  // ? baseBackend +  "/.netlify/functions/server"
  ? "http://localhost:3300"
  // ? "http://localhost:8888/.netlify/functions/server"
  // ? "http://192.168.43.170:3300"
  : baseBackend + "/.netlify/functions/server"

// export const backend = "http://localhost:6331/.netlify/functions/server"
// export const backend = "http://localhost:5110/.netlify/functions/server"
// export const backend = "https://app.netlify.com/sites/blissful-cori-e6ec93/deploys/61f0625dcb3f2d11cd138951/.netlify/functions/server"

// export const backend = "http://localhost:5000"
// export const backend = "https://rsl-blog-server.herokuapp.com"
// export const backend = "https://rsl-blog-server-1.herokuapp.com"

// console.log()

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
      token: window.localStorage.getItem("token") || "",
      // 'Content-Type': 'application/json',
      // "Access-Control-Allow-Origin": "*",
      // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
  })
}


export default  api
