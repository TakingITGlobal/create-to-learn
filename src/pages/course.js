import React, { useEffect, useState } from 'react'
import Meta from './../components/Meta'
import CourseSection from './../components/CoursePage/CourseSection'
import { useRouter } from './../util/router'
import { useCourseByUID } from '../util/db'
function CoursePage(props) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState()
  const { courseId } = router.params
  const { data: courseData } = useCourseByUID(courseId)

  useEffect(() => {
    if (courseData?.length) {
      setData(courseData[0])
    }
  }, [courseData])
  useEffect(() => {
    setLoading(false)
  }, [data])

  return (
    <>
      <Meta title="Course" />
      {data && (
        <CourseSection
          bgColor="default"
          size="normal"
          bgImage=""
          bgImageOpacity={1}
          id={courseId}
          data={data}
        />
      )}
    </>
  )
}

export default CoursePage
