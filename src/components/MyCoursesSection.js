import React, { useState, useContext } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import Section from './Section'
import BrowseCourseCard from './BrowseCourseCard'
import BrowseEmptyState from './BrowseEmptyState'
import { useTranslation } from 'react-i18next'
import { dataContext } from '../util/dataProvider'
import { useAuth } from './../util/auth'

function MyCoursesSection(props) {
  const { t } = useTranslation()
  const auth = useAuth()

  const [tabIndex, setTabIndex] = useState(0)

  const handleChangeTab = (event, newTab) => {
    setTabIndex(newTab)
  }

  const { allCourses, loadingCourses } = useContext(dataContext)

  const watchlist = allCourses.filter(
    ({ uid }) => auth.user?.watchlist && auth.user.watchlist.includes(uid),
  )

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Box mt={2}>
        <Container>
          <Box sx={{ paddingBottom: '7px' }}>
            <Typography variant="h4">{t('my-courses.my-courses')}</Typography>
          </Box>
          <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabIndex}
                textColor="secondary"
                indicatorColor="secondary"
                onChange={handleChangeTab}
                aria-label="my courses tabs"
                variant="fullWidth"
              >
                <Tab
                  label={t('my-courses.my-progress')}
                  {...a11yProps(0)}
                  sx={{ color: 'white' }}
                />
                <Tab
                  label={t('my-courses.downloads')}
                  {...a11yProps(1)}
                  sx={{ color: 'white' }}
                />

                <Tab
                  label={t('my-courses.watchlist')}
                  {...a11yProps(2)}
                  sx={{ color: 'white' }}
                />
              </Tabs>
            </Box>
            <TabPanel tabIndex={tabIndex} index={0}>
              ljlfjl
            </TabPanel>
            <TabPanel tabIndex={tabIndex} index={1}>
              'hahhh'
            </TabPanel>
            <TabPanel tabIndex={tabIndex} index={2}>
              {loadingCourses ? (
                <CircularProgress color="primary" />
              ) : watchlist.length ? (
                <Box>
                  {watchlist.map((course, index) => (
                    <BrowseCourseCard key={index} course={course} />
                  ))}
                </Box>
              ) : (
                <BrowseEmptyState />
              )}
            </TabPanel>
          </Box>
        </Container>
      </Box>
    </Section>
  )
}

export default MyCoursesSection

const TabPanel = (props) => {
  const { children, tabIndex, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={tabIndex !== index}
      id={`myCourses-tabpanel-${index}`}
      aria-labelledby={`myCourses-tab-${index}`}
      {...other}
    >
      {tabIndex === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const a11yProps = (index) => {
  return {
    id: `myCourses-tab-${index}`,
    'aria-controls': `myCourses-tabpanel-${index}`,
  }
}
