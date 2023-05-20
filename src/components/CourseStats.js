import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import SvgIcon from '@mui/material/SvgIcon'
import DifficultyIcon from '../assets/images/difficulty.svg'
import DurationIcon from '../assets/images/duration.svg'
import VideoIcon from '../assets/images/video.svg'

function CourseStats({ numberOfVideos, courseLength, difficultyLevel }) {
  const courseStats = [
    {
      title: `${numberOfVideos} Videos`,
      img: VideoIcon,
      alt: 'video-icon',
    },
    {
      title: `${courseLength} minutes`,
      img: DurationIcon,
      alt: 'duration-icon',
    },

    {
      title: difficultyLevel,
      img: DifficultyIcon,
      alt: 'difficulty-icon',
    },
  ]

  return (
    <Grid container spacing={1} sx={{ width: '100%', paddingBottom: '10px' }}>
      {courseStats.map(({ img, alt, title }, index) => (
        <Grid item xs={4} key={index}>
          <Box
            sx={{
              padding: '0 2.5px',
              backgroundColor: '#FFFFFF1C',
              height: '120px',
            }}
          >
            <Box sx={{ padding: '10px' }}>
              <SvgIcon
                fontSize="large"
                component="div"
                sx={{ paddingBottom: '10px' }}
              >
                <img src={img} alt={alt} style={{ paddingBottom: '10px' }} />
              </SvgIcon>
              <Typography sx={{ width: '75px', overflowWrap: 'break-word' }}>
                {title}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default CourseStats
