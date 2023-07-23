import React from 'react'
import PlanDetailsCard from '../components/PlanDetailsCard'
import DeleteBtn from '../components/DeleteBtn'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from '../api/api'
import { useMutation } from 'react-query'
const ViewPlan = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const mutation = useMutation({
    mutationFn: () =>
      axios.put(`plan/status/${id}`, {
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
  const handleMark = () => {
    mutation.mutate()
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
    </div>
  )
}

export default ViewPlan
