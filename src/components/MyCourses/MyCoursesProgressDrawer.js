import React, { useState, useEffect } from 'react'

import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DownloadIcon from '@mui/icons-material/Download'
import InfoIcon from '@mui/icons-material/Info'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import CloseIcon from '@mui/icons-material/Close'
import Video from '../Video'
import { useAuth } from '../../util/auth'
import getByIdVimeo from '../../util/vimeo'

import { useTranslation } from 'react-i18next'

function MyCoursesProgressDrawer({
  course,
  open,
  setOpenCourseDrawer,
  inProgressVideos,
}) {
  const { t } = useTranslation()
  const auth = useAuth()

  const [openVideoDrawer, setOpenVideoDrawer] = useState(false)
  const [videoInfo, setVideoInfo] = useState([])

  useEffect(() => {
    const videoId =
      inProgressVideos[0]?.videoLink &&
      inProgressVideos[0]?.videoLink.match(/\d+/g)[0]
    getByIdVimeo(`/videos/${videoId}`).then((data) =>
      setVideoInfo(data.data.data[0]),
    )
  }, [inProgressVideos])

  return (
    <>
      {!openVideoDrawer ? (
        <Drawer
          anchor="bottom"
          open={open}
          onClose={() => setOpenCourseDrawer(null)}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setOpenVideoDrawer(inProgressVideos[0].videoId)
                }}
              >
                <ListItemIcon aria-label="continue-watching-icon">
                  <PlayCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary={t('my-courses.continue-watching')} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon aria-label="add-to-watchlist-icon">
                  <VideoLibraryIcon />
                </ListItemIcon>
                <ListItemText primary={t('add-to-watchlist')} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon aria-label="download-icon">
                  <DownloadIcon />
                </ListItemIcon>
                <ListItemText primary={t('my-courses.download-episode')} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href={'/course/' + course.uid}>
                <ListItemIcon aria-label="info-icon">
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={t('my-courses.see-details')} />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      ) : (
        <SwipeableDrawer
          anchor="right"
          open={openVideoDrawer === inProgressVideos[0].videoId}
          onClose={() => setOpenVideoDrawer(false)}
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
              <CloseIcon
                sx={{ color: 'white' }}
                onClick={() => setOpenVideoDrawer(false)}
              />
            </IconButton>
          </Box>
          <Typography align="center" variant="h1">
            {videoInfo.name}
          </Typography>
          <Box>
            <Video
              video={inProgressVideos[0].videoLink}
              id={inProgressVideos[0].videoId}
              user={auth.user}
              duration={videoInfo.duration}
              courseId={course.id}
            />
          </Box>
        </SwipeableDrawer>
      )}
    </>
  )
}

export default MyCoursesProgressDrawer
