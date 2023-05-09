import React from 'react'
import Meta from './../components/Meta'
import SignUpSection from '../components/SignUpSection'

function SignUpPage(props) {
  console.log(window.location)
  return (
    <>
      <Meta title="Sign Up" />
      <SignUpSection/>
    </>
  )
}

export default SignUpPage
