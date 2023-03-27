import React from 'react'
import SwipeableViews from 'react-swipeable-views';
import Container from '@material-ui/core/Container'
import Section from './Section'
import Vimeo from '@u-wave/react-vimeo'
import {
  AppBar,
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Select,
  MenuItem,
  useTheme,
} from '@mui/material'
import { ChevronRight, Check, BookmarkBorder } from '@material-ui/icons'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function CourseSection(props) {
  const theme = useTheme();
  const [tabValue, setTabValue] = React.useState(0)
  const [downloadOption, setDownloadOption] = React.useState('')

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setTabValue(index);
  }
 
  const handleDownloadChange = (event) => {
    setDownloadOption(event.target.value)
  }


  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        {/* Series name */}
        <h1>{props.data?.seriesName}</h1>

        {/* Vimeo embed */}
        <Vimeo video="https://vimeo.com/76979871" width="100%" />

        {/* About and Lesson tabs */}
        <AppBar position="static" color="default">
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
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
            <List>
              <ListItem button component="a" href="/artist-page">
                <ListItemIcon>
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Placeholder"
                    style={{ borderRadius: '50%', backgroundColor: 'gray' }}
                  />
                </ListItemIcon>
                <ListItemText primary="Artist - Name | Title" />
                <ChevronRight />
              </ListItem>
            </List>

            {/* Regular paragraph */}
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Lorem ipsum dolor sit amet, consectetur adip non pro id el
            </Typography>

            {/* Three text boxes */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: 2,
              }}
            >
              <Typography variant="body2"> Text Box 1</Typography>
              <Typography variant="body2"> Text Box 2</Typography>
              <Typography variant="body2"> Text Box 3</Typography>
            </Box>

            {/* Start Creating Button */}
            <Button variant="contained" size="large" fullWidth>
              Start Creating
            </Button>

            {/* Add to Watchlist button */}
            <Button variant="text" startIcon={<BookmarkBorder />}>
              Add to Watchlist
            </Button>
            <Select
              value={downloadOption}
              onChange={handleDownloadChange}
              displayEmpty
              sx={{ minWidth: 120, marginLeft: 2 }}
            >
              <MenuItem value="Download">
                Download
              </MenuItem>
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
            </Select>

            {/* Topic List */}
            <Typography variant="h3" sx={{ marginTop: 2 }}>
              Topic
            </Typography>
            <List>
              <ListItem
                button
                component="a"
                href="/artist-page"
                endIcon={<ChevronRight />}
              >
                <ListItemIcon>
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Placeholder"
                    style={{ borderRadius: '50%', backgroundColor: 'gray' }}
                  />
                </ListItemIcon>
                <ListItemText> Topic</ListItemText>
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
            This is the Lesson tab content.
          </TabPanel>
        </SwipeableViews>
      </Container>
    </Section>
  )
}

export default CourseSection
