import React, { useState } from 'react'
import Login from '../components/Login/Login'
import Register from '../components/Login/Register'
import Logo from '../assets/img/Logoo.png'
import { Link } from 'react-router-dom'
const LoginPage = () => {
  const [active, setActive] = useState('Login')
  return (
    <div className='flex justify-center bg-main bg-cover bg-repeat items-center h-[100vh]'>
      <div className='p-4 shadow-md flex flex-col gap-3'>
        <div className='flex'>
          <button
            onClick={() => setActive('Login')}
            className='text-lg px-2 font-semibold'
          >
            Login
          </button>
          <button
            onClick={() => setActive('Register')}
            className='text-lg px-2 font-semibold'
          >
            Register
          </button>
        </div>
        <Link to={'/'}>
          <img className='h-[4rem]' src={Logo} alt='' />
        </Link>

        {active === 'Login' && <Login />}
        {active === 'Register' && <Register setActive={setActive} />}
      </div>
    </div>
  )
}

export default LoginPage
