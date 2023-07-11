import React from 'react'
import Logo from '../assets/img/Logoo.png'
import { Link } from 'react-router-dom'
const LandingPage = () => {
  return (
    <div className='min-h-[100vh] bg-[#fff]'>
      <nav className='flex justify-between items-center border-b border-[#ccc] py-2 px-10'>
        <div className='flex items-center'>
          <img className='h-[2.8rem]' src={Logo} />
        </div>
        <div className='flex gap-2'>
          <Link
            to={'/auth'}
            className='text-white bg-black py-2 px-4 rounded font-medium'
          >
            Login
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default LandingPage
