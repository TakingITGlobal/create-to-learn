import React, { useState, useContext } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DownloadIcon from '@mui/icons-material/Download'
import InfoIcon from '@mui/icons-material/Info'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'

import CourseCard from '../CourseCard'
import MyCoursesEmptyState from './MyCoursesEmptyState'
import { useAuth } from '../../util/auth'
import { useTranslation } from 'react-i18next'
import { deleteWatchlistCourse } from '../../util/db'
import { dataContext } from '../../util/dataProvider'
import { useUserWatchlistByOwner } from '../../util/db'

function MyCoursesWatchlistDrawer({ watchlistDocId, course }) {
  const { t } = useTranslation()
  const auth = useAuth()

  const [openDrawer, setOpenDrawer] = useState(false)

  const { allCourses, loadingCourses } = useContext(dataContext)
  const { data: ownerWatchlist } = useUserWatchlistByOwner(auth?.user.uid)

  const watchlistIds = ownerWatchlist?.length
    ? ownerWatchlist.map((item) => item.courseId)
    : []
  const watchlistCourses = allCourses.filter(({ id }) =>
    watchlistIds.includes(id),
  )

  const emptyStateTitle = auth.user
    ? t('my-course.progress-empty-state-title')
    : t('my-courses.guest-progress-empty-state-title')

  const emptyStateSubtitle = auth.user
    ? t('my-courses.progress-empty-state-subtitle')
    : t('my-courses.guest-progress-empty-state-subtitle')

  const emptyStateButtonText = auth.user
    ? t('my-courses.find-course')
    : t('my-courses.create-account-sign-in')

  return watchlistCourses?.length ? (
    watchlistCourses.map((course, index) => {
      const watchlistDocId = ownerWatchlist.filter(
        ({ courseId }) => courseId === course.id,
      )[0]?.id

      return (
        <>
          <Stack direction="row" spacing={1}>
            <CourseCard course={course} />
            <IconButton onClick={() => setOpenDrawer(course.id)}>
              <MoreVertIcon />
            </IconButton>
          </Stack>
          <Drawer
            anchor={'bottom'}
            open={openDrawer === course.id}
            onClose={() => setOpenDrawer(false)}
          >
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  padding: '10px',
                  justifyContent: 'flex-end',
                }}
              >
                <IconButton
                  aria-label="close-icon"
                  onClick={() => setOpenDrawer(false)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon aria-label="download-icon">
                      <DownloadIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('my-courses.download')} />
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
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      deleteWatchlistCourse(watchlistDocId)
                      setOpenDrawer(false)
                    }}
                  >
                    <ListItemIcon aria-label="delete-icon">
                      <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('my-courses.remove-from-list')} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </>
      )
    })
  ) : (
    <MyCoursesEmptyState
      title={emptyStateTitle}
      subtitle={emptyStateSubtitle}
      buttonText={emptyStateButtonText}
      href={auth.user ? '/browse' : '/auth/signin'}
    />
  )
}

export default MyCoursesWatchlistDrawer
