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

export const defaultCategories = [
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
    illustration: AllImg,
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
    illustration: VideoImg,
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
    illustration: GameDesignImg,
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
    illustration: CulturalTeachingsImg,
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
    illustration: AllImg,
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
    illustration: VideoImg,
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
    illustration: GameDesignImg,
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
    illustration: CulturalTeachingsImg,
  },
  {
    label: 'Music & Songwriting',
    icon: (
      <SvgIcon fontSize="large" component="div" sx={{ paddingBottom: '10px' }}>
        <img src={MusicIcon} alt="music" style={{ paddingBottom: '10px' }} />
      </SvgIcon>
    ),
    illustration: MusicImg,
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
    illustration: VisualArtsImg,
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
    illustration: HealthImg,
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
    illustration: WebDesignImg,
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
    illustration: DroneImg,
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
    illustration: PhotographyImg,
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
    illustration: WritingImg,
  },
]
