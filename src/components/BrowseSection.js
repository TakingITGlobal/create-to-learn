import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Section from './Section'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'

import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Chip from '@material-ui/core/Chip'
import Stack from '@mui/material/Stack'

import { useCourses, useCreatorsAll, useCategories } from '../util/db'
import { useTranslation } from 'react-i18next'

function BrowseSection(props) {
  const [showSearchBar, setShowSearchBar] = useState(false)

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Box mt={2}>
        <Container>
          <Box sx={{ paddingBottom: 7 }}>
            <Typography variant="h4">Browse</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'inline-block',
                visibility: showSearchBar ? 'visible' : 'hidden',
                width: '100%',
              }}
            >
              <SearchBar />
            </Box>
            <Box
              sx={{
                display: 'inline-block',
                justifyContent: 'flex-end',
              }}
            >
              <IconButton onClick={() => setShowSearchBar(!showSearchBar)}>
                {showSearchBar ? (
                  <CloseIcon fontSize="large" />
                ) : (
                  <SearchIcon fontSize="large" />
                )}
              </IconButton>
            </Box>
          </Box>

          <BasicTabs />
        </Container>
      </Box>
    </Section>
  )
}

export default BrowseSection

function SearchBar({ setSearchQuery }) {
  const { t } = useTranslation()

  return (
    <OutlinedInput
      id="search-bar"
      onInput={(e) => {
        setSearchQuery(e.target.value)
      }}
      variant="outlined"
      placeholder={t('browse.search-by')}
      size="small"
      fullWidth
      endAdornment={
        <InputAdornment position="end">
          <SearchIcon color="primary" fontSize="medium" />
        </InputAdornment>
      }
      inputProps={{
        style: { color: 'white' },
      }}
    />
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function BasicTabs() {
  const [value, setValue] = React.useState(0)
  const [courses, setCourses] = useState([])
  const [creators, setCreators] = useState([])
  const [categories, setCategories] = useState([])
  const [openDrawer, setOpenDrawer] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState([])

  const { t } = useTranslation()
  const { data: dataCourses } = useCourses()
  const { data: dataCreators } = useCreatorsAll()
  const { data: dataCategories } = useCategories()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (dataCourses && dataCourses.length) {
      setCourses(dataCourses)
    }
    if (dataCreators && dataCreators.length) {
      setCreators(dataCreators)
    }
    if (dataCategories && dataCategories.length) {
      setCategories(dataCategories)
    }
  }, [dataCourses, dataCreators, dataCategories])

  const toggleDrawer = (event, open) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setOpenDrawer(open)
  }

  const handleCategoryFilterArr = (category) => {
    const catIndex = categoryFilter.indexOf(category)
    if (catIndex !== -1) {
      setCategoryFilter(categoryFilter.filter((item) => item !== category))
    } else {
      setCategoryFilter([...categoryFilter, category])
    }
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={t('courses')}
              {...a11yProps(0)}
              sx={{ color: 'white' }}
            />
            <Tab
              label={t('creators')}
              {...a11yProps(1)}
              sx={{ color: 'white' }}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Button variant="outlined" onClick={() => setOpenDrawer(true)}>
            Show all filters
          </Button>
          <Box>
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Button variant="outlined">Show all filters</Button>
          <Box>
            {creators.map((creator, index) => (
              <CreatorCard key={index} creator={creator} />
            ))}
          </Box>
        </TabPanel>
      </Box>
      <SwipeableDrawer
        anchor="right"
        open={openDrawer}
        onOpen={(event) => toggleDrawer(event, true)}
        onClose={(event) => toggleDrawer(event, false)}
      >
        <Box
          mt={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            padding: '10px',
          }}
        >
          <Box mt={2}>
            <Typography variant="h5">Filters</Typography>
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Featured
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip label="Featured" clickable variant="outlined" />
              <Chip label="New" clickable variant="outlined" />
            </Stack>
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Duration
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              <Chip
                label="Less than 20 min"
                variant="outlined"
                clickable
                style={{ marginLeft: 0 }}
              />
              <Chip
                label="20-45 min"
                clickable
                variant="outlined"
                style={{ marginLeft: 0 }}
              />
              <Chip
                label="45 min - 1 hour"
                variant="outlined"
                clickable
                style={{ marginLeft: 0 }}
              />
              <Chip
                label="More than 1 hour"
                variant="outlined"
                clickable
                style={{ marginLeft: 0 }}
              />
            </Stack>
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Categories
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              {categories.map((category, index) => (
                <Chip
                  key={index}
                  label={category.name}
                  clickable
                  onClick={() => handleCategoryFilterArr(category.name)}
                  style={{ marginLeft: 0 }}
                  variant={
                    categoryFilter.includes(category.name)
                      ? 'default'
                      : 'outlined'
                  }
                />
              ))}
            </Stack>
          </Box>
          <Box sx={{ padding: '30px' }}>
            <Button fullWidth variant="outlined">
              Apply Filters
            </Button>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  )
}

function CourseCard({ course }) {
  return (
    <Box sx={{ padding: '10px 0' }}>
      <Paper sx={{ padding: 2.5, height: '200px' }}>
        <Box sx={{ padding: 10 }}>
          <Box>
            <Typography variant="h6">{course.seriesName} </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 5,
            }}
          >
            <>
              <Typography>{course.creator}</Typography>
              <Typography>
                {course.videos && course.videos.length}{' '}
                {course.videos.length == 1 ? 'Video' : 'Videos'}
              </Typography>
            </>
          </Box>
          <Box>
            <Button
              color="primary"
              fullWidth
              variant="contained"
              href={course.webUrl}
            >
              Go to course page
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

function CreatorCard({ creator }) {
  return (
    <Box sx={{ padding: '10px 0' }}>
      <Paper sx={{ padding: 2.5, height: '200px' }}>
        <Box sx={{ padding: 10 }}>
          <Box>
            <Typography variant="h6">{creator.name} </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: 5,
            }}
          >
            <>
              <Typography>{creator.seriesName}</Typography>
              <Typography>
                {creator.videos} {creator.videos == 1 ? 'Video' : 'Videos'}
              </Typography>
            </>
          </Box>
          <Box>
            <Button color="primary" fullWidth variant="contained">
              Go to course page
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
