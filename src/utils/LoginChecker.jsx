import React from 'react'
import { Outlet, useNavigate, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useCookies from '../hooks/useCookies'
import { UserAuth } from '../context/authContext'

const LoginChecker = () => {
  const { token, user } = UserAuth()

  return token == true ? <Navigate to={'/overview'} /> : <Outlet />
}

export default LoginChecker
