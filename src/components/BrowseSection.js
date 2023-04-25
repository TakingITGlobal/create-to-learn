import React, { useState, useContext, useEffect } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Section from './Section'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import BrowseSearchBar from './BrowseSearchBar'
import BrowseTabs from './BrowseTabs'
import BrowseEmptyState from './BrowseEmptyState'
import BrowseCourseCard from './BrowseCourseCard'
import BrowseCreatorCard from './BrowseCreatorCard'

import { useTranslation } from 'react-i18next'
import { dataContext } from '../util/dataProvider'

function BrowseSection(props) {
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false)
  const [search, setSearch] = useState('')
  const [filterCourses, setFilterCourses] = useState('')
  const [filterCreators, setFilterCreators] = useState('')
  const { t } = useTranslation()

  const { allCourses, allCreators, loadingCourses, loadingCreators } =
    useContext(dataContext)

  useEffect(() => {
    if (search !== '') {
      const filtCourses =
        allCourses &&
        allCourses.filter((course) => {
          const courseTitle = course.seriesName.toLowerCase()
          return courseTitle.search(search.toLowerCase()) !== -1
        })

      const filtCreators =
        allCreators &&
        allCreators.filter((creator) => {
          const creatorName = creator?.name?.toLowerCase()

          return creatorName
            ? creatorName.search(search.toLowerCase()) !== -1
            : false
        })

      setFilterCourses(filtCourses)
      setFilterCreators(filtCreators)
    }
  }, [search, allCourses, allCreators])

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Box mt={2}>
        <Container>
          <Box
            sx={{
              paddingTop: '40px',
              paddingBottom: '7px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h4">{t('browse.browse')}</Typography>

            <IconButton onClick={() => setOpenSearchDrawer(true)}>
              <SearchIcon sx={{ color: 'white' }} fontSize="large" />
            </IconButton>
          </Box>

          <SwipeableDrawer
            anchor="right"
            open={openSearchDrawer}
            onOpen={(event) => setOpenSearchDrawer(true)}
            onClose={(event) => setOpenSearchDrawer(false)}
          >
            <Box
              sx={{
                display: 'inline-block',
              }}
            >
              <BrowseSearchBar
                setSearch={setSearch}
                search={search}
                setOpenSearchDrawer={setOpenSearchDrawer}
              />
            </Box>
            {search !== '' ? (
              <Box sx={{ padding: '0 20px' }}>
                {filterCourses.length || filterCreators.length ? (
                  <Box>
                    {filterCreators.map((creator, index) => (
                      <BrowseCreatorCard key={index} creator={creator} />
                    ))}
                    {filterCourses.map((course, index) => (
                      <BrowseCourseCard key={index} course={course} />
                    ))}
                  </Box>
                ) : (
                  <BrowseEmptyState search={search} />
                )}
              </Box>
            ) : null}
          </SwipeableDrawer>
          <BrowseTabs search={search} />
        </Container>
      </Box>
    </Section>
  )
}

export default BrowseSection
