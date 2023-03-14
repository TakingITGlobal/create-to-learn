import React from 'react'
import Meta from './../components/Meta'
import MyCoursesSection from './../components/MyCoursesSection'
import { requireAuth } from './../util/auth'

function MyCoursesPage(props) {
  return (
    <>
      <Meta title="My Courses" />
      <MyCoursesSection />
    </>
  )
}

export default requireAuth(MyCoursesPage)
