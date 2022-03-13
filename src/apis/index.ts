import axios from "axios";


// export const baseBackend = "http://localhost:8888"
export const baseBackend = "https://mwsjzaxqrt.us10.qoddiapp.com"

// @ts-ignore
export const backend = import.meta.env.MODE === "development"
  ? "https://mwsjzaxqrt.us10.qoddiapp.com"
  // ? "http://localhost:8080"
  : baseBackend


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
