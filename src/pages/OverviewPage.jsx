import React from 'react'
import { UserAuth } from '../context/authContext'
const OverviewPage = () => {
  const { token, user } = UserAuth()

  return <div>OverviewPage</div>
}

export default OverviewPage
