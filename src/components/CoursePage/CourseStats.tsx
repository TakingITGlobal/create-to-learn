import React from 'react'
import { Box, Typography, Grid } from '@mui/material'
import SvgIcon from '@mui/material/SvgIcon'
import DifficultyIcon from '../../assets/images/difficulty.svg'
import DurationIcon from '../../assets/images/duration.svg'
import VideoIcon from '../../assets/images/video.svg'
import { displayMinutes } from '../../util/timeHelpers'

interface Props {
  numberOfVideos: number
  courseLength: number
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced'
}

function CourseStats({ numberOfVideos, courseLength, difficultyLevel }: Props) {
  const courseStats = [
    {
      title: `${numberOfVideos} Videos`,
      img: VideoIcon,
      alt: 'video-icon',
    },
    {
      title: displayMinutes(courseLength),
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
              padding: '2px 7px',
              backgroundColor: '#FFFFFF1C',
              height: '115px',
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
