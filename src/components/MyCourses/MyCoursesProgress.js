import React, { useState, useEffect } from 'react'
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

function MyCoursesProgress({ setSnackbarMessage, setOpenSnackbar }) {
  const auth = useAuth()
  const { t } = useTranslation()

  const [openCourseDrawer, setOpenCourseDrawer] = useState(false)

  const inProgressCourses = useInProgressCourses()

  const emptyStateTitle = auth.user
    ? t('my-courses.progress-empty-state-title')
    : t('my-courses.guest-progress-empty-state-title')

  const emptyStateSubtitle = auth.user
    ? t('my-courses.progress-empty-state-subtitle')
    : t('my-courses.guest-progress-empty-state-subtitle')

  const emptyStateButtonText = auth.user
    ? t('my-courses.find-course')
    : t('my-courses.create-account-sign-in')

  console.log(inProgressCourses)
  const completedCourses = inProgressCourses.filter((course) =>
    course.inProgressVideos.every(({ complete }) => complete),
  )
  const notCompletedCourses = inProgressCourses.filter((course) =>
    course.inProgressVideos.some(({ complete }) => !complete),
  )

  //To Do: Cleanup code.  Not sure if these should be split up into two components for each accordion or just be left alone.
  //To Do: Consider moving the drawer out of the list and instead just change the courseInfo to be shown

  return inProgressCourses.length ? (
    <div>
      <Accordion disableGutters defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="in-progress-content"
          id="in-progress-header"
        >
          <Typography>{t('my-courses.in-progress')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {notCompletedCourses.map(({ course, inProgressVideos }, index) => {
            const totalTimeWatched =
              inProgressVideos.length > 1
                ? inProgressVideos
                    .map(({ progress }) => progress)
                    .reduce((acc, curr) => acc + curr)
                : inProgressVideos.length === 1
                ? inProgressVideos[0].progress
                : 0
            const percentProgress =
              100 * (parseInt(totalTimeWatched) / parseInt(course.totalLength))
            const timeLeft =
              (parseInt(course.totalLength) - parseInt(totalTimeWatched)) / 60
            const firstInProgressVideo = inProgressVideos[0] ?? null
            const courseId = course.id
            return (
              <Box key={index}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CourseCard
                    course={course}
                    progress={{
                      percentProgress: percentProgress ?? 0,
                      timeLeft: {
                        hours: Math.floor(timeLeft / 60),
                        minutes: (timeLeft % 60).toFixed(),
                      },
                      completed: false,
                    }}
                  />
                  <IconButton onClick={() => setOpenCourseDrawer(course.id)}>
                    <MoreVertIcon />
                  </IconButton>
                </Stack>
                {openCourseDrawer === course.id ? (
                  <MyCoursesProgressDrawer
                    course={course}
                    courseId={courseId}
                    open={openCourseDrawer === courseId}
                    setOpenCourseDrawer={setOpenCourseDrawer}
                    inProgressVideo={firstInProgressVideo}
                    completed={false}
                    setSnackbarMessage={setSnackbarMessage}
                    setOpenSnackbar={setOpenSnackbar}
                  />
                ) : null}
              </Box>
            )
          })}
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="in-progress-content"
          id="in-progress-header"
        >
          <Typography>{t('my-courses.completed')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {completedCourses.map(({ course, inProgressVideos }, i) => {
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
                      percentProgress: 100,
                      timeLeft: {
                        hours: 0,
                        minutes: 0,
                      },
                      completed: true,
                    }}
                  />
                  <IconButton onClick={() => setOpenCourseDrawer(course.id)}>
                    <MoreVertIcon />
                  </IconButton>
                </Stack>
                {openCourseDrawer === course.id ? (
                  <MyCoursesProgressDrawer
                    course={course}
                    open={openCourseDrawer === course.id}
                    setOpenCourseDrawer={setOpenCourseDrawer}
                    inProgressVideos={inProgressVideos}
                  />
                ) : null}
              </Box>
            )
          })}
        </AccordionDetails>
      </Accordion>
    </div>
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
