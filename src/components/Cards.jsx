import React from 'react'
import icon from '../assets/img/logo.png'
import { formatDate } from '../helpers/formatItems'
import { Link } from 'react-router-dom'
const Cards = ({ plans }) => {
  return (
    <>
      {plans?.map((item, index) => (
        <Link
          to={`/view/${item._id}`}
          key={index}
          className='bg-white border border-gray-300 shadow  w-[100%] p-4 flex flex-col gap-3'
        >
          <div className='flex items-center gap-2'>
            <img className='h-[3rem]' src={icon} alt='logo' />
            <div>
              <h1 className='text-lg font-semibold line-clamp-1'>
                {item.title}
              </h1>
              <h1 className='text-sm text-gray-700'>
                Destination : {item.destination}
              </h1>
            </div>
          </div>
          <div>
            <h1 className='text-sm text-gray-500'>
              Departure : {formatDate(item.departureDate)}
            </h1>
            <h1 className='text-sm text-gray-500'>
              Created : {formatDate(item.createdAt)}
            </h1>
          </div>
          <div>
            <h1 className='text-sm text-gray-400'>
              Status : <span className='text-xs uppercase'>{item.status}</span>
            </h1>
          </div>
        </Link>
      ))}
    </>
  )
}

export default Cards
