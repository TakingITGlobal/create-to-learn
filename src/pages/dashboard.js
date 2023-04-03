import React from 'react'
import Meta from './../components/Meta'
import DashboardSection from './../components/DashboardSection'

function DashboardPage(props) {
  return (
    <>
      <Meta title="Dashboard" />
      <DashboardSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Hello"
        subtitle=""
      />
    </>
  )
}

export default DashboardPage
