import VideocamIcon from '@mui/icons-material/Videocam'
import PaletteIcon from '@mui/icons-material/Palette'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'
import PriceChangeIcon from '@mui/icons-material/PriceChange'
import FlightIcon from '@mui/icons-material/Flight'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import PublicIcon from '@mui/icons-material/Public'
import WbSunnyIcon from '@mui/icons-material/WbSunny'

export const defaultCategories = [
  {
    label: 'Video & Film',
    icon: (
      <VideocamIcon
        fontSize="large"
        sx={{
          backgroundColor: '#FBC6F3',
          padding: '5px',
          borderRadius: '30%',
        }}
      />
    ),
  },
  {
    label: 'Game Design',
    icon: (
      <SportsEsportsIcon
        fontSize="large"
        sx={{
          backgroundColor: '#6956F1',
          padding: '5px',
          borderRadius: '30%',
        }}
      />
    ),
  },
  {
    label: 'Cultural Teachings',
    icon: (
      <PublicIcon
        fontSize="large"
        sx={{
          backgroundColor: '#32313E',
          padding: '5px',
          borderRadius: '30%',
        }}
      />
    ),
  },
]

export const categories = [
  {
    label: 'All',
    icon: (
      <WbSunnyIcon
        fontSize="large"
        sx={{
          backgroundColor: 'yellow',
          padding: '5px',
          borderRadius: '30%',
        }}
      />
    ),
  },
  {
    label: 'Video & Film',
    icon: (
      <VideocamIcon
        fontSize="large"
        sx={{
          backgroundColor: '#FBC6F3',
          padding: '5px',
          borderRadius: '30%',
        }}
      />
    ),
  },
  {
    label: 'Game Design',
    icon: (
      <SportsEsportsIcon
        fontSize="large"
        sx={{
          backgroundColor: '#6956F1',
          padding: '5px',
          borderRadius: '30%',
        }}
      />
    ),
  },
  {
    label: 'Cultural Teachings',
    icon: (
      <PublicIcon
        fontSize="large"
        sx={{
          backgroundColor: '#32313E',
          padding: '5px',
          borderRadius: '30%',
        }}
      />
    ),
  },
  {
    label: 'Music & Songwriting',
    icon: (
      <MusicNoteIcon
        fontSize="large"
        sx={{
          backgroundColor: '#6956F1',
          padding: '5px',
          borderRadius: '30%',
        }}
      />
    ),
  },
  {
    label: 'Visual Arts',
    icon: (
      <PaletteIcon
        fontSize="large"
        sx={{
          backgroundColor: '#6956F1',
          padding: '5px',
          borderRadius: '30%',
        }}
      />
    ),
  },
  {
    label: 'Health & Well-being',
    icon: (
      <MonitorHeartIcon
        fontSize="large"
        sx={{
          backgroundColor: '#6956F1',
          padding: '5px',
          borderRadius: '30%',
        }}
      />
    ),
  },
  {
    label: 'Entrepreneurship & Web Design',
    icon: (
      <PriceChangeIcon
        fontSize="large"
        sx={{
          backgroundColor: '#6956F1',
          padding: '5px',
          borderRadius: '30%',
        }}
      />
    ),
  },
  {
    label: 'Drones',
    icon: (
      <FlightIcon
        fontSize="large"
        sx={{
          backgroundColor: '#6956F1',
          padding: '5px',
          borderRadius: '30%',
        }}
      />
    ),
  },
  {
    label: 'Photography & Photoshop',
    icon: (
      <AddAPhotoIcon
        fontSize="large"
        sx={{
          backgroundColor: '#6956F1',
          padding: '5px',
          borderRadius: '30%',
        }}
      />
    ),
  },
  {
    label: 'Writing',
    icon: (
      <NoteAltIcon
        fontSize="large"
        sx={{
          backgroundColor: '#6956F1',
          padding: '5px',
          borderRadius: '30%',
        }}
      />
    ),
  },
]
