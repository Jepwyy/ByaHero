import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useCookies from '../hooks/useCookies'
import { UserAuth } from '../context/authContext'

const LoginChecker = () => {
  const refresh = useCookies()
  const { token, user } = UserAuth()

  useEffect(() => {
    refresh()
  }, [])

  return (
    <>
      {token ? <Navigate to={`/overview`} /> : <Navigate to={`/`} />}
      <Outlet />
    </>
  )
}

export default LoginChecker
