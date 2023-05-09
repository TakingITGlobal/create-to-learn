import React, { useLayoutEffect } from 'react'
import Meta from './../components/Meta'
import auth0 from './../util/auth0'
import { useAuth } from '../util/auth'

function Auth0CallbackPage(props) {
  const auth = useAuth()
  useLayoutEffect(() => {
    // Hide body so layout components are not visible
    document.body.style.display = 'none'
    // Get auth results and close popup
    // auth.parseHash(window.location.hash).then((user) => {
    //   console.log(user)
    // })
    auth0.popup.callback()
  }, [])

  return <Meta title="Auth0 Callback" />
}

export default Auth0CallbackPage
