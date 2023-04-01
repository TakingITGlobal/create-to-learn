import React from 'react'
import Meta from './../components/Meta'
import DashboardSection from './../components/DashboardSection'
import { DataProvider } from '../util/dataProvider'

function DashboardPage(props) {
  return (
    <>
      <Meta title="Dashboard" />
      <DataProvider>
        <DashboardSection
          bgColor="default"
          size="medium"
          bgImage=""
          bgImageOpacity={1}
          title="Dashboard"
          subtitle=""
        />
      </DataProvider>
    </>
  )
}

export default DashboardPage
