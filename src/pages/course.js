import React, { useEffect,useState } from 'react'
import Meta from './../components/Meta'
import CourseSection from './../components/CourseSection'
import { Link } from './../util/router'
import { useRouter } from './../util/router'
import { getCourse } from '../util/db'
function CoursePage(props) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState()
  const { courseId } = router.params

  useEffect(() => {
    (async () => {
      const courseData = await getCourse(courseId)
      setData(courseData)
    })()
  },[courseId])

  useEffect(() => {
    setLoading(false)
  },[data])

  return (
    <>
      <Meta title="Course" />
      { 
        data && 
          <CourseSection
            bgColor="default"
            size="normal"
            bgImage=""
            bgImageOpacity={1}
            id={courseId}
            data={data}  
          />
      }
    </>

  )
}

export default CoursePage
