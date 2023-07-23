import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import dayjs from 'dayjs'
import CircularProgress from '@mui/material/CircularProgress'
import { Button } from '@mui/material'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import Chip from '@mui/material/Chip'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import axios from '../api/api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
const UpdatePlan = () => {
  const { id } = useParams()
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
  console.log(plan)

  const { isLoading } = useQuery(['details'], async () => {
    const response = await axios.get(`/plan/viewOne/${id}`)
    setPlan({
      ...plan,
      title: response.data[0].title,
      departureDate: response.data[0].departureDate,
      destination: response.data[0].destination,
      distance: response.data[0].distance,
      companion: [response.data[0].companion],
      thingsToBring: [response.data[0].thingsToBring],
      notes: response.data[0].notes,
    })
  })

  const mutation = useMutation({
    mutationFn: (planDetails) =>
      axios.put(`/plan/update/${id}`, planDetails, {
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
      navigate(`/view/${id}`)
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
  if (isLoading) {
    return <CircularProgress />
  }

  return (
    <div>
      <div className='flex justify-between mt-5'>
        <div className='text-3xl font-medium'> Create Plan</div>
        <div className='flex gap-3'>
          <Link
            to={`/view/${id}`}
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
            value={plan?.title}
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
                value={dayjs(plan?.departureDate)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div>
          <TextField
            required
            value={plan?.destination}
            id='destination'
            onChange={handleChange}
            label='Destination'
            variant='outlined'
          />
        </div>
        <div>
          <TextField
            required
            value={plan?.distance}
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
            value={plan?.notes}
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

export default UpdatePlan
