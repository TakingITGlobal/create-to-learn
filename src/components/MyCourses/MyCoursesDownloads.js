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
import InfoIcon from '@mui/icons-material/Info'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'

import CourseCard from '../CourseCard'
import MyCoursesEmptyState from './MyCoursesEmptyState'
import { useAuth } from '../../util/auth'
import { useTranslation } from 'react-i18next'
import { dataContext } from '../../util/dataProvider'
import { useUserDownloadsByOwner, deleteDownloadsCourse } from '../../util/db'

function MyCoursesDownloads() {
  const { t } = useTranslation()
  const auth = useAuth()

  const [openDrawer, setOpenDrawer] = useState(false)

  const { allCourses } = useContext(dataContext)
  const { data: downloadedData } = useUserDownloadsByOwner(auth?.user.uid)

  const downloadsCourseIds = downloadedData?.length
    ? downloadedData.map((item) => item.courseId)
    : []
  const downloadedCourses = allCourses.filter(({ id }) =>
    downloadsCourseIds.includes(id),
  )

  const emptyStateTitle = auth.user
    ? t('my-courses.downloads-empty-state-title')
    : t('my-courses.guest-downloads-empty-state-title')

  const emptyStateSubtitle = auth.user
    ? t('my-courses.downloads-empty-state-subtitle')
    : t('my-courses.guest-downloads-empty-state-subtitle')

  const emptyStateButtonText = auth.user
    ? t('my-courses.find-course')
    : t('my-courses.create-account-sign-in')

  return downloadedCourses?.length ? (
    downloadedCourses.map((course, index) => {
      const DownloadDocId = downloadedData.filter(
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
                      deleteDownloadsCourse(DownloadDocId)
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
      href={'/browse'}
    />

  )
}

export default MyCoursesDownloads
