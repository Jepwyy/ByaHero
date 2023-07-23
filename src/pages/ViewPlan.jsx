import React from 'react'
import PlanDetailsCard from '../components/PlanDetailsCard'
import DeleteBtn from '../components/DeleteBtn'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from '../api/api'
import { useMutation } from 'react-query'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
const ViewPlan = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const mutation = useMutation({
    mutationFn: () =>
      axios.put(`plan/status/${id}`, {
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
  const handleMark = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are already done with this plan?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Mark as done',
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate()
      }
    })
  }
  return (
    <div className='flex flex-col gap-7'>
      <div className='flex justify-between mt-5'>
        <div className='text-3xl font-medium'> View Plan</div>
        <div className='flex gap-3'>
          <Link
            to={`/update/${id}`}
            className='bg-white border border-gray-300 py-2 px-3 font-medium rounded-md text-black'
          >
            Update
          </Link>
          <DeleteBtn />
        </div>
      </div>
      <PlanDetailsCard />
      <div>
        <button
          onClick={handleMark}
          className='bg-black py-2 px-3 font-medium rounded-md text-white'
        >
          Mark as done
        </button>
      </div>
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
    </div>
  )
}

export default ViewPlan
