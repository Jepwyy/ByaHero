import React from 'react'
import Logo from '../assets/img/Logoo.png'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/authContext'
import { Link } from 'react-router-dom'
import axios from '../api/api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
const Header = () => {
  const navigate = useNavigate()
  const { setToken, setUser, user } = UserAuth()
  const mutation = useMutation({
    mutationFn: () =>
      axios.post('/auth/logout', {
        headers: { 'Content-Type': 'application/json' },
      }),
    onError: (error) => {
      toast.error(`${error.response.data.message}`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    },
    onSuccess: () => {
      setUser({})
      setToken(false)
      navigate('/')
    },
  })
  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout',
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate()
      }
    })
  }
  return (
    <nav className='flex justify-between items-center bg-white border-b border-[#eee] py-2 lg:px-10 px-2'>
      <Link to={'/overview'} className='flex items-center'>
        <img className='sm:h-[2.8rem] h-[1.9rem]' src={Logo} />
      </Link>
      <div
        onClick={logout}
        className='flex items-center sm:text-base text-xs gap-5'
      >
        <h1>Hello! {user.name}</h1>
        <button className='text-white bg-black py-2 px-4 rounded sm:text-base text-xs font-medium'>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Header
