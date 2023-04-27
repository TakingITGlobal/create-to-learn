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
import SvgIcon from '@mui/material/SvgIcon'
import VideoIcon from '../images/category-icon-video.svg'
import GameDesignIcon from '../images/category-icon-game-design.svg'
import CulturalTeachingsIcon from '../images/category-icon-cultural-teachings.svg'
import MusicIcon from '../images/category-icon-music.svg'
import PhotographyIcon from '../images/category-icon-photography.svg'
import WritingIcon from '../images/category-icon-writing.svg'
import VisualArtsIcon from '../images/category-icon-visual-arts.svg'
import HealthIcon from '../images/category-icon-health.svg'
import DroneIcon from '../images/category-icon-drone.svg'
import WebDesignIcon from '../images/category-icon-web-design.svg'

import Box from '@mui/material/Box'

export const defaultCategories = [
  {
    label: 'Video & Film',
    icon: (
      <SvgIcon fontSize="large" component="div" sx={{ paddingBottom: '10px' }}>
        <img
          src={VideoIcon}
          alt="video-icon"
          style={{ paddingBottom: '10px' }}
        />
      </SvgIcon>
    ),
    illustration: (
      <Box
        component="img"
        src={VideoImg}
        alt="video-img"
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
      <SvgIcon fontSize="large" component="div" sx={{ paddingBottom: '10px' }}>
        <img
          src={GameDesignIcon}
          alt="game-design-icon"
          style={{ paddingBottom: '10px' }}
        />
      </SvgIcon>
    ),
    illustration: (
      <Box
        component="img"
        src={GameDesignImg}
        alt="game-design-img"
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
      <SvgIcon fontSize="large" component="div" sx={{ paddingBottom: '10px' }}>
        <img
          src={CulturalTeachingsIcon}
          alt="cultural-teachings-icon"
          style={{ paddingBottom: '10px' }}
        />
      </SvgIcon>
    ),
    illustration: (
      <Box
        component="img"
        src={CulturalTeachingsImg}
        alt="cultural-teachings-img"
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
      <SvgIcon fontSize="large" component="div" sx={{ paddingBottom: '10px' }}>
        <img
          src={VideoIcon}
          alt="video-icon"
          style={{ paddingBottom: '10px' }}
        />
      </SvgIcon>
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
      <SvgIcon fontSize="large" component="div" sx={{ paddingBottom: '10px' }}>
        <img
          src={GameDesignIcon}
          alt="game-design-icon"
          style={{ paddingBottom: '10px' }}
        />
      </SvgIcon>
    ),
    illustration: (
      <Box
        component="img"
        src={GameDesignImg}
        alt="game-design-img"
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
      <SvgIcon fontSize="large" component="div" sx={{ paddingBottom: '10px' }}>
        <img
          src={CulturalTeachingsIcon}
          alt="cultural-teachings-icon"
          style={{ paddingBottom: '10px' }}
        />
      </SvgIcon>
    ),
    illustration: (
      <Box
        component="img"
        src={CulturalTeachingsImg}
        alt="cultural-teachings-icon"
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
      <SvgIcon fontSize="large" component="div" sx={{ paddingBottom: '10px' }}>
        <img src={MusicIcon} alt="music" style={{ paddingBottom: '10px' }} />
      </SvgIcon>
    ),
    illustration: (
      <Box
        component="img"
        src={MusicImg}
        alt="music-icon"
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
      <SvgIcon fontSize="large" component="div" sx={{ paddingBottom: '10px' }}>
        <img
          src={VisualArtsIcon}
          alt="visual-arts"
          style={{ paddingBottom: '10px' }}
        />
      </SvgIcon>
    ),
    illustration: (
      <Box
        component="img"
        src={VisualArtsImg}
        alt="visual-arts-icon"
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
      <SvgIcon fontSize="large" component="div" sx={{ paddingBottom: '10px' }}>
        <img
          src={HealthIcon}
          alt="health-icon"
          style={{ paddingBottom: '10px' }}
        />
      </SvgIcon>
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
      <SvgIcon fontSize="large" component="div" sx={{ paddingBottom: '10px' }}>
        <img
          src={WebDesignIcon}
          alt="web-design-icon"
          style={{ paddingBottom: '10px' }}
        />
      </SvgIcon>
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
      <SvgIcon fontSize="large" component="div" sx={{ paddingBottom: '10px' }}>
        <img
          src={DroneIcon}
          alt="drone-icon"
          style={{ paddingBottom: '10px' }}
        />
      </SvgIcon>
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
      <SvgIcon fontSize="large" component="div" sx={{ paddingBottom: '10px' }}>
        <img
          src={PhotographyIcon}
          alt="photography-icon"
          style={{ paddingBottom: '10px' }}
        />
      </SvgIcon>
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
      <SvgIcon fontSize="large" component="div" sx={{ paddingBottom: '10px' }}>
        <img
          src={WritingIcon}
          alt="writing-icon"
          style={{ paddingBottom: '10px' }}
        />
      </SvgIcon>
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
