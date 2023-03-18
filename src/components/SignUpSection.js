import React from 'react'
import Container from '@material-ui/core/Container'
import Section from './Section'
import SectionHeader from './SectionHeader'
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import PageCarousel from './PageCarousel'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: `0 ${theme.spacing(3)}px`,
  },
}))

function SignUpSection(props) {
  const classes = useStyles()

  
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container maxWidth="md">
        <PageCarousel>
          
        </PageCarousel>
      </Container>
    </Section>
  )
}

export default SignUpSection
