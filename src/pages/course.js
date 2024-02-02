import React, { useEffect, useState } from 'react'
import CourseSection from './../components/CoursePage/CourseSection'
import { useRouter } from './../util/router'
import { useCourseByUID } from '../util/db'
import Meta from '../components/Meta'

function CoursePage(props) {
  const router = useRouter()
  const [data, setData] = useState()
  const { courseId } = router.params
  const { data: courseData } = useCourseByUID(courseId)

  useEffect(() => {
    if (courseData?.length) {
      setData(courseData[0])
    }
  }, [courseData])
  useEffect(() => {}, [data])

  const courseImage =
    courseData && courseData?.thumbnail
      ? courseData?.thumbnail[0]?.downloadURL
      : ''
  const metaTitle = `${courseData?.seriesName} - ${courseData?.creator} - Create to Learn`

  return (
    <>
      <Meta
        title={metaTitle}
        description={courseData?.description}
        image={courseImage}
      />
      {data && (
        <CourseSection
          bgColor="default"
          size="normal"
          bgImage=""
          bgImageOpacity={1}
          id={courseId}
          courseData={data}
        />
      )}
    </>
  )
}

export default CoursePage
