import React from 'react'
import { useQuery } from 'react-query'
import axios from '../api/api'
import { Link } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Cards from '../components/Cards'
import useCookies from '../hooks/useCookies'
import { UserAuth } from '../context/authContext'
const OverviewPage = () => {
  const { user } = UserAuth()

  const refresh = useCookies()
  const handleRefresh = () => {
    refresh()
  }
  const { data, isLoading, isError } = useQuery(['viewPlan'], async () => {
    const response = await axios.get(`plan/view/${user._id}`)
    return response.data
  })

  return (
    <div className='mt-[2rem]'>
      <div className='flex w-full flex-row items-center gap-2'>
        <div className='relative w-full'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400'>
            <AiOutlineSearch />
          </div>
          <input
            type='text'
            id='simple-search'
            className='bg-white border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 '
            placeholder='Search ...'
          />
        </div>
        <Link
          to={'/plan'}
          className='bg-black py-2 px-3 font-medium rounded text-white'
        >
          Add
        </Link>
      </div>
      <div className='py-4'>
        <ButtonGroup size='small' variant='text' aria-label='text button group'>
          <Button>All</Button>
          <Button>Pending</Button>
          <Button onClick={handleRefresh}>Finished</Button>
        </ButtonGroup>
      </div>
      {data?.length == 0 ? (
        <div className='text-center text-gray-400 text-2xl font-medium'>
          --- No Plan's To Show, Create One Now!!! ---
        </div>
      ) : (
        <div className=' grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2'>
          <Cards plans={data} />
        </div>
      )}
    </div>
  )
}

export default OverviewPage
