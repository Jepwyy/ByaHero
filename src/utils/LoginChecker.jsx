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
      <Outlet />
      {token ? <Navigate to={`/overview`} /> : null}
    </>
  )
}

export default LoginChecker
