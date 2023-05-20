import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import SwipeableViews from 'react-swipeable-views'
import Section from './Section'
import {
  Avatar,
  AppBar,
  Box,
  Button,
  FormControl,
  Link,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
  Stack,
  useTheme,
} from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import CourseStats from './CourseStats'
import CourseLessons from './CourseLessons'
import { ChevronRight, Check, BookmarkBorder } from '@mui/icons-material'
import { useAuth } from '../util/auth'
import { createWatchlistCourse, useWatchlistById } from '../util/db'
import GetByIdVimeo from '../util/vimeo'

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
  const [tabValue, setTabValue] = useState(0)
  const [downloadOption, setDownloadOption] = useState('')
  const palette = Object.values(theme.palette.accent)
  const [randomColor, setRandomColor] = useState(
    palette[Math.floor(Math.random() * palette.length)],
  )

  const { data, status, error } = useWatchlistById(
    auth.user?.uid,
    props.data.id,
  )

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setTabValue(index)
  }

  const handleDownloadChange = (event) => {
    setDownloadOption(event.target.value)
  }

  const description = props.data.description
  const creator = props.data.creator
  const creatorUID = creator.trim().replaceAll(' ', '-').toLowerCase()
  const topic = props.data.category[0]
  const [openSnackbar, setOpenSnackbar] = React.useState(false)
  const [snackbarMessage, setSnackbarMessage] = React.useState(
    'Login to add to your watchlist',
  )
  const [videoInfo, setVideoInfo] = React.useState([])

  const handleAddToWatchlist = () => {
    if (!auth.user) {
      return
    } else {
      setOpenSnackbar(true)
      if (!data?.length) {
        createWatchlistCourse({
          owner: auth.user.uid,
          courseId: props.data.id,
          courseUID: props.data.uid,
        }).then(setSnackbarMessage('Success!  Added to your watchlist'))
      } else {
        setSnackbarMessage('Already in watchlist.')
      }
    }
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
        return videoId[0]
      })
    : []

  const videoFormattedIds = videoIds.map((id) => `/videos/${id}`).join(',')

  useEffect(() => {
    GetByIdVimeo(videoFormattedIds).then((data) => setVideoInfo(data.data.data))
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
            <Box sx={{ padding: '1em' }}>
              {/* Artist information */}
              <Link
                href={'/creator/' + creatorUID}
                color="inherit"
                underline="none"
                variant="profile"
              >
                <Avatar
                  alt={creator}
                  src={props.data?.thumbnail[0]?.downloadURL}
                  sx={{ width: '48px', height: '48px' }}
                />
                <Box>
                  <Typography variant="bold" component="body1">
                    {creator}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color={theme.palette.text.secondary}
                  >
                    Creator Community
                  </Typography>
                </Box>
                <ChevronRight />
              </Link>

              {/* Regular paragraph */}
              <Typography
                variant="body2"
                color={theme.palette.text.secondary}
                sx={{ marginBottom: 2 }}
              >
                {description}
              </Typography>
              <CourseStats
                numberOfVideos={props.data.videos.length}
                courseLength={props.data.totalLength}
                difficultyLevel={props.data.difficultyLevel}
              />

              {/* Start Creating Button */}
              <Button variant="contained" size="large" fullWidth>
                Start Creating
              </Button>

              {/* Add to Watchlist button */}
              <Stack
                direction="row"
                spacing={1}
                mb="15px"
                mt="20px"
                alignItems="center"
              >
                <Button
                  variant="text"
                  startIcon={<BookmarkBorder />}
                  onClick={() => handleAddToWatchlist()}
                >
                  Add to Watchlist
                </Button>
                <FormControl sx={{ minWidth: 120, marginLeft: 2 }}>
                  {/* <InputLabel id="download-label" sx={{ padding: '0',  fontWeight: '700'}} variant="standard">Download</InputLabel> */}
                  <Select
                    value={downloadOption}
                    onChange={handleDownloadChange}
                    labelId="download-label"
                    displayEmpty
                    variant="standard"
                    color={theme.palette.text.main}
                    sx={{ padding: '0', border: '0' }}
                  >
                    <MenuItem value="" sx={{ fontWeight: '700' }}>
                      <em>Download</em>
                    </MenuItem>
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                    <MenuItem value="option3">Option 3</MenuItem>
                  </Select>
                </FormControl>
              </Stack>

              {/* Topic List */}
              <Typography variant="bold" sx={{ mT: 2 }}>
                Topic
              </Typography>
              <List>
                <ListItem
                  component="a"
                  href="/artist-page"
                  sx={{ color: '#fff' }}
                >
                  <img
                    src="https://via.placeholder.com/50"
                    alt={topic}
                    style={{
                      maxWidth: '30px',
                      height: 'auto',
                      marginRight: '10px',
                    }}
                  />
                  {topic}
                </ListItem>
              </List>

              {/* What You'll Learn List */}
              <Typography variant="bold" sx={{ marginTop: 2 }}>
                What you'll learn
              </Typography>
              <List variant="icon-list">
                <ListItem>
                  <Check />
                  <ListItemText disableTypography primary="Item 1" />
                </ListItem>
                <ListItem>
                  <Check />
                  <ListItemText disableTypography primary="Item 2" />
                </ListItem>
              </List>

              {/* What You'll Need List*/}
              <Typography variant="bold" sx={{ marginTop: 2 }}>
                What you'll need
              </Typography>
              <List variant="icon-list">
                <ListItem>
                  <Check />
                  <ListItemText disableTypography primary="Item 1" />
                </ListItem>
                <ListItem>
                  <Check />
                  <ListItemText disableTypography primary="Item 2" />
                </ListItem>
              </List>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1} dir={theme.direction}>
            <CourseLessons videoInfo={videoInfo} videos={props.data.videos} />
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
            severity="success"
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Container>
    </Section>
  )
}

export default CourseSection
