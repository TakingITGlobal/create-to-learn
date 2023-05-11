import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box'

import BrowseCourseCard from './BrowseCourseCard'

import { useTranslation } from 'react-i18next'
import { useAuth } from './../util/auth'
import { useUserProgressByOwner } from '../util/db'
import { dataContext } from '../util/dataProvider'

function MyCoursesProgressContent(props) {
  const { t } = useTranslation()
  const [inProgressVideoIds, setInProgressVideoIds] = useState([])
  const [inProgressCourses, setInProgressCourses] = useState([])
  const auth = useAuth()

  const progress = useUserProgressByOwner(auth.user.uid)
  const { allCourses, loadingCourses } = useContext(dataContext)

  useEffect(() => {
    if (progress && progress.data) {
      setInProgressVideoIds(
        progress.data
          .filter((item) => item.progress !== 0)
          .map((item) => item.videoId),
      )
    }
  }, [progress.data])

  useEffect(() => {
    if (inProgressVideoIds.length) {
      setInProgressCourses(
        allCourses.filter(
          (course) =>
            course.videos.length &&
            course.videos.some((video) => inProgressVideoIds.includes(video)),
        ),
      )
    }
  }, [inProgressVideoIds.length])

  return (
    <Box>
      {inProgressCourses.map((course, i) => {
        const vidInProgress = progress.data.filter((item) =>
          course.videos.includes(item.videoId),
        )
        const totalTimeWatched =
          vidInProgress.length > 1
            ? vidInProgress.reduce(
                (acc, { progress }) => Number(acc.progress) + Number(progress),
              )
            : vidInProgress[0].progress
        const percentProgress =
          100 * (totalTimeWatched / Number(course.totalLength))
        const timeLeft = (Number(course.totalLength) - totalTimeWatched) / 60
        return (
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
        )
      })}
    </Box>
  )
}

export default MyCoursesProgressContent
