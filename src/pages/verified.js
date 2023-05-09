import React, { useLayoutEffect } from 'react'
import Meta from './../components/Meta'
import { Container } from '@mui/material'
import { useAuth } from '../util/auth'
import Section from '../components/Section'

function VerifiedPage(props) {
  const auth = useAuth()
  useLayoutEffect(() => {
    // Hide body so layout components are not visible
    
    // Get auth results and close popup
    
  }, [])
  auth.parseHash(window.location.hash)
  return <>
    <Meta title="Verified Page" />
    <Section>
      <Container>
        <h1>Your account has been verified! You can close this tab</h1>
      </Container>
    </Section>
    
  </>
}

export default VerifiedPage
