import React from 'react'
import Container from '@mui/material/Container'
import Section from '../Section'
import Auth from './Auth'
import AuthFooter from './AuthFooter'
import { useAuthTypeOptions } from '../../hooks/use-auth-type-options.hook'
import { PageHeading } from 'components/PageHeading'

function AuthSection({ bgColor, bgImage, bgImageOpacity, size }) {
  const { options } = useAuthTypeOptions()

  return (
    <Section
      bgColor={bgColor}
      size={size}
      bgImage={bgImage}
      bgImageOpacity={bgImageOpacity}
    >
      <Container maxWidth="xs">
        <PageHeading headingText={options.title} textAlign="center" mb="2rem" />
        <Auth />
        <AuthFooter />
      </Container>
    </Section>
  )
}

export default AuthSection
