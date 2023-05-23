import React from 'react'
import Container from '@mui/material/Container'
import Section from '../Section'
import SectionHeader from '../SectionHeader'
import Auth from './Auth'
import AuthFooter from './AuthFooter'
import { useAuthTypeOptions } from '../../hooks/use-auth-type-options.hook'

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
        <SectionHeader
          title={options.title}
          subtitle=""
          size={4}
          textAlign="center"
        />
        <Auth />
        <AuthFooter />
      </Container>
    </Section>
  )
}

export default AuthSection
