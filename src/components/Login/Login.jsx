import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserAuth } from '../../context/authContext'
const Login = () => {
  const navigate = useNavigate()
  const { setToken, setUser } = UserAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const mutation = useMutation({
    mutationFn: (userdetails) =>
      axios.post('/auth/login', userdetails, {
        headers: { 'Content-Type': 'application/json' },
      }),
    onError: (error) => {
      toast.error(`${error.response.data.message}`, {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    },
    onSuccess: (data) => {
      toast.success(`Welcome ${data.data.user.name} !`, {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      setUser(data.data.user)
      setToken(true)
      navigate('/overview')
    },
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({
      email: username,
      password: password,
    })
  }
  const handleGoogle = () => {
    toast.warn(`${'This Feature Is Not Yet Available.'}`, {
      position: 'top-center',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  }
  return (
    <div className='flex flex-col gap-2'>
      <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        <div>
          <TextField
            fullWidth
            id='email'
            onChange={(e) => setUsername(e.target.value)}
            label='Email'
            variant='standard'
          />
        </div>
        <div>
          <TextField
            fullWidth
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            label='Password'
            type='password'
            autoComplete='current-password'
            variant='standard'
          />
        </div>
        <button
          type='submit'
          className='bg-black py-2 px-4 font-medium rounded text-white'
        >
          Login
        </button>
      </form>
      <button
        onClick={handleGoogle}
        className='border border-black py-2 px-4 font-medium rounded text-black'
      >
        Google Login
      </button>
      <ToastContainer
        position='top-center'
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  )
}

export default Login
