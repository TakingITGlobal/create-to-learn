import React from 'react'
import Meta from './../components/Meta'
import WelcomeSection from './../components/WelcomeSection'

function IndexPage(props) {
  return (
    <>
      <Meta />
      <WelcomeSection
        image='https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-2.png'
        title='Create To Learn'
        subtitle=''
      />
    </>
  )
}

export default IndexPage
