import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { UserAuth } from '../context/authContext'
const PrivateRoute = () => {
  const { token } = UserAuth()

  return <>{token ? <Outlet /> : <Navigate to={`/`} />}</>
}

export default PrivateRoute
