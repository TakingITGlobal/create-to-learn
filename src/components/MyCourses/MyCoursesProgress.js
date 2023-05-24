import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import CourseCard from '../CourseCard'
import MyCoursesProgressDrawer from './MyCoursesProgressDrawer'
import MyCoursesEmptyState from './MyCoursesEmptyState'

import { useTranslation } from 'react-i18next'
import { useInProgressCourses } from '../../hooks/useInProgressCourses'
import { useAuth } from '../../util/auth'

function MyCoursesProgress() {
  const auth = useAuth()
  const { t } = useTranslation()

  const [openCourseDrawer, setOpenCourseDrawer] = useState(false)
  const inProgressCourses = useInProgressCourses()

  const emptyStateTitle = auth.user
    ? t('my-course.progress-empty-state-title')
    : t('my-courses.guest-progress-empty-state-title')

  const emptyStateSubtitle = auth.user
    ? t('my-courses.progress-empty-state-subtitle')
    : t('my-courses.guest-progress-empty-state-subtitle')

  const emptyStateButtonText = auth.user
    ? t('my-courses.find-course')
    : t('my-courses.create-account-sign-in')

  return inProgressCourses.length ? (
    <Accordion disableGutters defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="in-progress-content"
        id="in-progress-header"
      >
        <Typography>{t('my-courses.in-progress')}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {inProgressCourses.map(({ course, inProgressVideos }, i) => {
          const totalTimeWatched =
            inProgressVideos.length > 1
              ? inProgressVideos.reduce(
                  (acc, { progress }) =>
                    Number(acc.progress) + Number(progress),
                )
              : inProgressVideos[0].progress
          const percentProgress =
            100 * (totalTimeWatched / Number(course.totalLength))
          const timeLeft = (Number(course.totalLength) - totalTimeWatched) / 60
          return (
            <Box key={i}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <CourseCard
                  key={i}
                  course={course}
                  progress={{
                    percentProgress: percentProgress ?? 0,
                    timeLeft: {
                      hours: Math.floor(timeLeft / 60),
                      minutes: (timeLeft % 60).toFixed(),
                    },
                  }}
                />
                <IconButton onClick={() => setOpenCourseDrawer(course.id)}>
                  <MoreVertIcon />
                </IconButton>
              </Stack>
              <MyCoursesProgressDrawer
                course={course}
                open={openCourseDrawer === course.id}
                setOpenCourseDrawer={setOpenCourseDrawer}
              />
            </Box>
          )
        })}
      </AccordionDetails>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="in-progress-content"
        id="in-progress-header"
      >
        <Typography>{t('my-courses.completed')}</Typography>
      </AccordionSummary>
      <AccordionDetails>Completed courses will go here</AccordionDetails>
    </Accordion>
  ) : (
    <MyCoursesEmptyState
      title={emptyStateTitle}
      subtitle={emptyStateSubtitle}
      buttonText={emptyStateButtonText}
      href={auth.user ? '/browse' : '/auth/signin'}
    />
  )
}

export default MyCoursesProgress
