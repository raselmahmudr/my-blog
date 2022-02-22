import axios from "axios";

// @ts-ignore
export const backend = import.meta.env.MODE === "development"
  ? "http://localhost:3300"
  : "https://confident-curie-8fac38.netlify.app/.netlify/functions/server"
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
