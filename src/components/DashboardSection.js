import React, { useState, useContext } from 'react'
import Container from '@mui/material/Container'
import 'react-multi-carousel/lib/styles.css'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Section from './Section'
import SignUp from './SignUp'
import DashboardTopCourses from './DashboardTopCourses'
// import DashboardLearningPaths from './DashboardLearningPaths'
import DashboardCreatorSpotlight from './DashboardCreatorSpotlight'

import { useAuth } from './../util/auth'
import { dataContext } from '../util/dataProvider'

function DashboardSection(props) {
  //This should be in local storage
  const [dismissSignUp, setDismissSignUp] = useState(false)

  const auth = useAuth()
  const {
    allCourses,
    allCreators,
    // learningPaths,
    loadingCourses,
    loadingCreators,
    // loadingLearningPaths,
  } = useContext(dataContext)

  const defaultCategories = [
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
        {/* <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          textAlign="center"
        /> */}
        <Box sx={{ paddingBottom: '7px' }}>
          <Typography variant="h4">Hello</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {!dismissSignUp && !auth.user && (
            <SignUp setDismissed={setDismissSignUp} showDismissButton={true} />
          )}
        </Box>
        {!loadingCreators && (
          <DashboardCreatorSpotlight
            creators={allCreators
              .filter((creator) => creator.featured === 'checked')
              .slice(0, 5)}
          />
        )}
        {/* {!loadingLearningPaths && (
          <DashboardLearningPaths learningPaths={learningPaths} />
        )} */}
        {!loadingCourses &&
          defaultCategories.map((interest, index) => (
            <DashboardTopCourses
              key={index}
              title={`Top Courses in ${interest}`}
              courses={allCourses
                .filter((course) => course.category.includes(interest))
                .slice(0, 5)}
            />
          ))}
        <DashboardTopCourses
          title="Students are also viewing"
          courses={allCourses
            .filter((course) => course.featured === 'checked')
            .slice(0, 5)}
        />
      </Container>
    </Section>
  )
}

export default DashboardSection
