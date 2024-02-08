import React, { Dispatch, SetStateAction } from 'react'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import CloseIcon from '@mui/icons-material/Close'
import Video from '../Video'
import { useAuth } from '../../util/auth'
import { VideoProgress } from '../../types/Video'

interface Props {
  inProgressVideo: VideoProgress
  openVideoDrawer: boolean
  setOpenVideoDrawer: Dispatch<SetStateAction<boolean>>
  setOpenCourseDrawer: Dispatch<SetStateAction<boolean>>
  videoInfo: any
  courseId: Number
}

function MyCoursesVideoDrawer({
  inProgressVideo,
  openVideoDrawer,
  setOpenVideoDrawer,
  setOpenCourseDrawer,
  videoInfo,
  courseId,
}: Props) {
  const auth = useAuth()

  const list = () => (
    <>
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
    </>  
  );

  return (
    <SwipeableDrawer
      anchor="right"
      onOpen={() => setOpenVideoDrawer(true)}
      open={openVideoDrawer}
      onClose={() => {
        setOpenVideoDrawer(false)
        setOpenCourseDrawer(false)
      }}
    >
      {list()}
    </SwipeableDrawer>
  )
}

export default MyCoursesVideoDrawer
