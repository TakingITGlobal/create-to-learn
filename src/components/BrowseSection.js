import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Section from './Section'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

import BrowseSearchBar from './BrowseSearchBar'
import BrowseTabs from './BrowseTabs'

import { useCategories } from '../util/db'

function BrowseSection(props) {
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [categories, setCategories] = useState([])
  const [search, setSearch] = useState('')

  const { isLoading, data: dataCategories } = useCategories()

  useEffect(() => {
    if (!isLoading) {
      setCategories(dataCategories.map(({ name }) => name))
    }
  }, [dataCategories, isLoading])

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
              <BrowseSearchBar setSearch={setSearch} search={search} />
            </Box>
            <Box
              sx={{
                display: 'inline-block',
                justifyContent: 'flex-end',
              }}
            >
              <IconButton
                onClick={() => {
                  if (showSearchBar) {
                    setSearch('')
                  }
                  setShowSearchBar(!showSearchBar)
                }}
              >
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
            <BrowseTabs categories={categories} search={search} />
          )}
        </Container>
      </Box>
    </Section>
  )
}

export default BrowseSection
