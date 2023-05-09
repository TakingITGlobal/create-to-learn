import React, { useState } from 'react'
import Container from '@mui/material/Container'
import SwipeableViews from 'react-swipeable-views'
import Section from './Section'
import Vimeo from '@u-wave/react-vimeo'
import {
  Avatar,
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  FormControl,
  Grid,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  styled,
  Tab,
  Tabs,
  Typography,
  Stack,
  useTheme,
} from '@mui/material'
import { ChevronRight, Check, BookmarkBorder } from '@mui/icons-material'
import { useAuth } from '../util/auth'

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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setTabValue(index)
  }

  const handleDownloadChange = (event) => {
    setDownloadOption(event.target.value)
  }

  const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // ...theme.typography.body2,
    // padding: theme.spacing(1),
    // textAlign: 'center',
    // color: theme.palette.text.secondary,
  }))

  function extractImageUrl(imageString) {
    const urlRegex = /https?:\/\/[^)]+/
    const match = imageString.match(urlRegex)
    return match ? match[0] : ''
  }

  const handleStartButtonClick = (videoId) => {
    setPlayingVideoId(videoId)
  }

  const description = props.data.description
  const creator = props.data.creator
  const creatorUID = creator.trim().replaceAll(' ', '-').toLowerCase()
  const creatorPhoto = extractImageUrl(props.data.creatorPhoto)
  const topic = props.data.category[0]
  const videoLinksArray = props.data.videoLinks.split(', ')

  const [playingVideoId, setPlayingVideoId] = React.useState(videoLinksArray[0])

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

          {/* Vimeo embed */}
          <Vimeo
            video={playingVideoId}
            id={props.data?.videos[0]}
            user={auth.user}
            responsive
            width="100vw"
            style={{
              paddingTop: '2em',
              borderRadius: '6px',
              overflow: 'hidden',
            }}
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
                  src={creatorPhoto}
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

              {/* Metrics */}
              <Stack direction="row" spacing={1} variant="squareCard" mb="15px">
                <Item elevation="1">{props.data.videos.length} Videos</Item>
                <Item elevation="1">{props.data.totalLength} minutes</Item>
                <Item elevation="1">Difficulty</Item>
              </Stack>

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
                <Button variant="text" startIcon={<BookmarkBorder />}>
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
            {/* List of Lesson content */}
            <List variant="progress">
              {videoLinksArray.map((videoLink, index) => (
                <ListItem>
                  <Paper elevation="1">
                    <Typography variant="bold">Lesson {index + 1}</Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ paddingLeft: '20px' }}
                    >
                      <Link
                        flex="1"
                        href={videoLink}
                        underline="none"
                        sx={{ fontSize: '1rem' }}
                      >
                        Download
                      </Link>
                      <Button
                        onClick={() => handleStartButtonClick(videoLink)}
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ flex: '1' }}
                      >
                        Start
                      </Button>
                    </Stack>
                  </Paper>
                </ListItem>
              ))}
            </List>
          </TabPanel>
        </SwipeableViews>
      </Container>
    </Section>
  )
}

export default CourseSection
