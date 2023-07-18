import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState()
  const [user, setUser] = useState([])

  return (
    <UserContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
export const UserAuth = () => {
  return useContext(UserContext)
}
