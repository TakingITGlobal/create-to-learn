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
import {
  createWatchlistCourse,
  useWatchlistById,
  createDownloadCourse,
  updateDownloads,
  useDownloadsById,
} from '../../util/db'
import { useTranslation } from 'react-i18next'

function MyCoursesProgressDrawer({
  course,
  open,
  setOpenCourseDrawer,
  inProgressVideos,
  setCourseToDownload,
  setDownloadVideos,
  setSnackbarMessage,
  setOpenSnackbar,
}) {
  const { t } = useTranslation()
  const auth = useAuth()

  const [openVideoDrawer, setOpenVideoDrawer] = useState(false)
  const [videoInfo, setVideoInfo] = useState([])

  const { data: watchlistData } = useWatchlistById(auth.user?.uid, course.id)

  const { data: downloadsData } = useDownloadsById(auth.user?.uid, course.id)

  useEffect(() => {
    const videoId =
      inProgressVideos[0]?.videoLink &&
      inProgressVideos[0]?.videoLink.match(/\d+/g)[0]
    console.log(inProgressVideos[0], 'videoLink')
    getByIdVimeo(`/videos/${videoId}`).then((data) =>
      setVideoInfo([data.data.data[0]]),
    )
  }, [inProgressVideos])

  console.log(videoInfo)

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

  const getVideoDataToDownload = () => {
    return videoInfo.map((video) => {
      return {
        videoName: video.name,
        duration: video.duration,
        link: video.link,
        uri: video.uri,
      }
    })
  }

  const handleCloseDrawers = (title) => {
    setSnackbarMessage(title)
    setOpenSnackbar(true)
  }

  //This function needs to be separated out to CourseSection since it is also used in CourseLessons
  const handleAddToDownloads = () => {
    if (!auth.user.uid) {
      return
    }

    setOpenSnackbar(true)
    const videoDownloadInfo = videoInfo.flatMap(({ download }) =>
      download.filter(({ public_name }) => public_name === '240p'),
    )

    setCourseToDownload(videoDownloadInfo)

    const videoDownloadData = getVideoDataToDownload()
    if (!downloadsData.length) {
      setDownloadVideos(true)
      createDownloadCourse({
        owner: auth.user.uid,
        courseId: course.id,
        courseUID: course.uid,
        videos: videoDownloadData,
      }).then(() => handleCloseDrawers('Success!  Added to your Downloads'))
    } else {
      const videosAlreadyAdded = downloadsData[0].videos
      const videosToAdd = videoDownloadData.filter(
        (video) =>
          !videosAlreadyAdded.map((video) => video.uri).includes(video.uri),
      )
      if (videosToAdd.length) {
        setDownloadVideos(true)
        updateDownloads(downloadsData[0].id, {
          ...downloadsData[0],
          videos: [...videosAlreadyAdded, ...videosToAdd],
        }).then(() => handleCloseDrawers('Success!  Added to your Downloads'))
      } else {
        handleCloseDrawers('Already in your downloads!')
      }
    }
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
      onClick: () => handleAddToDownloads(),
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

  console.log(inProgressVideos, 'inprogress')

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
                setDownloadVideos(false)
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
          {videoInfo && videoInfo[0]?.name}
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
    </>
  )
}

export default MyCoursesProgressDrawer
