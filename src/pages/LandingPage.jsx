import React from 'react'
import Logo from '../assets/img/Logoo.png'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className='min-h-[100vh] bg-main bg-repeat bg-cover'>
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
      <div className='flex flex-col gap-8 justify-center items-start md:w-[50%] w-full h-[90vh] pl-[5%]'>
        <div className='text-black font-bold font-mono text-5xl flex flex-col'>
          Your Ultimate Trip Planner, Unlock Adventure with Ease!
        </div>
        <div className='pr-[12%] text-lg font-light'>
          Embark on unforgettable journeys with our powerful Trip Planner app!
          ByaHero empowers you to craft seamless travel itineraries, discover
          hidden gems, and conquer new horizons.
        </div>
        <Link
          to={'/auth'}
          className='text-white bg-black py-2 px-4 rounded font-medium'
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
