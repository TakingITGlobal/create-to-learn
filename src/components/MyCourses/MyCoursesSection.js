import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

import Section from '../Section'
import MyCoursesProgress from './MyCoursesProgress'
import MyCoursesDownloads from './MyCoursesDownloads'
import MyCoursesWatchlistDrawer from './MyCoursesWatchlistDrawer'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../util/auth'

function MyCoursesSection(props) {
  const { t } = useTranslation()
  const auth = useAuth()

  const [tabIndex, setTabIndex] = useState(0)
  const [courseToDownload, setCourseToDownload] = useState(false)
  const [downloadVideos, setDownloadVideos] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState(
    'Login to add to your watchlist',
  )

  const handleChangeTab = (event, newTab) => {
    setTabIndex(newTab)
  }

  const Download = () => {
    return (
      <div style={{ display: 'none' }}>
        {courseToDownload.map((video, index) =>
          video?.link ? (
            <iframe
              key={`${video.link}-${index}`}
              title={`${video.link}-${index}`}
              src={video.link}
            />
          ) : null,
        )}
      </div>
    )
  }

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
                indicatorColor="primary"
                onChange={handleChangeTab}
                aria-label="my courses tabs"
                variant="fullWidth"
              >
                <Tab
                  label={t('my-courses.my-progress')}
                  {...a11yProps(0)}
                  sx={{ color: 'white', padding: 0 }}
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
              <MyCoursesProgress
                setCourseToDownload={setCourseToDownload}
                setDownloadVideos={setDownloadVideos}
                setSnackbarMessage={setSnackbarMessage}
                setOpenSnackbar={setOpenSnackbar}
              />
            </TabPanel>
            <TabPanel tabIndex={tabIndex} index={1}>
              <MyCoursesDownloads />
            </TabPanel>
            <TabPanel tabIndex={tabIndex} index={2}>
              <MyCoursesWatchlistDrawer />
            </TabPanel>
          </Box>
          {downloadVideos && <Download />}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={() => setOpenSnackbar(false)}
              severity={auth.user ? 'success' : 'warning'}
              sx={{ width: '100%' }}
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
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
        <Box sx={{ p: 0 }}>
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
