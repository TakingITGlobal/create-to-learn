import React, { useState, useContext } from 'react'
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import BrowseCourseCard from './BrowseCourseCard'
import BrowseCreatorCard from './BrowseCreatorCard'
import BrowseDrawer from './BrowseDrawer'
import BrowseCourseDrawerContent from './BrowseCourseDrawerContent'
import BrowseFilterEmptyState from './BrowseFilterEmptyState'
import FilterListSharpIcon from '@mui/icons-material/FilterListSharp'

import { useTranslation } from 'react-i18next'
import { dataContext } from '../util/dataProvider'
import { useCoursesFilter } from '../hooks/useCoursesFilter'
import { useCreatorsFilter } from '../hooks/useCreatorsFilter'
import useClasses from '../hooks/useClasses'
import { durations } from '../assets/options/filters'

const styles = (theme) => ({
  filterButton: {
    backgroundColor: 'white',
    borderRadius: '48px !important',
    textTransform: 'capitalize !important',
    color: 'black',
  },
  clearButton: {
    backgroundColor: 'black',
    borderRadius: '48px !important',
    textTransform: 'capitalize !important',
    color: 'white',
  },
})

const BrowseTabs = ({
  durationFilter,
  setDurationFilter,
  culturalGroupFilter,
  setCulturalGroupFilter,
  categoryFilter,
  setCategoryFilter,
}) => {
  const { t } = useTranslation()
  const classes = useClasses(styles)

  const [tabIndex, setTabIndex] = useState(0)
  const [openDrawer, setOpenDrawer] = useState(false)

  const { allCourses, allCreators, loadingCourses, loadingCreators } =
    useContext(dataContext)

  const { data: filteredCourses } = useCoursesFilter({
    allCourses,
    allCreators,
    culturalGroupFilter,
    categoryFilter,
    durationFilter,
  })

  const { data: filteredCreators } = useCreatorsFilter({
    allCreators,
    allCourses,
    culturalGroupFilter,
    categoryFilter,
  })

  const handleChangeTab = (event, newTab) => {
    setTabIndex(newTab)
  }

  const handleDurationFilter = (duration) => {
    const isInFilter = durationFilter.some((dur) => dur.id === duration.id)
    if (isInFilter) {
      setDurationFilter(
        durationFilter.filter((item) => item.id !== duration.id),
      )
    } else {
      setDurationFilter([...durationFilter, duration])
    }
  }

  const handleCulturalGroupFilterArr = (group) => {
    if (culturalGroupFilter.includes(group)) {
      setCulturalGroupFilter(
        culturalGroupFilter.filter((item) => item !== group),
      )
    } else {
      setCulturalGroupFilter([...culturalGroupFilter, group])
    }
  }

  const handleClearFilter = () => {
    setCategoryFilter('All')
    setDurationFilter([])
    setCulturalGroupFilter([])
  }

  const numberOfFilters = durationFilter.length + culturalGroupFilter.length

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabIndex}
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
        <TabPanel tabIndex={tabIndex} index={0}>
          {loadingCourses ? (
            <CircularProgress color="primary" />
          ) : (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: '20px',
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => setOpenDrawer(true)}
                  className={classes.filterButton}
                  startIcon={<FilterListSharpIcon />}
                >
                  {t('browse.show-filters')}{' '}
                  {numberOfFilters !== 0 ? `(${numberOfFilters})` : ''}
                </Button>

                <Button
                  variant="contained"
                  onClick={() => handleClearFilter()}
                  className={classes.clearButton}
                >
                  {t('browse.clear-filters')}
                </Button>
              </Box>
              {filteredCourses.length ? (
                <Box>
                  {filteredCourses.map((course, index) => (
                    <BrowseCourseCard key={index} course={course} />
                  ))}
                </Box>
              ) : (
                <BrowseFilterEmptyState />
              )}
            </>
          )}
        </TabPanel>
        <TabPanel tabIndex={tabIndex} index={1}>
          {loadingCreators ? (
            <CircularProgress color="primary" />
          ) : filteredCreators.length ? (
            <Box>
              {filteredCreators.map((creator, index) => (
                <BrowseCreatorCard key={index} creator={creator} />
              ))}
            </Box>
          ) : (
            <BrowseFilterEmptyState />
          )}
        </TabPanel>
      </Box>
      <BrowseDrawer
        setOpenDrawer={setOpenDrawer}
        handleClearFilter={handleClearFilter}
        openDrawer={openDrawer}
        numberOfFilters={numberOfFilters}
      >
        <BrowseCourseDrawerContent
          handleDurationFilterArr={handleDurationFilter}
          handleCulturalGroupFilterArr={handleCulturalGroupFilterArr}
          culturalGroupFilter={culturalGroupFilter}
          durationFilter={durationFilter}
          durations={durations}
        />
      </BrowseDrawer>
    </>
  )
}

export default BrowseTabs

const TabPanel = (props) => {
  const { children, tabIndex, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={tabIndex !== index}
      id={`browse-tabpanel-${index}`}
      aria-labelledby={`browse-tab-${index}`}
      {...other}
    >
      {tabIndex === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const a11yProps = (index) => {
  return {
    id: `browse-tab-${index}`,
    'aria-controls': `browse-tabpanel-${index}`,
  }
}
