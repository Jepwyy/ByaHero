import React from 'react'
import { TextField } from '@mui/material'

const Register = () => {
  return (
    <div className='flex flex-col gap-2'>
      <div>
        <TextField id='standard-basic' label='Name' variant='standard' />
      </div>
      <div>
        <TextField id='standard-basic' label='Email' variant='standard' />
      </div>
      <div>
        <TextField
          id='standard-basic'
          label='Password'
          type='password'
          autoComplete='current-password'
          variant='standard'
        />
      </div>
      <div>
        <TextField
          id='standard-basic'
          label='Confirm Password'
          type='password'
          autoComplete='current-password'
          variant='standard'
        />
      </div>
      <button className='bg-black py-2 px-4 font-medium rounded text-white'>
        Register
      </button>
    </div>
  )
}

export default Register
