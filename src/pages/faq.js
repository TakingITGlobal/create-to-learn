import React from 'react'
import Meta from './../components/Meta'
import FaqSection from '../components/Unused/FaqSection'

function FaqPage(props) {
  return (
    <>
      <Meta title="FAQ - Create to Learn" />
      <FaqSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
        title="Frequently Asked Questions"
        subtitle=""
      />
    </>
  )
}

export default FaqPage
