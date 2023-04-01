import React, { useState, useEffect, useContext } from 'react'
import Box from '@material-ui/core/Box'

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

import { useTranslation } from 'react-i18next'
import { dataContext } from '../util/dataProvider'

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

const BrowseTabs = ({ categories, search }) => {
  const { t } = useTranslation()
  const [tabIndex, setTabIndex] = useState(0)
  const [filteredCourses, setFilteredCourses] = useState([])
  const [filteredCreators, setFilteredCreators] = useState([])
  const [openDrawer, setOpenDrawer] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState([])
  const [durationFilter, setDurationFilter] = useState([])
  const [culturalGroupFilter, setCulturalGroupFilter] = useState([])

  const { allCourses, allCreators, loadingCourses, loadingCreators } =
    useContext(dataContext)

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

  const culturalGroups = ['First Nations', 'Métis', 'Inuit']

  const handleChangeTab = (event, newTab) => {
    setTabIndex(newTab)
  }

  useEffect(() => {
    if (!loadingCourses) {
      setFilteredCourses(allCourses)
    }

    if (!loadingCreators) {
      setFilteredCreators(allCreators)
    }
  }, [allCourses, allCreators, loadingCourses, loadingCreators])

  useEffect(() => {
    //Use filters if some have been chosen. Otherwise, assume all filters are chosen.
    const categoriesToFilter = categoryFilter.length
      ? categoryFilter
      : categories
    const durationsToFilter = durationFilter.length ? durationFilter : durations

    const filtCourses = allCourses.filter((course) => {
      const courseTitle = course.seriesName.toLowerCase()
      return (
        course.category.some((cat) => categoriesToFilter.includes(cat)) &&
        durationsToFilter.some(
          (duration) =>
            course.totalLength >= duration.lowerValue &&
            course.totalLength < duration.upperValue,
        ) &&
        courseTitle.search(search) !== -1
      )
    })
    setFilteredCourses(filtCourses)
  }, [categoryFilter, durationFilter, allCourses, search])

  useEffect(() => {
    const culturalGroupsToFilter = culturalGroupFilter.length
      ? culturalGroupFilter
      : //some creators do not have a cultural group set
        culturalGroups + ['']

    const filtCreators = allCreators.filter((creator) => {
      const creatorFNMI = creator.fnmi ? creator.fnmi : ['']
      const creatorName = creator.name ? creator.name.toLowerCase() : ''
      return creatorFNMI.some(
        (grp) =>
          culturalGroupsToFilter.includes(grp) &&
          creatorName.search(search) !== -1,
      )
    })
    setFilteredCreators(filtCreators)
  }, [culturalGroupFilter, allCreators, search])

  const handleCategoryFilterArr = (category) => {
    if (categoryFilter.includes(category)) {
      setCategoryFilter(categoryFilter.filter((item) => item !== category))
    } else {
      setCategoryFilter([...categoryFilter, category])
    }
  }

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
      setFilteredCourses(allCourses)
    }

    if (tabIndex === 1) {
      setCulturalGroupFilter([])
      setFilteredCreators(allCreators)
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
                color="primary"
                onClick={() => setOpenDrawer(true)}
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
            categories={categories}
            handleDurationFilterArr={handleDurationFilterArr}
            handleCategoryFilterArr={handleCategoryFilterArr}
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
