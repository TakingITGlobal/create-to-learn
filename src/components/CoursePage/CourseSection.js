import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import SwipeableViews from 'react-swipeable-views'
import { AppBar, Box, Tab, Tabs, Typography, useTheme } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Section from '../Section'
import CourseInfo from './CourseInfo'
import CourseLessons from './CourseLessons'
import { useAuth } from '../../util/auth'
import { useUserProgressByCourse } from '../../util/db'
import getByIdVimeo from '../../util/vimeo'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import ShareIcon from '@mui/icons-material/ShareRounded'
import ShareDrawer from '../ShareDrawer'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Typography>{children}</Typography>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

function CourseSection(props) {
  const theme = useTheme()
  const auth = useAuth()
  const { t } = useTranslation()

  const [tabValue, setTabValue] = useState(0)
  const [openSnackbar, setOpenSnackbar] = React.useState(false)
  const [snackbarMessage, setSnackbarMessage] = React.useState(
    'Login to add to your watchlist',
  )
  const [videoInfo, setVideoInfo] = React.useState([])
  const [openShareDrawer, setOpenShareDrawer] = useState(false)

  const palette = Object.values(theme.palette.accent)
  const [randomColor, setRandomColor] = useState(
    palette[Math.floor(Math.random() * palette.length)],
  )

  const { data: userProgressByCourse } = useUserProgressByCourse(
    auth.user?.uid,
    props.data.videos,
  )

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setTabValue(index)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  const videoLinks = props.data.videoLinks.split(',')
  const videoIds = videoLinks.length
    ? videoLinks.map((link) => {
        const videoId = link.match('([a-z0-9]+)(?:/?$)')
        return videoId && videoId[0]
      })
    : []

  const videoFormattedIds =
    videoIds && videoIds.map((id) => `/videos/${id}`).join(',')

  useEffect(() => {
    getByIdVimeo(videoFormattedIds).then((data) => setVideoInfo(data.data.data))
  }, [videoFormattedIds])

  return (
    <Section
      style={{
        backgroundColor: randomColor,
        backgroundImage:
          'linear-gradient(180deg, rgba(11, 9, 25, 0) 0%, rgba(11, 9, 25, 0.11) 200px, rgba(11, 9, 25, 0.64) 400px, #0B0919 600px)',
      }}
    >
      <Container sx={{ padding: '0' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
          <IconButton
            aria-label="close-icon"
            onClick={() => setOpenShareDrawer(true)}
          >
            <ShareIcon sx={{ color: 'white' }} />
          </IconButton>
        </Box>
        {/* Series name */}
        <Box sx={{ padding: '2em 2.5em' }}>
          <Typography variant="h1" textAlign="center" color="#000">
            {props.data?.seriesName}
          </Typography>

          <CardMedia
            component="img"
            alt={`${props.data.seriesName}-course`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              height: '200px',
              borderRadius: '6px',
              objectFit: 'cover',
            }}
            image={props.data.thumbnail[0]?.downloadURL}
          />
          {/* <Video video={playingVideoId} user={auth.user} /> */}
        </Box>

        {/* About and Lesson tabs */}
        <AppBar
          position="static"
          elevation="0"
          sx={{ pl: '0', pr: '0', background: 'transparent' }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            // aria-label="full width tabs example"
          >
            <Tab label="About" {...a11yProps(0)} />
            <Tab label="Lessons" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={tabValue}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={tabValue} index={0} dir={theme.direction}>
            <CourseInfo
              course={props.data}
              setSnackbarMessage={setSnackbarMessage}
              setOpenSnackbar={setOpenSnackbar}
              setTabValue={setTabValue}
              videoInfo={videoInfo}
              courseProgress={userProgressByCourse}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={1} dir={theme.direction}>
            <CourseLessons
              videoInfo={videoInfo}
              videoIds={props.data.videos}
              courseId={props.data.id}
              courseProgress={userProgressByCourse}
            />
          </TabPanel>
        </SwipeableViews>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleCloseSnackbar}
            severity={auth.user ? 'success' : 'warning'}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
        <ShareDrawer
          url={`https://create-to-learn.netlify.app/course/${props.data.uid}`}
          title={`Share the ${props.data.seriesName} course page`}
          openShareDrawer={openShareDrawer}
          setOpenShareDrawer={setOpenShareDrawer}
        />
      </Container>
    </Section>
  )
}

export default CourseSection
