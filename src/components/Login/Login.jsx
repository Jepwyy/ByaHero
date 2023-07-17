import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from '../../api/api'
const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const mutation = useMutation({
    mutationFn: (userdetails) =>
      axios.post('/auth/login', userdetails, {
        headers: { 'Content-Type': 'application/json' },
      }),
    onError: (error) => {
      console.log(error.response.data.message)
    },
    onSuccess: () => {
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
  return (
    <div className='flex flex-col gap-2'>
      <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        <div>
          <TextField
            id='email'
            onChange={(e) => setUsername(e.target.value)}
            label='Email'
            variant='standard'
          />
        </div>
        <div>
          <TextField
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
      <button className='border border-black py-2 px-4 font-medium rounded text-black'>
        Google Login
      </button>
    </div>
  )
}

export default Login
