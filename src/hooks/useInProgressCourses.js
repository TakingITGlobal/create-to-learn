import { useState, useMemo, useContext } from 'react'
import { useUserProgressByOwner } from '../util/db'
import { dataContext } from '../util/dataProvider'
import { useAuth } from './../util/auth'

export const useInProgressCourses = () => {
  const { allCourses, loadingCourses } = useContext(dataContext)
  const auth = useAuth()

  const progress = useUserProgressByOwner(auth.user.uid)
  const [inProgressVideoIds, setInProgressVideoIds] = useState([])
  const [inProgressCourses, setInProgressCourses] = useState([])

  console.log(progress)
  useMemo(() => {
    if (progress && progress.data) {
      setInProgressVideoIds(
        progress.data
          .filter((item) => item.progress !== 0)
          .map((item) => item.videoId),
      )
    }
  }, [progress.data])

  useMemo(() => {
    if (inProgressVideoIds.length && !loadingCourses) {
      const coursesWithInProgressVideo = allCourses.filter(
        (course) =>
          course.videos.length &&
          course.videos.some((video) => inProgressVideoIds.includes(video)),
      )
      const blah = coursesWithInProgressVideo.map((course) => {
        const vidInProgress = progress.data.filter((item) =>
          course.videos.includes(item.videoId),
        )
        return { course: course, inProgressVideos: vidInProgress }
      })
      setInProgressCourses(blah)
    }
  }, [inProgressVideoIds.length, progress.data])

  return inProgressCourses
}
