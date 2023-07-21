import React from 'react'
import { useMutation } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../api/api'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
const DeleteBtn = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const mutation = useMutation({
    mutationFn: () =>
      axios.delete(`plan/delete/${id}`, {
        headers: { 'Content-Type': 'application/json' },
      }),
    onError: (error) => {
      alert(error.response.data.message)
    },
    onSuccess: (data) => {
      alert(data.data.message)
      navigate('/overview')
    },
  })
  const handleDelete = () => {
    mutation.mutate()
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
