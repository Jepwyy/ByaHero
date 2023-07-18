import axios from '../api/api'
import { UserAuth } from '../context/authContext'

const useCookies = () => {
  const { setUser, setToken } = UserAuth()

  const refresh = async () => {
    const response = await axios.get('/auth/cookie')
    setUser(response.data.user)
    setToken(true)
    return response.data.user
  }
  return refresh
}

export default useCookies
