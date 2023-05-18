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

import BrowseCourseCard from './BrowseCourseCard'
import MyCoursesProgressDrawer from './MyCoursesProgressDrawer'
import MyCoursesEmptyState from './MyCoursesEmptyState'

import { useTranslation } from 'react-i18next'
import { useInProgressCourses } from '../hooks/useInProgressCourses'

function MyCoursesProgress() {
  const { t } = useTranslation()

  const [openCourseDrawer, setOpenCourseDrawer] = useState(false)
  const inProgressCourses = useInProgressCourses()

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
                <BrowseCourseCard
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
        <Typography>{t('my-courses.in-progress')}</Typography>
      </AccordionSummary>
      <AccordionDetails>Completed courses will go here</AccordionDetails>
    </Accordion>
  ) : (
    <MyCoursesEmptyState
      title={'Courses you’ve started will appear here'}
      subtitle={'Watch a video to have it appear here!'}
      buttonText={'Find a course'}
      href={'/browse'}
    />
  )
}

export default MyCoursesProgress
