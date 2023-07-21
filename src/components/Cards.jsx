import React from 'react'
import icon from '../assets/img/logo.png'
import { formatDate } from '../../helpers/formatItems'
const Cards = ({ plans }) => {
  return (
    <>
      {plans?.map((item, index) => (
        <div
          key={index}
          className='bg-white border border-gray-300 shadow h-[10rem] w-[100%] p-4 flex flex-col gap-3'
        >
          <div className='flex items-center gap-2'>
            <img className='h-[3rem]' src={icon} alt='logo' />
            <div>
              <h1 className='text-lg font-semibold'>{item.title}</h1>
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
              Arrival : {formatDate(item.arrivalDate)}
            </h1>
          </div>
          <div>
            <h1 className='text-sm text-gray-400'>
              Status : <span className='text-xs uppercase'>{item.status}</span>
            </h1>
          </div>
        </div>
      ))}
    </>
  )
}

export default Cards