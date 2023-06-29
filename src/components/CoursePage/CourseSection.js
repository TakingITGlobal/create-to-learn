import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import SwipeableViews from 'react-swipeable-views'
import {
  AppBar,
  Box,
  Tab,
  Tabs,
  Typography,
  useTheme,
  Grid,
  Stack,
  Button,
} from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import Section from '../Section'
import CourseInfo from './CourseInfo'
import CourseLessons from './CourseLessons'
import { useAuth } from '../../util/auth'
import { useUserProgressByCourse, useDownloadsById } from '../../util/db'
import getByIdVimeo from '../../util/vimeo'
import { useTranslation } from 'react-i18next'
import IconButton from '@mui/material/IconButton'
import ShareIcon from '@mui/icons-material/ShareRounded'
import ShareDrawer from '../ShareDrawer'
import LinearProgress from '@mui/material/LinearProgress'
import { displayTime } from '../../util/timeHelpers'
import CheckSimpleIcon from '@mui/icons-material/Check'

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

function CourseSection({ data, courseData, courseProgress }) {
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
    courseData.videos,
  )

  const { data: downloadsData } = useDownloadsById(
    auth.user?.uid,
    courseData.id,
  )

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  const videoLinks = courseData?.videoLinks?.split(',')
  const videoIds = videoLinks?.length
    ? videoLinks.map((link) => {
        const videoId = link.match('([a-z0-9]+)(?:/?$)')
        return videoId && videoId[0]
      })
    : []

  const videoFormattedIds =
    videoIds && videoIds.map((id) => `/videos/${id}`).join(',')

  useEffect(() => {
    //ToDo: eeek fix data.data.data
    getByIdVimeo(videoFormattedIds).then((data) => setVideoInfo(data.data.data))
  }, [videoFormattedIds])

  const inProgressVideos = userProgressByCourse
    ? userProgressByCourse.filter((video) => video?.progress > 0)
    : []

  const totalTimeWatched =
    inProgressVideos.length > 1
      ? inProgressVideos
          .map(({ progress }) => progress)
          .reduce((acc, curr) => acc + curr)
      : inProgressVideos.length === 1
      ? inProgressVideos[0].progress
      : 0

  //Check if this should be turned into hrs:minutes:seconds
  const timeLeft = courseData.totalLength - totalTimeWatched

  const percentProgress = (totalTimeWatched / courseData.totalLength) * 100

  return (
    <Section
      style={{
        backgroundColor: randomColor,
        backgroundImage:
          'linear-gradient(180deg, rgba(11, 9, 25, 0) 0%, rgba(11, 9, 25, 0.11) 200px, rgba(11, 9, 25, 0.64) 400px, #0B0919 600px)',
      }}
    >
      <Container
        sx={{
          padding: '0',
          paddingBottom: { xs: '120px', md: '80px' },
          maxWidth: { xs: '100%', md: '850px' },
        }}
      >
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
          <Typography
            variant="h1"
            textAlign="center"
            color="#000"
            sx={{ paddingBottom: { md: '20px' }, fontSize: { md: '2.75em' } }}
          >
            {courseData?.seriesName}
          </Typography>

          <CardMedia
            component="img"
            alt={`${courseData.seriesName}-course`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              borderRadius: '6px',
              objectFit: 'cover',
            }}
            image={courseData.thumbnail[0]?.downloadURL}
          />
        </Box>

        {/* About and Lesson tabs */}
        <AppBar
          position="static"
          elevation="0"
          sx={{ pl: '0', pr: '0', background: 'transparent' }}
        >
          <Tabs
            value={tabValue}
            onChange={(e, index) => setTabValue(index)}
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
          onChangeIndex={(index) => setTabValue(index)}
        >
          <TabPanel value={tabValue} index={0} dir={theme.direction}>
            <CourseInfo
              course={courseData}
              setSnackbarMessage={setSnackbarMessage}
              setOpenSnackbar={setOpenSnackbar}
              setTabValue={setTabValue}
              videoInfo={videoInfo}
              courseProgress={userProgressByCourse}
              downloadsData={downloadsData}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1} dir={theme.direction}>
            <CourseLessons
              videoInfo={videoInfo}
              videoIds={courseData.videos}
              courseId={courseData.id}
              courseUID={courseData.uid}
              courseProgress={userProgressByCourse}
              downloadsData={downloadsData}
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
          url={`https://create-to-learn.netlify.app/course/${courseData.uid}`}
          title={`Share the ${courseData.seriesName} course page`}
          openShareDrawer={openShareDrawer}
          setOpenShareDrawer={setOpenShareDrawer}
        />
      </Container>
      {/* Start Creating Button */}
      {inProgressVideos.length ? (
        <Grid
          container
          sx={{
            position: { xs: 'fixed', md: 'relative' },
            bottom: { xs: '78px', md: '20px' },
            left: '0',
            right: '0',
            padding: '10px 15px 5px 15px',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'black',
          }}
        >
          <Grid xs={8}>
            {timeLeft > 0.5 ? (
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <LinearProgress
                  color="primary"
                  variant="determinate"
                  value={percentProgress}
                  sx={{ width: '120px' }}
                />
                <Typography>{displayTime(timeLeft)} left </Typography>
              </Stack>
            ) : (
              <Stack direction="row" spacing={1}>
                <CheckSimpleIcon
                  sx={{
                    backgroundColor: 'inherit !important',
                    color: '#fff !important',
                  }}
                />

                <Typography sx={{ display: 'inline-block' }}>
                  {t('course.finished')}
                </Typography>
              </Stack>
            )}
          </Grid>
          <Grid xs={4}>
            <Button
              fullWidth
              onClick={() => setTabValue(1)}
              sx={{
                backgroundColor: 'white !important',
                color: 'black',
                borderRadius: '25px',
              }}
            >
              {t('btn.continue')}
            </Button>
          </Grid>
        </Grid>
      ) : (
        tabValue === 0 && (
          <Box
            sx={{
              position: { xs: 'fixed', md: 'relative' },
              bottom: { xs: '78px', md: '20px' },
              left: '0',
              right: '0',
              padding: '10px 15px 5px 15px',
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: 'black',
            }}
          >
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{
                maxWidth: '800px',
              }}
              onClick={() => setTabValue(1)}
            >
              {t('course.start-creating')}
            </Button>
          </Box>
        )
      )}
    </Section>
  )
}

export default CourseSection
