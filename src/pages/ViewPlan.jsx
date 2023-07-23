import React from 'react'
import PlanDetailsCard from '../components/PlanDetailsCard'
import DeleteBtn from '../components/DeleteBtn'
import { useParams, Link } from 'react-router-dom'
const ViewPlan = () => {
  const { id } = useParams()
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
        <button className='bg-black py-2 px-3 font-medium rounded-md text-white'>
          Done
        </button>
      </div>
    </div>
  )
}

export default ViewPlan
