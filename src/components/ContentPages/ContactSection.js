import React from 'react'
import Container from '@mui/material/Container'
import Section from '../Section'
import Contact from './Contact'
import { PageHeading } from 'components/PageHeading'
import Typography from '@mui/material/Typography'

function ContactSection(props) {
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <PageHeading
          headingText={props.title}
        />
        <Typography variant="body">{props.subtitle}</Typography>
        <Contact
          showNameField={props.showNameField}
          buttonText={props.buttonText}
          buttonColor={props.buttonColor}
        />
      </Container>
    </Section>
  )
}

export default ContactSection
