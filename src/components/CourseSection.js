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
  ListItemIcon,
  MenuItem,
  Paper,
  Select,
  styled,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material'
import { ChevronRight, Check, BookmarkBorder } from '@mui/icons-material'

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
      {value === index && (
        <Box sx={{padding: '1em'}}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
  const [tabValue, setTabValue] = useState(0)
  const [downloadOption, setDownloadOption] = useState('')

  console.log('props.data:', props.data)

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
    setPlayingVideoId(videoId);
  };
  
  
  
  const description = props.data.description
  const creator = props.data.creator
  const creatorPhoto = extractImageUrl(props.data.creatorPhoto)
  const topic = props.data.category[0]
  const videoLinksArray = props.data.videoLinks.split(', ')
  
  const [playingVideoId, setPlayingVideoId] = React.useState(videoLinksArray[0]);
  
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container sx={{ padding: '0'}}>
        {/* Series name */}
        <Box sx={{ padding: '2em 2.5em'}}>
          <Typography variant="h1" textAlign="center">{props.data?.seriesName}</Typography>

          {/* Vimeo embed */}
          <Vimeo video={playingVideoId} responsive width="100vw" style={{paddingTop: '2em', borderRadius:'6px', overflow: 'hidden'}} />
        </Box>

        {/* About and Lesson tabs */}
        <AppBar position="static" elevation="0" sx={{ pl: '0', pr: '0'}}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            // indicatorColor="secondary"
            // textColor="inherit"
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
            {/* Artist information */}
            <Link href="/artist-page" color="inherit" underline="none" variant="profile">
              <Avatar
                alt={creator}
                src={creatorPhoto}
                sx={{ width: '48px', height: '48px' }}
              />
              <Box> 
                <Typography variant="bold" component="body1">{creator}</Typography>
                <Typography variant="subtitle1" color={theme.palette.text.secondary}>Creator Community</Typography>
              </Box>
              <ChevronRight />
            </Link>

            {/* Regular paragraph */}
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              {description}
            </Typography>

            {/* Three text boxes */}
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Item>{props.data.videos.length} Videos</Item>
              </Grid>
              <Grid xs={4}>
                <Item>{props.data.totalLength} minutes</Item>
              </Grid>
              <Grid xs={4}>
                <Item>Text Box 3</Item>
              </Grid>
            </Grid>

            {/* Start Creating Button */}
            <Button variant="contained" size="large" fullWidth>
              Start Creating
            </Button>

            {/* Add to Watchlist button */}
            <Button variant="text" startIcon={<BookmarkBorder />}>
              Add to Watchlist
            </Button>
            <FormControl sx={{ minWidth: 120, marginLeft: 2 }}>
              <InputLabel id="download-label">Download</InputLabel>
              <Select
                value={downloadOption}
                onChange={handleDownloadChange}
                labelId="download-label"
                color="primary"
              >
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
              </Select>
            </FormControl>

            {/* Topic List */}
            <Typography variant="h3" sx={{ marginTop: 2 }}>
              Topic
            </Typography>
            <List>
              <ListItem
                component="a"
                href="/artist-page"
                endIcon={<ChevronRight />}
              >
                <ListItemIcon>
                  <img
                    src="https://via.placeholder.com/50"
                    alt={topic}
                    style={{ borderRadius: '50%', backgroundColor: 'gray' }}
                  />
                </ListItemIcon>
                <ListItemText> {topic}</ListItemText>
                <ChevronRight />
              </ListItem>
            </List>

            {/* What You'll Learn List */}
            <Typography variant="h3" sx={{ marginTop: 2 }}>
              What you'll learn
            </Typography>
            <List>
              <ListItem>
                <Check />
                <ListItemText primary="Item 1" />
              </ListItem>
              <ListItem>
                <Check />
                <ListItemText primary="Item 2" />
              </ListItem>
            </List>

            {/* What You'll Need List*/}
            <Typography variant="h3" sx={{ marginTop: 2 }}>
              What you'll need
            </Typography>
            <List>
              <ListItem>
                <Check />
                <ListItemText primary="Item 1" />
              </ListItem>
              <ListItem>
                <Check />
                <ListItemText primary="Item 2" />
              </ListItem>
            </List>
          </TabPanel>

          <TabPanel value={tabValue} index={1} dir={theme.direction}>
            {/* List of Lesson content */}
            <Grid container spacing={2}>
              {videoLinksArray.map((videoLink, index) => (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        Lesson {index + 1}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <FormControl sx={{ minWidth: 120, marginLeft: 2 }}>
                        <InputLabel id="download-label">Download</InputLabel>
                        <Select
                          value={downloadOption}
                          onChange={handleDownloadChange}
                          labelId="download-label"
                        >
                          <MenuItem value="option1">Option 1</MenuItem>
                          <MenuItem value="option2">Option 2</MenuItem>
                          <MenuItem value="option3">Option 3</MenuItem>
                        </Select>
                      </FormControl>
                      <Button
                        onClick={() => handleStartButtonClick(videoLink)}
                        variant="contained"
                        color="primary"
                        size="large"
                      >
                        Start
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </SwipeableViews>
      </Container>
    </Section>
  )
}

export default CourseSection
