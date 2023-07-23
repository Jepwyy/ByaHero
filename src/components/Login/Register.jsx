import React, { useState } from 'react'
import { TextField } from '@mui/material'
import axios from '../../api/api'
import Swal from 'sweetalert2'
import { useMutation } from 'react-query'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Register = ({ setActive }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const mutation = useMutation({
    mutationFn: (userdetails) =>
      axios.post('/auth/register', userdetails, {
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
    onSuccess: () => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registered Successfully!',
        showConfirmButton: false,
        timer: 1500,
      })
      setActive('Login')
    },
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    if (confirmPassword == password) {
      mutation.mutate({
        name: name,
        email: email,
        password: password,
      })
    } else {
      toast.warn('Password not match!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
  }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
      <div>
        <TextField
          onChange={(e) => setName(e.target.value)}
          id='name'
          label='Name'
          variant='standard'
        />
      </div>
      <div>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          id='email'
          label='Email'
          variant='standard'
        />
      </div>
      <div>
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          id='password'
          label='Password'
          type='password'
          autoComplete='current-password'
          variant='standard'
        />
      </div>
      <div>
        <TextField
          onChange={(e) => setConfirmPassword(e.target.value)}
          id='confirmPassword'
          label='Confirm Password'
          type='password'
          autoComplete='current-password'
          variant='standard'
        />
      </div>
      <button
        type='submit'
        className='bg-black py-2 px-4 font-medium rounded text-white'
      >
        Register
      </button>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </form>
  )
}

export default Register
