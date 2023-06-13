import React, { useState, useContext } from 'react'
import Box from '@mui/material/Box'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import FilterListSharpIcon from '@mui/icons-material/FilterListSharp'

import CourseCard from '../CourseCard'
import BrowseCreatorCard from './BrowseCreatorCard'
import BrowseDrawer from './BrowseDrawer'
import BrowseCourseDrawerContent from './BrowseCourseDrawerContent'
import BrowseFilterEmptyState from './BrowseFilterEmptyState'

import { useTranslation } from 'react-i18next'
import { dataContext } from '../../util/dataProvider'
import { useCoursesFilter } from '../../hooks/useCoursesFilter'
import { useCreatorsFilter } from '../../hooks/useCreatorsFilter'
import { durations } from '../../assets/options/filters'
import { useTheme } from '@mui/material/styles'

const BrowseTabs = ({ categoryFilter, setCategoryFilter }) => {
  const { t } = useTranslation()
  const theme = useTheme()

  const [tabIndex, setTabIndex] = useState(0)
  const [openDrawer, setOpenDrawer] = useState(false)
  const [featuredFilter, setFeaturedFilter] = useState(false)
  const [difficultyLevelFilter, setDifficultyLevelFilter] = useState([])
  const [materialsFilter, setMaterialsFilter] = useState([])
  const [culturalGroupFilter, setCulturalGroupFilter] = useState([])
  const [durationFilter, setDurationFilter] = useState([])

  const { allCourses, allCreators, loadingCourses, loadingCreators } =
    useContext(dataContext)

  const { data: filteredCourses } = useCoursesFilter({
    allCourses,
    culturalGroupFilter,
    categoryFilter,
    durationFilter,
    featuredFilter,
    difficultyLevelFilter,
    materialsFilter,
  })

  const { data: filteredCreators } = useCreatorsFilter({
    allCreators,
    allCourses,
    culturalGroupFilter,
    categoryFilter,
    featuredFilter,
  })

  const handleChangeTab = (event, newTab) => {
    setTabIndex(newTab)
  }

  const handleClearFilter = () => {
    setCategoryFilter('All')
    setDurationFilter([])
    setCulturalGroupFilter([])
    setFeaturedFilter(false)
    setDifficultyLevelFilter([])
    setMaterialsFilter([])
  }

  const numberOfFilters =
    durationFilter.length +
    culturalGroupFilter.length +
    !!featuredFilter +
    difficultyLevelFilter.length +
    materialsFilter.length

  const materials = Array.from(
    new Set(allCourses.flatMap(({ materials }) => materials ?? [])),
  )

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabIndex}
            textColor="secondary"
            indicatorColor="primary"
            onChange={handleChangeTab}
            aria-label="browse tabs"
          >
            <Tab label={t('courses')} {...a11yProps(0)} />
            <Tab label={t('creators')} {...a11yProps(1)} />
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
                  '> *': {
                    flex: '1',
                  },
                }}
              >
                <Button
                  variant="secondary"
                  onClick={() => setOpenDrawer(true)}
                  startIcon={<FilterListSharpIcon />}
                  sx={{
                    backgroundColor: numberOfFilters !== 0 ? theme.palette.primary.main : '',
                    color: numberOfFilters !== 0 ? theme.palette.text.primary : ''
                  }}
                >
                  {t('browse.show-filters')}{' '}
                  {numberOfFilters !== 0 ? `(${numberOfFilters})` : ''}
                </Button>

                <Button variant="text" onClick={() => handleClearFilter()}>
                  {t('browse.clear-filters')}
                </Button>
              </Box>
              {filteredCourses.length ? (
                <Box>
                  {filteredCourses.map((course, index) => (
                    <CourseCard key={index} course={course} />
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
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridGap: 20,
              }}
            >
              {filteredCreators.map((creator, index) => (
                <BrowseCreatorCard key={index} creator={creator} />
              ))}
            </div>
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
          culturalGroupFilter={culturalGroupFilter}
          setCulturalGroupFilter={setCulturalGroupFilter}
          durationFilter={durationFilter}
          setDurationFilter={setDurationFilter}
          featuredFilter={featuredFilter}
          setFeaturedFilter={setFeaturedFilter}
          durations={durations}
          materials={materials}
          materialsFilter={materialsFilter}
          setMaterialsFilter={setMaterialsFilter}
          difficultyLevelFilter={difficultyLevelFilter}
          setDifficultyLevelFilter={setDifficultyLevelFilter}
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
      {tabIndex === index && <Box sx={{ pt: 2, pb: 2 }}>{children}</Box>}
    </div>
  )
}

const a11yProps = (index) => {
  return {
    id: `browse-tab-${index}`,
    'aria-controls': `browse-tabpanel-${index}`,
  }
}
