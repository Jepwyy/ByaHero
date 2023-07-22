import React from 'react'
import Logo from '../assets/img/Logoo.png'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/authContext'
import { Link } from 'react-router-dom'
import axios from '../api/api'
const Header = () => {
  const navigate = useNavigate()
  const { setToken, setUser, user } = UserAuth()
  const mutation = useMutation({
    mutationFn: () =>
      axios.delete('/auth/logout', {
        headers: { 'Content-Type': 'application/json' },
      }),
    onError: (error) => {
      // setErrorMessage(error.response.data.message);
      console.log(error.response.data.message)
    },
    onSuccess: () => {
      setUser({})
      setToken(false)
      navigate('/')
    },
  })
  const logout = () => {
    mutation.mutate()
  }
  return (
    <nav className='flex justify-between items-center bg-white border-b border-[#eee] py-2 px-10'>
      <Link to={'/overview'} className='flex items-center'>
        <img className='h-[2.8rem]' src={Logo} />
      </Link>
      <div onClick={logout} className='flex items-center gap-5'>
        <h1>Hello! {user.name}</h1>
        <button className='text-white bg-black py-2 px-4 rounded font-medium'>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Header
