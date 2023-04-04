import React, { useState, useContext } from 'react'
import 'react-multi-carousel/lib/styles.css'
import Container from '@mui/material/Container'
import 'react-multi-carousel/lib/styles.css'
import Box from '@mui/material/Box'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import Section from './Section'
import SignUp from './SignUp'
import DashboardTopCourses from './DashboardTopCourses'
// import DashboardLearningPaths from './DashboardLearningPaths'
import DashboardCreatorSpotlight from './DashboardCreatorSpotlight'
import DashboardGreeting from './DashboardGreeting'
import DashboardVideo from './DashboardVideo'
import { useAuth } from './../util/auth'
import { dataContext } from '../util/dataProvider'
import { defaultCategories } from '../assets/options/categories'

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

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <DashboardGreeting />
        {!loadingCourses && allCourses.length && (
          <DashboardVideo course={allCourses[0]} />
        )}
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
              title={`Top Courses in ${interest.label}`}
              icon={interest.icon}
              courses={allCourses
                .filter((course) => course.category.includes(interest.label))
                .slice(0, 5)}
            />
          ))}
        <DashboardTopCourses
          title="Students are also viewing"
          icon={
            <WhatshotIcon
              fontSize="large"
              sx={{
                backgroundColor: '#FFC455',
                padding: '5px',
                borderRadius: '30%',
              }}
            />
          }
          courses={allCourses
            .filter((course) => course.featured === 'checked')
            .slice(0, 5)}
        />
      </Container>
    </Section>
  )
}

export default DashboardSection
