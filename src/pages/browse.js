import React from 'react'
import Meta from './../components/Meta'
import BrowseSection from './../components/BrowseSection'
import { CoursesAndCreatorsProvider } from '../util/coursesAndCreatorsProvider'

function BrowsePage(props) {
  return (
    <>
      <Meta title="Browse" />
      <CoursesAndCreatorsProvider>
        <BrowseSection />
      </CoursesAndCreatorsProvider>
    </>
  )
}

export default BrowsePage
