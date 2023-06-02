import React, { useState } from 'react'
import { List, Typography, Box, IconButton } from '@mui/material'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import CloseIcon from '@mui/icons-material/Close'
import Video from '../Video'
import CourseVideoListItem from './CourseVideoListItem'
import { useAuth } from '../../util/auth'

function CourseLessons({ videoInfo, videoIds }) {
  const auth = useAuth()

  const [openCourseDrawer, setOpenCourseDrawer] = useState(false)
  return (
    <List variant="progress">
      {videoInfo &&
        videoInfo.map((video, index) => {
          const videoId = videoIds[index]
          return (
            <div key={index}>
              <CourseVideoListItem
                video={video}
                videoId={videoId}
                setOpenCourseDrawer={setOpenCourseDrawer}
              />
              <SwipeableDrawer
                anchor="right"
                open={openCourseDrawer === videoId}
                onClose={() => setOpenCourseDrawer(false)}
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
                    onClick={() => setOpenCourseDrawer(false)}
                  >
                    <CloseIcon sx={{ color: 'white' }} />
                  </IconButton>
                </Box>
                <Typography align="center" variant="h1">
                  {video.name}
                </Typography>
                <Video video={video.link} id={videoId} user={auth.user} />
              </SwipeableDrawer>
            </div>
          )
        })}
    </List>
  )
}

export default CourseLessons