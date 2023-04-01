import React from 'react'
import Meta from './../components/Meta'
import BrowseSection from './../components/BrowseSection'
import { DataProvider } from '../util/dataProvider'

function BrowsePage(props) {
  return (
    <>
      <Meta title="Browse" />
      <DataProvider>
        <BrowseSection />
      </DataProvider>
    </>
  )
}

export default BrowsePage
