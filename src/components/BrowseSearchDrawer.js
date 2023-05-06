import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import SearchIcon from '@mui/icons-material/Search'

import BrowseSearchBar from './BrowseSearchBar'
import BrowseSearchEmptyState from './BrowseSearchEmptyState'
import BrowseCourseCard from './BrowseCourseCard'
import BrowseCreatorCard from './BrowseCreatorCard'

import 'react-multi-carousel/lib/styles.css'

import { useTranslation } from 'react-i18next'
import { useSearchFilter } from '../hooks/useSearchFilter'

function BrowseSearchDrawer({ openSearchDrawer, setOpenSearchDrawer }) {
  const [search, setSearch] = useState('')
  const { filterCourses, filterCreators } = useSearchFilter({
    search,
  })

  return (
    <SwipeableDrawer
      anchor="right"
      open={openSearchDrawer}
      onOpen={(event) => setOpenSearchDrawer(true)}
      onClose={(event) => setOpenSearchDrawer(false)}
      style={{ backgroundColor: '#313131' }}
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
          {filterCourses?.length || filterCreators?.length ? (
            <Box>
              {filterCreators.map((creator, index) => (
                <BrowseCreatorCard key={index} creator={creator} />
              ))}
              {filterCourses.map((course, index) => (
                <BrowseCourseCard key={index} course={course} />
              ))}
            </Box>
          ) : (
            <>
              <BrowseSearchEmptyState search={search} />
              <PopularSearches />
            </>
          )}
        </Box>
      ) : (
        <PopularSearches />
      )}
    </SwipeableDrawer>
  )
}

export default BrowseSearchDrawer

const PopularSearches = () => {
  const { t } = useTranslation()

  const popularSearches = [
    'Beading',
    'Photoshop',
    'Drone',
    'Game Design',
    'Goal Setting',
  ]

  return (
    <>
      <Typography variant="h6" sx={{ paddingLeft: '10px', fontWeight: '700' }}>
        {t('browse.popular-searches')}
      </Typography>
      <List>
        {popularSearches.map((searchTerm, index) => (
          <ListItem key={index} sx={{ paddingLeft: '10px' }}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText>{searchTerm}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  )
}
