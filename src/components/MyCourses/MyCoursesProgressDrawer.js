import React, { useState, useEffect } from 'react'

import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DownloadIcon from '@mui/icons-material/Download'
import InfoIcon from '@mui/icons-material/Info'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import CloseIcon from '@mui/icons-material/Close'

import MyCoursesVideoDrawer from './MyCoursesVideoDrawer'

import { useAuth } from '../../util/auth'
import getByIdVimeo from '../../util/vimeo'
import {
  createWatchlistCourse,
  useWatchlistById,
  useDownloadsById,
  useVideosByCourseId,
} from '../../util/db'
import { useTranslation } from 'react-i18next'
import { handleAddToDownloads } from './handleAddToDownloads'

function MyCoursesProgressDrawer({
  course,
  open,
  setOpenCourseDrawer,
  inProgressVideos,
  setSnackbarMessage,
  setOpenSnackbar,
}) {
  const { t } = useTranslation()
  const auth = useAuth()

  const [openVideoDrawer, setOpenVideoDrawer] = useState(false)
  const [videoInfo, setVideoInfo] = useState([])
  const [videosToDownload, setVideosToDownload] = useState([])

  const { data: watchlistData } = useWatchlistById(auth.user?.uid, course.id)

  const { data: downloadsData } = useDownloadsById(auth.user?.uid, course.id)

  const courseId = course?.id

  const { data: courseVideos } = useVideosByCourseId(courseId)

  useEffect(() => {
    const videoId =
      inProgressVideos[0]?.videoLink &&
      inProgressVideos[0]?.videoLink.match(/\d+/g)[0]

    getByIdVimeo(`/videos/${videoId}`).then((data) =>
      setVideoInfo([data.data.data[0]]),
    )
  }, [inProgressVideos])

  useEffect(() => {
    //Get formatted video ids from videosToDownload
    if (courseVideos) {
      const videoIds = courseVideos
        .map(({ ourVimeoUrl }) => `/videos/${ourVimeoUrl.match(/\d+/g)[0]}`)
        .join(',')
      getByIdVimeo(videoIds).then((data) => {
        setVideosToDownload(data.data.data)
      })
    }
  }, [courseVideos])

  const handleAddToWatchlist = () => {
    setOpenSnackbar(true)
    if (!watchlistData?.length && auth.user) {
      createWatchlistCourse({
        owner: auth.user.uid,
        courseId: course.id,
        courseUID: course.uid,
      }).then(() => {
        setSnackbarMessage('Success!  Added to your watchlist')
        setOpenCourseDrawer(false)
      })
    }
  }

  const handleSnackbar = (title) => {
    setSnackbarMessage(title)
    setOpenSnackbar(true)
  }

  const listItemOptions = [
    {
      onClick: () => setOpenVideoDrawer(inProgressVideos[0].videoId),
      ariaLabel: 'continue-watching-icon',
      text: t('my-courses.continue-watching'),
      href: null,
      icon: <PlayCircleOutlineIcon />,
    },
    {
      onClick: () => handleAddToWatchlist(),
      ariaLabel: 'add-to-watchlist-icon',
      text: t('add-to-watchlist'),
      href: null,
      icon: <VideoLibraryIcon />,
    },
    {
      onClick: () =>
        handleAddToDownloads(
          videosToDownload,
          downloadsData,
          handleSnackbar,
          auth,
          course,
        ),
      ariaLabel: 'download-icon',
      text: t('my-courses.download-episode'),
      href: null,
      icon: <DownloadIcon />,
    },
    {
      onClick: () => setOpenCourseDrawer(false),
      ariaLabel: 'continue-watching-icon',
      text: t('my-courses.continue-watching'),
      href: '/course/' + course.uid,
      icon: <InfoIcon />,
    },
  ]

  return (
    <>
      {!openVideoDrawer && (
        <Drawer
          anchor="bottom"
          open={open}
          onClose={() => setOpenCourseDrawer(false)}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <IconButton
              aria-label="close"
              onClick={() => {
                setOpenCourseDrawer(false)
              }}
            >
              <CloseIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>
          <List>
            {listItemOptions.map(
              ({ onClick, href, text, ariaLabel, icon }, index) => (
                <ListItem disablePadding key={index}>
                  <ListItemButton onClick={onClick} href={href}>
                    <ListItemIcon aria-label={ariaLabel}>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ),
            )}
          </List>
        </Drawer>
      )}
      <MyCoursesVideoDrawer
        course={course}
        setOpenVideoDrawer={setOpenVideoDrawer}
        inProgressVideos={inProgressVideos}
        openVideoDrawer={openVideoDrawer}
        videoInfo={videoInfo}
      />
    </>
  )
}

export default MyCoursesProgressDrawer
