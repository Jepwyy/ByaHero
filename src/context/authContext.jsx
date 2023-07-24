import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(false)
  const [user, setUser] = useState([])
  console.log(token)

  return (
    <UserContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
export const UserAuth = () => {
  return useContext(UserContext)
}
