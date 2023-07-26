import React, { useRef, useState } from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import dayjs from 'dayjs'
import { Button } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import Chip from '@mui/material/Chip'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import axios from '../api/api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
import { UserAuth } from '../context/authContext'
const CreatePlan = () => {
  const { user } = UserAuth()
  const navigate = useNavigate()
  const [companions, setCompanions] = useState('')
  const [things, setThings] = useState('')
  const [plan, setPlan] = useState({
    title: '',
    departureDate: '',
    destination: '',
    distance: 0,
    companion: [],
    thingsToBring: [],
    notes: '',
  })

  const mutation = useMutation({
    mutationFn: (planDetails) =>
      axios.post(`/plan/create/${user._id}`, planDetails, {
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

  const handleAddCompanions = () => {
    if (companions == '') {
      toast.warn('Please Type A Word', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    } else {
      setPlan((prev) => {
        return {
          ...prev,
          companion: [...prev.companion, companions],
        }
      })
      setCompanions('')
    }
  }
  const handleDeleteCompanions = (index) => {
    setPlan((prev) => {
      const updatedCompanions = [...prev.companion]
      updatedCompanions.splice(index, 1)
      return {
        ...prev,
        companion: updatedCompanions,
      }
    })
  }
  const handleAddThings = () => {
    if (things == '') {
      toast.warn('Please Type A Word', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    } else {
      setPlan((prev) => {
        return {
          ...prev,
          thingsToBring: [...prev.thingsToBring, things],
        }
      })
      setThings('')
    }
  }
  const handleDeleteThings = (index) => {
    setPlan((prev) => {
      const updatedThings = [...prev.thingsToBring]
      updatedThings.splice(index, 1)
      return {
        ...prev,
        thingsToBring: updatedThings,
      }
    })
  }
  const handleChange = (e) => {
    const { id, value } = e.target
    setPlan((prev) => ({
      ...prev,
      [id]: value,
    }))
  }
  const CurrentDateTime = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const handleDateChange = (date) => {
    const dateString = dayjs(date).format('YYYY-MM-DDTHH:mm:ss.SSSZ')

    setPlan((prev) => ({
      ...prev,
      departureDate: dateString,
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if (plan.departureDate == '') {
      toast.warn('Please Select Time and Date', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    } else {
      mutation.mutate(plan)
    }
  }

  return (
    <div>
      <div className='flex justify-between mt-5'>
        <div className='text-3xl font-medium'> Create Plan</div>
        <div className='flex gap-3'>
          <Link
            to={'/overview'}
            className='bg-white border border-gray-300 py-2 px-3 font-medium rounded-md text-black'
          >
            Back
          </Link>
        </div>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 mt-6'>
        <div>
          <TextField
            required
            id='title'
            label='Title'
            onChange={handleChange}
            variant='outlined'
          />
        </div>

        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker
                label='Departure Date'
                onChange={handleDateChange}
                defaultValue={dayjs(CurrentDateTime())}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div>
          <TextField
            required
            id='destination'
            onChange={handleChange}
            label='Destination'
            variant='outlined'
          />
        </div>
        <div>
          <TextField
            required
            label='Distance'
            id='distance'
            type='number'
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position='end'>KM</InputAdornment>,
            }}
          />
        </div>

        <div>
          <div className='flex items-center gap-1'>
            <TextField
              id='companion'
              label='Companion'
              variant='outlined'
              value={companions}
              onChange={(e) => setCompanions(e.target.value)}
            />
            <Button onClick={handleAddCompanions} variant='contained'>
              Add
            </Button>
          </div>

          <div className='flex flex-wrap gap-1 mt-2'>
            {plan.companion.map((item, i) => (
              <Chip
                key={i}
                label={item}
                onDelete={() => handleDeleteCompanions(i)}
              />
            ))}
          </div>
        </div>
        <div>
          <div className='flex items-center gap-1'>
            <TextField
              id='thingsToBring'
              label='Things To Bring'
              variant='outlined'
              value={things}
              onChange={(e) => setThings(e.target.value)}
            />
            <Button onClick={handleAddThings} variant='contained'>
              Add
            </Button>
          </div>
          <div className='flex flex-wrap gap-1 mt-2'>
            {plan.thingsToBring.map((item, i) => (
              <Chip
                key={i}
                label={item}
                onDelete={() => handleDeleteThings(i)}
              />
            ))}
          </div>
        </div>
        <div>
          <TextField
            id='notes'
            fullWidth
            onChange={handleChange}
            label='Notes'
            multiline
            rows={4}
          />
        </div>
        <Button type='submit' variant='contained'>
          Submit
        </Button>
      </form>
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

export default CreatePlan
