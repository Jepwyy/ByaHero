import axios from 'axios'

export default axios.create({
  baseURL: 'https://bya-hero-api.vercel.app/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
