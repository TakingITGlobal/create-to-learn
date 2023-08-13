import { useState, useContext, useMemo } from 'react'
import { useUserProgressByOwner } from '../util/db'
import { dataContext } from '../util/dataProvider'
import { useAuth } from './../util/auth'

export const useInProgressCourses = () => {
  //This should be removed with new courseId added to userProgress
  const { allCourses, loadingCourses } = useContext(dataContext)
  const auth = useAuth()

  const { data: progress } = useUserProgressByOwner(auth.user?.uid)
  const [inProgressVideoIds, setInProgressVideoIds] = useState([])
  const [inProgressCourses, setInProgressCourses] = useState([])

  useMemo(() => {
    if (progress && !loadingCourses) {
      setInProgressVideoIds(
        progress
          .filter((item) => item.progress !== 0)
          .map((item) => item.videoId),
      )
    }
  }, [loadingCourses, progress])

  useMemo(() => {
    if (inProgressVideoIds.length && !loadingCourses) {
      const coursesWithInProgressVideo = allCourses.filter(
        (course) =>
          course.videos.length &&
          course.videos.some((video) => inProgressVideoIds.includes(video)),
      )
      const inProgressCourses = coursesWithInProgressVideo.map((course) => {
        const vidInProgress = progress.filter((item) =>
          course.videos.includes(item.videoId),
        )
        return { course: course, inProgressVideos: vidInProgress }
      })
      setInProgressCourses(inProgressCourses)
    }
  }, [allCourses, inProgressVideoIds, loadingCourses, progress])

  return inProgressCourses
}
