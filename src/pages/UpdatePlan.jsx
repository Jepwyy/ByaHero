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
const UpdatePlan = () => {
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
  console.log(plan.companion)
  const handleAddCompanions = () => {
    if (companions == '') {
      alert('Please Type A Word')
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
      alert('Please Type A Word')
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
  return (
    <div>
      <div className='flex justify-between mt-5'>
        <div className='text-3xl font-medium'> Create Plan</div>
        <div className='flex gap-3'>
          <button className='bg-white border border-gray-300 py-2 px-3 font-medium rounded-md text-black'>
            Back
          </button>
        </div>
      </div>
      <form className='flex flex-col gap-5 mt-6'>
        <div>
          <TextField id='title' label='Title' variant='outlined' />
        </div>

        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
              <DateTimePicker
                label='Departure Date'
                defaultValue={dayjs('2022-04-17T15:30')}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div>
          <TextField id='destination' label='Destination' variant='outlined' />
        </div>
        <div>
          <TextField
            label='Distance'
            id='distance'
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
          <TextField id='notes' label='Notes' multiline rows={4} />
        </div>
        <Button type='submit' variant='contained'>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default UpdatePlan
