import React from 'react'
import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useCookies from '../hooks/useCookies'
import { UserAuth } from '../context/authContext'

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const refresh = useCookies()
  const { user } = UserAuth()

  useEffect(() => {
    let isMounted = true

    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (err) {
        console.error(err)
      } finally {
        isMounted && setIsLoading(false)
      }
    }

    !user?.user ? verifyRefreshToken() : setIsLoading(false)

    return () => (isMounted = false)
  }, [])

  return <>{isLoading ? <>Loading</> : <Outlet />}</>
}

export default PersistLogin
