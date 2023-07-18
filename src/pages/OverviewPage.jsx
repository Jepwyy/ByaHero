import React from 'react'
import { UserAuth } from '../context/authContext'
const OverviewPage = () => {
  const { token, user } = UserAuth()
  console.log(user)
  console.log(token)
  return <div>OverviewPage</div>
}

export default OverviewPage
