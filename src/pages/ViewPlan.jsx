import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Logo from '../assets/img/Logo.png'
import TitleIcon from '@mui/icons-material/Title'
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import RoomIcon from '@mui/icons-material/Room'
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection'
import EditNoteIcon from '@mui/icons-material/EditNote'
import LuggageIcon from '@mui/icons-material/Luggage'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from '../api/api'
import { formatDate } from '../helpers/formatItems'
const ViewPlan = () => {
  const { id } = useParams()
  const { data } = useQuery(['view'], async () => {
    const response = await axios.get(`plan/viewOne/${id}`)
    return response.data[0]
  })

  console.log(data)

  return (
    <div className='flex flex-col gap-7'>
      <div className='flex justify-between mt-5'>
        <div className='text-3xl font-medium'> View Plan</div>
        <div className='flex gap-3'>
          <button className='bg-white border border-gray-300 py-2 px-3 font-medium rounded-md text-black'>
            Update
          </button>
          <button className='bg-black py-2 px-3 font-medium rounded-md text-white'>
            Delete
          </button>
        </div>
      </div>
      <div className='bg-white border border-gray-300 shadow  w-[100%] flex lg:flex-row flex-col'>
        <div className='lg:w-[36%] w-full flex justify-center items-center'>
          <img
            className='lg:h-[18rem] h-[12rem] lg:py-0 py-6 aspect-square'
            src={Logo}
            alt=''
          />
        </div>
        <div className='lg:w-[64%] w-full'>
          <List
            sx={{
              width: '100%',

              bgcolor: 'background.paper',
            }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <TitleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Title' secondary={data?.title} />
            </ListItem>
            <Divider variant='inset' component='li' />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DepartureBoardIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Departure'
                secondary={formatDate(data?.departureDate)}
              />
            </ListItem>
            <Divider variant='inset' component='li' />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DirectionsWalkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Arrival'
                secondary={formatDate(data?.arrivalDate)}
              />
            </ListItem>
            <Divider variant='inset' component='li' />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <RoomIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Destination'
                secondary={data?.destination}
              />
            </ListItem>
            <Divider variant='inset' component='li' />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AssistantDirectionIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Distance' secondary={data?.distance} />
            </ListItem>
            <Divider variant='inset' component='li' />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <GroupAddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Companion'
                secondary={data?.companion.toString()}
              />
            </ListItem>
            <Divider variant='inset' component='li' />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LuggageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary='Things To Bring'
                secondary={data?.thingsToBring.toString()}
              />
            </ListItem>
            <Divider variant='inset' component='li' />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EditNoteIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Notes' secondary={data?.notes} />
            </ListItem>
          </List>
        </div>
      </div>
      <div>
        <button className='bg-black py-2 px-3 font-medium rounded-md text-white'>
          Done
        </button>
      </div>
    </div>
  )
}

export default ViewPlan
