import React, { useState, useContext, useEffect } from 'react'
import 'react-multi-carousel/lib/styles.css'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import SvgIcon from '@mui/material/SvgIcon'
import Section from './Section'
import SignUp from './SignUp'
import DashboardTopCourses from './DashboardTopCourses'
import DashboardCreatorsMessage from './DashboardCreatorsMessage'
import DashboardCreatorSpotlight from './DashboardCreatorSpotlight'
import DashboardGreeting from './DashboardGreeting'
import DashboardVideo from './DashboardVideo'
import { useAuth } from './../util/auth'
import { dataContext } from '../util/dataProvider'
import { defaultCategories, categories } from '../assets/options/categories'
import { useTranslation } from 'react-i18next'
import useClasses from '../hooks/useClasses'
import StudentsAreAlsoViewingIcon from '../assets/images/Strudents-are-also-viewing.svg'

const styles = (theme) => ({
  boxStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '500px',
  },
})

function DashboardSection(props) {
  const { t } = useTranslation()
  const classes = useClasses(styles)

  //This should be in local storage
  const [dismissSignUp, setDismissSignUp] = useState(false)

  const auth = useAuth()
  const {
    allCourses,
    allCreators,
    loadingCourses,
    loadingCreators,
    errorLoadingCourses,
    errorLoadingCreators,
  } = useContext(dataContext)

  const creatorsWithMessage = allCreators.length
    ? allCreators.filter(
        (creator) =>
          creator.messageFromCreator && creator.messageFromCreator !== '',
      )
    : []

  const featuredCourses = allCourses.length
    ? allCourses.filter(({ featured }) => featured === 'checked').slice(0, 5)
    : []

  const coursesByCategory = (categoryLabel) => {
    return allCourses
      .filter((course) => course.category.includes(categoryLabel))
      .slice(0, 5)
  }

  const spotlightVideoCourse = allCourses.length && allCourses[0]

  const interests =
    auth.user.interests.length > 0
      ? categories.filter(({ label }) => auth.user.interests.includes(label))
      : defaultCategories

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      {loadingCourses || loadingCreators ? (
        <Box className={classes.boxStyle}>
          <CircularProgress />
        </Box>
      ) : errorLoadingCourses && errorLoadingCreators ? (
        <Box className={classes.boxStyle}>
          <Typography>{t('dashboard.error')} </Typography>
        </Box>
      ) : (
        <Container>
          <DashboardGreeting />
          <DashboardVideo course={spotlightVideoCourse} />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {!dismissSignUp && !auth.user && (
              <SignUp
                setDismissed={setDismissSignUp}
                showDismissButton={true}
              />
            )}
          </Box>
          <DashboardCreatorsMessage creators={creatorsWithMessage} />
          <DashboardCreatorSpotlight
            creators={allCreators
              .filter((creator) => creator.featured === 'checked')
              .slice(0, 5)}
          />
          {interests.map((interest, index) => {
            const courses = coursesByCategory(interest.label)
            return (
              <DashboardTopCourses
                key={index}
                title={`Top Courses in ${interest.label}`}
                icon={interest.icon}
                courses={courses}
              />
            )
          })}
          <DashboardTopCourses
            title={t('dashboard.students-also-viewing')}
            icon={
              <SvgIcon
                fontSize="large"
                component="div"
                sx={{ paddingBottom: '10px' }}
              >
                <img
                  src={StudentsAreAlsoViewingIcon}
                  alt="writing-icon"
                  style={{ paddingBottom: '10px' }}
                />
              </SvgIcon>
            }
            courses={featuredCourses}
          />
        </Container>
      )}
    </Section>
  )
}

export default DashboardSection
