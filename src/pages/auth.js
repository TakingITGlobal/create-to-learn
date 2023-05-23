import React from 'react'
import Meta from './../components/Meta'
import AuthSection from './../components/auth/AuthSection'

function AuthPage() {
  return (
    <>
      <Meta title="Auth" />
      <AuthSection
        bgColor="default"
        size="medium"
        bgImage=""
        bgImageOpacity={1}
      />
    </>
  )
}

export default AuthPage
