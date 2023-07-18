import React, { useState } from 'react'
import Login from '../components/Login/Login'
import Register from '../components/Login/Register'

const LoginPage = () => {
  const [active, setActive] = useState('Login')
  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <div className='p-2 shadow-md '>
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
        {active === 'Login' && <Login />}
        {active === 'Register' && <Register setActive={setActive} />}
      </div>
    </div>
  )
}

export default LoginPage
