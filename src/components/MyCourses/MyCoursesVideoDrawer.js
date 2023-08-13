import React from 'react'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import CloseIcon from '@mui/icons-material/Close'
import Video from '../Video'
import { useAuth } from '../../util/auth'

function MyCoursesVideoDrawer({
  inProgressVideo,
  openVideoDrawer,
  setOpenVideoDrawer,
  setOpenCourseDrawer,
  videoInfo,
  courseId,
}) {
  const auth = useAuth()

  return (
    <SwipeableDrawer
      anchor="right"
      open={openVideoDrawer}
      onClose={() => {
        setOpenVideoDrawer(false)
        setOpenCourseDrawer(false)
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}
      >
        <IconButton
          aria-label="close-icon"
          onClick={() => {
            setOpenVideoDrawer(false)
            setOpenCourseDrawer(false)
          }}
        >
          <CloseIcon sx={{ color: 'white' }} />
        </IconButton>
      </Box>
      <Typography align="center" variant="h1">
        {videoInfo && videoInfo[0]?.name}
      </Typography>
      <Box>
        <Video
          video={inProgressVideo.videoLink}
          id={inProgressVideo.videoId}
          user={auth.user}
          duration={videoInfo.duration}
          courseId={courseId}
        />
      </Box>
    </SwipeableDrawer>
  )
}

export default MyCoursesVideoDrawer
