import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/header'
const Layout = () => {
  return (
    <div className='flex flex-row h-screen'>
      <div className='overflow-hidden w-screen'>
        <div className='flex flex-col flex-1 w-full'>
          <Header />
        </div>
        <div className='flex-1 z-[0] bg-[#FAFAFA] h-[100vh] w-full overflow-auto relative scrollbar-thin scrollbar-thumb-black scrollbar-track-[#101112]'>
          <div className=' px-[20%]'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
