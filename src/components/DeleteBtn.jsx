import React from 'react'
import { useMutation } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../api/api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
const DeleteBtn = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const mutation = useMutation({
    mutationFn: () =>
      axios.delete(`plan/delete/${id}`, {
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
    onSuccess: (data) => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${data.data.message}`,
        showConfirmButton: false,
        timer: 1500,
      })
      navigate('/overview')
    },
  })
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate()
      }
    })
  }
  return (
    <button
      onClick={handleDelete}
      className='bg-black py-2 px-3 font-medium rounded-md text-white'
    >
      Delete
    </button>
  )
}

export default DeleteBtn
