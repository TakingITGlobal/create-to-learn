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
import AllImg from '../images/category-img-all.svg'
import VisualArtsImg from '../images/category-img-visual-arts.svg'
import MusicImg from '../images/category-img-music.svg'
import PhotographyImg from '../images/category-img-photography.svg'
import WebDesignImg from '../images/category-img-web-design.svg'
import WritingImg from '../images/category-img-writing.svg'
import HealthImg from '../images/category-img-health.svg'
import CulturalTeachingsImg from '../images/category-img-cultural-teaching.svg'
import GameDesignImg from '../images/category-img-game-design.svg'
import VideoImg from '../images/category-img-video.svg'
import DroneImg from '../images/category-img-drone.svg'
import Box from '@mui/material/Box'

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
    illustration: (
      <Box
        component="img"
        src={VideoImg}
        alt="video"
        sx={{
          display: 'flex',
          objectFit: 'cover',
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
    illustration: (
      <Box
        component="img"
        src={GameDesignImg}
        alt="game0design"
        sx={{
          display: 'flex',
          objectFit: 'cover',
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
    illustration: (
      <Box
        component="img"
        src={CulturalTeachingsImg}
        alt="cultural-teachings"
        sx={{
          display: 'flex',
          objectFit: 'cover',
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
    illustration: (
      <Box
        component="img"
        src={AllImg}
        alt="all"
        sx={{
          display: 'flex',
          objectFit: 'cover',
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
    illustration: (
      <Box
        component="img"
        src={VideoImg}
        alt="video"
        sx={{
          display: 'flex',
          objectFit: 'cover',
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
    illustration: (
      <Box
        component="img"
        src={GameDesignImg}
        alt="game0design"
        sx={{
          display: 'flex',
          objectFit: 'cover',
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
    illustration: (
      <Box
        component="img"
        src={CulturalTeachingsImg}
        alt="cultural-teachings"
        sx={{
          display: 'flex',
          objectFit: 'cover',
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
    illustration: (
      <Box
        component="img"
        src={MusicImg}
        alt="music"
        sx={{
          display: 'flex',
          objectFit: 'cover',
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
    illustration: (
      <Box
        component="img"
        src={VisualArtsImg}
        alt="visual-arts"
        sx={{
          display: 'flex',
          objectFit: 'cover',
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
    illustration: (
      <Box
        component="img"
        src={HealthImg}
        alt="health"
        sx={{
          display: 'flex',
          objectFit: 'cover',
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
    illustration: (
      <Box
        component="img"
        src={WebDesignImg}
        alt="web-design"
        sx={{
          display: 'flex',
          objectFit: 'cover',
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
    illustration: (
      <Box
        component="img"
        src={DroneImg}
        alt="drones"
        sx={{
          display: 'flex',
          objectFit: 'cover',
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
    illustration: (
      <Box
        component="img"
        src={PhotographyImg}
        alt="photgraphy"
        sx={{
          display: 'flex',
          objectFit: 'cover',
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
    illustration: (
      <Box
        component="img"
        src={WritingImg}
        alt="writing"
        sx={{
          display: 'flex',
          objectFit: 'cover',
        }}
      />
    ),
  },
]
