import React, { useState } from 'react'
import { List, Typography, Box, IconButton, ListItem } from '@mui/material'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import CloseIcon from '@mui/icons-material/Close'
import Video from '../Video'
import CourseVideoListItem from './CourseVideoListItem'
import { useAuth } from '../../util/auth'

function CourseLessons({
  videoInfo,
  videoIds,
  courseId,
  courseUID,
  courseProgress,
  downloadsData,
}) {
  const auth = useAuth()

  const [openCourseDrawer, setOpenCourseDrawer] = useState(false)
  const [videoToShow, setVideoToShow] = useState(false)
  return (
    <>
      <List variant="progress">
        {videoInfo &&
          videoInfo.map((video, index) => {
            const videoId = videoIds[index]
            return (
              <ListItem key={index}>
                <CourseVideoListItem
                  video={video}
                  videoId={videoId}
                  courseId={courseId}
                  courseUID={courseUID}
                  setOpenCourseDrawer={setOpenCourseDrawer}
                  setVideoToShow={setVideoToShow}
                  videoProgress={
                    courseProgress &&
                    courseProgress.filter(
                      (video) => video.videoId === videoId,
                    )[0]
                  }
                  downloadsData={downloadsData}
                />
              </ListItem>
            )
        })}
      </List>
      {videoToShow && (
        <SwipeableDrawer
          anchor="right"
          open={openCourseDrawer}
          onClose={() => setOpenCourseDrawer(false)}
          style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
        >
          <Box sx={{
            background: '#0B0919',
            backgroundImage: 'none',
            maxWidth: '500px',
            width: '100%',
            minWidth: '40vw'
          }}>
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
              {videoToShow.name}
            </Typography>
            <Video
              video={videoToShow.link}
              id={videoToShow.videoId}
              videoProgress={
                courseProgress &&
                courseProgress.find(
                  (video) => video.videoId === videoToShow.videoId,
                )
              }
              user={auth.user}
              duration={videoToShow.duration}
              courseId={courseId}
            />
          </Box>  
        </SwipeableDrawer>
      )}
    </>
  )
}

export default CourseLessons
