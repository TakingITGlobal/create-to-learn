import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Section from './Section'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Chip from '@material-ui/core/Chip'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import { useCreatorsAll, useCategories, useCoursePerCategory } from '../util/db'
import { useTranslation } from 'react-i18next'

function BrowseSection(props) {
  const { t } = useTranslation()
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [categories, setCategories] = useState([])
  const { isLoading, data: dataCategories } = useCategories()

  useEffect(() => {
    if (!isLoading) {
      setCategories(dataCategories.map(({ name }) => name))
    }
  }, [dataCategories])

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

          {isLoading || !categories.length ? (
            <CircularProgress />
          ) : (
            <BrowseTabs categories={categories} />
          )}
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

function BrowseTabs({ categories }) {
  const { t } = useTranslation()
  const [value, setValue] = React.useState(0)
  const [courses, setCourses] = useState([])
  const [creators, setCreators] = useState([])
  const [openDrawer, setOpenDrawer] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState([])
  const [durationFilter, setDurationFilter] = useState([])
  const [allCourses, setAllCourses] = useState([])
  const { isLoading: loadingCreators, data: dataCreators } = useCreatorsAll()
  const { isLoading: loadingCourses, data: dataCourses } =
    useCoursePerCategory(categories)

  const handleChangeTab = (event, newTab) => {
    setValue(newTab)
  }

  useEffect(() => {
    if (!loadingCourses) {
      setAllCourses(dataCourses)
    }
    if (!loadingCourses) {
      setCourses(dataCourses)
    }
    if (dataCreators && dataCreators.length) {
      setCreators(dataCreators)
    }
  }, [dataCourses, dataCreators])

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

  useEffect(() => {
    //Use filters if some have been chosen. Otherwise, assume all filters are chosen.
    const categoriesToFilter = categoryFilter.length
      ? categoryFilter
      : categories
    const durationsToFilter = durationFilter.length ? durationFilter : durations

    const filteredCourses = allCourses.filter(
      (course) =>
        course.category.some((cat) => categoriesToFilter.includes(cat)) &&
        durationsToFilter.some(
          (duration) =>
            course.totalLength >= duration.lowerValue &&
            course.totalLength < duration.upperValue,
        ),
    )
    setCourses(filteredCourses)
  }, [categoryFilter, durationFilter])

  const durations = [
    {
      id: 'less-20',
      label: 'Less than 20 min',
      lowerValue: 0,
      upperValue: 20 * 60,
    },
    {
      id: '20-45',
      label: '20-45 min',
      lowerValue: 20 * 60,
      upperValue: 45 * 60,
    },
    {
      id: '45-60',
      label: ' 45 min to 1 hour',
      lowerValue: 45 * 60,
      upperValue: 60 * 60,
    },
    {
      id: 'more-60',
      label: 'More than 1 hour',
      lowerValue: 60 * 60,
      upperValue: 100000,
    },
  ]

  const handleDurationFilterArr = (duration) => {
    const isInFilter = durationFilter.some((dur) => dur.id === duration.id)
    if (isInFilter) {
      setDurationFilter(
        durationFilter.filter((item) => item.id !== duration.id),
      )
    } else {
      setDurationFilter([...durationFilter, duration])
    }
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            textColor="secondary"
            indicatorColor="secondary" 
            onChange={handleChangeTab}
            aria-label="browse tabs"
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
          {loadingCourses ? (
            <CircularProgress />
          ) : (
            <>
              <Button variant="outlined" onClick={() => setOpenDrawer(true)}>
                {t('browse.show-filters')}
              </Button>

              <Box>
                {courses.map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))}
              </Box>
            </>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {loadingCreators ? (
            <CircularProgress />
          ) : (
            <>
              <Button variant="outlined">Show all filters</Button>
              <Box>
                {creators.map((creator, index) => (
                  <CreatorCard key={index} creator={creator} />
                ))}
              </Box>
            </>
          )}
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
              {t('featured')}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip label="Featured" clickable variant="outlined" />
              <Chip label="New" clickable variant="outlined" />
            </Stack>
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {t('duration')}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              {durations.map((duration, index) => (
                <Chip
                  key={index}
                  label={duration.label}
                  clickable
                  style={{ marginLeft: 0 }}
                  onClick={() => handleDurationFilterArr(duration)}
                  variant={
                    durationFilter.some((dur) => dur.id === duration.id)
                      ? 'default'
                      : 'outlined'
                  }
                />
              ))}
            </Stack>
          </Box>
          <Box mt={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {t('topics')}
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
                  label={category}
                  clickable
                  onClick={() => handleCategoryFilterArr(category)}
                  style={{ marginLeft: 0 }}
                  variant={
                    categoryFilter.includes(category) ? 'default' : 'outlined'
                  }
                />
              ))}
            </Stack>
          </Box>
          <Stack direction="row" spacing={1} sx={{ paddingTop: '60px' }}>
            <Button
              variant="outlined"
              onClick={() => {
                setCategoryFilter([])
                setDurationFilter([])
                setCourses(allCourses)
              }}
            >
              {t('browse.clear-filters')}
            </Button>
            <Button
              variant="outlined"
              endIcon={<ChevronRightIcon />}
              onClick={() => setOpenDrawer(false)}
            >
              {t('close')}
            </Button>
          </Stack>
        </Box>
      </SwipeableDrawer>
    </>
  )
}

function CourseCard({ course }) {
  const { t } = useTranslation()

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
                {course.videos.length == 1 ? t('video') : t('videos')}
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
  const { t } = useTranslation()
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
                {creator.videos == 1 ? t('video') : t('videos')}
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
