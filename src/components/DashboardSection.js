import React, { useState } from 'react'
import Container from '@mui/material/Container'
import 'react-multi-carousel/lib/styles.css'

import { makeStyles } from '@material-ui/core/styles'

import Section from './Section'
import SectionHeader from './SectionHeader'
import SignUp from './SignUp'
import DashboardTopCourses from './DashboardTopCourses'
import DashboardLearningPaths from './DashboardLearningPaths'
import DashboardCreatorSpotlight from './DashboardCreatorSpotlight'
import { useAuth } from './../util/auth'

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: theme.spacing(3),
  },
  carouselItem: {
    paddingRight: '20px',
    paddingBottom: '20px',
  },
}))

function DashboardSection(props) {
  const classes = useStyles()
  //This should be in local storage
  const [dismissSignUp, setDismissSignUp] = useState(false)

  const auth = useAuth()

  const categoryInterests = [
    'Video & Film',
    'Game Design',
    'Cultural Teachings',
  ]

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          size={4}
          textAlign="center"
        />
        {!dismissSignUp && !auth.user && (
          <SignUp setDismissed={setDismissSignUp} showDismissButton={true} />
        )}
        <DashboardCreatorSpotlight />
        <DashboardLearningPaths />
        {categoryInterests.map((interest, index) => (
          <DashboardTopCourses
            key={index}
            category={interest}
            title={`Top Courses in ${interest}`}
          />
        ))}
      </Container>
    </Section>
  )
}

export default DashboardSection
