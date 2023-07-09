import React from 'react'
import Logo from '../assets/img/Logo.png'
const LandingPage = () => {
  return (
    <div className='min-h-[100vh] bg-[#F2F4F3]'>
      <nav className='flex justify-between items-center p-5'>
        <div className='flex items-center'>
          <img className='h-[4rem]' src={Logo} />
          <h1>ByaHero</h1>
        </div>
        <div>
          <button>Login</button>
          <button className='bg-[#4BEE79]'>Get started</button>
        </div>
      </nav>
    </div>
  )
}

export default LandingPage
