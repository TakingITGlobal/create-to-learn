import React, { useState, useContext } from 'react'

import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DownloadIcon from '@mui/icons-material/Download'
import InfoIcon from '@mui/icons-material/Info'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'

import { useTranslation } from 'react-i18next'

function MyCoursesProgressDrawer({ course, open, setOpenCourseDrawer }) {
  const { t } = useTranslation()

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={() => setOpenCourseDrawer(null)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon aria-label="continue-watching-icon">
              <PlayCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={t('my-courses.continue-watching')} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon aria-label="add-to-watchlist-icon">
              <VideoLibraryIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary={t('add-to-watchlist')} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon aria-label="download-icon">
              <DownloadIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary={t('my-courses.download-episode')} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href={'/course/' + course.uid}>
            <ListItemIcon aria-label="info-icon">
              <InfoIcon sx={{ color: 'white' }} />
            </ListItemIcon>
            <ListItemText primary={t('my-courses.see-details')} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}

export default MyCoursesProgressDrawer
