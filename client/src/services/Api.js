import axios from 'axios'

export const HTTP = axios.create({
  baseURL: process.env.SERVER_URL
})
