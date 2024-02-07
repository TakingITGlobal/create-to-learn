import React from 'react'
import Meta from './../components/Meta'
import SignUpSection from 'components/SignUp/SignUpSection'

function SignUpPage() {
  return (
    <>
      <Meta title="Sign Up | Create to Learn" />
      <SignUpSection startSignUp={1}/>
    </>
  )
}

export default SignUpPage
