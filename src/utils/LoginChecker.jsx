import React from 'react'
import { Outlet, useNavigate, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useCookies from '../hooks/useCookies'
import { UserAuth } from '../context/authContext'

const LoginChecker = () => {
  const refresh = useCookies()
  const navigate = useNavigate()
  const { token, user } = UserAuth()

  useEffect(() => {
    refresh()
  }, [])

  return token ? <Navigate to={'/overview'} /> : <Outlet />
}

export default LoginChecker
