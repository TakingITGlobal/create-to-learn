import React from 'react'
import CourseSection from './../components/CoursePage/CourseSection'
import { useRouter } from './../util/router'
import { useCourseByUID } from '../util/db'
import LinearProgress from '@mui/material/LinearProgress'
import Meta from '../components/Meta'

function CoursePage(props) {
  const router = useRouter()
  const { courseId } = router.params
  const { data: courseData, isLoading } = useCourseByUID(courseId)

  const course = courseData && courseData[0]

  const seriesName = course?.seriesName
  const description = course?.description
  const creator = course?.creator
  const courseImage = course?.thumbnail[0].downloadURL

  return (
    <>
      <Meta
        title={`${seriesName} - ${creator} - Create to Learn`}
        description={description}
        image={courseImage}
      />
      {!isLoading ? (
        <CourseSection
          bgColor="default"
          size="normal"
          bgImage=""
          bgImageOpacity={1}
          id={courseId}
          courseData={course}
        />
      ) : (
        <LinearProgress />
      )}
    </>
  )
}

export default CoursePage
