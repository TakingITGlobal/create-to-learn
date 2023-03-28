import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Section from './Section'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

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
          <Box sx={{ paddingBottom: '7px' }}>
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
              <IconButton onClick={() => setShowSearchBar(!showSearchBar)} size="large">
                {showSearchBar ? (
                  <CloseIcon fontSize="large" />
                ) : (
                  <SearchIcon fontSize="large" />
                )}
              </IconButton>
            </Box>
          </Box>

          {isLoading || !categories.length ? (
            <CircularProgress color="primary" />
          ) : (
            <BrowseTabs categories={categories} />
          )}
        </Container>
      </Box>
    </Section>
  );
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
            <CircularProgress color="primary" />
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
            <CircularProgress color="primary" />
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
      <Paper sx={{ padding: '2.5px', height: '200px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '200px',
            overflow: 'hidden',
          }}
        >
          <img
            src={course.thumbnail[0]?.downloadURL}
            loading="lazy"
            style={{
              top: 0,
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Box sx={{ padding: '10px' }}>
          <Box>
            <Typography variant="h6">{course.seriesName} </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: '5px',
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
              href={course.uid}
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
      <Paper sx={{ padding: '2.5px', height: '200px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '200px',
            overflow: 'hidden',
          }}
        >
          <Box
            src=""
            component="img"
            alt=""
            loading="lazy"
            height="200px"
            style={{
              top: 0,
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}>
          </Box>
        </Box>
        <Box sx={{ padding: '10px' }}>
          <Box>
            <Typography variant="h6">{creator.name} </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: '5px',
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
