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
import RoomIcon from '@mui/icons-material/Room'
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection'
import EditNoteIcon from '@mui/icons-material/EditNote'
import LuggageIcon from '@mui/icons-material/Luggage'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from '../api/api'
import { formatDate } from '../helpers/formatItems'

const PlanDetailsCard = () => {
  const { id } = useParams()
  const { data } = useQuery(['view'], async () => {
    const response = await axios.get(`plan/viewOne/${id}`)
    return response.data[0]
  })
  return (
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
                <RoomIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Destination' secondary={data?.destination} />
          </ListItem>
          <Divider variant='inset' component='li' />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AssistantDirectionIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary='Distance'
              secondary={`${data?.distance} KM`}
            />
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
  )
}

export default PlanDetailsCard
