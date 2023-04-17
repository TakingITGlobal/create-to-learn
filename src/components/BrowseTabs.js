import React, { useState, useContext } from 'react'
import Box from '@mui/material/Box'
import Typography from '@material-ui/core/Typography'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Button from '@material-ui/core/Button'
import CircularProgress from '@mui/material/CircularProgress'

import BrowseCourseCard from './BrowseCourseCard'
import BrowseCreatorCard from './BrowseCreatorCard'
import BrowseDrawer from './BrowseDrawer'
import BrowseCourseDrawerContent from './BrowseCourseDrawerContent'
import BrowseCreatorDrawerContent from './BrowseCreatorDrawerContent'
import BrowseEmptyState from './BrowseEmptyState'
import FilterListSharpIcon from '@material-ui/icons/FilterListSharp'

import { useTranslation } from 'react-i18next'
import { dataContext } from '../util/dataProvider'
import { useCoursesFilter } from '../hooks/useCoursesFilter'
import { useCreatorsFilter } from '../hooks/useCreatorsFilter'
import useClasses from '../hooks/useClasses'
import { durations, culturalGroups } from '../assets/options/filters'

const styles = (theme) => ({
  filterButton: {
    backgroundColor: 'white',
    borderRadius: '48px !important',
    textTransform: 'capitalize !important',
  },
})

const BrowseTabs = ({ search }) => {
  const { t } = useTranslation()
  const classes = useClasses(styles)

  const [tabIndex, setTabIndex] = useState(0)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState([])
  const [durationFilter, setDurationFilter] = useState([])
  const [culturalGroupFilter, setCulturalGroupFilter] = useState([])

  const { allCourses, allCreators, loadingCourses, loadingCreators } =
    useContext(dataContext)

  const { data: filteredCourses } = useCoursesFilter({
    allCourses,
    categoryFilter,
    durationFilter,
    search,
  })

  const { data: filteredCreators } = useCreatorsFilter({
    allCreators,
    culturalGroupFilter,
    search,
  })

  const handleChangeTab = (event, newTab) => {
    setTabIndex(newTab)
  }

  const handleCategoryFilter = (category) => {
    if (categoryFilter.includes(category)) {
      setCategoryFilter(categoryFilter.filter((item) => item !== category))
    } else {
      setCategoryFilter([...categoryFilter, category])
    }
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
    if (tabIndex === 0) {
      setCategoryFilter([])
      setDurationFilter([])
    }

    if (tabIndex === 1) {
      setCulturalGroupFilter([])
    }
  }

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
              <Button
                variant="contained"
                onClick={() => setOpenDrawer(true)}
                className={classes.filterButton}
                startIcon={<FilterListSharpIcon />}
              >
                {t('browse.show-filters')}
              </Button>

              {filteredCourses.length ? (
                <Box>
                  {filteredCourses.map((course, index) => (
                    <BrowseCourseCard key={index} course={course} />
                  ))}
                </Box>
              ) : (
                <BrowseEmptyState search={search} />
              )}
            </>
          )}
        </TabPanel>
        <TabPanel tabIndex={tabIndex} index={1}>
          {loadingCreators ? (
            <CircularProgress color="primary" />
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenDrawer(true)}
              >
                Show all filters
              </Button>
              {filteredCreators.length ? (
                <Box>
                  {filteredCreators.map((creator, index) => (
                    <BrowseCreatorCard key={index} creator={creator} />
                  ))}
                </Box>
              ) : (
                <BrowseEmptyState search={search} />
              )}
            </>
          )}
        </TabPanel>
      </Box>
      <BrowseDrawer
        setOpenDrawer={setOpenDrawer}
        handleClearFilter={handleClearFilter}
        openDrawer={openDrawer}
      >
        {tabIndex === 0 ? (
          <BrowseCourseDrawerContent
            handleDurationFilterArr={handleDurationFilter}
            handleCategoryFilterArr={handleCategoryFilter}
            categoryFilter={categoryFilter}
            durationFilter={durationFilter}
            durations={durations}
          />
        ) : (
          <BrowseCreatorDrawerContent
            culturalGroupFilter={culturalGroupFilter}
            handleCulturalGroupFilterArr={handleCulturalGroupFilterArr}
            culturalGroups={culturalGroups}
          />
        )}
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
