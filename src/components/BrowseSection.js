import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Section from './Section'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'

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
