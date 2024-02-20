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
import { useUserProgressByCourse, useDownloadsById, useVideosByCourseId, getVideosByIds } from '../../util/db'
import getByIdVimeo from '../../util/vimeo'
import IconButton from '@mui/material/IconButton'
import ShareIcon from '@mui/icons-material/ShareRounded'
import ShareDrawer from '../ShareDrawer'
import { useTranslation } from 'react-i18next'
import CourseCreatingButtons from './CourseCreatingButtons'
import { PageHeading } from 'components/PageHeading'

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

function CourseSection({ courseData }) {
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

  const {
    seriesName,
    creator,
    description,
    thumbnail,
    videos,
    id,
    uid,
    videoLinks,
  } = courseData

  const { data: userProgressByCourse } = useUserProgressByCourse(
    auth.user?.uid,
    videos,
  )
  

  const { data: downloadsData } = useDownloadsById(auth.user?.uid, id);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

 

  const courseImage = thumbnail[0]?.downloadURL

  useEffect(() => {
    async function fetchData(){

      const videosData = await getVideosByIds(videos.map(item => Number(item)));

      const videoIds = videosData.map(video => {
        const vId = video.ourVimeoUrl.match('([a-z0-9]+)(?:/?$)')
        return vId && vId[0]
      });

      const videoFormattedIds =
        videoIds && videoIds.map((id) => `/videos/${id}`).join(',');

      getByIdVimeo(videoFormattedIds)
      .then((data) => {
        const pulledData = data.data.data;

        const combinedData = videosData.map(x => {
          const newItem = pulledData.find(y => y.link === x.ourVimeoUrl);
          return {
            ...x,
            ...newItem
          };
        }).sort((a, b) => {
          if (a.series < b.series) return -1;
          if (a.series > b.series) return 1;
          return 0;
        });
        
        setVideoInfo(combinedData);
      });

    }
    fetchData();
  },[]);


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
          paddingTop: '10px',
          paddingBottom: { xs: '120px', md: '80px' },
          maxWidth: { xs: '100%', md: '850px' },
        }}
      >
          <PageHeading
            headingText={seriesName}
            color="black"
          >
          <IconButton
            aria-label="share course"
            onClick={() => setOpenShareDrawer(true)}
          >
            <ShareIcon sx={{ color: 'white' }} />
          </IconButton>
          </PageHeading>
        {/* Series name */}
        <Box sx={{ padding: '0 2.5em 2em' }}>

          <CardMedia
            component="img"
            alt={seriesName}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              borderRadius: '6px',
              objectFit: 'cover',
            }}
            image={courseImage}
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
              videoIds={videos}
              courseId={id}
              courseUID={uid}
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
          url={`https://app.createtolearn.ca/tutorial/${uid}`}
          title={`Share the ${seriesName} course page`}
          openShareDrawer={openShareDrawer}
          setOpenShareDrawer={setOpenShareDrawer}
        />
      </Container>
      {tabValue === 0 && (
        <CourseCreatingButtons
          courseData={courseData}
          videoProgress={userProgressByCourse}
          tabValue={tabValue}
          setTabValue={setTabValue}
        />
      )}
    </Section>
  )
}

export default CourseSection
